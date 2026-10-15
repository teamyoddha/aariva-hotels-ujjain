import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-site max-w-[720px] text-center">
        <p className="eyebrow justify-center">404</p>
        <h1 className="heading-section mt-s6">This page seems to have taken a different route.</h1>
        <p className="lead mx-auto mt-6 max-w-[44ch]">Let&apos;s get you back to Aariva.</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-primary">
            Return Home
          </Link>
          <Link href="/rooms/" className="btn-secondary">
            Explore Rooms
          </Link>
        </div>
      </div>
    </section>
  );
}
