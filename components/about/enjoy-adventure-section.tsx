import Link from "next/link";
import { Container, Section } from "@/components/ui";
import { aboutEnjoyAdventure } from "@/lib/content/about";
import { VisualPanel } from "@/components/home/visual-panel";

export function EnjoyAdventureSection() {
  const [primaryImage, secondaryImage] = aboutEnjoyAdventure.images;

  return (
    <Section aria-labelledby="about-enjoy-heading" className="bg-white">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-0">
            <VisualPanel
              label={primaryImage.label}
              tone={primaryImage.tone}
              imageSrc={primaryImage.imageSrc}
              className="min-h-80 md:min-h-[28rem]"
            />
            <VisualPanel
              label={secondaryImage.label}
              tone={secondaryImage.tone}
              imageSrc={secondaryImage.imageSrc}
              className="mt-0 hidden min-h-80 sm:mt-8 sm:block sm:-ml-8 md:min-h-[28rem]"
            />
          </div>

          <div className="lg:pl-4">
            <p className="font-heading text-small font-semibold tracking-wide text-secondary uppercase">
              {aboutEnjoyAdventure.eyebrow}
            </p>
            <h1
              id="about-enjoy-heading"
              className="mt-3 max-w-xl text-balance"
            >
              {aboutEnjoyAdventure.heading}
            </h1>
            <span
              className="mt-4 block h-[3px] w-16 bg-highlight"
              aria-hidden="true"
            />
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {aboutEnjoyAdventure.body}
            </p>
            <Link
              href={aboutEnjoyAdventure.ctaHref}
              className="btn btn-primary mt-6"
            >
              {aboutEnjoyAdventure.ctaLabel}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
