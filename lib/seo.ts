import type { Metadata } from "next";
import { hotel, fullAddress } from "@/data/hotel";
import { amenities } from "@/data/amenities";
import { rooms } from "@/data/rooms";
import type { BlogPost } from "@/lib/blog";

export const SITE_URL = hotel.siteUrl;

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

interface PageMeta {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
}

/**
 * Unique title, description, canonical, Open Graph and Twitter tags for a page.
 * Titles are used as written (no template suffix), so include the brand where useful.
 */
export function buildMetadata({
  title,
  description,
  path,
  image = "/images/aariva-deluxe.webp",
  imageAlt = "Aariva, Ujjain",
  type = "website",
  publishedTime,
  modifiedTime,
  noindex,
}: PageMeta): Metadata {
  // og images must be absolute; resolve responsive WebP to its largest variant
  const ogImage = image.startsWith("/images/") ? image.replace(/\.webp$/, "-1280.webp") : image;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type,
      url: path,
      siteName: hotel.legalName,
      title,
      description,
      locale: "en_IN",
      images: [{ url: ogImage, alt: imageAlt }],
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

/* ------------------------------ JSON-LD builders ------------------------------ */

const hotelId = `${SITE_URL}/#hotel`;

/** Hotel (a LodgingBusiness / LocalBusiness subtype). Only verified fields are emitted. */
export function hotelSchema() {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "@id": hotelId,
    name: hotel.legalName,
    alternateName: hotel.name,
    slogan: hotel.tagline,
    url: SITE_URL,
    logo: absoluteUrl("/aariva-logo.png"),
    image: [absoluteUrl("/images/aariva-exterior-1280.webp"), absoluteUrl("/images/aariva-deluxe-1280.webp")],
    telephone: hotel.phone,
    email: hotel.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${hotel.address.line1}, ${hotel.address.line2}`,
      addressLocality: "Ujjain",
      addressRegion: hotel.address.region,
      postalCode: hotel.address.postalCode,
      addressCountry: hotel.country,
    },
    hasMap: hotel.googleMapsUrl,
    amenityFeature: amenities.filter(a => a.id !== 'parking').map((a) => ({ "@type": "LocationFeatureSpecification", name: a.label, value: true })),
  };
  const prices = rooms.map((r) => r.startingPrice).filter((p): p is number => typeof p === "number");
  if (prices.length) schema.priceRange = `From ₹${Math.min(...prices).toLocaleString("en-IN")} per night`;
  if (hotel.geo) schema.geo = { "@type": "GeoCoordinates", latitude: hotel.geo.lat, longitude: hotel.geo.lng };
  if (hotel.checkInTime24) schema.checkinTime = hotel.checkInTime24;
  if (hotel.checkOutTime24) schema.checkoutTime = hotel.checkOutTime24;
  const sameAs = Object.values(hotel.social).filter(Boolean);
  if (sameAs.length) schema.sameAs = sameAs;
  // No aggregateRating: Google treats ratings a business publishes about itself as
  // "self-serving" and ignores or penalises them. The Google rating is shown on-page only.
  return schema;
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: hotel.legalName,
    url: SITE_URL,
    publisher: { "@id": hotelId },
    inLanguage: "en-IN",
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleSchema(post: BlogPost) {
  const url = absoluteUrl(`/blog/${post.slug}/`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    image: absoluteUrl(post.featuredImage.replace(/\.webp$/, "-1280.webp")),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: { "@type": "Organization", name: post.author, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: hotel.legalName,
      logo: { "@type": "ImageObject", url: absoluteUrl("/aariva-logo.png") },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: post.category,
    inLanguage: "en-IN",
  };
}

export function roomSchema(room: { name: string; slug: string; shortDescription: string; guests?: number; images: { src: string }[] }) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HotelRoom",
    name: room.name,
    description: room.shortDescription,
    url: absoluteUrl(`/rooms/${room.slug}/`),
    image: room.images.map((i) => absoluteUrl(i.src.replace(/\.webp$/, "-1280.webp"))),
    containedInPlace: { "@id": hotelId },
  };
  if (room.guests) schema.occupancy = { "@type": "QuantitativeValue", maxValue: room.guests };
  return schema;
}

export const addressText = fullAddress;
