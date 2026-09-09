"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
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
  matchesDurationFilter,
  tourPackageFilterOptions,
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

function FilterField({
  label,
  icon,
  children,
}: {
  label: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <label className="flex min-w-0 flex-1 flex-col gap-2">
      <span className="text-xs font-semibold tracking-wide text-muted uppercase">
        {label}
      </span>
      <div className="relative">
        <span
          className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[#B88E5F]"
          aria-hidden="true"
        >
          {icon}
        </span>
        {children}
      </div>
    </label>
  );
}

const selectClass =
  "h-12 w-full appearance-none rounded-xl border border-[#e8e0d4] bg-[#faf8f5] py-2.5 pr-10 pl-11 text-sm text-text transition-[border-color,box-shadow] duration-200 focus:border-[#B88E5F] focus:outline-none focus:ring-2 focus:ring-[#B88E5F]/20";

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
  const [destination, setDestination] = useState<string>(
    tourPackageFilterOptions.destinations[0],
  );
  const [duration, setDuration] = useState<string>(
    tourPackageFilterOptions.durations[0],
  );
  const [bestTime, setBestTime] = useState<string>(
    tourPackageFilterOptions.bestTimes[0],
  );

  const filteredPackages = useMemo(() => {
    return tourPackagesListing.filter((pkg) => {
      const destinationMatch =
        destination === tourPackageFilterOptions.destinations[0] ||
        pkg.destinationLabel === destination;
      const durationMatch = matchesDurationFilter(pkg, duration);
      return destinationMatch && durationMatch;
    });
  }, [destination, duration]);

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

        <Container className="relative pb-28 pt-10 md:pb-32 md:pt-14 lg:pb-36">
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

        {/* Floating filter bar */}
        <div className="absolute inset-x-0 bottom-0 translate-y-1/2 px-[var(--container-padding)]">
          <Container className="!px-0">
            <form
              className="rounded-[1.25rem] border border-[#ebe4d8] bg-white p-4 shadow-[0_20px_60px_rgba(26,26,26,0.14)] sm:p-5 md:rounded-[1.5rem] md:p-6"
              onSubmit={(event) => event.preventDefault()}
              aria-label="Search tour packages"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-5">
                <FilterField
                  label="Destination"
                  icon={<IconMapPin className="size-4" />}
                >
                  <select
                    className={selectClass}
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  >
                    {tourPackageFilterOptions.destinations.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </FilterField>
                <FilterField
                  label="Duration"
                  icon={<IconCalendarCheck className="size-4" />}
                >
                  <select
                    className={selectClass}
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  >
                    {tourPackageFilterOptions.durations.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </FilterField>
                <FilterField
                  label="Best Time"
                  icon={
                    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                      <circle cx="12" cy="12" r="4" />
                      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                    </svg>
                  }
                >
                  <select
                    className={selectClass}
                    value={bestTime}
                    onChange={(e) => setBestTime(e.target.value)}
                  >
                    {tourPackageFilterOptions.bestTimes.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </FilterField>
                <button
                  type="button"
                  className="inline-flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#B88E5F] px-6 font-heading text-sm font-semibold text-white shadow-md transition-[background-color,box-shadow,transform] duration-300 hover:bg-[#a67d4f] hover:shadow-lg motion-safe:hover:scale-[1.01] motion-reduce:transform-none lg:w-auto lg:min-w-[9.5rem]"
                  onClick={() => {
                    document
                      .getElementById("tour-packages-grid")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                  </svg>
                  Search
                </button>
              </div>
            </form>
          </Container>
        </div>
      </section>

      {/* Featured grid */}
      <Section
        id="tour-packages-grid"
        aria-labelledby="tour-packages-featured-heading"
        className="bg-[#F9F7F2] pt-24 md:pt-28"
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

          {filteredPackages.length > 0 ? (
            <ul className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {filteredPackages.map((tourPackage, index) => (
                <li key={tourPackage.id}>
                  <Reveal delay={index * 70}>
                    <PackageCard tourPackage={tourPackage} />
                  </Reveal>
                </li>
              ))}
            </ul>
          ) : (
            <Reveal className="mt-12 rounded-2xl border border-[#ebe4d8] bg-white p-10 text-center">
              <p className="font-heading text-lg font-semibold text-primary">
                No packages match these filters
              </p>
              <p className="mt-2 text-muted">Try adjusting your search criteria.</p>
            </Reveal>
          )}
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
