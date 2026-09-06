import type { Metadata } from "next";
import { Container, Section, SectionHeading } from "@/components/ui";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Blog | ${siteConfig.name}`,
};

export default function BlogPage() {
  return (
    <Section>
      <Container>
        <SectionHeading as="h1" heading="Blog" />
      </Container>
    </Section>
  );
}
