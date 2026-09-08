import { forwardRef, type ReactNode, type SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
  /** `time` — compact select inside rental date/time picker */
  variant?: 'default' | 'time';
}

function SelectChrome({
  label,
  hint,
  error,
  selectId,
  children,
}: {
  label?: string;
  hint?: string;
  error?: string;
  selectId: string;
  children: ReactNode;
}) {
  if (!label && !hint && !error) {
    return <>{children}</>;
  }

  return (
    <div className="w-full">
      {label ? (
        <label htmlFor={selectId} className="mb-1.5 block text-sm font-medium text-slate-700">
          {label}
        </label>
      ) : null}
      {children}
      {hint && !error ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, hint, error, id, variant = 'default', children, ...props }, ref) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <SelectChrome label={label} hint={hint} error={error} selectId={selectId ?? 'select'}>
        <select
          ref={ref}
          id={selectId}
          className={cn(
            variant === 'time' ? 'time-field' : 'select-field',
            error && 'border-red-400 focus:border-red-500 focus:ring-red-500/20',
            className,
          )}
          {...props}
        >
          {children}
        </select>
      </SelectChrome>
    );
  },
);

Select.displayName = 'Select';
