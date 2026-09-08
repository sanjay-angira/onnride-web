import { maxBookingDateISO, todayISO } from '@/lib/rental-datetime';

export const WEEKDAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] as const;

export interface CalendarCell {
  date: string;
  day: number;
  inCurrentMonth: boolean;
}

export function compareISODate(a: string, b: string): number {
  return a.localeCompare(b);
}

export function parseISODate(iso: string): { year: number; month: number; day: number } {
  const [year, month, day] = iso.split('-').map(Number);
  return { year, month, day };
}

export function toISODate(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export function getMonthGrid(year: number, month: number): CalendarCell[] {
  const firstDay = new Date(year, month - 1, 1);
  const startOffset = firstDay.getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const daysInPrevMonth = new Date(year, month - 1, 0).getDate();

  const cells: CalendarCell[] = [];

  for (let i = startOffset - 1; i >= 0; i -= 1) {
    const day = daysInPrevMonth - i;
    const prevMonth = month === 1 ? 12 : month - 1;
    const prevYear = month === 1 ? year - 1 : year;
    cells.push({
      date: toISODate(prevYear, prevMonth, day),
      day,
      inCurrentMonth: false,
    });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({
      date: toISODate(year, month, day),
      day,
      inCurrentMonth: true,
    });
  }

  let nextDay = 1;
  while (cells.length % 7 !== 0) {
    const nextMonth = month === 12 ? 1 : month + 1;
    const nextYear = month === 12 ? year + 1 : year;
    cells.push({
      date: toISODate(nextYear, nextMonth, nextDay),
      day: nextDay,
      inCurrentMonth: false,
    });
    nextDay += 1;
  }

  return cells;
}

export function isDateDisabled(
  date: string,
  minDate: string = todayISO(),
  maxDate: string = maxBookingDateISO(),
): boolean {
  return compareISODate(date, minDate) < 0 || compareISODate(date, maxDate) > 0;
}

export function isBetweenDates(date: string, start: string, end: string): boolean {
  return compareISODate(date, start) >= 0 && compareISODate(date, end) <= 0;
}

export function monthLabel(year: number, month: number): string {
  return new Intl.DateTimeFormat('en-IN', { month: 'long', year: 'numeric' }).format(
    new Date(year, month - 1, 1),
  );
}

export function shiftMonth(year: number, month: number, delta: number): { year: number; month: number } {
  const d = new Date(year, month - 1 + delta, 1);
  return { year: d.getFullYear(), month: d.getMonth() + 1 };
}
