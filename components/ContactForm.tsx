"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { rooms } from "@/data/rooms";
import { whatsappLink } from "@/data/hotel";
import { cn } from "@/lib/utils";

/**
 * Booking enquiry form.
 *
 * Delivery: if NEXT_PUBLIC_ENQUIRY_ENDPOINT is set (e.g. a Formspree, Web3Forms or
 * own API URL) the form POSTs JSON there. Otherwise — as now — it opens WhatsApp
 * with the enquiry pre-filled, so no enquiry is lost while no backend exists.
 *
 * Spam protection: hidden honeypot field + minimum fill time.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT;

type Status = "idle" | "loading" | "success" | "error";
type Values = Record<"name" | "phone" | "email" | "checkIn" | "checkOut" | "guests" | "room" | "message", string>;
type Errors = Partial<Record<keyof Values, string>>;

const initial: Values = { name: "", phone: "", email: "", checkIn: "", checkOut: "", guests: "2", room: "", message: "" };

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your full name.";
  const digits = v.phone.replace(/\D/g, "");
  if (!digits) e.phone = "Please enter a phone number so we can reach you.";
  else if (digits.length < 10 || digits.length > 13) e.phone = "Please enter a valid phone number (10 digits, with or without +91).";
  if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) e.email = "Please enter a valid email address, or leave it blank.";
  if (!v.checkIn) e.checkIn = "Please choose a check-in date.";
  if (!v.checkOut) e.checkOut = "Please choose a check-out date.";
  else if (v.checkIn && v.checkOut <= v.checkIn) e.checkOut = "Check-out must be after check-in.";
  return e;
}

export function ContactForm() {
  const id = useId();
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [via, setVia] = useState<"email" | "whatsapp">("whatsapp");
  const startedAt = useRef(Date.now());
  const honeypot = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Pre-select a room when arriving from a "Book Now" link (?room=slug)
  useEffect(() => {
    const room = new URLSearchParams(window.location.search).get("room");
    if (room && rooms.some((r) => r.slug === room)) setValues((v) => ({ ...v, room }));
  }, []);

  const set = (k: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
    if (status === "error" || status === "success") setStatus("idle");
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return; // no repeat submissions
    const found = validate(values);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    // Bots fill hidden fields and submit instantly; pretend success and drop it
    if (honeypot.current?.value || Date.now() - startedAt.current < 2500) {
      setStatus("success");
      return;
    }

    const roomName = rooms.find((r) => r.slug === values.room)?.name ?? "No preference";

    if (!ENDPOINT) {
      const msg = [
        "Hello Aariva, I would like to make a booking enquiry.",
        `Name: ${values.name}`,
        `Phone: ${values.phone}`,
        values.email && `Email: ${values.email}`,
        `Check-in: ${values.checkIn}`,
        `Check-out: ${values.checkOut}`,
        `Guests: ${values.guests}`,
        `Room preference: ${roomName}`,
        values.message && `Message: ${values.message}`,
      ]
        .filter(Boolean)
        .join("\n");
      // No "noopener" feature here: it makes window.open return null, hiding a blocked popup
      const win = window.open(whatsappLink(msg), "_blank");
      if (win) win.opener = null;
      setVia("whatsapp");
      setStatus(win === null ? "error" : "success");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...values, room: roomName, source: "aariva-website" }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setVia("email");
      setStatus("success");
      setValues(initial);
    } catch {
      setStatus("error");
    }
  }

  const fieldProps = (k: keyof Values) => ({
    id: `${id}-${k}`,
    name: k,
    value: values[k],
    onChange: set(k),
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${id}-${k}-error` : undefined,
    className: "field-input",
  });

  const Err = ({ k }: { k: keyof Values }) =>
    errors[k] ? (
      <p id={`${id}-${k}-error`} className="field-error">
        <AlertCircle aria-hidden size={15} /> {errors[k]}
      </p>
    ) : null;

  const Req = () => (
    <span className="text-[#B3261E]" aria-hidden>
      {" "}*
    </span>
  );

  // In the WhatsApp fallback the guest still has to tap Send, so do not claim it was sent
  const successLabel = via === "whatsapp" ? "Opened in WhatsApp" : "Enquiry Sent";
  const label = { idle: "Send Enquiry", loading: "Sending…", success: successLabel, error: "Send Enquiry" }[status];

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative rounded-sm border border-line bg-white p-6 sm:p-9">
      <p className="text-sm text-ink-muted">
        Fields marked <span className="text-[#B3261E]">*</span> are required.
      </p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-name`} className="field-label">
            Full Name<Req />
          </label>
          <input {...fieldProps("name")} type="text" autoComplete="name" required />
          <Err k="name" />
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className="field-label">
            Phone Number<Req />
          </label>
          <input {...fieldProps("phone")} type="tel" autoComplete="tel" inputMode="tel" required />
          <Err k="phone" />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="field-label">
            Email <span className="font-normal text-ink-muted">(optional)</span>
          </label>
          <input {...fieldProps("email")} type="email" autoComplete="email" />
          <Err k="email" />
        </div>
        <div>
          <label htmlFor={`${id}-checkIn`} className="field-label">
            Check-in Date<Req />
          </label>
          <input {...fieldProps("checkIn")} type="date" required />
          <Err k="checkIn" />
        </div>
        <div>
          <label htmlFor={`${id}-checkOut`} className="field-label">
            Check-out Date<Req />
          </label>
          <input {...fieldProps("checkOut")} type="date" min={values.checkIn || undefined} required />
          <Err k="checkOut" />
        </div>
        <div>
          <label htmlFor={`${id}-guests`} className="field-label">
            Guests
          </label>
          <select {...fieldProps("guests")}>
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-room`} className="field-label">
            Room Preference
          </label>
          <select {...fieldProps("room")}>
            <option value="">No preference</option>
            {rooms.map((r) => (
              <option key={r.slug} value={r.slug}>{r.name}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-message`} className="field-label">
            Message <span className="font-normal text-ink-muted">(optional)</span>
          </label>
          <textarea
            {...fieldProps("message")}
            rows={4}
            className="field-input py-3"
            placeholder="Arrival time, guest arrangements or questions about your stay…"
          />
        </div>
        {/* Honeypot: hidden from people and assistive tech */}
        <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={`${id}-company`}>Company</label>
          <input ref={honeypot} id={`${id}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "loading"}
          aria-disabled={status === "loading"}
          className={cn("btn-primary min-w-[200px]", status === "success" && "bg-[#2E6B3F] hover:bg-[#2E6B3F] hover:text-cream")}
        >
          {status === "loading" && <Loader2 aria-hidden size={18} className="animate-spin" />}
          {status === "success" && <CheckCircle2 aria-hidden size={18} />}
          {label}
        </button>
        <p className="text-sm text-ink-muted">
          {ENDPOINT ? "We usually reply by phone or WhatsApp." : "Your enquiry opens in WhatsApp, ready to send."}
        </p>
      </div>

      <div aria-live="polite" role="status" className="mt-5">
        {status === "success" && via === "whatsapp" && (
          <p className="flex items-start gap-2 rounded-xs bg-[#EAF4EC] px-4 py-3 text-md text-[#1F4D2C]">
            <CheckCircle2 aria-hidden size={18} className="mt-1 shrink-0" />
            Your enquiry is ready in WhatsApp. Tap Send there and the Aariva team will reply with availability and rates.
          </p>
        )}
        {status === "success" && via === "email" && (
          <p className="flex items-start gap-2 rounded-xs bg-[#EAF4EC] px-4 py-3 text-md text-[#1F4D2C]">
            <CheckCircle2 aria-hidden size={18} className="mt-1 shrink-0" />
            Thank you. Your enquiry has been sent and our team will contact you shortly.
          </p>
        )}
        {status === "error" && (
          <p className="flex items-start gap-2 rounded-xs bg-[#FBEAE8] px-4 py-3 text-md text-[#8C1D18]">
            <AlertCircle aria-hidden size={18} className="mt-1 shrink-0" />
            Unable to send. Please try again, or call or WhatsApp us directly.
          </p>
        )}
      </div>
    </form>
  );
}
