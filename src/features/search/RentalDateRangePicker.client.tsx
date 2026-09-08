'use client';

import { CalendarClock, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  compareISODate,
  getMonthGrid,
  isDateDisabled,
  monthLabel,
  parseISODate,
  shiftMonth,
  WEEKDAY_LABELS,
} from '@/lib/rental-calendar';
import {
  DEFAULT_PICKUP_TIME,
  DEFAULT_RETURN_TIME,
  formatRentalDate,
  formatRentalTime,
  getRentalTimeOptions,
  maxBookingDateISO,
  normalizeDateTimeLocal,
  toDateTimeLocalValue,
  todayISO,
  validateRentalRange,
} from '@/lib/rental-datetime';
import { cn } from '@/lib/utils';

type PickerStep = 'pickup-date' | 'pickup-time' | 'return-date' | 'return-time';

const STEPS: Array<{ id: PickerStep; label: string; short: string }> = [
  { id: 'pickup-date', label: 'Pickup date', short: 'Start date' },
  { id: 'pickup-time', label: 'Pickup time', short: 'Start time' },
  { id: 'return-date', label: 'Return date', short: 'End date' },
  { id: 'return-time', label: 'Return time', short: 'End time' },
];

interface RentalDateRangePickerProps {
  id?: string;
  pickupValue: string;
  returnValue: string;
  onChange: (pickup: string, returnValue: string) => void;
  minDate?: string;
  className?: string;
  'aria-label'?: string;
}

function stepIndex(step: PickerStep): number {
  return STEPS.findIndex((item) => item.id === step);
}

function getReturnTimeOptions(pickupDate: string, pickupTime: string, returnDate: string) {
  const options = getRentalTimeOptions();
  if (!pickupDate || !returnDate || pickupDate !== returnDate) return options;

  const pickupHour = Number.parseInt(pickupTime.split(':')[0] ?? '9', 10);
  return options.filter((opt) => Number.parseInt(opt.value.split(':')[0] ?? '0', 10) > pickupHour);
}

