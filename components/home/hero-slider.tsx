"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui";
import { cn } from "@/components/ui/cn";
import { homeHero } from "@/lib/content/home";
import { VisualPanel } from "./visual-panel";

export function HeroSlider() {
  const slides = homeHero.slides;
  const [index, setIndex] = useState(0);
  const pointerStart = useRef<number | null>(null);

  const goTo = useCallback((next: number) => {
    setIndex(() => {
      if (slides.length === 0) return 0;
      return ((next % slides.length) + slides.length) % slides.length;
    });
  }, [slides.length]);

  const previous = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const autoplayTimer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(autoplayTimer);
  }, [slides.length]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "SELECT", "TEXTAREA"].includes(target.tagName)) {
        return;
      }
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, previous]);

  return (
    <section
      className="relative overflow-hidden bg-dark"
      aria-roledescription="carousel"
      aria-label="Featured travel stories"
    >

      <div
        className="relative min-h-[32rem] md:min-h-[38rem] lg:min-h-[42rem]"
        onPointerDown={(event) => {
          pointerStart.current = event.clientX;
        }}
        onPointerUp={(event) => {
          if (pointerStart.current === null) return;
          const delta = event.clientX - pointerStart.current;
          pointerStart.current = null;
          if (delta > 48) previous();
          if (delta < -48) next();
        }}
        onPointerCancel={() => {
          pointerStart.current = null;
        }}
      >
        {slides.map((slide, slideIndex) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:duration-0",
              slideIndex === index ? "opacity-100" : "opacity-0",
            )}
            aria-hidden={slideIndex !== index}
          >
            <VisualPanel
              label={slide.imageAlt}
              tone={slide.tone}
              imageSrc={slide.imageSrc}
              className="h-full min-h-[32rem] rounded-none shadow-none md:min-h-[38rem] lg:min-h-[42rem]"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-linear-to-r from-dark/80 via-dark/45 to-dark/20" />

        <Container className="relative flex min-h-[32rem] flex-col justify-end py-10 md:min-h-[38rem] md:justify-center md:py-14 lg:min-h-[42rem] lg:pb-16">
          <div className="max-w-2xl text-on-dark">
            <p className="font-heading text-small font-semibold tracking-[0.16em] text-highlight uppercase">
              {homeHero.eyebrow}
            </p>
            <h1 className="mt-3 text-on-dark">{homeHero.heading}</h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-on-dark/85 sm:text-lg">
              {homeHero.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={homeHero.primaryCta.href} className="btn btn-primary">
                {homeHero.primaryCta.label}
              </Link>
              <Link
                href={homeHero.secondaryCta.href}
                className="btn btn-outline border-white/25 bg-white/5 text-on-dark hover:bg-white/10 hover:text-on-dark"
              >
                {homeHero.secondaryCta.label}
              </Link>
            </div>
          </div>
        </Container>

        <div className="pointer-events-none absolute inset-x-0 bottom-5 z-20 md:bottom-7">
          <Container className="flex items-center justify-between gap-3">
            <div className="pointer-events-auto flex gap-2">
              <button
                type="button"
                className="inline-flex size-10 items-center justify-center rounded-md border border-white/15 bg-white/5 text-on-dark transition-colors hover:bg-white/10"
                aria-label="Previous slide"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={previous}
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                type="button"
                className="inline-flex size-10 items-center justify-center rounded-md border border-white/15 bg-white/5 text-on-dark transition-colors hover:bg-white/10"
                aria-label="Next slide"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={next}
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
            <div
              className="pointer-events-auto flex gap-2"
              role="tablist"
              aria-label="Slide selection"
            >
              {slides.map((slide, slideIndex) => (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-label={`Show slide: ${slide.caption}`}
                  aria-selected={slideIndex === index}
                  className={cn(
                    "h-2.5 rounded-full transition-all",
                    slideIndex === index
                      ? "w-8 bg-highlight"
                      : "w-2.5 bg-white/35 hover:bg-white/55",
                  )}
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={() => goTo(slideIndex)}
                />
              ))}
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
