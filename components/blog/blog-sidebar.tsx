import Link from "next/link";
import { IconMapPin, IconSearch } from "@/components/layout/icons";
import { cn } from "@/components/ui/cn";
import { blogImageFallbackSrc, blogPageCopy } from "@/lib/content/blog-page";
import {
  buildBlogPageUrl,
  type BlogCategory,
  type BlogListingQuery,
  type BlogPost,
} from "@/lib/wordpress/posts";
import { BlogNewsletter } from "./blog-newsletter";

export function BlogSidebar({
  categories,
  recentPosts,
  query,
  showCategoryCounts,
}: {
  categories: BlogCategory[];
  recentPosts: BlogPost[];
  query: BlogListingQuery;
  showCategoryCounts: boolean;
}) {
  const activeSlug = query.categorySlug || "all";

  return (
    <aside className="flex flex-col gap-8" aria-label="Blog sidebar">
      <form method="get" action="/blog" role="search">
        {query.order === "asc" ? (
          <input type="hidden" name="order" value="asc" />
        ) : null}
        {activeSlug !== "all" ? (
          <input type="hidden" name="category" value={activeSlug} />
        ) : null}
        <label htmlFor="blog-search" className="sr-only">
          {blogPageCopy.searchLabel}
        </label>
        <div className="relative">
          <IconSearch className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            id="blog-search"
            type="search"
            name="q"
            defaultValue={query.search ?? ""}
            placeholder={blogPageCopy.searchPlaceholder}
            className={cn(
              "w-full rounded-full border border-border bg-surface py-3 pr-4 pl-11 text-sm text-text",
              "placeholder:text-muted/80",
              "focus:border-secondary/50 focus:outline-none focus:ring-2 focus:ring-secondary/20",
            )}
          />
        </div>
      </form>

      {categories.length > 0 ? (
      <section aria-labelledby="blog-categories-heading">
        <h2
          id="blog-categories-heading"
          className="font-heading text-lg font-semibold text-primary"
        >
          {blogPageCopy.categoriesHeading}
        </h2>
        <ul className="mt-4 divide-y divide-border/80">
          {categories.map((category) => {
            const isActive = category.slug === activeSlug;
            return (
              <li key={category.slug}>
                <Link
                  href={buildBlogPageUrl({
                    ...query,
                    categorySlug: category.slug,
                    page: 1,
                  })}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex items-center justify-between gap-3 py-2.5 text-sm no-underline",
                    isActive ? "font-semibold text-primary" : "text-text hover:text-secondary",
                  )}
                >
                  <span className="inline-flex min-w-0 items-center gap-2">
                    <IconMapPin className="size-3.5 shrink-0 text-secondary" />
                    <span className="truncate">{category.name}</span>
                  </span>
                  {showCategoryCounts ? (
                    <span className="rounded-full bg-sky px-2 py-0.5 text-xs font-semibold text-primary">
                      {category.count}
                    </span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
      ) : null}

      {recentPosts.length > 0 ? (
        <section aria-labelledby="blog-recent-heading">
          <h2
            id="blog-recent-heading"
            className="font-heading text-lg font-semibold text-primary"
          >
            {blogPageCopy.recentHeading}
          </h2>
          <ul className="mt-4 space-y-4">
            {recentPosts.slice(0, 4).map((post) => {
              const inner = (
                <>
                  <img
                    src={post.imageSrc ?? blogImageFallbackSrc}
                    alt=""
                    width={72}
                    height={72}
                    className="size-[4.5rem] shrink-0 rounded-md object-cover"
                  />
                  <span className="min-w-0">
                    <span className="block font-heading text-sm font-semibold leading-snug text-primary">
                      {post.title}
                    </span>
                    {post.dateLabel ? (
                      <span className="mt-1 block text-xs text-muted">
                        {post.dateLabel}
                      </span>
                    ) : null}
                  </span>
                </>
              );

              return (
                <li key={post.id}>
                  <Link href={post.href} className="flex gap-3 no-underline">
                    {inner}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      <BlogNewsletter />
    </aside>
  );
}
