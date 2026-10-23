import Link from "next/link";
import { IconCalendarCheck, IconClock } from "@/components/layout/icons";
import { blogImageFallbackSrc, blogPageCopy } from "@/lib/content/blog-page";
import type { BlogPost } from "@/lib/wordpress/posts";

export function BlogArticleCard({
  post,
  ctaLabel = blogPageCopy.readMore,
}: {
  post: BlogPost;
  ctaLabel?: string;
}) {
  const imageSrc = post.imageSrc ?? blogImageFallbackSrc;

  const media = (
    <div className="relative aspect-[16/10] overflow-hidden bg-sky">
      <img
        src={imageSrc}
        alt={post.imageAlt}
        width={800}
        height={500}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-105"
        loading="lazy"
        decoding="async"
      />
      <span className="absolute bottom-3 left-3 rounded-full bg-primary px-3 py-1 text-[0.7rem] font-semibold text-on-primary">
        {post.categoryName}
      </span>
    </div>
  );

  const body = (
    <div className="flex flex-1 flex-col p-5">
      <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
        {post.dateLabel ? (
          <span className="inline-flex items-center gap-1.5">
            <IconCalendarCheck className="size-3.5" />
            {post.dateLabel}
          </span>
        ) : null}
        {post.readingTimeLabel ? (
          <span className="inline-flex items-center gap-1.5">
            <IconClock className="size-3.5" />
            {post.readingTimeLabel}
          </span>
        ) : null}
      </p>
      <h3 className="mt-2 font-heading text-[1.05rem] font-semibold leading-snug text-primary group-hover:text-secondary">
        {post.title}
      </h3>
      {post.excerpt ? (
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
          {post.excerpt}
        </p>
      ) : (
        <span className="flex-1" />
      )}
      <span className="mt-4 inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-primary">
        {ctaLabel}
        <span aria-hidden="true">→</span>
      </span>
    </div>
  );

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface shadow-sm transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-md motion-reduce:transform-none">
      <Link href={post.href} className="flex h-full flex-col no-underline">
        {media}
        {body}
      </Link>
    </article>
  );
}
