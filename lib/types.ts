export type ArtistLink = {
  label: string;
  href: string;
};

export type Artist = {
  slug: string;
  name: string;
  descriptor: string;
  shortBio: string;
  location: string;
  genres: string[];
  wordmark: string;
  liveReelUrl: string | null;
  musicLinks: ArtistLink[];
  epkUrl: string | null;
  acceptingBookings: boolean;
};

export type NotificationStatus = "pending" | "sent" | "failed";

export type BookingInquiryRecord = {
  id: string;
  contactName: string;
  organization: string;
  email: string;
  phone?: string;
  inquiryType:
    | "live-booking"
    | "festival"
    | "support"
    | "private-event"
    | "general";
  artistSlug: string;
  venueName: string;
  cityState: string;
  requestedDate: string;
  alternateDate?: string;
  capacity?: number;
  proposedBudget?: string;
  dealStructure?:
    | "guarantee"
    | "door-split"
    | "guarantee-plus-percentage"
    | "festival-offer"
    | "other";
  details: string;
  sourcePage: string;
  createdAt: Date;
  expiresAt: Date;
  notificationStatus: NotificationStatus;
};
