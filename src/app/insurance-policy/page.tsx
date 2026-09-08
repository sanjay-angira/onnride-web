import type { Metadata } from 'next';
import Link from 'next/link';
import { MarketingPageShell } from '@/components/layout/MarketingPageShell';
import { pageMetadata } from '@/lib/seo/metadata';
import { INSURANCE_POLICY_SECTIONS } from '@/lib/trust-policies';

export const metadata: Metadata = pageMetadata({
  title: 'Insurance Policy',
  description:
    'OnnRide insurance and liability guidance for self-drive bike rentals — vendor coverage, rider responsibilities, and travel recommendations.',
  path: '/insurance-policy',
});

export default function InsurancePolicyPage() {
  return (
    <MarketingPageShell
      title="Insurance & liability"
      subtitle="What riders should know about insurance, damage, and liability when renting through OnnRide vendor partners."
      breadcrumb={[{ label: 'Insurance policy' }]}
    >
      <div id="insurance-policy-summary" className="max-w-3xl rounded-2xl border border-surface-200 bg-surface-50 p-6">
        <p className="text-sm leading-relaxed text-slate-700">
          <strong className="text-surface-900">Quick summary:</strong> Vehicles on OnnRide are owned
          and insured by independent vendors. Riders must hold a valid licence, follow agreed routes,
          and report incidents promptly. OnnRide does not sell insurance — consider personal travel
          cover for high-risk tours.
        </p>
      </div>

      <div className="mt-10 space-y-8">
        {INSURANCE_POLICY_SECTIONS.map((section) => (
          <section
            key={section.title}
            className="rounded-2xl border border-surface-200 bg-white p-6 shadow-card"
          >
            <h2 className="font-display text-lg font-bold text-surface-900">{section.title}</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
              {section.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="mt-10 text-sm text-slate-500">
        Related:{' '}
        <Link href="/rental-policy" className="text-brand-600 hover:text-brand-700">
          Rental policy
        </Link>
        {' · '}
        <Link href="/faq" className="text-brand-600 hover:text-brand-700">
          FAQ
        </Link>
        {' · '}
        <Link href="/contact" className="text-brand-600 hover:text-brand-700">
          Contact support
        </Link>
      </p>
    </MarketingPageShell>
  );
}
