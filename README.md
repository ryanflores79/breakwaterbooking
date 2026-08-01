# Breakwater Booking

Production website and booking-inquiry service for Breakwater Booking, an independent live-booking and artist-representation company in Southern California.

The application uses Next.js App Router, TypeScript, Firebase App Hosting, Cloud Firestore, Resend, and Cloudflare Turnstile. Public content is statically rendered; only the inquiry endpoint requires server compute.

## Local development

Requirements:

- Node.js 22 or newer
- pnpm 10 or newer
- A Google Cloud login with access to the `breakwaterbooking` project

Copy `.env.example` to `.env.local` and provide the values available to you. In local development, the form uses Cloudflare’s public test widget and test secret when Turnstile values are omitted. Firestore still requires Application Default Credentials:

```bash
gcloud auth application-default login
pnpm install
pnpm dev
```

Open `http://localhost:3000`. The visual brand reference is available at `/brand` and is excluded from search indexing.

## Quality checks

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Content editing

Company and page copy lives in `app/page.tsx`. Typed artist records live in `content/artists.ts`. Add artists there rather than scattering artist data through components. `BRAND.md` is the source of truth for visual and verbal identity.

## Inquiry flow

`POST /api/inquiries` performs the following steps:

1. Validate the payload with the shared Zod schema.
2. Verify the Turnstile token on the server.
3. Apply a Firestore-backed hourly rate limit using a keyed hash rather than a raw IP address.
4. Store the inquiry with a 24-month expiration timestamp.
5. Send the booking notification through Resend and update delivery status.

Firestore client access is denied by default. Operators review records through Firebase Console.

## Firebase project setup

Use the existing Google Cloud project `breakwaterbooking` and select `us-central1` for both App Hosting and the default Firestore database.

The project is already registered with Firebase. The default Firestore database, deny-by-default client rules, and TTL policies for inquiries and rate limits are provisioned in `us-central1`. To redeploy those policies after a change:

```bash
firebase use breakwaterbooking
firebase deploy --only firestore
```

Create the two credential-dependent App Hosting secrets referenced by `apphosting.yaml`:

```bash
firebase apphosting:secrets:set resendApiKey
firebase apphosting:secrets:set turnstileSecretKey
```

`inquiryHashSecret` already exists in Secret Manager with a generated value. After creating the App Hosting backend, grant that backend access to all three referenced secrets if the setup flow has not already done so.

Set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `NEXT_PUBLIC_GA_MEASUREMENT_ID` in the App Hosting backend environment. Both must be available during the build because Next.js embeds `NEXT_PUBLIC_*` values in browser code.

In Firebase Console:

1. Open App Hosting and create a backend connected to `ryanflores79/breakwaterbooking` on `main`.
2. Choose `us-central1` and the repository root as the app root.
3. Add `breakwaterbooking.com` and redirect `www.breakwaterbooking.com` to the apex domain.
4. Add the DNS records Firebase provides to the existing Cloud DNS zone.

## Email and DNS

- Configure Google Workspace MX records for `booking@breakwaterbooking.com`.
- Verify `notify.breakwaterbooking.com` in Resend and add its SPF and DKIM records.
- Publish a DMARC policy for the apex domain after both Workspace and Resend pass verification.
- Use `website@notify.breakwaterbooking.com` as the transactional sender and the submitter’s email as `Reply-To`.

## Analytics and search

Create a GA4 web stream and set its measurement ID in the App Hosting environment. Analytics does not load until the visitor opts in. Verify the domain property in Google Search Console and submit `https://breakwaterbooking.com/sitemap.xml` after the first production deployment.
