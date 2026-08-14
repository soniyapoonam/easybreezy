import { Container, Section } from "@/components/ui";
import { homeTrustItems } from "@/lib/content/home";

export function TrustStrip() {
  return (
    <Section
      className="border-b border-border bg-surface py-8 md:py-10"
      aria-label="Why travellers choose Easy Breezy Travels"
    >
      <Container>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {homeTrustItems.map((item) => (
            <li
              key={item.title}
              className="border-l-2 border-highlight pl-4"
            >
              <p className="font-heading text-sm font-semibold text-primary">
                {item.title}
              </p>
              <p className="mt-1 text-small leading-relaxed text-muted">
                {item.text}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
