"use client";

import { Container, Section } from "@/components/ui";
import { IconMail, IconMapPin, IconPhone } from "@/components/layout/icons";
import { contactDetails } from "@/lib/content/contact";
import { siteConfig } from "@/lib/site";
import { useContactInView } from "./use-contact-in-view";

function IconClock(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      className={props.className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4.5l2.5 1.5" strokeLinecap="round" />
    </svg>
  );
}

const rows = [
  {
    id: "phone",
    label: "Phone",
    value: siteConfig.contact.phone,
    href: siteConfig.contact.phoneHref,
    icon: IconPhone,
  },
  {
    id: "email",
    label: "Email",
    value: siteConfig.contact.email,
    href: siteConfig.contact.emailHref,
    icon: IconMail,
  },
  {
    id: "address",
    label: "Address",
    value: siteConfig.contact.addressLines.join(" "),
    href: null,
    icon: IconMapPin,
  },
  {
    id: "hours",
    label: contactDetails.hoursLabel,
    value: contactDetails.hoursValue,
    href: null,
    icon: IconClock,
  },
] as const;

export function ContactDetails() {
  const ref = useContactInView<HTMLDivElement>();

  return (
    <Section aria-labelledby="contact-details-heading">
      <Container>
        <div ref={ref} className="contact-in">
          <p className="font-heading text-small font-semibold tracking-[0.14em] text-secondary uppercase">
            Direct line
          </p>
          <h2 id="contact-details-heading" className="mt-3">
            {contactDetails.heading}
          </h2>
          <p className="mt-3 max-w-xl text-base text-muted">{contactDetails.body}</p>

          <ul className="relative mt-12 max-w-3xl">
            <span
              className="absolute top-3 bottom-3 left-[0.85rem] w-px bg-border md:left-[1.05rem]"
              aria-hidden="true"
            />
            {rows.map((row) => {
              const Icon = row.icon;
              const content = (
                <>
                  <span className="relative z-10 grid size-7 place-items-center bg-background text-secondary md:size-9">
                    <span className="grid size-7 place-items-center rounded-full border border-border bg-surface text-primary shadow-sm transition-colors group-hover:border-secondary group-hover:text-secondary md:size-8">
                      <Icon className="size-3.5" />
                    </span>
                  </span>
                  <span className="min-w-0 flex-1 border-b border-transparent py-4 pl-3 transition-colors group-hover:border-border md:pl-5">
                    <span className="block font-heading text-xs tracking-[0.14em] text-muted uppercase">
                      {row.label}
                    </span>
                    <span className="mt-1 block font-heading text-base font-semibold text-primary md:text-lg">
                      {row.value}
                    </span>
                  </span>
                </>
              );

              return (
                <li key={row.id}>
                  {row.href ? (
                    <a
                      href={row.href}
                      className="group flex items-start no-underline"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="group flex items-start">{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
