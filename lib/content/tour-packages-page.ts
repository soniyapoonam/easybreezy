import {
  destinations,
  homeTourPackages,
  type TourPackage,
} from "./destinations";
import { unsplashTourPackageImages, unsplashSrc } from "./unsplash";

export const tourPackagesPageContent = {
  hero: {
    eyebrow: "Amazing Places • Unforgettable Journeys",
    heading: "Our Tour Packages",
    description:
      "Discover handpicked tour packages designed to give you the perfect blend of adventure, comfort and unforgettable memories.",
    imageSrc: unsplashSrc("1543269665-ba004891d6fb"),
    imageAlt:
      "Traveler in a yellow jacket overlooking snow-capped Himalayan mountains",
  },
  featured: {
    heading: "Featured Tour Packages",
    description:
      "Handpicked journeys designed to help you experience the beauty, culture and adventure of Himachal.",
  },
  planCta: {
    eyebrow: "Ready for your next adventure?",
    heading: "Let's Plan Your Perfect Trip",
    description:
      "Tell us your dates, destinations, and travel style—we will shape a personalised Himachal itinerary that feels calm, clear, and entirely yours.",
    imageSrc: unsplashTourPackageImages.experienceHero,
    imageAlt: "Backpacker looking across a Himalayan valley",
    buttonLabel: "Contact Us",
    highlights: [
      { id: "custom", title: "Customizable Packages" },
      { id: "price", title: "Best Price Guarantee" },
      { id: "support", title: "24/7 Support" },
    ],
  },
} as const;

export type TourPackageBadgeTone =
  | "popular"
  | "bestseller"
  | "family"
  | "cultural"
  | "adventure"
  | "luxury"
  | "default";

export type TourPackageListingItem = TourPackage & {
  category: string;
  experienceType: string;
  listingImageSrc: string;
  shortDescription: string;
  startingPrice: number;
  priceFrom: number;
  listingBadge?: string;
  badgeTone: TourPackageBadgeTone;
};

type ListingMeta = {
  category: string;
  experienceType: string;
  listingImageSrc: string;
  shortDescription: string;
  title?: string;
  priceFrom: number;
  listingBadge?: string;
  badgeTone: TourPackageBadgeTone;
};

const listingMetaById: Record<string, ListingMeta> = {
  "package-shimla": {
    category: "Hill Station",
    experienceType: "Leisure",
    listingImageSrc: unsplashTourPackageImages.shimlaGetaway,
    shortDescription:
      "Colonial charm, ridge walks, and cool mountain air in the queen of hills.",
    title: "Shimla Getaway",
    priceFrom: 8999,
    listingBadge: "Popular",
    badgeTone: "popular",
  },
  "package-manali": {
    category: "Adventure",
    experienceType: "Mountain",
    listingImageSrc: unsplashTourPackageImages.manaliAdventure,
    shortDescription:
      "Snow peaks, Beas valley views, and orchard country at a relaxed pace.",
    title: "Manali Adventure",
    priceFrom: 10999,
    listingBadge: "Best Seller",
    badgeTone: "bestseller",
  },
  "package-dharamshala": {
    category: "Hill Station",
    experienceType: "Culture",
    listingImageSrc: unsplashTourPackageImages.dharamshalaEscape,
    shortDescription:
      "Dhauladhar panoramas, monasteries, and the calm rhythm of McLeod Ganj.",
    title: "Dharamshala Escape",
    priceFrom: 9499,
    listingBadge: "Family Favorite",
    badgeTone: "family",
  },
  "package-amritsar": {
    category: "Heritage",
    experienceType: "Culture",
    listingImageSrc: unsplashTourPackageImages.amritsarHeritage,
    shortDescription:
      "Golden Temple evenings, old-city lanes, and a cultural pause en route.",
    title: "Amritsar Heritage Weekend",
    priceFrom: 7999,
    listingBadge: "Cultural",
    badgeTone: "cultural",
  },
  "package-kangra": {
    category: "Valley",
    experienceType: "Nature",
    listingImageSrc: unsplashTourPackageImages.kangraValley,
    shortDescription:
      "Fort trails, tea country, and wide green valleys below the Dhauladhar.",
    title: "Kangra Valley Tour",
    priceFrom: 7499,
    listingBadge: "Adventure",
    badgeTone: "adventure",
  },
  "package-spiti": {
    category: "Adventure",
    experienceType: "Expedition",
    listingImageSrc: unsplashTourPackageImages.spitiExpedition,
    shortDescription:
      "Remote passes, monastery towns, and raw high-Himalayan landscapes.",
    title: "Spiti Valley Expedition",
    priceFrom: 18999,
    listingBadge: "Luxury",
    badgeTone: "luxury",
  },
};

