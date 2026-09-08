import { Headphones, MapPin, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HOME_HERO } from '@/constants/homepage';

const TRUST_CHIP_ICONS: Record<(typeof HOME_HERO.trustChips)[number], LucideIcon> = {
  'Helmet included': ShieldCheck,
  '24/7 support': Headphones,
  '80+ cities': MapPin,
};

export function HeroHeadline({
  accentClassName,
  stacked = false,
}: {
  accentClassName?: string;
  stacked?: boolean;
}) {
  const words = HOME_HERO.headline.split(' ');
  const accent = words.slice(-2).join(' ');
  const lead = words.slice(0, -2).join(' ');
  const accentClasses = accentClassName ?? 'text-gradient-brand';

  if (stacked) {
    return (
      <>
        <span className="block">{lead}</span>
        <span className={`block ${accentClasses}`}>{accent}</span>
      </>
    );
  }

  return (
    <>
      {lead} <span className={accentClasses}>{accent}</span>
    </>
  );
}

export function HeroTrustChipList({
  className,
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    <ul
      className={cn(
        'flex w-full max-w-full flex-nowrap items-center justify-between gap-1 sm:justify-center sm:gap-4',
        className,
      )}
    >
      {HOME_HERO.trustChips.map((chip) => {
        const Icon = TRUST_CHIP_ICONS[chip];

        return (
          <li
            key={chip}
            className={cn(
              'inline-flex shrink-0 items-center justify-center gap-1 rounded-full px-2 py-1.5 text-[11px] font-semibold leading-none whitespace-nowrap shadow-sm ring-1 sm:gap-2.5 sm:px-5 sm:py-3 sm:text-base sm:leading-tight',
              onDark
                ? 'bg-white/15 text-white shadow-black/10 ring-white/25 backdrop-blur-md'
                : 'bg-white text-slate-700 ring-slate-200/90',
            )}
          >
            <Icon
              className={cn(
                'h-3.5 w-3.5 shrink-0 sm:h-[18px] sm:w-[18px]',
                onDark ? 'text-brand-300' : 'text-brand-600',
              )}
              aria-hidden
            />
            <span>{chip}</span>
          </li>
        );
      })}
    </ul>
  );
}
