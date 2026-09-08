import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MarketingPageShell } from '@/components/layout/MarketingPageShell';
import {
  getAllCompareSlugs,
  getComparePage,
} from '@/content/compare';
import { CompareArticle } from '@/features/compare/CompareArticle';
import { pageMetadata } from '@/lib/seo/metadata';
import { absoluteUrl } from '@/lib/seo/site-url';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllCompareSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getComparePage(slug);
  if (!page) return { title: 'Comparison not found' };
  return pageMetadata({
    title: page.title,
    description: page.metaDescription,
    path: `/compare/${page.slug}`,
    ogType: 'article',
    modifiedTime: page.updatedAt,
  });
}

export default async function CompareSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getComparePage(slug);
  if (!page) notFound();

  const pageUrl = absoluteUrl(`/compare/${page.slug}`);
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: page.title,
      description: page.metaDescription,
      dateModified: page.updatedAt,
      inLanguage: 'en-IN',
      isPartOf: { '@type': 'WebSite', name: 'OnnRide', url: absoluteUrl('') },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('') },
        { '@type': 'ListItem', position: 2, name: 'Compare', item: absoluteUrl('/compare') },
        { '@type': 'ListItem', position: 3, name: page.h1, item: pageUrl },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    },
  ];

  return (
    <MarketingPageShell
      eyebrow="Comparison"
      title={page.h1}
      subtitle={`Side-by-side look at OnnRide and ${page.competitorName} for self-drive bike rental in India.`}
      breadcrumb={[
        { label: 'Compare', href: '/compare' },
        { label: page.competitorName },
      ]}
    >
      {jsonLd.map((block, index) => (
        <script
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
      <CompareArticle page={page} />
    </MarketingPageShell>
  );
}
