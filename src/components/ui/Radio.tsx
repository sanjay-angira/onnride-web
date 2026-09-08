import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, ...props }, ref) => (
    <input ref={ref} type="radio" className={cn('radio-field', className)} {...props} />
  ),
);

Radio.displayName = 'Radio';
