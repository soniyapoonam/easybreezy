"use client";

import { useCallback, type FormEvent } from "react";
import { Container } from "@/components/ui";
import { destinationRegions } from "@/lib/content/destinations-page";
import { cn } from "@/components/ui/cn";

type DestinationsExplorerProps = {
  search: string;
  region: string;
  onSearchChange: (value: string) => void;
  onRegionChange: (value: string) => void;
};

export function DestinationsExplorer({
  search,
  region,
  onSearchChange,
  onRegionChange,
}: DestinationsExplorerProps) {
  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const featured = document.getElementById("destinations-featured");
    featured?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="relative z-20 -mt-10 md:-mt-14">
      <Container>
        <form
          onSubmit={handleSubmit}
          className="destinations-reveal destinations-reveal-delay-3 mx-auto max-w-4xl rounded-2xl border border-white/40 bg-white/75 p-4 shadow-lg backdrop-blur-xl sm:p-5 md:rounded-3xl md:p-6"
          aria-label="Search destinations"
        >
          <div className="grid gap-3 md:grid-cols-[1fr_auto_auto] md:items-center md:gap-4">
            <label className="sr-only" htmlFor="destination-search">
              Search destination
            </label>
            <div className="relative">
              <span
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                aria-hidden="true"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              </span>
              <input
                id="destination-search"
                type="search"
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Search your next destination..."
                className={cn(
                  "w-full rounded-full border border-border/80 bg-white/90 py-3 pl-11 pr-4 text-sm text-text",
                  "transition-[border-color,box-shadow] duration-300",
                  "placeholder:text-muted/80",
                  "focus:border-secondary/50 focus:outline-none focus:ring-2 focus:ring-secondary/20",
                )}
              />
            </div>

            <label className="sr-only" htmlFor="destination-region">
              Filter by region
            </label>
            <select
              id="destination-region"
              value={region}
              onChange={(event) => onRegionChange(event.target.value)}
              className={cn(
                "w-full rounded-full border border-border/80 bg-white/90 px-4 py-3 text-sm text-text md:w-auto md:min-w-[11rem]",
                "transition-[border-color,box-shadow] duration-300",
                "focus:border-secondary/50 focus:outline-none focus:ring-2 focus:ring-secondary/20",
              )}
            >
              {destinationRegions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>

            <button type="submit" className="btn btn-primary w-full md:w-auto">
              Explore
            </button>
          </div>
        </form>
      </Container>
    </div>
  );
}
