import Link from "next/link";
import { Container } from "@/components/ui";
import { cn } from "@/components/ui/cn";
import { siteConfig, type SocialLink } from "@/lib/site";
import {
  IconMail,
  IconMapPin,
  IconPhone,
  SocialIcon,
} from "./icons";

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-sm text-on-dark/75 no-underline transition-colors hover:text-highlight"
    >
      {children}
    </Link>
  );
}

function SocialButton({ item }: { item: SocialLink }) {
  const className = cn(
    "inline-flex size-10 items-center justify-center rounded-md border border-white/15 bg-white/5 text-on-dark/90 shadow-sm transition-[transform,background-color,border-color,color] duration-200",
    item.href
      ? "hover:-translate-y-0.5 hover:border-highlight/50 hover:bg-white/10 hover:text-highlight"
      : "cursor-default opacity-70",
  );

  if (item.href) {
    return (
      <a
        href={item.href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={item.label}
      >
        <SocialIcon platform={item.id} className="size-[1.125rem]" />
      </a>
    );
  }

  return (
    <span
      className={className}
      role="img"
      aria-label={`${item.label} (link coming soon)`}
      title={`${item.label} — link coming soon`}
    >
      <SocialIcon platform={item.id} className="size-[1.125rem]" />
    </span>
  );
}

function PaymentBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex min-h-9 items-center justify-center rounded-md border border-white/12 bg-gradient-to-b from-white/10 to-white/5 px-3 font-heading text-[0.7rem] font-semibold tracking-wide text-on-dark/90 uppercase shadow-sm">
      {label}
    </span>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const { footer } = siteConfig;

  return (
    <footer className="mt-auto bg-dark text-on-dark">
      {/* CTA strip intentionally hidden for now (siteConfig.footer.showCtaStrip). */}
      {footer.showCtaStrip ? (
        <div className="relative overflow-hidden border-b border-white/10 bg-[linear-gradient(135deg,var(--color-primary)_0%,var(--color-dark)_55%,#0c2236_100%)]">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 90% 20%, color-mix(in srgb, var(--color-secondary) 45%, transparent), transparent 70%)",
            }}
          />
          <Container className="relative flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center md:py-12">
            <div className="max-w-xl">
              <p className="font-heading text-small font-semibold tracking-[0.14em] text-highlight uppercase">
                {footer.ctaStrip.eyebrow}
              </p>
              <h2 className="mt-2 text-on-dark !text-[clamp(1.5rem,1.2rem+1.2vw,2rem)]">
                {footer.ctaStrip.heading}
              </h2>
              <p className="mt-3 max-w-lg text-base leading-relaxed text-on-dark/75">
                {footer.ctaStrip.description}
              </p>
            </div>
            <Link
              href={siteConfig.bookingHref}
              className="btn btn-primary shrink-0 shadow-md"
            >
              {footer.ctaStrip.ctaLabel}
            </Link>
          </Container>
        </div>
      ) : null}

      {/* Main footer — starts the active footer experience */}
      <Container className="py-12 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_repeat(3,minmax(0,1fr))] lg:gap-8">
          <div className="max-w-sm">
            <p className="font-heading text-lg font-bold tracking-tight text-on-dark">
              {siteConfig.name}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-on-dark/70">
              {siteConfig.tagline}
            </p>
          </div>

          {siteConfig.footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="font-heading text-sm font-semibold tracking-wide text-on-dark uppercase">
                {column.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {column.links.map((item) => (
                  <li key={item.href}>
                    <FooterLink href={item.href}>{item.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact / social / secure payment */}
        <div className="mt-12 grid gap-8 rounded-xl border border-white/10 bg-white/[0.03] p-6 shadow-md md:grid-cols-2 md:p-8 xl:grid-cols-3">
          <div>
            <h3 className="font-heading text-sm font-semibold tracking-wide text-highlight uppercase">
              {footer.contactHeading}
            </h3>
            <ul className="mt-4 flex flex-col gap-3.5 text-sm text-on-dark/80">
              <li className="flex gap-3">
                <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5 text-highlight">
                  <IconMapPin className="size-4" />
                </span>
                <span>
                  {siteConfig.contact.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </li>
              <li>
                <a
                  href={siteConfig.contact.phoneHref}
                  className="inline-flex items-center gap-3 text-on-dark/80 no-underline transition-colors hover:text-highlight"
                >
                  <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5 text-highlight">
                    <IconPhone className="size-4" />
                  </span>
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.contact.emailHref}
                  className="inline-flex items-start gap-3 text-on-dark/80 no-underline transition-colors hover:text-highlight"
                >
                  <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5 text-highlight">
                    <IconMail className="size-4" />
                  </span>
                  <span className="break-all">{siteConfig.contact.email}</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold tracking-wide text-highlight uppercase">
              {footer.socialHeading}
            </h3>
            <p className="mt-2 text-sm text-on-dark/65">
              {footer.socialDescription}
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {siteConfig.social.map((item) => (
                <SocialButton key={item.id} item={item} />
              ))}
            </div>
          </div>

          <div className="md:col-span-2 xl:col-span-1">
            <h3 className="font-heading text-sm font-semibold tracking-wide text-highlight uppercase">
              {footer.paymentHeading}
            </h3>
            <p className="mt-2 text-sm text-on-dark/65">
              {footer.paymentDescription}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {siteConfig.paymentMethods.map((method) => (
                <PaymentBadge key={method.id} label={method.label} />
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom bar — same .container-page width shell as the main Footer */}
      <div className="border-t border-white/10">
        <Container className="py-5">
          <div className="flex w-full min-w-0 flex-col gap-3 text-sm text-on-dark/60 sm:flex-row sm:items-center sm:justify-between">
            <p className="min-w-0">
              © {year} {siteConfig.name}. All rights reserved.
            </p>
            <ul className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2">
              {siteConfig.legalLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-on-dark/60 no-underline transition-colors hover:text-on-dark"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={siteConfig.bookingHref}
                  className="text-on-dark/60 no-underline transition-colors hover:text-on-dark"
                >
                  {siteConfig.bookingCtaLabel}
                </Link>
              </li>
            </ul>
          </div>
        </Container>
      </div>
    </footer>
  );
}
