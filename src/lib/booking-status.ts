export interface BookingStatusMeta {
  label: string;
  description: string;
  badgeClass: string;
  ringClass: string;
  dotClass: string;
}

const STATUS_MAP: Record<string, BookingStatusMeta> = {
  PAYMENT_PENDING: {
    label: 'Payment pending',
    description: 'Complete payment to confirm your booking.',
    badgeClass: 'bg-amber-100 text-amber-900 ring-amber-200',
    ringClass: 'ring-amber-400',
    dotClass: 'bg-amber-500',
  },
  PARTIAL_PAID: {
    label: 'Partially paid',
    description: 'Pay remaining balance before pickup.',
    badgeClass: 'bg-emerald-100 text-emerald-900 ring-emerald-200',
    ringClass: 'ring-emerald-400',
    dotClass: 'bg-emerald-500',
  },
  CONFIRMED: {
    label: 'Confirmed',
    description: 'Booking confirmed — complete KYC before pickup.',
    badgeClass: 'bg-emerald-100 text-emerald-900 ring-emerald-200',
    ringClass: 'ring-emerald-400',
    dotClass: 'bg-emerald-500',
  },
  READY_FOR_PICKUP: {
    label: 'Ready for pickup',
    description: 'Head to the pickup point with your documents.',
    badgeClass: 'bg-sky-100 text-sky-900 ring-sky-200',
    ringClass: 'ring-sky-400',
    dotClass: 'bg-sky-500',
  },
  IN_PROGRESS: {
    label: 'Ride in progress',
    description: 'Enjoy your ride! Return on time to avoid penalties.',
    badgeClass: 'bg-violet-100 text-violet-900 ring-violet-200',
    ringClass: 'ring-violet-400',
    dotClass: 'bg-violet-500',
  },
  RETURN_REQUESTED: {
    label: 'Return requested',
    description: 'Return process started — vendor will inspect the vehicle.',
    badgeClass: 'bg-indigo-100 text-indigo-900 ring-indigo-200',
    ringClass: 'ring-indigo-400',
    dotClass: 'bg-indigo-500',
  },
  COMPLETED: {
    label: 'Completed',
    description: 'Trip completed. Thanks for riding with OnnRide!',
    badgeClass: 'bg-slate-100 text-slate-800 ring-slate-200',
    ringClass: 'ring-slate-300',
    dotClass: 'bg-slate-500',
  },
  CANCELLED: {
    label: 'Cancelled',
    description: 'This booking was cancelled.',
    badgeClass: 'bg-red-100 text-red-900 ring-red-200',
    ringClass: 'ring-red-300',
    dotClass: 'bg-red-500',
  },
  EXPIRED: {
    label: 'Expired',
    description: 'Booking expired without payment or pickup.',
    badgeClass: 'bg-slate-100 text-slate-600 ring-slate-200',
    ringClass: 'ring-slate-300',
    dotClass: 'bg-slate-400',
  },
  OVERDUE: {
    label: 'Overdue',
    description: 'Return overdue — contact vendor immediately.',
    badgeClass: 'bg-red-100 text-red-900 ring-red-200',
    ringClass: 'ring-red-400',
    dotClass: 'bg-red-600',
  },
  DISPUTED: {
    label: 'Disputed',
    description: 'Under review by OnnRide support.',
    badgeClass: 'bg-rose-100 text-rose-900 ring-rose-200',
    ringClass: 'ring-rose-400',
    dotClass: 'bg-rose-500',
  },
};

const DEFAULT_META: BookingStatusMeta = {
  label: 'Processing',
  description: 'Your booking is being processed.',
  badgeClass: 'bg-brand-50 text-brand-800 ring-brand-200',
  ringClass: 'ring-brand-400',
  dotClass: 'bg-brand-500',
};

export function getBookingStatusMeta(status: string): BookingStatusMeta {
  return STATUS_MAP[status] ?? {
    ...DEFAULT_META,
    label: status.replace(/_/g, ' '),
  };
}
