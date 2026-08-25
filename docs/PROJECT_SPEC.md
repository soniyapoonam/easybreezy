# Easy Breezy Travels — Master Engineering Specification

**Status:** Source of truth for all future development  
**Brand:** Easy Breezy Travels  
**Project type:** Premium travel and taxi booking website  
**Last updated:** 2026-08-14 (Complete Home Page UX, content architecture, and design specification)

This document is the single source of truth for architecture, design, product scope, integrations, and quality standards. Before implementing a major feature, inspect this specification and the existing codebase, reuse established patterns, and avoid duplicate systems.

---

## 1. Project overview

### 1.1 Purpose

Easy Breezy Travels is a premium travel and taxi booking website. The experience must feel trustworthy, polished, and conversion-focused—attracting attention without looking cheap, cluttered, or like a generic AI-generated template.

### 1.2 Technology stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js **16.3.0**, React **19**, TypeScript, Tailwind CSS **v4** |
| Backend / CMS | WordPress (headless content and agreed backend data) |
| Architecture | Headless WordPress + Next.js frontend |

### 1.3 Responsibility split

| Layer | Owns |
|-------|------|
| **Next.js frontend** | Presentation, UX, interactions, client-facing experiences |
| **WordPress backend** | Content management (e.g. blog), and other agreed backend/content data |

Do not blur these boundaries without an explicit architectural decision recorded against this spec.

---

## 2. Design direction

### 2.1 Visual direction

**Premium Travel + Modern Technology + Subtle 3D Depth + Editorial Quality.**

The site must look premium, modern, trustworthy, and highly polished. Motion and depth should support UX and perceived quality—not decoration for its own sake.

### 2.2 Use deliberately

- Subtle hover elevation
- Smooth transitions
- Tasteful reveal animations
- Image motion where appropriate
- Refined slider transitions
- Micro-interactions
- Subtle depth and layered shadows

### 2.3 Do not overuse

- Gradients
- Glassmorphism
- Glowing effects
- Floating blobs
- Excessive animations
- Unnecessary 3D elements
- Decorative UI noise
- Random icons
- Excessive cards

The design must remain clean, professional, and conversion-focused.

---

## 3. Typography

| Role | Font |
|------|------|
| Headings / UI emphasis | **Inter** |
| Body | **Roboto** |

### 3.1 Hierarchy (desktop targets)

| Level | Size |
|-------|------|
| H1 | 44–48px |
| H2 | 36–40px |
| H3 | 22–28px |
| Body | 16–18px |
| Small | 14px |

Responsive typography must adapt appropriately for tablet and mobile.

### 3.2 Rules

- Reuse the existing design tokens and typography foundation (`app/layout.tsx`, `app/globals.css`).
- Do **not** introduce another font system.
- Load fonts via the Next.js font system already established in the project.

---

## 4. Brand colors

| Token / role | Hex |
|--------------|-----|
| Primary Deep Ocean | `#123B5D` |
| Secondary Travel Blue | `#1E6FA8` |
| Primary CTA Sunset Orange | `#F47A3C` |
| Warm Highlight | `#F6B84B` |
| Light Travel Accent | `#EAF4F8` |
| Main Background | `#F7FAFC` |
| Dark Background | `#102A43` |
| Primary Text | `#334E68` |
| Muted Text | `#627D98` |
| Surface | White / near-white |

### 4.1 Rules

- Do **not** hard-code these colors inside future components.
- Use the existing semantic design tokens (e.g. `--color-primary`, `--color-accent`, Tailwind theme mappings).
- Primary CTAs use Sunset Orange; secondary actions use the navy / travel-blue system.

---

## 5. Reusability rule

The website must use a consistent visual language throughout.

- Prefer reusable UI components whenever the same pattern appears more than once.
- Do **not** create duplicate buttons, cards, headings, or container systems.

### 5.1 Existing reusable components

Located under `components/ui/`:

| Component | Purpose |
|-----------|---------|
| `Button` | Primary / secondary / outline actions, disabled, loading-ready |
| `Container` | Consistent max width (**84em** via `--container-max` / `.container-page`) and horizontal padding |
| `Section` | Consistent vertical section spacing |
| `SectionHeading` | Eyebrow, heading, description, alignment |
| `Card` | Consistent surface, radius, subtle elevation |

Future UI must extend or compose these rather than recreating equivalent styles.