export function RentalDateRangePicker({
  id,
  pickupValue,
  returnValue,
  onChange,
  minDate,
  className,
  'aria-label': ariaLabel,
}: RentalDateRangePickerProps) {
  const fallbackId = useId();
  const triggerId = id ?? fallbackId;
  const panelId = `${triggerId}-panel`;
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [panelStyle, setPanelStyle] = useState<{ top: number; left: number; width: number } | null>(
    null,
  );

  const pickup = normalizeDateTimeLocal(pickupValue);
  const ret = normalizeDateTimeLocal(returnValue);
  const minDateValue = minDate ?? todayISO();
  const maxDateValue = maxBookingDateISO();

  const [step, setStep] = useState<PickerStep>('pickup-date');
  const [draftPickup, setDraftPickup] = useState(pickup);
  const [draftReturn, setDraftReturn] = useState(ret);

  const initialView = parseISODate(pickup.date || minDateValue);
  const [viewYear, setViewYear] = useState(initialView.year);
  const [viewMonth, setViewMonth] = useState(initialView.month);

  const monthCells = useMemo(() => getMonthGrid(viewYear, viewMonth), [viewYear, viewMonth]);
  const currentStep = STEPS[stepIndex(step)]!;
  const isCalendarStep = step === 'pickup-date' || step === 'return-date';
  const calendarMinDate = step === 'return-date' ? draftPickup.date || minDateValue : minDateValue;
  const calendarSelectedDate = step === 'pickup-date' ? draftPickup.date : draftReturn.date;
  const timeOptions =
    step === 'return-time'
      ? getReturnTimeOptions(draftPickup.date, draftPickup.time, draftReturn.date)
      : getRentalTimeOptions();
  const selectedTime = step === 'pickup-time' ? draftPickup.time : draftReturn.time;

  const close = useCallback(() => setOpen(false), []);

  const updatePanelPosition = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    const width = Math.min(360, Math.max(rect.width, 320));
    const left = Math.min(rect.left, window.innerWidth - width - 12);
    setPanelStyle({
      top: rect.bottom + 8,
      left: Math.max(12, left),
      width,
    });
  }, []);

  const applyValues = useCallback(
    (nextPickup: typeof draftPickup, nextReturn: typeof draftReturn) => {
      if (!nextPickup.date || !nextReturn.date) return;
      onChange(
        toDateTimeLocalValue(nextPickup.date, nextPickup.time),
        toDateTimeLocalValue(nextReturn.date, nextReturn.time),
      );
    },
    [onChange],
  );

  const openPanel = useCallback(() => {
    setDraftPickup(pickup);
    setDraftReturn(ret);
    setStep('pickup-date');
    const view = parseISODate(pickup.date || minDateValue);
    setViewYear(view.year);
    setViewMonth(view.month);
    updatePanelPosition();
    setOpen(true);
  }, [minDateValue, pickup, ret, updatePanelPosition]);

  function goToStep(next: PickerStep) {
    setStep(next);
    const dateForView =
      next === 'return-date' || next === 'return-time'
        ? draftReturn.date || draftPickup.date || minDateValue
        : draftPickup.date || minDateValue;
    const view = parseISODate(dateForView);
    setViewYear(view.year);
    setViewMonth(view.month);
  }

  function handlePickupDateSelect(date: string) {
    const nextPickup = normalizeDateTimeLocal(
      toDateTimeLocalValue(date, draftPickup.time || DEFAULT_PICKUP_TIME),
    );
    setDraftPickup(nextPickup);

    if (draftReturn.date && compareISODate(draftReturn.date, date) < 0) {
      setDraftReturn(
        normalizeDateTimeLocal(
          toDateTimeLocalValue(date, draftReturn.time || DEFAULT_RETURN_TIME),
        ),
      );
    }

    goToStep('pickup-time');
  }

  function handlePickupTimeSelect(time: string) {
    const nextPickup = normalizeDateTimeLocal(toDateTimeLocalValue(draftPickup.date, time));
    setDraftPickup(nextPickup);
    goToStep('return-date');
  }

  function handleReturnDateSelect(date: string) {
    let returnTime = draftReturn.time || DEFAULT_RETURN_TIME;
    if (date === draftPickup.date) {
      const valid = getReturnTimeOptions(draftPickup.date, draftPickup.time, date);
      if (!valid.some((opt) => opt.value === returnTime)) {
        returnTime = valid[0]?.value ?? DEFAULT_RETURN_TIME;
      }
    }

    const nextReturn = normalizeDateTimeLocal(toDateTimeLocalValue(date, returnTime));
    setDraftReturn(nextReturn);
    goToStep('return-time');
  }

  function handleReturnTimeSelect(time: string) {
    const nextReturn = normalizeDateTimeLocal(toDateTimeLocalValue(draftReturn.date, time));
    setDraftReturn(nextReturn);
    const nextPickup = draftPickup;
    const error = validateRentalRange(
      nextPickup.date,
      nextPickup.time,
      nextReturn.date,
      nextReturn.time,
    );
    if (!error) {
      applyValues(nextPickup, nextReturn);
      close();
    }
  }

  function handleDayClick(date: string) {
    if (isDateDisabled(date, calendarMinDate, maxDateValue)) return;
    if (step === 'pickup-date') handlePickupDateSelect(date);
    if (step === 'return-date') handleReturnDateSelect(date);
  }

  function handleTimeClick(time: string) {
    if (step === 'pickup-time') handlePickupTimeSelect(time);
    if (step === 'return-time') handleReturnTimeSelect(time);
  }

  function handleBack() {
    const idx = stepIndex(step);
    if (idx > 0) goToStep(STEPS[idx - 1]!.id);
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (containerRef.current?.contains(target) || panelRef.current?.contains(target)) return;
      close();
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };

    const onReposition = () => updatePanelPosition();

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onEscape);
    window.addEventListener('resize', onReposition);
    window.addEventListener('scroll', onReposition, true);

    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onEscape);
      window.removeEventListener('resize', onReposition);
      window.removeEventListener('scroll', onReposition, true);
    };
  }, [close, open, updatePanelPosition]);

  const triggerLabel = useMemo(() => {
    if (!pickup.date || !ret.date) return 'Select trip dates';
    return `${formatRentalDate(pickup.date)}, ${formatRentalTime(pickup.time)} → ${formatRentalDate(ret.date)}, ${formatRentalTime(ret.time)}`;
  }, [pickup.date, pickup.time, ret.date, ret.time]);

  const panel =
    open && panelStyle ? (
      <div
        ref={panelRef}
        id={panelId}
        role="dialog"
        aria-labelledby={triggerId}
        style={{
          position: 'fixed',
          top: panelStyle.top,
          left: panelStyle.left,
          width: panelStyle.width,
        }}
        className="dropdown-panel z-[250] max-h-[min(36rem,calc(100dvh-6rem))] overflow-y-auto p-4"
      >
        <div className="mb-4 flex gap-1">
          {STEPS.map((item, index) => {
            const active = item.id === step;
            const done = stepIndex(step) > index;
            return (
              <div key={item.id} className="flex min-w-0 flex-1 flex-col items-center gap-1">
                <span
                  className={cn(
                    'flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold',
                    active && 'bg-brand-500 text-white',
                    done && !active && 'bg-brand-100 text-brand-700',
                    !active && !done && 'bg-surface-100 text-slate-400',
                  )}
                >
                  {index + 1}
                </span>
                <span
                  className={cn(
                    'hidden text-center text-[10px] font-semibold sm:block',
                    active ? 'text-brand-700' : 'text-slate-400',
                  )}
                >
                  {item.short}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mb-3 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 'pickup-date'}
            className="inline-flex h-8 items-center rounded-lg px-2 text-xs font-semibold text-slate-600 transition hover:bg-surface-50 disabled:invisible"
          >
            <ChevronLeft className="mr-0.5 h-4 w-4" aria-hidden />
            Back
          </button>
          <p className="text-sm font-semibold text-surface-900">{currentStep.label}</p>
          <span className="w-14" aria-hidden />
        </div>

        {(draftPickup.date || draftReturn.date) && (
          <div className="mb-3 rounded-xl bg-brand-50/80 px-3 py-2 text-xs text-brand-900 ring-1 ring-brand-100">
            {draftPickup.date ? (
              <span>
                Pickup: {formatRentalDate(draftPickup.date)}
                {step !== 'pickup-date' ? `, ${formatRentalTime(draftPickup.time)}` : ''}
              </span>
            ) : null}
            {draftReturn.date ? (
              <span className={draftPickup.date ? 'mt-1 block' : ''}>
                Return: {formatRentalDate(draftReturn.date)}
                {step === 'return-time' ? `, ${formatRentalTime(draftReturn.time)}` : ''}
              </span>
            ) : null}
          </div>
        )}

        {isCalendarStep ? (
          <>
            <div className="mb-3 flex items-center justify-between">
              <button
                type="button"
                aria-label="Previous month"
                onClick={() => {
                  const next = shiftMonth(viewYear, viewMonth, -1);
                  setViewYear(next.year);
                  setViewMonth(next.month);
                }}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-surface-200 text-slate-600 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden />
              </button>
              <p className="text-sm font-medium text-surface-800">{monthLabel(viewYear, viewMonth)}</p>
              <button
                type="button"
                aria-label="Next month"
                onClick={() => {
                  const next = shiftMonth(viewYear, viewMonth, 1);
                  setViewYear(next.year);
                  setViewMonth(next.month);
                }}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-surface-200 text-slate-600 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
              >
                <ChevronRight className="h-4 w-4" aria-hidden />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
              {WEEKDAY_LABELS.map((label) => (
                <span
                  key={label}
                  className="py-1 text-[10px] font-bold uppercase tracking-wide text-slate-400"
                >
                  {label}
                </span>
              ))}
              {monthCells.map((cell) => {
                const disabled = isDateDisabled(cell.date, calendarMinDate, maxDateValue);
                const selected = cell.date === calendarSelectedDate;
                const isToday = cell.date === todayISO();

                return (
                  <button
                    key={`${step}-${cell.date}`}
                    type="button"
                    disabled={disabled}
                    onClick={() => handleDayClick(cell.date)}
                    className={cn(
                      'relative h-9 rounded-lg text-sm font-medium transition',
                      !cell.inCurrentMonth && 'text-slate-300',
                      cell.inCurrentMonth && !disabled && 'text-surface-800 hover:bg-brand-50',
                      disabled && 'cursor-not-allowed text-slate-300 opacity-40',
                      selected && 'bg-brand-500 text-white hover:bg-brand-600',
                      isToday && !selected && 'ring-1 ring-brand-300 ring-inset',
                    )}
                  >
                    {cell.day}
                  </button>
                );
              })}
            </div>

            <p className="mt-3 text-xs text-slate-500">
              {step === 'pickup-date'
                ? 'Choose when your trip starts.'
                : 'Choose when you will return the vehicle.'}
            </p>
          </>
        ) : (
          <>
            <p className="mb-3 text-xs text-slate-500">
              {step === 'pickup-time'
                ? `Pickup on ${formatRentalDate(draftPickup.date)} — select handover time (9 AM – 9 PM).`
                : `Return on ${formatRentalDate(draftReturn.date)} — select drop-off time.`}
            </p>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {timeOptions.map((opt) => (
                <button
                  key={`${step}-${opt.value}`}
                  type="button"
                  onClick={() => handleTimeClick(opt.value)}
                  className={cn(
                    'rounded-xl border px-2 py-2.5 text-xs font-semibold transition',
                    selectedTime === opt.value
                      ? 'border-brand-500 bg-brand-500 text-white shadow-sm'
                      : 'border-surface-200 bg-white text-slate-700 hover:border-brand-200 hover:bg-brand-50',
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {step === 'return-time' && timeOptions.length === 0 ? (
              <p className="mt-3 text-xs text-red-600">
                No return times left on this day. Go back and pick a later return date.
              </p>
            ) : null}
          </>
        )}
      </div>
    ) : null;

  return (
    <div ref={containerRef} className={cn('relative min-w-0', className)}>
      <button
        ref={triggerRef}
        type="button"
        id={triggerId}
        aria-label={ariaLabel ?? 'Select trip dates and times'}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls={open ? panelId : undefined}
        onClick={() => (open ? close() : openPanel())}
        className={cn(
          'dropdown-trigger h-12 w-full gap-2 pl-10 pr-4 text-sm',
          !pickup.date || !ret.date ? 'text-muted-foreground' : 'text-primary',
        )}
      >
        <CalendarClock
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-500"
          aria-hidden
        />
        <span className="min-w-0 truncate text-left font-medium">{triggerLabel}</span>
      </button>

      {mounted && panel ? createPortal(panel, document.body) : null}
    </div>
  );
}
