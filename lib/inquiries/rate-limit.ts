import "server-only";

import { createHmac } from "node:crypto";
import { firestore } from "@/lib/firebase-admin";

const WINDOW_MS = 60 * 60 * 1_000;
const MAX_SUBMISSIONS = 5;

function getHashSecret() {
  const secret = process.env.INQUIRY_HASH_SECRET;

  if (!secret && process.env.NODE_ENV === "production") {
    throw new Error("INQUIRY_HASH_SECRET is not configured");
  }

  return secret ?? "breakwater-local-development-only";
}

export function hashClientIdentifier(value: string) {
  return createHmac("sha256", getHashSecret()).update(value).digest("hex");
}

export async function consumeRateLimit(clientIp: string) {
  const key = hashClientIdentifier(clientIp || "unknown");
  const reference = firestore.collection("inquiryRateLimits").doc(key);
  const now = new Date();

  return firestore.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(reference);
    const data = snapshot.data() as
      | { count?: number; windowStartedAt?: Date | { toDate(): Date } }
      | undefined;
    const storedStart = data?.windowStartedAt;
    const windowStartedAt =
      storedStart && "toDate" in storedStart
        ? storedStart.toDate()
        : storedStart instanceof Date
          ? storedStart
          : null;
    const windowExpired =
      !windowStartedAt || now.getTime() - windowStartedAt.getTime() >= WINDOW_MS;

    if (!windowExpired && (data?.count ?? 0) >= MAX_SUBMISSIONS) {
      return false;
    }

    transaction.set(reference, {
      count: windowExpired ? 1 : (data?.count ?? 0) + 1,
      windowStartedAt: windowExpired ? now : windowStartedAt,
      expiresAt: new Date(now.getTime() + WINDOW_MS * 2),
    });

    return true;
  });
}
