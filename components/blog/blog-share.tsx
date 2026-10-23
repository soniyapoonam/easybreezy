"use client";

import { useState } from "react";
import {
  IconFacebook,
  IconLinkCopy,
  IconLinkedIn,
  IconWhatsApp,
} from "@/components/layout/icons";
import { cn } from "@/components/ui/cn";
import { blogPageCopy } from "@/lib/content/blog-page";

function articleUrl(path: string) {
  return new URL(path, window.location.origin).toString();
}

export function BlogShare({ title, path }: { title: string; path: string }) {
  const [copied, setCopied] = useState(false);
  const copy = blogPageCopy.article;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(articleUrl(path));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  function openShare(href: string) {
    window.open(href, "_blank", "noopener,noreferrer");
  }

  const controlClass =
    "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-border bg-surface text-primary transition-colors hover:border-secondary/40 hover:bg-sky focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30";

  return (
    <section className="border-t border-border pt-8" aria-labelledby="blog-share-heading">
      <h2 id="blog-share-heading" className="font-heading text-base font-semibold text-primary">
        {copy.shareHeading}
      </h2>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={copyLink}
          className={cn(controlClass, copied && "border-primary bg-sky")}
          aria-label={copy.copyLink}
        >
          <IconLinkCopy className="size-4" />
        </button>
        <button
          type="button"
          className={controlClass}
          aria-label={copy.shareWhatsApp}
          onClick={() => {
            const url = articleUrl(path);
            openShare(`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`);
          }}
        >
          <IconWhatsApp className="size-4" />
        </button>
        <button
          type="button"
          className={controlClass}
          aria-label={copy.shareFacebook}
          onClick={() => {
            openShare(
              `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl(path))}`,
            );
          }}
        >
          <IconFacebook className="size-4" />
        </button>
        <button
          type="button"
          className={controlClass}
          aria-label={copy.shareLinkedIn}
          onClick={() => {
            openShare(
              `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl(path))}`,
            );
          }}
        >
          <IconLinkedIn className="size-4" />
        </button>
      </div>
      {copied ? (
        <p className="mt-2 text-xs text-secondary" role="status">
          {copy.copiedLink}
        </p>
      ) : null}
    </section>
  );
}
