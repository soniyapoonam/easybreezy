"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { Container } from "@/components/ui";
import { cn } from "@/components/ui/cn";
import { siteConfig } from "@/lib/site";
import { IconClose, IconMenu, IconPhone } from "./icons";

export function Header() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-surface/90 shadow-sm backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4 md:h-[4.25rem]">
        <Link
          href="/"
          className="group flex min-w-0 flex-col no-underline"
          onClick={() => setOpen(false)}
        >
          <span className="font-heading text-base font-bold tracking-tight text-primary transition-colors group-hover:text-secondary sm:text-lg">
            {siteConfig.name}
          </span>
          <span className="hidden text-[0.7rem] font-medium tracking-wide text-muted sm:block">
            {siteConfig.headerEyebrow}
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Main navigation"
        >
          {siteConfig.mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-2.5 py-2 font-heading text-sm font-medium text-text no-underline transition-colors hover:bg-sky hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
                    


<Link
            href={siteConfig.contact.phoneHref}
            className="hidden items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium text-secondary no-underline transition-colors hover:text-primary md:inline-flex"
          >
            <IconPhone className="size-4 shrink-0" />
            <span>{siteConfig.contact.phone}</span>
           </Link>

          <Link
            href={siteConfig.bookingHref}
            className="btn btn-primary !min-h-10 px-3.5 text-sm sm:px-4"
          >
            {siteConfig.bookingCtaLabel}
          </Link>

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-md border border-border bg-surface text-primary transition-colors hover:bg-sky lg:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <IconClose className="size-5" />
            ) : (
              <IconMenu className="size-5" />
            )}
          </button>
        </div>
      </Container>

      <div
        id={panelId}
        className={cn(
          "border-t border-border bg-surface lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <Container className="flex flex-col gap-1 py-4">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {siteConfig.mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-3 font-heading text-base font-medium text-text no-underline transition-colors hover:bg-sky hover:text-primary"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <a
            href={siteConfig.contact.phoneHref}
            className="mt-2 inline-flex items-center gap-2 rounded-md px-3 py-3 text-sm font-medium text-secondary no-underline"
            onClick={() => setOpen(false)}
          >
            <IconPhone className="size-4" />
            {siteConfig.contact.phone}
          </a>
        </Container>
      </div>
    </header>
  );
}
