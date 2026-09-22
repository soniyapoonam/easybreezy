import type { Metadata } from "next";
import { JourneyPlanner } from "@/components/home";
import { InnerPageHero } from "@/components/layout";
import { Container, Section, SectionHeading } from "@/components/ui";
import { bookingInnerPageHero } from "@/lib/content/inner-page-hero";
import { journeyPlannerCopy } from "@/lib/content/home";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Book Now | ${siteConfig.name}`,
  description: journeyPlannerCopy.description,
};

export default function BookNowPage() {
  return (
    <>
      <InnerPageHero {...bookingInnerPageHero} />
      <Section>
        <Container>
          <SectionHeading
            as="h2"
            align="center"
            heading="Book Now"
            description={journeyPlannerCopy.description}
          />
          <div className="mx-auto mt-8 max-w-[72rem] md:mt-10">
            <JourneyPlanner />
          </div>
        </Container>
      </Section>
    </>
  );
}
