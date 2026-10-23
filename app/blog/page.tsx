import type { Metadata } from "next";
import { Suspense } from "react";
import {
  BlogCtaBanner,
  BlogHero,
  BlogJournal,
  BlogListingSkeleton,
} from "@/components/blog";
import { siteConfig } from "@/lib/site";
import type { BlogListingQuery } from "@/lib/wordpress/posts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Blog | ${siteConfig.name}`,
  description:
    "Read Easy Travels travel stories, destination guides, and tips to plan your next adventure.",
};

type BlogPageProps = {
  searchParams: Promise<{
    category?: string;
    q?: string;
    order?: string;
    page?: string;
  }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const parsedPage = Number.parseInt(params.page ?? "1", 10);
  const query: BlogListingQuery = {
    categorySlug: params.category?.trim() || undefined,
    search: params.q?.trim() || undefined,
    order: params.order === "asc" ? "asc" : "desc",
    page: Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1,
  };

  return (
    <div className="bg-surface">
      <BlogHero />
      <Suspense fallback={<BlogListingSkeleton />}>
        <BlogJournal query={query} />
      </Suspense>
      <BlogCtaBanner />
    </div>
  );
}
