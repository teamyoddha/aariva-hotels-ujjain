import type { MetadataRoute } from "next";
import { rooms } from "@/data/rooms";
import { blogCategories } from "@/data/blog";
import { getAllPosts, getPostsByCategory } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latest = posts[0]?.updatedAt || posts[0]?.publishedAt;
  const page = (path: string, priority: number, lastModified?: string) => ({
    url: absoluteUrl(path),
    lastModified: lastModified ? new Date(lastModified) : undefined,
    priority,
  });
  return [
    page("/", 1),
    page("/rooms/", 0.9),
    ...rooms.map((r) => page(`/rooms/${r.slug}/`, 0.8)),
    page("/about/", 0.7),
    page("/banquets/", 0.8),
    page("/gallery/", 0.7),
    page("/explore-ujjain/", 0.7),
    page("/contact/", 0.8),
    page("/blog/", 0.7, latest),
    ...blogCategories.filter((c) => getPostsByCategory(c.slug).length).map((c) => page(`/blog/category/${c.slug}/`, 0.4)),
    ...posts.map((p) => page(`/blog/${p.slug}/`, 0.6, p.updatedAt || p.publishedAt)),
    page("/privacy-policy/", 0.2),
    page("/terms-and-conditions/", 0.2),
    page("/cancellation-policy/", 0.2),
  ];
}
