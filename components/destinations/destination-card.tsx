import Link from "next/link";
import { cn } from "@/components/ui/cn";
import type { DestinationsPageDestination } from "@/lib/content/destinations-page";

export function DestinationCard({
  destination,
  className,
}: {
  destination: DestinationsPageDestination;
  className?: string;
}) {
  const isLarge = destination.size === "large";
  const isMedium = destination.size === "medium";

  return (
    <Link
      href={destination.href}
      className={cn(
        "group relative flex min-h-[16rem] overflow-hidden rounded-2xl border border-border/60 bg-dark shadow-md no-underline",
        "transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:-translate-y-1 hover:shadow-hover motion-reduce:transform-none",
        isLarge && "min-h-[22rem] md:min-h-[28rem]",
        isMedium && "min-h-[18rem] md:min-h-[20rem]",
        className,
      )}
    >
      <img
        src={destination.imageSrc}
        alt={destination.imageAlt}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-105"
        loading="lazy"
        decoding="async"
      />
      <div
        className="absolute inset-0 bg-linear-to-t from-dark/85 via-dark/30 to-dark/10 transition-colors duration-500 group-hover:from-dark/90"
        aria-hidden="true"
      />

      <div className="relative mt-auto w-full p-5 sm:p-6">
        <p className="text-xs font-medium tracking-wide text-highlight uppercase">
          {destination.country}
        </p>
        <h3
          className={cn(
            "mt-1 font-heading font-semibold text-on-dark transition-transform duration-500 motion-safe:group-hover:-translate-y-1",
            isLarge ? "text-2xl md:text-3xl" : isMedium ? "text-xl md:text-2xl" : "text-lg",
          )}
        >
          {destination.name}
        </h3>
        <p
          className={cn(
            "mt-2 text-sm leading-relaxed text-on-dark/80",
            !isLarge && "line-clamp-2",
            isLarge && "max-w-md",
          )}
        >
          {destination.summary}
        </p>
        <span
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-on-dark transition-[gap] duration-300 group-hover:gap-3"
          aria-hidden="true"
        >
          Explore
          <span className="inline-flex size-8 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
