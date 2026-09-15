import { siteConfig } from "@/lib/site";
import { unsplashImages } from "./unsplash";

export const contactHero = {
  eyebrow: "LET'S START YOUR JOURNEY",
  heading: "Tell Us Where You Want To Go",
  body: "Share the places on your mind. We will help shape a comfortable route—clear pickup, considered pacing, and a real person at the other end of the line.",
} as const;

export const contactPlanner = {
  heading: "Plan It. Ask It. Let's Make It Happen.",
  body: "Tell us who is travelling, where you hope to go, and when you would like to leave. This enquiry starts the conversation—it does not confirm a booking or show a fare.",
  steps: [
    { id: "01", title: "Who is travelling" },
    { id: "02", title: "The journey" },
    { id: "03", title: "What we should know" },
  ],
  fields: {
    name: "Full Name",
    email: "Email",
    phone: "Phone",
    destination: "Destination",
    date: "Travel Date",
    travellers: "Number of Travellers",
    message: "Message",
  },
  submitLabel: "Send Enquiry",
  successTitle: "Enquiry noted on this page",
  successBody:
    "When the live enquiry service is connected, this form will reach our travel desk. For now, call or email us with the same details.",
  visual: {
    kicker: "Your next escape starts here",
    tags: "Mountains • Culture • Adventure",
    imageSrc: unsplashImages.services.tourPackage,
    imageAlt: "Scenic mountain road through hill country",
    insetSrc: unsplashImages.destinations.kangra,
    insetAlt: "Valley light on a planned travel day",
  },
} as const;

export const contactDetails = {
  heading: "Reach the desk",
  body: "The same details printed across this site. No invented numbers.",
  hoursLabel: "Working Hours",
  hoursValue: "Daily, 8:00 AM – 8:00 PM",
} as const;

export const contactWherever = {
  heading: "Wherever The Road Takes You",
  body: "We're here to help turn your travel idea into a memorable journey—hill roads, valley towns, and the miles between.",
  imageSrc: unsplashImages.destinations.manali,
  imageAlt: "High Himalayan peaks above a valley",
  pins: [
    { id: "desk", label: "Travel desk", x: "18%", y: "72%" },
    { id: "shimla", label: "Shimla", x: "38%", y: "28%" },
    { id: "manali", label: "Manali", x: "62%", y: "22%" },
    { id: "dharamshala", label: "Dharamshala", x: "78%", y: "48%" },
  ],
} as const;

export const contactActions = {
  heading: "Prefer a quicker line?",
  items: [
    {
      id: "call",
      label: "Call Us",
      hint: siteConfig.contact.phone,
      href: siteConfig.contact.phoneHref,
    },
    {
      id: "email",
      label: "Email Us",
      hint: siteConfig.contact.email,
      href: siteConfig.contact.emailHref,
    },
    {
      id: "enquiry",
      label: "Send an Enquiry",
      hint: "Use the planner above",
      href: "#contact-planner",
    },
  ],
} as const;

export const contactHeroImage = {
  src: unsplashImages.destinations.shimla,
  alt: "Cinematic Himalayan ridge at first light",
} as const;
