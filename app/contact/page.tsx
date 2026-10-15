import type { Metadata } from "next";
import { Phone, MessageCircle, Mail, MapPin, Navigation, Clock } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { MapEmbed } from "@/components/MapEmbed";
import { hotel, fullAddress, telLink, mailLink, whatsappLink } from "@/data/hotel";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact Aariva Ujjain | Room Availability & Booking Help",
  description: `Contact Aariva, Ujjain for room availability and booking help. Call ${hotel.phone}, WhatsApp us, or send an enquiry. Located on the Nanakheda, near Birla Hospital Choraha.`,
  path: "/contact/",
  image: "/images/aariva-reception-2.webp",
});

export default function ContactPage() {
  const channels = [
    { icon: Phone, label: "Phone", value: hotel.phone, href: telLink, note: "Call for availability and booking" },
    { icon: MessageCircle, label: "WhatsApp", value: "WhatsApp Aariva", href: whatsappLink(), note: "Quick replies to booking questions", external: true },
    { icon: Mail, label: "Email", value: hotel.email, href: mailLink, note: "For group stays and invoices" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact Aariva"
        title="We're Here to Help Plan Your Stay."
        crumbs={[{ name: "Contact", path: "/contact/" }]}
        intro={<p>Contact the Aariva team for room availability, booking assistance or questions about your stay in Ujjain.</p>}
      />

      <section className="section pt-12 md:pt-16">
        <div className="container-wide grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
          <div>
            <h2 className="text-[30px] font-medium leading-[38px]">Contact Details</h2>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {channels.map(({ icon: Icon, label, value, href, note, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener" } : {})}
                    className="group flex items-start gap-4 py-5"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sand text-gold-text">
                      <Icon aria-hidden size={20} strokeWidth={1.6} />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-[1.5px] text-gold-text">{label}</span>
                      <span className="mt-0.5 block break-all text-lg font-medium text-maroon group-hover:underline">{value}</span>
                      <span className="block text-sm text-ink-muted">{note}</span>
                    </span>
                  </a>
                </li>
              ))}
              <li className="flex items-start gap-4 py-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sand text-gold-text">
                  <MapPin aria-hidden size={20} strokeWidth={1.6} />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[1.5px] text-gold-text">Address</span>
                  <address className="mt-0.5 not-italic text-md text-ink">{fullAddress}</address>
                  <a href={hotel.googleMapsUrl} target="_blank" rel="noopener" className="link-arrow mt-2 text-md">
                    Get Directions →
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-4 py-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sand text-gold-text">
                  <Clock aria-hidden size={20} strokeWidth={1.6} />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[1.5px] text-gold-text">Reception</span>
                  <span className="mt-0.5 block text-md text-ink">24/7 guest support. Please confirm arrival arrangements when booking.</span>
                </span>
              </li>
            </ul>
          </div>

          <div id="enquiry">
            <h2 className="text-[30px] font-medium leading-[38px]">Send a Booking Enquiry</h2>
            <p className="mt-2 text-md text-ink-muted">
              Share your dates and we will get back to you with availability and the current rate. This is an enquiry, not a
              confirmed booking.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="map-title" className="pb-[72px] md:pb-[110px]">
        <div className="container-wide">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <h2 id="map-title" className="text-[30px] font-medium leading-[38px]">
              Find Aariva
            </h2>
            <a href={hotel.googleMapsUrl} target="_blank" rel="noopener" className="btn-primary self-start">
              <Navigation aria-hidden size={18} /> Get Directions
            </a>
          </div>
          <MapEmbed className="mt-6 h-[360px] md:h-[460px]" />
        </div>
      </section>
    </>
  );
}