function enrichPackage(pkg: TourPackage): TourPackageListingItem {
  const meta = listingMetaById[pkg.id];
  const startingPrice = pkg.days * pkg.pricePerDay;

  return {
    ...pkg,
    title: meta?.title ?? pkg.title,
    category: meta?.category ?? "Himachal",
    experienceType: meta?.experienceType ?? "Travel",
    listingImageSrc: meta?.listingImageSrc ?? pkg.imageSrc ?? "",
    shortDescription: meta?.shortDescription ?? pkg.summary,
    startingPrice,
    priceFrom: meta?.priceFrom ?? startingPrice,
    listingBadge: meta?.listingBadge ?? pkg.badge,
    badgeTone: meta?.badgeTone ?? "default",
  };
}

function buildExtraPackage(
  id: string,
  slug: string,
  meta: ListingMeta & {
    title: string;
    destinationLabel: string;
    days: number;
    nights: number;
    pricePerDay: number;
    badge?: string;
    summary: string;
    imageAlt: string;
    tone: TourPackage["tone"];
  },
): TourPackageListingItem {
  const destination =
    destinations.find((item) => item.slug === slug) ?? destinations[0];

  const startingPrice = meta.days * meta.pricePerDay;

  return {
    ...destination,
    id,
    title: meta.title,
    destinationLabel: meta.destinationLabel,
    days: meta.days,
    nights: meta.nights,
    rating: 5,
    reviewCount: 2,
    pricePerDay: meta.pricePerDay,
    badge: meta.badge,
    summary: meta.summary,
    imageAlt: meta.imageAlt,
    tone: meta.tone,
    imageSrc: meta.listingImageSrc,
    href: `/tour-packages#${id}`,
    category: meta.category,
    experienceType: meta.experienceType,
    listingImageSrc: meta.listingImageSrc,
    shortDescription: meta.shortDescription,
    startingPrice,
    priceFrom: meta.priceFrom,
    listingBadge: meta.listingBadge,
    badgeTone: meta.badgeTone,
  };
}

const spitiPackage = buildExtraPackage("package-spiti", "manali", {
  title: "Spiti Valley Expedition",
  destinationLabel: "Spiti Valley",
  days: 7,
  nights: 6,
  pricePerDay: 8500,
  badge: "Expedition",
  summary:
    "Remote high-desert valleys, ancient monasteries, and dramatic Himalayan roads.",
  imageAlt: "High-altitude Spiti Valley road through Himalayan mountains",
  tone: "pass",
  category: "Adventure",
  experienceType: "Expedition",
  listingImageSrc: unsplashTourPackageImages.spitiExpedition,
  shortDescription:
    "Remote passes, monastery towns, and raw high-Himalayan landscapes.",
  priceFrom: 18999,
  listingBadge: "Luxury",
  badgeTone: "luxury",
});

/** Featured grid order — matches the reference design (6 cards). */
export const featuredTourPackageIds = [
  "package-shimla",
  "package-manali",
  "package-dharamshala",
  "package-amritsar",
  "package-kangra",
  "package-spiti",
] as const;

const allPackagesMap = new Map<string, TourPackageListingItem>([
  ...homeTourPackages.map((pkg) => [pkg.id, enrichPackage(pkg)] as const),
  [spitiPackage.id, spitiPackage],
]);

export const tourPackagesListing: TourPackageListingItem[] =
  featuredTourPackageIds.map((id) => {
    const pkg = allPackagesMap.get(id);
    if (!pkg) throw new Error(`Missing tour package: ${id}`);
    return pkg;
  });

export const tourPackageFilterOptions = {
  destinations: [
    "All Destinations",
    ...Array.from(
      new Set(tourPackagesListing.map((pkg) => pkg.destinationLabel)),
    ),
  ],
  durations: ["All Durations", "2–3 days", "4–5 days", "6+ days"],
  bestTimes: [
    "Anytime",
    "Spring (Mar–May)",
    "Summer (Jun–Aug)",
    "Autumn (Sep–Nov)",
    "Winter (Dec–Feb)",
  ],
} as const;

export function matchesDurationFilter(
  pkg: TourPackageListingItem,
  duration: string,
): boolean {
  if (duration === "All Durations") return true;
  if (duration === "2–3 days") return pkg.days <= 3;
  if (duration === "4–5 days") return pkg.days >= 4 && pkg.days <= 5;
  if (duration === "6+ days") return pkg.days >= 6;
  return true;
}
