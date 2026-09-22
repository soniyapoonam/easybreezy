import type { Metadata } from "next";
import { InnerPageHero } from "@/components/layout";
import {
  ServicesTogetherSection,
  ServicesIntroSection,
  ServicesJourneySection,
  ServicesShowcaseSection,
} from "@/components/services";
import { servicesInnerPageHero } from "@/lib/content/inner-page-hero";
import { getServicesForPage } from "@/lib/content/services-page";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Services | ${siteConfig.name}`,
  description:
    "Tour packages, custom trips, corporate taxis, round trips, local taxis, and outstation drives—arranged with clear routes and confirmed pickups.",
};

export default function ServicesPage() {
  const services = getServicesForPage();

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
