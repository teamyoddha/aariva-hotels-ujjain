import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { BlogIndex } from "@/components/BlogIndex";
import { BlogCategoryNav } from "@/components/BlogCategoryNav";
import { blogCategories } from "@/data/blog";
import { getPostsByCategory } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

type Params = { category: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return blogCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category } = await params;
  const cat = blogCategories.find((c) => c.slug === category);
  if (!cat) return {};
  const empty = getPostsByCategory(cat.slug).length === 0;
  return buildMetadata({
    title: `${cat.name} | Aariva Ujjain Travel Guide`,
    description: `${cat.description} Articles from the Aariva Ujjain travel guide.`,
    path: `/blog/category/${cat.slug}/`,
    // Empty category pages exist so links never 404, but should not be indexed
    noindex: empty,
  });
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { category } = await params;
  const cat = blogCategories.find((c) => c.slug === category);
  if (!cat) notFound();
  const posts = getPostsByCategory(cat.slug);
  return (
    <>
      <PageHero
        eyebrow="Aariva Travel Guide"
        title={cat.name}
        crumbs={[
          { name: "Blog", path: "/blog/" },
          { name: cat.name, path: `/blog/category/${cat.slug}/` },
        ]}
        intro={<p>{cat.description}</p>}
      >
        <div className="mt-10">
          <BlogCategoryNav active={cat.slug} />
        </div>
      </PageHero>
      <section aria-label={`${cat.name} articles`} className="section pt-12 md:pt-16">
        <div className="container-wide">
          <BlogIndex posts={posts} />
        </div>
      </section>
    </>
  );
}
