/**
 * Destinations page content — scoped to /destinations only.
 * Does not affect Home teasers or shared destination catalog.
 */

import { unsplashSrc } from "./unsplash";

export type DestinationsPageDestination = {
  slug: string;
  name: string;
  region: string;
  country: string;
  summary: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  moods: readonly string[];
  mapPosition: { x: number; y: number };
  size: "large" | "medium" | "small";
};

export const destinationsPageHero = {
  eyebrow: "EXPLORE THE WORLD",
  heading: "Where Will You Go Next?",
  body:
    "Discover extraordinary places, unforgettable experiences and journeys curated by Easy Travels.",
  floatingCard: {
    label: "Himachal Pradesh",
    sublabel: "6 curated escapes",
  },
  imageSrc: unsplashSrc("1436491865332-7a61a109cc05"),
  imageAlt: "Aerial view of mountain ranges at golden hour",
} as const;

export const destinationsPageFeatured = {
  eyebrow: "CURATED ESCAPES",
  heading: "Places That Stay With You",
  description:
    "From Himalayan landscapes to vibrant cities and peaceful retreats, discover destinations worth travelling for.",
} as const;

export const destinationsPageMood = {
  heading: "Travel Your Way",
} as const;

export const destinationsPageStory = {
  eyebrow: "THE JOURNEY MATTERS",
  heading: "Not Just Places. Experiences.",
  body:
    "Every destination has a story. Discover places where landscapes, culture, food and unforgettable moments come together.",
  ctaLabel: "Explore Destinations",
  imageSrc: unsplashSrc("1528127269322-539801943592"),
  imageAlt: "Traveler overlooking a vast mountain valley",
} as const;

export const destinationsPageMap = {
  heading: "Explore the Map",
  label: "6 destinations waiting to be explored",
} as const;

export const destinationsPageCta = {
  heading: "Your Next Journey Starts Here.",
  body:
    "Choose a destination, pack your bags and let Easy Travels take care of the journey.",
  primaryLabel: "Explore Tours",
  primaryHref: "/tour-packages",
  secondaryLabel: "Book Your Journey",
  secondaryHref: "/booking",
  imageSrc: unsplashSrc("1469474968028-56623f02e42e"),
  imageAlt: "Sunlit valley stretching toward distant mountain peaks",
} as const;

export const destinationRegions = [
  { value: "all", label: "All regions" },
  { value: "himachal", label: "Himachal Pradesh" },
  { value: "punjab", label: "Punjab" },
  { value: "chandigarh", label: "Chandigarh" },
] as const;

export const destinationMoods = [
  {
    id: "adventure",
    label: "Adventure",
    imageSrc: unsplashSrc("1469854523086-cc02fe5d8800"),
    suggestions: ["Spiti Valley", "Manali", "Kasol"],
  },
  {
    id: "mountains",
    label: "Mountains",
    imageSrc: unsplashSrc("1506905925346-21bda4d32df4"),
    suggestions: ["Manali", "Shimla", "Dalhousie"],
  },
  {
    id: "wellness",
    label: "Peace & Wellness",
    imageSrc: unsplashSrc("1500530855697-b586d89ba3ee"),
    suggestions: ["Dharamshala", "Dalhousie"],
  },
  {
    id: "family",
    label: "Family Escapes",
    imageSrc: unsplashSrc("1464822759023-fed622ff2c3b"),
    suggestions: ["Shimla", "Manali"],
  },
  {
    id: "romantic",
    label: "Romantic Getaways",
    imageSrc: unsplashSrc("1501785888041-af3ef285b470"),
    suggestions: ["Dalhousie", "Kasol"],
  },
  {
    id: "nature",
    label: "Nature",
    imageSrc: unsplashSrc("1470071459604-3b5ec3a7fe05"),
    suggestions: ["Kasol", "Spiti Valley"],
  },
  {
    id: "weekend",
    label: "Weekend Trips",
    imageSrc: unsplashSrc("1518838418956-3797e078eedb"),
    suggestions: ["Shimla", "Dharamshala"],
  },
] as const;