### 5.2 Content / data vs presentation

Separate **content/configuration** from **presentation/UI**:

| Layer | Location | Responsibility |
|-------|----------|----------------|
| Content / config | `lib/site.ts` (and future content modules / WordPress) | Navigation, footer columns, contact, social, payment badges, legal links, booking CTA labels, feature flags; later: services, destinations, packages, blog, testimonials |
| Presentation | `components/layout/*`, `components/ui/*` | Render config data with design tokens |

Rules:

- Do **not** hard-code navigation, company/service/destination link lists, contact details, social URLs, payment methods, or legal links inside component JSX when they belong in centralized config.
- Do **not** duplicate the same business/content data across multiple components.
- Do **not** create a second container system or hard-code max-width on individual sections.
- Future WordPress (or other backend) sources will replace/augment config where appropriate — without inventing a CMS in early milestones.
- Prefer maintainable, practical centralization; avoid premature abstraction.

---

## 6. Site pages and routes

Required pages (clean, SEO-friendly routes):

| Page | Suggested route |
|------|-----------------|
| Home | `/` |
| About Us | `/about` |
| Booking | `/booking` |
| Services | `/services` |
| Tour Packages | `/tour-packages` |
| Destinations | `/destinations` |
| Blog | `/blog` |
| Contact | `/contact` |

Blog individual articles should use a clean nested route (e.g. `/blog/[slug]`). Destination detail pages should support future WordPress-driven content (e.g. `/destinations/[slug]`).

---

## 7. Global header

The header is a **reusable** site-wide component.

### 7.1 Must include

- Easy Breezy Travels branding / logo area
- Main navigation
- **Online Booking** CTA button (visually prominent, not excessive)
- Responsive mobile navigation
- Social / contact elements where appropriate

Do not build competing header implementations.

---

## 8. Home page — UX, content architecture & design specification

**Status:** Specification complete — **implementation complete** (first milestone)

### 8.1 Goal and first impression

The homepage must feel like a premium, modern, high-quality travel brand — intentionally designed, not a generic AI-generated template.

Within the first few seconds it must communicate:

- Trust
- Comfort
- Professional travel / taxi service
- Modern technology (used in service of the journey, not as a SaaS aesthetic)
- Easy booking
- Attractive destinations

The page must look clean, conversion-focused, and editorial. Every section must have a clear business or UX purpose. Do **not** add sections merely to make the page longer.

### 8.2 User journey funnel

Guide visitors naturally through:

**DISCOVER → TRUST → EXPLORE → PLAN → BOOK**

| Stage | Homepage role |
|-------|----------------|
| Discover | Hero + journey planner introduce the brand and the ability to plan a trip |
| Trust | Benefits strip, About, Why Choose Us, Google reviews |
| Explore | Services, destinations, blog |
| Plan | Mid-page travel-experience CTA + journey interaction |
| Book | Final booking CTA → `/booking` |

### 8.3 Strategic page architecture (exact order)

1. Global Header *(site chrome — implemented)*
2. Premium Hero
3. Trust / Quick Benefits
4. About Easy Breezy Travels
5. Services
6. Why Choose Us
7. Popular Destinations
8. Travel Experience / Conversion CTA
9. Google Reviews / Testimonials
10. Latest Travel Blogs
11. Final Booking CTA
12. Global Footer *(site chrome — implemented)*

Refine this order only for a strong UX reason. Do not add filler sections.

Site chrome uses the existing reusable `Header` / `Footer` from `app/layout.tsx`. Home must not create a second header or footer.

All primary content width uses the single container system: `Container` / `.container-page`, max-width **84em**.

---

### 8.4 Premium Hero

The Hero is the most important visual area. It must communicate the Easy Breezy Travels value proposition within the first few seconds: this is a travel and taxi service; customers can plan and book journeys; travel is comfortable and reliable.

#### Slider

- Premium travel image slider — not a generic slideshow
- High-quality, travel-focused imagery with a clear visual story per slide
- Smooth, unhurried transitions
- Accessible controls (previous / next; pause/play if autoplay is used; keyboard operable)
- Mobile swipe support
- Overlay that preserves text contrast without heavy glassmorphism
- Responsive across desktop, tablet, and mobile
- Optimized images; first/active slide treated as an LCP candidate
- Subtle motion only

#### Hero content

