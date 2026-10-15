import { Quote, Star } from "lucide-react";
import { testimonials, reviewsUrl } from "@/data/testimonials";
import { hotel } from "@/data/hotel";
import { SectionHeading } from "./SectionHeading";
import { Pending } from "./Pending";

/**
 * Shows genuine reviews from data/testimonials.ts. With no reviews supplied it
 * renders three marked placeholders — never invented quotes. Up to four are shown.
 */
export function Testimonials() {
  if (!testimonials.length) return null;
  const items = testimonials.slice(0, 4);
  const { rating } = hotel;
  return (
    <section aria-labelledby="reviews-title" className="section bg-white">
      <div className="container-wide">
        <SectionHeading id="reviews-title" eyebrow="Guest Stories" title="What Our Guests Say" align="center" />
        {rating.show && (
          <p className="reveal mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-md text-ink">
            <span className="flex gap-0.5" aria-hidden>
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={18} className="fill-gold text-gold" />
              ))}
            </span>
            <span>
              <strong className="text-maroon">{rating.value}</strong> out of 5 from {rating.count} {rating.source} reviews
            </span>
          </p>
        )}
        <ul className={`mt-12 grid gap-6 ${items.length > 3 ? "sm:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"}`}>
          {items.length
            ? items.map((t) => (
                <li key={t.name + t.quote.slice(0, 12)} className="reveal flex flex-col rounded-sm border border-line bg-ivory p-7">
                  <Quote aria-hidden size={28} strokeWidth={1.25} className="text-gold" />
                  {t.rating && (
                    <p className="mt-4 flex gap-0.5" aria-label={`Rated ${t.rating} out of 5`}>
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star key={i} aria-hidden size={16} className={i < t.rating! ? "fill-gold text-gold" : "text-line"} />
                      ))}
                    </p>
                  )}
                  <blockquote className="mt-4 flex-1 text-md italic leading-[26px] text-ink">“{t.quote}”</blockquote>
                  <p className="mt-6 text-sm font-semibold text-maroon">{t.name}</p>
                  <p className="text-xs text-ink-muted">{t.source} review{t.date ? ` · ${t.date}` : ""}</p>
                </li>
              ))
            : [1, 2, 3].map((n) => (
                <li key={n} className="reveal flex min-h-[220px] flex-col justify-between rounded-sm border border-dashed border-line bg-ivory p-7">
                  <Quote aria-hidden size={28} strokeWidth={1.25} className="text-gold" />
                  <p className="mt-4"><Pending>GUEST REVIEW TO BE ADDED</Pending></p>
                  <p className="mt-6 text-sm text-ink-muted"><Pending>GUEST NAME · SOURCE</Pending></p>
                </li>
              ))}
        </ul>
        {reviewsUrl && (
          <p className="mt-10 text-center">
            <a href={reviewsUrl} target="_blank" rel="noopener" className="link-arrow">
              Read all reviews on Google →
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
