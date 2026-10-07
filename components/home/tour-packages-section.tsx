import Link from "next/link";
import { Container, Section, SectionHeading } from "@/components/ui";
import { TourPackageListingCard } from "@/components/tour-packages";
import { getLatestWordpressTourPackages } from "@/lib/wordpress/tour-packages";

export async function TourPackagesSection() {
  const latestPackages = await getLatestWordpressTourPackages();

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
            description="Discover thoughtfully planned journeys across regional and outstation routes."
          />
          <Link href="/destinations" className="btn btn-outline shrink-0">
            Explore destinations
          </Link>
        </div>
        <ul className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {latestPackages.map((tourPackage) => (
            <li key={tourPackage.id}>
              <TourPackageListingCard tourPackage={tourPackage} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
