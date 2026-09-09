import { unsplashImages } from "./unsplash";

export const aboutEnjoyAdventure = {
  eyebrow: "Who We Are",
  heading: "enjoy adventure in the world with our travel",
  body: "Easy Travels is a demo travel desk at 123 Travel Avenue, City Center. We arrange comfortable taxis, tours, and custom trips—so routes, pickup times, and pacing are clear before you leave.",
  ctaLabel: "Learn More",
  ctaHref: "#who-we-are",
  images: [
    {
      label: "Traveller looking across a mountain lake",
      tone: "ridge" as const,
      imageSrc: unsplashImages.about.enjoyPrimary,
    },
    {
      label: "Coastal cliffs and open water on a planned journey",
      tone: "lake" as const,
      imageSrc: unsplashImages.about.enjoySecondary,
    },
  ],
} as const;

export const aboutWhyChoose = {
  eyebrow: "Why Choose Us",
  heading: "Explore The World With Us",
  description:
    "We keep the work simple: confirmed pickups, routes suited to hill roads, and a real person you can call.",
  imageAlt: "Travellers on a planned day out",
  imageSrc: unsplashImages.about.whyChoose,
  items: [
    {
      id: "experience",
      title: "Experience",
      text: "Familiar regional routes, planned for gradients, rest stops, and the length of the day.",
    },
    {
      id: "destination",
      title: "Destination",
      text: "Shimla, Manali, Dharamshala, Amritsar, and the miles between—shaped around the places that matter to you.",
    },
    {
      id: "support",
      title: "24/7 Support",
      text: "Reach us on the phone listed on this site. The conversation stays with the people running the journey.",
    },
  ],
} as const;

export const aboutWhoWeAre = {
  heading: "Who We are",
  paragraphs: [
    "We work from City Center with families, visiting teams, and small groups who want travel that feels considered rather than rushed.",
    "Details are confirmed before departure. Itineraries are paced for hill roads, not checklist tourism. When you need us, you speak with the people arranging the trip.",
  ],
  cards: [
    {
      title: "Vision",
      text: "Journeys that feel calm, clear, and human—comfortable miles with no guesswork about pickup or route.",
    },
    {
      title: "Mission",
      text: "Plan each trip with honest communication, familiar roads, and a pace that still feels like travel, not a timetable.",
    },
  ],
} as const;
