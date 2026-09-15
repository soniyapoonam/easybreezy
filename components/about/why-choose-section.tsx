import { Container, Section } from "@/components/ui";
import { IconMapPin, IconPhone } from "@/components/layout/icons";
import { aboutWhyChoose } from "@/lib/content/about";
import type { SVGProps } from "react";

function IconCompass(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m14.5 9.5-1.2 3.8-3.8 1.2 1.2-3.8z" />
    </svg>
  );
}

const itemIcons = {
  experience: IconCompass,
  destination: IconMapPin,
  support: IconPhone,
} as const;

export function AboutWhyChooseSection() {
  return (
    <Section className="px-0 py-0" aria-labelledby="about-why-heading">
      <div className="relative overflow-hidden bg-dark py-24 pb-44 md:py-28 md:pb-52">
        <div
          className="absolute inset-0 bg-cover bg-center md:bg-fixed"
          style={{ backgroundImage: `url('${aboutWhyChoose.imageSrc}')` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-dark/55" aria-hidden="true" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-heading text-small font-semibold tracking-wide text-highlight uppercase">
              {aboutWhyChoose.eyebrow}
            </p>
            <h2
              id="about-why-heading"
              className="mt-3 text-balance text-on-dark"
            >
              {aboutWhyChoose.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-on-dark/85 sm:text-lg">
              {aboutWhyChoose.description}
            </p>
          </div>
        </Container>
      </div>

      <Container className="relative z-10 -mt-28 pb-16 md:-mt-36 md:pb-20">
        <ul className="grid gap-5 md:grid-cols-3 md:gap-6">
          {aboutWhyChoose.items.map((item) => {
            const Icon = itemIcons[item.id];
            return (
              <li
                key={item.id}
                className="bg-surface px-8 py-9 shadow-[0_3px_15px_rgba(0,0,0,0.1)] md:px-11"
              >
                <Icon className="size-10 text-primary" />
                <h3 className="mt-5 font-heading text-lg font-semibold text-primary">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                  {item.text}
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
