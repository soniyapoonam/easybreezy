import { contactHero, contactHeroImage } from "./contact";

const sharedVisual = {
  eyebrow: contactHero.eyebrow,
  body: contactHero.body,
  scrollCue: "Scroll to plan",
  imageSrc: contactHeroImage.src,
  imageAlt: contactHeroImage.alt,
} as const;

export const contactInnerPageHero = {
  ...sharedVisual,
  headingId: "contact-hero-heading",
  breadcrumbLabel: "Contact",
  heading: contactHero.heading,
} as const;

export const aboutInnerPageHero = {
  ...sharedVisual,
  headingId: "about-hero-heading",
  breadcrumbLabel: "About Us",
  heading: "About Us",
} as const;

export const tourPackagesInnerPageHero = {
  ...sharedVisual,
  headingId: "tour-packages-hero-heading",
  breadcrumbLabel: "Tour Packages",
  heading: "Tour Packages",
} as const;

export const destinationsInnerPageHero = {
  ...sharedVisual,
  headingId: "destinations-hero-heading",
  breadcrumbLabel: "Destinations",
  heading: "Destinations",
} as const;

export const blogInnerPageHero = {
  ...sharedVisual,
  headingId: "blog-hero-heading",
  breadcrumbLabel: "Blog",
  heading: "Blog",
} as const;

export const servicesInnerPageHero = {
  ...sharedVisual,
  headingId: "services-hero-heading",
  breadcrumbLabel: "Services",
  heading: "Services",
} as const;

export const bookingInnerPageHero = {
  ...sharedVisual,
  headingId: "booking-hero-heading",
  breadcrumbLabel: "Booking",
  heading: "Booking",
} as const;
