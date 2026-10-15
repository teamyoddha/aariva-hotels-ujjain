import Image from 'next/image';
export function Logo({variant='maroon',className}:{variant?:'maroon'|'ivory';className?:string}) {
 return <span className={`inline-flex items-center gap-3 ${variant==='ivory'?'text-cream':'text-maroon'}`}><Image src="/aariva-logo.png" alt="Aariva Hotels & Banquets" width={64} height={64} priority unoptimized className="h-14 w-14 rounded-sm bg-cream object-contain p-1"/><span className="leading-tight"><strong className="block text-xl tracking-[0.12em]">AARIVA</strong><span className="block text-[9px] uppercase tracking-[0.16em]">Hotels &amp; Banquets</span></span></span>;
}
