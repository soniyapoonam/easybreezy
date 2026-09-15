"use client";

import { useState } from "react";
import { Container, Section } from "@/components/ui";
import { cn } from "@/components/ui/cn";
import {
  destinationMoods,
  destinationsPageMood,
} from "@/lib/content/destinations-page";
import { Reveal } from "@/components/services/reveal";

type MoodId = (typeof destinationMoods)[number]["id"];

export function DestinationsMood() {
  const [activeId, setActiveId] = useState<MoodId>(destinationMoods[0].id);
  const activeMood =
    destinationMoods.find((mood) => mood.id === activeId) ?? destinationMoods[0];

  return (
    <Section
      aria-labelledby="destinations-mood-heading"
      className="relative overflow-hidden bg-surface"
    >
      <div
        className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-sky/70 blur-3xl"
        aria-hidden="true"
      />

      <Container>
        <Reveal>
          <h2 id="destinations-mood-heading" className="text-balance">
            {destinationsPageMood.heading}
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-stretch">
          <Reveal className="lg:col-span-5" delay={80}>
            <div
              className="relative min-h-[18rem] overflow-hidden rounded-3xl border border-border/70 shadow-lg sm:min-h-[22rem]"
              role="img"
              aria-label={`${activeMood.label} travel mood`}
            >
              {destinationMoods.map((mood) => (
                <div
                  key={mood.id}
                  className={cn(
                    "absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    mood.id === activeId ? "opacity-100" : "opacity-0",
                  )}
                  style={{ backgroundImage: `url('${mood.imageSrc}')` }}
                  aria-hidden={mood.id !== activeId}
                />
              ))}
              <div
                className="absolute inset-0 bg-linear-to-t from-dark/80 via-dark/25 to-dark/10"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-heading text-sm font-semibold tracking-wide text-highlight uppercase">
                  Suggested for you
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {activeMood.suggestions.map((name) => (
                    <li
                      key={name}
                      className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-on-dark backdrop-blur-sm"
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={140}>
            <div
              className="flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden"
              role="list"
              aria-label="Travel moods"
            >
              {destinationMoods.map((mood) => {
                const isActive = mood.id === activeId;
                return (
                  <button
                    key={mood.id}
                    type="button"
                    role="listitem"
                    onMouseEnter={() => setActiveId(mood.id)}
                    onFocus={() => setActiveId(mood.id)}
                    onClick={() => setActiveId(mood.id)}
                    aria-pressed={isActive}
                    className={cn(
                      "shrink-0 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-300",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30",
                      isActive
                        ? "border-primary bg-primary text-on-primary shadow-md"
                        : "border-border bg-background text-text hover:border-secondary/40 hover:bg-sky/50",
                    )}
                  >
                    {mood.label}
                  </button>
                );
              })}
            </div>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
              Hover a mood to preview the kind of journey you are in the mood for.
              Each category surfaces hand-picked Himalayan escapes aligned with how
              you want to travel.
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
