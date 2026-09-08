import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/ui";
import { siteConfig, type SocialPlatform } from "@/lib/site";
import { IconMail, IconPhone, SocialIcon } from "./icons";

const FOOTER_BG =
  "radial-gradient(circle at 12% 0%, rgba(122, 46, 34, 0.18), transparent 45%), radial-gradient(circle at 88% 100%, rgba(184, 147, 90, 0.10), transparent 40%), #171310";

const FOOTER_ACCENT = "#B8935A";
const FOOTER_BORDER = "rgba(241,231,216,0.12)";
const FOOTER_TEXT = "rgba(241,231,216,0.72)";
const FOOTER_TEXT_MUTED = "rgba(241,231,216,0.52)";

const footerContact = {
  addressLines: ["123 Travel Street,", "Shimla, Himachal Pradesh"],
  email: "info@exampletravel.com",
  emailHref: "mailto:info@exampletravel.com",
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
} as const;

const exploreLinks = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Tour Packages", href: "/tour-packages" },
  { label: "Destinations", href: "/destinations" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

const footerSocial: { id: SocialPlatform; label: string }[] = [
  { id: "facebook", label: "Facebook" },
  { id: "instagram", label: "Instagram" },
  { id: "threads", label: "Threads" },
  { id: "google", label: "Google" },
];

const paymentMethods = [
  { id: "visa", label: "Visa" },
  { id: "mastercard", label: "Mastercard" },
  { id: "rupay", label: "RuPay" },
  { id: "upi", label: "UPI" },
  { id: "netbanking", label: "Net Banking" },
] as const;

function FooterHeading({ children }: { children: ReactNode }) {
  return (
    <div className="w-full">
      <h3
        className="font-heading text-[1.0625rem] font-semibold tracking-normal"
        style={{ color: FOOTER_ACCENT }}
      >
        {children}
      </h3>
      <span
        className="mt-3 block h-px w-full"
        style={{ backgroundColor: FOOTER_BORDER }}
        aria-hidden="true"
      />
    </div>
  );
}

function NewsletterForm() {
  return (
    <div className="mt-5 w-full">
      <form
        className="flex w-full min-w-0 flex-col gap-2.5 sm:flex-row sm:items-stretch"
      >
        <label htmlFor="footer-newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="footer-newsletter-email"
          type="email"
          name="email"
          placeholder="Your email"
          autoComplete="email"
          className="min-w-0 flex-1 rounded-md border bg-[rgba(0,0,0,0.22)] px-4 py-3 text-sm outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-[rgba(241,231,216,0.38)] focus:border-[rgba(184,147,90,0.45)] focus:shadow-[0_0_0_1px_rgba(184,147,90,0.2)]"
          style={{
            borderColor: FOOTER_BORDER,
            color: "rgba(241,231,216,0.88)",
          }}
        />
        <button
          type="button"
          className="shrink-0 rounded-md px-6 py-3 font-heading text-sm font-semibold text-[rgba(241,231,216,0.95)] transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:brightness-110 motion-reduce:transform-none sm:px-7"
          style={{ backgroundColor: "#7A3A2E" }}
        >
          Join
        </button>
      </form>
      <p
        className="mt-3 text-xs leading-relaxed"
        style={{ color: FOOTER_TEXT_MUTED }}
      >
        No spam — just thoughtful travel updates.
      </p>
    </div>
  );
}

function FooterNavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center text-[0.9375rem] leading-relaxed no-underline transition-[color,transform] duration-300 hover:translate-x-0.5 motion-reduce:transform-none"
      style={{ color: FOOTER_TEXT }}
    >
      <span
        className="transition-colors duration-300 group-hover:text-[#B8935A]"
      >
        {children}
      </span>
    </Link>
  );
}

function SocialButton({
  platform,
  label,
}: {
  platform: SocialPlatform;
  label: string;
}) {
  return (
    <a
      href="#"
      aria-label={label}
      title={label}
      className="inline-flex size-9 items-center justify-center rounded-full border border-[rgba(241,231,216,0.12)] bg-[rgba(241,231,216,0.12)] text-[rgba(241,231,216,0.88)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-105 hover:border-[rgba(184,147,90,0.55)] hover:bg-[rgba(184,147,90,0.14)] hover:text-[#B8935A] motion-reduce:transform-none"
    >
      <SocialIcon platform={platform} className="size-[1.05rem]" />
    </a>
  );
}

