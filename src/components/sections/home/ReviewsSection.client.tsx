'use client';

import Link from 'next/link';
import { RemoteImage } from '@/components/ui/RemoteImage';
import { Quote, Star } from 'lucide-react';
import { FadeInView } from '@/components/motion/FadeInView.client';
import { CardCarousel } from '@/components/ui/CardCarousel.client';
import { HOME_REVIEWS } from '@/constants/homepage';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-border'}`}
          aria-hidden
        />
      ))}
    </div>
  );
}

export function ReviewsSection() {
  return (
    <section aria-labelledby="reviews-heading" className="home-section bg-white">
      <div className="section-container">
        <FadeInView className="home-section-header">
          <p className="home-section-label">Reviews</p>
          <h2 id="reviews-heading" className="home-section-title mt-3">
            What Our Customers Say
          </h2>
          <p className="home-section-subtitle mt-4">
            Real experiences from riders who trust OnnRide for daily commutes, weekend trips &
            outstation adventures.{' '}
            <Link href="/reviews" className="font-semibold text-brand-600 hover:text-brand-700">
              View all reviews →
            </Link>
          </p>
        </FadeInView>

        <FadeInView className="mt-8 flex justify-center sm:mt-10">
          <div className="inline-flex items-center gap-4 rounded-2xl border border-brand-100 bg-brand-50/80 px-5 py-3 shadow-sm ring-1 ring-brand-100">
            <span className="text-3xl font-bold text-brand-600">4.8</span>
            <div>
              <StarRating rating={5} />
              <p className="text-xs text-secondary">Average from verified riders</p>
            </div>
          </div>
        </FadeInView>

        <FadeInView className="mt-10 sm:mt-12">
          <CardCarousel ariaLabel="Customer reviews">
            {HOME_REVIEWS.map((review) => (
              <article key={review.name} className="premium-card relative flex h-full flex-col p-6">
                <Quote className="absolute right-5 top-5 h-8 w-8 text-brand-100" aria-hidden />
                <StarRating rating={review.rating} />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-secondary">
                  &ldquo;{review.review}&rdquo;
                </blockquote>
                <footer className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-white ring-offset-1 ring-offset-brand-50">
                    <RemoteImage
                      src={review.avatar}
                      alt={`${review.name}, OnnRide customer from ${review.city}`}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-primary">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.city}</p>
                  </div>
                </footer>
              </article>
            ))}
          </CardCarousel>
        </FadeInView>
      </div>
    </section>
  );
}
