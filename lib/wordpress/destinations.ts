import type { Destination } from "@/lib/content/destinations";
import { wpFetch } from "./client";
import { WORDPRESS_DESTINATIONS_PATHS } from "./config";

export const HOME_DESTINATION_COUNT = 5;

export type WordpressDestination = Destination & {
  rating: number | null;
  reviewCount: number | null;
};

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

type WpDestinationPost = {
  id?: number;
  slug?: string;
  date?: string;
  title?: WpRendered | string;
  excerpt?: WpRendered | string;
  content?: WpRendered | string;
  featured_media?: number;
  acf?: WpAcf;
  _embedded?: WpEmbedded;
  rating?: unknown;
  review_count?: unknown;
  region?: unknown;
  featured_on_home?: unknown;
  featured?: unknown;
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

function mediaUrl(value: unknown): string {
  const direct = asString(value).trim();
  if (direct.startsWith("http://") || direct.startsWith("https://") || direct.startsWith("/")) {
    return direct;
  }
  if (!isRecord(value)) return "";
  const url = asString(value.url).trim();
  if (url) return url;
  return asString(value.source_url).trim();
}

function acfValue(post: WpDestinationPost, key: string): unknown {
  if (post.acf && key in post.acf) return post.acf[key];
  return post[key as keyof WpDestinationPost];
}

function hasField(post: WpDestinationPost, key: string): boolean {
  if (post.acf && key in post.acf) {
    const value = post.acf[key];
    return value !== undefined && value !== null && value !== "";
  }
  const value = post[key as keyof WpDestinationPost];
  return value !== undefined && value !== null && value !== "";
}

function toDisplayOrder(value: unknown): number {
  const numeric =
    typeof value === "number" ? value : Number.parseInt(asString(value), 10);
  return Number.isFinite(numeric) ? numeric : Number.MAX_SAFE_INTEGER;
}

function hasDisplayOrder(post: WpDestinationPost): boolean {
  return toDisplayOrder(acfValue(post, "display_order")) !== Number.MAX_SAFE_INTEGER;
}

function parseOptionalRating(post: WpDestinationPost): number | null {
  if (!hasField(post, "rating")) return null;
  const value = acfValue(post, "rating");
  const numeric = typeof value === "number" ? value : Number.parseFloat(asString(value));
  if (!Number.isFinite(numeric) || numeric <= 0) return null;
  return numeric;
}

function parseOptionalReviewCount(post: WpDestinationPost): number | null {
  if (!hasField(post, "review_count") && !hasField(post, "reviews_count")) {
    return null;
  }
  const value = hasField(post, "review_count")
    ? acfValue(post, "review_count")
    : acfValue(post, "reviews_count");
  const numeric =
    typeof value === "number" ? value : Number.parseInt(asString(value), 10);
  if (!Number.isFinite(numeric) || numeric < 0) return null;
  return numeric;
}

function isTruthyFlag(value: unknown): boolean {
  if (value === true || value === 1) return true;
  const text = asString(value).trim().toLowerCase();
  return text === "1" || text === "true" || text === "yes";
}

function isFeaturedOnHome(post: WpDestinationPost): boolean {
  return (
    isTruthyFlag(acfValue(post, "featured_on_home")) ||
    isTruthyFlag(acfValue(post, "featured"))
  );
}

function resolveImage(post: WpDestinationPost): { src: string | null; alt: string } {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  const featured = media?.source_url?.trim() || "";
  const acfImage = mediaUrl(acfValue(post, "featured_image"));
  const src = featured || acfImage || null;
  return {
    src,
    alt: media?.alt_text?.trim() || "",
  };
}

function mapDestination(post: WpDestinationPost): WordpressDestination | null {
  const title = renderedText(post.title);
  const slug = asString(post.slug).trim();
  if (!slug || !title) return null;

  const { src, alt } = resolveImage(post);
  const region = stripHtml(asString(acfValue(post, "region")));
  const summary =
    stripHtml(asString(acfValue(post, "short_description"))) ||
    renderedText(post.excerpt) ||
    renderedText(post.content);

  return {
    slug,
    name: title,
    href: `/destinations/${slug}`,
    region,
    summary,
    featuredOnHome: isFeaturedOnHome(post),
    imageAlt: alt || title,
    tone: "ridge",
    imageSrc: src,
    rating: parseOptionalRating(post),
    reviewCount: parseOptionalReviewCount(post),
  };
}

function sortDestinationPosts(posts: WpDestinationPost[]): WpDestinationPost[] {
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

async function fetchDestinationPosts(): Promise<WpDestinationPost[]> {
  for (const path of WORDPRESS_DESTINATIONS_PATHS) {
    try {
      const posts = await wpFetch<WpDestinationPost[]>(
        `${path}?_embed=1&per_page=100`,
      );
      if (Array.isArray(posts)) return posts;
    } catch (error) {
      console.error(`WordPress destinations fetch failed for ${path}:`, error);
    }
  }
  return [];
}

export async function getWordpressDestinations(): Promise<WordpressDestination[]> {
  const posts = await fetchDestinationPosts();
  return sortDestinationPosts(posts)
    .map(mapDestination)
    .filter((destination): destination is WordpressDestination => destination !== null);
}

export async function getHomeWordpressDestinations(
  count = HOME_DESTINATION_COUNT,
): Promise<WordpressDestination[]> {
  const destinations = await getWordpressDestinations();
  const featured = destinations.filter((destination) => destination.featuredOnHome);
  const source = featured.length > 0 ? featured : destinations;
  return source.slice(0, count);
}
