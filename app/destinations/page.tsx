import type { Metadata } from "next";
import { Container, Section, SectionHeading } from "@/components/ui";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Destinations | ${siteConfig.name}`,
};

export default function DestinationsPage() {
  return (
    <Section>
      <Container>
        <SectionHeading as="h1" heading="Destinations" />
      </Container>
    </Section>
  );
}
