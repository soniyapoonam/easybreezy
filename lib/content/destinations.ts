/**
 * Destination catalog — single source for Home teasers and future listing/detail pages.
 * Footer shows a curated four-link subset via lib/site.ts; hrefs must stay aligned.
 * Later: WordPress can supply title, copy, media, and highlights.
 */

export type Destination = {
  slug: string;
  name: string;
  href: string;
  region: string;
  summary: string;
  featuredOnHome: boolean;
  imageAlt: string;
  tone: "ridge" | "dusk" | "pass" | "lake" | "temple" | "forest";
  imageSrc: string | null;
};

export const destinations: readonly Destination[] = [
  {
    slug: "shimla",
    name: "Shimla",
    href: "/destinations/shimla",
    region: "Himachal Pradesh",
    summary: "Ridge walks, cedar air, and a hill capital that rewards an unhurried arrival.",
    featuredOnHome: true,
    imageAlt: "Placeholder for Shimla hill-station scenery",
    tone: "ridge",
    imageSrc: null,
  },
  {
    slug: "manali",
    name: "Manali",
    href: "/destinations/manali",
    region: "Himachal Pradesh",
    summary: "Beas valley light, orchard country, and the gateway toward high-pass roads.",
    featuredOnHome: true,
    imageAlt: "Placeholder for Manali valley scenery",
    tone: "forest",
    imageSrc: null,
  },
  {
    slug: "atal-tunnel",
    name: "Atal Tunnel",
    href: "/destinations/atal-tunnel",
    region: "Himachal Pradesh",
    summary: "A remarkable mountain crossing—best experienced as part of a planned Rohtang-side day.",
    featuredOnHome: false,
    imageAlt: "Placeholder for the Atal Tunnel mountain approach",
    tone: "pass",
    imageSrc: null,
  },
  {
    slug: "manikaran",
    name: "Manikaran",
    href: "/destinations/manikaran",
    region: "Himachal Pradesh",
    summary: "Hot springs and a riverside pilgrimage town in the Parvati valley.",
    featuredOnHome: true,
    imageAlt: "Placeholder for Manikaran riverside town",
    tone: "dusk",
    imageSrc: null,
  },
  {
    slug: "dharamshala",
    name: "Dharamshala",
    href: "/destinations/dharamshala",
    region: "Himachal Pradesh",
    summary: "Dhauladhar views, monasteries, and a quieter hill pace above Kangra.",
    featuredOnHome: true,
    imageAlt: "Placeholder for Dharamshala hillside views",
    tone: "ridge",
    imageSrc: null,
  },
  {
    slug: "amritsar",
    name: "Amritsar",
    href: "/destinations/amritsar",
    region: "Punjab",
    summary: "Golden Temple evenings, old-city lanes, and a cultural pause on many northbound routes.",
    featuredOnHome: true,
    imageAlt: "Placeholder for Amritsar heritage atmosphere",
    tone: "temple",
    imageSrc: null,
  },
  {
    slug: "sukhna-lake",
    name: "Sukhna Lake",
    href: "/destinations/sukhna-lake",
    region: "Chandigarh",
    summary: "A still-water promenade—often a gentle start or close to a longer road trip.",
    featuredOnHome: false,
    imageAlt: "Placeholder for Sukhna Lake",
    tone: "lake",
    imageSrc: null,
  },
  {
    slug: "rock-garden",
    name: "Rock Garden",
    href: "/destinations/rock-garden",
    region: "Chandigarh",
    summary: "Nek Chand’s sculpted world—worth a dedicated stop when the itinerary allows time.",
    featuredOnHome: false,
    imageAlt: "Placeholder for Chandigarh Rock Garden",
    tone: "forest",
    imageSrc: null,
  },
  {
    slug: "rose-garden",
    name: "Rose Garden",
    href: "/destinations/rose-garden",
    region: "Chandigarh",
    summary: "Seasonal colour in the city—best paired with a calm Chandigarh half-day.",
    featuredOnHome: false,
    imageAlt: "Placeholder for Zakir Hussain Rose Garden",
    tone: "dusk",
    imageSrc: null,
  },
  {
    slug: "kangra",
    name: "Kangra",
    href: "/destinations/kangra",
    region: "Himachal Pradesh",
    summary: "Fort views, tea country, and a valley that sits naturally on Dharamshala routes.",
    featuredOnHome: true,
    imageAlt: "Placeholder for Kangra valley",
    tone: "pass",
    imageSrc: null,
  },
];

export const homeDestinations = destinations.filter(
  (destination) => destination.featuredOnHome,
);

export type TourPackage = Destination & {
  id: string;
  title: string;
  destinationLabel: string;
  days: number;
  nights: number;
  rating: number;
  reviewCount: number;
  pricePerDay: number;
  badge?: string;
};

const tourPackageDetails = [
  {
    id: "package-shimla",
    destinationSlug: "shimla",
    title: "Shimla Escape with Local Sightseeing",
    destinationLabel: "Shimla",
    days: 3,
    nights: 2,
    rating: 5,
    reviewCount: 2,
    pricePerDay: 5500,
    badge: "Featured",
  },
  {
    id: "package-manali",
    destinationSlug: "manali",
    title: "Manali Valley Journey",
    destinationLabel: "Manali",
    days: 4,
    nights: 3,
    rating: 5,
    reviewCount: 3,
    pricePerDay: 6500,
  },
  {
    id: "package-dharamshala",
    destinationSlug: "dharamshala",
    title: "Dharamshala & McLeod Ganj Retreat",
    destinationLabel: "Dharamshala",
    days: 3,
    nights: 2,
    rating: 5,
    reviewCount: 2,
    pricePerDay: 5200,
  },
  {
    id: "package-manali-atal-tunnel",
    destinationSlug: "manali",
    title: "Manali Adventure & Atal Tunnel",
    destinationLabel: "Manali & Atal Tunnel",
    days: 5,
    nights: 4,
    rating: 5,
    reviewCount: 4,
    pricePerDay: 7200,
    badge: "Popular",
  },
  {
    id: "package-amritsar",
    destinationSlug: "amritsar",
    title: "Amritsar Heritage Weekend",
    destinationLabel: "Amritsar",
    days: 3,
    nights: 2,
    rating: 5,
    reviewCount: 2,
    pricePerDay: 4800,
  },
  {
    id: "package-kangra",
    destinationSlug: "kangra",
    title: "Kangra Valley & Fort Trail",
    destinationLabel: "Kangra",
    days: 2,
    nights: 1,
    rating: 5,
    reviewCount: 1,
    pricePerDay: 4200,
  },
] as const;

export const homeTourPackages: readonly TourPackage[] = tourPackageDetails.map(
  (packageDetail) => {
    const destination = destinations.find(
      (item) => item.slug === packageDetail.destinationSlug,
    );

    if (!destination) {
      throw new Error(`Unknown tour package destination: ${packageDetail.destinationSlug}`);
    }

    return {
      ...destination,
      ...packageDetail,
    };
  },
);
