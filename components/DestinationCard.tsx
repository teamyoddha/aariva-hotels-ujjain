import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import type { Destination } from "@/data/destinations";
import { Pending } from "./Pending";

export function DestinationCard({ d }: { d: Destination }) {
  return (
    <article className="reveal group flex flex-col">
      <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(d.name+' Ujjain')}`} target="_blank" rel="noopener" tabIndex={-1} aria-hidden className="relative block overflow-hidden rounded-sm bg-sand">
        <div className="relative aspect-[4/3]">
          <Image src={d.image} alt={d.imageAlt} fill sizes="(min-width: 900px) 380px, (min-width: 640px) 50vw, 100vw" className="img-zoom object-cover" />
        </div>
      </a>
      <h3 className="mt-5 text-xl font-medium">{d.name}</h3>
      <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-muted">
        <MapPin aria-hidden size={14} className="text-gold-text" />
        {d.distance ?? "Ask us for directions"}
      </p>
      <p className="mt-3 text-md text-ink-muted">{d.description}</p>
      <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(d.name+' Ujjain')}`} target="_blank" rel="noopener" className="link-arrow mt-4 self-start" aria-label={`Find ${d.name} on Google Maps`}>
        View on Map <ArrowRight aria-hidden size={18} />
      </a>
    </article>
  );
}
