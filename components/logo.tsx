import Link from "next/link";

type LogoProps = {
  compact?: boolean;
  href?: string;
  inverse?: boolean;
};

export function Mark({ inverse = false }: Pick<LogoProps, "inverse">) {
  return (
    <span
      className={`brand-mark${inverse ? " brand-mark--inverse" : ""}`}
      aria-hidden="true"
    >
      <span className="brand-mark__mass brand-mark__mass--north" />
      <span className="brand-mark__mass brand-mark__mass--south" />
      <span className="brand-mark__signal" />
    </span>
  );
}

export function Logo({ compact = false, href = "/", inverse = false }: LogoProps) {
  return (
    <Link
      href={href}
      className={`brand-lockup${inverse ? " brand-lockup--inverse" : ""}`}
    >
      <Mark inverse={inverse} />
      <span className="brand-lockup__type">
        <span>Breakwater</span>
        {!compact && <span className="brand-lockup__booking">Booking</span>}
      </span>
    </Link>
  );
}
