'use client';

import { AuthGuard } from '@/components/auth/AuthGuard';
import { BookingDetail } from '@/features/bookings/BookingDetail.client';

export default function BookingDetailPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F4F5F7]">
      <div className="section-container py-5 sm:py-8">
        <AuthGuard>
          <BookingDetail />
        </AuthGuard>
      </div>
    </div>
  );
}