export const destinationsPageList: readonly DestinationsPageDestination[] = [
  {
    slug: "manali",
    name: "Manali",
    region: "himachal",
    country: "Himachal Pradesh",
    summary:
      "Beas valley light, orchard country, and the gateway toward high-pass roads.",
    href: "/destinations/manali",
    imageSrc: unsplashSrc("1506905925346-21bda4d32df4"),
    imageAlt: "Snow-capped peaks above the Manali valley",
    moods: ["adventure", "mountains", "family"],
    mapPosition: { x: 38, y: 42 },
    size: "large",
  },
  {
    slug: "shimla",
    name: "Shimla",
    region: "himachal",
    country: "Himachal Pradesh",
    summary:
      "Ridge walks, cedar air, and a hill capital that rewards an unhurried arrival.",
    href: "/destinations/shimla",
    imageSrc: unsplashSrc("1464822759023-fed622ff2c3b"),
    imageAlt: "Hill station town nestled among mountain ridges",
    moods: ["mountains", "family", "weekend"],
    mapPosition: { x: 52, y: 28 },
    size: "medium",
  },
  {
    slug: "dharamshala",
    name: "Dharamshala",
    region: "himachal",
    country: "Himachal Pradesh",
    summary:
      "Dhauladhar views, monasteries, and a quieter hill pace above Kangra.",
    href: "/destinations/dharamshala",
    imageSrc: unsplashSrc("1500530855697-b586d89ba3ee"),
    imageAlt: "Hillside town with dramatic mountain backdrop",
    moods: ["wellness", "weekend"],
    mapPosition: { x: 28, y: 58 },
    size: "medium",
  },
  {
    slug: "kasol",
    name: "Kasol",
    region: "himachal",
    country: "Himachal Pradesh",
    summary:
      "Parvati valley trails, riverside cafés, and a laid-back mountain rhythm.",
    href: "/destinations/kasol",
    imageSrc: unsplashSrc("1518838418956-3797e078eedb"),
    imageAlt: "Mountain village along a forested river valley",
    moods: ["adventure", "nature", "romantic"],
    mapPosition: { x: 44, y: 52 },
    size: "small",
  },
  {
    slug: "spiti-valley",
    name: "Spiti Valley",
    region: "himachal",
    country: "Himachal Pradesh",
    summary:
      "High-desert passes, ancient monasteries, and landscapes that feel otherworldly.",
    href: "/destinations/spiti-valley",
    imageSrc: unsplashSrc("1519681393784-d120267933ba"),
    imageAlt: "Winding mountain road through arid high-altitude terrain",
    moods: ["adventure", "nature"],
    mapPosition: { x: 62, y: 48 },
    size: "small",
  },
  {
    slug: "dalhousie",
    name: "Dalhousie",
    region: "himachal",
    country: "Himachal Pradesh",
    summary:
      "Colonial charm, pine-covered slopes, and quiet mornings above the plains.",
    href: "/destinations/dalhousie",
    imageSrc: unsplashSrc("1441974231531-c6227db76b6e"),
    imageAlt: "Lush green hills and forest paths in the Western Himalayas",
    moods: ["mountains", "wellness", "romantic"],
    mapPosition: { x: 18, y: 34 },
    size: "small",
  },
  {
    slug: "amritsar",
    name: "Amritsar",
    region: "punjab",
    country: "Punjab",
    summary:
      "Golden Temple evenings, old-city lanes, and a cultural pause on many northbound routes.",
    href: "/destinations/amritsar",
    imageSrc: unsplashSrc("1578662996442-48f60103fc96"),
    imageAlt: "Historic golden temple at dusk",
    moods: ["family", "weekend"],
    mapPosition: { x: 12, y: 72 },
    size: "small",
  },
  {
    slug: "kangra",
    name: "Kangra",
    region: "himachal",
    country: "Himachal Pradesh",
    summary:
      "Fort views, tea country, and a valley that sits naturally on Dharamshala routes.",
    href: "/destinations/kangra",
    imageSrc: unsplashSrc("1469474968028-56623f02e42e"),
    imageAlt: "Green valley stretching toward distant hills",
    moods: ["nature", "weekend"],
    mapPosition: { x: 24, y: 64 },
    size: "small",
  },
  {
    slug: "manikaran",
    name: "Manikaran",
    region: "himachal",
    country: "Himachal Pradesh",
    summary:
      "Hot springs and a riverside pilgrimage town in the Parvati valley.",
    href: "/destinations/manikaran",
    imageSrc: unsplashSrc("1470071459604-3b5ec3a7fe05"),
    imageAlt: "River flowing through a valley town",
    moods: ["wellness", "nature"],
    mapPosition: { x: 46, y: 58 },
    size: "small",
  },
  {
    slug: "atal-tunnel",
    name: "Atal Tunnel",
    region: "himachal",
    country: "Himachal Pradesh",
    summary:
      "A remarkable mountain crossing—best experienced as part of a planned Rohtang-side day.",
    href: "/destinations/atal-tunnel",
    imageSrc: unsplashSrc("1469854523086-cc02fe5d8800"),
    imageAlt: "Mountain road winding through high peaks",
    moods: ["adventure"],
    mapPosition: { x: 40, y: 36 },
    size: "small",
  },
  {
    slug: "sukhna-lake",
    name: "Sukhna Lake",
    region: "chandigarh",
    country: "Chandigarh",
    summary:
      "A still-water promenade—often a gentle start or close to a longer road trip.",
    href: "/destinations/sukhna-lake",
    imageSrc: unsplashSrc("1571896349842-33c89424de2d"),
    imageAlt: "Decorative fountain with flowing water",
    moods: ["family", "romantic"],
    mapPosition: { x: 34, y: 78 },
    size: "small",
  },
  {
    slug: "rock-garden",
    name: "Rock Garden",
    region: "chandigarh",
    country: "Chandigarh",
    summary:
      "Nek Chand's sculpted world—worth a dedicated stop when the itinerary allows time.",
    href: "/destinations/rock-garden",
    imageSrc: unsplashSrc("1441974231531-c6227db76b6e"),
    imageAlt: "Sculpted garden paths and greenery",
    moods: ["family"],
    mapPosition: { x: 30, y: 82 },
    size: "small",
  },
  {
    slug: "rose-garden",
    name: "Rose Garden",
    region: "chandigarh",
    country: "Chandigarh",
    summary:
      "Seasonal colour in the city—best paired with a calm Chandigarh half-day.",
    href: "/destinations/rose-garden",
    imageSrc: unsplashSrc("1501785888041-af3ef285b470"),
    imageAlt: "Rows of roses in a formal garden",
    moods: ["romantic", "weekend"],
    mapPosition: { x: 36, y: 86 },
    size: "small",
  },
  {
    slug: "kullu",
    name: "Kullu",
    region: "himachal",
    country: "Himachal Pradesh",
    summary:
      "Valley orchards, riverside towns, and the classic approach toward Manali.",
    href: "/destinations/kullu",
    imageSrc: unsplashSrc("1504674900247-0877df9cc836"),
    imageAlt: "River valley with forested hills on both sides",
    moods: ["mountains", "nature"],
    mapPosition: { x: 42, y: 46 },
    size: "small",
  },
  {
    slug: "chamba",
    name: "Chamba",
    region: "himachal",
    country: "Himachal Pradesh",
    summary:
      "Ancient temples, Ravi valley light, and a quieter pace off the main tourist trail.",
    href: "/destinations/chamba",
    imageSrc: unsplashSrc("1566073771259-6a8506099945"),
    imageAlt: "Traditional hillside architecture above a valley",
    moods: ["wellness", "weekend"],
    mapPosition: { x: 20, y: 48 },
    size: "small",
  },
  {
    slug: "bir-billing",
    name: "Bir Billing",
    region: "himachal",
    country: "Himachal Pradesh",
    summary:
      "Paragliding skies, monastery walks, and forest trails above Kangra.",
    href: "/destinations/bir-billing",
    imageSrc: unsplashSrc("1513635269975-59663e0ac1ad"),
    imageAlt: "Paragliders above green hills and scattered clouds",
    moods: ["adventure", "mountains"],
    mapPosition: { x: 26, y: 54 },
    size: "small",
  },
  {
    slug: "khajjiar",
    name: "Khajjiar",
    region: "himachal",
    country: "Himachal Pradesh",
    summary:
      "Meadow clearings, cedar forests, and a gentle hill-station pause near Dalhousie.",
    href: "/destinations/khajjiar",
    imageSrc: unsplashSrc("1477959858617-67f85cf4f1df"),
    imageAlt: "Open meadow ringed by pine-covered hills",
    moods: ["nature", "family"],
    mapPosition: { x: 16, y: 40 },
    size: "small",
  },
  {
    slug: "mcleod-ganj",
    name: "McLeod Ganj",
    region: "himachal",
    country: "Himachal Pradesh",
    summary:
      "Tibetan culture, café-lined lanes, and Dhauladhar views above Dharamshala.",
    href: "/destinations/mcleod-ganj",
    imageSrc: unsplashSrc("1558618666-fcd25c85cd64"),
    imageAlt: "Mountain road winding through misty hills",
    moods: ["wellness", "weekend"],
    mapPosition: { x: 30, y: 60 },
    size: "small",
  },
  {
    slug: "solang-valley",
    name: "Solang Valley",
    region: "himachal",
    country: "Himachal Pradesh",
    summary:
      "Snow slopes in winter, zipline skies in summer, and wide Beas-side views above Manali.",
    href: "/destinations/solang-valley",
    imageSrc: unsplashSrc("1528127269322-539801943592"),
    imageAlt: "Snow-covered valley with mountain peaks in the background",
    moods: ["adventure", "mountains"],
    mapPosition: { x: 40, y: 40 },
    size: "small",
  },
  {
    slug: "rohtang-pass",
    name: "Rohtang Pass",
    region: "himachal",
    country: "Himachal Pradesh",
    summary:
      "High pass drama, glacier glimpses, and the classic Manali–Leh road experience.",
    href: "/destinations/rohtang-pass",
    imageSrc: unsplashSrc("1436491865332-7a61a109cc05"),
    imageAlt: "Snow-lined mountain pass road under dramatic clouds",
    moods: ["adventure", "nature"],
    mapPosition: { x: 44, y: 34 },
    size: "small",
  },
  {
    slug: "tosh",
    name: "Tosh",
    region: "himachal",
    country: "Himachal Pradesh",
    summary:
      "A tucked-away Parvati village—forest trails, quiet guesthouses, and unhurried valley days.",
    href: "/destinations/tosh",
    imageSrc: unsplashSrc("144775036306-ba9b990010a5"),
    imageAlt: "Small mountain village nestled in a green valley",
    moods: ["nature", "weekend"],
    mapPosition: { x: 48, y: 56 },
    size: "small",
  },
  {
    slug: "palampur",
    name: "Palampur",
    region: "himachal",
    country: "Himachal Pradesh",
    summary:
      "Tea gardens, Dhauladhar backdrops, and a softer Kangra valley pace.",
    href: "/destinations/palampur",
    imageSrc: unsplashSrc("1500534314209-a25ddb2bd429"),
    imageAlt: "Tea plantations rolling across green hills",
    moods: ["wellness", "nature"],
    mapPosition: { x: 22, y: 62 },
    size: "small",
  },
  {
    slug: "kasauli",
    name: "Kasauli",
    region: "himachal",
    country: "Himachal Pradesh",
    summary:
      "Colonial-era lanes, misty mornings, and an easy weekend escape from the plains.",
    href: "/destinations/kasauli",
    imageSrc: unsplashSrc("1506197605692-6de6c4e8c72a"),
    imageAlt: "Quiet hill road winding through pine forests",
    moods: ["romantic", "weekend"],
    mapPosition: { x: 56, y: 24 },
    size: "small",
  },
  {
    slug: "narkanda",
    name: "Narkanda",
    region: "himachal",
    country: "Himachal Pradesh",
    summary:
      "Apple country, ski-season quiet, and ridge views on the road toward Rampur.",
    href: "/destinations/narkanda",
    imageSrc: unsplashSrc("1483728642387-6a3fb034f977"),
    imageAlt: "Hillside orchards with distant snow peaks",
    moods: ["mountains", "family"],
    mapPosition: { x: 50, y: 32 },
    size: "small",
  },
  {
    slug: "kinnaur",
    name: "Kinnaur",
    region: "himachal",
    country: "Himachal Pradesh",
    summary:
      "Apple valleys, ancient villages, and Sutlej gorge scenery on the Hindustan–Tibet road.",
    href: "/destinations/kinnaur",
    imageSrc: unsplashSrc("1506905925346-21bda4d32df4"),
    imageAlt: "Deep river gorge with terraced hillside villages",
    moods: ["adventure", "nature"],
    mapPosition: { x: 68, y: 44 },
    size: "small",
  },
  {
    slug: "mandi",
    name: "Mandi",
    region: "himachal",
    country: "Himachal Pradesh",
    summary:
      "Temple town character, Beas confluence, and a practical stop between Chandigarh and Kullu.",
    href: "/destinations/mandi",
    imageSrc: unsplashSrc("1470071459604-3b5ec3a7fe05"),
    imageAlt: "River town with hills rising on either side",
    moods: ["weekend", "family"],
    mapPosition: { x: 36, y: 50 },
    size: "small",
  },
  {
    slug: "lahaul",
    name: "Lahaul",
    region: "himachal",
    country: "Himachal Pradesh",
    summary:
      "Beyond the tunnel—barren valleys, Buddhist gompas, and high-altitude stillness.",
    href: "/destinations/lahaul",
    imageSrc: unsplashSrc("1519681393784-d120267933ba"),
    imageAlt: "Arid mountain valley with a winding road",
    moods: ["adventure", "mountains"],
    mapPosition: { x: 58, y: 40 },
    size: "small",
  },
  {
    slug: "malana",
    name: "Malana",
    region: "himachal",
    country: "Himachal Pradesh",
    summary:
      "A secluded Parvati-side village—forest approaches and a distinctly remote mountain feel.",
    href: "/destinations/malana",
    imageSrc: unsplashSrc("1518838418956-3797e078eedb"),
    imageAlt: "Remote hillside settlement above a forested valley",
    moods: ["adventure", "nature"],
    mapPosition: { x: 46, y: 54 },
    size: "small",
  },
];
