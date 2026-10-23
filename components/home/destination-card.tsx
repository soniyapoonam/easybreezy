import Link from "next/link";
import { DestinationFavoriteButton } from "./destination-favorite-button";

export type HomeDestinationCardData = {
  slug: string;
  name: string;
  href: string;
  region: string;
  imageSrc: string | null;
  imageAlt: string;
  rating?: number | null;
  reviewCount?: number | null;
};

function formatRating(value: number): string {
  return value.toFixed(1);
}

const hoverReveal =
  "group-hover:max-h-8 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:max-h-8 group-focus-within:opacity-100 group-focus-within:translate-y-0 [@media(hover:none)]:max-h-8 [@media(hover:none)]:opacity-100 [@media(hover:none)]:translate-y-0";

export function DestinationCard({
  destination,
}: {
  destination: HomeDestinationCardData;
}) {
  const rating =
    typeof destination.rating === "number" && destination.rating > 0
      ? destination.rating
      : null;
  const reviewCount =
    typeof destination.reviewCount === "number" && destination.reviewCount > 0
      ? destination.reviewCount
      : null;
  const region = destination.region.trim();

  return (
    <article className="group relative h-full overflow-hidden rounded-lg">
      <Link
        href={destination.href}
        className="relative block aspect-[3/4] overflow-hidden rounded-lg no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-inset"
      >
        {destination.imageSrc ? (
          <img
            src={destination.imageSrc}
            alt={destination.imageAlt}
            className="absolute inset-0 h-full w-full rounded-lg object-cover object-center transition-transform duration-700 ease-out motion-safe:group-hover:scale-110 motion-safe:group-focus-within:scale-110"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div
            className="absolute inset-0 rounded-lg bg-primary"
            aria-hidden="true"
          />
        )}

        <div
          className="absolute inset-0 rounded-lg bg-linear-to-t from-dark/75 via-dark/20 to-transparent"
          aria-hidden="true"
        />

        <div
          className="absolute inset-0 bg-black/5 transition-colors duration-500 group-hover:bg-black/15 group-focus-within:bg-black/15 [@media(hover:none)]:bg-black/10"
          aria-hidden="true"
        />

        <div className="absolute inset-x-0 bottom-0 p-4 pr-14">
          <h3 className="truncate font-heading text-lg font-semibold leading-tight text-white drop-shadow-md">
            {destination.name}
          </h3>
          {rating !== null ? (
            <p className="mt-1 truncate text-sm text-white/95">
              <span aria-hidden="true">★ {formatRating(rating)}</span>
              {reviewCount !== null ? (
                <span>
                  {" "}
                  ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
                </span>
              ) : null}
              <span className="sr-only">
                {formatRating(rating)} out of 5
                {reviewCount !== null
                  ? `, ${reviewCount} ${reviewCount === 1 ? "review" : "reviews"}`
                  : ""}
              </span>
            </p>
          ) : null}
          {region ? (
            <p
              className={`mt-1 max-h-0 overflow-hidden text-xs text-white/90 opacity-0 transition-all duration-500 ${hoverReveal}`}
            >
              {region}
            </p>
          ) : null}
        </div>

        <span
          className={`absolute bottom-4 right-4 flex h-8 w-8 translate-y-2 items-center justify-center rounded-full bg-white/15 text-sm text-white opacity-0 backdrop-blur-sm transition-all duration-500 ${hoverReveal}`}
          aria-hidden="true"
        >
          →
        </span>
      </Link>
      <DestinationFavoriteButton name={destination.name} />
    </article>
  );
}
