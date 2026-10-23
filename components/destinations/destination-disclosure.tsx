"use client";

import { useId, useState } from "react";
import { IconClose, IconPlus } from "@/components/layout/icons";
import { cn } from "@/components/ui/cn";

export type ItineraryDay = {
  label: string;
  title: string;
  points: readonly string[];
};

export function DestinationItinerary({ days }: { days: readonly ItineraryDay[] }) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="mt-6 space-y-3">
      {days.map((day, index) => {
        const open = openIndex === index;
        const panelId = `${baseId}-day-${index}`;
        const buttonId = `${panelId}-button`;

        return (
          <div
            key={day.label}
            className={cn(
              "rounded-[var(--radius-lg)] border border-border",
              open ? "bg-sky/70" : "bg-surface",
            )}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? -1 : index)}
              >
                <span className="inline-flex shrink-0 rounded-full bg-primary px-2.5 py-1 font-heading text-xs font-semibold text-on-primary">
                  {day.label}
                </span>
                <span className="min-w-0 flex-1 font-heading text-base font-semibold text-primary">
                  {day.title}
                </span>
                {open ? (
                  <IconClose className="size-4 shrink-0 text-primary" />
                ) : (
                  <IconPlus className="size-4 shrink-0 text-primary" />
                )}
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <ul className="list-disc space-y-1.5 px-8 pb-4 text-sm leading-relaxed text-text marker:text-primary sm:px-12">
                  {day.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export type FaqItem = {
  question: string;
  answer: string;
};

export function DestinationFaqs({ items }: { items: readonly FaqItem[] }) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <div className="mt-4 border-t border-border">
      {items.map((item, index) => {
        const open = openIndex === index;
        const panelId = `${baseId}-faq-${index}`;
        const buttonId = `${panelId}-button`;

        return (
          <div key={item.question} className="border-b border-border">
            <h3>
              <button
                id={buttonId}
                type="button"
                className="flex w-full items-center justify-between gap-4 py-4 text-left"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? -1 : index)}
              >
                <span className="font-heading text-base font-semibold text-primary">
                  {item.question}
                </span>
                {open ? (
                  <IconClose className="size-4 shrink-0 text-muted" />
                ) : (
                  <IconPlus className="size-4 shrink-0 text-muted" />
                )}
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pb-4 pr-8 text-sm leading-relaxed text-text md:text-base">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
