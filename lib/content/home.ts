import { siteConfig } from "@/lib/site";
import { unsplashImages } from "./unsplash";

export const homeHero = {
  eyebrow: "Travel · Taxi · Tours",
  heading: "Journeys planned with care, not hurry.",
  description:
    "Easy Travels arranges comfortable taxis, tours, and custom trips—so the road ahead feels clear before you leave.",
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
      caption: "Scenic hill roads",
      tone: "ridge" as const,
      imageAlt:
        "Hill stations landscape for the Easy Travels homepage banner",
      imageSrc: "/img/hill-stations.jpg",
    },
    {
      id: "comfort",
      caption: "Comfortable, considered travel",
      tone: "dusk" as const,
      imageAlt: "Placeholder for a comfortable taxi journey at dusk",
      imageSrc:
        "/img/hill-road.jpg",
    },
    {
      id: "places",
      caption: "Towns, valleys, and the miles between",
      tone: "temple" as const,
      imageAlt:
        "Placeholder for cultural and valley destinations on a planned route",
      imageSrc:
        "/img/tourist-place.jpg",
    },
    {
      id: "valley",
      caption: "Valley roads at first light",
      tone: "lake" as const,
      imageAlt: "Placeholder for a valley road journey at first light",
      imageSrc:
        "/img/hill-stations.jpg",
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
  eyebrow: "About Easy Travels",
  heading: "A travel desk with a calm way of working.",
  body: "We are based at 123 Travel Avenue, City Center. Families, visiting teams, and small groups come to us for taxis and tours that feel considered—clear communication, familiar routes, and itineraries that are not rushed for the sake of looking busy.",
  highlights: [
    "Based in City Center, serving regional and outstation routes",
    "Pickup details confirmed before every departure",
    "Itineraries paced for hill roads, not checklist tourism",
  ],
  ctaLabel: "Read our story",
  ctaHref: "/about",
  imageAlt: "Taxi on a scenic hill road for Easy Travels",
  tone: "forest" as const,
  imageSrc: unsplashImages.home.about,
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
  visualAlt: "Winding hill road through mountain scenery",
  tone: "pass" as const,
  imageSrc: unsplashImages.home.whyChoose,
};

export const homeExperienceCta = {
  eyebrow: "Plan the day",
  heading: "Shape the journey around the places you care about.",
  body: "A good trip is not a longer list of stops. Tell us what matters, and we will help you connect the miles with a pace that still feels human.",
  primaryLabel: "Plan your journey",
  primaryHref: siteConfig.bookingHref,
  secondaryLabel: siteConfig.bookingCtaLabel,
  secondaryHref: siteConfig.bookingHref,
  imageSrc: unsplashImages.home.experienceCta,
  imageAlt: "Hill station landscape with mountain peaks",
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
  eyebrow: "Your next escape starts here",
  heading: "Start planning your trip now.",
  offer: "Get 30% off your first planned journey",
  body: "Tell us where you want to go and we will help shape a comfortable route around the places that matter to you.",
  ctaLabel: siteConfig.bookingCtaLabel,
  ctaHref: siteConfig.bookingHref,
};

export const journeyPlannerCopy = {
  title: "Plan your journey",
  description:
    "Enter a route to prepare distance and travel-time details. Fares are not shown at this step.",
  nameLabel: "Name",
  phoneLabel: "Phone Number",
  passengersLabel: "Passengers",
  pickupDateLabel: "Pick Up Date",
  vehicleLabel: "Vehicle",
  pickupAddressLabel: "Pick Up Address",
  dropoffAddressLabel: "Drop Off Address",
  submitLabel: "Book Now",
  placeholderTitle: "Route calculation is not connected yet",
  placeholderBody:
    "When this service is live, you will see distance, estimated time, and direction here. Pricing is handled separately in the booking workflow—never in this panel.",
};
