"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Container, Section, SectionHeading } from "@/components/ui";
import { destinationsPageStory } from "@/lib/content/destinations-page";
import { Reveal } from "@/components/services/reveal";

export function DestinationsStory() {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = imageRef.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      if (rect.top < viewportHeight && rect.bottom > 0) {
        const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
        const offset = (progress - 0.5) * 24;
        node.style.transform = `translateY(${offset}px) scale(1.02)`;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Section
      aria-labelledby="destinations-story-heading"
      className="bg-background"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-lg border border-border/80 shadow-lg">
              <div
                ref={imageRef}
                className="aspect-[4/5] bg-cover bg-center transition-transform duration-100 ease-out will-change-transform motion-reduce:transform-none sm:aspect-[5/6]"
                style={{
                  backgroundImage: `url('${destinationsPageStory.imageSrc}')`,
                }}
                role="img"
                aria-label={destinationsPageStory.imageAlt}
              />
              <div
                className="absolute inset-0 bg-linear-to-t from-dark/35 via-transparent to-transparent"
                aria-hidden="true"
              />
            </div>
          </Reveal>

          <Reveal className="lg:col-span-6" delay={120}>
            <SectionHeading
              id="destinations-story-heading"
              eyebrow={destinationsPageStory.eyebrow}
              heading={destinationsPageStory.heading}
              description={destinationsPageStory.body}
            />
            <Link
              href="#destinations-featured"
              className="mt-8 inline-flex items-center gap-2 font-heading text-base font-semibold text-secondary no-underline transition-[gap,color] duration-300 hover:gap-3 hover:text-primary"
            >
              {destinationsPageStory.ctaLabel}
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
