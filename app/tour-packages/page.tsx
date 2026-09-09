import type { Metadata } from "next";
import { TourPackagesMain } from "@/components/tour-packages";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Tour Packages | ${siteConfig.name}`,
  description:
    "Explore premium Himachal tour packages—Shimla, Manali, Dharamshala, Kangra, Spiti Valley, and curated journeys across the Himalayas.",
};

export default function TourPackagesPage() {
  return <TourPackagesMain />;
}
