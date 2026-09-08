import type { Metadata } from 'next';
import Link from 'next/link';
import { MarketingPageShell } from '@/components/layout/MarketingPageShell';
import { pageMetadata } from '@/lib/seo/metadata';
import { RENTAL_POLICY_SECTIONS } from '@/lib/trust-policies';

export const metadata: Metadata = pageMetadata({
  title: 'Rental Policy',
  description:
    'OnnRide self-drive bike rental policy — booking, KYC, pickup, deposit, extensions, and returns on our marketplace.',
  path: '/rental-policy',
});

export default function RentalPolicyPage() {
  return (
    <MarketingPageShell
      title="Rental policy"
      subtitle="How self-drive bike and scooter rentals work on the OnnRide marketplace — for riders and verified vendor partners."
      breadcrumb={[{ label: 'Rental policy' }]}
    >
      <div id="rental-policy-summary" className="max-w-3xl rounded-2xl border border-brand-100 bg-brand-50/60 p-6">
        <p className="text-sm leading-relaxed text-slate-700">
          <strong className="text-surface-900">Quick summary:</strong> OnnRide is a marketplace
          connecting riders with independent rental vendors. You book and pay online, complete KYC
          before pickup, ride per vendor terms, and receive your deposit back after a safe return.
        </p>
      </div>

      <div className="mt-10 space-y-8">
        {RENTAL_POLICY_SECTIONS.map((section) => (
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
        See also:{' '}
        <Link href="/cancellation-policy" className="text-brand-600 hover:text-brand-700">
          Cancellation policy
        </Link>
        {' · '}
        <Link href="/insurance-policy" className="text-brand-600 hover:text-brand-700">
          Insurance policy
        </Link>
        {' · '}
        <Link href="/terms" className="text-brand-600 hover:text-brand-700">
          Terms of service
        </Link>
      </p>
    </MarketingPageShell>
  );
}
