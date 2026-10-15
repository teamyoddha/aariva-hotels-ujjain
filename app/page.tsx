import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { BookingBar } from "@/components/BookingBar";
import { TrustStrip } from "@/components/TrustStrip";
import { AboutPreview } from "@/components/AboutPreview";
import { RoomsPreview } from "@/components/RoomsPreview";
import { WhyAariva } from "@/components/WhyAariva";
import { AmenitiesGrid } from "@/components/AmenitiesGrid";
import { BookingCTA } from "@/components/BookingCTA";
import { ExploreUjjain } from "@/components/ExploreUjjain";
import { Gallery } from "@/components/Gallery";
import { SectionHeading } from "@/components/SectionHeading";
import { Testimonials } from "@/components/Testimonials";
import { LocationSection } from "@/components/LocationSection";
import { BlogPreview } from "@/components/BlogPreview";
import { gallery } from "@/data/gallery";
import { buildMetadata } from "@/lib/seo";

const title = "Aariva Hotels & Banquets | Comfortable Stays in Ujjain";

export const metadata: Metadata = buildMetadata({
  title,
  description:
    "Stay at Aariva Hotels & Banquets in Nanakheda, Ujjain. Discover Family and Deluxe rooms, free Wi-Fi, air conditioning and celebration space.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="container-wide relative z-10 -mt-20 md:-mt-24">
        <BookingBar />
      </div>
      <div className="pt-14 md:pt-20">
        <TrustStrip />
      </div>
      <AboutPreview />
      <RoomsPreview />
      <WhyAariva />
      <AmenitiesGrid />
      <BookingCTA eyebrow="Stay & Celebrate" title="Make Room for Your Next Celebration." text="Banquet space at Aariva brings your stay and celebration together. Share your occasion, date and guest count with our team." primary={{label:'Explore Banquets',href:'/banquets/'}} secondary={{label:'Talk to Our Team',href:'/contact/'}} />
      <BookingCTA
        title="Planning Your Stay in Ujjain?"
        text="Speak directly with the Aariva team for room availability, booking assistance and stay-related questions."
        secondary={{ label: "WhatsApp Us", href: "", whatsapp: true }}
      />
      <ExploreUjjain />
      <section aria-labelledby="gallery-title" className="section bg-white">
        <div className="container-wide">
          <SectionHeading id="gallery-title" eyebrow="Gallery" title="A Glimpse of Aariva" />
          <div className="mt-12">
            <Gallery images={gallery} />
          </div>
        </div>
      </section>
      <Testimonials />
      <LocationSection />
      <BlogPreview />
      <BookingCTA
        eyebrow="Comfortable Stays. Memorable Celebrations."
        title="Your Ujjain Stay Starts Here."
        text="Comfortable rooms, warm hospitality and a peaceful place to return to after exploring Ujjain."
        primary={{ label: "Book Your Stay", href: "/contact/#enquiry" }}
        secondary={{ label: "Contact Aariva", href: "/contact/" }}
        image="/images/aariva-reception-2.webp"
      />
    </>
  );
}
