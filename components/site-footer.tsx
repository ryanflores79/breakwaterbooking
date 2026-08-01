import Link from "next/link";
import { Logo } from "@/components/logo";
import { PrivacySettingsButton } from "@/components/analytics-consent";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <Logo inverse />
        <p className="site-footer__statement">
          Clear communication. Complete details. Shows built to work.
        </p>
        <a className="site-footer__email" href="mailto:booking@breakwaterbooking.com">
          booking@breakwaterbooking.com
        </a>
      </div>
      <div className="site-footer__bottom">
        <p>© {new Date().getFullYear()} Breakwater Booking</p>
        <p>A division of Floridian Tech LLC.</p>
        <div className="footer-links">
          <Link href="/privacy">Privacy</Link>
          <PrivacySettingsButton />
        </div>
      </div>
    </footer>
  );
}
