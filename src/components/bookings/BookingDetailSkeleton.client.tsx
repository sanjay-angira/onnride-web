'use client';

import { bookingPanel } from '@/lib/booking-ui';
import { cn } from '@/lib/utils';

export function BookingDetailSkeleton() {
  return (
    <div className="animate-pulse space-y-5 sm:space-y-6" aria-hidden>
      <div className="h-4 w-24 rounded-lg bg-surface-200" />
      <div className={cn(bookingPanel, 'h-52 sm:h-56')} />
      <div className="grid gap-5 lg:grid-cols-3 lg:gap-6">
        <div className="space-y-5 lg:col-span-2">
          <div className={cn(bookingPanel, 'h-64')} />
          <div className={cn(bookingPanel, 'h-48')} />
          <div className={cn(bookingPanel, 'h-72')} />
        </div>
        <div className="space-y-5">
          <div className={cn(bookingPanel, 'h-56')} />
          <div className={cn(bookingPanel, 'h-40')} />
        </div>
      </div>
    </div>
  );
}
