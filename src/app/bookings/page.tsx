import type { Metadata } from 'next';
import { BookingsList } from '@/features/bookings/BookingsList.client';

export const metadata: Metadata = {
  title: 'My Trips',
  robots: { index: false, follow: false },
};

export default function BookingsPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-surface-50">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-brand-mesh opacity-25"
        aria-hidden
      />
      <div className="section-container relative py-8 sm:py-12">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Your rides</p>
        <h1 className="font-display text-2xl font-bold text-surface-900 sm:text-3xl">My trips</h1>
        <p className="mt-2 text-slate-500">
          Track bookings, view full trip details, complete KYC, and chat with your vendor.
        </p>
        <div className="mt-8">
          <BookingsList />
        </div>
      </div>
    </div>
  );
}
