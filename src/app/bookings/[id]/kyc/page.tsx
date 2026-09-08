'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { ProfilePageShell } from '@/components/layout/ProfilePageShell';
import { BookingProgressSteps } from '@/features/kyc/BookingProgressSteps.client';
import { KycUploadForm } from '@/features/kyc/KycUploadForm.client';
import { getKycStatus } from '@/lib/api';
import type { KycStatus } from '@/types';
import { useAppSelector } from '@/store/hooks';

function BookingKycContent() {
  const params = useParams<{ id: string }>();
  const { accessToken } = useAppSelector((state) => state.auth);
  const [kyc, setKyc] = useState<KycStatus | null>(null);

  useEffect(() => {
    if (!accessToken) return;
    void getKycStatus(accessToken).then(setKyc);
  }, [accessToken]);

  if (!accessToken) return null;

  return (
    <ProfilePageShell
      title="Complete KYC"
      subtitle="Upload Aadhaar and driving license — required before pickup."
      breadcrumb={[
        { label: 'Bookings', href: '/bookings' },
        { label: 'Trip', href: `/bookings/${params.id}` },
        { label: 'KYC' },
      ]}
    >
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="rounded-2xl border border-surface-200 bg-white p-5 shadow-card">
          <p className="mb-4 text-sm font-medium text-slate-700">Your booking progress</p>
          <BookingProgressSteps
            paymentDone
            kycStatus={kyc?.status}
            bookingStatus="CONFIRMED"
          />
        </div>

        {kyc?.status !== 'APPROVED' ? (
          <div className="rounded-2xl border border-brand-200 bg-brand-50/60 px-5 py-4 text-sm text-brand-900">
            <strong>Almost there!</strong> Payment is done. Upload clear photos of your Aadhaar and DL.
            Admin review usually takes a few hours.
          </div>
        ) : null}

        <KycUploadForm
          token={accessToken}
          bookingId={params.id}
          onSubmitted={(next) => setKyc(next)}
        />

        <p className="text-center text-sm text-slate-500">
          <Link href={`/bookings/${params.id}`} className="font-medium text-brand-600 hover:underline">
            ← Back to booking details
          </Link>
        </p>
      </div>
    </ProfilePageShell>
  );
}

export default function BookingKycPage() {
  return (
    <AuthGuard>
      <BookingKycContent />
    </AuthGuard>
  );
}
