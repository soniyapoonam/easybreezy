import Link from "next/link";
import { Container, Section } from "@/components/ui";
import { servicesPageCta } from "@/lib/content/services-page";
import { Reveal } from "./reveal";

export function ServicesCtaSection() {
  return (
    <Section className="px-0 py-0" aria-labelledby="services-cta-heading">
      <div className="relative isolate min-h-[24rem] overflow-hidden bg-dark md:min-h-[28rem]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${servicesPageCta.imageSrc}')` }}
          role="img"
          aria-label={servicesPageCta.imageAlt}
        />
        <div
          className="absolute inset-0 bg-linear-to-r from-dark/95 via-dark/85 to-dark/55"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-linear-to-t from-dark/60 via-transparent to-transparent"
          aria-hidden="true"
        />

        <Container className="relative flex min-h-[24rem] items-center py-16 md:min-h-[28rem] md:py-20">
          <Reveal className="max-w-2xl">
            <p className="font-heading text-small font-semibold tracking-[0.16em] text-highlight uppercase">
              {servicesPageCta.eyebrow}
            </p>
            <h2
              id="services-cta-heading"
              className="mt-4 max-w-xl text-balance text-on-dark"
            >
              {servicesPageCta.heading}
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-on-dark/80 md:text-lg">
              {servicesPageCta.body}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={servicesPageCta.primaryHref} className="btn btn-primary">
                {servicesPageCta.primaryLabel}
              </Link>
              <Link
                href={servicesPageCta.secondaryHref}
                className="btn btn-outline border-white/25 bg-white/5 text-on-dark hover:bg-white/10 hover:text-on-dark"
              >
                {servicesPageCta.secondaryLabel}
              </Link>
            </div>
          </Reveal>
        </Container>
      </div>
    </Section>
  );
}
