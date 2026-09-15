import Link from "next/link";
import { Container, Section, SectionHeading } from "@/components/ui";
import { VisualPanel } from "@/components/home/visual-panel";
import { servicesPageAbout } from "@/lib/content/services-page";
import { Reveal } from "./reveal";

export function ServicesAboutSection() {
  return (
    <Section aria-labelledby="services-about-heading">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              id="services-about-heading"
              eyebrow={servicesPageAbout.eyebrow}
              heading={servicesPageAbout.heading}
              description={servicesPageAbout.description}
            />
            <Link href={servicesPageAbout.ctaHref} className="btn btn-secondary mt-6">
              {servicesPageAbout.ctaLabel}
            </Link>
          </Reveal>

          <Reveal delay={120}>
            <div className="group overflow-hidden">
              <VisualPanel
                label={servicesPageAbout.imageAlt}
                tone={servicesPageAbout.tone}
                imageSrc={servicesPageAbout.imageSrc}
                className="min-h-72 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.03] md:min-h-96 motion-reduce:transform-none"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
