import {
  IconCalendarCheck,
  IconCarComfort,
  IconShieldCheck,
  IconSupport,
} from "@/components/layout/icons";
import { Container, Section } from "@/components/ui";
import { homeTrustItems } from "@/lib/content/home";

const trustIcons = {
  "Reliable Travel": IconShieldCheck,
  "Comfortable Journeys": IconCarComfort,
  "Professional Service": IconSupport,
  "Easy Booking": IconCalendarCheck,
} as const;

export function TrustStrip() {
  return (
    <Section
      className="border-border bg-surface py-8 md:py-10"
      aria-label="Why travellers choose Easy Breezy Travels"
    >
      <Container>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {homeTrustItems.map((item) => {
            const Icon = trustIcons[item.title as keyof typeof trustIcons];

            return (
              <li
                key={item.title}
                className="flex items-start gap-3 border-l-2 border-highlight pl-4"
              >
                <div className="mt-0.5 inline-flex size-11 shrink-0 items-center justify-center rounded-[8px] bg-accent text-on-accent">
                  <Icon className="size-5" />
                </div>
                <div>
                  <p className="font-heading text-sm font-semibold text-primary">
                    {item.title}
                  </p>
                  <p className="mt-1 text-small leading-relaxed text-muted">
                    {item.text}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
