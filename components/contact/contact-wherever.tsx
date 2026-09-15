"use client";

import { contactWherever } from "@/lib/content/contact";
import { useContactInView } from "./use-contact-in-view";

export function ContactWherever() {
  const ref = useContactInView<HTMLElement>();

  return (
    <section
      ref={ref}
      className="contact-in relative isolate min-h-[28rem] overflow-hidden bg-dark md:min-h-[36rem]"
      aria-labelledby="contact-wherever-heading"
    >
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center"
        style={{ backgroundImage: `url('${contactWherever.imageSrc}')` }}
        role="img"
        aria-label={contactWherever.imageAlt}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(16_45_80_/_0.82)_0%,rgb(16_45_80_/_0.35)_55%,rgb(16_45_80_/_0.2)_100%)]" />

      {contactWherever.pins.map((pin, index) => (
        <span
          key={pin.id}
          className={`contact-float pointer-events-none absolute hidden rounded-full border border-white/25 bg-dark/50 px-3 py-1.5 text-xs font-medium tracking-wide text-on-dark backdrop-blur-sm md:inline-flex ${index % 2 === 0 ? "" : "contact-float-slow"}`}
          style={{ left: pin.x, top: pin.y }}
        >
          <span className="contact-pulse mr-2 size-1.5 rounded-full bg-highlight" />
          {pin.label}
        </span>
      ))}

      <div className="relative mx-auto flex min-h-[28rem] max-w-[84em] flex-col justify-end px-[var(--container-padding)] py-16 md:min-h-[36rem] md:justify-center">
        <p className="font-heading text-small font-semibold tracking-[0.16em] text-highlight uppercase">
          From the travel desk
        </p>
        <h2 id="contact-wherever-heading" className="mt-3 max-w-xl text-on-dark">
          {contactWherever.heading}
        </h2>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-on-dark/85 md:text-lg">
          {contactWherever.body}
        </p>
        <ul className="mt-8 flex flex-wrap gap-2 md:hidden">
          {contactWherever.pins.map((pin) => (
            <li
              key={pin.id}
              className="rounded-full border border-white/20 px-3 py-1 text-xs text-on-dark"
            >
              {pin.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
