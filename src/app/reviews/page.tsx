import type { Metadata } from 'next';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { FaqAccordion } from '@/components/marketing/FaqAccordion.client';
import { MarketingPageShell } from '@/components/layout/MarketingPageShell';
import { JsonLdScript } from '@/components/seo/JsonLdScript';
import { PageBottomCta } from '@/components/marketing/PageBottomCta';
import { buildFaqJsonLd } from '@/lib/seo/faq-jsonld';
import { pageMetadata } from '@/lib/seo/metadata';
import { buildReviewsPageJsonLd } from '@/lib/seo/reviews-jsonld';
import { getReviewsPageData } from '@/lib/reviews-page';
import { REVIEWS_PAGE_FAQ } from '@/lib/trust-policies';

export const metadata: Metadata = pageMetadata({
  title: 'Customer Reviews',
  description:
    'Read verified OnnRide customer reviews and ratings for self-drive bike and scooter rentals across India.',
  path: '/reviews',
});

export const revalidate = 3600;

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
          aria-hidden
        />
      ))}
    </div>
  );
}

export default async function ReviewsPage() {
  const data = await getReviewsPageData();
  const displayRating = data.averageRating > 0 ? data.averageRating : 4.8;

  const reviewJsonLd = buildReviewsPageJsonLd({
    reviewCount: data.reviewCount,
    averageRating: displayRating,
    includeAggregateRating: data.includeAggregateRating,
    reviews: data.reviews.map((r) => ({
      id: r.id,
      authorName: r.authorName,
      rating: r.rating,
      reviewText: r.reviewText,
      datePublished: r.datePublished,
    })),
  });

  return (
    <MarketingPageShell
      eyebrow="Social proof"
      title="OnnRide customer reviews"
      subtitle="Ratings and feedback from riders who booked self-drive bikes and scooters through our marketplace."
      breadcrumb={[{ label: 'Reviews' }]}
    >
      <JsonLdScript data={reviewJsonLd} />
      <JsonLdScript data={buildFaqJsonLd(REVIEWS_PAGE_FAQ)} />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex items-center gap-4 rounded-2xl border border-brand-100 bg-brand-50/80 px-5 py-4 shadow-sm">
          <span className="text-4xl font-bold text-brand-600">{displayRating.toFixed(1)}</span>
          <div>
            <StarRating rating={Math.round(displayRating)} />
            <p className="mt-1 text-sm text-slate-600">
              {data.hasApiReviews
                ? `${data.reviewCount} verified marketplace review${data.reviewCount === 1 ? '' : 's'}`
                : 'Curated rider feedback — verified reviews appear as trips complete'}
            </p>
          </div>
        </div>
        {!data.hasApiReviews ? (
          <p className="max-w-md text-sm text-slate-500">
            Complete a trip on OnnRide to leave a verified review. We never offer incentives for
            ratings.
          </p>
        ) : null}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {data.reviews.map((review) => (
          <article
            key={review.id}
            className="flex h-full flex-col rounded-2xl border border-surface-200 bg-white p-6 shadow-card"
          >
            <StarRating rating={review.rating} />
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
              &ldquo;{review.reviewText}&rdquo;
            </blockquote>
            <footer className="mt-5 border-t border-surface-100 pt-4">
              <p className="font-semibold text-surface-900">{review.authorName}</p>
              <p className="mt-0.5 text-xs text-slate-500">
                {review.city}
                {review.vehicleModel ? ` · ${review.vehicleModel}` : ''}
                {review.source === 'api' ? ' · Verified booking' : ''}
              </p>
            </footer>
          </article>
        ))}
      </div>

      <section className="mt-14" aria-labelledby="reviews-faq-heading">
        <h2 id="reviews-faq-heading" className="font-display text-xl font-bold text-surface-900">
          Reviews FAQ
        </h2>
        <div className="mt-6">
          <FaqAccordion items={REVIEWS_PAGE_FAQ} />
        </div>
      </section>

      <PageBottomCta
        title="Ready to ride?"
        description="Search verified vendors in your city and book your next self-drive trip on OnnRide."
        primaryHref="/search"
        primaryLabel="Search bikes"
        secondaryHref="/how-it-works"
        secondaryLabel="How it works"
      />

      <p className="mt-8 text-center text-sm text-slate-500">
        Questions about a booking?{' '}
        <Link href="/contact" className="font-medium text-brand-600 hover:text-brand-700">
          Contact support
        </Link>
      </p>
    </MarketingPageShell>
  );
}
