import { siteConfig } from "@/lib/site";
import type {
  TourPackageBadgeTone,
  TourPackageListingItem,
} from "@/lib/content/tour-packages-page";
import { wpFetch } from "./client";
import { WORDPRESS_TOUR_PACKAGES_PATH } from "./config";

export const LATEST_WORDPRESS_TOUR_PACKAGE_COUNT = 3;

type WpRendered = {
  rendered?: string;
};

type WpFeaturedMedia = {
  source_url?: string;
  alt_text?: string;
};

type WpEmbedded = {
  "wp:featuredmedia"?: WpFeaturedMedia[];
};

type WpAcf = Record<string, unknown>;

type WpTourPackagePost = {
  id?: number;
  slug?: string;
  date?: string;
  title?: WpRendered | string;
  excerpt?: WpRendered | string;
  content?: WpRendered | string;
  featured_media?: number;
  acf?: WpAcf;
  _embedded?: WpEmbedded;
  location?: unknown;
  duration?: unknown;
  badge?: unknown;
  rating?: unknown;
  review_count?: unknown;
  short_description?: unknown;
  price_per_day?: unknown;
  cta_text?: unknown;
  cta_link?: unknown;
  display_order?: unknown;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function asString(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return "";
}

function stripHtml(value: string): string {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#039;/g, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function renderedText(value: unknown): string {
  if (typeof value === "string") return stripHtml(value);
  if (isRecord(value) && typeof value.rendered === "string") {
    return stripHtml(value.rendered);
  }
  return "";
}

function acfValue(post: WpTourPackagePost, key: string): unknown {
  if (post.acf && key in post.acf) return post.acf[key];
  return post[key as keyof WpTourPackagePost];
}

function toDisplayOrder(value: unknown): number {
  const numeric =
    typeof value === "number" ? value : Number.parseInt(asString(value), 10);
  return Number.isFinite(numeric) ? numeric : Number.MAX_SAFE_INTEGER;
}

function hasDisplayOrder(post: WpTourPackagePost): boolean {
  return toDisplayOrder(acfValue(post, "display_order")) !== Number.MAX_SAFE_INTEGER;
}

function parsePrice(value: unknown): number {
  const cleaned = asString(value).replace(/[^\d.]/g, "");
  if (!cleaned) return 0;
  const numeric = Number.parseFloat(cleaned);
  return Number.isFinite(numeric) ? numeric : 0;
}

function parseRating(value: unknown): number {
  const numeric = typeof value === "number" ? value : Number.parseFloat(asString(value));
  if (!Number.isFinite(numeric) || numeric < 0) return 0;
  return numeric;
}

function parseReviewCount(value: unknown): number {
  const numeric =
    typeof value === "number" ? value : Number.parseInt(asString(value), 10);
  if (!Number.isFinite(numeric) || numeric < 0) return 0;
  return numeric;
}

function parseDuration(value: unknown): { days: number; nights: number } {
  const text = asString(value);
  const daysMatch = text.match(/(\d+)\s*days?/i);
  const nightsMatch = text.match(/(\d+)\s*nights?/i);
  const days = daysMatch ? Number.parseInt(daysMatch[1], 10) : 0;
  const nights = nightsMatch ? Number.parseInt(nightsMatch[1], 10) : 0;
  return {
    days: Number.isFinite(days) ? days : 0,
    nights: Number.isFinite(nights) ? nights : 0,
  };
}

function badgeToneFromLabel(badge: string): TourPackageBadgeTone {
  const key = badge.trim().toLowerCase();
  if (key.includes("popular")) return "popular";
  if (key.includes("best")) return "bestseller";
  if (key.includes("family")) return "family";
  if (key.includes("cultural") || key.includes("culture")) return "cultural";
  if (key.includes("adventure")) return "adventure";
  if (key.includes("luxury")) return "luxury";
  return "default";
}

function resolveImage(post: WpTourPackagePost): { src: string; alt: string } {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  return {
    src: media?.source_url?.trim() ?? "",
    alt: media?.alt_text?.trim() || "",
  };
}

function mapTourPackage(post: WpTourPackagePost): TourPackageListingItem {
  const title = renderedText(post.title);
  const slug = asString(post.slug).trim() || `tour-package-${post.id ?? ""}`;
  const location = stripHtml(asString(acfValue(post, "location")));
  const badge = stripHtml(asString(acfValue(post, "badge")));
  const shortDescription =
    stripHtml(asString(acfValue(post, "short_description"))) ||
    renderedText(post.excerpt) ||
    renderedText(post.content);
  const pricePerDay = parsePrice(acfValue(post, "price_per_day"));
  const { days, nights } = parseDuration(acfValue(post, "duration"));
  const ctaLabel = stripHtml(asString(acfValue(post, "cta_text"))) || "Book Now";
  const ctaHref =
    asString(acfValue(post, "cta_link")).trim() || siteConfig.bookingHref;
  const { src, alt } = resolveImage(post);
  const imageAlt = alt || title;

  return {
    id: post.id != null ? String(post.id) : slug,
    slug,
    name: location || title,
    href: ctaHref,
    region: "",
    summary: shortDescription,
    featuredOnHome: true,
    imageAlt,
    tone: "ridge",
    imageSrc: src || null,
    title,
    destinationLabel: location,
    days,
    nights,
    rating: parseRating(acfValue(post, "rating")),
    reviewCount: parseReviewCount(acfValue(post, "review_count")),
    pricePerDay,
    badge: badge || undefined,
    category: "",
    experienceType: "",
    listingImageSrc: src,
    shortDescription,
    startingPrice: pricePerDay,
    priceFrom: pricePerDay,
    listingBadge: badge || undefined,
    badgeTone: badgeToneFromLabel(badge),
    ctaLabel,
    ctaHref,
  };
}

function sortTourPackagePosts(posts: WpTourPackagePost[]): WpTourPackagePost[] {
  const ordered = [...posts];
  if (ordered.some(hasDisplayOrder)) {
    ordered.sort(
      (a, b) =>
        toDisplayOrder(acfValue(a, "display_order")) -
        toDisplayOrder(acfValue(b, "display_order")),
    );
    return ordered;
  }

  ordered.sort((a, b) => {
    const aTime = Date.parse(asString(a.date)) || 0;
    const bTime = Date.parse(asString(b.date)) || 0;
    return bTime - aTime;
  });
  return ordered;
}

export async function getWordpressTourPackages(): Promise<TourPackageListingItem[]> {
  try {
    const posts = await wpFetch<WpTourPackagePost[]>(
      `${WORDPRESS_TOUR_PACKAGES_PATH}?_embed=1&per_page=100`,
    );

    if (!Array.isArray(posts)) return [];

    return sortTourPackagePosts(posts).map(mapTourPackage);
  } catch (error) {
    console.error("WordPress tour packages fetch failed:", error);
    return [];
  }
}

export async function getLatestWordpressTourPackages(
  count = LATEST_WORDPRESS_TOUR_PACKAGE_COUNT,
): Promise<TourPackageListingItem[]> {
  const packages = await getWordpressTourPackages();
  return packages.slice(0, count);
}
