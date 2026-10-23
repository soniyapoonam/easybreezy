import type { ReactNode } from "react";
import { IconCheck, IconClose } from "@/components/layout/icons";
import { InnerPageHero } from "@/components/layout";
import { Container, Section } from "@/components/ui";
import { cn } from "@/components/ui/cn";
import {
  destinationDetailCopy,
  destinationDetailPlaceholder,
  type DestinationDetailViewModel,
  type MonthTone,
} from "@/lib/content/destination-detail";
import { DestinationCard } from "./destination-card";
import { DestinationFaqs, DestinationItinerary } from "./destination-disclosure";
import { DestinationEnquiry } from "./destination-enquiry";
import { DestinationGallery } from "./destination-gallery";

const monthToneClass: Record<MonthTone, string> = {
  best: "border-primary bg-primary text-on-primary",
  good: "border-transparent bg-secondary/15 text-secondary",
  quiet: "border-border bg-background text-muted",
};

const legendSwatch: Record<MonthTone, string> = {
  best: "bg-primary",
  good: "bg-secondary/30",
  quiet: "border border-border bg-background",
};

function SectionTitle({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="font-heading text-2xl font-semibold text-primary md:text-[1.75rem]">
      {children}
    </h2>
  );
}

export function DestinationDetailView({
  model,
  slug,
}: {
  model: DestinationDetailViewModel;
  slug: string;
}) {
  const copy = destinationDetailPlaceholder;

  return (
    <div className="overflow-x-clip bg-surface">
      <InnerPageHero
        headingId="destination-detail-heading"
        parentBreadcrumb={{ label: "Destinations", href: "/destinations" }}
        breadcrumbLabel={model.name}
        eyebrow={model.region || undefined}
        heading={model.name}
        body={model.summary}
        imageSrc={model.imageSrc}
        imageAlt={model.imageAlt}
      />

      <section aria-label="Destination facts" className="bg-sky">
        <Container className="grid grid-cols-2 gap-x-6 gap-y-5 py-6 sm:py-7 lg:grid-cols-4 lg:py-8">
          {copy.facts.map((fact) => (
            <div key={fact.label} className="min-w-0">
              <p className="font-heading text-base font-semibold text-primary sm:text-lg">{fact.value}</p>
              <p className="mt-1 text-sm text-muted">{fact.label}</p>
            </div>
          ))}
        </Container>
      </section>

      <Container className="py-12 md:py-16 lg:py-20">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_22rem] xl:gap-16">
          <div className="min-w-0">
            <section aria-labelledby="destination-overview-heading">
              <SectionTitle id="destination-overview-heading">
                {destinationDetailCopy.aboutHeading} {model.name}
              </SectionTitle>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-text">{copy.overview}</p>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {copy.highlights.map((highlight) => {
                  const Icon = highlight.icon;
                  return (
                    <li
                      key={highlight.title}
                      className="flex min-w-0 items-start gap-3 rounded-[var(--radius-lg)] border border-border p-4"
                    >
                      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-sky text-primary">
                        <Icon className="size-4" />
                      </span>
                      <div className="grid min-w-0 flex-1 gap-1 sm:grid-cols-2 sm:gap-3">
                        <p className="font-heading text-sm font-semibold text-primary">{highlight.title}</p>
                        <p className="text-sm leading-relaxed text-muted">{highlight.description}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>

            <section aria-labelledby="destination-photos-heading" className="mt-14">
              <SectionTitle id="destination-photos-heading">{destinationDetailCopy.photosHeading}</SectionTitle>
              <DestinationGallery images={model.gallery} />
            </section>

            <section aria-labelledby="destination-itinerary-heading" className="mt-14">
              <SectionTitle id="destination-itinerary-heading">{destinationDetailCopy.itineraryHeading}</SectionTitle>
              <DestinationItinerary days={copy.itinerary} />
            </section>

            <section aria-labelledby="destination-inclusions-heading" className="mt-14">
              <SectionTitle id="destination-inclusions-heading">{destinationDetailCopy.inclusionsHeading}</SectionTitle>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[var(--radius-lg)] border border-border p-5">
                  <h3 className="font-heading text-base font-semibold text-primary">
                    {destinationDetailCopy.includedHeading}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {copy.inclusions.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-text">
                        <IconCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-[var(--radius-lg)] border border-border p-5">
                  <h3 className="font-heading text-base font-semibold text-primary">
                    {destinationDetailCopy.excludedHeading}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {copy.exclusions.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-text">
                        <IconClose className="mt-0.5 size-4 shrink-0 text-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section aria-labelledby="destination-best-time-heading" className="mt-14">
              <SectionTitle id="destination-best-time-heading">{destinationDetailCopy.bestTimeHeading}</SectionTitle>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-text">{copy.bestTimeNote}</p>
              <ol className="mt-5 flex flex-wrap gap-2">
                {copy.months.map((month) => (
                  <li key={month.label}>
                    <span
                      className={cn(
                        "inline-flex min-w-12 items-center justify-center rounded-md border px-2.5 py-2 text-sm font-medium",
                        monthToneClass[month.tone],
                      )}
                    >
                      {month.label}
                    </span>
                  </li>
                ))}
              </ol>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
                {copy.monthLegend.map((item) => (
                  <li key={item.label} className="inline-flex items-center gap-2">
                    <span className={cn("size-3 rounded-sm", legendSwatch[item.tone])} aria-hidden="true" />
                    {item.label}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="destination-faq-heading" className="mt-14">
              <SectionTitle id="destination-faq-heading">{destinationDetailCopy.faqHeading}</SectionTitle>
              <DestinationFaqs items={copy.faqs} />
            </section>
          </div>

          <DestinationEnquiry slug={slug} />
        </div>
      </Container>

      <Section aria-labelledby="related-destinations-heading" className="border-t border-border bg-sky">
        <Container>
          <h2
            id="related-destinations-heading"
            className="font-heading text-2xl font-semibold text-primary md:text-[1.75rem]"
          >
            {destinationDetailCopy.relatedHeading}
          </h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {model.related.map((item) => (
              <li key={item.slug} className="min-w-0">
                <DestinationCard destination={item} className="h-full min-h-[18rem]" />
                {item.summary ? (
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{item.summary}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </div>
  );
}
