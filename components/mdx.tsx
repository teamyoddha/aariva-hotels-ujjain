import Link from "next/link";
import { Info, AlertTriangle, ArrowRight } from "lucide-react";
import { slugify } from "@/lib/utils";
import { Pending } from "./Pending";

/**
 * Components available inside blog .mdx files. Authors can write:
 *
 *   <Verify>ADD CURRENT TIMING</Verify>        visible "needs checking" marker
 *   <Tip title="Good to know">…</Tip>          helpful information card
 *   <Note>…</Note>                             caution / verify-before-you-go card
 *   <InfoGrid items={[["Label", "Value"], …]} /> quick facts table
 *   <StayCTA />                                link block to rooms + contact
 */

function textOf(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (node && typeof node === "object" && "props" in node) {
    return textOf((node as { props: { children?: React.ReactNode } }).props.children);
  }
  return "";
}

function H2({ children }: { children?: React.ReactNode }) {
  return <h2 id={slugify(textOf(children))}>{children}</h2>;
}

function A({ href = "", children }: { href?: string; children?: React.ReactNode }) {
  if (href.startsWith("/")) return <Link href={href}>{children}</Link>;
  return (
    <a href={href} target="_blank" rel="noopener">
      {children}
    </a>
  );
}

function Verify({ children }: { children?: React.ReactNode }) {
  return <Pending>{children}</Pending>;
}

function Tip({ title = "Good to know", children }: { title?: string; children?: React.ReactNode }) {
  return (
    <aside className="not-prose my-8 rounded-sm border border-line bg-white p-6">
      <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[1.5px] text-gold-text">
        <Info aria-hidden size={17} /> {title}
      </p>
      <div className="mt-3 space-y-3 text-[16px] leading-[27px] text-ink [&_a]:font-medium [&_a]:text-maroon [&_a]:underline">
        {children}
      </div>
    </aside>
  );
}

function Note({ title = "Check before you go", children }: { title?: string; children?: React.ReactNode }) {
  return (
    <aside className="my-8 rounded-sm border border-gold/50 bg-[rgba(232,155,60,0.08)] p-6">
      <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[1.5px] text-gold-text">
        <AlertTriangle aria-hidden size={17} /> {title}
      </p>
      <div className="mt-3 space-y-3 text-[16px] leading-[27px] text-ink">{children}</div>
    </aside>
  );
}

function InfoGrid({ items }: { items: [string, React.ReactNode][] }) {
  return (
    <dl className="my-8 grid gap-px overflow-hidden rounded-sm border border-line bg-[rgba(42,33,28,0.13)] sm:grid-cols-2">
      {items.map(([k, v]) => (
        <div key={k} className="bg-white p-5">
          <dt className="text-xs font-semibold uppercase tracking-[1.5px] text-gold-text">{k}</dt>
          <dd className="mt-1 text-[16px] leading-[26px] text-ink">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function StayCTA() {
  return (
    <aside className="on-dark my-10 rounded-md bg-maroon p-7 text-cream sm:p-9">
      <p className="text-xs font-semibold uppercase tracking-[2px] text-gold">Staying in Ujjain?</p>
      <p className="mt-3 text-xl font-medium leading-[32px] text-cream">
        Looking for a comfortable place to stay during your Ujjain visit?
      </p>
      <p className="mt-2 text-[16px] leading-[27px] text-cream/85">
        Aariva welcomes you to Nanakheda, near Birla Hospital Choraha, with Family and Deluxe rooms, air conditioning and free Wi-Fi.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link href="/rooms/" className="btn-light no-underline">
          Explore Rooms
        </Link>
        <Link href="/contact/#enquiry" className="btn-outline-light no-underline">
          Check Availability <ArrowRight aria-hidden size={18} />
        </Link>
      </div>
    </aside>
  );
}

export const mdxComponents = { h2: H2, a: A, Verify, Tip, Note, InfoGrid, StayCTA };
