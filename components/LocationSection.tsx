import { Navigation, Phone } from "lucide-react";
import { hotel, fullAddress, telLink } from "@/data/hotel";
import { nearby } from "@/data/destinations";
import { MapEmbed } from "./MapEmbed";
import { Pending } from "./Pending";

export function LocationSection() {
  return (
    <section aria-labelledby="location-title" className="section bg-sand">
      <div className="container-wide grid gap-10 md:grid-cols-[1.15fr_1fr] md:gap-16">
        <MapEmbed className="reveal min-h-[320px] md:min-h-[520px]" />
        <div className="reveal">
          <p className="eyebrow">Location</p>
          <h2 id="location-title" className="heading-section mt-s6">
            Stay Connected to Ujjain
          </h2>
          <address className="mt-6 not-italic">
            <p className="text-xl font-medium text-maroon">{hotel.legalName}</p>
            <p className="mt-1 text-md text-ink-muted">{fullAddress}</p>
          </address>
          <h3 className="mt-8 text-xs font-semibold uppercase tracking-[2px] text-gold-text">Getting around</h3>
          <dl className="mt-3 divide-y divide-line border-y border-line">
            {nearby.map((n) => (
              <div key={n.name} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3.5">
                <dt className="font-medium text-ink">{n.name}</dt>
                <dd className="text-right text-sm text-ink-muted">
                  {n.distance ?? "View directions on the map"}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={hotel.googleMapsUrl} target="_blank" rel="noopener" className="btn-primary">
              <Navigation aria-hidden size={18} /> Get Directions
            </a>
            <a href={telLink} className="btn-secondary">
              <Phone aria-hidden size={18} /> Call Aariva
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
