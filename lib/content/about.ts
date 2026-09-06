export const aboutEnjoyAdventure = {
  eyebrow: "Who We Are",
  heading: "enjoy adventure in the world with our travel",
  body: "Easy Breezy Travels is a local travel desk in Vill Dohra, Tehsil Jhandutta. We arrange comfortable taxis, hill tours, and custom trips—so routes, pickup times, and pacing are clear before you leave.",
  ctaLabel: "Learn More",
  ctaHref: "#who-we-are",
  images: [
    {
      label: "Traveller looking across a mountain lake",
      tone: "ridge" as const,
      imageSrc:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    },
    {
      label: "Coastal cliffs and open water on a planned journey",
      tone: "lake" as const,
      imageSrc:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
    },
  ],
} as const;

export const aboutWhyChoose = {
  eyebrow: "Why Choose Us",
  heading: "Explore The World With Us",
  description:
    "We keep the work simple: confirmed pickups, routes suited to hill roads, and a real person you can call.",
  imageAlt: "Travellers on a planned day out",
  imageSrc:
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80",
  items: [
    {
      id: "experience",
      title: "Experience",
      text: "Familiar Himachal and neighbouring routes, planned for gradients, rest stops, and the length of the day.",
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
    "We work from Jhandutta with families, visiting teams, and small groups who want travel that feels considered rather than rushed.",
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
