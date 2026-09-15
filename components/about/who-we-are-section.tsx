import { Container, Section } from "@/components/ui";
import { aboutWhoWeAre } from "@/lib/content/about";

export function WhoWeAreSection() {
  return (
    <Section
      id="who-we-are"
      className="scroll-mt-28 bg-background lg:[background-image:linear-gradient(90deg,var(--color-background)_55%,var(--color-surface)_55%)]"
      aria-labelledby="about-who-heading"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
          <div>
            <h2 id="about-who-heading" className="text-balance">
              {aboutWhoWeAre.heading}
            </h2>
            <span
              className="mt-4 block h-[3px] w-16 bg-highlight"
              aria-hidden="true"
            />
            <div className="mt-5 space-y-4 text-base leading-relaxed text-muted sm:text-lg">
              {aboutWhoWeAre.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {aboutWhoWeAre.cards.map((card) => (
              <article
                key={card.title}
                className="bg-[#FFC750] px-8 py-10"
              >
                <h3 className="font-heading text-lg font-semibold text-primary">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                  {card.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
