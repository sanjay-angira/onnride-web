'use client';

import Link from 'next/link';
import {
  CheckCircle2,
  FileCheck,
  KeyRound,
  MapPin,
  MessageCircle,
  RotateCcw,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CardContent, CardHeader } from '@/components/ui/Card';
import { bookingPanelElevated, bookingSectionLabel } from '@/lib/booking-ui';
import { cn } from '@/lib/utils';

interface PickupGuideCardProps {
  bookingId: string;
  bookingStatus: string;
  kycStatus?: string | null;
  pickupLabel?: string;
  doorstepDelivery?: boolean;
  deliveryAddress?: string | null;
  extraHelmetCount?: number;
  onOpenChat?: () => void;
}

interface GuideStep {
  id: string;
  title: string;
  detail: string;
  state: 'done' | 'current' | 'upcoming';
  icon: typeof MapPin;
  action?: React.ReactNode;
}

function buildSteps(
  bookingStatus: string,
  kycStatus: string | null | undefined,
  bookingId: string,
  pickupLabel?: string,
  onOpenChat?: () => void,
  doorstepDelivery?: boolean,
  deliveryAddress?: string | null,
  extraHelmetCount?: number,
): GuideStep[] | null {
  const kycApproved = kycStatus === 'APPROVED';
  const hideStatuses = ['CANCELLED', 'EXPIRED', 'PAYMENT_PENDING'];
  if (hideStatuses.includes(bookingStatus)) return null;

  if (bookingStatus === 'COMPLETED') {
    return [
      {
        id: 'done',
        title: 'Trip completed',
        detail: 'Security deposit refund is processed after vendor inspection (usually 2–5 business days).',
        state: 'done',
        icon: CheckCircle2,
      },
    ];
  }

  if (bookingStatus === 'RETURN_REQUESTED') {
    return [
      {
        id: 'return',
        title: 'Vehicle returned',
        detail: 'Vendor is inspecting the bike. You will be notified once the trip is marked complete.',
        state: 'current',
        icon: RotateCcw,
      },
      {
        id: 'deposit',
        title: 'Deposit refund',
        detail: 'Refunded to your original payment method if no damage or extra charges apply.',
        state: 'upcoming',
        icon: Shield,
      },
    ];
  }

  if (bookingStatus === 'IN_PROGRESS') {
    const returnPlace = doorstepDelivery
      ? 'your address'
      : pickupLabel ?? 'the vendor hub';
    return [
      {
        id: 'ride',
        title: 'Enjoy your ride',
        detail: doorstepDelivery
          ? `Return on time at ${returnPlace}. Vendor will collect the vehicle from the same address.`
          : `Return on time at ${returnPlace}. Late return may incur extra charges.`,
        state: 'current',
        icon: KeyRound,
      },
      {
        id: 'return',
        title: 'At return time',
        detail: 'Hand the vehicle back to the vendor with helmet and keys. Wait for return confirmation.',
        state: 'upcoming',
        icon: RotateCcw,
        action: onOpenChat ? (
          <button
            type="button"
            onClick={onOpenChat}
            className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:underline"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            Message vendor about return
          </button>
        ) : null,
      },
    ];
  }

  const steps: GuideStep[] = [];

  if (!kycApproved) {
    steps.push({
      id: 'kyc',
      title: 'Complete KYC',
      detail: 'Upload Aadhaar and driving license — required before the vendor can hand over the vehicle.',
      state: 'current',
      icon: FileCheck,
      action: (
        <Link href={`/bookings/${bookingId}/kyc`}>
          <Button size="sm" className="mt-3 shadow-md">
            Upload documents
          </Button>
        </Link>
      ),
    });
  } else {
    steps.push({
      id: 'kyc',
      title: 'KYC approved',
      detail: 'Your documents are verified. Carry original Aadhaar and DL to pickup.',
      state: 'done',
      icon: FileCheck,
    });
  }

  if (bookingStatus === 'CONFIRMED') {
    steps.push({
      id: 'wait',
      title: 'Wait for vendor ready',
      detail: 'Vendor will mark your booking ready for pickup. Use chat if you need to confirm timing.',
      state: kycApproved ? 'current' : 'upcoming',
      icon: MessageCircle,
      action: onOpenChat ? (
        <button
          type="button"
          onClick={onOpenChat}
          className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:underline"
        >
          Chat with vendor
        </button>
      ) : null,
    });
  }

  if (bookingStatus === 'READY_FOR_PICKUP' || bookingStatus === 'CONFIRMED') {
    const helmetNote =
      (extraHelmetCount ?? 0) > 0
        ? ` Collect ${1 + (extraHelmetCount ?? 0)} helmets (1 included + ${extraHelmetCount} extra).`
        : '';
    steps.push({
      id: 'pickup',
      title: doorstepDelivery ? 'Wait for doorstep delivery' : 'Go to pickup point',
      detail: doorstepDelivery
        ? `Vendor will deliver to ${deliveryAddress ?? 'your address'} at the scheduled time. Keep your DL and booking ID ready.${helmetNote}`
        : pickupLabel
          ? `Reach ${pickupLabel} at your scheduled time with original documents.${helmetNote}`
          : `Reach the pickup hub at your scheduled time with original documents.${helmetNote}`,
      state: bookingStatus === 'READY_FOR_PICKUP' ? 'current' : 'upcoming',
      icon: MapPin,
    });
  }

  if (bookingStatus === 'READY_FOR_PICKUP') {
    const helmetHandover =
      (extraHelmetCount ?? 0) > 0
        ? ` Confirm you receive ${1 + (extraHelmetCount ?? 0)} helmets`
        : ' Collect helmet';
    steps.push({
      id: 'handover',
      title: doorstepDelivery ? 'Delivery handover' : 'At handover',
      detail: doorstepDelivery
        ? `Inspect the vehicle with the vendor at your address, sign the pickup report,${helmetHandover} & keys. Vendor will start your ride in the app.`
        : `Inspect the vehicle with the vendor, sign the pickup report,${helmetHandover} & keys. Vendor will start your ride in the app.`,
      state: 'upcoming',
      icon: KeyRound,
    });
  }

  return steps.length ? steps : null;
}

