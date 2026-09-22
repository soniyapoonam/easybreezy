import type { Metadata } from "next";
import { InnerPageHero } from "@/components/layout";
import { Container, Section, SectionHeading } from "@/components/ui";
import { blogInnerPageHero } from "@/lib/content/inner-page-hero";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Blog | ${siteConfig.name}`,
};

export default function BlogPage() {
  return (
    <>
      <InnerPageHero {...blogInnerPageHero} />
      <Section>
        <Container>
          <SectionHeading as="h2" heading="Blog" />
        </Container>
      </Section>
    </>
  );
}
