import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { BlogCard } from '@/components/marketing/BlogCard';
import { getBlogPost } from '@/lib/blog-posts';

const PRIORITY_PREVIEW_SLUGS = [
  'bike-rental-chandigarh-prices-booking',
  'royal-enfield-rental-manali',
  'leh-ladakh-bike-trip-complete-guide',
];

export function BlogPreviewSection() {
  const previewPosts = PRIORITY_PREVIEW_SLUGS.map((slug) => getBlogPost(slug)).filter(
    (post): post is NonNullable<typeof post> => Boolean(post),
  );

  return (
    <section className="home-section bg-white">
      <div className="section-container">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="home-section-label text-brand-600">OnnRide blog</p>
            <h2 className="home-section-title mt-2">Rides, routes & rental tips</h2>
            <p className="home-section-subtitle mt-3 max-w-xl">
              Chandigarh, Manali, Ladakh and beyond — expert guides to plan your next self-drive
              booking.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-xl border border-brand-200 bg-brand-50 px-5 py-2.5 text-sm font-semibold text-brand-700 transition hover:bg-brand-100"
          >
            <BookOpen className="h-4 w-4" aria-hidden />
            View all articles
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {previewPosts.map((post) => (
            <BlogCard key={post.slug} post={post} variant="compact" />
          ))}
        </div>
      </div>
    </section>
  );
}
