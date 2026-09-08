import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Search, Shield, Sparkles } from 'lucide-react';
import { getLocations } from '@/lib/api';
import { getPillarPosts } from '@/lib/blog-posts';
import { bikeRentalCityPath } from '@/lib/bike-rental-paths';
import { BIKE_RENTAL_HUB_SEO } from '@/lib/seo/primary-keywords';
import { pageMetadata } from '@/lib/seo/metadata';

export const revalidate = 3600;

const TIER1_SLUGS = [
  'goa',
  'delhi',
  'bengaluru',
  'chandigarh',
  'mumbai',
  'pune',
  'manali',
  'shimla',
  'jaipur',
  'hyderabad',
  'chennai',
  'amritsar',
];

export const metadata: Metadata = pageMetadata({
  title: BIKE_RENTAL_HUB_SEO.title,
  description: BIKE_RENTAL_HUB_SEO.description,
  path: '/bike-rental',
});

export default async function BikeRentalHubPage() {
  const locations = await getLocations();
  const pillars = getPillarPosts().slice(0, 4);

  const tier1 = TIER1_SLUGS.map((slug) => locations.find((l) => l.slug === slug)).filter(
    (l): l is NonNullable<typeof l> => Boolean(l),
  );

  const byState = locations.reduce<Record<string, typeof locations>>((acc, loc) => {
    const key = loc.state ?? 'India';
    if (!acc[key]) acc[key] = [];
    acc[key].push(loc);
    return acc;
  }, {});

  const stateKeys = Object.keys(byState).sort();

  return (
    <div className="section-container py-12">
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-500">
        <Link href="/" className="hover:text-brand-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">Bike rental</span>
      </nav>

      <h1 className="font-display text-4xl font-bold text-surface-900">
        {BIKE_RENTAL_HUB_SEO.h1}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-slate-600">
        Self-drive bike rental and bike on rent in {locations.length}+ cities. Compare bike rentals
        from verified vendors — pick your city, check live rates, and book online.
      </p>

      <section className="mt-12 rounded-3xl border border-surface-200 bg-surface-50 p-8">
        <h2 className="font-display text-xl font-bold text-surface-900">How OnnRide works</h2>
        <ol className="mt-6 grid gap-6 sm:grid-cols-3">
          <li className="flex gap-4">
            <Search className="h-8 w-8 shrink-0 text-brand-500" aria-hidden />
            <div>
              <p className="font-semibold text-surface-900">1. Search & compare</p>
              <p className="mt-1 text-sm text-slate-600">
                Select city and dates — see live daily rates and deposit before checkout.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <Shield className="h-8 w-8 shrink-0 text-brand-500" aria-hidden />
            <div>
              <p className="font-semibold text-surface-900">2. Book & pay online</p>
              <p className="mt-1 text-sm text-slate-600">
                OTP at checkout, Razorpay payment, KYC before pickup.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <MapPin className="h-8 w-8 shrink-0 text-brand-500" aria-hidden />
            <div>
              <p className="font-semibold text-surface-900">3. Pick up & ride</p>
              <p className="mt-1 text-sm text-slate-600">
                Vendor handover with inspection — chat for timing and route tips.
              </p>
            </div>
          </li>
        </ol>
      </section>

      {tier1.length > 0 ? (
        <section className="mt-12">
          <h2 className="font-display text-xl font-bold text-surface-900">Popular cities</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {tier1.map((loc) => (
              <li key={loc.id}>
                <Link
                  href={bikeRentalCityPath(loc.slug)}
                  className="flex items-center gap-2 rounded-xl border border-brand-200 bg-brand-50/50 px-4 py-3 text-sm font-medium text-brand-800 shadow-sm transition hover:border-brand-400"
                >
                  <MapPin className="h-4 w-4 shrink-0 text-brand-500" aria-hidden />
                  {loc.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {pillars.length > 0 ? (
        <section className="mt-12">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-surface-900">
            <Sparkles className="h-5 w-5 text-brand-500" aria-hidden />
            Planning guides
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {pillars.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block rounded-xl border border-surface-200 bg-white px-4 py-4 text-sm shadow-sm transition hover:border-brand-300"
                >
                  <p className="font-semibold text-surface-900">{post.title}</p>
                  <p className="mt-1 line-clamp-2 text-slate-600">{post.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="mt-12 space-y-10">
        {stateKeys.map((state) => (
          <section key={state}>
            <h2 className="font-display text-xl font-bold text-surface-900">{state}</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {byState[state].map((loc) => (
                <li key={loc.id}>
                  <Link
                    href={bikeRentalCityPath(loc.slug)}
                    className="flex items-center gap-2 rounded-xl border border-surface-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-brand-300 hover:text-brand-700"
                  >
                    <MapPin className="h-4 w-4 shrink-0 text-brand-500" aria-hidden />
                    {loc.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
