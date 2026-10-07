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

      <div className="relative mt-auto w-full bg-primary/40">
        <div className="flex items-center justify-between gap-3 px-5 py-4 sm:px-6 sm:py-5">
          <h3
            className={cn(
              "min-w-0 flex-1 font-heading font-semibold text-on-primary",
              isLarge ? "text-2xl md:text-3xl" : isMedium ? "text-xl md:text-2xl" : "text-lg",
            )}
          >
            {destination.country} ({destination.name})
          </h3>
          <span
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-on-primary transition-transform duration-300 group-hover:translate-x-0.5"
            aria-hidden="true"
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
