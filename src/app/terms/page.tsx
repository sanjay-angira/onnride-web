import type { Metadata } from 'next';
import { MarketingPageShell } from '@/components/layout/MarketingPageShell';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Terms of Service',
  description: 'OnnRide terms of service for self-drive bike and scooter rental bookings.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <MarketingPageShell title="Terms of service" breadcrumb={[{ label: 'Terms' }]}>
      <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-600">
        <p>
          By using OnnRide you agree to rent vehicles for self-drive use only, present valid
          documents at pickup, and return the vehicle in the same condition subject to normal wear.
        </p>
        <p>
          Rental pricing, deposit amounts, cancellation fees and commission are configured by admin
          settings and vendor agreements — not hardcoded in the platform.
        </p>
        <p>
          Fuel is not included. Learner licenses are not accepted. Outstation use requires vendor
          approval. Detailed terms are provided at checkout and in your booking invoice.
        </p>
      </div>
    </MarketingPageShell>
  );
}
