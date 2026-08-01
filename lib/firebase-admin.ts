import "server-only";

import { getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const projectId =
  process.env.GOOGLE_CLOUD_PROJECT ??
  process.env.GCLOUD_PROJECT ??
  process.env.FIREBASE_PROJECT_ID ??
  "breakwaterbooking";

const app = getApps()[0] ?? initializeApp({ projectId });

export const firestore = getFirestore(app);
