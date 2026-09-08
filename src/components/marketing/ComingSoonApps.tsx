import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ComingSoonAppsProps {
  variant?: 'light' | 'dark';
  className?: string;
  showHeading?: boolean;
  size?: 'default' | 'compact';
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={cn('h-7 w-7 shrink-0', className)}
      fill="currentColor"
    >
      <path d="M16.365 1.43c0 1.14-.413 2.218-1.177 3.065-.863.963-2.287 1.705-3.693 1.605-.14-1.09.477-2.243 1.273-3.103.84-.912 2.318-1.572 3.597-1.567Zm1.22 4.72c-2.483-.143-4.595 1.417-5.784 1.417-1.205 0-3.005-1.358-4.95-1.32-2.545.04-4.89 1.48-6.2 3.76-2.645 4.59-.677 11.39 1.898 15.12 1.263 1.83 2.767 3.88 4.743 3.805 1.908-.08 2.627-1.23 4.933-1.23 2.29 0 2.934 1.23 4.943 1.19 2.043-.04 3.335-1.86 4.59-3.7 1.445-2.11 2.04-4.16 2.075-4.27-.045-.02-3.985-1.53-4.025-6.08-.035-3.82 3.13-5.65 3.27-5.74-1.785-2.61-4.56-2.96-5.453-3.02Z" />
    </svg>
  );
}

function GooglePlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn('h-7 w-7 shrink-0', className)}>
      <path fill="#EA4335" d="M3.6 1.8 13.9 12 3.6 22.2A1.8 1.8 0 0 1 2 20.6V3.4a1.8 1.8 0 0 1 1.6-1.6Z" />
      <path fill="#FBBC04" d="M16.6 15.3 6.3 22.2l7.6-7.6-7.6-7.6 10.3 6.9Z" />
      <path fill="#4285F4" d="M21.8 10.9 18.5 12l-1.9 1.1-3.3-2.2 3.3-2.2 1.9 1.1 3.3 1.1a1 1 0 0 1 0 1.8Z" />
      <path fill="#34A853" d="M6.3 1.8l10.3 6.9-7.6 7.6L6.3 1.8Z" />
    </svg>
  );
}

function StoreBadge({
  platform,
  topLabel,
  storeName,
  icon,
  variant,
  size = 'default',
}: {
  platform: 'ios' | 'android';
  topLabel: string;
  storeName: string;
  icon: ReactNode;
  variant: 'light' | 'dark';
  size?: 'default' | 'compact';
}) {
  const compact = size === 'compact';

  return (
    <button
      type="button"
      disabled
      aria-label={`${storeName} app — coming soon`}
      title="Coming soon"
      className={cn(
        'group relative flex items-center gap-2 rounded-xl border text-left transition',
        'cursor-not-allowed opacity-90',
        compact ? 'min-w-[132px] px-2.5 py-2' : 'min-w-[150px] gap-2.5 px-3 py-2.5',
        variant === 'dark'
          ? 'border-white/20 bg-white/5 text-white'
          : 'border-surface-900 bg-white text-surface-900 shadow-sm',
      )}
    >
      {icon}
      <span className="min-w-0 leading-none">
        <span
          className={cn(
            'block font-semibold uppercase tracking-wide',
            compact ? 'text-[8px]' : 'text-[9px]',
            variant === 'dark' ? 'text-slate-300' : 'text-slate-600',
          )}
        >
          {topLabel}
        </span>
        <span
          className={cn(
            'mt-0.5 block font-display font-bold',
            compact ? 'text-sm' : 'text-base',
          )}
        >
          {storeName}
        </span>
      </span>
      <span
        className={cn(
          'absolute -right-1 -top-2 rounded-full font-bold uppercase tracking-wide',
          compact ? 'px-1.5 py-0.5 text-[8px]' : 'px-2 py-0.5 text-[9px]',
          variant === 'dark'
            ? 'bg-brand-500 text-white shadow-md'
            : 'bg-brand-500 text-white shadow-sm',
        )}
      >
        Soon
      </span>
      <span className="sr-only">{platform === 'ios' ? 'App Store' : 'Google Play'} coming soon</span>
    </button>
  );
}

export function ComingSoonApps({
  variant = 'dark',
  className,
  showHeading = true,
  size = 'default',
}: ComingSoonAppsProps) {
  const compact = size === 'compact';
  const iconClass = compact ? 'h-5 w-5' : 'h-7 w-7';

  return (
    <div className={cn(className)}>
      {showHeading ? (
        <div className={cn('mb-3', compact && 'mb-2')}>
          <p
            className={cn(
              'font-bold uppercase tracking-wider',
              compact ? 'text-[10px]' : 'text-xs',
              variant === 'dark' ? 'text-white' : 'text-surface-900',
            )}
          >
            Mobile app
          </p>
          {!compact ? (
            <p
              className={cn(
                'mt-1 text-sm',
                variant === 'dark' ? 'text-slate-400' : 'text-slate-600',
              )}
            >
              iOS & Android apps launching soon — book rides on the go.
            </p>
          ) : null}
        </div>
      ) : null}

      <div className={cn('flex flex-wrap', compact ? 'gap-2' : 'gap-3')}>
        <StoreBadge
          platform="ios"
          topLabel="Download on the"
          storeName="App Store"
          variant={variant}
          size={size}
          icon={
            <AppleIcon
              className={cn(iconClass, variant === 'dark' ? 'text-white' : 'text-surface-900')}
            />
          }
        />
        <StoreBadge
          platform="android"
          topLabel="Get it on"
          storeName="Google Play"
          variant={variant}
          size={size}
          icon={<GooglePlayIcon className={iconClass} />}
        />
      </div>
    </div>
  );
}
