import Link from "next/link";
import { Container, Section } from "@/components/ui";
import { homeFinalCta } from "@/lib/content/home";

export function FinalCtaSection() {
  return (
    <Section className="px-0 py-0" aria-labelledby="home-final-cta-heading">
      <div className="relative isolate min-h-[28rem] overflow-hidden bg-dark md:min-h-[34rem]">
        <div
          className="pointer-events-none absolute inset-0 -z-20 overflow-hidden bg-dark"
          aria-hidden="true"
        >
          <iframe
            className="absolute left-1/2 top-1/2 h-[125%] w-[125%] -translate-x-1/2 -translate-y-1/2 border-0"
            src="https://www.youtube-nocookie.com/embed/3U1wvyFipBA?autoplay=1&mute=1&loop=1&playlist=3U1wvyFipBA&controls=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&rel=0&showinfo=0&autohide=1&playsinline=1"
            title="Travel journey background video"
            allow="autoplay; encrypted-media"
            tabIndex={-1}
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(8_35_64_/_0.94)_0%,rgb(8_35_64_/_0.78)_42%,rgb(8_35_64_/_0.28)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgb(8_35_64_/_0.55),transparent_55%)]" />

        <Container className="relative flex min-h-[28rem] items-center py-16 md:min-h-[34rem] md:py-20">
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
