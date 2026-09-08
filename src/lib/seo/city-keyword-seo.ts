/** High-volume Semrush targets — used in city meta, H1, keywords & fallbacks when DB SEO is empty. */
export interface PriorityCitySeo {
  primaryKeyword: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  keywords: string[];
}

export const PRIORITY_CITY_SEO: Record<string, PriorityCitySeo> = {
  pune: {
    primaryKeyword: 'bike on rent in pune',
    metaTitle: 'Bike on Rent in Pune — Self-Drive Scooters & Bikes',
    metaDescription:
      'Bike on rent in Pune from ₹299/day. Verified vendors, helmets included, online booking at Pune Station, Hinjewadi & Kothrud — compare live rates on OnnRide.',
    h1: 'Bike on Rent in Pune',
    keywords: [
      'bike on rent in pune',
      'bike rental pune',
      'scooter on rent in pune',
      'self drive bike pune',
      'bike rent pune maharashtra',
      'two wheeler rental pune',
      'OnnRide Pune',
    ],
  },
  delhi: {
    primaryKeyword: 'bike on rent in delhi',
    metaTitle: 'Bike on Rent in Delhi — Self-Drive Scooters & Bikes',
    metaDescription:
      'Bike on rent in Delhi from ₹299/day. Verified vendors, helmets included, online booking at IGI Airport, New Delhi Railway Station & NCR — OnnRide.',
    h1: 'Bike on Rent in Delhi',
    keywords: [
      'bike on rent in delhi',
      'bike rental delhi',
      'scooter on rent in delhi',
      'self drive bike delhi ncr',
      'bike rent delhi',
      'two wheeler rental delhi',
      'OnnRide Delhi',
    ],
  },
  mumbai: {
    primaryKeyword: 'bike on rent in mumbai',
    metaTitle: 'Bike on Rent in Mumbai — Self-Drive Scooters & Bikes',
    metaDescription:
      'Bike on rent in Mumbai from ₹299/day. Verified vendors, helmets included, online booking near CSMT, Andheri & Mumbai Airport — compare rates on OnnRide.',
    h1: 'Bike on Rent in Mumbai',
    keywords: [
      'bike on rent in mumbai',
      'bike rental mumbai',
      'scooter on rent in mumbai',
      'self drive bike mumbai',
      'bike rent mumbai maharashtra',
      'two wheeler rental mumbai',
      'OnnRide Mumbai',
    ],
  },
  jaipur: {
    primaryKeyword: 'bike rent in jaipur',
    metaTitle: 'Bike Rent in Jaipur — Self-Drive Scooters & Bikes',
    metaDescription:
      'Bike rent in Jaipur from ₹299/day. Verified vendors, helmets included, book online near MI Road, Hawa Mahal & Jaipur Railway Station on OnnRide.',
    h1: 'Bike Rent in Jaipur',
    keywords: [
      'bike rent in jaipur',
      'bike on rent in jaipur',
      'bike rental jaipur',
      'scooter rent jaipur',
      'self drive bike jaipur',
      'two wheeler rental jaipur',
      'OnnRide Jaipur',
    ],
  },
  manali: {
    primaryKeyword: 'bike rent in manali',
    metaTitle: 'Bike Rent in Manali — Royal Enfield & Himalayan Rental',
    metaDescription:
      'Bike rent in Manali from ₹499/day. Royal Enfield & Himalayan rentals from verified vendors. Mall Road pickup, helmet included — book on OnnRide.',
    h1: 'Bike Rent in Manali',
    keywords: [
      'bike rent in manali',
      'bike on rent in manali',
      'manali bike rental',
      'royal enfield rent manali',
      'himalayan rent manali',
      'leh ladakh bike rent manali',
      'OnnRide Manali',
    ],
  },
};

export function getPriorityCitySeo(slug: string): PriorityCitySeo | undefined {
  return PRIORITY_CITY_SEO[slug];
}
