"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { cn } from "@/components/ui/cn";
import { siteConfig } from "@/lib/site";
import {
  IconClose,
  IconMail,
  IconMenu,
  IconPhone,
  SocialIcon,
} from "./icons";

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
    <header className="relative sticky top-0 z-50 border-b-[3px] border-accent bg-surface shadow-md">
      <div className="bg-primary text-on-primary">
        <div className="flex min-h-12 items-center justify-between gap-4 px-4 py-2 text-xs sm:px-8 sm:text-sm lg:pl-[15.5%]">
          <div className="flex min-w-0 items-center gap-4 sm:gap-8">
            <a
              href={siteConfig.contact.emailHref}
              className="inline-flex min-w-0 items-center gap-2 text-on-primary/90 no-underline transition-colors hover:text-highlight"
            >
              <IconMail className="size-3.5 shrink-0 text-accent" />
              <span className="truncate">{siteConfig.contact.email}</span>
            </a>
            <span className="hidden items-center gap-2 text-on-primary/90 md:inline-flex">
              <span className="size-2.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              <span>{siteConfig.contact.addressLines.join(" ")}</span>
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-4 text-on-primary sm:gap-5">
            {siteConfig.social.map((item) => (
              <span
                key={item.id}
                className="inline-flex size-4 items-center justify-center opacity-90 transition-colors hover:text-accent"
                role="img"
                aria-label={item.label}
                title={item.label}
              >
                <SocialIcon platform={item.id} className="size-3.5" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid min-h-[5.25rem] grid-cols-[minmax(10rem,1fr)_auto] items-center gap-3 lg:grid-cols-[minmax(15rem,auto)_minmax(0,1fr)_auto] lg:gap-5">
        <Link
          href="/"
          className="group relative flex h-full min-w-0 items-center gap-3 bg-surface px-4 no-underline sm:px-8 lg:px-10"
          onClick={() => setOpen(false)}
        >
          <span className="relative inline-flex size-10 shrink-0 items-center justify-center sm:size-12" aria-hidden="true">
            <span className="absolute inset-x-0 top-2 h-3 -skew-x-20 rounded-full border-t-[3px] border-secondary" />
            <span className="absolute inset-x-1 top-5 h-3 -skew-x-20 rounded-full border-t-[3px] border-primary" />
            <span className="absolute inset-x-2 bottom-2 h-1.5 rounded-full bg-accent" />
          </span>
          <span className="relative min-w-0 whitespace-nowrap">
            <span className="block font-heading text-[0.72rem] font-extrabold tracking-[0.02em] text-primary transition-colors group-hover:text-secondary sm:text-sm lg:text-base">
              EASY BREEZY TRAVELS
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center justify-start gap-2 px-3 lg:flex xl:px-6"
          aria-label="Main navigation"
        >
          {siteConfig.mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-2 py-2 font-heading text-sm font-semibold text-text no-underline transition-colors hover:bg-sky hover:text-secondary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex h-full items-stretch justify-end gap-2 sm:gap-4">
          <a
            href={siteConfig.contact.phoneHref}
            className="hidden items-center gap-2 text-left no-underline md:inline-flex"
          >
            <span className="inline-flex size-10 items-center justify-center rounded-full bg-sky text-accent shadow-sm">
              <IconPhone className="size-4" />
            </span>
            <span className="flex flex-col text-xs leading-tight">
              <span className="text-muted">Call Anytime</span>
              <span className="mt-1 font-bold text-primary">{siteConfig.contact.phone}</span>
            </span>
          </a>
          <div className="header-booking relative isolate flex h-full items-stretch">
            <Link
              href={siteConfig.bookingHref}
              className="header-booking-link btn btn-primary relative z-10 !min-h-[5.25rem] !rounded-none border-0 px-7 text-[0.7rem] font-bold tracking-[0.04em] uppercase shadow-none sm:px-10 sm:text-sm"
            >
              {siteConfig.bookingCtaLabel}
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-md border border-border bg-surface text-primary transition-colors hover:border-secondary hover:bg-sky lg:hidden"
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
      </div>

      <div
        id={panelId}
        className={cn(
          "border-t border-border bg-surface lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div className="flex flex-col gap-1 border-t border-border/70 px-4 py-4">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {siteConfig.mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-3 font-heading text-base font-semibold text-text no-underline transition-colors hover:bg-sky hover:text-secondary"
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
        </div>
      </div>
    </header>
  );
}
