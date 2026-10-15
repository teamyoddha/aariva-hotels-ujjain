"use client";

import { useEffect, useId, useState } from "react";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/data/hotel";
import { cn } from "@/lib/utils";

function today() {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

/**
 * Availability enquiry. Aariva has no live booking engine, so this does NOT show
 * live inventory: it sends the guest's dates to the hotel on WhatsApp (guide §11).
 */
export function BookingBar({ className }: { className?: string }) {
  const id = useId();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [roomsCount, setRoomsCount] = useState("1");
  const [error, setError] = useState("");
  // Set after mount: the page is statically built, so a build-time date would be stale
  const [minDate, setMinDate] = useState<string>();
  useEffect(() => setMinDate(today()), []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!checkIn || !checkOut) return setError("Please choose your check-in and check-out dates.");
    if (checkOut <= checkIn) return setError("Check-out must be after check-in.");
    setError("");
    const msg = [
      "Hello Aariva, I would like to check room availability.",
      `Check-in: ${checkIn}`,
      `Check-out: ${checkOut}`,
      `Guests: ${guests}`,
      `Rooms: ${roomsCount}`,
    ].join("\n");
    window.open(whatsappLink(msg), "_blank", "noopener");
  }

  const field = "field-input min-h-[50px] bg-ivory/60";

  return (
    <div className={cn("rounded-sm border border-line bg-white p-5 shadow-[0_24px_60px_-36px_rgba(42,33,28,0.55)] md:p-6", className)}>
      <form onSubmit={submit} noValidate aria-describedby={`${id}-note`}>
        <fieldset>
          <legend className="sr-only">Check room availability</legend>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-[1fr_1fr_0.7fr_0.7fr_auto] md:items-end">
            <div>
              <label htmlFor={`${id}-in`} className="field-label">Check-in</label>
              <input
                id={`${id}-in`}
                type="date"
                min={minDate}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className={field}
                aria-invalid={Boolean(error && !checkIn)}
              />
            </div>
            <div>
              <label htmlFor={`${id}-out`} className="field-label">Check-out</label>
              <input
                id={`${id}-out`}
                type="date"
                min={checkIn || minDate}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className={field}
                aria-invalid={Boolean(error && (!checkOut || checkOut <= checkIn))}
              />
            </div>
            <div>
              <label htmlFor={`${id}-guests`} className="field-label">Guests</label>
              <select id={`${id}-guests`} value={guests} onChange={(e) => setGuests(e.target.value)} className={field}>
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={`${id}-rooms`} className="field-label">Rooms</label>
              <select id={`${id}-rooms`} value={roomsCount} onChange={(e) => setRoomsCount(e.target.value)} className={field}>
                {["1", "2", "3", "4", "5+"].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn-primary min-h-[50px] sm:col-span-2 md:col-span-1">
              Check Availability
            </button>
          </div>
        </fieldset>
        <div aria-live="polite">
          {error && <p className="field-error mt-3">{error}</p>}
        </div>
        <p id={`${id}-note`} className="mt-4 flex items-start gap-2 text-sm text-ink-muted">
          <MessageCircle aria-hidden size={16} className="mt-[3px] shrink-0 text-gold-text" />
          This is an enquiry, not an instant booking. Your dates open in WhatsApp and our team replies with availability and rates.
        </p>
      </form>
    </div>
  );
}
