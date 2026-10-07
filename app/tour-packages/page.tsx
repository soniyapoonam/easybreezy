import type { Metadata } from "next";
import { InnerPageHero } from "@/components/layout";
import { TourPackagesMain } from "@/components/tour-packages";
import { tourPackagesInnerPageHero } from "@/lib/content/inner-page-hero";
import { siteConfig } from "@/lib/site";
import { getWordpressTourPackages } from "@/lib/wordpress/tour-packages";

export const metadata: Metadata = {
  title: `Tour Packages | ${siteConfig.name}`,
  description:
    "Explore premium Himachal tour packages—Shimla, Manali, Dharamshala, Kangra, Spiti Valley, and curated journeys across the Himalayas.",
};

export default async function TourPackagesPage() {
  const packages = await getWordpressTourPackages();

  return (
    <>
      <InnerPageHero {...tourPackagesInnerPageHero} />
      <TourPackagesMain packages={packages} />
    </>
  );
}
