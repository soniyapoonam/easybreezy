import Link from "next/link";
import { Container, Section } from "@/components/ui";
import { homeFinalCta } from "@/lib/content/home";

const sectionMinHeight =
  "min-h-[32rem] sm:min-h-[36rem] md:min-h-[42rem] lg:min-h-[38rem]";

export function FinalCtaSection() {
  return (
    <Section
      className="relative isolate w-full max-w-none overflow-x-clip px-0 py-0"
      aria-labelledby="home-final-cta-heading"
    >
      <div
        className={`relative w-full overflow-hidden bg-dark ${sectionMinHeight}`}
      >
        <div
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-dark"
          aria-hidden="true"
        >
          <iframe
            className="absolute top-1/2 left-1/2 h-[56.25vw] min-h-full w-full min-w-[177.78vh] max-w-none -translate-x-1/2 -translate-y-1/2 border-0"
            src="https://www.youtube-nocookie.com/embed/3U1wvyFipBA?autoplay=1&mute=1&loop=1&playlist=3U1wvyFipBA&controls=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&rel=0&showinfo=0&autohide=1&playsinline=1"
            title="Travel journey background video"
            allow="autoplay; encrypted-media"
            tabIndex={-1}
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgb(8_35_64_/_0.94)_0%,rgb(8_35_64_/_0.78)_42%,rgb(8_35_64_/_0.28)_100%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(0deg,rgb(8_35_64_/_0.55),transparent_55%)]"
          aria-hidden="true"
        />

        <Container
          className={`relative z-10 flex ${sectionMinHeight} items-center py-16 md:py-20`}
        >
          <div className="max-w-2xl text-on-dark">
            <p className="font-heading text-small font-semibold tracking-[0.16em] text-highlight uppercase">
              {homeFinalCta.eyebrow}
            </p>
            <h2
              id="home-final-cta-heading"
              className="mt-4 max-w-xl text-balance text-on-dark"
            >
              {homeFinalCta.heading}
            </h2>
            <p className="mt-4 font-heading text-xl font-semibold text-highlight md:text-2xl">
              {homeFinalCta.offer}
            </p>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-on-dark/80 md:text-lg">
              {homeFinalCta.body}
            </p>
            <Link href={homeFinalCta.ctaHref} className="btn btn-primary mt-8">
              {homeFinalCta.ctaLabel}
            </Link>
          </div>
        </Container>
      </div>
    </Section>
  );
}