- One strong primary **H1** for the page (do not repeat H1 elsewhere)
- Concise supporting copy
- Primary booking CTA using existing primary button language (Sunset Orange)
- Secondary exploration CTA where appropriate (e.g. Destinations or Services)

#### Plan Your Journey (Hero-associated)

Include a **compact** journey-planning interaction within or closely associated with the Hero. It must not overwhelm or destroy the Hero’s visual quality.

Possible inputs:

- From
- To
- Travel date
- Travel time (where appropriate)
- Travellers / passengers (where appropriate)

After a valid calculation, the system may show:

- Distance
- Estimated travel time
- Route / direction information where supported

**Critical business rule:** Do **not** display price/fare during this distance/time calculation. The business uses **fixed pricing logic**. Pricing is handled separately through the approved booking / payment workflow. Never invent dynamic pricing. The full booking form belongs on `/booking`.

---

### 8.5 Trust / Quick Benefits

A concise trust/value area immediately after the Hero.

Possible themes (copy to be reviewed before publication):

- Reliable Travel
- Comfortable Journeys
- Professional Service
- Easy Booking

Use a refined, compact visual treatment. Do **not** create a large repetitive icon grid.

---

### 8.6 About Easy Breezy Travels (homepage preview)

A concise, attractive brand preview:

- Meaningful, original brand story (not generic travel filler)
- Supporting image
- One clear CTA to About Us (`/about`)

Communicate trust and personality. Do not dump the full About page onto Home.

---

### 8.7 Services

Present the primary services:

- Tour Package
- Custom Trip
- Corporate Taxi
- Round Trip
- Local Taxi
- Outstation Taxi

Use reusable service card patterns (compose existing `Card` + `Section` / `SectionHeading`). Keep cards visually clean.

Each service should support:

- Title
- Useful short description
- Image and/or restrained icon treatment
- CTA where useful (typically `/services` or a service anchor)

**Data rule:** Service content must **not** be duplicated in multiple components or pages. Define services once in a centralized source (initially config; later WordPress / CMS where appropriate). Footer service links already come from `lib/site.ts` and must stay aligned with the same service identities.

---

### 8.8 Why Choose Us

A visually distinctive trust section — different in layout from the compact benefits strip.

Possible themes:

- Reliable service
- Comfortable travel
- Professional support
- Easy booking
- Customer-focused experience
- Transparent process

Do **not** invent unsupported statistics, awards, or claims. Final copy will be reviewed and customized before publication.

---

### 8.9 Popular Destinations

Initial destination catalog:

- Shimla
- Manali
- Atal Tunnel
- Manikaran
- Dharamshala
- Amritsar
- Sukhna Lake
- Rock Garden
- Rose Garden
- Kangra

Home shows a **curated selection** only. Do not display every destination if it hurts the design. Provide a clear CTA to `/destinations`.

**Data rule:** Destination data must be reusable (Home teaser, Destinations listing, Footer popular-destinations subset, future detail pages). Footer currently shows four curated destination links from `lib/site.ts`; Home must not invent a conflicting list. Eventually support WordPress / content-driven destination records (title, description, featured image, highlights, travel information, related tours, CTA).

---

### 8.10 Travel Experience / Conversion CTA

One strong mid-page conversion section that moves visitors from exploring to planning.

Keep copy concise and brand-specific. Avoid generic AI slogans. Include an appropriate CTA (booking and/or journey planning).

Visually distinct from both the Hero and the final booking CTA, while staying inside the design system.

---

### 8.11 Google Reviews / Testimonials

A Google reviews / testimonials area with:

- Clear Google association
- Responsive, readable presentation
- CTA to view more reviews where appropriate
- Architecture that allows future legitimate integration

Rules:

- **Never fabricate reviews**
- Use real review data only when integration / data is available
- If real data is unavailable during implementation, build the structure (heading, layout, empty/unavailable state) without fake review content

---

### 8.12 Latest Travel Blogs

A curated latest-blog preview.

**Source:** WordPress (headless). Next.js consumes the appropriate API / data.

Each item should support:

- Featured image
- Title
- Excerpt
- Metadata where useful (date, author)
- Link to the article (`/blog/[slug]`)

Provide a CTA to `/blog`. Do **not** create fake blog posts. If WordPress is not connected yet, use a non-fabricated empty / loading architecture.

---

### 8.13 Final Booking CTA

