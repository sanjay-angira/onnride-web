'use client';

import { AuthGuard } from '@/components/auth/AuthGuard';
import { ProfilePageShell } from '@/components/layout/ProfilePageShell';
import { KycUploadForm } from '@/features/kyc/KycUploadForm.client';
import { useAppSelector } from '@/store/hooks';

function ProfileKycContent() {
  const { accessToken } = useAppSelector((state) => state.auth);
  if (!accessToken) return null;

  return (
    <ProfilePageShell
      title="Complete KYC"
      subtitle="Upload Aadhaar and driving license for admin review."
      breadcrumb={[
        { label: 'Profile', href: '/profile' },
        { label: 'KYC' },
      ]}
    >
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          You can book and pay without approved KYC. <strong>Pickup is blocked</strong> until status
          is <strong>APPROVED</strong>.
        </div>
        <KycUploadForm token={accessToken} />
      </div>
    </ProfilePageShell>
  );
}

export default function KycPage() {
  return (
    <AuthGuard>
      <ProfileKycContent />
    </AuthGuard>
  );
}
