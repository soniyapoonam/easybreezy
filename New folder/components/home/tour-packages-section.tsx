import Link from "next/link";
import { Container, Section, SectionHeading } from "@/components/ui";
import { homeTourPackages } from "@/lib/content/destinations";
import { TourPackageCard } from "./tour-package-card";

export function TourPackagesSection() {
  return (
    <Section
      className="bg-surface"
      aria-labelledby="home-tour-packages-heading"
    >
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="home-tour-packages-heading"
            eyebrow="Tour packages"
            heading="Explore journeys worth taking."
            description="Discover thoughtfully planned journeys across Himachal and beyond."
          />
          <Link href="/destinations" className="btn btn-outline shrink-0">
            Explore destinations
          </Link>
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {homeTourPackages.slice(0,4).map((tourPackage) => (
            <li key={tourPackage.id}>
              <TourPackageCard tourPackage={tourPackage} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}