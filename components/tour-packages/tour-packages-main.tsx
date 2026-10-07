"use client";

import Link from "next/link";
import {
  IconMapPin,
  IconShieldCheck,
  IconSupport,
} from "@/components/layout/icons";
import { Container, Section } from "@/components/ui";
import { Reveal } from "@/components/services/reveal";
import {
  tourPackagesPageContent,
  type TourPackageListingItem,
} from "@/lib/content/tour-packages-page";
import { TourPackageListingCard } from "./tour-package-listing-card";

const CREAM = "#F9F7F2";

export function TourPackagesMain({
  packages,
}: {
  packages: TourPackageListingItem[];
}) {
  const { featured, planCta } = tourPackagesPageContent;

  return (
    <>
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
              className="mx-auto mt-5 block h-[3px] w-12 rounded-full bg-accent"
              aria-hidden="true"
            />
          </Reveal>

          {packages.length > 0 ? (
            <ul className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {packages.map((tourPackage, index) => (
                <li key={tourPackage.id}>
                  <Reveal delay={index * 70}>
                    <TourPackageListingCard tourPackage={tourPackage} />
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
                    className="font-heading text-[11px] font-semibold tracking-[0.22em] text-accent uppercase"
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
                    className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-6 py-3 font-heading text-sm font-semibold text-on-accent no-underline shadow-md transition-[background-color,transform,box-shadow,filter] duration-300 hover:brightness-110 hover:shadow-lg motion-safe:hover:translate-x-0.5 motion-reduce:transform-none"
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
                          className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-accent"
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
