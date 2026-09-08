import type { Metadata } from 'next';
import Link from 'next/link';
import { MarketingPageShell } from '@/components/layout/MarketingPageShell';
import { COMPARE_PAGES } from '@/content/compare';
import { pageMetadata } from '@/lib/seo/metadata';
import { absoluteUrl } from '@/lib/seo/site-url';

export const metadata: Metadata = pageMetadata({
  title: 'OnnRide Comparisons — vs ONN Bikes, Rentrip, Freedo & More',
  description:
    'Independent comparisons of OnnRide vs ONN Bikes, Rentrip, Freedo, and Rentnhop. See who fits your self-drive bike rental trip in India.',
  path: '/compare',
});

export default function CompareHubPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'OnnRide competitor comparisons',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: COMPARE_PAGES.length,
    itemListElement: COMPARE_PAGES.map((page, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: page.h1,
      url: absoluteUrl(`/compare/${page.slug}`),
    })),
  };

  return (
    <MarketingPageShell
      eyebrow="Comparisons"
      title="OnnRide vs other bike rentals"
      subtitle="Honest side-by-side pages for the brands riders search alongside OnnRide — verify live quotes before you book."
      breadcrumb={[{ label: 'Compare' }]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ul className="grid gap-4 sm:grid-cols-2">
        {COMPARE_PAGES.map((page) => (
          <li key={page.slug}>
            <Link
              href={`/compare/${page.slug}`}
              className="block h-full rounded-3xl border border-surface-200 bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card-hover"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                Comparison
              </p>
              <h2 className="mt-2 font-display text-xl font-bold text-surface-900">{page.h1}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{page.metaDescription}</p>
              <span className="mt-4 inline-flex text-sm font-semibold text-brand-700">
                Read comparison →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </MarketingPageShell>
  );
}
