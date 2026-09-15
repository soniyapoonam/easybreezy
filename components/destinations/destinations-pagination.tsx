"use client";

import { cn } from "@/components/ui/cn";
import { getVisiblePageNumbers } from "@/lib/destinations-pagination";

type DestinationsPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function DestinationsPagination({
  currentPage,
  totalPages,
  onPageChange,
}: DestinationsPaginationProps) {
  const pageNumbers = getVisiblePageNumbers(currentPage, totalPages);
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <nav
      className="mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
      aria-label="Destination pages"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirstPage}
        aria-label="Previous page"
        className={cn(
          "inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border px-3 text-sm font-semibold transition-all duration-300 sm:px-4",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30",
          isFirstPage
            ? "cursor-not-allowed border-border/60 bg-surface text-muted/60"
            : "border-border bg-surface text-primary hover:-translate-y-0.5 hover:border-secondary/35 hover:bg-sky/60 hover:shadow-sm motion-reduce:transform-none",
        )}
      >
        <span aria-hidden="true">←</span>
        <span className="hidden sm:inline">Previous</span>
      </button>

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
            <button
              key={item}
              type="button"
              onClick={() => onPageChange(item)}
              aria-label={`Page ${item}`}
              aria-current={item === currentPage ? "page" : undefined}
              className={cn(
                "inline-flex size-10 min-w-10 items-center justify-center rounded-full border text-sm font-semibold transition-all duration-300 sm:size-11",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30",
                item === currentPage
                  ? "border-primary bg-primary text-on-primary shadow-sm"
                  : "border-border bg-surface text-primary hover:-translate-y-0.5 hover:border-secondary/35 hover:bg-sky/60 hover:shadow-sm motion-reduce:transform-none",
              )}
            >
              {item}
            </button>
          ),
        )}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLastPage}
        aria-label="Next page"
        className={cn(
          "inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border px-3 text-sm font-semibold transition-all duration-300 sm:px-4",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30",
          isLastPage
            ? "cursor-not-allowed border-border/60 bg-surface text-muted/60"
            : "border-border bg-surface text-primary hover:-translate-y-0.5 hover:border-secondary/35 hover:bg-sky/60 hover:shadow-sm motion-reduce:transform-none",
        )}
      >
        <span className="hidden sm:inline">Next</span>
        <span aria-hidden="true">→</span>
      </button>
    </nav>
  );
}
