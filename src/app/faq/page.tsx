import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, Fuel, HelpCircle, Shield, Wallet } from 'lucide-react';
import { JsonLdScript } from '@/components/seo/JsonLdScript';
import { MarketingPageShell } from '@/components/layout/MarketingPageShell';
import { FaqAccordion } from '@/components/marketing/FaqAccordion.client';
import { PageBottomCta } from '@/components/marketing/PageBottomCta';
import { buildFaqJsonLd } from '@/lib/seo/faq-jsonld';
import { pageMetadata } from '@/lib/seo/metadata';
import { FAQ_ITEMS } from '@/lib/site-content';

export const metadata: Metadata = pageMetadata({
  title: 'FAQ — Self-Drive Bike Rental',
  description:
    'Frequently asked questions about self-drive bike rental on OnnRide — documents, deposit, fuel, cancellation and pickup.',
  path: '/faq',
});

const FAQ_CATEGORIES = [
  { icon: FileText, label: 'Documents & KYC', count: 2 },
  { icon: Wallet, label: 'Payments & deposit', count: 3 },
  { icon: Fuel, label: 'Fuel & policies', count: 2 },
  { icon: Shield, label: 'Safety & support', count: 2 },
];

export default function FaqPage() {
  return (
    <>
      <JsonLdScript data={buildFaqJsonLd(FAQ_ITEMS)} />
      <MarketingPageShell
      eyebrow="Help & support"
      title="Frequently asked questions"
      subtitle="Documents, deposit, fuel, cancellation and pickup — everything before you book."
      breadcrumb={[{ label: 'FAQ' }]}
    >
      <div className="grid gap-10 lg:grid-cols-12">
        <aside className="lg:col-span-4">
          <div className="sticky top-24 space-y-5">
            <div className="rounded-3xl border border-surface-200 bg-white p-6 shadow-card">
              <h2 className="font-display text-lg font-bold text-surface-900">Quick topics</h2>
              <ul className="mt-4 space-y-3">
                {FAQ_CATEGORIES.map((cat) => (
                  <li
                    key={cat.label}
                    className="flex items-center gap-3 rounded-xl bg-surface-50 px-4 py-3 text-sm"
                  >
                    <cat.icon className="h-5 w-5 text-brand-500" aria-hidden />
                    <span className="font-medium text-surface-900">{cat.label}</span>
                    <span className="ml-auto rounded-full bg-brand-100 px-2 py-0.5 text-xs font-semibold text-brand-700">
                      {cat.count}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl bg-surface-900 p-6 text-white">
              <HelpCircle className="h-8 w-8 text-brand-400" aria-hidden />
              <h2 className="mt-4 font-display text-lg font-bold">Still unsure?</h2>
              <p className="mt-2 text-sm text-slate-400">
                Visit our help center or contact support before booking.
              </p>
              <Link
                href="/help"
                className="mt-4 inline-flex text-sm font-semibold text-brand-400 hover:text-brand-300"
              >
                Go to help center →
              </Link>
            </div>
          </div>
        </aside>

        <div className="lg:col-span-8">
          <FaqAccordion items={FAQ_ITEMS} variant="brand" />
        </div>
      </div>

      <PageBottomCta
        title="Got your answers?"
        description="Search available bikes in your city and book in minutes."
        primaryHref="/search"
        primaryLabel="Start booking"
        secondaryHref="/contact"
        secondaryLabel="Contact us"
      />
    </MarketingPageShell>
    </>
  );
}