Strong conversion section immediately before the Footer.

Purpose: convert visitors who have explored the site into bookings.

Include:

- Concise headline
- Short supporting text
- Primary booking CTA (`/booking`)

Do **not** duplicate the Hero design (different composition, imagery treatment, and density). Stay within the same tokens, typography, and button language.

---

### 8.14 Dynamic content architecture

The Home page must **not** become a large file of repeated hard-coded content. Separate **content/data** from **presentation/UI** (see §5.2).

| Source | Use for |
|--------|---------|
| **Centralized configuration** (`lib/site.ts` and future dedicated content modules) | Stable global content: nav, contact, booking hrefs, curated Home subsets, trust-item copy until CMS-ready |
| **WordPress** | Content-managed data: blog posts, destination articles, service copy/media where agreed |
| **Application / backend APIs** | Dynamic business data: distance/time, booking status, (later) reviews if served server-side |

Reusable content types must be designed so they can eventually support:

- Services
- Destinations
- Tour packages
- Blog posts
- Testimonials

**Do not** manually duplicate the same service or destination across Home, Footer, Services, and Destinations pages. One identity, many views.

Do not introduce a CMS client, database, or WordPress integration in the first Home UI implementation unless that work is explicitly in scope. Structure the presentation so those sources can plug in later.

Suggested Home composition (when implemented): small section components that receive data as props, not a single `page.tsx` with all copy inlined.

---

### 8.15 Content direction

Homepage copy must be:

- Original and brand-specific
- Meaningful and concise
- Human-sounding
- Useful to travelers
- SEO-friendly without keyword stuffing

Do not copy competitors. Do not use generic filler. AI-drafted copy must be reviewed and customized for Easy Breezy Travels before publication.

---

### 8.16 Reusable component strategy

**Reuse existing:**

- `Button`, `Container`, `Section`, `SectionHeading`, `Card`
- Global `Header` / `Footer`
- Design tokens in `app/globals.css`
- Central config in `lib/site.ts`

**Create only when reuse or complexity justifies:**

| Pattern | Role |
|---------|------|
| `HeroSlider` | Accessible premium slider |
| `JourneyPlanner` | Compact Hero-associated from/to/date interaction (no fare display) |
| `TrustItem` / compact trust strip | Post-hero benefits |
| `ServiceCard` | Service grid items |
| `DestinationCard` | Destination teaser cards |
| `TestimonialCard` | Real-review presentation |
| `BlogCard` | Blog preview cards |

Avoid premature abstraction. Do not create duplicate buttons, cards, headings, or container systems.

---

### 8.17 Motion & animation

**Allowed (restrained):** slider transitions, subtle section reveal, tasteful image movement, card hover elevation, button micro-interactions. Subtle parallax only where it improves UX.

**Avoid:** excessive bouncing, particles, continuous distracting movement, excessive 3D, excessive glow, motion that fights readability.

**Must** respect `prefers-reduced-motion` (already in the global foundation).

---

### 8.18 Image direction (assets later)

Images will be generated or selected later. Do **not** generate final image assets in this documentation milestone.

| Area | Requirements |
|------|----------------|
| Hero slides | Premium travel/taxi photography; strong focal subject; space for overlay copy; consistent quality across slides; LCP-aware first slide |
| About | Brand/personality-supporting photography (people, landscape, or vehicle context as approved) |
| Services | Relevant service context visuals or restrained icons; consistent aspect ratios |
| Destinations | Destination-specific photography; consistent card crops |
| CTA sections | Atmospheric travel imagery that supports conversion without clutter |

Images must be realistic, premium, travel-focused, relevant, consistent, responsive, optimized, properly cropped, and accessible (meaningful alt text). Avoid random unrelated stock.

---

### 8.19 Responsive design

Mobile is intentionally designed — not a compressed desktop layout. **No horizontal overflow.**

| Breakpoint | Behavior |
|------------|----------|
| **Desktop** | Editorial layout; Hero with compact journey interaction as overlay or adjacent panel; multi-column services/destinations; balanced CTAs |
| **Tablet** | Two-column cards where appropriate; journey planner may sit below Hero copy; readable type and tap targets |
| **Mobile** | Hero remains readable; slider controls usable; journey planner stacks cleanly; service/destination cards adapt (typically one column); reviews readable; CTA sections balanced (not oversized); legal/footer already stacks without overflow |

---

