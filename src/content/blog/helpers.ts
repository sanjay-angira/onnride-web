import type { BlogContentBlock, BlogFaq, BlogPost } from './types';

export const DEFAULT_AUTHOR = 'Priya Sharma';
export const DEFAULT_AUTHOR_BIO =
  'Priya Sharma is OnnRide\'s Motorcycle Travel Editor — she has ridden across 15+ Indian states and helps renters plan safe, practical two-wheeler trips.';
export const DEFAULT_REVIEWER = 'OnnRide Operations Team';

export function faqs(items: BlogFaq[]): BlogFaq[] {
  return items;
}

export function blocks(...items: BlogContentBlock[]): BlogContentBlock[] {
  return items;
}

export function p(text: string): BlogContentBlock {
  return { type: 'paragraph', text };
}

export function h2(text: string): BlogContentBlock {
  return { type: 'heading', text, level: 2 };
}

export function h3(text: string): BlogContentBlock {
  return { type: 'heading', text, level: 3 };
}

export function list(items: string[]): BlogContentBlock {
  return { type: 'list', items };
}

export function tips(items: string[]): BlogContentBlock {
  return { type: 'expertTips', items };
}

export function mistakes(items: string[]): BlogContentBlock {
  return { type: 'commonMistakes', items };
}

export function rentalFaqs(city: string): BlogFaq[] {
  return [
    {
      q: `How do I rent a bike in ${city} on OnnRide?`,
      a: `Select ${city} as your location, choose pickup and return dates, compare live rates from verified vendors, and pay online. Complete KYC before pickup day.`,
    },
    {
      q: 'Is fuel included in the rental?',
      a: 'Fuel is typically not included. Vendors hand over enough fuel to reach the nearest pump. Return policy varies — confirm via booking chat.',
    },
    {
      q: 'Is helmet included?',
      a: 'Yes — one helmet is included with every OnnRide rental. Carry an extra helmet if riding with a pillion.',
    },
    {
      q: 'Can I extend my rental?',
      a: 'Yes, request an extension via your booking. Vendor or admin approval is required; extra days are charged per pricing rules.',
    },
    {
      q: 'When is my security deposit refunded?',
      a: 'After safe return and vendor inspection with no damage claim, your deposit is released per platform deposit refund settings.',
    },
    {
      q: 'Do I need KYC before booking?',
      a: 'No — you can book and pay first. KYC must be approved before vendor handover and ride start.',
    },
    {
      q: 'Are outstation trips allowed?',
      a: 'Many vendors allow outstation use. Confirm your route and return timing with the vendor via booking chat after payment.',
    },
    {
      q: 'What documents do I need at pickup?',
      a: 'Carry your original driving license and the ID used for KYC. Vendor verifies identity before handover.',
    },
  ];
}

type PostBaseInput = Pick<
  BlogPost,
  | 'slug'
  | 'title'
  | 'excerpt'
  | 'category'
  | 'cluster'
  | 'priority'
  | 'quickAnswer'
  | 'keyTakeaways'
  | 'content'
  | 'faqs'
> &
  Partial<
    Pick<
      BlogPost,
      | 'publishedAt'
      | 'dateModified'
      | 'readTimeMinutes'
      | 'gradient'
      | 'tags'
      | 'relatedCitySlugs'
      | 'relatedBlogSlugs'
      | 'citations'
      | 'featured'
      | 'isPillar'
    >
  >;

export function makePost(input: PostBaseInput): BlogPost {
  return {
    author: DEFAULT_AUTHOR,
    authorBio: DEFAULT_AUTHOR_BIO,
    reviewedBy: DEFAULT_REVIEWER,
    publishedAt: input.publishedAt ?? '2026-01-15',
    dateModified: input.dateModified ?? '2026-06-01',
    readTimeMinutes: input.readTimeMinutes ?? 8,
    gradient: input.gradient ?? 'from-brand-500 to-brand-800',
    tags: input.tags ?? [],
    relatedCitySlugs: input.relatedCitySlugs,
    relatedBlogSlugs: input.relatedBlogSlugs,
    citations: input.citations,
    featured: input.featured,
    isPillar: input.isPillar,
    ...input,
  };
}
