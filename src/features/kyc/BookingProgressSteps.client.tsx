'use client';

import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BookingProgressStepsProps {
  paymentDone: boolean;
  kycStatus?: string | null;
  bookingStatus?: string;
}

const STEPS = [
  { id: 'payment', label: 'Payment' },
  { id: 'kyc', label: 'KYC' },
  { id: 'pickup', label: 'Pickup' },
  { id: 'ride', label: 'Ride' },
  { id: 'return', label: 'Return' },
] as const;

function stepState(
  stepId: (typeof STEPS)[number]['id'],
  paymentDone: boolean,
  kycStatus?: string | null,
  bookingStatus?: string,
): 'done' | 'current' | 'upcoming' {
  const status = bookingStatus ?? '';
  const kycApproved = kycStatus === 'APPROVED';

  if (stepId === 'payment') {
    return paymentDone ? 'done' : 'current';
  }

  if (stepId === 'kyc') {
    if (kycApproved) return 'done';
    if (paymentDone) return 'current';
    return 'upcoming';
  }

  if (stepId === 'pickup') {
    if (['IN_PROGRESS', 'RETURN_REQUESTED', 'COMPLETED'].includes(status)) return 'done';
    if (['READY_FOR_PICKUP', 'CONFIRMED'].includes(status) && kycApproved && paymentDone) {
      return status === 'READY_FOR_PICKUP' ? 'current' : 'upcoming';
    }
    if (status === 'READY_FOR_PICKUP') return 'current';
    return 'upcoming';
  }

  if (stepId === 'ride') {
    if (['RETURN_REQUESTED', 'COMPLETED'].includes(status)) return 'done';
    if (status === 'IN_PROGRESS') return 'current';
    return 'upcoming';
  }

  if (stepId === 'return') {
    if (status === 'COMPLETED') return 'done';
    if (status === 'RETURN_REQUESTED') return 'current';
    if (status === 'IN_PROGRESS') return 'upcoming';
    return 'upcoming';
  }

  return 'upcoming';
}

function stateCaption(state: 'done' | 'current' | 'upcoming') {
  if (state === 'done') return 'Completed';
  if (state === 'current') return 'Pending';
  return 'Upcoming';
}

export function BookingProgressSteps({
  paymentDone,
  kycStatus,
  bookingStatus,
}: BookingProgressStepsProps) {
  return (
    <div className="-mx-1 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <ol className="flex min-w-[36rem] gap-0 sm:min-w-0">
        {STEPS.map((step, index) => {
          const state = stepState(step.id, paymentDone, kycStatus, bookingStatus);
          const isLast = index === STEPS.length - 1;

          return (
            <li key={step.id} className="flex flex-1 items-center">
              <div className="flex min-w-0 flex-col items-center gap-1.5 px-1">
                <div
                  className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 sm:h-10 sm:w-10',
                    state === 'done' &&
                      'border-brand-500 bg-brand-500 text-white shadow-[0_4px_14px_-4px_rgba(249,115,22,0.45)]',
                    state === 'current' &&
                      'border-brand-500 bg-white text-brand-600 shadow-sm ring-4 ring-brand-100/70',
                    state === 'upcoming' &&
                      'border-surface-200 bg-white text-slate-400 shadow-sm',
                  )}
                >
                  {state === 'done' ? (
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
                  ) : state === 'current' ? (
                    <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
                  ) : (
                    <Circle className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
                  )}
                </div>
                <span
                  className={cn(
                    'text-center text-[11px] font-bold sm:text-xs',
                    state === 'done' && 'text-surface-900',
                    state === 'current' && 'text-brand-700',
                    state === 'upcoming' && 'text-slate-500',
                  )}
                >
                  {step.label}
                </span>
                <span
                  className={cn(
                    'text-center text-[10px] font-medium',
                    state === 'done' && 'text-brand-600',
                    state === 'current' && 'text-amber-600',
                    state === 'upcoming' && 'text-slate-400',
                  )}
                >
                  {stateCaption(state)}
                </span>
              </div>
              {!isLast ? (
                <div className="relative mx-0.5 mb-8 h-0.5 flex-1 overflow-hidden rounded-full bg-surface-200">
                  <div
                    className={cn(
                      'absolute inset-y-0 left-0 rounded-full transition-all duration-500',
                      state === 'done' ? 'w-full bg-brand-400' : 'w-0',
                    )}
                    aria-hidden
                  />
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
