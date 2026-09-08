import { cn } from '@/lib/utils';
import { getBookingStatusMeta } from '@/lib/booking-status';

interface BookingStatusBadgeProps {
  status: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'px-2.5 py-0.5 text-[11px]',
  md: 'px-3 py-1 text-xs',
  lg: 'px-4 py-1.5 text-sm',
};

export function BookingStatusBadge({ status, size = 'md', className }: BookingStatusBadgeProps) {
  const meta = getBookingStatusMeta(status);

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-semibold uppercase tracking-wide ring-1 ring-inset',
        meta.badgeClass,
        sizeClasses[size],
        className,
      )}
    >
      <span className={cn('h-1.5 w-1.5 shrink-0 rounded-full', meta.dotClass)} aria-hidden />
      {meta.label}
    </span>
  );
}