### 8.20 Performance

- Optimized, responsive images (`next/image` or equivalent project pattern)
- Careful Hero / LCP handling (priority on the first slide only)
- Lazy-load below-the-fold media
- Minimal client-side JavaScript
- Server Components by default
- Client Components only for interactive pieces (slider, journey planner, swipe)
- Avoid unnecessary third-party scripts and oversized assets

---

### 8.21 Accessibility

- Semantic HTML (`main` already in root layout; Home uses `<section>` landmarks)
- Correct heading hierarchy: one H1 in the Hero; H2/H3 for sections
- Accessible slider controls and keyboard navigation
- Visible focus states (existing design tokens)
- Accessible buttons and labeled journey-planner fields
- Meaningful image alt text
- Sufficient contrast on overlays
- Reduced-motion support

---

### 8.22 SEO

- Document title and meta description for Easy Breezy Travels (Home-specific when implemented)
- Open Graph metadata
- One primary H1; logical H2/H3 hierarchy
- Descriptive links (avoid “click here”)
- Semantic HTML
- Optimized images with alt text
- Relevant structured data where appropriate (e.g. Organization / LocalBusiness — only when accurate business data is confirmed)

---

### 8.23 What not to add

Do **not** add:

- Fake statistics, counters, or awards
- Fake testimonials
- Random partner logos
- Pricing tables
- Unnecessary popups
- Newsletter section without a real business requirement
- Excessive cards, gradients, glassmorphism, or 3D decoration
- Excessive carousels beyond the intentional Hero slider
- Generic filler sections
- Fare/price display inside the Hero distance/time experience

Every section must earn its place.

---

## 9. About Us

Page structure:

1. Hero
2. About Easy Breezy Travels
3. Mission
4. Vision
5. Trust / value section
6. CTA

Content must be meaningful, original, and brand-specific.

---

## 10. Services

Required services:

- Tour Package
- Custom Trip
- Corporate Taxi
- Round Trip
- Local Taxi
- Outstation Taxi

Each service should have:

- Clear title
- Useful description
- Relevant visual
- Appropriate CTA

Do not use generic filler text.

---

## 11. Destinations

### 11.1 Initial destinations

- Shimla
- Manali
- Atal Tunnel
- Manikaran
- Dharamshala
- Amritsar
- Sukhna Lake
- Rock Garden
- Rose Garden
- Kangra

Additional destinations may be added when strategically appropriate.

### 11.2 Content model (WordPress-ready)

Destinations should support future WordPress-driven content. Each destination should eventually support:

- Title
- Description
- Featured image
- Highlights
- Travel information
- Related tours
- CTA

---

## 12. Booking system

The site will include an online booking system.

### 12.1 Form fields (may include)

- Pickup / origin
- Destination
- Travel date
- Travel time
- Passenger information
- Contact information
- Trip type
- Required service details
- Other required booking fields as defined by business rules

### 12.2 Integration and storage

- Designed for future integration with the selected payment plugin.
- Booking data must be stored securely in the backend.
- Do not trust frontend-only booking or payment status.

---

## 13. Distance and travel time

The system must calculate:

- Distance
- Estimated travel time
- Route / direction information where appropriate

### 13.1 Critical business rule

**Distance and travel-time calculation must NOT display fare/price to the customer during this calculation.**

- The business uses fixed pricing logic.
- The customer-facing calculation area focuses on: **route**, **distance**, **estimated time**.
- Pricing follows the approved business / payment workflow separately.
- Do **not** invent dynamic pricing unless explicitly required later.

---

## 14. Payment

- Online payment will be implemented through a **payment plugin selected later**.
- Do **not** build a custom payment gateway unless explicitly required.
- Architecture must allow the selected payment plugin / backend workflow to integrate cleanly with the Next.js frontend.
- **Never** expose payment secrets or private API credentials in the client.

---

## 15. Booking status

Minimum supported statuses:

| Status | Meaning |
|--------|---------|
| Pending | Awaiting confirmation / payment completion |
| Confirmed | Successfully confirmed |
| Failed | Payment or booking failed |
| Cancelled | Cancelled by user or system |

- UI and notifications must reflect **actual** backend / payment status.
- **Never** fake or infer a successful payment on the frontend.

---

## 16. Email notifications

After the appropriate booking / payment event:

| Recipient | Message |
|-----------|---------|
| Client | Confirmation / status email |
| Admin | Booking / status notification |

