import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/ui";
import { siteConfig, type SocialPlatform } from "@/lib/site";
import { IconMail, IconMapPin, IconPhone, SocialIcon } from "./icons";
import "./footer.css";

const exploreLinks = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Tour Packages", href: "/tour-packages" },
  { label: "Destinations", href: "/destinations" },
  // { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

const footerSocialIds = ["facebook", "instagram", "threads", "google"] as const;

const footerSocial: { id: SocialPlatform; label: string; href: string | null }[] =
  footerSocialIds.map((id) => {
    const match = siteConfig.social.find((item) => item.id === id);
    return {
      id,
      label: match?.label ?? id,
      href: match?.href ?? null,
    };
  });

const bottomLinks = [
  ...siteConfig.legalLinks,
  { label: "Booking", href: siteConfig.bookingHref },
] as const;

function EmailText({ email }: { email: string }) {
  const at = email.indexOf("@");
  if (at <= 0) return email;

  return (
    <>
      {email.slice(0, at + 1)}
      <wbr />
      {email.slice(at + 1)}
    </>
  );
}

function NewsletterForm() {
  return (
    <div>
      <form className="site-footer__field">
        <label htmlFor="footer-newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="footer-newsletter-email"
          type="email"
          name="email"
          placeholder="Your email"
          autoComplete="email"
        />
        <button type="button">Join</button>
      </form>
      <small>No spam — just thoughtful travel updates.</small>
    </div>
  );
}

