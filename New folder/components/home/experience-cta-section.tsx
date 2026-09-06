import Link from "next/link";
import { Container, Section } from "@/components/ui";
import { homeExperienceCta } from "@/lib/content/home";
import { VisualPanel } from "./visual-panel";

export function ExperienceCtaSection() {
  return (
    <Section className="py-0" aria-labelledby="home-experience-heading">
      <div className="relative overflow-hidden bg-dark">
        <VisualPanel
          label="Placeholder for a planned travel route through hills and valleys"
          tone="dusk"
          className="absolute inset-0 min-h-full rounded-none opacity-40 shadow-none"
        />
        <div className="absolute inset-0 bg-linear-to-r from-dark/95 via-dark/85 to-dark/70" />
        <Container className="relative py-14 md:py-20">
          <div className="max-w-2xl">
            <p className="font-heading text-small font-semibold tracking-[0.14em] text-highlight uppercase">
              {homeExperienceCta.eyebrow}
            </p>
            <h2
              id="home-experience-heading"
              className="mt-3 text-on-dark"
            >
              {homeExperienceCta.heading}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-on-dark/80">
              {homeExperienceCta.body}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={homeExperienceCta.primaryHref} className="btn btn-primary">
                {homeExperienceCta.primaryLabel}
              </Link>
              <Link
                href={homeExperienceCta.secondaryHref}
                className="btn btn-outline border-white/25 bg-white/5 text-on-dark hover:bg-white/10 hover:text-on-dark"
              >
                {homeExperienceCta.secondaryLabel}
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
}
