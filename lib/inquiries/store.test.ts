import { describe, expect, it } from "vitest";
import type { BookingInquiryRecord } from "@/lib/types";
import { inquiryDocument } from "./store";

describe("inquiryDocument", () => {
  it("omits undefined optional fields before writing to Firestore", () => {
    const record: BookingInquiryRecord = {
      id: "BW-TEST02",
      contactName: "Test Buyer",
      organization: "Test Venue",
      email: "buyer@example.com",
      phone: undefined,
      inquiryType: "live-booking",
      artistSlug: "riptide-radios",
      venueName: "Test Venue",
      cityState: "San Diego, CA",
      requestedDate: "2026-12-31",
      alternateDate: undefined,
      capacity: undefined,
      proposedBudget: undefined,
      dealStructure: undefined,
      details: "A complete test opportunity description for validation.",
      sourcePage: "/",
      createdAt: new Date("2026-08-01T00:00:00Z"),
      expiresAt: new Date("2028-08-01T00:00:00Z"),
      notificationStatus: "pending",
    };

    const document = inquiryDocument(record);

    expect(document).toMatchObject({
      id: "BW-TEST02",
      contactName: "Test Buyer",
      requestedDate: "2026-12-31",
    });
    expect(document).not.toHaveProperty("phone");
    expect(document).not.toHaveProperty("alternateDate");
    expect(document).not.toHaveProperty("capacity");
    expect(document).not.toHaveProperty("proposedBudget");
    expect(document).not.toHaveProperty("dealStructure");
  });
});
