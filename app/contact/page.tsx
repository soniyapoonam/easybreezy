import type { Metadata } from "next";
import {
  ContactActions,
  ContactDetails,
  ContactHero,
  ContactPlanner,
  ContactWherever,
} from "@/components/contact";
import "@/components/contact/contact.css";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Contact | ${siteConfig.name}`,
  description:
    "Start your journey with Easy Travels. Tell us where you want to go—taxis, hill tours, and custom trips planned with care.",
};

export default function ContactPage() {
  return (
    <div className="contact-page">
      <ContactHero />
      <ContactPlanner />
      <ContactDetails />
      <ContactWherever />
      <ContactActions />
    </div>
  );
}
