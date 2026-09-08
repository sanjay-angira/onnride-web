/** High-volume national keywords — homepage, hub pages, JSON-LD & city fallbacks. */
export const CORE_BIKE_RENTAL_KEYWORDS = [
  'bike rental near me',
  'bike rentals near me',
  'bike rental',
  'bike rentals',
  'self drive bike rental',
  'self-drive bike rental service',
  'bike on rent',
  'bike on rent near me',
  'scooty on rent',
  'rent bike online',
  'bike rental India',
] as const;

export function cityNearMeKeywords(cityName: string): string[] {
  const city = cityName.toLowerCase();
  return [
    `bike rental near me ${city}`,
    `bike rentals near me ${city}`,
    `bike on rent near me ${city}`,
    `bike on rent in ${city}`,
    `bike rental ${city}`,
    `bike rentals ${city}`,
    `self drive bike rental ${city}`,
  ];
}

export function mergeKeywords(...lists: string[][]): string[] {
  return [...new Set(lists.flat())];
}

/** Default meta for homepage — targets top-volume phrases naturally. */
export const HOME_PAGE_SEO = {
  title: 'Bike Rental Near Me | Self Drive Bike on Rent | OnnRide',
  description:
    'Bike rental near me from ₹299/day. Self-drive bike on rent in 80+ cities — verified vendors, helmets included, book online on OnnRide.',
  ogTitle: 'Bike Rental Near Me — Book Self-Drive Bikes from ₹299/Day',
  ogDescription:
    'Scooters, commuters & Royal Enfield from verified vendors across India. Helmet included · 24/7 support · instant online booking.',
} as const;

/** Bike rental hub `/bike-rental` */
export const BIKE_RENTAL_HUB_SEO = {
  title: 'Bike Rental & Bike Rentals in India | Self Drive Bike on Rent',
  description:
    'Browse bike rental and bike rentals in 80+ Indian cities. Self-drive bike on rent from verified vendors — compare live rates, helmets included, book online.',
  h1: 'Bike Rental & Bike Rentals Across India',
} as const;

/** Search hub `/search` (no query params — indexable) */
export const SEARCH_HUB_SEO = {
  title: 'Find Bike Rental Near Me | Search Bike on Rent',
  description:
    'Search bike rental near me by city and dates. Compare self-drive bike rentals and bike on rent from verified vendors — instant online booking on OnnRide.',
} as const;
