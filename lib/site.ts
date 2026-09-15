/**
 * Central site configuration for Easy Travels.
 * CONTENT/DATA lives here. Layout components should render this data —
 * do not scatter hard-coded navigation, contact, or link lists in JSX.
 */

export type NavItem = {
  label: string;
  href: string;
};

export type FooterColumn = {
  title: string;
  links: readonly NavItem[];
};

export type SocialPlatform =
  | "facebook"
  | "instagram"
  | "youtube"
  | "threads"
  | "google";

export type SocialLink = {
  id: SocialPlatform;
  label: string;
  /** Set when the official URL is available. Do not invent URLs. */
  href: string | null;
};

export type PaymentMethodBadge = {
  id: string;
  label: string;
};

export const siteConfig = {
  name: "Easy Travels",
  shortName: "Easy Travels",
  tagline:
    "Comfortable journeys, trusted drivers, and thoughtfully planned travel for every route ahead.",
  /** Compact line under the logo in the header */
  headerEyebrow: "Travel · Taxi · Tours",
  description:
    "Premium travel and taxi experiences designed for comfort, clarity, and peace of mind.",

  contact: {
    addressLines: ["123 Travel Avenue,", "City Center"] as const,
    phone: "+91 90000 00000",
    phoneHref: "tel:+919000000000",
    email: "hello@easytravels.example",
    emailHref: "mailto:hello@easytravels.example",
  },

  /**
   * Social URLs are intentionally null until official profiles are confirmed.
   * Components must not invent placeholder domains.
   */
  social: [
    { id: "facebook", label: "Facebook", href: null },
    { id: "instagram", label: "Instagram", href: null },
    { id: "youtube", label: "YouTube", href: null },
    { id: "threads", label: "Threads", href: null },
    { id: "google", label: "Google", href: null },
  ] as const satisfies readonly SocialLink[],

  mainNav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Tour Packages", href: "/tour-packages" },
    { label: "Destinations", href: "/destinations" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ] as const satisfies readonly NavItem[],

  /**
   * Footer link columns — exactly 4 links each for visual balance.
   * Curated intentionally; do not inflate these lists in the Footer component.
   */
  footerColumns: [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Tour Package", href: "/services#tour-package" },
        { label: "Custom Trip", href: "/services#custom-trip" },
        { label: "Corporate Taxi", href: "/services#corporate-taxi" },
        { label: "Outstation Taxi", href: "/services#outstation-taxi" },
      ],
    },
    {
      title: "Popular destinations",
      links: [
        { label: "Shimla", href: "/destinations/shimla" },
        { label: "Manali", href: "/destinations/manali" },
        { label: "Dharamshala", href: "/destinations/dharamshala" },
        { label: "Amritsar", href: "/destinations/amritsar" },
      ],
    },
  ] as const satisfies readonly FooterColumn[],

  /**
   * Broader destination catalog for future pages (e.g. Home curated grid).
   * Footer uses `footerColumns` destinations only (4 links).
   */
  popularDestinations: [
    { label: "Shimla", href: "/destinations/shimla" },
    { label: "Manali", href: "/destinations/manali" },
    { label: "Dharamshala", href: "/destinations/dharamshala" },
    { label: "Amritsar", href: "/destinations/amritsar" },
    { label: "Kangra", href: "/destinations/kangra" },
    { label: "Manikaran", href: "/destinations/manikaran" },
  ] as const satisfies readonly NavItem[],

  legalLinks: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ] as const satisfies readonly NavItem[],

  /** Visual indicators only — no payment processing in the UI chrome. */
  paymentMethods: [
    { id: "visa", label: "Visa" },
    { id: "mastercard", label: "Mastercard" },
    { id: "rupay", label: "RuPay" },
    { id: "upi", label: "UPI" },
    { id: "netbanking", label: "Net Banking" },
  ] as const satisfies readonly PaymentMethodBadge[],

  bookingHref: "/booking",
  bookingCtaLabel: "BOOKING NOW",

  footer: {
    /**
     * Premium CTA strip is temporarily hidden from the active footer design.
     * Content retained here for a future re-enable without hard-coding in JSX.
     */
    showCtaStrip: false,
    ctaStrip: {
      eyebrow: "Easy Travels",
      heading: "Ready for your next journey?",
      description:
        "Effortless planning, comfortable rides, and reliable travel support—so you can focus on the road ahead.",
      ctaLabel: "Plan Your Journey",
    },
    contactHeading: "Contact",
    socialHeading: "Follow us",
    socialDescription:
      "Stay connected for journeys, updates, and travel inspiration.",
    paymentHeading: "Secure payment",
    paymentDescription:
      "We accept these methods for online booking payments. Processing is handled securely through our payment partner when you book.",
  },
} as const;
