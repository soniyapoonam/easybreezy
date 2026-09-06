import { Container, Section, SectionHeading } from "@/components/ui";
import { homeWhyChoose } from "@/lib/content/home";
import { VisualPanel } from "./visual-panel";

export function WhyChooseSection() {
  return (
    <Section aria-labelledby="home-why-heading">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-14">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              id="home-why-heading"
              eyebrow={homeWhyChoose.eyebrow}
              heading={homeWhyChoose.heading}
              description={homeWhyChoose.description}
            />
            <VisualPanel
              label={homeWhyChoose.visualAlt}
              tone={homeWhyChoose.tone}
              className="mt-8 hidden min-h-64 rounded-xl lg:block"
            />
          </div>
          <ol className="grid gap-4 sm:grid-cols-2">
            {homeWhyChoose.points.map((point, index) => (
              <li
                key={point.title}
                className="rounded-lg border border-border bg-surface p-5 shadow-sm"
              >
                <p className="font-heading text-small font-semibold tracking-wide text-highlight">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-heading text-base font-semibold text-primary">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {point.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
