import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { MarketingPageShell } from '@/components/layout/MarketingPageShell';
import { CONTACT } from '@/lib/site-content';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Partner With Us',
  description: 'Partner with OnnRide — list your fleet and earn from self-drive rentals.',
  path: '/list-your-bike',
});

const VENDOR_PERKS = [
  'WhatsApp OTP vendor signup',
  'Fleet & booking dashboard',
  'Earnings, commission & payout tracking',
  'Per-booking chat with customers',
  'Admin-approved vehicle listing',
  'Multi-city expansion as we launch',
];

export default function PartnerWithUsPage() {
  return (
    <MarketingPageShell
      title="Partner with OnnRide"
      subtitle="Join the OnnRide vendor network — built for independent rental shops and fleet owners."
      breadcrumb={[{ label: 'Partner with us' }]}
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-xl font-bold text-surface-900">Why partner with us?</h2>
          <ul className="mt-6 space-y-3">
            {VENDOR_PERKS.map((perk) => (
              <li key={perk} className="flex items-start gap-2 text-sm text-slate-600">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" aria-hidden />
                {perk}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-surface-900 p-8 text-white">
          <h2 className="font-display text-xl font-bold">Start in 3 steps</h2>
          <ol className="mt-6 space-y-4 text-sm text-slate-300">
            <li>
              <strong className="text-white">1.</strong> Register on the vendor portal with WhatsApp OTP
            </li>
            <li>
              <strong className="text-white">2.</strong> Submit KYC documents and add your fleet
            </li>
            <li>
              <strong className="text-white">3.</strong> Go live after admin approval — receive bookings
            </li>
          </ol>
          <Link
            href={CONTACT.vendorPortal}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-600"
          >
            Open vendor portal →
          </Link>
        </div>
      </div>
    </MarketingPageShell>
  );
}
