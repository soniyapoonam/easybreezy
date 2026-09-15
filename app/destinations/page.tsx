import type { Metadata } from "next";
import { Suspense } from "react";
import { DestinationsPageContent } from "@/components/destinations";
import "@/components/destinations/destinations.css";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Destinations | ${siteConfig.name}`,
  description:
    "Discover extraordinary Himalayan destinations with Easy Travels — from Manali and Shimla to Spiti Valley, Kasol, Dharamshala, and Dalhousie.",
};

export default function DestinationsPage() {
  return (
    <div className="destinations-page">
      <Suspense fallback={null}>
        <DestinationsPageContent />
      </Suspense>
    </div>
  );
}
