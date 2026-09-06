import type { Metadata } from "next";
import { Container, Section, SectionHeading } from "@/components/ui";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Services | ${siteConfig.name}`,
};

export default function ServicesPage() {
  return (
    <Section>
      <Container>
        <SectionHeading as="h1" heading="Services" />
      </Container>
    </Section>
  );
}
