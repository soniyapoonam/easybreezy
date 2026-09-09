import { services, type Service } from "./services";
import { unsplashImages } from "./unsplash";

/** Presentation-only image map for the Services page showcase cards. */
export const servicePageImages: Record<Service["id"], string> = {
  "tour-package": unsplashImages.servicesPage.tourPackage,
  "custom-trip": unsplashImages.servicesPage.customTrip,
  "corporate-taxi": unsplashImages.servicesPage.corporateTaxi,
  "round-trip": unsplashImages.servicesPage.roundTrip,
  "local-taxi": unsplashImages.servicesPage.localTaxi,
  "outstation-taxi": unsplashImages.servicesPage.outstationTaxi,
};

export const servicesPageIntro = {
  eyebrow: "What we arrange",
  heading: "Every mile planned with intention.",
  description:
    "Easy Travels is a demo travel desk at 123 Travel Avenue, City Center. We arrange tours, custom routes, corporate transfers, and taxis—so pickup times, pacing, and the road ahead feel clear before you leave.",
  highlights: [
    "Tours, taxis, and custom trips across regional and outstation routes",
    "Pickup details confirmed before every departure",
    "Routes paced for hill roads and longer outstation days",
  ],
  imageSrc: unsplashImages.servicesPage.intro,
  imageAlt: "Mountain landscape on a planned travel route",
} as const;

export const servicesJourney = {
  eyebrow: "Your travel path",
  heading: "Services that connect, not compete.",
  description:
    "Most journeys need more than one kind of ride. We arrange each leg so the whole trip still feels considered—from the first pickup to the return.",
  steps: [
    {
      id: "plan",
      title: "Share what matters",
      text:
        "Tell us the places, dates, and pace you need. A tour package, a custom route, or a single transfer—we start from your plan, not a template.",
    },
    {
      id: "confirm",
      title: "Route and pickup confirmed",
      text:
        "Before you travel, we confirm the vehicle, timing, and route. Hill gradients, rest stops, and day length are part of the plan—not surprises on the road.",
    },
    {
      id: "travel",
      title: "Move with a familiar desk behind you",
      text:
        "Whether it is a local hop, a round trip, or an outstation drive, you speak with the people arranging the journey—not a faceless booking screen.",
    },
  ],
} as const;

export const servicesTogetherSection = {
  eyebrow: "How it fits together",
  heading: "More than just a service.",
  description:
    "Most journeys ask for more than one arrangement. A tour package, a local pickup, an outstation drive, or a return leg—each can be planned so the whole trip still feels organised, not stitched together at the last minute.",
  flow: [
    {
      id: "plan",
      label: "Plan",
      text: "Share your places, dates, and the pace you need for each day.",
    },
    {
      id: "connect",
      label: "Connect",
      text: "We align tours, transfers, and taxis into one clear route.",
    },
    {
      id: "experience",
      label: "Experience",
      text: "Travel knowing each leg was arranged with the next in mind.",
    },
  ],
  imageSrc: unsplashImages.servicesPage.together,
  imageAlt: "Comfortable taxi on a scenic travel route",
} as const;

export type ServiceWithImage = Service & { imageSrc: string };

export function getServicesForPage(): ServiceWithImage[] {
  return services.map((service) => ({
    ...service,
    imageSrc: servicePageImages[service.id],
  }));
}
