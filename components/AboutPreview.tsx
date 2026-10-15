import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AboutPreview() {
  return (
    <section aria-labelledby="about-preview-title" className="section">
      <div className="container-wide grid items-center gap-12 md:grid-cols-[1fr_1.05fr] md:gap-20">
        <div className="reveal relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-sand shadow-[0_24px_60px_-24px_rgba(59,26,18,0.35)]">
            <Image
              src="/images/aariva-exterior.webp"
              alt="Front facade of Aariva Hotel and Banquet in Ujjain"
              fill
              sizes="(min-width: 900px) 46vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 right-4 hidden w-[42%] overflow-hidden rounded-sm border-[6px] border-ivory bg-sand sm:block md:-right-10">
            <div className="relative aspect-[4/3]">
              <Image src="/images/aariva-deluxe-1.webp" alt="" fill sizes="20vw" className="object-cover" />
            </div>
          </div>
        </div>
        <div className="reveal">
          <p className="eyebrow">Welcome to Aariva</p>
          <h2 id="about-preview-title" className="heading-section mt-s6">
            A Peaceful Stay for Your Ujjain Journey
          </h2>
          <div className="lead mt-6 space-y-4">
            <p>
              Aariva is a welcoming hotel for travellers who want a comfortable, peaceful and welcoming place to stay in
              Ujjain. Whether your visit is spiritual, a family trip or simply about discovering the city, our team is here to make
              it easy.
            </p>
            <p>
              Find us near Birla Hospital Choraha in Nanakheda, Ujjain. Choose a Deluxe Room for two or a Family Room for up to four guests. Banquet space is also available for celebrations.
            </p>
          </div>
          <Link href="/about/" className="link-arrow mt-8">
            Discover Aariva <ArrowRight aria-hidden size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
