import Link from "next/link";
import { Container, Section } from "@/components/ui";
import { homeFinalCta } from "@/lib/content/home";

export function FinalCtaSection() {
  return (
    <Section className="border-t border-border bg-surface" aria-labelledby="home-final-cta-heading">
      <Container>
        <div className="mx-auto max-w-3xl rounded-xl border border-border bg-linear-to-br from-sky/80 to-surface px-6 py-10 text-center shadow-md md:px-12 md:py-14">
          <h2 id="home-final-cta-heading" className="text-balance">
            {homeFinalCta.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted">
            {homeFinalCta.body}
          </p>
          <Link
            href={homeFinalCta.ctaHref}
            className="btn btn-primary mt-8"
          >
            {homeFinalCta.ctaLabel}
          </Link>
        </div>
      </Container>
    </Section>
  );
}
