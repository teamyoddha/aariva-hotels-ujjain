import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RoomGallery } from "@/components/RoomGallery";
import { RoomCard } from "@/components/RoomCard";
import { RoomPrice } from "@/components/RoomFacts";
import { AmenityIcon } from "@/components/AmenityIcon";
import { BookingCTA } from "@/components/BookingCTA";
import { JsonLd } from "@/components/JsonLd";
import { Pending } from "@/components/Pending";
import { rooms, getRoom } from "@/data/rooms";
import { amenityById } from "@/data/amenities";
import { hotel, whatsappLink } from "@/data/hotel";
import { buildMetadata, roomSchema } from "@/lib/seo";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return rooms.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const room = getRoom((await params).slug);
  if (!room) return {};
  return buildMetadata({
    title: `${room.name} | Rooms at Aariva Ujjain`,
    description: `${room.shortDescription} Enquire about the ${room.name} at Aariva, Ujjain.`.slice(0, 160),
    path: `/rooms/${room.slug}/`,
    image: room.images[0].src,
    imageAlt: room.images[0].alt,
  });
}

export default async function RoomPage({ params }: { params: Promise<Params> }) {
  const room = getRoom((await params).slug);
  if (!room) notFound();

  const others = rooms.filter((r) => r.slug !== room.slug).slice(0, 3);
  const wa = whatsappLink(`Hello Aariva, I would like to check availability for the ${room.name}.`);

  const facts: { label: string; value: React.ReactNode }[] = [
    { label: "Guests", value: room.guestsLabel ?? (room.guests ? `Up to ${room.guests}` : <Pending>ADD MAX GUESTS</Pending>) },
    { label: "Bed", value: room.beds ?? <Pending>ADD BED TYPE</Pending> },
    { label: "Bathroom", value: "Private bathroom" },
    { label: "Air Conditioning", value: room.amenities.includes("ac") ? "Yes" : "No" },
  ];

  const stayInfo: { label: string; value: React.ReactNode }[] = [
    { label: "Check-in", value: hotel.checkIn || "Confirm when booking" },
    { label: "Check-out", value: hotel.checkOut || "Confirm when booking" },
    { label: "Children", value: room.childPolicy ?? "Ask about arrangements" },
    { label: "Extra bed & services", value: "Please enquire" },
    {
      label: "Cancellation",
      value: (
        <Link href="/cancellation-policy/" className="font-medium text-maroon underline underline-offset-4">
          See cancellation policy
        </Link>
      ),
    },
  ];

  return (
    <>
      <JsonLd data={roomSchema(room)} />
      <section className="bg-ivory pb-14 pt-8 md:pb-20 md:pt-10">
        <div className="container-wide">
          <Breadcrumbs items={[{ name: "Rooms", path: "/rooms/" }, { name: room.name, path: `/rooms/${room.slug}/` }]} />
          <div className="mt-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Aariva Rooms</p>
              <h1 className="mt-s6 font-medium text-maroon" style={{ fontSize: "clamp(36px, 4.6vw, 60px)", lineHeight: 1.1 }}>
                {room.name}
              </h1>
              <p className="lead mt-4 max-w-[56ch]">{room.shortDescription}</p>
            </div>
            <div className="shrink-0 md:text-right">
              <RoomPrice room={room} />
              <div className="mt-4 flex flex-wrap gap-3 md:justify-end">
                <Link href={`/contact/?room=${room.slug}#enquiry`} className="btn-primary">
                  Check Availability
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <RoomGallery images={room.images} roomName={room.name} />
          </div>
        </div>
      </section>

      <section className="section bg-white pt-14 md:pt-20">
        <div className="container-wide grid gap-14 md:grid-cols-[1.4fr_1fr] md:gap-20">
          <div>
            <h2 className="sr-only">Key room information</h2>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-4">
              {facts.map((f) => (
                <div key={f.label} className="bg-white p-5">
                  <dt className="text-xs font-semibold uppercase tracking-[1.5px] text-gold-text">{f.label}</dt>
                  <dd className="mt-1.5 text-base font-medium text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>

            <h2 className="mt-14 text-[30px] font-medium leading-[38px]">About This Room</h2>
            <div className="mt-5 space-y-4 text-[17px] leading-[30px] text-ink">
              {room.description.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <p className="mt-6 rounded-sm bg-sand px-5 py-4 text-md text-ink">
              <span className="font-semibold text-maroon">Ideal for: </span>
              {room.idealFor}
            </p>

            <h2 className="mt-14 text-[30px] font-medium leading-[38px]">Room Amenities</h2>
            <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">
              {room.amenities.map((id) => (
                <li key={id} className="flex items-center gap-3 border-b border-line py-4 text-md">
                  <AmenityIcon id={id} size={20} className="shrink-0 text-gold-text" />
                  {amenityById[id].label}
                </li>
              ))}
            </ul>
          </div>

          <aside aria-labelledby="stay-info-title" className="md:sticky md:top-[calc(var(--header-h)+24px)] md:self-start">
            <div className="rounded-sm border border-line bg-ivory p-7">
              <h2 id="stay-info-title" className="text-2xl font-medium">
                Stay Information
              </h2>
              <dl className="mt-5 divide-y divide-line">
                {stayInfo.map((s) => (
                  <div key={s.label} className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-3.5 text-md">
                    <dt className="text-ink-muted">{s.label}</dt>
                    <dd className="text-right font-medium text-ink">{s.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-7 flex flex-col gap-3">
                <Link href={`/contact/?room=${room.slug}#enquiry`} className="btn-primary w-full">
                  Check Availability
                </Link>
                <a href={wa} target="_blank" rel="noopener" className="btn-secondary w-full">
                  <MessageCircle aria-hidden size={18} /> WhatsApp Aariva
                </a>
              </div>
              <p className="mt-4 text-sm text-ink-muted">Enquiries are answered directly by the Aariva team, not a booking agent.</p>
            </div>
          </aside>
        </div>
      </section>

      <BookingCTA
        title="Ready to Reserve This Room?"
        text={`Share your dates and the number of guests, and our team will confirm availability and the current rate for the ${room.name}.`}
        primary={{ label: "Check Availability", href: `/contact/?room=${room.slug}#enquiry` }}
        whatsappMessage={`Hello Aariva, I would like to check availability for the ${room.name}.`}
      />

      {others.length > 0 && (
        <section aria-labelledby="other-rooms-title" className="section">
          <div className="container-wide">
            <h2 id="other-rooms-title" className="heading-section">
              Other Rooms
            </h2>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              {others.map((r) => (
                <RoomCard key={r.slug} room={r} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
