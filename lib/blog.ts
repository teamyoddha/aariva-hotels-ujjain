/**
 * Blog content layer.
 *
 * Presentation components only ever see the normalised `BlogPost` type below.
 * Today posts come from MDX files in /content/blog. To move to a CMS (Sanity,
 * Strapi, headless WordPress, Contentful), replace the two functions in the
 * "source adapter" section so they return the same shape — no page or component
 * needs to change.
 *
 * Adding a post = adding one .mdx file. The listing, category pages, homepage
 * "latest posts", article page, metadata, Article schema, related posts and the
 * sitemap all pick it up at the next build.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { blogCategories } from "@/data/blog";
import { slugify } from "@/lib/utils";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  featuredImage: string;
  featuredImageAlt: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  seoTitle?: string;
  seoDescription?: string;
  readingMinutes: number;
  draft?: boolean;
}

export interface BlogPostWithBody extends BlogPost {
  body: string;
  headings: { id: string; text: string }[];
}

/* ---------------------------- source adapter (MDX) ---------------------------- */

const DIR = path.join(process.cwd(), "content", "blog");

function readAll(): BlogPostWithBody[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map((file) => {
      const raw = fs.readFileSync(path.join(DIR, file), "utf8");
      const { data, content } = matter(raw);
      const slug = (data.slug as string) || file.replace(/\.mdx?$/, "");
      const required = ["title", "excerpt", "category", "publishedAt"] as const;
      for (const key of required) {
        if (!data[key]) throw new Error(`content/blog/${file}: missing frontmatter "${key}"`);
      }
      const known = blogCategories.find((c) => c.name === data.category);
      if (!known) {
        throw new Error(
          `content/blog/${file}: category "${data.category}" is not in data/blog.ts (${blogCategories
            .map((c) => c.name)
            .join(", ")})`,
        );
      }
      return {
        slug,
        title: data.title,
        excerpt: data.excerpt,
        category: data.category,
        categorySlug: known.slug,
        featuredImage: data.featuredImage || "/images/mahakaleshwar.webp",
        featuredImageAlt: data.featuredImageAlt || "",
        publishedAt: toISO(data.publishedAt),
        updatedAt: data.updatedAt ? toISO(data.updatedAt) : undefined,
        author: data.author || "Aariva",
        seoTitle: data.seoTitle || undefined,
        seoDescription: data.seoDescription || undefined,
        draft: Boolean(data.draft),
        readingMinutes: Math.max(1, Math.round(content.split(/\s+/).length / 200)),
        body: content,
        headings: extractHeadings(content),
      } satisfies BlogPostWithBody;
    });
}

function toISO(v: unknown) {
  // gray-matter parses unquoted YAML dates into Date objects
  return v instanceof Date ? v.toISOString().slice(0, 10) : String(v);
}

function extractHeadings(md: string) {
  return [...md.matchAll(/^##\s+(.+)$/gm)].map((m) => {
    const text = m[1].replace(/[*_`]/g, "").trim();
    return { id: slugify(text), text };
  });
}

/* ------------------------------- public API -------------------------------- */

let cache: BlogPostWithBody[] | null = null;
function posts() {
  if (!cache || process.env.NODE_ENV === "development") {
    cache = readAll()
      .filter((p) => !p.draft)
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }
  return cache;
}

function strip({ body: _b, headings: _h, ...meta }: BlogPostWithBody): BlogPost {
  return meta;
}

export function getAllPosts(): BlogPost[] {
  return posts().map(strip);
}

export function getLatestPosts(n = 3): BlogPost[] {
  return getAllPosts().slice(0, n);
}

export function getPost(slug: string): BlogPostWithBody | undefined {
  return posts().find((p) => p.slug === slug);
}

export function getPostsByCategory(categorySlug: string): BlogPost[] {
  return getAllPosts().filter((p) => p.categorySlug === categorySlug);
}

/** Same category first, then most recent. Returns [] when there is nothing else. */
export function getRelatedPosts(slug: string, n = 3): BlogPost[] {
  const current = getPost(slug);
  if (!current) return [];
  const others = getAllPosts().filter((p) => p.slug !== slug);
  const same = others.filter((p) => p.category === current.category);
  const rest = others.filter((p) => p.category !== current.category);
  return [...same, ...rest].slice(0, n);
}
