import type { Metadata } from "next";
import { BookingForm } from "@/components/booking-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { artists } from "@/content/artists";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Independent Live Booking & Artist Representation",
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
};

const services = [
  {
    index: "01",
    title: "Live booking",
    copy: "Venue outreach, opportunity review, offer coordination, and performance scheduling handled with complete details and direct communication.",
  },
  {
    index: "02",
    title: "Routing & markets",
    copy: "Sensible regional routing and deliberate market development—built around the artist, the room, and the audience that can grow there.",
  },
  {
    index: "03",
    title: "Artist representation",
    copy: "Selective, hands-on representation for live opportunities, with professional assets and a clear point of contact for every buyer.",
  },
];

const process = [
  ["01", "Share the brief", "Send the date, room, terms, and the shape of the opportunity."],
  ["02", "Align the room", "We review fit, routing, production needs, and artist availability."],
  ["03", "Confirm the date", "Once terms align, the engagement is documented and held clearly."],
  ["04", "Advance the show", "Assets, contacts, timing, and production details stay in one dependable thread."],
];

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        email: "booking@breakwaterbooking.com",
        description: SITE_DESCRIPTION,
        areaServed: "Southern California",
      },
      ...artists.map((artist) => ({
        "@type": "MusicGroup",
        "@id": `${SITE_URL}/#artist-${artist.slug}`,
        name: artist.name,
        url: `${SITE_URL}/#artist-${artist.slug}`,
        sameAs: artist.musicLinks.map((link) => link.href),
        genre: artist.genres,
        foundingLocation: { "@type": "Place", name: artist.location },
        bookingAgent: { "@id": `${SITE_URL}/#organization` },
      })),
    ],
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content">
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero__grid" aria-hidden="true" />
          <div className="hero__content">
            <div className="hero__copy">
              <p className="eyebrow">
                <span>BW / 001</span>
                Southern California
              </p>
              <h1 id="hero-heading">
                Independent booking.
                <span>Thoughtful representation.</span>
              </h1>
              <p className="hero__lede">
                Breakwater connects select independent artists with venues,
                promoters, festivals, and new audiences.
              </p>
              <div className="hero__actions">
                <a className="button button--dark" href="#booking">
                  Booking inquiries <span aria-hidden="true">↗</span>
                </a>
                <a className="button button--line" href="#roster">
                  View roster <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>

            <div className="hero-diagram" aria-hidden="true">
              <span className="diagram-coordinate diagram-coordinate--top">33.9° N</span>
              <span className="diagram-coordinate diagram-coordinate--side">117.9° W</span>
              <span className="diagram-mass diagram-mass--one" />
              <span className="diagram-mass diagram-mass--two" />
              <span className="diagram-mass diagram-mass--three" />
              <span className="diagram-channel" />
              <span className="diagram-route" />
              <span className="diagram-node diagram-node--one" />
              <span className="diagram-node diagram-node--two" />
              <span className="diagram-caption">Protected channel / open route</span>
            </div>
          </div>
          <div className="hero__footer">
            <span>Artist representation</span>
            <span>Live booking</span>
            <span>Market development</span>
          </div>
        </section>

        <section className="section roster" id="roster" aria-labelledby="roster-heading">
          <SectionHeading
            index="01"
            eyebrow="Selected representation"
            title="A focused roster, built deliberately."
            id="roster-heading"
          />
          <div className="artist-grid">
            {artists.map((artist, index) => (
              <article
                className="artist-card"
                id={`artist-${artist.slug}`}
                key={artist.slug}
              >
                <div className="artist-card__meta">
                  <span>Roster / {String(index + 1).padStart(3, "0")}</span>
                  <span>{artist.location}</span>
                </div>
                <div className="artist-card__main">
                  <div>
                    <p className="artist-card__descriptor">{artist.descriptor}</p>
                    <h3>{artist.wordmark}</h3>
                  </div>
                  <div className="artist-card__details">
                    <p>{artist.shortBio}</p>
                    <div className="artist-card__tags" aria-label={`${artist.name} genres`}>
                      {artist.genres.map((genre) => (
                        <span key={genre}>{genre}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="artist-card__footer">
                  <div className="artist-card__status">
                    <span className="status-dot" />
                    Accepting live opportunities
                  </div>
                  <div className="artist-links">
                    {artist.liveReelUrl ? (
                      <a href={artist.liveReelUrl} target="_blank" rel="noreferrer">
                        Live reel ↗
                      </a>
                    ) : null}
                    {artist.musicLinks.map((link) => (
                      <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                        {link.label} ↗
                      </a>
                    ))}
                    {artist.epkUrl ? (
                      <a href={artist.epkUrl} target="_blank" rel="noreferrer">
                        EPK ↗
                      </a>
                    ) : null}
                    <a className="artist-links__book" href="#booking">
                      Request a date ↗
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="services" id="services" aria-labelledby="services-heading">
          <div className="section services__inner">
            <SectionHeading
              index="02"
              eyebrow="What we handle"
              title="Professional work around the live show."
              id="services-heading"
              inverse
            />
            <div className="services-grid">
              {services.map((service) => (
                <article className="service-card" key={service.index}>
                  <span>{service.index}</span>
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section process" aria-labelledby="process-heading">
          <SectionHeading
            index="03"
            eyebrow="For buyers"
            title="A clear path from offer to stage."
            id="process-heading"
          />
          <div className="process-list">
            {process.map(([index, title, copy]) => (
              <article className="process-step" key={index}>
                <span>{index}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about" id="about" aria-labelledby="about-heading">
          <div className="about__signal" aria-hidden="true">
            <span>SELECTIVE / DIRECT / DEPENDABLE</span>
          </div>
          <div className="section about__inner">
            <p className="eyebrow eyebrow--light">
              <span>04</span>
              About Breakwater
            </p>
            <div className="about__copy">
              <h2 id="about-heading">Small by design. Serious about the work.</h2>
              <div>
                <p>
                  Breakwater Booking is an independent artist representation and
                  live-booking company based in Southern California.
                </p>
                <p>
                  We work selectively with artists who have a clear identity,
                  strong material, and a live show worth putting in front of new
                  audiences. The focus is straightforward: build real venue
                  relationships, create worthwhile opportunities, and grow one
                  market at a time.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="booking" id="booking" aria-labelledby="booking-heading">
          <div className="section booking__inner">
            <div className="booking__intro">
              <p className="eyebrow">
                <span>05</span>
                Start the conversation
              </p>
              <h2 id="booking-heading">Bring us the complete opportunity.</h2>
              <p>
                The more detail you can share now, the faster we can assess fit,
                availability, and next steps.
              </p>
              <a href="mailto:booking@breakwaterbooking.com">
                booking@breakwaterbooking.com ↗
              </a>
            </div>
            <BookingForm />
          </div>
        </section>
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}

function SectionHeading({
  index,
  eyebrow,
  title,
  id,
  inverse = false,
}: {
  index: string;
  eyebrow: string;
  title: string;
  id: string;
  inverse?: boolean;
}) {
  return (
    <div className={`section-heading${inverse ? " section-heading--inverse" : ""}`}>
      <p className="eyebrow">
        <span>{index}</span>
        {eyebrow}
      </p>
      <h2 id={id}>{title}</h2>
    </div>
  );
}
