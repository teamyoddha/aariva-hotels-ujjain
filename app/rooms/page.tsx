import type { Metadata } from "next";
import { Clock, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { RoomCard } from "@/components/RoomCard";
import { BookingCTA } from "@/components/BookingCTA";
import { AmenityIcon } from "@/components/AmenityIcon";
import { rooms } from "@/data/rooms";
import { amenities } from "@/data/amenities";
import { hotel } from "@/data/hotel";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Rooms at Aariva Ujjain | Air-Conditioned Rooms for Families",
  description:
    "Explore Aariva Family and Deluxe rooms in Ujjain, with air conditioning, free Wi-Fi and private bathrooms. Enquire for current rates.",
  path: "/rooms/",
  image: "/images/aariva-deluxe.webp",
});

export default function RoomsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Rooms"
        title="Comfortable Spaces for Your Ujjain Stay"
        crumbs={[{ name: "Rooms", path: "/rooms/" }]}
        intro={
          <p>
            Explore Aariva room options and choose the space that best suits your visit, whether you are a couple, a solo
            devotee or a family travelling together.
          </p>
        }
      />

      <section aria-label="Room types" className="section pt-12 md:pt-16">
        <div className="container-wide space-y-10">
          {rooms.map((room) => (
            <RoomCard key={room.slug} room={room} size="large" headingLevel="h2" />
          ))}
          <p className="text-sm text-ink-muted">
            Contact our team for rates on your preferred dates. {hotel.extrasPolicy}.
          </p>
        </div>
      </section>

      {/* Included in every room */}
      <section aria-labelledby="included-title" className="section bg-white">
        <div className="container-wide grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
          <div className="reveal">
            <p className="eyebrow">Every Stay Includes</p>
            <h2 id="included-title" className="heading-section mt-s6">
              The Comforts You Can Count On
            </h2>
            <p className="lead mt-6">
              Share your travel dates, number of guests and expected arrival time. Our team will confirm room availability and check-in arrangements.
            </p>
            <p className="mt-6 flex items-center gap-3 text-md text-ink">
              <Clock aria-hidden size={18} className="text-gold-text" /> 24/7 guest support
            </p>
            <p className="mt-2 flex items-center gap-3 text-md text-ink">
              <MessageCircle aria-hidden size={18} className="text-gold-text" /> Booking help on phone and WhatsApp
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-1 sm:grid-cols-3">
            {amenities.map((a) => (
              <li key={a.id} className="reveal flex items-center gap-3 border-b border-line py-4 text-md">
                <AmenityIcon id={a.id} size={20} className="shrink-0 text-gold-text" />
                {a.label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <BookingCTA
        title="Not Sure Which Room Suits You?"
        text="Tell us how many people are travelling and your dates. Our team will suggest the most comfortable option and share current rates."
        whatsappMessage="Hello Aariva, could you help me choose a room? We are … guests, arriving on …"
      />
    </>
  );
}
