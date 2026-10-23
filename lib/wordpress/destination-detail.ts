import { wpFetch } from "./client";
import { WORDPRESS_DESTINATIONS_PATHS, WORDPRESS_REST_BASE } from "./config";

export type DestinationHighlight = {
  title: string;
  description: string;
};

export type DestinationImage = {
  src: string;
  alt: string;
};

export type DestinationItineraryDay = {
  label: string;
  title: string;
  description: string;
};

export type DestinationFaq = {
  question: string;
  answer: string;
};

export type DestinationMonth = {
  label: string;
  shortLabel: string;
  recommended: boolean;
};

export type DestinationBestTime = {
  note: string;
  months: readonly DestinationMonth[] | null;
};

export type DestinationDetail = {
  slug: string;
  name: string;
  href: string;
  region: string;
  regionKey: string;
  summary: string;
  overviewHtml: string;
  imageSrc: string | null;
  imageAlt: string;
  highlights: DestinationHighlight[];
  gallery: DestinationImage[];
  itinerary: DestinationItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  bestTime: DestinationBestTime | null;
  faqs: DestinationFaq[];
  startingPriceLabel: string | null;
  rating: number | null;
  reviewCount: number | null;
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

const MONTH_ALIASES: Record<string, number> = {
  january: 0,
  jan: 0,
  february: 1,
  feb: 1,
  march: 2,
  mar: 2,
  april: 3,
  apr: 3,
  may: 4,
  june: 5,
  jun: 5,
  july: 6,
  jul: 6,
  august: 7,
  aug: 7,
  september: 8,
  sept: 8,
  sep: 8,
  october: 9,
  oct: 9,
  november: 10,
  nov: 10,
  december: 11,
  dec: 11,
};

type WpRendered = {
  rendered?: string;
};

type WpFeaturedMedia = {
  source_url?: string;
  alt_text?: string;
};

type WpDestinationRecord = {
  slug?: string;
  title?: WpRendered | string;
  excerpt?: WpRendered | string;
  content?: WpRendered | string;
  acf?: Record<string, unknown>;
  _embedded?: {
    "wp:featuredmedia"?: WpFeaturedMedia[];
  };
} & Record<string, unknown>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return "";
}

