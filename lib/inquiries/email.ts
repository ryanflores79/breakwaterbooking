import "server-only";

import { Resend } from "resend";
import { artists } from "@/content/artists";
import { BOOKING_EMAIL } from "@/lib/site";
import type { BookingInquiryRecord } from "@/lib/types";

function escapeHtml(value: string | number | undefined) {
  if (value === undefined) return "—";

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function labelFor(value: string | undefined) {
  if (!value) return "—";
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function renderInquiryEmail(record: BookingInquiryRecord) {
  const artist = artists.find((item) => item.slug === record.artistSlug);
  const rows = [
    ["Confirmation", record.id],
    ["Artist", artist?.name ?? record.artistSlug],
    ["Inquiry type", labelFor(record.inquiryType)],
    ["Contact", record.contactName],
    ["Organization", record.organization],
    ["Email", record.email],
    ["Phone", record.phone],
    ["Venue", record.venueName],
    ["Location", record.cityState],
    ["Requested date", record.requestedDate],
    ["Alternate date", record.alternateDate],
    ["Capacity", record.capacity],
    ["Proposed budget", record.proposedBudget],
    ["Deal structure", labelFor(record.dealStructure)],
  ];

  const tableRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 16px 10px 0;color:#617076;font-size:12px;text-transform:uppercase;letter-spacing:.08em;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:10px 0;color:#111a1d;font-size:15px;vertical-align:top;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  return `<!doctype html>
  <html lang="en">
    <body style="margin:0;background:#f2eee5;font-family:Arial,sans-serif;color:#111a1d;">
      <div style="max-width:720px;margin:0 auto;padding:40px 24px;">
        <div style="border-top:8px solid #111a1d;background:#fff;padding:32px;">
          <p style="margin:0 0 8px;color:#c95d35;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.15em;">New booking inquiry</p>
          <h1 style="margin:0 0 28px;font-size:36px;line-height:1;">${escapeHtml(artist?.name ?? record.artistSlug)}</h1>
          <table style="width:100%;border-collapse:collapse;">${tableRows}</table>
          <div style="margin-top:24px;border-top:1px solid #d9d5cc;padding-top:24px;">
            <p style="margin:0 0 8px;color:#617076;font-size:12px;text-transform:uppercase;letter-spacing:.08em;">Opportunity details</p>
            <p style="margin:0;white-space:pre-wrap;font-size:15px;line-height:1.65;">${escapeHtml(record.details)}</p>
          </div>
        </div>
      </div>
    </body>
  </html>`;
}

export async function sendInquiryNotification(record: BookingInquiryRecord) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  const resend = new Resend(apiKey);
  const artist = artists.find((item) => item.slug === record.artistSlug);
  const { error } = await resend.emails.send({
    from:
      process.env.BOOKING_SENDER_EMAIL ??
      "Breakwater Website <website@notify.breakwaterbooking.com>",
    to: BOOKING_EMAIL,
    replyTo: record.email,
    subject: `${artist?.name ?? "Artist"} inquiry · ${record.requestedDate} · ${record.cityState}`,
    html: renderInquiryEmail(record),
  });

  if (error) {
    throw new Error(`Resend delivery failed: ${error.message}`);
  }
}
