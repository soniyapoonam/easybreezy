import Link from "next/link";
import { Container, Section, SectionHeading } from "@/components/ui";
import { homeDestinations } from "@/lib/content/destinations";
import { DestinationCard } from "./destination-card";

export function DestinationsSection() {
  const destinations = homeDestinations.slice(0, 6);

  return (
    <Section
      aria-labelledby="home-destinations-heading"
      className="bg-white"
    >
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
           <SectionHeading
            id="home-destinations-heading"
            eyebrow="Popular destinations"
            heading="Places worth arriving to, not merely passing through."
            description="From quiet hill mornings to vibrant mountain towns, discover the places that make the journey worth taking."
            className=""
          />
          <Link href="/destinations" className="btn btn-outline shrink-0">
            See more
          </Link>
          
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-6">
            {destinations.slice(0,6) .map((destination) => (
            <DestinationCard
              key={destination.slug}
              destination={destination}
            />
          ))}
        </ul>
      </Container>
    </Section>
  );
}