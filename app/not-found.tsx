import Link from "next/link";
import { Logo } from "@/components/logo";

export default function NotFound() {
  return (
    <main className="not-found">
      <Logo />
      <p className="eyebrow"><span>404</span> Route not found</p>
      <h1>This route ends here.</h1>
      <p>The page may have moved, or the address may be incomplete.</p>
      <Link className="button button--dark" href="/">Return home ↗</Link>
    </main>
  );
}
