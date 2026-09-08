import type { Metadata } from 'next';
import { MarketingPageShell } from '@/components/layout/MarketingPageShell';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Privacy Policy',
  description: 'OnnRide privacy policy — how we handle your data, KYC documents and payments.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <MarketingPageShell title="Privacy policy" breadcrumb={[{ label: 'Privacy' }]}>
      <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-600">
        <p>
          OnnRide collects phone number, booking details and KYC documents to facilitate rentals
          and comply with regulatory requirements. Documents are stored securely on AWS S3.
        </p>
        <p>
          We use your mobile number for WhatsApp OTP authentication and booking notifications.
          Payment data is processed by Razorpay — we do not store card or UPI credentials.
        </p>
        <p>
          You may request account data review via support. KYC images are masked in API responses
          where possible.
        </p>
      </div>
    </MarketingPageShell>
  );
}
