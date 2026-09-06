/**
 * Service catalog — single source for Home, Services page, and matching footer identities.
 * Presentation components must render this data, not duplicate it.
 * Later: WordPress / CMS can replace this module without changing card UI.
 */

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
    imageAlt: "Placeholder for a tour package journey through the hills",
    tone: "ridge",
    imageSrc: null,
  },
  {
    id: "custom-trip",
    slug: "custom-trip",
    title: "Custom Trip",
    href: "/services#custom-trip",
    summary:
      "Tell us the places that matter. We connect them into a route that still leaves room to look out the window.",
    imageAlt: "Placeholder for a custom trip planned around personal stops",
    tone: "dusk",
    imageSrc: null,
  },
  {
    id: "corporate-taxi",
    slug: "corporate-taxi",
    title: "Corporate Taxi",
    href: "/services#corporate-taxi",
    summary:
      "Punctual, discreet transfers for meetings, airport runs, and visiting teams who need the day to stay on schedule.",
    imageAlt: "Placeholder for a professional corporate taxi transfer",
    tone: "pass",
    imageSrc: null,
  },
  {
    id: "round-trip",
    slug: "round-trip",
    title: "Round Trip",
    href: "/services#round-trip",
    summary:
      "Out and back with the same trusted vehicle—ideal for day visits, family functions, and return-the-same-evening plans.",
    imageAlt: "Placeholder for a round-trip taxi journey",
    tone: "lake",
    imageSrc: null,
  },
  {
    id: "local-taxi",
    slug: "local-taxi",
    title: "Local Taxi",
    href: "/services#local-taxi",
    summary:
      "Nearby errands, station pickups, and short hops when you want a familiar driver rather than an uncertain wait.",
    imageAlt: "Placeholder for a local taxi in town",
    tone: "forest",
    imageSrc: null,
  },
  {
    id: "outstation-taxi",
    slug: "outstation-taxi",
    title: "Outstation Taxi",
    href: "/services#outstation-taxi",
    summary:
      "Longer intercity drives across Himachal and neighbouring states, planned for comfort on hill and highway stretches.",
    imageAlt: "Placeholder for an outstation taxi on an open road",
    tone: "temple",
    imageSrc: null,
  },
];
