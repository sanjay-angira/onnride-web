import type { Metadata } from 'next';
import { absoluteUrl } from '@/lib/seo/site-url';

const SITE_NAME = 'OnnRide';
const SITE_ALTERNATE_NAMES = ['ONNRIDE', 'OnnRide Bike Rental', 'Onn Ride'] as const;
const DEFAULT_OG = '/opengraph-image';

export interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  noindex?: boolean;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
}

export function pageMetadata(input: PageMetadataInput): Metadata {
  const url = absoluteUrl(input.path);
  const ogImage = input.ogImage ?? DEFAULT_OG;
  const ogTitle = input.ogTitle ?? input.title;
  const ogDescription = input.ogDescription ?? input.description;

  return {
    // absolute avoids layout `title.template` doubling brand (e.g. "… | OnnRide | OnnRide")
    title: { absolute: input.title },
    description: input.description,
    alternates: { canonical: url },
    robots: input.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url,
      siteName: SITE_NAME,
      locale: 'en_IN',
      type: input.ogType ?? 'website',
      ...(input.publishedTime ? { publishedTime: input.publishedTime } : {}),
      ...(input.modifiedTime ? { modifiedTime: input.modifiedTime } : {}),
      ...(input.authors?.length ? { authors: input.authors } : {}),
      images: [{ url: ogImage, width: 1200, height: 630, alt: ogTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [ogImage],
    },
  };
}

export { SITE_ALTERNATE_NAMES, SITE_NAME };
