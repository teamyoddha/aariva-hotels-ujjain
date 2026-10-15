"use client";

import Link from "next/link";
import { useState } from "react";
import type { BlogPost } from "@/lib/blog";
import { POSTS_PER_PAGE } from "@/data/blog";
import { BlogCard } from "./BlogCard";

/**
 * Post grid with "Load more". The first page is rendered into the static HTML;
 * further cards appear on click, so long archives never load at once.
 */
export function BlogIndex({ posts }: { posts: BlogPost[] }) {
  const [count, setCount] = useState(POSTS_PER_PAGE);

  if (!posts.length) {
    return (
      <div className="rounded-sm border border-dashed border-line bg-white px-6 py-14 text-center">
        <p className="text-xl font-medium text-maroon">No articles are available in this category yet.</p>
        <Link href="/blog/" className="link-arrow mt-4">
          Explore all Aariva travel guides →
        </Link>
      </div>
    );
  }

  const visible = posts.slice(0, count);
  return (
    <>
      <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 md:grid-cols-3">
        {visible.map((p) => (
          <BlogCard key={p.slug} post={p} headingLevel="h2" />
        ))}
      </div>
      {count < posts.length && (
        <div className="mt-14 text-center">
          <button type="button" onClick={() => setCount((c) => c + POSTS_PER_PAGE)} className="btn-secondary">
            Load More Articles
          </button>
          <p className="mt-3 text-sm text-ink-muted" aria-live="polite">
            Showing {visible.length} of {posts.length}
          </p>
        </div>
      )}
    </>
  );
}
