import { unsplashImages } from "./unsplash";

export const blogPageCopy = {
  hero: {
    headingId: "blog-hero-heading",
    eyebrow: "Travel Blog",
    heading: "Stories, Tips & Guides",
    body: "Get inspired with travel stories, destination guides, travel tips and everything you need to plan your next adventure.",
    script: "Better Journeys Ahead",
    imageSrc: "/img/hill-stations.jpg",
    imageAlt: "Mountain peaks under a clear sky",
  },
  resultsLabel: "Showing",
  ofLabel: "of",
  articlesLabel: "articles",
  sortLabel: "Latest Posts",
  latestLabel: "Latest Posts",
  oldestLabel: "Oldest Posts",
  searchLabel: "Search blog",
  searchPlaceholder: "Search blog...",
  categoriesHeading: "Categories",
  recentHeading: "Recent Posts",
  readMore: "Read More",
  emptyTitle: "No stories published yet",
  emptyBody:
    "Travel stories will appear here as they are published in WordPress.",
  noResultsTitle: "No matching stories",
  noResultsBody:
    "Nothing in the journal matches this search. Try another phrase, or view all stories.",
  errorTitle: "Stories could not be loaded",
  errorBody:
    "The WordPress journal did not respond. Check the connection, then try again.",
  retryLabel: "Retry",
  newsletter: {
    heading: "Get Travel Tips & Updates",
    body: "Join our newsletter for the latest travel guides, destination ideas and exclusive offers.",
    emailLabel: "Email address",
    placeholder: "Your email",
    submitLabel: "Subscribe",
    note: "When a mailing service is connected, this form will subscribe you. For now, your email is not being stored.",
  },
  article: {
    relatedHeading: "More Stories for Your Next Journey",
    onThisPage: "On this page",
    shareHeading: "Share this story",
    copyLink: "Copy link",
    copiedLink: "Link copied",
    shareWhatsApp: "Share on WhatsApp",
    shareFacebook: "Share on Facebook",
    shareLinkedIn: "Share on LinkedIn",
    publishedLabel: "Published",
    updatedLabel: "Updated",
    errorTitle: "This story could not be loaded",
    errorBody:
      "The WordPress journal did not respond. Check the connection, then try again.",
    notFoundTitle: "Story not found",
    notFoundBody:
      "That article is not in the Easy Travels journal. Browse other travel stories, or return home.",
    packageCtaTitle: "Plan this kind of journey",
    packageCtaBody:
      "Comfortable taxis and considered routes across regional and outstation destinations.",
    articleCta: {
      eyebrow: "Inspired to travel?",
      heading: "Ready to Turn Inspiration Into a Journey?",
      body: "Explore destinations and tour packages designed to make your next trip unforgettable.",
      buttonLabel: "Explore Tour Packages",
      buttonHref: "/tour-packages",
      script: "Travel More",
    },
  },
  cta: {
    eyebrow: "Ready for your next adventure?",
    heading: "Let's Plan Your Dream Trip",
    body: "From breathtaking destinations to seamless travel experiences, we're here to make it happen.",
    buttonLabel: "Explore Tour Packages",
    buttonHref: "/tour-packages",
    script: "Travel More",
    imageSrc: unsplashImages.tones.lake,
    imageAlt: "Mountain lake landscape for the travel journal CTA",
  },
} as const;

export const blogImageFallbackSrc = "/img/hill-road.jpg";