export function PickupGuideCard({
  bookingId,
  bookingStatus,
  kycStatus,
  pickupLabel,
  doorstepDelivery,
  deliveryAddress,
  extraHelmetCount,
  onOpenChat,
}: PickupGuideCardProps) {
  const steps = buildSteps(
    bookingStatus,
    kycStatus,
    bookingId,
    pickupLabel,
    onOpenChat,
    doorstepDelivery,
    deliveryAddress,
    extraHelmetCount,
  );
  if (!steps?.length) return null;

  const title =
    bookingStatus === 'IN_PROGRESS'
      ? 'During your ride'
      : bookingStatus === 'RETURN_REQUESTED' || bookingStatus === 'COMPLETED'
        ? 'After return'
        : doorstepDelivery
          ? 'What to do before delivery'
          : 'What to do before pickup';

  return (
    <section className={cn(bookingPanelElevated)}>
      <CardHeader className="space-y-1 border-b border-surface-100/80 pb-4">
        <p className={bookingSectionLabel}>Next steps</p>
        <h2 className="font-display text-lg font-bold text-surface-900 sm:text-xl">{title}</h2>
        <p className="text-sm text-slate-500">Follow these steps for a smooth handover and return.</p>
      </CardHeader>
      <CardContent className="pt-5">
        <ol className="space-y-3">
          {steps.map((step) => (
            <li
              key={step.id}
              className={cn(
                'flex gap-4 rounded-2xl border px-4 py-4 transition-all',
                step.state === 'current'
                  ? 'border-brand-100 bg-brand-50/40 shadow-sm ring-1 ring-brand-100/50'
                  : step.state === 'done'
                    ? 'border-emerald-100 bg-emerald-50/30'
                    : 'border-surface-100 bg-surface-50/50',
              )}
            >
              <div
                className={cn(
                  'flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl',
                  step.state === 'done' && 'bg-emerald-500 text-white',
                  step.state === 'current' && 'bg-brand-500 text-white shadow-md',
                  step.state === 'upcoming' && 'bg-white text-slate-400 ring-1 ring-surface-200',
                )}
              >
                {step.state === 'done' ? (
                  <CheckCircle2 className="h-5 w-5" aria-hidden />
                ) : (
                  <step.icon className="h-4 w-4" aria-hidden />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className={cn(
                    'font-semibold',
                    step.state === 'current' ? 'text-surface-900' : 'text-slate-800',
                  )}
                >
                  {step.title}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.detail}</p>
                {step.action}
              </div>
            </li>
          ))}
        </ol>
      </CardContent>
    </section>
  );
}
