import Link from "next/link";
import { Container, Section, SectionHeading } from "@/components/ui";
import { homeDestinations } from "@/lib/content/destinations";
import { DestinationCard } from "./destination-card";

export function DestinationsSection() {
  return (
    <Section aria-labelledby="home-destinations-heading">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="home-destinations-heading"
            eyebrow="Popular destinations"
            heading="Places worth arriving to, not merely passing through."
            description="A curated selection from our Himachal and Punjab routes. The full list lives on the destinations page."
          />
          <Link href="/destinations" className="btn btn-secondary shrink-0">
            View all destinations
          </Link>
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {homeDestinations.slice(0,4).map((destination) => (
            <li key={destination.slug}>
              <DestinationCard destination={destination} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
