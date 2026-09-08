import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

const variants = {
  primary:
    'bg-brand-500 text-white shadow-md shadow-brand-500/25 hover:bg-brand-600 focus-visible:ring-brand-500',
  secondary:
    'bg-primary text-white shadow-sm hover:bg-surface-800 focus-visible:ring-primary',
  outline:
    'border border-border bg-white text-primary hover:border-brand-300 hover:bg-brand-50 focus-visible:ring-brand-500',
  ghost: 'text-secondary hover:bg-muted focus-visible:ring-brand-500',
  dark: 'bg-primary/90 text-white backdrop-blur hover:bg-primary focus-visible:ring-primary',
};

const sizes = {
  sm: 'h-9 rounded-lg px-4 text-sm',
  md: 'h-11 rounded-xl px-5 text-sm',
  lg: 'h-12 rounded-xl px-8 text-base font-semibold',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        'inline-flex items-center justify-center font-medium transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  ),
);

Button.displayName = 'Button';
