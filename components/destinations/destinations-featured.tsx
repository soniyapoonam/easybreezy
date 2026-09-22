"use client";

import { useCallback, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Container, Section, SectionHeading } from "@/components/ui";
import { cn } from "@/components/ui/cn";
import {
  destinationsPageFeatured,
  destinationsPageList,
  type DestinationsPageDestination,
} from "@/lib/content/destinations-page";
import {
  buildDestinationsPageUrl,
  DESTINATIONS_PER_PAGE,
  paginateItems,
  resolvePageNumber,
} from "@/lib/destinations-pagination";
import { Reveal } from "@/components/services/reveal";
import { DestinationCard } from "./destination-card";
import { DestinationsPagination } from "./destinations-pagination";

type DestinationsFeaturedProps = {
  search: string;
  region: string;
};

function destinationGridClass(size: DestinationsPageDestination["size"]) {
  if (size === "large") return "sm:col-span-2 lg:col-span-7";
  if (size === "medium") return "lg:col-span-6";
  return "lg:col-span-4";
}

function GroupedDestinationGrid({
  destinations,
  pageKey,
}: {
  destinations: DestinationsPageDestination[];
  pageKey: number;
}) {
  const large = destinations.find((destination) => destination.size === "large");
  const medium = destinations.filter((destination) => destination.size === "medium");
  const small = destinations.filter((destination) => destination.size === "small");

  return (
    <div key={pageKey} className="destinations-grid-enter mt-10 grid gap-5 lg:grid-cols-12 lg:gap-6">
      {large ? (
        <div className="destinations-card-enter lg:col-span-7" style={{ animationDelay: "40ms" }}>
          <DestinationCard destination={large} className="h-full" />
        </div>
      ) : null}

      {medium.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
          {medium.map((destination, index) => (
            <div
              key={destination.slug}
              className="destinations-card-enter"
              style={{ animationDelay: `${80 + index * 60}ms` }}
            >
              <DestinationCard destination={destination} className="h-full" />
            </div>
          ))}
        </div>
      ) : null}

      {small.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-3">
          {small.map((destination, index) => (
            <div
              key={destination.slug}
              className="destinations-card-enter"
              style={{ animationDelay: `${120 + index * 50}ms` }}
            >
              <DestinationCard destination={destination} className="h-full" />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function OrderedDestinationGrid({
  destinations,
  pageKey,
}: {
  destinations: DestinationsPageDestination[];
  pageKey: number;
}) {
  return (
    <div
      key={pageKey}
      className="destinations-grid-enter mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6"
    >
      {destinations.map((destination, index) => (
        <div
          key={destination.slug}
          className={cn("destinations-card-enter", destinationGridClass(destination.size))}
          style={{ animationDelay: `${40 + index * 50}ms` }}
        >
          <DestinationCard destination={destination} className="h-full" />
        </div>
      ))}
    </div>
  );
}

function DestinationGrid({
  destinations,
  pageKey,
  currentPage,
}: {
  destinations: DestinationsPageDestination[];
  pageKey: number;
  currentPage: number;
}) {
  if (currentPage === 1) {
    return <GroupedDestinationGrid destinations={destinations} pageKey={pageKey} />;
  }

  return <OrderedDestinationGrid destinations={destinations} pageKey={pageKey} />;
}

export function DestinationsFeatured({ search, region }: DestinationsFeaturedProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  const previousPageRef = useRef<number | null>(null);
  const previousFiltersRef = useRef({ search, region });

  const normalizedSearch = search.trim().toLowerCase();

  const filtered = destinationsPageList.filter((destination) => {
    const matchesRegion = region === "all" || destination.region === region;
    const matchesSearch =
      !normalizedSearch ||
      destination.name.toLowerCase().includes(normalizedSearch) ||
      destination.country.toLowerCase().includes(normalizedSearch) ||
      destination.summary.toLowerCase().includes(normalizedSearch);
    return matchesRegion && matchesSearch;
  });

  const { currentPage, totalPages, showPagination } = resolvePageNumber(
    pageParam,
    filtered.length,
    DESTINATIONS_PER_PAGE,
  );

  const visibleDestinations = paginateItems(
    filtered,
    currentPage,
    DESTINATIONS_PER_PAGE,
  );

  useEffect(() => {
    if (!pageParam) return;

    const requestedPage = Number.parseInt(pageParam, 10);
    const canonicalUrl = buildDestinationsPageUrl(currentPage);
    const isInvalid =
      Number.isNaN(requestedPage) ||
      requestedPage < 1 ||
      requestedPage > totalPages ||
      requestedPage !== currentPage ||
      requestedPage === 1;

    if (isInvalid) {
      router.replace(canonicalUrl, { scroll: false });
    }
  }, [currentPage, pageParam, router, totalPages]);

  useEffect(() => {
    const filtersChanged =
      previousFiltersRef.current.search !== search ||
      previousFiltersRef.current.region !== region;

    if (filtersChanged) {
      previousFiltersRef.current = { search, region };
      if (pageParam) {
        router.replace("/destinations", { scroll: false });
      }
    }
  }, [pageParam, region, router, search]);

  useEffect(() => {
    if (previousPageRef.current !== null && previousPageRef.current !== currentPage) {
      document
        .getElementById("destinations-featured")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    previousPageRef.current = currentPage;
  }, [currentPage]);

  const handlePageChange = useCallback(
    (page: number) => {
      router.push(buildDestinationsPageUrl(page), { scroll: false });
    },
    [router],
  );

  return (
    <Section
      id="destinations-featured"
      aria-labelledby="destinations-featured-heading"
      className="bg-white"
    >
      <Container>
        <Reveal>
          <SectionHeading
            id="destinations-featured-heading"
            eyebrow={destinationsPageFeatured.eyebrow}
            heading={destinationsPageFeatured.heading}
            description={destinationsPageFeatured.description}
          />
        </Reveal>

        {filtered.length === 0 ? (
          <p className="mt-10 rounded-2xl border border-border bg-surface p-8 text-center text-muted">
            No destinations match your search. Try a different name or region.
          </p>
        ) : (
          <>
            <DestinationGrid
              destinations={visibleDestinations}
              pageKey={currentPage}
              currentPage={currentPage}
            />

            {showPagination ? (
              <DestinationsPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            ) : null}
          </>
        )}
      </Container>
    </Section>
  );
}
