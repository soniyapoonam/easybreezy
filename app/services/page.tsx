import type { Metadata } from "next";
import {
  ServicesTogetherSection,
  ServicesIntroSection,
  ServicesJourneySection,
  ServicesShowcaseSection,
} from "@/components/services";
import { getServicesForPage } from "@/lib/content/services-page";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Services | ${siteConfig.name}`,
  description:
    "Tour packages, custom trips, corporate taxis, round trips, local taxis, and outstation drives—arranged with clear routes and confirmed pickups from Jhandutta.",
};

export default function ServicesPage() {
  const services = getServicesForPage();

  return (
    <>
      <ServicesIntroSection />
      <ServicesShowcaseSection services={services} />
      <ServicesJourneySection />
      <ServicesTogetherSection />
    </>
  );
}
