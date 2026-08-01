import { Logo } from "@/components/logo";

const navItems = [
  { label: "Roster", href: "#roster" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Logo />
        <nav className="site-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="header-cta" href="#booking">
          Booking inquiry
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </header>
  );
}
