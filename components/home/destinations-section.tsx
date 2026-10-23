import Link from "next/link";
import { Container, Section, SectionHeading } from "@/components/ui";
import { IconArrowRight } from "@/components/layout/icons";
import { homeDestinations } from "@/lib/content/destinations";
import { getHomeWordpressDestinations } from "@/lib/wordpress/destinations";
import {
  DestinationCard,
  type HomeDestinationCardData,
} from "./destination-card";

function toCardData(
  destination: HomeDestinationCardData,
): HomeDestinationCardData {
  return {
    slug: destination.slug,
    name: destination.name,
    href: destination.href,
    region: destination.region,
    imageSrc: destination.imageSrc,
    imageAlt: destination.imageAlt,
    rating: destination.rating ?? null,
    reviewCount: destination.reviewCount ?? null,
  };
}

export async function DestinationsSection() {
  const wordpressDestinations = await getHomeWordpressDestinations();
  const destinations =
    wordpressDestinations.length > 0
      ? wordpressDestinations.map(toCardData)
      : homeDestinations.slice(0, 5).map((destination) =>
          toCardData({
            slug: destination.slug,
            name: destination.name,
            href: destination.href,
            region: destination.region,
            imageSrc: destination.imageSrc,
            imageAlt: destination.imageAlt,
            rating: null,
            reviewCount: null,
          }),
        );

  return (
    <Section
      aria-labelledby="home-destinations-heading"
      className="bg-white"
    >
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <SectionHeading
            id="home-destinations-heading"
            eyebrow="TOP DESTINATIONS"
            heading="Popular Destinations"
            description="Places worth arriving to, not merely passing through."
          />
          <Link
            href="/destinations"
            className="inline-flex shrink-0 items-center gap-2 font-heading text-sm font-semibold text-primary no-underline transition-colors hover:text-secondary"
          >
            View all destinations
            <IconArrowRight className="size-4" />
          </Link>
        </div>
        <ul className="mt-10 flex gap-4 overflow-x-auto pb-1 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-3 md:overflow-visible lg:grid-cols-5 [&::-webkit-scrollbar]:hidden">
          {destinations.map((destination) => (
            <li
              key={destination.slug}
              className="w-[min(70vw,16.5rem)] shrink-0 snap-start md:w-auto"
            >
              <DestinationCard destination={destination} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
