import { HOME_REVIEWS } from '@/constants/homepage';
import { getPlatformReviewStats, type PlatformReviewStats } from '@/lib/api';
import { filterPublicReviews } from '@/lib/seo/seed-review';

export interface ReviewsPageReview {
  id: string;
  authorName: string;
  rating: number;
  reviewText: string;
  city: string;
  vehicleModel?: string | null;
  datePublished?: string;
  source: 'api' | 'curated';
}

export interface ReviewsPageData {
  reviewCount: number;
  averageRating: number;
  includeAggregateRating: boolean;
  reviews: ReviewsPageReview[];
  hasApiReviews: boolean;
}

function fallbackFromHomeReviews(): ReviewsPageData {
  const reviews: ReviewsPageReview[] = HOME_REVIEWS.map((item, index) => ({
    id: `curated-${index}`,
    authorName: item.name,
    rating: item.rating,
    reviewText: item.review,
    city: item.city,
    source: 'curated',
  }));

  return {
    reviewCount: reviews.length,
    averageRating: 4.8,
    includeAggregateRating: false,
    reviews,
    hasApiReviews: false,
  };
}

function fromApi(stats: PlatformReviewStats): ReviewsPageData {
  const withText = filterPublicReviews(stats.topReviews).filter((r) => r.review?.trim());
  const reviews: ReviewsPageReview[] = withText.map((r) => ({
    id: r.id,
    authorName: r.customerName ?? 'OnnRide customer',
    rating: r.rating,
    reviewText: r.review!.trim(),
    city: r.cityName ?? 'India',
    vehicleModel: r.vehicleModel,
    datePublished: r.createdAt,
    source: 'api',
  }));

  if (reviews.length === 0) {
    return fallbackFromHomeReviews();
  }

  return {
    reviewCount: stats.reviewCount,
    averageRating: stats.averageRating,
    includeAggregateRating: stats.includeAggregateRating,
    reviews,
    hasApiReviews: true,
  };
}

export async function getReviewsPageData(): Promise<ReviewsPageData> {
  const stats = await getPlatformReviewStats();
  if (!stats || stats.reviewCount === 0) {
    return fallbackFromHomeReviews();
  }
  return fromApi(stats);
}
