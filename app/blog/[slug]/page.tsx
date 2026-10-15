import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BlogCard } from "@/components/BlogCard";
import { JsonLd } from "@/components/JsonLd";
import { mdxComponents } from "@/components/mdx";
import { getAllPosts, getPost, getRelatedPosts } from "@/lib/blog";
import { articleSchema, buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return buildMetadata({
    title: post.seoTitle || `${post.title} | Aariva`,
    description: post.seoDescription || post.excerpt,
    path: `/blog/${post.slug}/`,
    image: post.featuredImage,
    imageAlt: post.featuredImageAlt,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
  });
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const related = getRelatedPosts(post.slug, 3);
  const { body, headings, ...meta } = post;

  return (
    <>
      <JsonLd data={articleSchema(meta)} />
      <article>
        <header className="bg-ivory pt-8 md:pt-10">
          <div className="container-site">
            <Breadcrumbs
              items={[
                { name: "Blog", path: "/blog/" },
                { name: post.category, path: `/blog/category/${post.categorySlug}/` },
                { name: post.title, path: `/blog/${post.slug}/` },
              ]}
            />
            <div className="mx-auto mt-10 max-w-[820px] text-center">
              <Link href={`/blog/category/${post.categorySlug}/`} className="eyebrow justify-center hover:underline">
                {post.category}
              </Link>
              <h1 className="mt-5 font-medium text-maroon" style={{ fontSize: "clamp(34px, 4.4vw, 56px)", lineHeight: 1.12 }}>
                {post.title}
              </h1>
              <p className="lead mx-auto mt-6 max-w-[60ch]">{post.excerpt}</p>
              <p className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-ink-muted">
                <span>By {post.author}</span>
                <span aria-hidden className="h-1 w-1 rounded-full bg-gold" />
                <span>
                  Published <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                </span>
                {post.updatedAt && (
                  <>
                    <span aria-hidden className="h-1 w-1 rounded-full bg-gold" />
                    <span>
                      Updated <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
                    </span>
                  </>
                )}
                <span aria-hidden className="h-1 w-1 rounded-full bg-gold" />
                <span className="inline-flex items-center gap-1.5">
                  <Clock aria-hidden size={14} /> {post.readingMinutes} min read
                </span>
              </p>
            </div>
          </div>
          <div className="container-wide mt-12">
            <div className="relative aspect-[16/9] overflow-hidden rounded-md bg-sand md:aspect-[21/9]">
              <Image src={post.featuredImage} alt={post.featuredImageAlt} fill priority sizes="(min-width: 1280px) 1232px, 100vw" className="object-cover" />
            </div>
          </div>
        </header>

        <div className="container-site grid gap-12 py-14 md:grid-cols-[220px_1fr] md:gap-16 md:py-20">
          {headings.length > 2 ? (
            <nav aria-labelledby="toc-title" className="md:sticky md:top-[calc(var(--header-h)+32px)] md:self-start">
              <details className="group rounded-sm border border-line bg-white p-5 md:border-0 md:bg-transparent md:p-0" open>
                <summary id="toc-title" className="cursor-pointer list-none text-xs font-semibold uppercase tracking-[2px] text-gold-text">
                  In this guide
                </summary>
                <ol className="mt-4 space-y-2.5 border-l border-line pl-4 text-sm">
                  {headings.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="text-ink-muted hover:text-maroon">
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </details>
            </nav>
          ) : (
            <div className="hidden md:block" />
          )}
          <div className="prose-shiv">
            <MDXRemote source={body} components={mdxComponents} options={{ blockJS: false }} />
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="section border-t border-line bg-white">
          <div className="container-wide">
            <h2 id="related-title" className="heading-section">
              More Ujjain Guides
            </h2>
            <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
