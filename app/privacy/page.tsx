import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/logo";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Breakwater Booking handles inquiry information and optional analytics.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <header className="legal-page__header">
        <Logo href="/" />
        <Link href="/">Back to site ↗</Link>
      </header>
      <article className="legal-page__content">
        <p className="eyebrow"><span>Policy</span> Updated July 31, 2026</p>
        <h1>Privacy</h1>
        <p className="legal-page__lede">
          Breakwater Booking collects only the information needed to evaluate and
          respond to booking inquiries, operate the site, and understand whether
          the site is useful.
        </p>

        <h2>Booking inquiries</h2>
        <p>
          When you submit an inquiry, we collect the contact, organization,
          venue, date, deal, and opportunity information you provide. The record
          is stored privately in Google Cloud Firestore and sent by email to the
          Breakwater booking inbox. It is used to evaluate the opportunity,
          communicate with you, and maintain an accurate business record.
        </p>

        <h2>Retention and security</h2>
        <p>
          Inquiry records are scheduled for deletion after 24 months. Access is
          limited to authorized operators. Spam protection uses a security token
          and a short-lived, keyed network identifier; raw IP addresses and
          CAPTCHA tokens are not stored with inquiries.
        </p>

        <h2>Optional analytics</h2>
        <p>
          Google Analytics loads only when you choose to allow it. Analytics is
          used to understand aggregate traffic and site performance. You can
          change your choice from the “Privacy choices” control in the footer.
        </p>

        <h2>Service providers</h2>
        <p>
          We use Google Cloud and Firebase for hosting and data storage, Resend
          for transactional email delivery, Cloudflare Turnstile for spam
          prevention, and Google Analytics when consent is granted. Those
          providers process information according to their own terms and privacy
          policies.
        </p>

        <h2>Your request</h2>
        <p>
          To ask about, correct, or request deletion of an inquiry, email{" "}
          <a href="mailto:booking@breakwaterbooking.com">booking@breakwaterbooking.com</a>
          . Include enough information for us to locate the record without
          sending sensitive information.
        </p>

        <p className="legal-page__legal">
          Breakwater Booking is a division of Floridian Tech LLC.
        </p>
      </article>
    </main>
  );
}
