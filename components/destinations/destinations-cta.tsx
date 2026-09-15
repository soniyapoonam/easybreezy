import Link from "next/link";
import { Container, Section } from "@/components/ui";
import { destinationsPageCta } from "@/lib/content/destinations-page";
import { Reveal } from "@/components/services/reveal";

export function DestinationsCta() {
  return (
    <Section className="px-0 py-0" aria-labelledby="destinations-cta-heading">
      <div className="relative isolate min-h-[26rem] overflow-hidden bg-dark md:min-h-[32rem]">
        <div
          className="destinations-kenburns absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${destinationsPageCta.imageSrc}')` }}
          role="img"
          aria-label={destinationsPageCta.imageAlt}
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(105deg,rgb(8_35_64_/_0.92)_0%,rgb(8_35_64_/_0.72)_45%,rgb(8_35_64_/_0.35)_100%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(0deg,rgb(8_35_64_/_0.5),transparent_55%)]"
          aria-hidden="true"
        />

        <Container className="relative flex min-h-[26rem] items-center py-16 md:min-h-[32rem] md:py-20">
          <Reveal className="max-w-2xl text-on-dark">
            <h2 id="destinations-cta-heading" className="text-balance text-on-dark">
              {destinationsPageCta.heading}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-on-dark/85 md:text-lg">
              {destinationsPageCta.body}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={destinationsPageCta.primaryHref} className="btn btn-primary">
                {destinationsPageCta.primaryLabel}
              </Link>
              <Link href={destinationsPageCta.secondaryHref} className="btn btn-outline border-white/30 text-on-dark hover:bg-white/10 hover:text-on-dark">
                {destinationsPageCta.secondaryLabel}
              </Link>
            </div>
          </Reveal>
        </Container>
      </div>
    </Section>
  );
}