function SocialButton({
  platform,
  label,
  href,
}: {
  platform: SocialPlatform;
  label: string;
  href: string | null;
}) {
  const icon = <SocialIcon platform={platform} className="site-footer__social-icon" />;

  if (!href) {
    return (
      <span className="site-footer__social-link" role="img" aria-label={label} title={label}>
        {icon}
      </span>
    );
  }

  const external = href.startsWith("http");

  return (
    <a
      href={href}
      className="site-footer__social-link"
      aria-label={label}
      title={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {icon}
    </a>
  );
}

function BrandLogo() {
  return (
    <Link href="/" className="site-footer__brand group">
      <span
        className="inline-flex size-[3.75rem] shrink-0 items-center justify-center rounded-sm border border-[rgba(184,147,90,0.38)] bg-[rgba(241,231,216,0.04)] sm:size-16"
        aria-hidden="true"
      >
        <span className="relative inline-flex size-10 items-center justify-center sm:size-11">
          <span className="absolute inset-x-0 top-2 h-3 -skew-x-20 rounded-full border-t-[3px] border-white" />
          <span className="absolute inset-x-1 top-5 h-3 -skew-x-20 rounded-full border-t-[3px] border-[rgba(241,231,216,0.55)]" />
          <span className="absolute inset-x-2 bottom-2 h-1.5 rounded-full bg-accent transition-transform duration-300 group-hover:scale-110" />
        </span>
      </span>
      <span>
        <b className="site-footer__name">{siteConfig.name}</b>
        <small>{siteConfig.headerEyebrow}</small>
      </span>
    </Link>
  );
}

function PaymentVisaIcon() {
  return (
    <svg viewBox="0 0 64 40" className="h-10 w-[4.25rem]" aria-hidden="true">
      <rect width="64" height="40" rx="6" fill="#ffffff" />
      <text
        x="32"
        y="25"
        textAnchor="middle"
        fill="#1A1F71"
        fontSize="12"
        fontWeight="700"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        letterSpacing="0.14em"
      >
        VISA
      </text>
    </svg>
  );
}

function PaymentMastercardIcon() {
  return (
    <svg viewBox="0 0 64 40" className="h-10 w-[4.25rem]" aria-hidden="true">
      <rect width="64" height="40" rx="6" fill="#ffffff" />
      <circle cx="25" cy="20" r="10" fill="#EB001B" />
      <circle cx="39" cy="20" r="10" fill="#F79E1B" />
      <path d="M32 12.5a10 10 0 0 1 0 15A10 10 0 0 1 32 12.5z" fill="#FF5F00" />
    </svg>
  );
}

function PaymentRuPayIcon() {
  return (
    <svg viewBox="0 0 64 40" className="h-10 w-[4.25rem]" aria-hidden="true">
      <rect width="64" height="40" rx="6" fill="#ffffff" />
      <text
        x="32"
        y="19"
        textAnchor="middle"
        fill="#097939"
        fontSize="9.5"
        fontWeight="700"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        RuPay
      </text>
      <text
        x="32"
        y="29"
        textAnchor="middle"
        fill="#1C3664"
        fontSize="6.5"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        INDIA
      </text>
    </svg>
  );
}

function PaymentUpiIcon() {
  return (
    <svg viewBox="0 0 64 40" className="h-10 w-[4.25rem]" aria-hidden="true">
      <rect width="64" height="40" rx="6" fill="#ffffff" />
      <text
        x="16"
        y="25"
        fill="#097939"
        fontSize="12"
        fontWeight="700"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        UPI
      </text>
      <path
        d="M40 16l5 4-5 4"
        stroke="#F37021"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M45 20h-8"
        stroke="#F37021"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PaymentNetBankingIcon() {
  return (
    <svg viewBox="0 0 64 40" className="h-10 w-[4.25rem]" aria-hidden="true">
      <rect width="64" height="40" rx="6" fill="#ffffff" />
      <path
        d="M12 28V16l20-6 20 6v12"
        fill="none"
        stroke="#0B63B6"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M20 28v-8h7v8M37 28v-8h7v8" fill="#0B63B6" />
      <rect x="12" y="28" width="40" height="2.5" rx="1" fill="#07549E" />
    </svg>
  );
}

const paymentIconMap: Record<string, ReactNode> = {
  visa: <PaymentVisaIcon />,
  mastercard: <PaymentMastercardIcon />,
  rupay: <PaymentRuPayIcon />,
  upi: <PaymentUpiIcon />,
  netbanking: <PaymentNetBankingIcon />,
};

function PaymentBadge({ id, label }: { id: string; label: string }) {
  return (
    <span title={label} className="site-footer__pay-badge">
      {paymentIconMap[id]}
      <span className="sr-only">{label}</span>
    </span>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const { ctaStrip } = siteConfig.footer;
  const tourPackages = siteConfig.mainNav.find((item) => item.href === "/tour-packages");

  return (
    <footer className="site-footer">
      <div className="site-footer__panel">
        <Container className="site-footer__cta">
          <div>
            <h2>{ctaStrip.heading}</h2>
            <p>{ctaStrip.description}</p>
          </div>
          <div className="site-footer__actions">
            <Link href={siteConfig.bookingHref} className="site-footer__btn site-footer__btn--main">
              {ctaStrip.ctaLabel}
            </Link>
            <Link
              href={tourPackages?.href ?? "/tour-packages"}
              className="site-footer__btn site-footer__btn--ghost"
            >
              {tourPackages?.label ?? "Tour Packages"}
            </Link>
          </div>
        </Container>

        <Container className="site-footer__road" aria-hidden="true">
          <svg viewBox="0 0 1100 28" preserveAspectRatio="none">
            <path
              d="M0 14h1100"
              stroke="#9fb6cf"
              strokeOpacity="0.45"
              strokeWidth="1"
              strokeDasharray="2 6"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <span className="site-footer__cab" />
        </Container>

        <Container className="site-footer__grid">
          <div>
            <BrandLogo />
            <p className="site-footer__about">
              Comfortable journeys, trusted drivers, and thoughtfully planned travel for every
              route ahead—where <strong>every route feels considered</strong>, not rushed.
            </p>
            <div className="site-footer__social">
              {footerSocial.map((item) => (
                <SocialButton
                  key={item.id}
                  platform={item.id}
                  label={item.label}
                  href={item.href}
                />
              ))}
            </div>
          </div>

          <nav aria-label="Explore">
            <h3>Explore</h3>
            <ul className="site-footer__links">
              {exploreLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3>Branch</h3>
            <div className="site-footer__contact">
              <div className="site-footer__contact-row">
                <IconMapPin />
                <span>
                  {siteConfig.contact.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </div>
              <div className="site-footer__contact-row">
                <IconPhone />
                <a href={siteConfig.contact.phoneHref}>{siteConfig.contact.phone}</a>
              </div>
              <div className="site-footer__contact-row">
                <IconMail />
                <a href={siteConfig.contact.emailHref}>
                  <EmailText email={siteConfig.contact.email} />
                </a>
              </div>
            </div>
          </div>

          <div className="site-footer__news">
            <h3>Stay in Touch</h3>
            <p>
              First word on new routes, seasonal packages, and travel notes from our hill-road
              desk.
            </p>
            <NewsletterForm />
          </div>
        </Container>

        {/* <div className="site-footer__pay">
          <Container className="site-footer__pay-inner">
            <p>
              <strong>Secure Payment</strong>
              Accepted methods for online booking — processed securely when you confirm your
              journey.
            </p>
            <div className="site-footer__chips">
              {siteConfig.paymentMethods.map((method) => (
                <PaymentBadge key={method.id} id={method.id} label={method.label} />
              ))}
            </div>
          </Container>
        </div> */}

        <div className="site-footer__bottom">
          <Container className="site-footer__bottom-inner">
            <p>
              © {year} {siteConfig.name}. All rights reserved.
            </p>
            <nav aria-label="Legal">
              {bottomLinks.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </Container>
        </div>
      </div>
    </footer>
  );
}
