"use client";

import { useEffect, useState } from "react";
import { cn } from "@/components/ui/cn";
import { blogPageCopy } from "@/lib/content/blog-page";
import type { BlogTocItem } from "@/lib/wordpress/posts";

export function BlogTableOfContents({
  items,
  headingId = "blog-toc-heading",
}: {
  items: readonly BlogTocItem[];
  headingId?: string;
}) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    if (items.length < 2) return;

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: "0px 0px -55% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  return (
    <nav aria-labelledby={headingId}>
      <h2
        id={headingId}
        className="font-heading text-base font-semibold text-primary"
      >
        {blogPageCopy.article.onThisPage}
      </h2>
      <ol className="mt-3 space-y-1.5">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? "pl-3" : undefined}>
            <a
              href={`#${item.id}`}
              className={cn(
                "block rounded-md px-2 py-1.5 text-sm no-underline transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30",
                activeId === item.id
                  ? "bg-sky font-semibold text-primary"
                  : "text-muted hover:bg-sky/70 hover:text-primary",
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
