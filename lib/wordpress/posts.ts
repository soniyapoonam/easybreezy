import { wpFetch, wpFetchPaged } from "./client";

export const BLOG_POSTS_PER_PAGE = 9;

export type BlogCategory = {
  id: number;
  name: string;
  slug: string;
  count: number;
};

export type BlogTocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type BlogPost = {
  id: number;
  slug: string;
  href: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  dateIso: string;
  dateLabel: string;
  modifiedIso: string;
  modifiedLabel: string | null;
  readingTimeLabel: string | null;
  categoryId: number | null;
  categoryName: string;
  categorySlug: string;
  imageSrc: string | null;
  imageAlt: string;
  authorName: string | null;
  authorAvatarSrc: string | null;
  toc: readonly BlogTocItem[];
};

export type BlogPostLookup =
  | { ok: true; post: BlogPost }
  | { ok: false; reason: "missing" | "error" };

export type BlogListingQuery = {
  categorySlug?: string;
  search?: string;
  order?: "asc" | "desc";
  page?: number;
};

export type BlogListingResult =
  | {
      ok: true;
      posts: BlogPost[];
      recentPosts: BlogPost[];
      categories: BlogCategory[];
      currentPage: number;
      totalPages: number;
      total: number;
      showPagination: boolean;
      rangeStart: number;
      rangeEnd: number;
    }
  | {
      ok: false;
    };

type WpRendered = {
  rendered?: string;
};

type WpFeaturedMedia = {
  source_url?: string;
  alt_text?: string;
};

type WpAuthor = {
  name?: string;
  avatar_urls?: Record<string, string>;
};

type WpTerm = {
  id?: number;
  name?: string;
  slug?: string;
  taxonomy?: string;
};

type WpPost = {
  id?: number;
  slug?: string;
  date?: string;
  title?: WpRendered | string;
  excerpt?: WpRendered | string;
  content?: WpRendered | string;
  categories?: number[];
  sticky?: boolean;
  modified?: string;
  _embedded?: {
    "wp:featuredmedia"?: WpFeaturedMedia[];
    "wp:term"?: WpTerm[][];
    author?: WpAuthor[];
  };
};