- Emails must reflect the **actual** booking status.
- Do **not** send “confirmed” emails for failed or pending transactions.

---

## 17. AI travel assistant

### 17.1 Purpose

An AI-powered travel assistant for customer questions related to travel, for example:

- Travel time
- Distance
- Route / direction
- Destination information
- Trip planning
- Travel suggestions
- Itinerary guidance

The assistant must be **useful**, not decorative.

### 17.2 Guardrails

The AI must **not** invent:

- Booking availability
- Payment status
- Prices
- Routes
- Business policies
- Unsupported company information

When reliable application data is required, the AI should use approved application / backend data or tools rather than hallucinating.

### 17.3 Security

- Architect AI functionality securely.
- **Never** expose private AI API keys in browser / client code.

---

## 18. Google testimonials

- Homepage should include a Google reviews / testimonials area.
- Use an appropriate legitimate integration / data source when implemented.
- Do **not** fabricate customer reviews.

---

## 19. Blog

- Blog content is managed in **WordPress**.
- Next.js consumes the appropriate WordPress API / data.

Blog pages must support:

- Listing
- Individual article
- Featured image
- Title
- Excerpt / content
- Metadata
- SEO metadata

---

## 20. Contact

### 20.1 Current contact information

| Field | Value |
|-------|-------|
| Address | Vill Dohra, PO Bharoli Kalan, Teh Jhandutta |
| Phone | +91-94189-20004 |
| Email | soniyapoonam9986@gmail.com |

### 20.2 Social platforms

- Facebook
- Instagram
- YouTube
- Threads
- Google

Keep social links **configurable** (central config / data source)—do not hard-code the same URLs into multiple components.

---

## 21. Footer

The footer is a **reusable** site-wide component and the brand’s final visual statement—not a generic four-column link dump.

**Visual direction:** Premium travel + modern 3D depth + elegant editorial layout. Clean, intentional, and conversion-aware.

### 21.1 Visual zones (required architecture)

1. **Premium CTA strip** — **currently hidden / not part of the active footer design**  
   Spec content retained in `lib/site.ts` (`footer.showCtaStrip: false` + `footer.ctaStrip`) for a future re-enable. Do **not** replace it with another large CTA until product decides to restore it. When active, messaging such as “Ready for your next journey?” with a primary Plan Your Journey / Book Now CTA.

2. **Main footer** *(active starting zone)*  
   Sophisticated multi-column layout (not a generic equal four-column dump). Include:
   - Easy Breezy Travels brand + concise brand description
   - **Company** — exactly **4** curated links
   - **Services** — exactly **4** curated links
   - **Popular destinations** — exactly **4** curated links
   - Link groups are defined in `siteConfig.footerColumns` (central config), not hard-coded in Footer JSX
   - Do not overcrowd; keep counts balanced (4 / 4 / 4)

3. **Contact / trust area**  
   Visually prominent contact block with clean consistent icons (data from `siteConfig.contact`):
   - Address: Vill Dohra, PO Bharoli Kalan, Teh Jhandutta
   - Phone: 94189-20004
   - Email: soniyapoonam9986@gmail.com

4. **Social area**  
   Visual social buttons/icons for Facebook, Instagram, YouTube, Threads, Google.  
   **URLs must remain configurable** in `siteConfig.social`. Do **not** invent real social URLs.

5. **Secure payment area**  
   Dedicated “Secure Payment” / “We Accept” visual indicators only (e.g. Visa, Mastercard, RuPay, UPI, Net Banking from `siteConfig.paymentMethods`).  
   No payment processing in the footer—actual payments are handled later by the selected payment plugin. Badges must look premium and integrated.

6. **Footer bottom bar**  
   Copyright, Privacy Policy, Terms & Conditions, and appropriate legal/navigation links (from config), separated by a subtle divider.

### 21.2 Visual quality

**Use:** layered depth, subtle gradients, refined borders, controlled shadows, elegant spacing, premium typography, subtle hover states, restrained animation.

**Do not use:** excessive glow, excessive glassmorphism, random gradients, oversized icons, too many cards, cartoon-style 3D, excessive decorative elements.

### 21.3 Layout / container

All primary footer (and site) content width uses the single container system: `.container-page` / `Container`, max-width **84em** (`--container-max`). Do not invent alternate max-width values in components.

