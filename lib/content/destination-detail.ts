import type { ComponentType, SVGProps } from "react";
import {
  IconCalendarCheck,
  IconCarComfort,
  IconMapPin,
  IconShieldCheck,
} from "@/components/layout/icons";
import { destinations } from "@/lib/content/destinations";
import {
  destinationsPageList,
  type DestinationsPageDestination,
} from "@/lib/content/destinations-page";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export type MonthTone = "best" | "good" | "quiet";

export type DestinationDetailViewModel = {
  name: string;
  region: string;
  summary: string;
  imageSrc: string;
  imageAlt: string;
  gallery: readonly { src: string; alt: string; label: string }[];
  related: readonly DestinationsPageDestination[];
};

/**
 * Temporary visual copy for the destination detail layout.
 * Not connected to WordPress. Replace when destination content is wired up.
 */
export const destinationDetailPlaceholder = {
  facts: [
    { value: "6 days, 5 nights", label: "Suggested duration" },
    { value: "Mar to Jun, Sep to Oct", label: "Best time to visit" },
    { value: "Srinagar (SXR)", label: "Nearest airport" },
    { value: "Easy to moderate", label: "Activity level" },
  ],
  overview:
    "Kashmir mixes Mughal gardens, Himalayan views and calm water. Spend a morning on a shikara across Dal Lake, ride a gondola above the snow in Gulmarg, and walk through the green meadows of Pahalgam. It works well for couples, families and first-time visitors.",
  highlights: [
    {
      title: "Shikara ride on Dal Lake",
      description: "Floating markets and sunset on the water.",
      icon: IconMapPin,
    },
    {
      title: "Gulmarg gondola",
      description: "One of the highest cable cars in the world.",
      icon: IconShieldCheck,
    },
    {
      title: "Mughal gardens",
      description: "Nishat, Shalimar and Chashme Shahi.",
      icon: IconCalendarCheck,
    },
    {
      title: "Houseboat stay",
      description: "One night on a carved cedar houseboat.",
      icon: IconCarComfort,
    },
  ] as readonly {
    title: string;
    description: string;
    icon: IconComponent;
  }[],
  galleryLabels: ["Valley view", "Tulip garden", "Pahalgam valley", "Meadow trail", "Lakeside"],
  itinerary: [
    {
      label: "Day 1",
      title: "Arrive in Srinagar",
      points: [
        "Airport pickup and hotel check-in",
        "Evening shikara ride on Dal Lake",
        "Dinner and overnight on a houseboat",
      ],
    },
    {
      label: "Day 2",
      title: "Srinagar sightseeing",
      points: [
        "Mughal gardens and the old city",
        "Time for the local market",
        "Evening at leisure by the lake",
      ],
    },
    {
      label: "Day 3",
      title: "Gulmarg day trip",
      points: [
        "Drive up to the meadow",
        "Gondola ride, weather permitting",
        "Return to Srinagar",
      ],
    },
    {
      label: "Day 4",
      title: "Srinagar to Pahalgam",
      points: [
        "Scenic drive through the valley",
        "Stop at the countryside viewpoints",
        "Evening in Pahalgam",
      ],
    },
    {
      label: "Day 5",
      title: "Pahalgam to Srinagar",
      points: [
        "Morning in the meadows",
        "Return drive to Srinagar",
        "Free evening in the city",
      ],
    },
    {
      label: "Day 6",
      title: "Departure",
      points: ["Breakfast and checkout", "Transfer to the airport"],
    },
  ],
  inclusions: [
    "5 nights stay with breakfast",
    "Airport pickup and drop",
    "Private cab for all sightseeing",
    "Shikara ride",
    "All taxes",
  ],
  exclusions: [
    "Flights to Srinagar",
    "Lunch and dinner (except houseboat)",
    "Gondola and entry tickets",
    "Personal expenses",
    "Travel insurance",
  ],
  bestTimeNote:
    "Spring brings tulips, summer is mild, autumn has golden chinar leaves, and winter is best for snow.",
  months: [
    { label: "Jan", tone: "good" },
    { label: "Feb", tone: "good" },
    { label: "Mar", tone: "best" },
    { label: "Apr", tone: "best" },
    { label: "May", tone: "best" },
    { label: "Jun", tone: "best" },
    { label: "Jul", tone: "good" },
    { label: "Aug", tone: "good" },
    { label: "Sep", tone: "best" },
    { label: "Oct", tone: "best" },
    { label: "Nov", tone: "quiet" },
    { label: "Dec", tone: "quiet" },
  ] as readonly { label: string; tone: MonthTone }[],
  monthLegend: [
    { tone: "best" as const, label: "Best" },
    { tone: "good" as const, label: "Good" },
    { tone: "quiet" as const, label: "Cold or quiet" },
  ],
  faqs: [
    {
      question: "Is Kashmir safe for families?",
      answer:
        "Yes. This plan stays on the usual visitor routes, with a private cab and a relaxed daily pace suited to families.",
    },
    {
      question: "Do I need a permit?",
      answer:
        "The places on this outline do not need a special visitor permit. We will tell you if a checkpoint asks for photo identification.",
    },
    {
      question: "Can the plan be changed?",
      answer:
        "Yes. Dates, the pace of each day, and the houseboat night can be adjusted before you travel.",
    },
  ],
  priceAmount: "₹24,999",
  priceUnit: "/ person",
  enquiryNote: "No payment now. We reply within 24 hours.",
  preferToTalk: "Prefer to talk?",
} as const;

