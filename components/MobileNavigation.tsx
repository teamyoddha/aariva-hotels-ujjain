"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { hotel, nav, telLink, whatsappLink } from "@/data/hotel";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

export function MobileNavigation({ light }: { light: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panel = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useFocusTrap(panel, open, close);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className={cn(
          "inline-flex h-11 w-11 items-center justify-center rounded-lg border transition-colors duration-instant",
          light ? "border-cream/50 text-cream" : "border-line text-maroon",
        )}
      >
        <Menu aria-hidden size={22} strokeWidth={1.75} />
        <span className="sr-only">Open menu</span>
      </button>

      <div
        className={cn(
          "fixed inset-0 z-[60] bg-ink/50 transition-opacity duration-instant",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={close}
        aria-hidden
      />
      <div
        id="mobile-menu"
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!open}
        className={cn(
          "fixed inset-y-0 right-0 z-[61] flex w-[min(88vw,380px)] flex-col bg-ivory shadow-2xl transition-transform duration-fast ease-brand",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex h-[var(--header-h)] items-center justify-between border-b border-line px-6">
          <Logo className="h-[42px] w-auto" />
          <button
            type="button"
            onClick={close}
            data-autofocus
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line text-maroon"
          >
            <X aria-hidden size={22} strokeWidth={1.75} />
            <span className="sr-only">Close menu</span>
          </button>
        </div>
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 py-6">
          <ul className="divide-y divide-line">
            {nav.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href.replace(/\/$/, ""));
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-h-[56px] items-center justify-between text-[22px] font-medium",
                      active ? "text-maroon" : "text-ink",
                    )}
                  >
                    {item.label}
                    {active && <span aria-hidden className="h-2 w-2 rounded-full bg-gold" />}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link href="/contact/#enquiry" className="btn-primary mt-8 w-full">
            Book Your Stay
          </Link>
        </nav>
        <div className="space-y-3 border-t border-line px-6 py-5 text-md">
          <a href={telLink} className="flex min-h-[44px] items-center gap-3 text-ink">
            <Phone aria-hidden size={18} className="text-gold-text" /> {hotel.phone}
          </a>
          <a href={whatsappLink()} target="_blank" rel="noopener" className="flex min-h-[44px] items-center gap-3 text-ink">
            <MessageCircle aria-hidden size={18} className="text-gold-text" /> WhatsApp Aariva
          </a>
        </div>
      </div>
    </div>
  );
}
