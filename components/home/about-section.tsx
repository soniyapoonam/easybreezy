import Link from "next/link";
import { Container, Section, SectionHeading } from "@/components/ui";
import { homeAbout } from "@/lib/content/home";
import { VisualPanel } from "./visual-panel";

export function AboutSection() {
  return (
    <Section aria-labelledby="home-about-heading">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              id="home-about-heading"
              eyebrow={homeAbout.eyebrow}
              heading={homeAbout.heading}
              description={homeAbout.body}
            />
            <Link href={homeAbout.ctaHref} className="btn btn-secondary mt-6">
              {homeAbout.ctaLabel}
            </Link>
          </div>
          <VisualPanel
            label={homeAbout.imageAlt}
            tone={homeAbout.tone}
            imageSrc={homeAbout.imageSrc}
            className="min-h-72 md:min-h-96"
          />
        </div>
      </Container>
    </Section>
  );
}
