import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { bookingInquirySchema } from "@/lib/inquiries/schema";
import { sendInquiryNotification } from "@/lib/inquiries/email";
import { consumeRateLimit } from "@/lib/inquiries/rate-limit";
import {
  storeInquiry,
  updateNotificationStatus,
} from "@/lib/inquiries/store";
import type { BookingInquiryRecord } from "@/lib/types";
import { verifyTurnstile } from "@/lib/turnstile";

export const runtime = "nodejs";

function confirmationId() {
  return `BW-${randomBytes(4).toString("hex").toUpperCase()}`;
}

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 65_536) {
    return NextResponse.json(
      { ok: false, message: "The submission is too large." },
      { status: 413 },
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "The submission could not be read." },
      { status: 400 },
    );
  }

  if (
    payload &&
    typeof payload === "object" &&
    "website" in payload &&
    typeof payload.website === "string" &&
    payload.website.length > 0
  ) {
    return NextResponse.json(
      { ok: true, confirmationId: confirmationId() },
      { status: 201 },
    );
  }

  const parsed = bookingInquirySchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Please check the highlighted fields.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const clientIp = getClientIp(request);

  try {
    const turnstileValid = await verifyTurnstile(
      parsed.data.turnstileToken,
      clientIp,
    );

    if (!turnstileValid) {
      return NextResponse.json(
        {
          ok: false,
          message: "The security check expired. Please try again.",
          fieldErrors: {
            turnstileToken: ["Complete the security check again"],
          },
        },
        { status: 400 },
      );
    }

    const withinLimit = await consumeRateLimit(clientIp);
    if (!withinLimit) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "We have received several inquiries from this connection. Please try again later or email booking@breakwaterbooking.com.",
        },
        { status: 429 },
      );
    }

    const now = new Date();
    const id = confirmationId();
    const {
      turnstileToken: _turnstileToken,
      website: _website,
      ...inquiry
    } = parsed.data;
    void _turnstileToken;
    void _website;

    const record: BookingInquiryRecord = {
      ...inquiry,
      id,
      createdAt: now,
      expiresAt: new Date(
        Date.UTC(
          now.getUTCFullYear() + 2,
          now.getUTCMonth(),
          now.getUTCDate(),
          now.getUTCHours(),
          now.getUTCMinutes(),
          now.getUTCSeconds(),
        ),
      ),
      notificationStatus: "pending",
    };

    await storeInquiry(record);

    try {
      await sendInquiryNotification(record);
      await updateNotificationStatus(id, "sent");
    } catch (error) {
      console.error("Booking notification delivery failed", error);
      await updateNotificationStatus(id, "failed").catch(() => undefined);
    }

    return NextResponse.json(
      { ok: true, confirmationId: id },
      { status: 201 },
    );
  } catch (error) {
    console.error("Booking inquiry processing failed", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          "We could not save the inquiry right now. Please email booking@breakwaterbooking.com.",
      },
      { status: 503 },
    );
  }
}
