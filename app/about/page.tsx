import type { Metadata } from "next";
import {
  AboutWhyChooseSection,
  EnjoyAdventureSection,
  WhoWeAreSection,
} from "@/components/about";
import { InnerPageHero } from "@/components/layout";
import { aboutInnerPageHero } from "@/lib/content/inner-page-hero";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `About | ${siteConfig.name}`,
};

export default function AboutPage() {
  return (
    <>
      <InnerPageHero {...aboutInnerPageHero} />
      <EnjoyAdventureSection />
      <AboutWhyChooseSection />
      <WhoWeAreSection />
    </>
  );
}
