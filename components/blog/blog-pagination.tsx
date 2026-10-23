import Link from "next/link";
import { cn } from "@/components/ui/cn";
import { getVisiblePageNumbers } from "@/lib/destinations-pagination";
import {
  buildBlogPageUrl,
  type BlogListingQuery,
} from "@/lib/wordpress/posts";

export function BlogPagination({
  currentPage,
  totalPages,
  query,
}: {
  currentPage: number;
  totalPages: number;
  query: BlogListingQuery;
}) {
  const pageNumbers = getVisiblePageNumbers(currentPage, totalPages);
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  const hrefFor = (page: number) =>
    buildBlogPageUrl({ ...query, page });

  const controlClass = (disabled: boolean) =>
    cn(
      "inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border px-3 text-sm font-semibold no-underline transition-all duration-300 sm:px-4",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30",
      disabled
        ? "cursor-not-allowed border-border/60 bg-surface text-muted/60"
        : "border-border bg-surface text-primary hover:-translate-y-0.5 hover:border-secondary/35 hover:bg-sky/60 hover:shadow-sm motion-reduce:transform-none",
    );

  return (
    <nav
      className="mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
      aria-label="Blog pages"
    >
      {isFirstPage ? (
        <span className={controlClass(true)}>
          <span aria-hidden="true">←</span>
          <span className="hidden sm:inline">Previous</span>
        </span>
      ) : (
        <Link href={hrefFor(currentPage - 1)} className={controlClass(false)}>
          <span aria-hidden="true">←</span>
          <span className="hidden sm:inline">Previous</span>
        </Link>
      )}

      <div className="flex items-center gap-1.5 sm:gap-2">
        {pageNumbers.map((item, index) =>
          item === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              className="px-1 text-sm text-muted"
              aria-hidden="true"
            >
              …
            </span>
          ) : (
            <Link
              key={item}
              href={hrefFor(item)}
              aria-label={`Page ${item}`}
              aria-current={item === currentPage ? "page" : undefined}
              className={cn(
                "inline-flex size-10 min-w-10 items-center justify-center rounded-full border text-sm font-semibold no-underline transition-all duration-300 sm:size-11",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30",
                item === currentPage
                  ? "border-primary bg-primary text-on-primary shadow-sm"
                  : "border-border bg-surface text-primary hover:-translate-y-0.5 hover:border-secondary/35 hover:bg-sky/60 hover:shadow-sm motion-reduce:transform-none",
              )}
            >
              {item}
            </Link>
          ),
        )}
      </div>

      {isLastPage ? (
        <span className={controlClass(true)}>
          <span className="hidden sm:inline">Next</span>
          <span aria-hidden="true">→</span>
        </span>
      ) : (
        <Link href={hrefFor(currentPage + 1)} className={controlClass(false)}>
          <span className="hidden sm:inline">Next</span>
          <span aria-hidden="true">→</span>
        </Link>
      )}
    </nav>
  );
}
