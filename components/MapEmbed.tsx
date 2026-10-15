"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { hotel } from "@/data/hotel";

/** Google Map that only loads its iframe when scrolled near, keeping it off the critical path. */
export function MapEmbed({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return setLoad(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`relative overflow-hidden rounded-md bg-sand ${className}`}>
      {load ? (
        <iframe
          src={hotel.mapEmbedUrl}
          title="Map showing Aariva on the Nanakheda, near Birla Hospital Choraha, Ujjain"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0"
          allowFullScreen
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-ink-muted">
          <MapPin aria-hidden className="text-gold-text" />
          <span className="text-sm">Loading map…</span>
        </div>
      )}
    </div>
  );
}
