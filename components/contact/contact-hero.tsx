"use client";

import Link from "next/link";
import { Container } from "@/components/ui";
import { contactHero, contactHeroImage } from "@/lib/content/contact";

export function ContactHero() {
  return (
    <section
      className="relative isolate min-h-[32rem] overflow-hidden bg-dark md:min-h-[38rem] lg:min-h-[42rem]"
      aria-labelledby="contact-hero-heading"
    >
      <div
        className="contact-kenburns absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${contactHeroImage.src}')` }}
        role="img"
        aria-label={contactHeroImage.alt}
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(105deg,rgb(16_45_80_/_0.88)_0%,rgb(16_45_80_/_0.55)_46%,rgb(16_45_80_/_0.22)_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_70%_40%,rgb(255_90_82_/_0.18),transparent_54%)] lg:block"
        aria-hidden="true"
      />

      <svg
        className="pointer-events-none absolute inset-x-[8%] bottom-[18%] hidden h-28 w-[84%] text-highlight/80 md:block"
        viewBox="0 0 800 80"
        fill="none"
        aria-hidden="true"
      >
        <path
          className="contact-route"
          d="M8 52C92 52 118 18 198 18c92 0 108 46 198 46s118-44 206-44 118 40 182 40"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle className="contact-pulse" cx="8" cy="52" r="4" fill="currentColor" />
        <circle className="contact-pulse" cx="396" cy="64" r="4" fill="currentColor" />
        <circle className="contact-pulse" cx="792" cy="60" r="4" fill="currentColor" />
      </svg>

      <div
        className="contact-float pointer-events-none absolute right-[12%] top-[22%] hidden size-24 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm md:block"
        aria-hidden="true"
      />
      <div
        className="contact-float-slow pointer-events-none absolute right-[22%] top-[48%] hidden size-16 rounded-full border border-highlight/30 bg-highlight/10 md:block"
        aria-hidden="true"
      />

      <Container className="relative flex min-h-[32rem] flex-col justify-end py-14 md:min-h-[38rem] md:justify-center md:py-16 lg:min-h-[42rem]">
        <nav aria-label="Breadcrumb" className="contact-reveal">
          <ol className="flex flex-wrap items-center gap-2 text-small text-on-dark/80">
            <li>
              <Link href="/" className="text-on-dark/80 no-underline hover:text-highlight">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-on-dark" aria-current="page">
              Contact
            </li>
          </ol>
        </nav>
        <p className="contact-reveal contact-reveal-delay-1 mt-6 font-heading text-small font-semibold tracking-[0.18em] text-highlight uppercase">
          {contactHero.eyebrow}
        </p>
        <h1
          id="contact-hero-heading"
          className="contact-reveal contact-reveal-delay-2 mt-3 max-w-3xl text-balance text-on-dark"
        >
          {contactHero.heading}
        </h1>
        <p className="contact-reveal contact-reveal-delay-3 mt-5 max-w-xl text-base leading-relaxed text-on-dark/85 sm:text-lg">
          {contactHero.body}
        </p>
        <p
          className="contact-scroll-cue mt-10 hidden font-heading text-xs tracking-[0.16em] text-on-dark/70 uppercase md:block"
          aria-hidden="true"
        >
          Scroll to plan
        </p>
      </Container>
    </section>
  );
}
