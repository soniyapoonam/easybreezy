import type { Metadata } from "next";
import { JourneyPlanner } from "@/components/home";
import { Container, Section, SectionHeading } from "@/components/ui";
import { journeyPlannerCopy } from "@/lib/content/home";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Book Now | ${siteConfig.name}`,
  description: journeyPlannerCopy.description,
};

export default function BookNowPage() {
  return (
    <Section>
      <Container>
        <SectionHeading
          as="h1"
          heading="Book Now"
          description={journeyPlannerCopy.description}
        />
        <div className="mx-auto mt-8 max-w-[72rem] md:mt-10">
          <JourneyPlanner />
        </div>
      </Container>
    </Section>
  );
}
