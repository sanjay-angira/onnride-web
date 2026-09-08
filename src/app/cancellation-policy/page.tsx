import type { Metadata } from 'next';
import { MarketingPageShell } from '@/components/layout/MarketingPageShell';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Cancellation Policy',
  description: 'OnnRide cancellation and refund policy for self-drive bike rental bookings.',
  path: '/cancellation-policy',
});

export default function CancellationPolicyPage() {
  return (
    <MarketingPageShell
      title="Cancellation & refund policy"
      subtitle="Cancellation and refund rules are set by admin settings and shown at checkout."
      breadcrumb={[{ label: 'Cancellation policy' }]}
    >
      <div className="rounded-2xl border border-surface-200 bg-white p-6 shadow-card">
        <ul className="space-y-4 text-sm text-slate-600">
          <li>
            <strong className="text-surface-900">Before pickup:</strong> Refund percentage depends
            on hours before pickup (full/partial/none windows from admin settings).
          </li>
          <li>
            <strong className="text-surface-900">Payment pending:</strong> Unpaid bookings expire
            automatically per platform timeout.
          </li>
          <li>
            <strong className="text-surface-900">Wallet refund:</strong> Eligible refunds may go
            to OnnRide wallet or Razorpay per admin configuration.
          </li>
          <li>
            <strong className="text-surface-900">Disputes:</strong> Damage or deposit forfeiture
            follows return inspection and admin review.
          </li>
        </ul>
        <p className="mt-6 text-xs text-slate-400">
          Exact percentages live in admin settings (`full_refund_hours`, `partial_refund_hours`,
          `cancellation_fee`) and apply to your booking at cancel time.
        </p>
      </div>
    </MarketingPageShell>
  );
}