function decodeEntities(value: string): string {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#039;/g, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

function htmlToText(value: string): string {
  return decodeEntities(
    value
      .replace(/<\s*br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n\n")
      .replace(/<\/(div|li|h[1-6])>/gi, "\n")
      .replace(/<[^>]*>/g, " "),
  )
    .replace(/[ \t]+\n/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function renderedHtml(value: unknown): string {
  if (typeof value === "string") return value;
  if (isRecord(value) && typeof value.rendered === "string") return value.rendered;
  return "";
}

function renderedText(value: unknown): string {
  return htmlToText(renderedHtml(value));
}

function wordpressHome(): string {
  return WORDPRESS_REST_BASE.replace(/\/wp-json\/wp\/v2\/?$/, "");
}

function absoluteMediaUrl(value: string): string {
  const src = value.trim();
  if (!src) return "";
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  if (src.startsWith("//")) return `https:${src}`;
  if (src.startsWith("/")) return `${wordpressHome()}${src}`;
  return src;
}

function acfValue(post: WpDestinationRecord, key: string): unknown {
  if (post.acf && key in post.acf) return post.acf[key];
  return post[key];
}

function firstValue(post: WpDestinationRecord, keys: readonly string[]): unknown {
  for (const key of keys) {
    const value = acfValue(post, key);
    if (value !== undefined && value !== null && value !== "") return value;
  }
  return undefined;
}

function parseMaybeJson(value: unknown): unknown {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if (!trimmed.startsWith("[") && !trimmed.startsWith("{")) return value;
  try {
    return JSON.parse(trimmed) as unknown;
  } catch {
    return value;
  }
}

function firstText(record: Record<string, unknown>, keys: readonly string[]): string {
  for (const key of keys) {
    const text = htmlToText(asString(record[key]));
    if (text) return text;
  }
  return "";
}

function sanitizeHtml(html: string): string {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/\s(on\w+)\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/javascript:/gi, "");
}

function stripImages(html: string): string {
  return html
    .replace(/<figure\b[^>]*>[\s\S]*?<\/figure>/gi, "")
    .replace(/<img\b[^>]*>/gi, "")
    .trim();
}

function tagAttribute(tag: string, name: string): string {
  const match = tag.match(
    new RegExp(`${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"),
  );
  return decodeEntities((match?.[2] ?? match?.[3] ?? match?.[4] ?? "").trim());
}

function imagesFromHtml(html: string): DestinationImage[] {
  const images: DestinationImage[] = [];
  const tags = html.match(/<img\b[^>]*>/gi) ?? [];
  for (const tag of tags) {
    const src = absoluteMediaUrl(tagAttribute(tag, "src"));
    if (!src) continue;
    images.push({ src, alt: tagAttribute(tag, "alt") });
  }
  return images;
}

function imageFromUnknown(value: unknown): DestinationImage | null {
  if (typeof value === "string") {
    const src = absoluteMediaUrl(htmlToText(value));
    return src.startsWith("http") ? { src, alt: "" } : null;
  }
  if (!isRecord(value)) return null;
  const nested = isRecord(value.image) ? value.image : value;
  const src = absoluteMediaUrl(
    asString(nested.url) ||
      asString(nested.source_url) ||
      asString(nested.src) ||
      asString(value.url) ||
      asString(value.source_url),
  );
  if (!src.startsWith("http")) return null;
  const alt =
    htmlToText(asString(nested.alt)) ||
    htmlToText(asString(nested.alt_text)) ||
    htmlToText(asString(value.alt)) ||
    htmlToText(asString(value.alt_text)) ||
    htmlToText(asString(value.title));
  return { src, alt };
}

function readItems(value: unknown): unknown[] {
  const parsed = parseMaybeJson(value);
  if (Array.isArray(parsed)) return parsed;
  if (isRecord(parsed)) {
    const nested = parsed.items ?? parsed.rows ?? parsed.list;
    if (Array.isArray(nested)) return nested;
  }
  return [];
}

function readLines(value: unknown): string[] {
  const parsed = parseMaybeJson(value);
  if (Array.isArray(parsed) || isRecord(parsed)) {
    return readItems(parsed)
      .map((item) => {
        if (typeof item === "string") return htmlToText(item);
        if (!isRecord(item)) return "";
        return firstText(item, [
          "text",
          "title",
          "label",
          "item",
          "name",
          "description",
          "value",
        ]);
      })
      .filter(Boolean);
  }
  const text = htmlToText(asString(parsed));
  if (!text) return [];
  return text
    .split(/\n|•/g)
    .map((line) => line.replace(/^[-–—]\s*/, "").trim())
    .filter(Boolean);
}

function readHighlights(value: unknown): DestinationHighlight[] {
  const parsed = parseMaybeJson(value);
  const items = Array.isArray(parsed) || isRecord(parsed) ? readItems(parsed) : [];
  if (items.length > 0) {
    return items
      .map((item) => {
        if (typeof item === "string") {
          const [title, ...rest] = item.split(/\s+[—–:-]\s+/);
          return {
            title: htmlToText(title),
            description: htmlToText(rest.join(" ")),
          };
        }
        if (!isRecord(item)) return null;
        const title = firstText(item, ["title", "heading", "label", "name", "highlight_title"]);
        const description = firstText(item, [
          "description",
          "text",
          "content",
          "highlight_description",
          "summary",
        ]);
        if (!title && !description) return null;
        return { title: title || description, description: title ? description : "" };
      })
      .filter((item): item is DestinationHighlight => item !== null);
  }

  return readLines(parsed)
    .map((line) => {
      const [title, ...rest] = line.split(/\s+[—–:-]\s+/);
      return {
        title: title.trim(),
        description: rest.join(" ").trim(),
      };
    })
    .filter((item) => item.title);
}

function readItinerary(value: unknown): DestinationItineraryDay[] {
  const parsed = parseMaybeJson(value);
  const items = Array.isArray(parsed) || isRecord(parsed) ? readItems(parsed) : [];
  if (items.length > 0) {
    return items
      .map((item, index) => {
        if (!isRecord(item)) {
          const text = htmlToText(asString(item));
          if (!text) return null;
          return { label: `Day ${index + 1}`, title: text, description: "" };
        }
        const rawDay = firstText(item, ["day_label", "label", "day", "day_number", "day_no"]);
        const label = rawDay
          ? /^day\b/i.test(rawDay)
            ? rawDay
            : `Day ${rawDay.replace(/^day\s*/i, "")}`
          : `Day ${index + 1}`;
        const title =
          firstText(item, ["title", "day_title", "heading", "name"]) || label;
        const description = firstText(item, [
          "description",
          "content",
          "day_description",
          "day_content",
          "details",
          "text",
        ]);
        if (!title && !description) return null;
        return { label, title, description };
      })
      .filter((item): item is DestinationItineraryDay => item !== null);
  }

  const text = htmlToText(asString(parsed));
  if (!text) return [];
  const blocks = text.split(/\n(?=Day\s+\d+\b)/i).map((block) => block.trim()).filter(Boolean);
  return blocks
    .map((block, index) => {
      const [firstLine, ...rest] = block.split("\n");
      const dayMatch = firstLine.match(/^Day\s+(\d+)\b[:\s-–—]*(.*)$/i);
      if (!dayMatch) {
        return { label: `Day ${index + 1}`, title: firstLine, description: rest.join("\n").trim() };
      }
      return {
        label: `Day ${dayMatch[1]}`,
        title: dayMatch[2].trim() || `Day ${dayMatch[1]}`,
        description: rest.join("\n").trim(),
      };
    })
    .filter((item) => item.title || item.description);
}

function readFaqs(value: unknown): DestinationFaq[] {
  const parsed = parseMaybeJson(value);
  const items = Array.isArray(parsed) || isRecord(parsed) ? readItems(parsed) : [];
  if (items.length === 0) return [];
  return items
    .map((item) => {
      if (!isRecord(item)) return null;
      const question = firstText(item, ["question", "q", "faq_question", "title"]);
      const answer = firstText(item, ["answer", "a", "faq_answer", "content", "description"]);
      if (!question || !answer) return null;
      return { question, answer };
    })
    .filter((item): item is DestinationFaq => item !== null);
}

function monthIndex(token: string): number {
  return MONTH_ALIASES[token.toLowerCase()] ?? -1;
}

function expandRange(start: number, end: number): number[] {
  const indexes: number[] = [];
  let cursor = start;
  while (indexes.length < 12) {
    indexes.push(cursor);
    if (cursor === end) break;
    cursor = (cursor + 1) % 12;
  }
  return indexes;
}

function collectMonths(text: string): number[] {
  const found = new Set<number>();
  const monthPattern = Object.keys(MONTH_ALIASES)
    .sort((a, b) => b.length - a.length)
    .join("|");
  const rangeRe = new RegExp(
    `\\b(${monthPattern})\\b\\s*(?:to|through|until|–|—|-)\\s*\\b(${monthPattern})\\b`,
    "gi",
  );
  for (const match of text.matchAll(rangeRe)) {
    const start = monthIndex(match[1]);
    const end = monthIndex(match[2]);
    if (start >= 0 && end >= 0) {
      for (const index of expandRange(start, end)) found.add(index);
    }
  }

  const allowShort = text.trim().length <= 80;
  const nameRe = new RegExp(`\\b(${monthPattern})\\b`, "gi");
  for (const match of text.matchAll(nameRe)) {
    const token = match[1].toLowerCase();
    if (!allowShort && token.length <= 4 && token !== "may") continue;
    const index = monthIndex(token);
    if (index >= 0) found.add(index);
  }
  return [...found].sort((a, b) => a - b);
}

function monthGrid(recommended: readonly number[]): DestinationMonth[] {
  const selected = new Set(recommended);
  return MONTHS.map((label, index) => ({
    label,
    shortLabel: label.slice(0, 3),
    recommended: selected.has(index),
  }));
}

function noteAddsDetail(note: string): boolean {
  let rest = note.toLowerCase();
  for (const token of Object.keys(MONTH_ALIASES)) {
    rest = rest.replace(new RegExp(`\\b${token}\\b`, "g"), " ");
  }
  rest = rest.replace(/[^a-z]+/g, "");
  return rest.replace(/to|through|until|and|from/g, "").length > 0;
}

function readBestTime(value: unknown): DestinationBestTime | null {
  const parsed = parseMaybeJson(value);
  if (Array.isArray(parsed)) {
    const text = parsed
      .map((item) => (isRecord(item) ? firstText(item, ["label", "month", "title", "name"]) : htmlToText(asString(item))))
      .filter(Boolean)
      .join(", ");
    const months = collectMonths(text);
    if (months.length > 0) return { note: "", months: monthGrid(months) };
    return text ? { note: text, months: null } : null;
  }

  if (isRecord(parsed)) {
    const note = firstText(parsed, ["note", "description", "text", "summary", "label"]);
    const months = collectMonths(
      [
        note,
        ...readLines(parsed.months ?? parsed.best_months ?? parsed.recommended_months),
      ].join(" "),
    );
    if (!note && months.length === 0) return null;
    return {
      note: months.length > 0 && !noteAddsDetail(note) ? "" : note,
      months: months.length > 0 ? monthGrid(months) : null,
    };
  }

  const note = htmlToText(asString(parsed));
  if (!note) return null;
  const months = collectMonths(note);
  if (months.length === 0) return { note, months: null };
  return {
    note: noteAddsDetail(note) ? note : "",
    months: monthGrid(months),
  };
}

function readPriceLabel(value: unknown): string | null {
  if (isRecord(value)) {
    const amount = value.amount ?? value.price ?? value.value ?? value.starting_price;
    const currency = asString(value.currency).trim();
    const formatted = readPriceLabel(amount);
    if (!formatted) return null;
    return currency && !/[₹$€£]|INR|Rs/i.test(formatted) ? `${currency} ${formatted}` : formatted;
  }

  if (typeof value === "number") {
    if (!Number.isFinite(value) || value <= 0) return null;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  }

  const text = htmlToText(asString(value));
  if (!text) return null;
  if (/[₹$€£]|INR|Rs\.?/i.test(text)) return text;
  if (/^\d[\d,]*(?:\.\d+)?$/.test(text)) {
    const numeric = Number(text.replace(/,/g, ""));
    if (Number.isFinite(numeric) && numeric > 0) {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(numeric);
    }
  }
  return text;
}

function readOptionalNumber(value: unknown): number | null {
  const numeric = typeof value === "number" ? value : Number.parseFloat(asString(value));
  if (!Number.isFinite(numeric) || numeric <= 0) return null;
  return numeric;
}

function dedupeImages(images: DestinationImage[], fallbackAlt: string): DestinationImage[] {
  const seen = new Set<string>();
  const unique: DestinationImage[] = [];
  for (const image of images) {
    const src = image.src.trim();
    if (!src || seen.has(src)) continue;
    seen.add(src);
    unique.push({ src, alt: image.alt.trim() || fallbackAlt });
  }
  return unique;
}

function mapDestinationDetail(post: WpDestinationRecord): DestinationDetail | null {
  const name = renderedText(post.title);
  const slug = asString(post.slug).trim();
  if (!slug || !name) return null;

  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  const featuredSrc = absoluteMediaUrl(media?.source_url ?? "");
  const featuredAlt = media?.alt_text?.trim() || "";
  const region = htmlToText(asString(firstValue(post, ["region", "location", "state"])));
  const contentHtml = renderedHtml(post.content);
  const summary =
    htmlToText(asString(firstValue(post, ["short_description", "summary", "excerpt"]))) ||
    renderedText(post.excerpt) ||
    renderedText(post.content);
  const overviewSource = asString(firstValue(post, ["overview", "full_description", "description"]));
  const overviewHtml = sanitizeHtml(stripImages(overviewSource || contentHtml));
  const overviewText = htmlToText(overviewHtml);
  const gallery = dedupeImages(
    [
      ...(featuredSrc ? [{ src: featuredSrc, alt: featuredAlt }] : []),
      ...readItems(firstValue(post, ["gallery", "destination_gallery", "images", "photo_gallery"]))
        .map(imageFromUnknown)
        .filter((image): image is DestinationImage => image !== null),
      ...imagesFromHtml(contentHtml),
    ],
    featuredAlt || name,
  );

  const rating = readOptionalNumber(firstValue(post, ["rating"]));
  const reviewCount = readOptionalNumber(
    firstValue(post, ["review_count", "reviews_count"]),
  );

  return {
    slug,
    name,
    href: `/destinations/${slug}`,
    region,
    regionKey: region.toLowerCase(),
    summary,
    overviewHtml: overviewText && overviewText !== summary ? overviewHtml : "",
    imageSrc: gallery[0]?.src ?? null,
    imageAlt: gallery[0]?.alt || name,
    highlights: readHighlights(
      firstValue(post, ["highlights", "destination_highlights", "highlight_points"]),
    ),
    gallery,
    itinerary: readItinerary(
      firstValue(post, ["itinerary", "travel_itinerary", "day_by_day"]),
    ),
    inclusions: readLines(
      firstValue(post, ["inclusions", "package_inclusions", "included", "whats_included"]),
    ),
    exclusions: readLines(
      firstValue(post, ["exclusions", "package_exclusions", "excluded", "whats_excluded"]),
    ),
    bestTime: readBestTime(
      firstValue(post, ["best_time_to_visit", "best_time", "best_months", "visiting_months"]),
    ),
    faqs: readFaqs(firstValue(post, ["faqs", "faq", "frequently_asked_questions"])),
    startingPriceLabel: readPriceLabel(
      firstValue(post, ["starting_price", "price_from", "price", "starting_from"]),
    ),
    rating,
    reviewCount,
  };
}

async function fetchDestinationRecords(): Promise<WpDestinationRecord[]> {
  for (const path of WORDPRESS_DESTINATIONS_PATHS) {
    try {
      const posts = await wpFetch<WpDestinationRecord[]>(`${path}?_embed=1&per_page=100`);
      if (Array.isArray(posts)) return posts;
    } catch (error) {
      console.error(`WordPress destination detail fetch failed for ${path}:`, error);
    }
  }
  return [];
}

export async function getWordpressDestinationDetails(): Promise<DestinationDetail[]> {
  const posts = await fetchDestinationRecords();
  return posts
    .map((post) => mapDestinationDetail(post))
    .filter((destination): destination is DestinationDetail => destination !== null);
}
