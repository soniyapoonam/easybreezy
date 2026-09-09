/**
 * Curated Unsplash travel photography — verified HTTP 200 URLs at 1920px.
 * Hero/banner images stay local in home.ts.
 */
export function unsplashSrc(photoId: string, width = 1920): string {
  return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=${width}&q=85`;
}

/** Theme-based library — taxi, hill road, hill station, river, fountain, enjoy travel */
const themes = {
  taxi: unsplashSrc("1558618666-fcd25c85cd64"),
  taxiCity: unsplashSrc("1477959858617-67f85cf4f1df"),
  hillRoad: unsplashSrc("1519681393784-d120267933ba"),
  hillRoadScenic: unsplashSrc("1469854523086-cc02fe5d8800"),
  hillTown: unsplashSrc("1500530855697-b586d89ba3ee"),
  hillStation: unsplashSrc("1506905925346-21bda4d32df4"),
  hillStationPeaks: unsplashSrc("1464822759023-fed622ff2c3b"),
  river: unsplashSrc("1470071459604-3b5ec3a7fe05"),
  riverLake: unsplashSrc("1501785888041-af3ef285b470"),
  riverValley: unsplashSrc("1469474968028-56623f02e42e"),
  fountain: unsplashSrc("1571896349842-33c89424de2d"),
  enjoyTravel: unsplashSrc("1528127269322-539801943592"),
  enjoyJourney: unsplashSrc("1436491865332-7a61a109cc05"),
  enjoyFood: unsplashSrc("1504674900247-0877df9cc836"),
  garden: unsplashSrc("1441974231531-c6227db76b6e"),
  temple: unsplashSrc("1578662996442-48f60103fc96"),
  city: unsplashSrc("1513635269975-59663e0ac1ad"),
  beach: unsplashSrc("1566073771259-6a8506099945"),
  spitiValley: unsplashSrc("1519681393784-d120267933ba"),
  himachalVillage: unsplashSrc("1441974231531-c6227db76b6e"),
  dhauladhar: unsplashSrc("1500530855697-b586d89ba3ee"),
  kangraValley: unsplashSrc("1469474968028-56623f02e42e"),
  manaliSnow: unsplashSrc("1506905925346-21bda4d32df4"),
  shimlaSnow: unsplashSrc("1464822759023-fed622ff2c3b"),
  himachalRoad: unsplashSrc("1469854523086-cc02fe5d8800"),
  himachalLake: unsplashSrc("1501785888041-af3ef285b470"),
  adventureTrail: unsplashSrc("1528127269322-539801943592"),
} as const;

export const unsplashTourPackageImages = {
  shimlaGetaway: themes.shimlaSnow,
  manaliAdventure: themes.manaliSnow,
  dharamshalaEscape: themes.dhauladhar,
  kangraValley: themes.kangraValley,
  spitiExpedition: themes.spitiValley,
  himachalExplorer: themes.himachalRoad,
  manaliAtalTunnel: themes.adventureTrail,
  amritsarHeritage: themes.temple,
  experienceHero: themes.riverValley,
} as const;

export const unsplashImages = {
  destinations: {
    shimla: themes.hillStationPeaks,
    manali: themes.hillStation,
    atalTunnel: themes.hillRoad,
    manikaran: themes.river,
    dharamshala: themes.hillTown,
    amritsar: themes.temple,
    sukhnaLake: themes.fountain,
    rockGarden: themes.garden,
    roseGarden: themes.fountain,
    kangra: themes.riverValley,
  },
  services: {
    tourPackage: themes.hillRoadScenic,
    customTrip: themes.enjoyTravel,
    corporateTaxi: themes.taxiCity,
    roundTrip: themes.hillRoad,
    localTaxi: themes.taxi,
    outstationTaxi: themes.taxiCity,
  },
  home: {
    about: themes.taxi,
    whyChoose: themes.hillRoad,
    experienceCta: themes.hillStation,
  },
  servicesPage: {
    intro: themes.hillTown,
    together: themes.enjoyJourney,
    tourPackage: themes.hillRoadScenic,
    customTrip: themes.riverLake,
    corporateTaxi: themes.taxiCity,
    roundTrip: themes.hillRoad,
    localTaxi: themes.taxi,
    outstationTaxi: themes.hillRoadScenic,
  },
  about: {
    enjoyPrimary: unsplashSrc("1469474968028-56623f02e42e", 1200),
    enjoySecondary: unsplashSrc("1566073771259-6a8506099945", 1200),
    whyChoose: themes.hillTown,
  },
  blog: {
    planning: themes.enjoyJourney,
    routes: themes.hillRoadScenic,
    packing: themes.enjoyTravel,
  },
  contact: themes.taxi,
  tones: {
    ridge: themes.hillStationPeaks,
    dusk: themes.river,
    pass: themes.hillRoad,
    lake: themes.riverLake,
    temple: themes.temple,
    forest: themes.garden,
  },
} as const;
