import type { Metadata } from "next";
import { InnerPageHero } from "@/components/layout";
import {
  ServicesTogetherSection,
  ServicesIntroSection,
  ServicesJourneySection,
  ServicesShowcaseSection,
} from "@/components/services";
import { servicesInnerPageHero } from "@/lib/content/inner-page-hero";
import { siteConfig } from "@/lib/site";
import { getWordpressServices } from "@/lib/wordpress/services";

export const metadata: Metadata = {
  title: `Services | ${siteConfig.name}`,
  description:
    "Tour packages, custom trips, corporate taxis, round trips, local taxis, and outstation drives—arranged with clear routes and confirmed pickups.",
};

export default async function ServicesPage() {
  const services = await getWordpressServices();

  return (
    <>
      <InnerPageHero {...servicesInnerPageHero} />
      <ServicesIntroSection />
      <ServicesShowcaseSection services={services} />
      <ServicesJourneySection />
      <ServicesTogetherSection />
    </>
  );
}
