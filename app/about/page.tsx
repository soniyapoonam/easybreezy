import type { Metadata } from "next";
import {
  AboutWhyChooseSection,
  EnjoyAdventureSection,
  WhoWeAreSection,
} from "@/components/about";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `About | ${siteConfig.name}`,
};

export default function AboutPage() {
  return (
    <>
      <EnjoyAdventureSection />
      <AboutWhyChooseSection />
      <WhoWeAreSection />
    </>
  );
}
