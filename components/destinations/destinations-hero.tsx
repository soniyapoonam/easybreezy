import Link from "next/link";
import { Container } from "@/components/ui";
import { destinationsPageHero } from "@/lib/content/destinations-page";

export function DestinationsHero() {
  return (
    <section
      className="relative isolate min-h-[36rem] overflow-hidden bg-dark md:min-h-[42rem] lg:min-h-[48rem]"
      aria-labelledby="destinations-hero-heading"
    >
      <div
        className="destinations-kenburns absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${destinationsPageHero.imageSrc}')` }}
        role="img"
        aria-label={destinationsPageHero.imageAlt}
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(115deg,rgb(16_45_80_/_0.92)_0%,rgb(16_45_80_/_0.62)_42%,rgb(16_45_80_/_0.28)_100%)]"
        aria-hidden="true"
      />
      <div
        className="destinations-gradient-shift pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_38%,rgb(255_90_82_/_0.16),transparent_52%)]"
        aria-hidden="true"
      />

      <svg
        className="pointer-events-none absolute inset-x-[6%] bottom-[22%] hidden h-32 w-[88%] text-highlight/70 md:block"
        viewBox="0 0 900 90"
        fill="none"
        aria-hidden="true"
      >
        <path
          className="destinations-route"
          d="M12 58C108 58 142 22 228 22c98 0 118 52 214 52s132-48 228-48 108 44 206 44"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle className="destinations-pulse" cx="12" cy="58" r="4" fill="currentColor" />
        <circle className="destinations-pulse" cx="442" cy="74" r="4" fill="currentColor" />
        <circle className="destinations-pulse" cx="888" cy="70" r="4" fill="currentColor" />
      </svg>

      <div
        className="destinations-float pointer-events-none absolute right-[10%] top-[20%] hidden size-20 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm md:block"
        aria-hidden="true"
      />
      <div
        className="destinations-float-slow pointer-events-none absolute right-[20%] top-[46%] hidden size-14 rounded-full border border-highlight/30 bg-highlight/10 md:block"
        aria-hidden="true"
      />

      <div
        className="destinations-float absolute bottom-[28%] left-[8%] hidden rounded-2xl border border-white/15 bg-white/10 p-4 shadow-lg backdrop-blur-md md:block"
        aria-hidden="true"
      >
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-highlight/20 text-highlight">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
            </svg>
          </span>
          <div>
            <p className="font-heading text-sm font-semibold text-on-dark">
              {destinationsPageHero.floatingCard.label}
            </p>
            <p className="text-xs text-on-dark/75">
              {destinationsPageHero.floatingCard.sublabel}
            </p>
          </div>
        </div>
      </div>

      <Container className="relative flex min-h-[36rem] flex-col justify-end py-14 md:min-h-[42rem] md:justify-center md:py-20 lg:min-h-[48rem]">
        <nav aria-label="Breadcrumb" className="destinations-reveal">
          <ol className="flex flex-wrap items-center gap-2 text-small text-on-dark/80">
            <li>
              <Link href="/" className="text-on-dark/80 no-underline hover:text-highlight">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-on-dark" aria-current="page">
              Destinations
            </li>
          </ol>
        </nav>
        <p className="destinations-reveal destinations-reveal-delay-1 mt-6 font-heading text-small font-semibold tracking-[0.18em] text-highlight uppercase">
          {destinationsPageHero.eyebrow}
        </p>
        <h1
          id="destinations-hero-heading"
          className="destinations-reveal destinations-reveal-delay-2 mt-3 max-w-4xl text-balance text-on-dark"
        >
          {destinationsPageHero.heading}
        </h1>
        <p className="destinations-reveal destinations-reveal-delay-3 mt-5 max-w-xl text-base leading-relaxed text-on-dark/85 sm:text-lg">
          {destinationsPageHero.body}
        </p>
      </Container>
    </section>
  );
}