function BrandLogo() {
  return (
    <Link href="/" className="group inline-flex items-start gap-4 no-underline">
      <span
        className="inline-flex size-[3.75rem] shrink-0 items-center justify-center rounded-sm border transition-colors duration-300 sm:size-16"
        style={{
          borderColor: "rgba(184, 147, 90, 0.38)",
          backgroundColor: "rgba(241, 231, 216, 0.04)",
        }}
        aria-hidden="true"
      >
        <span className="relative inline-flex size-10 items-center justify-center sm:size-11">
          <span
            className="absolute inset-x-0 top-2 h-3 -skew-x-20 rounded-full border-t-[3px] transition-colors duration-300 group-hover:border-[#B8935A]"
            style={{ borderColor: "rgba(184, 147, 90, 0.75)" }}
          />
          <span
            className="absolute inset-x-1 top-5 h-3 -skew-x-20 rounded-full border-t-[3px] transition-colors duration-300"
            style={{ borderColor: "rgba(241, 231, 216, 0.55)" }}
          />
          <span
            className="absolute inset-x-2 bottom-2 h-1.5 rounded-full transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: FOOTER_ACCENT }}
          />
        </span>
      </span>
      <span className="min-w-0 pt-0.5">
        <span
          className="block font-heading text-base font-bold tracking-[0.03em] transition-colors duration-300 group-hover:text-[#B8935A] sm:text-lg"
          style={{ color: FOOTER_ACCENT }}
        >
          Easy Breezy Travels
        </span>
        <span
          className="mt-1 block font-heading text-[0.65rem] font-semibold tracking-[0.2em] uppercase sm:text-[0.7rem]"
          style={{ color: FOOTER_TEXT_MUTED }}
        >
          {siteConfig.headerEyebrow}
        </span>
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
    <span
      title={label}
      className="inline-flex overflow-hidden rounded-md border shadow-[0_4px_14px_rgba(0,0,0,0.22)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.28)] motion-reduce:transform-none"
      style={{ borderColor: "rgba(255,255,255,0.14)" }}
    >
      {paymentIconMap[id]}
      <span className="sr-only">{label}</span>
    </span>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative mt-auto overflow-hidden text-[rgba(241,231,216,0.88)]"
      style={{ background: FOOTER_BG }}
    >
      <Container className="relative px-4 py-16 sm:px-8 md:py-20 lg:py-[5.5rem]">
        <div
          className="grid gap-12 md:grid-cols-2 md:gap-x-10 md:gap-y-14 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-x-12 xl:gap-x-14"
        >
          {/* Brand */}
          <div className="md:col-span-2 lg:col-span-1">
            <BrandLogo />
            <p
              className="mt-7 max-w-md text-[0.9375rem] leading-[1.75]"
              style={{ color: FOOTER_TEXT }}
            >
              Comfortable journeys, trusted drivers, and thoughtfully planned
              travel across Himachal and beyond—where{" "}
              <strong
                className="font-semibold"
                style={{ color: "rgba(241,231,216,0.95)" }}
              >
                every route feels considered
              </strong>
              , not rushed.
            </p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {footerSocial.map((item) => (
                <SocialButton
                  key={`brand-${item.id}`}
                  platform={item.id}
                  label={item.label}
                />
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <FooterHeading>Explore</FooterHeading>
            <ul className="mt-5 flex flex-col gap-3.5">
              {exploreLinks.map((item) => (
                <li key={item.href}>
                  <FooterNavLink href={item.href}>{item.label}</FooterNavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Branch */}
          <div>
            <FooterHeading>Branch</FooterHeading>
            <div className="mt-5 space-y-4 text-[0.9375rem] leading-relaxed">
              <p style={{ color: FOOTER_TEXT }}>
                {footerContact.addressLines.map((line) => (
                  <span key={line} className="block">{line}</span>
                ))}
              </p>
              <a
                href={footerContact.phoneHref}
                className="inline-flex items-center gap-2.5 no-underline transition-colors duration-300 hover:text-[#B8935A]"
                style={{ color: FOOTER_TEXT }}
              >
                <IconPhone className="size-4 shrink-0" style={{ color: FOOTER_ACCENT }} />
                <span className="border-b border-transparent transition-[border-color,color] duration-300 hover:border-[#B8935A]">
                  {footerContact.phone}
                </span>
              </a>
              <a
                href={footerContact.emailHref}
                className="block break-all no-underline transition-colors duration-300 hover:text-[#B8935A]"
                style={{ color: FOOTER_TEXT }}
              >
                <span className="inline-flex items-center gap-2.5">
                  <IconMail className="size-4 shrink-0" style={{ color: FOOTER_ACCENT }} />
                  {footerContact.email}
                </span>
              </a>
            </div>
          </div>

          {/* Stay in Touch */}
          <div className="md:col-span-2 lg:col-span-1">
            <FooterHeading>Stay in Touch</FooterHeading>
            <p
              className="mt-5 text-[0.9375rem] leading-relaxed"
              style={{ color: FOOTER_TEXT }}
            >
              First word on new routes, seasonal packages, and travel notes from
              our hill-road desk.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </Container>

      {/* Payment */}
      <div
        className="border-t"
        style={{ borderColor: FOOTER_BORDER }}
      >
        <Container className="px-4 py-9 sm:px-8 md:py-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p
                className="font-heading text-[0.8125rem] font-semibold tracking-[0.16em] uppercase"
                style={{ color: FOOTER_ACCENT }}
              >
                Secure Payment
              </p>
              <p
                className="mt-2 max-w-md text-sm leading-relaxed"
                style={{ color: FOOTER_TEXT_MUTED }}
              >
                Accepted methods for online booking — processed securely when you
                confirm your journey.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5 md:justify-end">
              {paymentMethods.map((method) => (
                <PaymentBadge key={method.id} id={method.id} label={method.label} />
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t"
        style={{ borderColor: FOOTER_BORDER, backgroundColor: "rgba(0,0,0,0.18)" }}
      >
        <Container className="px-4 py-5 sm:px-8 md:py-6">
          <div
            className="flex w-full min-w-0 flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between"
            style={{ color: FOOTER_TEXT_MUTED }}
          >
            <p className="min-w-0">
              © {year} {siteConfig.name}. All rights reserved.
            </p>
            <ul className="flex min-w-0 flex-wrap items-center gap-x-6 gap-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="no-underline transition-colors duration-300 hover:text-[#B8935A]"
                  style={{ color: FOOTER_TEXT_MUTED }}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="no-underline transition-colors duration-300 hover:text-[#B8935A]"
                  style={{ color: FOOTER_TEXT_MUTED }}
                >
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link
                  href={siteConfig.bookingHref}
                  className="no-underline transition-colors duration-300 hover:text-[#B8935A]"
                  style={{ color: FOOTER_TEXT_MUTED }}
                >
                  Booking
                </Link>
              </li>
            </ul>
          </div>
        </Container>
      </div>
    </footer>
  );
}
