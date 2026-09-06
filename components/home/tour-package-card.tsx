import Link from "next/link";
import { Card } from "@/components/ui";
import { IconCalendarCheck, IconMapPin } from "@/components/layout/icons";
import type { TourPackage } from "@/lib/content/destinations";
import { siteConfig } from "@/lib/site";
import { VisualPanel } from "./visual-panel";

export function TourPackageCard({
  tourPackage,
}: {
  tourPackage: TourPackage;
}) {
  return (
    <Card
      interactive
      className="group flex h-full flex-col overflow-hidden rounded-none border-border/70 p-0"
    >
      <div className="relative aspect-16/10 overflow-hidden">
        <VisualPanel
          label={tourPackage.imageAlt}
          tone={tourPackage.tone}
          className="h-full rounded-none shadow-none transition-transform duration-500 motion-safe:group-hover:scale-105"
        />
        {tourPackage.badge ? (
          <p className="absolute left-4 top-4 rounded-full bg-surface/95 px-3 py-1 font-heading text-xs font-semibold tracking-wide text-primary shadow-sm">
            {tourPackage.badge}
          </p>
        ) : null}
        <div className="absolute bottom-4 left-1/2 flex w-max max-w-[calc(100%-2rem)] -translate-x-1/2 translate-y-1/2 items-center gap-2 rounded-t-[8px] bg-accent px-4 py-2 font-heading text-xs font-semibold text-on-accent shadow-md">
          <IconMapPin className="size-3.5 shrink-0" />
          <span className="truncate">{tourPackage.destinationLabel}</span>
          <span className="text-on-accent/65" aria-hidden="true">
            |
          </span>
          <IconCalendarCheck className="size-3.5 shrink-0" />
          <span className="whitespace-nowrap">
            {tourPackage.days} Days, {tourPackage.nights} Nights
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5 pt-9">
        <p className="text-xs font-medium text-muted">Demo package rating</p>
        <div className="mt-1 flex items-center gap-2" aria-label={`${tourPackage.rating} out of 5 demo rating`}>
          <span className="tracking-[0.15em] text-highlight" aria-hidden="true">
            {"★".repeat(tourPackage.rating)}
          </span>
          <span className="text-xs text-muted">
            ({tourPackage.reviewCount} Reviews)
          </span>
        </div>
        <h3 className="mt-3 min-h-14 font-heading text-lg font-semibold text-primary">
          {tourPackage.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {tourPackage.summary}
        </p>
        <div className="mt-5 flex items-end justify-between gap-3 border-t border-border pt-4">
          <div>
            <p className="text-xs text-muted">Per Day</p>
            <p className="mt-0.5 font-heading text-lg font-bold text-primary">
              ₹{tourPackage.pricePerDay.toLocaleString("en-IN")}
            </p>
          </div>
          <Link
            href={siteConfig.bookingHref}
            className="btn btn-outline group/book rounded-full border-accent px-3 py-2 text-accent hover:bg-accent hover:text-on-accent motion-safe:transition-transform motion-safe:group-hover/book:translate-x-0.5"
          >
            Book Now
            <span className="grid size-5 place-items-center rounded-full bg-accent text-xs text-on-accent transition-colors group-hover/book:bg-on-accent group-hover/book:text-accent">
              →
            </span>
          </Link>
        </div>
      </div>
    </Card>
  );
}