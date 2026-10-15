import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/data/hotel";
import { cn } from "@/lib/utils";

interface Props {
  eyebrow?: string;
  title: string;
  text: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string; whatsapp?: boolean };
  whatsappMessage?: string;
  className?: string;
  /** "band" = full-width maroon section; "panel" = rounded block inside a container */
  variant?: "band" | "panel";
  headingLevel?: "h2" | "h3";
  /** Optional photo behind a band, under a strong maroon overlay (guide §23) */
  image?: string;
}

export function BookingCTA({
  eyebrow = "Book Direct",
  title,
  text,
  primary = { label: "Check Availability", href: "/contact/#enquiry" },
  secondary = { label: "WhatsApp Aariva", href: "", whatsapp: true },
  whatsappMessage,
  className,
  variant = "band",
  headingLevel: H = "h2",
  image,
}: Props) {
  const inner = (
    <div className="reveal mx-auto max-w-[760px] text-center">
      <p className="eyebrow eyebrow-inverse justify-center">{eyebrow}</p>
      <H className="heading-section mt-s6 text-cream">{title}</H>
      <p className="mx-auto mt-5 max-w-[52ch] text-[17px] leading-[29px] text-cream/85">{text}</p>
      <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href={primary.href} className="btn-light">
          {primary.label}
        </Link>
        {secondary.whatsapp ? (
          <a href={whatsappLink(whatsappMessage)} target="_blank" rel="noopener" className="btn-outline-light">
            <MessageCircle aria-hidden size={18} />
            {secondary.label}
          </a>
        ) : (
          <Link href={secondary.href} className="btn-outline-light">
            {secondary.label}
          </Link>
        )}
      </div>
    </div>
  );

  if (variant === "panel") {
    return (
      <section className={cn("on-dark relative overflow-hidden rounded-md bg-maroon px-6 py-14 sm:px-12 md:py-16", className)}>
        <Ornament />
        {inner}
      </section>
    );
  }
  return (
    <section className={cn("on-dark relative isolate overflow-hidden bg-maroon py-[72px] md:py-[110px]", className)}>
      {image ? (
        <>
          <Image src={image} alt="" fill sizes="100vw" className="-z-20 object-cover" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-maroon/[0.86]" />
        </>
      ) : (
        <Ornament />
      )}
      <div className="container-site relative">{inner}</div>
    </section>
  );
}

/** Quiet concentric arcs — a subtle nod to temple shikhara forms, not religious iconography. */
function Ornament() {
  return (
    <svg aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-[360px] w-[360px] text-gold/15" viewBox="0 0 200 200" fill="none">
      {[96, 78, 60, 42].map((r) => (
        <circle key={r} cx="100" cy="100" r={r} stroke="currentColor" strokeWidth="0.8" />
      ))}
    </svg>
  );
}