type WpCategory = {
  id?: number;
  name?: string;
  slug?: string;
  count?: number;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
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

function renderedHtml(value: unknown): string {
  if (typeof value === "string") return value;
  if (isRecord(value) && typeof value.rendered === "string") {
    return value.rendered;
  }
  return "";
}

function formatDateLabel(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function readingTimeFromHtml(html: string): string | null {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  if (words < 30) return null;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function slugifyHeading(value: string): string {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  return slug || "section";
}

export function prepareArticleContent(html: string): {
  contentHtml: string;
  toc: BlogTocItem[];
} {
  if (!html.trim()) return { contentHtml: html, toc: [] };

  const used = new Set<string>();
  const toc: BlogTocItem[] = [];

  const contentHtml = html.replace(
    /<h([23])(\s[^>]*)?>([\s\S]*?)<\/h\1>/gi,
    (full, levelRaw: string, attrsRaw: string | undefined, inner: string) => {
      const level = Number(levelRaw) === 3 ? 3 : 2;
      const text = stripHtml(inner);
      if (!text) return full;

      const attrs = attrsRaw ?? "";
      const existingId = attrs.match(/\sid=["']([^"']+)["']/i)?.[1];
      let id = existingId?.trim() || slugifyHeading(text);
      let suffix = 2;
      while (used.has(id)) {
        id = `${slugifyHeading(text)}-${suffix}`;
        suffix += 1;
      }
      used.add(id);
      toc.push({ id, text, level });

      if (existingId) return full;
      return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
    },
  );

  return { contentHtml, toc: toc.length >= 2 ? toc : [] };
}

function embeddedCategory(post: WpPost): {
  id: number | null;
  name: string;
  slug: string;
} {
  const groups = post._embedded?.["wp:term"] ?? [];
  for (const group of groups) {
    const category = group.find((term) => term.taxonomy === "category");
    if (category?.name && category.slug) {
      return {
        id: typeof category.id === "number" ? category.id : null,
        name: category.name,
        slug: category.slug,
      };
    }
  }
  const first = groups[0]?.[0];
  if (first?.name && first.slug) {
    return {
      id: typeof first.id === "number" ? first.id : null,
      name: first.name,
      slug: first.slug,
    };
  }
  const categoryId = Array.isArray(post.categories) ? post.categories[0] : null;
  return { id: categoryId ?? null, name: "Journal", slug: "" };
}

function embeddedAuthor(post: WpPost): {
  name: string | null;
  avatarSrc: string | null;
} {
  const author = post._embedded?.author?.[0];
  const name = author?.name?.trim() || null;
  const avatarSrc =
    author?.avatar_urls?.["96"]?.trim() ||
    author?.avatar_urls?.["48"]?.trim() ||
    null;
  return { name, avatarSrc };
}

function mapPost(post: WpPost): BlogPost | null {
  const id = post.id;
  const slug = post.slug?.trim();
  const title = renderedText(post.title);
  if (id == null || !slug || !title) return null;

  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  const category = embeddedCategory(post);
  const author = embeddedAuthor(post);
  const prepared = prepareArticleContent(renderedHtml(post.content));
  const excerpt = renderedText(post.excerpt) || renderedText(post.content);
  const dateIso = post.date ?? "";
  const modifiedIso = post.modified ?? "";
  const dateLabel = formatDateLabel(dateIso);
  const modifiedLabel = formatDateLabel(modifiedIso);
  const showModified =
    Boolean(modifiedLabel) &&
    modifiedIso &&
    dateIso &&
    new Date(modifiedIso).getTime() - new Date(dateIso).getTime() > 60_000;

  return {
    id,
    slug,
    href: `/blog/${slug}`,
    title,
    excerpt,
    contentHtml: prepared.contentHtml,
    dateIso,
    dateLabel,
    modifiedIso,
    modifiedLabel: showModified ? modifiedLabel : null,
    readingTimeLabel: readingTimeFromHtml(prepared.contentHtml),
    categoryId: category.id,
    categoryName: category.name,
    categorySlug: category.slug,
    imageSrc: media?.source_url?.trim() || null,
    imageAlt: media?.alt_text?.trim() || title,
    authorName: author.name,
    authorAvatarSrc: author.avatarSrc,
    toc: prepared.toc,
  };
}

function postsPath(query: {
  search?: string;
  categoryId?: number;
  order: "asc" | "desc";
  page: number;
  perPage: number;
}): string {
  const params = new URLSearchParams({
    _embed: "1",
    per_page: String(query.perPage),
    page: String(query.page),
    orderby: "date",
    order: query.order,
  });
  if (query.search) params.set("search", query.search);
  if (query.categoryId) params.set("categories", String(query.categoryId));
  return `/posts?${params.toString()}`;
}

export function buildBlogPageUrl({
  categorySlug,
  search,
  order,
  page,
}: BlogListingQuery): string {
  const params = new URLSearchParams();
  if (categorySlug && categorySlug !== "all") {
    params.set("category", categorySlug);
  }
  const trimmed = search?.trim();
  if (trimmed) params.set("q", trimmed);
  if (order === "asc") params.set("order", "asc");
  if (page && page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `/blog?${query}` : "/blog";
}

export async function getWordpressCategories(): Promise<BlogCategory[]> {
  const categories = await wpFetch<WpCategory[]>(
    "/categories?per_page=100&hide_empty=true",
  );
  if (!Array.isArray(categories)) return [];

  return categories
    .map((category) => {
      const id = category.id;
      const name = category.name?.trim();
      const slug = category.slug?.trim();
      const count = category.count ?? 0;
      if (id == null || !name || !slug) return null;
      return { id, name, slug, count };
    })
    .filter((category): category is BlogCategory => category !== null);
}

export async function getWordpressBlogListing(
  query: BlogListingQuery,
): Promise<BlogListingResult> {
  try {
    const search = query.search?.trim() ?? "";
    const order = query.order === "asc" ? "asc" : "desc";
    const requestedPage = query.page && query.page > 0 ? query.page : 1;

    const categories = await getWordpressCategories().catch(() => [] as BlogCategory[]);
    const selectedCategory = categories.find(
      (category) => category.slug === query.categorySlug,
    );
    const unknownCategory = Boolean(
      query.categorySlug &&
        query.categorySlug !== "all" &&
        !selectedCategory,
    );

    const listing = unknownCategory
      ? { data: [] as WpPost[], total: 0, totalPages: 1 }
      : await wpFetchPaged<WpPost[]>(
          postsPath({
            search: search || undefined,
            categoryId: selectedCategory?.id,
            order,
            page: requestedPage,
            perPage: BLOG_POSTS_PER_PAGE,
          }),
        );

    if (!Array.isArray(listing.data)) {
      return { ok: false };
    }

    const posts = listing.data
      .map(mapPost)
      .filter((post): post is BlogPost => post !== null);

    const recentSource = await wpFetch<WpPost[]>(
      postsPath({ order: "desc", page: 1, perPage: 4 }),
    ).catch(() => [] as WpPost[]);
    const recentPosts = (Array.isArray(recentSource) ? recentSource : [])
      .map(mapPost)
      .filter((post): post is BlogPost => post !== null);

    const total = listing.total;
    const totalPages = Math.max(1, listing.totalPages || 1);
    const currentPage = Math.min(requestedPage, totalPages);
    const rangeStart = total === 0 ? 0 : (currentPage - 1) * BLOG_POSTS_PER_PAGE + 1;
    const rangeEnd = Math.min(currentPage * BLOG_POSTS_PER_PAGE, total);

    return {
      ok: true,
      posts,
      recentPosts,
      categories,
      currentPage,
      totalPages,
      total,
      showPagination: total > BLOG_POSTS_PER_PAGE,
      rangeStart,
      rangeEnd,
    };
  } catch (error) {
    console.error("WordPress blog listing fetch failed:", error);
    return { ok: false };
  }
}

export async function getWordpressPostBySlug(
  slug: string,
): Promise<BlogPostLookup> {
  try {
    const posts = await wpFetch<WpPost[]>(
      `/posts?_embed=1&slug=${encodeURIComponent(slug)}`,
    );
    if (!Array.isArray(posts) || !posts[0]) {
      return { ok: false, reason: "missing" };
    }
    const post = mapPost(posts[0]);
    if (!post || post.slug !== slug) {
      return { ok: false, reason: "missing" };
    }
    return { ok: true, post };
  } catch (error) {
    console.error("WordPress blog post fetch failed:", error);
    return { ok: false, reason: "error" };
  }
}

export async function getWordpressRelatedPosts(
  current: Pick<BlogPost, "id" | "categoryId">,
  count = 3,
): Promise<BlogPost[]> {
  try {
    const collected: BlogPost[] = [];
    const seen = new Set<number>([current.id]);

    async function pull(path: string) {
      const posts = await wpFetch<WpPost[]>(path);
      if (!Array.isArray(posts)) return;
      for (const raw of posts) {
        const mapped = mapPost(raw);
        if (!mapped || seen.has(mapped.id)) continue;
        seen.add(mapped.id);
        collected.push(mapped);
        if (collected.length >= count) return;
      }
    }

    if (current.categoryId) {
      await pull(
        `/posts?_embed=1&per_page=${count}&exclude=${current.id}&categories=${current.categoryId}&orderby=date&order=desc`,
      );
    }
    if (collected.length < count) {
      await pull(
        `/posts?_embed=1&per_page=${count + 2}&exclude=${current.id}&orderby=date&order=desc`,
      );
    }
    return collected.slice(0, count);
  } catch (error) {
    console.error("WordPress related posts fetch failed:", error);
    return [];
  }
}
