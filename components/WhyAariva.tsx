import Image from "next/image";

// Benefits drawn from the current Aariva site; each is a service the hotel already describes.
const points = [
  { title: "Comfortable Rooms", text: "Air-conditioned rooms, comfortable beds and private bathrooms for a restful stay." },
  { title: "Stay Together", text: "Our Family Room accommodates up to four guests with two double beds." },
  { title: "Convenient Ujjain Location", text: "Find us at Jyotiba Phoole Complex, near Birla Hospital Choraha in Nanakheda." },
  { title: "24/7 Guest Support", text: "Contact our team for stay assistance. Confirm arrival arrangements when booking." },
  { title: "Simple Direct Booking", text: "Speak directly with our team by phone or WhatsApp for availability, rates and special requests." },
  { title: "Stay & Celebrate", text: "Banquet space is available for celebrations. Contact us to discuss your occasion." },
];

export function WhyAariva() {
  return (
    <section aria-labelledby="why-title" className="section">
      <div className="container-wide grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
        <div className="md:sticky md:top-[calc(var(--header-h)+40px)] md:self-start">
          <p className="eyebrow reveal">Why Aariva</p>
          <h2 id="why-title" className="heading-section reveal mt-s6">
            A Stay Designed Around Your Ujjain Journey
          </h2>
          <p className="lead reveal mt-6 max-w-[44ch]">
            Comfortable rooms, warm hospitality and direct assistance with your stay, all at a convenient Nanakheda address.
          </p>
          <div className="reveal relative mt-10 hidden aspect-[3/4] max-w-[420px] overflow-hidden rounded-md bg-sand md:block">
            <Image
              src="/images/aariva-family.webp"
              alt="Family room at Aariva Hotels and Banquets"
              fill
              sizes="420px"
              className="object-cover"
            />
          </div>
        </div>
        <ol className="divide-y divide-line border-y border-line">
          {points.map((p, i) => (
            <li key={p.title} className="reveal grid grid-cols-[56px_1fr] gap-4 py-8 sm:grid-cols-[80px_1fr]">
              <span className="text-3xl font-medium leading-none text-gold-text sm:text-[40px]" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-xl font-medium sm:text-2xl">{p.title}</h3>
                <p className="mt-2 text-md text-ink-muted">{p.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