---

## 22. Content rules

Content must be:

- Meaningful
- Original
- Brand-specific
- Natural
- Useful to travelers
- SEO-friendly without keyword stuffing

### 22.1 Prohibitions

- Do not copy content from other travel websites.
- Do not knowingly reproduce copyrighted website copy.
- Avoid generic filler (e.g. “Welcome to our amazing website…”) unless rewritten into meaningful brand-specific content.
- AI may assist with drafting; generated content must be reviewed and customized for Easy Breezy Travels.

---

## 23. Image strategy

- Images will be generated / selected later.
- Visual system should support premium travel photography.
- Images should match destination / service context, maintain consistent aspect ratios, use responsive optimization, and include meaningful alt text.
- Avoid random stock imagery that does not fit the brand.
- Do **not** create final image assets during early architecture phases unless explicitly requested.

---

## 24. SEO

Build with SEO in mind:

- Semantic HTML
- Clean URLs
- Metadata (title / description)
- Open Graph metadata
- Structured data where appropriate
- Sitemap
- `robots.txt`
- Image alt text
- Strong Core Web Vitals
- Mobile-first responsive design

Do not keyword-stuff content.

---

## 25. Accessibility

Follow accessible UI practices:

- Semantic HTML
- Keyboard navigation
- Visible focus states (existing design tokens)
- Accessible buttons and forms
- Sufficient contrast
- Meaningful alt text
- Reduced-motion support
- Proper labels

---

## 26. Performance

Performance is a priority.

**Avoid:**

- Unnecessary dependencies
- Oversized images
- Unnecessary JavaScript
- Duplicate components
- Excessive client components
- Unnecessary animations
- Blocking resources

**Prefer:**

- Server Components unless client-side interaction is required
- Dynamic / client functionality only where justified

---

## 27. Security

Never expose in client code:

- API secrets
- Payment secrets
- WordPress credentials
- AI API keys
- Private backend credentials

Additional rules:

- Sensitive operations must happen server-side / backend-side.
- Validate and sanitize user input.
- Do not trust frontend booking / payment status.

---

## 28. Architecture principles

1. Keep the frontend modular.
2. Keep reusable UI components centralized (`components/ui/` and future shared layout components).
3. Keep business logic separate from presentation.
4. Avoid duplicated code.
5. Prefer Server Components.
6. Use Client Components only when interaction requires them.
7. Keep WordPress as the backend / content source where appropriate.
8. Keep external integrations isolated.
9. Never put secrets in client code.
10. Build production-quality code rather than demos.
11. Avoid premature abstraction.
12. Avoid unnecessary libraries.
13. Do not implement features that are not in this specification without discussing their purpose.
14. If a requirement is technically ambiguous, identify the ambiguity before making a major architectural decision.

---

## 29. Development rule

This document is the project’s master specification.

Future development should:

1. Inspect this specification.
2. Inspect the existing architecture.
3. Reuse existing components and design tokens.
4. Avoid duplicate systems.
5. Validate the implementation (lint, types, accessibility, security).

Do not rewrite working architecture unnecessarily.

---

## 30. Implementation status

Legend:

- `[ ]` Not started
- `[~]` In progress
- `[x]` Completed

### Foundation

- [x] Next.js project initialization
- [x] Design foundation
- [x] Core reusable UI architecture
- [x] Home Page UX + Design Specification

### Site chrome

- [x] Global Header
- [x] Global Footer

### Pages

- [x] Home page implementation
- [ ] About Us
- [ ] Booking
- [ ] Services
- [ ] Tour Packages
- [ ] Destinations (listing + detail model)
- [ ] Blog (listing + article via WordPress)
- [ ] Contact

### Integrations & systems

- [ ] WordPress headless content integration
- [ ] Online booking system
- [ ] Distance / travel-time calculation (no fare display)
- [ ] Payment plugin integration
- [ ] Booking status workflow (Pending / Confirmed / Failed / Cancelled)
- [ ] Email notifications (client + admin)
- [ ] AI travel assistant
- [ ] Google reviews / testimonials integration

### Quality & launch

- [ ] SEO (metadata, OG, sitemap, robots)
- [ ] Accessibility pass
- [ ] Performance / Core Web Vitals pass
- [ ] Image assets & optimization pipeline

---

*End of master specification. Do not add speculative features outside this document without an explicit product decision.*
