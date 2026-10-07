import { unsplashImages } from "@/lib/content/unsplash";
import type { Service } from "@/lib/content/services";
import type { ServiceWithImage } from "@/lib/content/services-page";
import { wpFetch } from "./client";

const KNOWN_SERVICE_IDS = [
  "tour-package",
  "custom-trip",
  "corporate-taxi",
  "round-trip",
  "local-taxi",
  "outstation-taxi",
] as const;

type KnownServiceId = (typeof KNOWN_SERVICE_IDS)[number];

const FALLBACK_IMAGES: Record<KnownServiceId, string> = {
  "tour-package": unsplashImages.servicesPage.tourPackage,
  "custom-trip": unsplashImages.servicesPage.customTrip,
  "corporate-taxi": unsplashImages.servicesPage.corporateTaxi,
  "round-trip": unsplashImages.servicesPage.roundTrip,
  "local-taxi": unsplashImages.servicesPage.localTaxi,
  "outstation-taxi": unsplashImages.servicesPage.outstationTaxi,
};

const TONE_BY_ID: Record<KnownServiceId, Service["tone"]> = {
  "tour-package": "ridge",
  "custom-trip": "dusk",
  "corporate-taxi": "pass",
  "round-trip": "lake",
  "local-taxi": "forest",
  "outstation-taxi": "temple",
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

type WpServicePost = {
  id?: number;
  slug?: string;
  title?: WpRendered | string;
  excerpt?: WpRendered | string;
  content?: WpRendered | string;
  featured_media?: number;
  acf?: WpAcf;
  _embedded?: WpEmbedded;
  short_description?: unknown;
  service_icon?: unknown;
  display_order?: unknown;
  cta_text?: unknown;
  cta_link?: unknown;
  full_description?: unknown;
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
  const source = asString(value.source_url).trim();
  if (source) return source;
  return "";
}

function acfValue(post: WpServicePost, key: string): unknown {
  if (post.acf && key in post.acf) return post.acf[key];
  return post[key as keyof WpServicePost];
}

function toDisplayOrder(value: unknown): number {
  const numeric = typeof value === "number" ? value : Number.parseInt(asString(value), 10);
  return Number.isFinite(numeric) ? numeric : Number.MAX_SAFE_INTEGER;
}

function kebab(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[_/\s]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function asKnownServiceId(value: string): KnownServiceId | null {
  const normalized = kebab(value);
  return KNOWN_SERVICE_IDS.find((id) => id === normalized) ?? null;
}

function resolveServiceId(post: WpServicePost, slug: string, title: string): KnownServiceId {
  const icon = asString(acfValue(post, "service_icon"));
  return (
    asKnownServiceId(icon) ??
    asKnownServiceId(slug) ??
    asKnownServiceId(title) ??
    "tour-package"
  );
}

function resolveImageSrc(post: WpServicePost, serviceId: KnownServiceId): string {
  const featured = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  if (featured) return featured;

  const acfImage = mediaUrl(acfValue(post, "featured_image"));
  if (acfImage) return acfImage;

  return FALLBACK_IMAGES[serviceId];
}

function resolveSummary(post: WpServicePost): string {
  const shortDescription = stripHtml(asString(acfValue(post, "short_description")));
  if (shortDescription) return shortDescription;

  const excerpt = renderedText(post.excerpt);
  if (excerpt) return excerpt;

  const fullDescription = stripHtml(asString(acfValue(post, "full_description")));
  if (fullDescription) return fullDescription;

  return renderedText(post.content);
}

function resolveHref(post: WpServicePost, slug: string): string {
  const ctaLink = asString(acfValue(post, "cta_link")).trim();
  if (ctaLink) return ctaLink;
  return slug ? `/services#${slug}` : "/services";
}

function mapService(post: WpServicePost): ServiceWithImage {
  const title = renderedText(post.title) || "Service";
  const slug = kebab(asString(post.slug)) || kebab(title) || "service";
  const id = resolveServiceId(post, slug, title);
  const summary = resolveSummary(post);
  const imageAlt =
    post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text?.trim() || title;
  const ctaHref = resolveHref(post, slug);

  return {
    id,
    slug,
    title,
    href: ctaHref,
    summary,
    imageAlt,
    tone: TONE_BY_ID[id],
    imageSrc: resolveImageSrc(post, id),
  };
}

export async function getWordpressServices(): Promise<ServiceWithImage[]> {
  try {
    const posts = await wpFetch<WpServicePost[]>(
      "/services?_embed=1&per_page=100",
    );

    if (!Array.isArray(posts)) return [];

    return [...posts]
      .sort(
        (a, b) =>
          toDisplayOrder(acfValue(a, "display_order")) -
          toDisplayOrder(acfValue(b, "display_order")),
      )
      .map(mapService);
  } catch {
    return [];
  }
}
