import type { Metadata } from "next";
import {
  AboutSection,
  BlogSection,
  DestinationsSection,
  ExperienceCtaSection,
  FinalCtaSection,
  HeroSlider,
  ReviewsSection,
  ServicesSection,
  TrustStrip,
  WhyChooseSection,
} from "@/components/home";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `${siteConfig.name} | Premium travel & taxi`,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <TrustStrip />
      <AboutSection />
      <ServicesSection />
      <WhyChooseSection />
      <DestinationsSection />
      <ExperienceCtaSection />
      <ReviewsSection />
      <BlogSection />
      <FinalCtaSection />
    </>
  );
}
