import { Container, Section } from "@/components/ui";
import { cn } from "@/components/ui/cn";
import { servicesTogetherSection } from "@/lib/content/services-page";
import { Reveal } from "./reveal";

export function ServicesTogetherSection() {
  const { flow } = servicesTogetherSection;

  return (
    <Section
      aria-labelledby="services-together-heading"
      className="relative overflow-hidden bg-surface"
    >
      <div
        className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-sky/50 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-primary/5 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-[1.25rem] border border-border/60 shadow-md">
              <img
                src={servicesTogetherSection.imageSrc}
                alt={servicesTogetherSection.imageAlt}
                className="aspect-[4/3] w-full object-cover object-center"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-linear-to-t from-dark/25 via-transparent to-transparent"
                aria-hidden="true"
              />
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={100}>
            <p className="font-heading text-small font-semibold tracking-wide text-secondary uppercase">
              {servicesTogetherSection.eyebrow}
            </p>
            <h2
              id="services-together-heading"
              className="mt-3 max-w-xl text-balance"
            >
              {servicesTogetherSection.heading}
            </h2>
            <span
              className="mt-4 block h-[3px] w-14 bg-highlight"
              aria-hidden="true"
            />
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {servicesTogetherSection.description}
            </p>

            <div className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-5 lg:mt-12 lg:gap-6">
              {flow.map((step, index) => (
                <div key={step.id} className="relative">
                  {index > 0 ? (
                    <span
                      className="pointer-events-none absolute -top-4 left-1/2 hidden -translate-x-1/2 text-secondary/30 sm:top-5 sm:-left-3 sm:block sm:translate-x-0"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  ) : null}
                  <div
                    className={cn(
                      "rounded-2xl border border-border/70 bg-background/60 p-5 transition-[border-color,box-shadow] duration-300 hover:border-secondary/20 hover:shadow-sm",
                      index > 0 && "sm:mt-0",
                    )}
                  >
                    <span
                      className="inline-flex size-9 items-center justify-center rounded-full bg-sky font-heading text-sm font-bold text-secondary"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 font-semibold text-primary">
                      {step.label}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
