"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/data/hotel";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { MobileNavigation } from "./MobileNavigation";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Transparent only over the homepage hero, before scrolling (guide §8)
  const transparent = isHome && !scrolled;

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, "")));

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[70] rounded-lg bg-maroon px-5 py-3 text-cream focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-[var(--header-h)] transition-[background-color,box-shadow,border-color] duration-fast ease-brand",
          transparent
            ? "border-b border-transparent bg-gradient-to-b from-black/45 to-transparent"
            : "border-b border-line bg-ivory/95 shadow-[0_6px_24px_-18px_rgba(42,33,28,0.45)] backdrop-blur-md",
        )}
      >
        <div className="container-wide flex h-full items-center justify-between gap-6">
          <Link href="/" className="-ml-1 shrink-0 rounded-xs p-1" aria-label="Aariva home">
            <Logo variant={transparent ? "ivory" : "maroon"} className="h-[46px] w-auto md:h-[52px]" />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group relative inline-flex min-h-[44px] items-center px-4 text-md font-medium transition-colors duration-instant",
                        transparent ? "text-cream hover:text-white" : "text-ink hover:text-maroon",
                        active && !transparent && "text-maroon",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-x-4 bottom-2 h-[2px] origin-left bg-gold transition-transform duration-instant ease-brand",
                          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/contact/#enquiry" className={cn("hidden lg:inline-flex", transparent ? "btn-light" : "btn-primary")}>
              Book Your Stay
            </Link>
            <MobileNavigation light={transparent} />
          </div>
        </div>
      </header>
      {!isHome && <div aria-hidden className="h-[var(--header-h)]" />}
    </>
  );
}
