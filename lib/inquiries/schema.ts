import { z } from "zod";
import { artistSlugs } from "@/content/artists";

const optionalString = (max: number) =>
  z.preprocess(
    (value) => (value === "" || value === null ? undefined : value),
    z.string().trim().max(max).optional(),
  );

const optionalPositiveInteger = z.preprocess(
  (value) => (value === "" || value === null ? undefined : value),
  z.coerce.number().int().positive().max(1_000_000).optional(),
);

const dateString = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Enter a valid date")
  .refine((value) => !Number.isNaN(Date.parse(`${value}T12:00:00Z`)), {
    message: "Enter a valid date",
  });

export const bookingInquirySchema = z.object({
  contactName: z.string().trim().min(2, "Enter your name").max(100),
  organization: z
    .string()
    .trim()
    .min(2, "Enter a venue, promoter, or organization")
    .max(160),
  email: z.email("Enter a valid email address").max(254),
  phone: optionalString(40),
  inquiryType: z.enum([
    "live-booking",
    "festival",
    "support",
    "private-event",
    "general",
  ]),
  artistSlug: z.preprocess(
    (value) => (typeof value === "string" ? value : ""),
    z
      .string()
      .min(1, "Select an artist")
      .refine((value) => artistSlugs.includes(value), {
        message: "Select a represented artist",
      }),
  ),
  venueName: z.string().trim().min(2, "Enter the venue name").max(160),
  cityState: z.string().trim().min(2, "Enter the city and state").max(120),
  requestedDate: dateString,
  alternateDate: z.preprocess(
    (value) => (value === "" || value === null ? undefined : value),
    dateString.optional(),
  ),
  capacity: optionalPositiveInteger,
  proposedBudget: optionalString(120),
  dealStructure: z.preprocess(
    (value) => (value === "" || value === null ? undefined : value),
    z
      .enum([
        "guarantee",
        "door-split",
        "guarantee-plus-percentage",
        "festival-offer",
        "other",
      ])
      .optional(),
  ),
  details: z
    .string()
    .trim()
    .min(20, "Please include at least a few details about the opportunity")
    .max(5_000),
  sourcePage: z.string().trim().max(200).default("/"),
  turnstileToken: z.string().min(1, "Complete the security check").max(2_048),
  website: z.string().max(200).optional().default(""),
});

export type BookingInquiryInput = z.infer<typeof bookingInquirySchema>;

export type BookingFieldErrors = Partial<
  Record<keyof BookingInquiryInput, string[]>
>;
