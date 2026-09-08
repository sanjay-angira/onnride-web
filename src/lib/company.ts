import { CONTACT } from '@/lib/site-content';

/** Canonical company entity — used in schema, About, and llms.txt alignment. */
export const COMPANY = {
  brandName: 'OnnRide',
  legalName: 'OnnRide',
  alternateNames: ['ONNRIDE', 'Onn Ride', 'OnnRide Bike Rental'] as const,
  foundingDate: '2024',
  industry: ['Bike rental', 'Self-drive two-wheeler rental', 'Motorcycle tourism'],
  description:
    "India's self-drive bike and scooter rental marketplace — connecting riders with verified local fleet vendors for online booking across 80+ cities.",
  headquarters: {
    addressLocality: 'Chandigarh',
    addressRegion: 'Chandigarh',
    addressCountry: 'IN',
  },
  primaryMarkets: ['Punjab', 'Himachal Pradesh', 'Delhi NCR', 'Goa', 'Rajasthan'],
  sameAs: [
    CONTACT.social.instagram,
    CONTACT.social.facebook,
    'https://www.linkedin.com/company/onnride',
  ] as const,
  editorialEmail: CONTACT.email,
} as const;
