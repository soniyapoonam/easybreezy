/**
 * Service catalog — single source for Home, Services page, and matching footer identities.
 * Presentation components must render this data, not duplicate it.
 * Later: WordPress / CMS can replace this module without changing card UI.
 */

import { unsplashImages } from "./unsplash";

export type Service = {
  id: string;
  slug: string;
  title: string;
  href: string;
  summary: string;
  imageAlt: string;
  /** Temporary visual key until photography is selected. */
  tone: "ridge" | "dusk" | "pass" | "lake" | "temple" | "forest";
  imageSrc: string | null;
};

export const services: readonly Service[] = [
  {
    id: "tour-package",
    slug: "tour-package",
    title: "Tour Package",
    href: "/services#tour-package",
    summary:
      "Thoughtfully paced hill and heritage itineraries, shaped around your dates rather than a rushed checklist.",
    imageAlt: "Scenic hill road on a guided tour route",
    tone: "ridge",
    imageSrc: unsplashImages.services.tourPackage,
  },
  {
    id: "custom-trip",
    slug: "custom-trip",
    title: "Custom Trip",
    href: "/services#custom-trip",
    summary:
      "Tell us the places that matter. We connect them into a route that still leaves room to look out the window.",
    imageAlt: "Traveller enjoying a scenic custom journey",
    tone: "dusk",
    imageSrc: unsplashImages.services.customTrip,
  },
  {
    id: "corporate-taxi",
    slug: "corporate-taxi",
    title: "Corporate Taxi",
    href: "/services#corporate-taxi",
    summary:
      "Punctual, discreet transfers for meetings, airport runs, and visiting teams who need the day to stay on schedule.",
    imageAlt: "Professional car ready for a corporate transfer",
    tone: "pass",
    imageSrc: unsplashImages.services.corporateTaxi,
  },
  {
    id: "round-trip",
    slug: "round-trip",
    title: "Round Trip",
    href: "/services#round-trip",
    summary:
      "Out and back with the same trusted vehicle—ideal for day visits, family functions, and return-the-same-evening plans.",
    imageAlt: "Highway stretching toward a distant horizon",
    tone: "lake",
    imageSrc: unsplashImages.services.roundTrip,
  },
  {
    id: "local-taxi",
    slug: "local-taxi",
    title: "Local Taxi",
    href: "/services#local-taxi",
    summary:
      "Nearby errands, station pickups, and short hops when you want a familiar driver rather than an uncertain wait.",
    imageAlt: "Taxi on a city street at golden hour",
    tone: "forest",
    imageSrc: unsplashImages.services.localTaxi,
  },
  {
    id: "outstation-taxi",
    slug: "outstation-taxi",
    title: "Outstation Taxi",
    href: "/services#outstation-taxi",
    summary:
      "Longer intercity drives across regional and highway stretches, planned for comfort on longer travel days.",
    imageAlt: "Open highway on a long outstation drive",
    tone: "temple",
    imageSrc: unsplashImages.services.outstationTaxi,
  },
];
