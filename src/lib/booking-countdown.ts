const UPCOMING_STATUSES = new Set([
  'PAYMENT_PENDING',
  'PARTIAL_PAID',
  'CONFIRMED',
  'READY_FOR_PICKUP',
]);

const ACTIVE_STATUSES = new Set(['IN_PROGRESS', 'RETURN_REQUESTED']);

export interface PickupCountdown {
  label: string;
  sublabel?: string;
  urgent: boolean;
  variant: 'upcoming' | 'soon' | 'now' | 'overdue' | 'active' | 'ended';
}

export function shouldShowPickupCountdown(status: string): boolean {
  return UPCOMING_STATUSES.has(status) || ACTIVE_STATUSES.has(status);
}

export function getPickupCountdown(
  pickupIso: string,
  returnIso: string,
  status: string,
  now = new Date(),
): PickupCountdown | null {
  if (!shouldShowPickupCountdown(status)) return null;

  const pickup = new Date(pickupIso);
  const returnAt = new Date(returnIso);
  if (Number.isNaN(pickup.getTime())) return null;

  if (status === 'IN_PROGRESS' || status === 'RETURN_REQUESTED') {
    if (!Number.isNaN(returnAt.getTime())) {
      const untilReturn = returnAt.getTime() - now.getTime();
      if (untilReturn > 0) {
        return {
          label: `Return in ${formatDuration(untilReturn)}`,
          sublabel: 'Ride in progress',
          urgent: untilReturn < 2 * 60 * 60 * 1000,
          variant: 'active',
        };
      }
      return {
        label: 'Return due now',
        sublabel: 'Ride in progress',
        urgent: true,
        variant: 'overdue',
      };
    }
    return {
      label: 'Ride in progress',
      urgent: false,
      variant: 'active',
    };
  }

  const diffMs = pickup.getTime() - now.getTime();

  if (diffMs <= 0) {
    const overdue = Math.abs(diffMs);
    return {
      label: overdue < 60 * 60 * 1000 ? 'Pickup now' : 'Pickup window open',
      sublabel: 'Your pickup time has arrived',
      urgent: true,
      variant: 'overdue',
    };
  }

  const duration = formatDuration(diffMs);
  const urgent = diffMs < 2 * 60 * 60 * 1000;
  const soon = diffMs < 24 * 60 * 60 * 1000;

  if (diffMs < 5 * 60 * 1000) {
    return {
      label: 'Starting very soon',
      sublabel: formatDuration(diffMs),
      urgent: true,
      variant: 'now',
    };
  }

  return {
    label: `Ride starts in ${duration}`,
    sublabel: soon ? 'Get your documents ready' : undefined,
    urgent,
    variant: urgent ? 'soon' : 'upcoming',
  };
}

function formatDuration(ms: number): string {
  const totalMins = Math.max(0, Math.floor(ms / 60_000));
  const days = Math.floor(totalMins / (60 * 24));
  const hours = Math.floor((totalMins % (60 * 24)) / 60);
  const mins = totalMins % 60;

  const parts: string[] = [];
  if (days > 0) parts.push(`${days} day${days === 1 ? '' : 's'}`);
  if (hours > 0) parts.push(`${hours} hr${hours === 1 ? '' : 's'}`);
  if (mins > 0 && days === 0) parts.push(`${mins} min`);

  return parts.length ? parts.join(' ') : 'under 1 min';
}
