import Link from "next/link";
import { IconCalendarCheck, IconMapPin } from "@/components/layout/icons";
import { cn } from "@/components/ui/cn";
import type {
  TourPackageBadgeTone,
  TourPackageListingItem,
} from "@/lib/content/tour-packages-page";

const badgeToneClass: Record<TourPackageBadgeTone, string> = {
  popular: "bg-sky-100 text-sky-900",
  bestseller: "bg-[#1e3a5f] text-white",
  family: "bg-emerald-100 text-emerald-900",
  cultural: "bg-violet-100 text-violet-900",
  adventure: "bg-orange-100 text-orange-900",
  luxury: "bg-slate-800 text-white",
  default: "bg-white/95 text-primary",
};

export function TourPackageListingCard({
  tourPackage,
}: {
  tourPackage: TourPackageListingItem;
}) {
  const badgeLabel = tourPackage.listingBadge ?? tourPackage.badge;

  return (
    <article
      id={tourPackage.id}
      className="group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-[#ebe4d8] bg-white shadow-[0_10px_40px_rgba(26,26,26,0.06)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(26,26,26,0.12)] motion-reduce:transform-none"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {tourPackage.listingImageSrc ? (
          <img
            src={tourPackage.listingImageSrc}
            alt={tourPackage.imageAlt}
            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 motion-reduce:transform-none"
            loading="lazy"
            decoding="async"
          />
        ) : null}
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
        <h3 className="font-heading text-[1.35rem] font-semibold leading-snug text-[#000]">
          {tourPackage.title}
        </h3>

        <p className="mt-3 text-xs font-medium text-muted">Demo package rating</p>
        <div
          className="mt-1 flex flex-wrap items-center gap-2"
          aria-label={`${tourPackage.rating.toFixed(1)} out of 5, ${tourPackage.reviewCount} reviews`}
        >
          <span
            className="tracking-[0.15em] text-primary"
            aria-hidden="true"
          >
            {"★\uFE0E".repeat(
              Math.max(0, Math.min(5, Math.round(tourPackage.rating))),
            )}
          </span>
          <span className="text-xs font-medium text-primary">
            {tourPackage.rating.toFixed(1)}
          </span>
          <span className="text-xs text-muted">
            ({tourPackage.reviewCount}{" "}
            {tourPackage.reviewCount === 1 ? "Review" : "Reviews"})
          </span>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
          <span className="inline-flex items-center gap-1.5">
            <IconCalendarCheck className="size-4 shrink-0 text-accent" />
            {tourPackage.days} Days {tourPackage.nights} Nights
          </span>
          <span className="inline-flex items-center gap-1.5">
            <IconMapPin className="size-4 shrink-0 text-accent" />
            {tourPackage.destinationLabel}
          </span>
        </div>

        <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">
          {tourPackage.shortDescription}
        </p>

        <div className="mt-5 flex items-end justify-between gap-3 border-t border-[#f0ebe3] pt-5">
          <div>
            <p className="text-xs text-muted">Per Day</p>
            <p className="mt-0.5 font-heading text-lg font-bold text-primary">
              ₹{tourPackage.pricePerDay.toLocaleString("en-IN")}
            </p>
          </div>
          <Link
            href={tourPackage.ctaHref}
            className="btn btn-outline group/book shrink-0 rounded-full border-accent px-3 py-2 text-accent no-underline hover:bg-accent hover:text-on-accent motion-safe:transition-transform motion-safe:group-hover/book:translate-x-0.5"
          >
            {tourPackage.ctaLabel}
            <span className="grid size-5 place-items-center rounded-full bg-accent text-xs text-on-accent transition-colors group-hover/book:bg-on-accent group-hover/book:text-accent">
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
