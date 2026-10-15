import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const trust = ["Family Friendly", "Comfortable Stay", "Ujjain"];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[640px] items-end overflow-hidden md:min-h-[min(92vh,860px)]">
      <Image
        src="/images/aariva-deluxe-2.webp"
        alt="A guest room at Aariva, Ujjain, with a double bed, cushions and warm lighting"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="-z-20 object-cover object-[50%_65%]"
      />
      {/* Overlay keeps hero copy above WCAG AA contrast on any crop */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-[#1d0a0e]/90 via-[#2a0f15]/55 to-[#1d0a0e]/35" />
      <div aria-hidden className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-[#1d0a0e]/70 via-[#1d0a0e]/20 to-transparent md:block" />

      <div className="container-wide pb-32 pt-[calc(var(--header-h)+48px)] md:pb-40">
        <div className="max-w-[640px] text-cream">
          <p className="eyebrow eyebrow-inverse">Aariva · Ujjain</p>
          <h1 id="hero-title" className="heading-hero mt-5 text-cream">
            Comfortable Stays.
            <br />
            Memorable Celebrations.
          </h1>
          <p className="mt-6 max-w-[48ch] text-[17px] leading-[29px] text-cream/90 md:text-lg">
            A warm and comfortable stay for families, pilgrims and travellers visiting Ujjain.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact/#enquiry" className="btn-light">
              Book Your Stay
            </Link>
            <Link href="/rooms/" className="btn-outline-light group">
              Explore Rooms
              <ArrowRight aria-hidden size={18} className="transition-transform duration-instant group-hover:translate-x-1" />
            </Link>
          </div>
          <ul className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-cream/85" aria-label="Highlights">
            {trust.map((t, i) => (
              <li key={t} className="flex items-center gap-5">
                {i > 0 && <span aria-hidden className="hidden h-1 w-1 rounded-full bg-gold sm:block" />}
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
