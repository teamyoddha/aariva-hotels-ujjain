import Link from "next/link";
import { getLatestPosts } from "@/lib/blog";
import { BlogCard } from "./BlogCard";
import { SectionHeading } from "./SectionHeading";

export function BlogPreview() {
  const posts = getLatestPosts(3);
  if (!posts.length) return null;
  return (
    <section aria-labelledby="blog-preview-title" className="section">
      <div className="container-wide">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="blog-preview-title"
            eyebrow="Aariva Travel Guide"
            title="Plan Your Ujjain Visit"
            intro="Practical guides written for families and pilgrims, from darshan tips to simple itineraries."
          />
          <Link href="/blog/" className="btn-secondary shrink-0 self-start md:self-auto">
            View All Articles
          </Link>
        </div>
        <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3">
          {posts.map((p) => (
            <BlogCard key={p.slug} post={p} showDate={false} />
          ))}
        </div>
      </div>
    </section>
  );
}
