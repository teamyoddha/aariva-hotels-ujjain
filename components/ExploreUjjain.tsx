import Link from "next/link";
import { destinations } from "@/data/destinations";
import { DestinationCard } from "./DestinationCard";
import { SectionHeading } from "./SectionHeading";

export function ExploreUjjain() {
  return (
    <section aria-labelledby="explore-title" className="section">
      <div className="container-wide">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="explore-title"
            eyebrow="Explore Ujjain"
            title="Discover Ujjain During Your Stay"
            intro="Ujjain is one of India's oldest temple cities. These are the places most of our guests plan their days around."
          />
          <Link href="/explore-ujjain/" className="link-arrow shrink-0">
            Plan Your Ujjain Visit →
          </Link>
        </div>
        <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3">
          {destinations.map((d) => (
            <DestinationCard key={d.slug} d={d} />
          ))}
        </div>
      </div>
    </section>
  );
}
