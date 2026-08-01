import "server-only";

import { firestore } from "@/lib/firebase-admin";
import type {
  BookingInquiryRecord,
  NotificationStatus,
} from "@/lib/types";

const INQUIRIES_COLLECTION = "bookingInquiries";

export function inquiryDocument(record: BookingInquiryRecord) {
  return Object.fromEntries(
    Object.entries(record).filter(([, value]) => value !== undefined),
  );
}

export async function storeInquiry(record: BookingInquiryRecord) {
  await firestore
    .collection(INQUIRIES_COLLECTION)
    .doc(record.id)
    .set(inquiryDocument(record));
}

export async function updateNotificationStatus(
  inquiryId: string,
  notificationStatus: NotificationStatus,
) {
  await firestore.collection(INQUIRIES_COLLECTION).doc(inquiryId).update({
    notificationStatus,
    notificationUpdatedAt: new Date(),
  });
}
