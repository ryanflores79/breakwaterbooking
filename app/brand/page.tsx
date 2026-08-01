import type { Metadata } from "next";
import Link from "next/link";
import { Logo, Mark } from "@/components/logo";

export const metadata: Metadata = {
  title: "Brand guide",
  description: "Breakwater Booking visual and verbal identity reference.",
  robots: { index: false, follow: false },
};

const colors = [
  ["Breakwater Ink", "#111A1D", "ink"],
  ["Warm Foam", "#F2EEE5", "foam"],
  ["Harbor Blue", "#23414A", "harbor"],
  ["Steel Tide", "#42666D", "steel"],
  ["Signal Rust", "#C95D35", "rust"],
  ["Fog", "#A9B3AF", "fog"],
];

export default function BrandPage() {
  return (
    <main className="brand-guide">
      <header className="brand-guide__header">
        <Logo />
        <span>Identity reference / v1.0</span>
        <Link href="/">View site ↗</Link>
      </header>

      <section className="brand-guide__hero">
        <p className="eyebrow"><span>Principle 01</span> Positioning</p>
        <h1>Clarity protects the work.</h1>
        <p>
          Breakwater is a selective, dependable booking partner for artists and
          talent buyers. The identity is coastal in structure—not in cliché.
        </p>
      </section>

      <section className="brand-guide__section">
        <p className="brand-guide__label">01 / Identity</p>
        <div className="brand-guide__lockups">
          <div><Logo /><span>Primary lockup on Warm Foam</span></div>
          <div className="brand-guide__dark"><Logo inverse /><span>Reversed on Breakwater Ink</span></div>
          <div className="brand-guide__mark"><Mark /><span>Symbol / protected channel</span></div>
        </div>
      </section>

      <section className="brand-guide__section">
        <p className="brand-guide__label">02 / Color</p>
        <div className="swatch-grid">
          {colors.map(([name, hex, className]) => (
            <div className={`swatch swatch--${className}`} key={hex}>
              <span>{name}</span><strong>{hex}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="brand-guide__section type-specimen">
        <p className="brand-guide__label">03 / Type</p>
        <div>
          <span>Display / Barlow Condensed</span>
          <p className="type-specimen__display">INDEPENDENT BOOKING.</p>
        </div>
        <div>
          <span>Body / Inter</span>
          <p>
            Direct sentences, useful detail, and enough space for every idea to
            land. No inflated claims and no industry theater.
          </p>
        </div>
      </section>

      <section className="brand-guide__section brand-voice">
        <p className="brand-guide__label">04 / Voice</p>
        <div><span>Use</span><p>Selective, direct, informed, dependable, specific.</p></div>
        <div><span>Avoid</span><p>Hype, vague superlatives, surf clichés, and invented scale.</p></div>
      </section>

      <section className="brand-guide__section brand-usage">
        <p className="brand-guide__label">05 / Usage</p>
        <ul>
          <li>Give the mark clear space equal to the width of its channel.</li>
          <li>Use Ink on Foam or Foam on Ink as the primary combinations.</li>
          <li>Reserve Signal Rust for actions, status, and directional emphasis.</li>
          <li>Prefer typography and structure over decorative photography.</li>
          <li>Never add waves, anchors, palms, microphones, or distressed effects to the logo.</li>
        </ul>
      </section>
    </main>
  );
}