export const destinationDetailCopy = {
  aboutHeading: "About",
  photosHeading: "Photos",
  itineraryHeading: "Day by day itinerary",
  inclusionsHeading: "What is included",
  includedHeading: "Included",
  excludedHeading: "Not included",
  bestTimeHeading: "Best time to visit",
  faqHeading: "Questions",
  priceLabel: "Starting from",
  dateLabel: "Travel date",
  travellersLabel: "Travellers",
  enquireLabel: "Send enquiry",
  downloadLabel: "Download itinerary",
  relatedHeading: "More places you may like",
  lightboxLabel: "Destination photo",
  closeLabel: "Close",
  previousLabel: "Previous image",
  nextLabel: "Next image",
  notFoundTitle: "Destination not found",
  notFoundBody:
    "We couldn’t find that destination. Browse the places we plan journeys around.",
  notFoundCta: "Destinations",
} as const;

function toListedShape(
  item: (typeof destinations)[number],
): DestinationsPageDestination {
  return {
    slug: item.slug,
    name: item.name,
    region: item.region.toLowerCase(),
    country: item.region,
    summary: item.summary,
    href: item.href,
    imageSrc: item.imageSrc ?? "",
    imageAlt: item.imageAlt,
    moods: [],
    mapPosition: { x: 0, y: 0 },
    size: "small",
  };
}

function catalog(): DestinationsPageDestination[] {
  const listed = [...destinationsPageList];
  const known = new Set(listed.map((item) => item.slug));
  for (const item of destinations) {
    if (!known.has(item.slug)) listed.push(toListedShape(item));
  }
  return listed;
}

export function getDestinationDetailView(slug: string): DestinationDetailViewModel | null {
  const normalized = decodeURIComponent(slug).trim().toLowerCase();
  const items = catalog();
  const destination = items.find((item) => item.slug === normalized);
  if (!destination || !destination.imageSrc) return null;

  const others = items.filter((item) => item.slug !== destination.slug && item.imageSrc);
  const sameRegion = others.filter((item) => item.region === destination.region);
  const pool = sameRegion.length >= 4 ? sameRegion : [...sameRegion, ...others.filter((item) => item.region !== destination.region)];
  const gallerySources = [destination, ...pool].slice(0, 5);
  const labels = destinationDetailPlaceholder.galleryLabels;

  return {
    name: destination.name,
    region: destination.country,
    summary: destination.summary,
    imageSrc: destination.imageSrc,
    imageAlt: destination.imageAlt || destination.name,
    gallery: gallerySources.map((item, index) => ({
      src: item.imageSrc,
      alt: item.imageAlt || item.name,
      label: index === 0 ? destination.name : labels[index] ?? item.name,
    })),
    related: pool.slice(0, 3).map((item) => ({ ...item, size: "small" as const })),
  };
}
