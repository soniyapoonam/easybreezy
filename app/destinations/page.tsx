import type { Metadata } from "next";
import { Suspense } from "react";
import { DestinationsPageContent } from "@/components/destinations";
import "@/components/destinations/destinations.css";
import { InnerPageHero } from "@/components/layout";
import { destinationsInnerPageHero } from "@/lib/content/inner-page-hero";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Destinations | ${siteConfig.name}`,
  description:
    "Discover extraordinary Himalayan destinations with Easy Travels — from Manali and Shimla to Spiti Valley, Kasol, Dharamshala, and Dalhousie.",
};

export default function DestinationsPage() {
  return (
    <div className="destinations-page">
      <InnerPageHero {...destinationsInnerPageHero} />
      <Suspense fallback={null}>
        <DestinationsPageContent />
      </Suspense>
    </div>
  );
}
