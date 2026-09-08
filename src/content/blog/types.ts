export type BlogContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string; level?: 2 | 3 }
  | { type: 'list'; items: string[] }
  | { type: 'callout'; title: string; text: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'expertTips'; items: string[] }
  | { type: 'commonMistakes'; items: string[] };

export type BlogCluster =
  | 'rental'
  | 'touring'
  | 'ladakh'
  | 'himachal'
  | 'punjab'
  | 'routes'
  | 'comparisons'
  | 'policy'
  | 'safety';

export type BlogPriority = 'A' | 'B' | 'C' | 'D';

export type BlogFaq = { q: string; a: string };

export type BlogCitation = { label: string; url: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorBio?: string;
  reviewedBy?: string;
  publishedAt: string;
  dateModified?: string;
  readTimeMinutes: number;
  featured?: boolean;
  isPillar?: boolean;
  gradient: string;
  tags: string[];
  cluster: BlogCluster;
  priority: BlogPriority;
  quickAnswer: string;
  keyTakeaways: string[];
  faqs: BlogFaq[];
  relatedCitySlugs?: string[];
  relatedBlogSlugs?: string[];
  citations?: BlogCitation[];
  content: BlogContentBlock[];
};

export const BLOG_CATEGORIES = [
  'All',
  'City guides',
  'Route guides',
  'Rental guide',
  'Travel tips',
  'Comparisons',
  'Safety',
  'Pillar guides',
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];
