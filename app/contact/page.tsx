import type { Metadata } from "next";
import { Container, Section, SectionHeading } from "@/components/ui";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Contact | ${siteConfig.name}`,
};

export default function ContactPage() {
  return (
    <Section>
      <Container>
        <SectionHeading as="h1" heading="Contact" />
      </Container>
    </Section>
  );
}
