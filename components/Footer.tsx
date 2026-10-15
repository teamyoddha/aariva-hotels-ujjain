import Link from "next/link";
import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";
import { hotel, nav, policyLinks, telLink, mailLink, whatsappLink, fullAddress } from "@/data/hotel";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark border-t border-gold/30 bg-maroon text-cream">
      <div className="container-wide grid gap-12 py-16 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1.3fr_1fr] md:py-20">
        <div>
          <Logo variant="ivory" className="h-[64px] w-auto" />
          <p className="mt-5 max-w-[30ch] text-md text-cream/80">
            Comfortable rooms and celebration space near Birla Hospital Choraha in Nanakheda, Ujjain.
          </p>
          <p className="mt-5 text-sm italic text-gold">{hotel.tagline}</p>
        </div>

        <nav aria-labelledby="footer-explore">
          <h2 id="footer-explore" className="text-xs font-semibold uppercase tracking-[2px] text-gold">
            Explore
          </h2>
          <ul className="mt-5 space-y-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-[40px] items-center text-cream/85 hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[2px] text-gold">Contact</h2>
          <ul className="mt-5 space-y-3 text-md">
            <li>
              <a href={telLink} className="flex min-h-[40px] items-center gap-3 text-cream/85 hover:text-gold">
                <Phone aria-hidden size={17} className="shrink-0 text-gold" />
                {hotel.phone}
              </a>
            </li>
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener" className="flex min-h-[40px] items-center gap-3 text-cream/85 hover:text-gold">
                <MessageCircle aria-hidden size={17} className="shrink-0 text-gold" />
                WhatsApp Aariva
              </a>
            </li>
            <li>
              <a href={mailLink} className="flex min-h-[40px] items-center gap-3 break-all text-cream/85 hover:text-gold">
                <Mail aria-hidden size={17} className="shrink-0 text-gold" />
                {hotel.email}
              </a>
            </li>
            <li>
              <a href={hotel.googleMapsUrl} target="_blank" rel="noopener" className="flex gap-3 text-cream/85 hover:text-gold">
                <MapPin aria-hidden size={17} className="mt-1 shrink-0 text-gold" />
                <span>
                  {fullAddress}
                  <span className="mt-1 block font-semibold text-gold">Get Directions →</span>
                </span>
              </a>
            </li>
          </ul>
        </div>

        <nav aria-labelledby="footer-policies">
          <h2 id="footer-policies" className="text-xs font-semibold uppercase tracking-[2px] text-gold">
            Policies
          </h2>
          <ul className="mt-5 space-y-1">
            {policyLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-[40px] items-center text-cream/85 hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-cream/15">
        <div className="container-wide flex flex-col gap-2 py-6 text-sm text-cream/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Aariva. All rights reserved.</p>
          <p>
            Design &amp; deployment by{" "}
            <a
              href="https://nexanits.com/"
              target="_blank"
              rel="noopener"
              className="font-semibold text-cream underline decoration-gold/60 underline-offset-4 hover:text-gold"
            >
              Nexan Tech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
