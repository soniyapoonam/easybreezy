"use client";

import Link from "next/link";
import {
  IconCalendarCheck,
  IconMapPin,
  IconShieldCheck,
  IconSupport,
} from "@/components/layout/icons";
import { Container, Section } from "@/components/ui";
import { cn } from "@/components/ui/cn";
import { Reveal } from "@/components/services/reveal";
import {
  tourPackagesListing,
  tourPackagesPageContent,
  type TourPackageBadgeTone,
  type TourPackageListingItem,
} from "@/lib/content/tour-packages-page";
import { siteConfig } from "@/lib/site";

const CREAM = "#F9F7F2";

const badgeToneClass: Record<TourPackageBadgeTone, string> = {
  popular: "bg-sky-100 text-sky-900",
  bestseller: "bg-[#1e3a5f] text-white",
  family: "bg-emerald-100 text-emerald-900",
  cultural: "bg-violet-100 text-violet-900",
  adventure: "bg-orange-100 text-orange-900",
  luxury: "bg-slate-800 text-white",
  default: "bg-white/95 text-primary",
};

function PackageCard({ tourPackage }: { tourPackage: TourPackageListingItem }) {
  const badgeLabel = tourPackage.listingBadge ?? tourPackage.badge;

  return (
    <article
      id={tourPackage.id}
      className="group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-[#ebe4d8] bg-white shadow-[0_10px_40px_rgba(26,26,26,0.06)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(26,26,26,0.12)] motion-reduce:transform-none"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={tourPackage.listingImageSrc}
          alt={tourPackage.imageAlt}
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 motion-reduce:transform-none"
          loading="lazy"
          decoding="async"
        />
        {badgeLabel ? (
          <span
            className={cn(
              "absolute top-4 right-4 rounded-md px-3 py-1 font-heading text-[11px] font-bold tracking-wide shadow-sm",
              badgeToneClass[tourPackage.badgeTone],
            )}
          >
            {badgeLabel}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-heading text-[1.35rem] font-semibold leading-snug text-[#1A1A1A]">
          {tourPackage.title}
        </h3>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
          <span className="inline-flex items-center gap-1.5">
            <IconCalendarCheck className="size-4 shrink-0 text-[#B88E5F]" />
            {tourPackage.days} Days {tourPackage.nights} Nights
          </span>
          <span className="inline-flex items-center gap-1.5">
            <IconMapPin className="size-4 shrink-0 text-[#B88E5F]" />
            {tourPackage.destinationLabel}
          </span>
        </div>

        <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">
          {tourPackage.shortDescription}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#f0ebe3] pt-5">
          <p className="text-sm text-muted">
            From{" "}
            <span className="font-heading text-lg font-bold text-[#1A1A1A]">
              ₹{tourPackage.priceFrom.toLocaleString("en-IN")}
            </span>
            <span className="text-muted"> / person</span>
          </p>
          <Link
            href={siteConfig.bookingHref}
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#B88E5F] px-5 py-2.5 font-heading text-sm font-semibold text-white no-underline shadow-sm transition-[transform,background-color,box-shadow] duration-300 hover:bg-[#a67d4f] hover:shadow-md motion-safe:hover:scale-[1.02] motion-reduce:transform-none"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}

export function TourPackagesMain() {
  const { hero, featured, planCta } = tourPackagesPageContent;

  return (
    <>
      {/* Hero */}
      <section
        aria-labelledby="tour-packages-hero-heading"
        className="relative overflow-hidden bg-[#1A1A1A]"
      >
        <div className="absolute inset-0" aria-hidden="true">
          <img
            src={hero.imageSrc}
            alt=""
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#1A1A1A]/85 via-[#1A1A1A]/55 to-[#1A1A1A]/25" />
        </div>

        <Container className="relative pt-10 pb-14 md:pt-14 md:pb-16">
          <Reveal className="max-w-2xl">
            <p
              className="font-heading text-[11px] font-semibold tracking-[0.28em] text-white/80 uppercase sm:text-xs"
            >
              {hero.eyebrow}
            </p>
            <h1
              id="tour-packages-hero-heading"
              className="mt-4 font-heading text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-[3.25rem] md:leading-[1.1]"
            >
              {hero.heading}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/82 sm:text-lg">
              {hero.description}
            </p>
            <span
              className="mt-6 block h-[3px] w-14 rounded-full bg-[#B88E5F]"
              aria-hidden="true"
            />
          </Reveal>

          <nav aria-label="Breadcrumb" className="relative mt-6">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-white/75">
              <li>
                <Link href="/" className="text-white/75 no-underline hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white" aria-current="page">Tour Packages</li>
            </ol>
          </nav>
        </Container>
      </section>

      {/* Featured grid */}
      <Section
        id="tour-packages-grid"
        aria-labelledby="tour-packages-featured-heading"
        className="bg-[#F9F7F2]"
        style={{ backgroundColor: CREAM }}
      >
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2
              id="tour-packages-featured-heading"
              className="font-heading text-3xl font-semibold text-[#1A1A1A] sm:text-4xl"
            >
              {featured.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              {featured.description}
            </p>
            <span
              className="mx-auto mt-5 block h-[3px] w-12 rounded-full bg-[#B88E5F]"
              aria-hidden="true"
            />
          </Reveal>

          {tourPackagesListing.length > 0 ? (
            <ul className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {tourPackagesListing.map((tourPackage, index) => (
                <li key={tourPackage.id}>
                  <Reveal delay={index * 70}>
                    <PackageCard tourPackage={tourPackage} />
                  </Reveal>
                </li>
              ))}
            </ul>
          ) : null}
        </Container>
      </Section>

      {/* Plan CTA — 3-column layout */}
      <Section
        aria-labelledby="tour-packages-plan-heading"
        className="bg-[#F9F7F2] pb-16 md:pb-20"
        style={{ backgroundColor: CREAM }}
      >
        <Container>
          <Reveal>
            <div
              className="overflow-hidden rounded-[1.5rem] border border-[#ebe4d8] bg-[#faf6f0] shadow-[0_16px_48px_rgba(26,26,26,0.08)]"
            >
              <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)_minmax(0,0.85fr)] lg:items-stretch">
                <div className="relative min-h-56 lg:min-h-full">
                  <img
                    src={planCta.imageSrc}
                    alt={planCta.imageAlt}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    loading="lazy"
                  />
                </div>

                <div className="flex flex-col justify-center px-6 py-8 sm:px-8 lg:py-10">
                  <p
                    className="font-heading text-[11px] font-semibold tracking-[0.22em] text-[#B88E5F] uppercase"
                  >
                    {planCta.eyebrow}
                  </p>
                  <h2
                    id="tour-packages-plan-heading"
                    className="mt-3 font-heading text-2xl font-semibold text-[#1A1A1A] sm:text-3xl"
                  >
                    {planCta.heading}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                    {planCta.description}
                  </p>
                  <Link
                    href="/contact"
                    className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#B88E5F] px-6 py-3 font-heading text-sm font-semibold text-white no-underline shadow-md transition-[background-color,transform,box-shadow] duration-300 hover:bg-[#a67d4f] hover:shadow-lg motion-safe:hover:translate-x-0.5 motion-reduce:transform-none"
                  >
                    {planCta.buttonLabel}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>

                <div className="flex flex-col justify-center gap-5 border-t border-[#ebe4d8] px-6 py-8 sm:px-8 lg:border-t-0 lg:border-l lg:py-10">
                  {planCta.highlights.map((item, index) => {
                    const icons = [IconShieldCheck, IconMapPin, IconSupport];
                    const Icon = icons[index] ?? IconShieldCheck;
                    return (
                      <div key={item.id} className="flex items-start gap-3">
                        <span
                          className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-[#B88E5F]"
                        >
                          <Icon className="size-5" />
                        </span>
                        <p className="pt-2 font-heading text-sm font-semibold text-[#1A1A1A]">
                          {item.title}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
