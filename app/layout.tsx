import type { Metadata, Viewport } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBookingBar } from "@/components/MobileBookingBar";
import { RevealObserver } from "@/components/RevealObserver";
import { JsonLd } from "@/components/JsonLd";
import { hotelSchema, websiteSchema, SITE_URL } from "@/lib/seo";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-lora",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Aariva Hotels & Banquets | Comfortable Stays in Ujjain",
    template: "%s | Aariva Ujjain",
  },
  description:
    "Aariva Hotels & Banquets in Nanakheda, Ujjain. Family and Deluxe rooms, free Wi-Fi, air conditioning and celebration space.",
  applicationName: "Aariva",
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#551F17",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={lora.variable} suppressHydrationWarning>
      <head>
        {/* Enables reveal animations only when JS runs; content is visible otherwise */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <JsonLd data={[hotelSchema(), websiteSchema()]} />
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <MobileBookingBar />
        <RevealObserver />
      </body>
    </html>
  );
}
