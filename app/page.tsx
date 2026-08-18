import type { Metadata } from "next";
import {
  AboutSection,
  BlogSection,
  DestinationsSection,
  ExperienceCtaSection,
  FinalCtaSection,
  HeroSlider,
  JourneyPlanner,
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
      <section className="relative z-20 -mt-8 px-4 md:-mt-10 lg:-mt-12">
        <div className="mx-auto max-w-[72rem]">
          <JourneyPlanner />
        </div>
      </section>
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
