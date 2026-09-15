import Link from "next/link";
import { Container, Section, SectionHeading } from "@/components/ui";
import { homeServicesArrange } from "@/lib/content/home";
import { Reveal } from "@/components/services/reveal";

export function ServicesSection() {
  return (
    <Section
      aria-labelledby="home-services-heading"
      className="relative overflow-hidden bg-surface"
    >
      <div
        className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-sky/80 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-primary/5 blur-3xl"
        aria-hidden="true"
      />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-6">
            <SectionHeading
              id="home-services-heading"
              eyebrow={homeServicesArrange.eyebrow}
              heading={homeServicesArrange.heading}
              description={homeServicesArrange.description}
            />
            <ul className="mt-8 space-y-3">
              {homeServicesArrange.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-relaxed text-text sm:text-base"
                >
                  <span
                    className="mt-2 size-2 shrink-0 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link href={homeServicesArrange.ctaHref} className="btn btn-secondary mt-8">
              {homeServicesArrange.ctaLabel}
            </Link>
          </Reveal>

          <Reveal className="lg:col-span-6" delay={120}>
            <div className="relative">
              <div
                className="absolute -inset-3 rounded-[2rem] bg-linear-to-br from-primary/10 via-transparent to-secondary/10"
                aria-hidden="true"
              />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-border/80 shadow-lg">
                <div
                  className="aspect-[4/3] bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03] motion-reduce:transform-none"
                  style={{
                    backgroundImage: `url('${homeServicesArrange.imageSrc}')`,
                  }}
                  role="img"
                  aria-label={homeServicesArrange.imageAlt}
                />
                <div
                  className="absolute inset-0 bg-linear-to-t from-dark/50 via-dark/10 to-transparent"
                  aria-hidden="true"
                />
                <div
                  className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md"
                >
                  <p className="font-heading text-sm font-semibold text-on-dark">
                    {homeServicesArrange.imageCaptionTitle}
                  </p>
                  <p className="mt-1 text-sm text-on-dark/80">
                    {homeServicesArrange.imageCaptionBody}
                  </p>
                </div>
              </div>

              <svg
                className="pointer-events-none absolute -bottom-6 -left-6 hidden h-24 w-24 text-secondary/20 lg:block"
                viewBox="0 0 100 100"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M10 80 C 30 40, 50 60, 90 20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />
                <circle cx="10" cy="80" r="4" fill="currentColor" />
                <circle cx="90" cy="20" r="4" fill="currentColor" />
              </svg>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
