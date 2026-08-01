import { describe, expect, it } from "vitest";
import { bookingInquirySchema } from "./schema";

const validInquiry = {
  contactName: "Jordan Buyer",
  organization: "The Harbor Room",
  email: "jordan@example.com",
  phone: "",
  inquiryType: "live-booking",
  artistSlug: "riptide-radios",
  venueName: "The Harbor Room",
  cityState: "San Diego, CA",
  requestedDate: "2026-10-10",
  alternateDate: "",
  capacity: "350",
  proposedBudget: "$1,000 guarantee",
  dealStructure: "guarantee",
  details: "We are looking for a strong local headliner for a Friday night.",
  sourcePage: "/",
  turnstileToken: "test-token",
  website: "",
};

describe("bookingInquirySchema", () => {
  it("normalizes optional values and capacity", () => {
    const result = bookingInquirySchema.parse(validInquiry);

    expect(result.capacity).toBe(350);
    expect(result.phone).toBeUndefined();
    expect(result.alternateDate).toBeUndefined();
  });

  it("rejects an unrepresented artist", () => {
    const result = bookingInquirySchema.safeParse({
      ...validInquiry,
      artistSlug: "not-on-the-roster",
    });

    expect(result.success).toBe(false);
  });

  it("accepts every published roster artist", () => {
    for (const artistSlug of [
      "riptide-radios",
      "hazmatt",
      "sprung-monkey",
      "occupier",
      "beautiful-reasons",
    ]) {
      const result = bookingInquirySchema.safeParse({
        ...validInquiry,
        artistSlug,
      });

      expect(result.success).toBe(true);
    }
  });

  it("requires useful opportunity details", () => {
    const result = bookingInquirySchema.safeParse({
      ...validInquiry,
      details: "Call me",
    });

    expect(result.success).toBe(false);
  });
});
