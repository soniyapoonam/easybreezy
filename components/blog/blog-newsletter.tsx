"use client";

import { useState, type FormEvent } from "react";
import { IconPaperPlane } from "@/components/layout/icons";
import { blogPageCopy } from "@/lib/content/blog-page";
import { unsplashImages } from "@/lib/content/unsplash";

export function BlogNewsletter() {
  const [noted, setNoted] = useState(false);
  const copy = blogPageCopy.newsletter;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNoted(true);
  }

  return (
    <section
      className="relative overflow-hidden rounded-[var(--radius-lg)] bg-sky p-5"
      aria-labelledby="blog-newsletter-heading"
    >
      <IconPaperPlane className="size-6 text-primary" />
      <h2
        id="blog-newsletter-heading"
        className="mt-3 font-heading text-lg font-semibold text-primary"
      >
        {copy.heading}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{copy.body}</p>
      <form className="relative z-10 mt-4 flex flex-col gap-2" onSubmit={handleSubmit}>
        <label htmlFor="blog-newsletter-email" className="sr-only">
          {copy.emailLabel}
        </label>
        <input
          id="blog-newsletter-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder={copy.placeholder}
          className="w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-text outline-none placeholder:text-muted focus:border-secondary/50 focus:ring-2 focus:ring-secondary/20"
        />
        <button type="submit" className="btn btn-primary w-full">
          {copy.submitLabel}
        </button>
      </form>
      <p className="relative z-10 mt-2 text-xs text-muted" role={noted ? "status" : undefined}>
        {copy.note}
      </p>
      <div className="pointer-events-none mt-4 -mx-5 -mb-5 h-20 overflow-hidden">
        <img
          src={unsplashImages.destinations.shimla}
          alt=""
          className="h-full w-full object-cover opacity-80"
        />
      </div>
    </section>
  );
}
