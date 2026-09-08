'use client';

import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import {
  getPickupCountdown,
  shouldShowPickupCountdown,
  type PickupCountdown,
} from '@/lib/booking-countdown';
import { cn } from '@/lib/utils';

interface PickupCountdownBadgeProps {
  pickupDate: string;
  returnDate: string;
  bookingStatus: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const variantStyles: Record<PickupCountdown['variant'], string> = {
  upcoming: 'bg-sky-50 text-sky-900 ring-sky-200',
  soon: 'bg-amber-50 text-amber-900 ring-amber-200',
  now: 'bg-brand-50 text-brand-900 ring-brand-200',
  overdue: 'bg-orange-50 text-orange-900 ring-orange-300',
  active: 'bg-violet-50 text-violet-900 ring-violet-200',
  ended: 'bg-slate-50 text-slate-700 ring-slate-200',
};

export function PickupCountdownBadge({
  pickupDate,
  returnDate,
  bookingStatus,
  size = 'md',
  className,
}: PickupCountdownBadgeProps) {
  const [countdown, setCountdown] = useState<PickupCountdown | null>(() =>
    shouldShowPickupCountdown(bookingStatus)
      ? getPickupCountdown(pickupDate, returnDate, bookingStatus)
      : null,
  );

  useEffect(() => {
    if (!shouldShowPickupCountdown(bookingStatus)) {
      setCountdown(null);
      return;
    }

    function tick() {
      setCountdown(getPickupCountdown(pickupDate, returnDate, bookingStatus));
    }

    tick();
    const interval = window.setInterval(tick, 60_000);
    return () => window.clearInterval(interval);
  }, [pickupDate, returnDate, bookingStatus]);

  if (!countdown) return null;

  return (
    <div
      className={cn(
        'inline-flex items-start gap-2 rounded-xl ring-1 ring-inset',
        variantStyles[countdown.variant],
        size === 'sm' && 'px-2.5 py-1.5 text-xs',
        size === 'md' && 'px-3 py-2 text-sm',
        size === 'lg' && 'px-4 py-3 text-base',
        countdown.urgent && size === 'lg' && 'ring-2',
        className,
      )}
    >
      <Clock
        className={cn(
          'shrink-0',
          size === 'sm' && 'mt-0.5 h-3.5 w-3.5',
          size === 'md' && 'mt-0.5 h-4 w-4',
          size === 'lg' && 'h-5 w-5',
        )}
        aria-hidden
      />
      <div className="min-w-0">
        <p className="font-semibold leading-snug">{countdown.label}</p>
        {countdown.sublabel ? (
          <p
            className={cn(
              'opacity-80',
              size === 'sm' ? 'text-[10px]' : 'text-xs',
            )}
          >
            {countdown.sublabel}
          </p>
        ) : null}
      </div>
    </div>
  );
}
