import { siteConfig } from "@/lib/site";

export const homeHero = {
  eyebrow: "Travel · Taxi · Tours",
  heading: "Journeys planned with care, not hurry.",
  description:
    "Easy Breezy Travels arranges comfortable taxis, hill tours, and custom trips from Jhandutta—so the road ahead feels clear before you leave.",
  primaryCta: {
    label: siteConfig.bookingCtaLabel,
    href: siteConfig.bookingHref,
  },
  secondaryCta: {
    label: "Explore destinations",
    href: "/destinations",
  },
  slides: [
    {
      id: "hills",
      caption: "Himachal hill roads",
      tone: "ridge" as const,
      imageAlt:
        "Placeholder for a cinematic hill-road journey through Himachal Pradesh",
      imageSrc: null,
    },
    {
      id: "comfort",
      caption: "Comfortable, considered travel",
      tone: "dusk" as const,
      imageAlt: "Placeholder for a comfortable taxi journey at dusk",
      imageSrc: null,
    },
    {
      id: "places",
      caption: "Towns, valleys, and the miles between",
      tone: "temple" as const,
      imageAlt:
        "Placeholder for cultural and valley destinations on a planned route",
      imageSrc: null,
    },
  ],
};

export const homeTrustItems = [
  {
    title: "Reliable Travel",
    text: "Pickup times and routes confirmed before you travel.",
  },
  {
    title: "Comfortable Journeys",
    text: "Pacing suited to hill roads and longer outstation days.",
  },
  {
    title: "Professional Service",
    text: "A real person to speak with before, during, and after the trip.",
  },
  {
    title: "Easy Booking",
    text: "Check a route here, then complete booking on a dedicated page.",
  },
] as const;

export const homeAbout = {
  eyebrow: "About Easy Breezy Travels",
  heading: "A local travel desk with a calm way of working.",
  body: "We are based in Vill Dohra, Tehsil Jhandutta. Families, visiting teams, and small groups come to us for taxis and tours that feel considered—clear communication, familiar hill routes, and itineraries that are not rushed for the sake of looking busy.",
  highlights: [
    "Based in Jhandutta, serving Himachal and neighbouring routes",
    "Pickup details confirmed before every departure",
    "Itineraries paced for hill roads, not checklist tourism",
  ],
  ctaLabel: "Read our story",
  ctaHref: "/about",
  imageAlt: "Placeholder for Easy Breezy Travels on the road in Himachal",
  tone: "forest" as const,
  imageSrc: null,
};

export const homeWhyChoose = {
  eyebrow: "Why choose us",
  heading: "What we actually promise.",
  description:
    "No inflated numbers. These are the working habits we hold ourselves to on every trip.",
  points: [
    {
      title: "Reliable service",
      text: "Details are confirmed before departure, so you are not guessing the pickup or the route.",
    },
    {
      title: "Comfortable travel",
      text: "We plan for hill gradients, rest stops, and the length of the day—not only the shortest line on a map.",
    },
    {
      title: "Professional support",
      text: "You can reach us on the phone listed on this site. The conversation stays with the people running the journey.",
    },
    {
      title: "Transparent process",
      text: "When route calculation is connected, you will see distance and time. You will not see a fare in that panel.",
    },
  ],
  visualAlt: "Placeholder for a quiet Himachal road at first light",
  tone: "pass" as const,
};

export const homeExperienceCta = {
  eyebrow: "Plan the day",
  heading: "Shape the journey around the places you care about.",
  body: "A good trip is not a longer list of stops. Tell us what matters, and we will help you connect the miles with a pace that still feels human.",
  primaryLabel: "Plan your journey",
  primaryHref: "#plan-your-journey",
  secondaryLabel: siteConfig.bookingCtaLabel,
  secondaryHref: siteConfig.bookingHref,
};

export const homeReviews = {
  eyebrow: "Google reviews",
  heading: "What travellers say, when we can show it.",
  description:
    "This space is reserved for genuine Google reviews. We will not invent names, ratings, or testimonials.",
  emptyTitle: "Google reviews, connected soon",
  emptyBody:
    "Genuine traveller feedback from our official Google listing will appear here once the integration is live. We keep this space clear rather than filling it with invented quotes.",
};

export const homeBlog = {
  eyebrow: "Travel journal",
  heading: "Notes from the road, when they are ready.",
  description:
    "Articles will be published through WordPress and listed here. We are not filling this grid with pretend posts.",
  emptyTitle: "Journal entries on the way",
  emptyBody:
    "Travel stories and route notes will be published here through WordPress. Until the first articles are live, explore destinations and services to start planning.",
  ctaLabel: "Visit the journal",
  ctaHref: "/blog",
};

export const homeFinalCta = {
  heading: "When you are ready, book on a clear next page.",
  body: "This homepage is for discovering the journey. Online booking has its own focused flow—so nothing important is rushed into a banner.",
  ctaLabel: siteConfig.bookingCtaLabel,
  ctaHref: siteConfig.bookingHref,
};

export const journeyPlannerCopy = {
  title: "Plan your journey",
  description:
    "Enter a route to prepare distance and travel-time details. Fares are not shown at this step.",
  fromLabel: "From",
  toLabel: "To",
  dateLabel: "Travel date",
  travellersLabel: "Travellers",
  submitLabel: "Check route",
  placeholderTitle: "Route calculation is not connected yet",
  placeholderBody:
    "When this service is live, you will see distance, estimated time, and direction here. Pricing is handled separately in the booking workflow—never in this panel.",
};
