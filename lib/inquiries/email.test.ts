import { describe, expect, it } from "vitest";
import type { BookingInquiryRecord } from "@/lib/types";
import { renderInquiryEmail } from "./email";

const record: BookingInquiryRecord = {
  id: "BW-TEST01",
  contactName: "Jordan <Buyer>",
  organization: "The Harbor Room",
  email: "jordan@example.com",
  inquiryType: "live-booking",
  artistSlug: "riptide-radios",
  venueName: "The Harbor Room",
  cityState: "San Diego, CA",
  requestedDate: "2026-10-10",
  capacity: 350,
  details: "A complete opportunity description for the artist and team.",
  sourcePage: "/",
  createdAt: new Date("2026-07-31T12:00:00Z"),
  expiresAt: new Date("2028-07-31T12:00:00Z"),
  notificationStatus: "pending",
};

describe("renderInquiryEmail", () => {
  it("includes the opportunity and escapes submitted HTML", () => {
    const html = renderInquiryEmail(record);

    expect(html).toContain("Riptide Radios");
    expect(html).toContain("BW-TEST01");
    expect(html).toContain("Jordan &lt;Buyer&gt;");
    expect(html).not.toContain("Jordan <Buyer>");
  });
});
