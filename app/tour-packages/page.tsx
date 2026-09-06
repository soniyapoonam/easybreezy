import type { Metadata } from "next";
import { Container, Section, SectionHeading } from "@/components/ui";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Tour Packages | ${siteConfig.name}`,
};

export default function TourPackagesPage() {
  return (
    <Section>
      <Container>
        <SectionHeading as="h1" heading="Tour Packages" />
      </Container>
    </Section>
  );
}
