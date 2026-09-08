export const RENTAL_OPEN_HOUR = 9;
export const RENTAL_CLOSE_HOUR = 21;
export const DEFAULT_PICKUP_TIME = '09:00';
export const DEFAULT_RETURN_TIME = '21:00';
export const RENTAL_TIMEZONE = 'Asia/Kolkata';

export function todayISO(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: RENTAL_TIMEZONE }).format(new Date());
}

/** Latest bookable calendar date (1 year ahead, IST). */
export function maxBookingDateISO(): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return new Intl.DateTimeFormat('en-CA', { timeZone: RENTAL_TIMEZONE }).format(d);
}

export function addDaysISO(date: string, days: number): string {
  const base = new Date(`${date}T12:00:00+05:30`);
  base.setDate(base.getDate() + days);
  return new Intl.DateTimeFormat('en-CA', { timeZone: RENTAL_TIMEZONE }).format(base);
}

export function getRentalTimeOptions(): { value: string; label: string }[] {
  const options: { value: string; label: string }[] = [];
  for (let hour = RENTAL_OPEN_HOUR; hour <= RENTAL_CLOSE_HOUR; hour += 1) {
    const value = `${String(hour).padStart(2, '0')}:00`;
    const label = new Intl.DateTimeFormat('en-IN', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: RENTAL_TIMEZONE,
    }).format(new Date(`2000-01-01T${value}:00+05:30`));
    options.push({ value, label });
  }
  return options;
}

export function toRentalIso(date: string, time: string = DEFAULT_PICKUP_TIME): string {
  return `${date}T${time}:00+05:30`;
}

/** Value for `<input type="datetime-local" />` — `YYYY-MM-DDTHH:mm` */
export function toDateTimeLocalValue(date: string, time: string = DEFAULT_PICKUP_TIME): string {
  return `${date}T${time}`;
}

export function splitDateTimeLocalValue(value: string): { date: string; time: string } {
  const [date, rawTime] = value.split('T');
  const time = rawTime?.slice(0, 5) ?? DEFAULT_PICKUP_TIME;
  return { date: date ?? '', time };
}

export function normalizeDateTimeLocal(value: string): {
  value: string;
  date: string;
  time: string;
} {
  const { date, time } = splitDateTimeLocalValue(value);
  if (!date) {
    return { value: '', date: '', time: DEFAULT_PICKUP_TIME };
  }

  let hour = parseInt(time.split(':')[0] ?? `${RENTAL_OPEN_HOUR}`, 10);
  if (Number.isNaN(hour)) hour = RENTAL_OPEN_HOUR;
  hour = Math.min(RENTAL_CLOSE_HOUR, Math.max(RENTAL_OPEN_HOUR, hour));

  const normalizedTime = `${String(hour).padStart(2, '0')}:00`;
  return {
    value: `${date}T${normalizedTime}`,
    date,
    time: normalizedTime,
  };
}

export function rentalWindowBounds(date: string) {
  return {
    min: `${date}T${DEFAULT_PICKUP_TIME}`,
    max: `${date}T${DEFAULT_RETURN_TIME}`,
  };
}

export function isRentalHourAllowed(time: string): boolean {
  const hour = parseInt(time.split(':')[0] ?? '-1', 10);
  return hour >= RENTAL_OPEN_HOUR && hour <= RENTAL_CLOSE_HOUR;
}

export function formatDateTime(iso: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: RENTAL_TIMEZONE,
  }).format(new Date(iso));
}

export function formatRentalSchedule(
  date: string,
  time: string = DEFAULT_PICKUP_TIME,
): string {
  return formatDateTime(toRentalIso(date, time));
}

/** Date only — e.g. "14 Jun 2026" */
export function formatRentalDate(date: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: RENTAL_TIMEZONE,
  }).format(new Date(`${date}T12:00:00+05:30`));
}

/** Time only — e.g. "9:00 AM" */
export function formatRentalTime(time: string = DEFAULT_PICKUP_TIME): string {
  return new Intl.DateTimeFormat('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: RENTAL_TIMEZONE,
  }).format(new Date(`2000-01-01T${time}:00+05:30`));
}

export function validateRentalRange(
  pickupDate: string,
  pickupTime: string,
  returnDate: string,
  returnTime: string,
): string | null {
  const pickup = new Date(toRentalIso(pickupDate, pickupTime));
  const ret = new Date(toRentalIso(returnDate, returnTime));
  if (Number.isNaN(pickup.getTime()) || Number.isNaN(ret.getTime())) {
    return 'Invalid date or time.';
  }
  if (!isRentalHourAllowed(pickupTime) || !isRentalHourAllowed(returnTime)) {
    return 'Time must be between 9 AM and 9 PM.';
  }
  if (ret.getTime() <= pickup.getTime()) {
    return 'Return must be after pickup (9 AM – 9 PM).';
  }
  return null;
}

export function formatRentalDuration(
  pickupDate: string,
  pickupTime: string,
  returnDate: string,
  returnTime: string,
): string {
  const pickup = new Date(toRentalIso(pickupDate, pickupTime));
  const ret = new Date(toRentalIso(returnDate, returnTime));
  const totalHours = Math.max(0, Math.round((ret.getTime() - pickup.getTime()) / (1000 * 60 * 60)));
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;

  if (days === 0) return `${totalHours} hr${totalHours === 1 ? '' : 's'}`;
  if (hours === 0) return `${days} day${days === 1 ? '' : 's'}`;
  return `${days} day${days === 1 ? '' : 's'}, ${hours} hr${hours === 1 ? '' : 's'}`;
}

export function appendRentalQuery(
  params: URLSearchParams,
  values: {
    pickupDate?: string;
    pickupTime?: string;
    returnDate?: string;
    returnTime?: string;
  },
): URLSearchParams {
  if (values.pickupDate) params.set('pickupDate', values.pickupDate);
  if (values.pickupTime) params.set('pickupTime', values.pickupTime);
  if (values.returnDate) params.set('returnDate', values.returnDate);
  if (values.returnTime) params.set('returnTime', values.returnTime);
  return params;
}

export function rentalQueryString(values: {
  pickupDate?: string;
  pickupTime?: string;
  returnDate?: string;
  returnTime?: string;
  [key: string]: string | undefined;
}): string {
  const params = new URLSearchParams();
  Object.entries(values).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });
  return params.toString();
}

export interface RentalScheduleInput {
  pickupDate: string;
  pickupTime?: string;
  returnDate: string;
  returnTime?: string;
}

export function toRentalApiPayload(schedule: RentalScheduleInput) {
  return {
    pickupDate: toRentalIso(schedule.pickupDate, schedule.pickupTime ?? DEFAULT_PICKUP_TIME),
    returnDate: toRentalIso(schedule.returnDate, schedule.returnTime ?? DEFAULT_RETURN_TIME),
  };
}
