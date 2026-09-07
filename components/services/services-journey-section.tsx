import { Container, Section, SectionHeading } from "@/components/ui";
import { servicesJourney } from "@/lib/content/services-page";
import { Reveal } from "./reveal";

export function ServicesJourneySection() {
  return (
    <Section
      aria-labelledby="services-journey-heading"
      className="relative overflow-hidden bg-dark text-on-dark"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgb(255 90 82 / 0.15), transparent 45%), radial-gradient(circle at 80% 80%, rgb(7 84 158 / 0.25), transparent 50%)",
        }}
      />

      <Container className="relative">
        <Reveal>
          <SectionHeading
            id="services-journey-heading"
            eyebrow={servicesJourney.eyebrow}
            heading={servicesJourney.heading}
            description={servicesJourney.description}
            className="[&_h2]:text-on-dark [&_p]:text-on-dark/75"
          />
        </Reveal>

        <div className="relative mt-14 lg:mt-16">
          <div
            className="absolute left-4 top-8 hidden h-[calc(100%-4rem)] w-px bg-linear-to-b from-highlight via-secondary/50 to-transparent lg:left-1/2 lg:block lg:-translate-x-1/2"
            aria-hidden="true"
          />

          <ol className="grid gap-8 lg:grid-cols-3 lg:gap-6">
            {servicesJourney.steps.map((step, index) => (
              <Reveal key={step.id} delay={index * 100}>
                <li
                  className="relative rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-[transform,background-color,border-color] duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 motion-reduce:transform-none sm:p-8"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-accent font-heading text-sm font-bold text-on-accent"
                    >
                      {index + 1}
                    </span>
                    <span
                      className="hidden h-px flex-1 bg-white/15 lg:block"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-6 text-on-dark">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-on-dark/75 sm:text-base">
                    {step.text}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
