import { cache } from "react";
import type { DestinationsPageDestination } from "@/lib/content/destinations-page";
import { destinationsPageList } from "@/lib/content/destinations-page";
import { destinations } from "@/lib/content/destinations";
import {
  getWordpressDestinationDetails,
  type DestinationDetail,
} from "@/lib/wordpress/destination-detail";

export type DestinationPageData = {
  destination: DestinationDetail;
  related: DestinationsPageDestination[];
};

function detailFromListed(item: DestinationsPageDestination): DestinationDetail {
  return {
    slug: item.slug,
    name: item.name,
    href: item.href,
    region: item.country,
    regionKey: item.region,
    summary: item.summary,
    overviewHtml: "",
    imageSrc: item.imageSrc || null,
    imageAlt: item.imageAlt || item.name,
    highlights: [],
    gallery: item.imageSrc
      ? [{ src: item.imageSrc, alt: item.imageAlt || item.name }]
      : [],
    itinerary: [],
    inclusions: [],
    exclusions: [],
    bestTime: null,
    faqs: [],
    startingPriceLabel: null,
    rating: null,
    reviewCount: null,
  };
}

function staticDetails(): DestinationDetail[] {
  const listed = destinationsPageList.map(detailFromListed);
  const known = new Set(listed.map((item) => item.slug));

  for (const item of destinations) {
    if (known.has(item.slug)) continue;
    listed.push({
      slug: item.slug,
      name: item.name,
      href: item.href,
      region: item.region,
      regionKey: item.region.toLowerCase(),
      summary: item.summary,
      overviewHtml: "",
      imageSrc: item.imageSrc,
      imageAlt: item.imageAlt || item.name,
      highlights: [],
      gallery: item.imageSrc
        ? [{ src: item.imageSrc, alt: item.imageAlt || item.name }]
        : [],
      itinerary: [],
      inclusions: [],
      exclusions: [],
      bestTime: null,
      faqs: [],
      startingPriceLabel: null,
      rating: null,
      reviewCount: null,
    });
  }

  return listed;
}

function toCard(detail: DestinationDetail): DestinationsPageDestination {
  const listed = destinationsPageList.find((item) => item.slug === detail.slug);
  if (listed) return listed;

  return {
    slug: detail.slug,
    name: detail.name,
    region: detail.regionKey || "all",
    country: detail.region || detail.name,
    summary: detail.summary,
    href: detail.href,
    imageSrc: detail.imageSrc ?? "",
    imageAlt: detail.imageAlt || detail.name,
    moods: [],
    mapPosition: { x: 0, y: 0 },
    size: "small",
  };
}

function takeRelated(
  current: DestinationDetail,
  pool: readonly DestinationDetail[],
): DestinationDetail[] {
  const others = pool.filter((item) => item.slug !== current.slug);
  const sameRegion = current.regionKey
    ? others.filter((item) => item.regionKey === current.regionKey)
    : [];
  const related = [...sameRegion];

  for (const item of others) {
    if (related.length >= 3) break;
    if (related.some((entry) => entry.slug === item.slug)) continue;
    related.push(item);
  }

  return related.slice(0, 3);
}

export const getDestinationPage = cache(async function getDestinationPage(
  slug: string,
): Promise<DestinationPageData | null> {
  const normalized = decodeURIComponent(slug).trim().toLowerCase();
  if (!normalized) return null;

  const catalog = staticDetails();
  let wordpress: DestinationDetail[] = [];

  try {
    wordpress = await getWordpressDestinationDetails();
  } catch (error) {
    console.error("WordPress destination detail lookup failed:", error);
  }

  const fromWordpress = wordpress.find((item) => item.slug === normalized) ?? null;
  const destination = fromWordpress ?? catalog.find((item) => item.slug === normalized) ?? null;
  if (!destination) return null;

  const relatedPool = fromWordpress ? wordpress : catalog;
  const related = takeRelated(destination, relatedPool);

  if (fromWordpress && related.length < 3) {
    for (const item of takeRelated(destination, catalog)) {
      if (related.length >= 3) break;
      if (related.some((entry) => entry.slug === item.slug)) continue;
      related.push(item);
    }
  }

  return {
    destination,
    related: related.slice(0, 3).map(toCard),
  };
});
