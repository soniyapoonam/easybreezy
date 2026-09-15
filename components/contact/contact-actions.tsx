"use client";

import { Container, Section } from "@/components/ui";
import { IconMail, IconPhone } from "@/components/layout/icons";
import { contactActions } from "@/lib/content/contact";
import { useContactInView } from "./use-contact-in-view";

function IconCompose(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      className={props.className}
      aria-hidden="true"
    >
      <path d="M4 20h4l10.5-10.5-4-4L4 16v4z" strokeLinejoin="round" />
      <path d="m13 6.5 4 4" />
    </svg>
  );
}

const icons = {
  call: IconPhone,
  email: IconMail,
  enquiry: IconCompose,
} as const;

export function ContactActions() {
  const ref = useContactInView<HTMLDivElement>();

  return (
    <Section aria-labelledby="contact-actions-heading">
      <Container>
        <div ref={ref} className="contact-in">
          <h2 id="contact-actions-heading" className="text-balance">
            {contactActions.heading}
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {contactActions.items.map((item) => {
              const Icon = icons[item.id as keyof typeof icons];
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="group flex min-h-20 items-center gap-4 border border-border bg-surface px-5 py-4 no-underline shadow-sm transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-secondary hover:shadow-md"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sky text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-on-primary">
                      <Icon className="size-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-heading text-base font-semibold text-primary">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block truncate text-small text-muted">
                        {item.hint}
                      </span>
                    </span>
                    <span
                      className="ml-auto text-secondary transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
