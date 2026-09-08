'use client';

import {
  BadgeCheck,
  Clock,
  Headphones,
  ShieldCheck,
  Sparkles,
  Wallet,
} from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { HOME_TRUST_TICKER } from '@/constants/homepage';
import { cn } from '@/lib/utils';

const ICONS = {
  headphones: Headphones,
  'badge-check': BadgeCheck,
  shield: ShieldCheck,
  wallet: Wallet,
  clock: Clock,
  sparkles: Sparkles,
} as const;

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M16.365 1.43c0 1.14-.413 2.218-1.177 3.065-.863.963-2.287 1.705-3.693 1.605-.14-1.09.477-2.243 1.273-3.103.84-.912 2.318-1.572 3.597-1.567Zm1.22 4.72c-2.483-.143-4.595 1.417-5.784 1.417-1.205 0-3.005-1.358-4.95-1.32-2.545.04-4.89 1.48-6.2 3.76-2.645 4.59-.677 11.39 1.898 15.12 1.263 1.83 2.767 3.88 4.743 3.805 1.908-.08 2.627-1.23 4.933-1.23 2.29 0 2.934 1.23 4.943 1.19 2.043-.04 3.335-1.86 4.59-3.7 1.445-2.11 2.04-4.16 2.075-4.27-.045-.02-3.985-1.53-4.025-6.08-.035-3.82 3.13-5.65 3.27-5.74-1.785-2.61-4.56-2.96-5.453-3.02Z" />
    </svg>
  );
}

function GooglePlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path fill="#EA4335" d="M3.6 1.8 13.9 12 3.6 22.2A1.8 1.8 0 0 1 2 20.6V3.4a1.8 1.8 0 0 1 1.6-1.6Z" />
      <path fill="#FBBC04" d="M16.6 15.3 6.3 22.2l7.6-7.6-7.6-7.6 10.3 6.9Z" />
      <path fill="#4285F4" d="M21.8 10.9 18.5 12l-1.9 1.1-3.3-2.2 3.3-2.2 1.9 1.1 3.3 1.1a1 1 0 0 1 0 1.8Z" />
      <path fill="#34A853" d="M6.3 1.8l10.3 6.9-7.6 7.6L6.3 1.8Z" />
    </svg>
  );
}

function TickerItem({
  label,
  icon,
  highlight,
}: {
  label: string;
  icon: keyof typeof ICONS;
  highlight?: boolean;
}) {
  const Icon = ICONS[icon];
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-semibold',
        highlight
          ? 'bg-brand-500 text-white shadow-md shadow-brand-500/35'
          : 'bg-white/95 text-primary shadow-sm ring-1 ring-brand-200/80',
      )}
    >
      <Icon
        className={cn('h-4 w-4 shrink-0', highlight ? 'text-white' : 'text-brand-500')}
        aria-hidden
      />
      {label}
    </span>
  );
}

function StoreMarqueePill({ platform }: { platform: 'ios' | 'android' }) {
  const isIos = platform === 'ios';
  return (
    <span
      className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-primary/20"
      aria-label={`${isIos ? 'App Store' : 'Google Play'} app — coming soon`}
    >
      {isIos ? (
        <AppleIcon className="h-4 w-4 shrink-0 text-white" />
      ) : (
        <GooglePlayIcon className="h-4 w-4 shrink-0" />
      )}
      <span>{isIos ? 'App Store' : 'Google Play'}</span>
      <span className="rounded-full bg-brand-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide">
        Soon
      </span>
    </span>
  );
}

type MarqueeEntry =
  | { kind: 'trust'; label: string; icon: keyof typeof ICONS; highlight?: boolean }
  | { kind: 'store'; platform: 'ios' | 'android' };

const MARQUEE_ENTRIES: MarqueeEntry[] = [
  ...HOME_TRUST_TICKER.map((item) => ({
    kind: 'trust' as const,
    label: item.label,
    icon: item.icon,
    highlight: 'highlight' in item ? item.highlight : undefined,
  })),
  { kind: 'store', platform: 'ios' },
  { kind: 'store', platform: 'android' },
];

function MarqueeEntryView({ entry }: { entry: MarqueeEntry }) {
  if (entry.kind === 'store') {
    return <StoreMarqueePill platform={entry.platform} />;
  }
  return (
    <TickerItem label={entry.label} icon={entry.icon} highlight={entry.highlight} />
  );
}

export function PromoBanner() {
  const prefersReducedMotion = useReducedMotion();
  const loopItems = [...MARQUEE_ENTRIES, ...MARQUEE_ENTRIES];

  return (
    <section
      aria-label="Trust features, offers and mobile apps"
      className="relative min-h-[3.25rem] overflow-hidden border-b border-brand-200 bg-gradient-to-r from-brand-100/50 via-brand-50 to-brand-100/50 py-3"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-brand-50 to-transparent sm:w-16"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-brand-50 to-transparent sm:w-16"
        aria-hidden
      />

      {prefersReducedMotion ? (
        <div className="flex flex-wrap items-center justify-center gap-2 px-4">
          {MARQUEE_ENTRIES.map((entry, index) => (
            <MarqueeEntryView key={`${entry.kind}-${index}`} entry={entry} />
          ))}
        </div>
      ) : (
        <div className="overflow-hidden">
          <div className="flex w-max animate-marquee items-center gap-6 sm:gap-8 hover:[animation-play-state:paused] motion-reduce:animate-none">
            {loopItems.map((entry, index) => (
              <MarqueeEntryView key={`${entry.kind}-${index}`} entry={entry} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
