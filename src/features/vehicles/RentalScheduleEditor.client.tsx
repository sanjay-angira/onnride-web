'use client';

import { ArrowRight, CalendarClock, Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
import { RentalDateRangePicker } from '@/features/search/RentalDateRangePicker.client';
import {
  formatRentalDate,
  formatRentalDuration,
  formatRentalTime,
  normalizeDateTimeLocal,
  todayISO,
  toDateTimeLocalValue,
  validateRentalRange,
} from '@/lib/rental-datetime';
import { cn } from '@/lib/utils';

export interface RentalScheduleValue {
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
}

interface RentalScheduleEditorProps {
  value: RentalScheduleValue;
  onChange: (value: RentalScheduleValue) => void;
  className?: string;
}

function ScheduleColumn({
  label,
  date,
  time,
  align = 'left',
}: {
  label: string;
  date: string;
  time: string;
  align?: 'left' | 'right';
}) {
  return (
    <div className={cn('min-w-0 flex-1', align === 'right' && 'text-right')}>
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 font-display text-base font-bold leading-tight text-surface-900 sm:text-[17px]">
        {date}
      </p>
      <p className="mt-1 text-sm font-medium text-slate-600">{time}</p>
    </div>
  );
}

export function RentalScheduleEditor({ value, onChange, className }: RentalScheduleEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [pickupDateTime, setPickupDateTime] = useState(
    toDateTimeLocalValue(value.pickupDate, value.pickupTime),
  );
  const [returnDateTime, setReturnDateTime] = useState(
    toDateTimeLocalValue(value.returnDate, value.returnTime),
  );
  const [error, setError] = useState('');

  useEffect(() => {
    setPickupDateTime(toDateTimeLocalValue(value.pickupDate, value.pickupTime));
    setReturnDateTime(toDateTimeLocalValue(value.returnDate, value.returnTime));
  }, [value.pickupDate, value.pickupTime, value.returnDate, value.returnTime]);

  function resetDraft() {
    setPickupDateTime(toDateTimeLocalValue(value.pickupDate, value.pickupTime));
    setReturnDateTime(toDateTimeLocalValue(value.returnDate, value.returnTime));
    setError('');
  }

  function openEditor() {
    resetDraft();
    setIsEditing(true);
  }

  function closeEditor() {
    resetDraft();
    setIsEditing(false);
  }

  function handleRangeChange(pickup: string, ret: string) {
    setPickupDateTime(normalizeDateTimeLocal(pickup).value);
    setReturnDateTime(normalizeDateTimeLocal(ret).value);
    setError('');
  }

  function handleDone() {
    const pickup = normalizeDateTimeLocal(pickupDateTime);
    const ret = normalizeDateTimeLocal(returnDateTime);

    if (!pickup.date || !ret.date) {
      setError('Select pickup and return date & time.');
      return;
    }

    const rangeError = validateRentalRange(
      pickup.date,
      pickup.time,
      ret.date,
      ret.time,
    );
    if (rangeError) {
      setError(rangeError);
      return;
    }

    setError('');
    onChange({
      pickupDate: pickup.date,
      pickupTime: pickup.time,
      returnDate: ret.date,
      returnTime: ret.time,
    });
    setIsEditing(false);
  }

  const hasDates = Boolean(value.pickupDate && value.returnDate);
  const durationLabel = hasDates
    ? formatRentalDuration(
        value.pickupDate,
        value.pickupTime,
        value.returnDate,
        value.returnTime,
      )
    : '';

  return (
    <div className={cn('space-y-3', className)}>
      {hasDates && !isEditing ? (
        <div className="overflow-hidden rounded-xl border border-surface-200 bg-white shadow-sm">
          <div className="flex items-center justify-between gap-3 border-b border-surface-100 px-4 py-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <CalendarClock className="h-3.5 w-3.5 text-brand-500" aria-hidden />
              Trip dates
            </div>
            <button
              type="button"
              onClick={openEditor}
              className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-brand-100 bg-brand-50/60 px-2.5 py-1 text-[11px] font-semibold text-brand-700 transition hover:border-brand-200 hover:bg-brand-50"
              aria-label="Change trip dates"
            >
              <Pencil className="h-3 w-3" aria-hidden />
              Change
            </button>
          </div>

          <button
            type="button"
            onClick={openEditor}
            className="group w-full text-left transition hover:bg-surface-50/80"
            aria-label="Edit trip dates"
          >
            <div className="flex items-stretch">
              <div className="flex flex-1 items-center gap-3 px-4 py-4 sm:px-5 sm:py-5">
                <ScheduleColumn
                  label="Pickup"
                  date={formatRentalDate(value.pickupDate)}
                  time={formatRentalTime(value.pickupTime)}
                />
                <div
                  className="flex shrink-0 items-center justify-center self-center rounded-full bg-surface-100 p-1.5 text-slate-400 transition group-hover:bg-brand-50 group-hover:text-brand-500"
                  aria-hidden
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
                <ScheduleColumn
                  label="Return"
                  date={formatRentalDate(value.returnDate)}
                  time={formatRentalTime(value.returnTime)}
                  align="right"
                />
              </div>
            </div>
          </button>

          <div className="border-t border-dashed border-surface-200 bg-surface-50/70 px-4 py-3 text-center sm:py-3.5">
            <p className="text-sm font-semibold text-brand-700">{durationLabel}</p>
            <p className="mt-0.5 text-[11px] text-slate-400">Tap dates to edit · 9 AM – 9 PM slots</p>
          </div>
        </div>
      ) : null}

      {isEditing ? (
        <div className="overflow-hidden rounded-xl border border-brand-200 bg-white shadow-sm">
          <div className="flex items-center justify-between gap-3 border-b border-surface-100 px-4 py-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <CalendarClock className="h-3.5 w-3.5 text-brand-500" aria-hidden />
              Edit trip dates
            </div>
            <button
              type="button"
              onClick={closeEditor}
              className="rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-500 transition hover:bg-surface-100"
            >
              Cancel
            </button>
          </div>

          <div className="space-y-4 p-4 sm:p-5">
            <RentalDateRangePicker
              id="vehicle-schedule-trip-dates"
              pickupValue={pickupDateTime}
              returnValue={returnDateTime}
              onChange={handleRangeChange}
              minDate={todayISO()}
              aria-label="Trip dates and times"
            />

            {error ? (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">{error}</p>
            ) : null}

            <button
              type="button"
              onClick={handleDone}
              className="w-full rounded-xl bg-brand-500 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600"
            >
              Update dates
            </button>
          </div>
        </div>
      ) : null}

      {!hasDates && !isEditing ? (
        <div className="overflow-hidden rounded-xl border border-surface-200 bg-white shadow-sm">
          <div className="flex items-center gap-2 border-b border-surface-100 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <CalendarClock className="h-3.5 w-3.5 text-brand-500" aria-hidden />
            Trip dates
          </div>
          <button
            type="button"
            onClick={openEditor}
            className="w-full px-4 py-5 text-sm font-medium text-brand-700 transition hover:bg-brand-50/50"
          >
            Select pickup & return dates
          </button>
        </div>
      ) : null}
    </div>
  );
}
