"use client";

import { cn } from "@/components/ui/cn";
import { blogPageCopy } from "@/lib/content/blog-page";
import type { BlogListingQuery } from "@/lib/wordpress/posts";

export function BlogSort({ query }: { query: BlogListingQuery }) {
  return (
    <form method="get" action="/blog" className="flex items-center gap-2">
      {query.search ? <input type="hidden" name="q" value={query.search} /> : null}
      {query.categorySlug && query.categorySlug !== "all" ? (
        <input type="hidden" name="category" value={query.categorySlug} />
      ) : null}
      <label htmlFor="blog-sort" className="sr-only">
        {blogPageCopy.sortLabel}
      </label>
      <select
        id="blog-sort"
        name="order"
        defaultValue={query.order === "asc" ? "asc" : "desc"}
        className={cn(
          "min-h-10 rounded-md border border-border bg-surface px-3 py-2 text-sm text-text",
          "focus:border-secondary/50 focus:outline-none focus:ring-2 focus:ring-secondary/20",
        )}
        onChange={(event) => {
          event.currentTarget.form?.requestSubmit();
        }}
      >
        <option value="desc">{blogPageCopy.latestLabel}</option>
        <option value="asc">{blogPageCopy.oldestLabel}</option>
      </select>
    </form>
  );
}
