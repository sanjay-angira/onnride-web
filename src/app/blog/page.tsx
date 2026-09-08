import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Layers } from 'lucide-react';
import { MarketingPageShell } from '@/components/layout/MarketingPageShell';
import { BlogCard } from '@/components/marketing/BlogCard';
import { BlogCategoryFilter } from '@/components/marketing/BlogCategoryFilter.client';
import { PageBottomCta } from '@/components/marketing/PageBottomCta';
import {
  BLOG_CATEGORIES,
  getFeaturedPost,
  getPillarPosts,
  getSortedPosts,
} from '@/lib/blog-posts';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Blog — Rides, Routes & Rental Tips',
  description:
    'OnnRide blog — city guides, route guides, Ladakh & Himachal travel tips, rental policies and bike comparisons for self-drive rentals in India.',
  path: '/blog',
});

export default function BlogPage() {
  const featured = getFeaturedPost();
  const pillars = getPillarPosts();
  const sorted = getSortedPosts().filter((p) => p.slug !== featured.slug);

  return (
    <MarketingPageShell
      eyebrow="OnnRide blog"
      title="Rides, routes & rental wisdom"
      subtitle="Expert guides for Punjab, Himachal, Ladakh and beyond — plan smarter self-drive trips and book verified bikes on OnnRide."
      breadcrumb={[{ label: 'Blog' }]}
    >
      <BlogCard post={featured} variant="featured" />

      {pillars.length > 0 ? (
        <section className="mt-14">
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-brand-600" aria-hidden />
            <h2 className="font-display text-xl font-bold text-surface-900">Pillar guides</h2>
          </div>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            In-depth resources on touring, Ladakh, Punjab and adventure riding — start here for
            topical depth.
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.slice(0, 6).map((post) => (
              <BlogCard key={post.slug} post={post} variant="compact" />
            ))}
          </div>
        </section>
      ) : null}

      <BlogCategoryFilter
        categories={BLOG_CATEGORIES}
        posts={sorted}
        excludeSlug={featured.slug}
      />

      <div className="mt-12 rounded-3xl border border-surface-200 bg-surface-900 p-8 text-white sm:p-10">
        <BookOpen className="h-8 w-8 text-brand-400" aria-hidden />
        <h2 className="mt-4 font-display text-2xl font-bold">{sorted.length + 1}+ guides published</h2>
        <p className="mt-2 max-w-xl text-sm text-slate-400">
          From Chandigarh Tricity to Manali–Leh — browse city money pages and book live inventory
          without login.
        </p>
        <Link
          href="/bike-rental"
          className="mt-6 inline-flex text-sm font-semibold text-brand-400 hover:text-brand-300"
        >
          Browse bike rental cities →
        </Link>
      </div>

      <PageBottomCta
        title="Ready to ride what you read about?"
        description="Pick your city, choose dates and book a verified self-drive two-wheeler on OnnRide."
        primaryHref="/search"
        primaryLabel="Find a ride"
        secondaryHref="/how-it-works"
        secondaryLabel="How it works"
      />
    </MarketingPageShell>
  );
}
