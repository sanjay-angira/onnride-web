import { absoluteUrl } from '@/lib/seo/site-url';

export interface PlatformReviewForSchema {
  id: string;
  authorName: string;
  rating: number;
  reviewText: string;
  datePublished?: string;
}

export function buildReviewsPageJsonLd(input: {
  reviewCount: number;
  averageRating: number;
  includeAggregateRating: boolean;
  reviews: PlatformReviewForSchema[];
}) {
  const pageUrl = absoluteUrl('/reviews');
  const graph: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      name: 'OnnRide Customer Reviews',
      url: pageUrl,
      description:
        'Verified customer reviews and ratings for OnnRide self-drive bike and scooter rentals across India.',
      isPartOf: { '@id': `${absoluteUrl('')}#website` },
      about: { '@id': `${absoluteUrl('')}#organization` },
    },
  ];

  if (input.includeAggregateRating && input.reviewCount > 0) {
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${absoluteUrl('')}#organization`,
      name: 'OnnRide',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: input.averageRating,
        reviewCount: input.reviewCount,
        bestRating: 5,
        worstRating: 1,
      },
    });
  }

  for (const review of input.reviews.slice(0, 10)) {
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'Review',
      '@id': `${pageUrl}#review-${review.id}`,
      itemReviewed: { '@id': `${absoluteUrl('')}#organization` },
      author: { '@type': 'Person', name: review.authorName },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: review.reviewText,
      ...(review.datePublished ? { datePublished: review.datePublished } : {}),
    });
  }

  return graph;
}
