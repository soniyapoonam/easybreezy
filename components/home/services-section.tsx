import Link from "next/link";
import { Container, Section, SectionHeading } from "@/components/ui";
import { services } from "@/lib/content/services";
import { ServiceCard } from "./service-card";

export function ServicesSection() {
  return (
    <Section className="bg-sky/40" aria-labelledby="home-services-heading">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="home-services-heading"
            eyebrow="Services"
            heading="Travel, arranged the way you actually move."
            description="Tours, taxis, and custom trips—each described plainly, without a menu of extras you did not ask for."
          />
          <Link href="/services" className="btn btn-outline shrink-0">
            All services
          </Link>
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <li key={service.id}>
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
