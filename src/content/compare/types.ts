export type CompareCell = 'yes' | 'no' | 'partial' | string;

export type CompareRow = {
  feature: string;
  onnride: CompareCell;
  competitor: CompareCell;
};

export type CompareFaq = { q: string; a: string };

export type ComparePage = {
  slug: string;
  competitorName: string;
  competitorWebsite: string;
  title: string;
  metaDescription: string;
  h1: string;
  /** Self-contained AEO answer ~140 words target */
  quickAnswer: string;
  updatedAt: string;
  verdict: string;
  bestForOnnRide: string[];
  bestForCompetitor: string[];
  rows: CompareRow[];
  sections: Array<{ heading: string; body: string[] }>;
  faqs: CompareFaq[];
  relatedCitySlugs: string[];
  relatedCompareSlugs: string[];
};
