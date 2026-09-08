import { cn } from '@/lib/utils';

/** Elevated booking panel — depth, soft ring, hover lift */
export const bookingPanel = cn(
  'overflow-hidden rounded-3xl border border-surface-200/90 bg-white',
  'shadow-card ring-1 ring-black/[0.03]',
  'transition-all duration-300 ease-out',
);

export const bookingPanelHover = cn(
  bookingPanel,
  'hover:-translate-y-0.5 hover:border-brand-100/80 hover:shadow-card-hover',
);

export const bookingPanelElevated = cn(
  'overflow-hidden rounded-3xl border border-surface-200/90 bg-white',
  'shadow-elevated ring-1 ring-black/[0.04]',
);

export const bookingGlassPanel = cn(
  'rounded-2xl border border-white/70 bg-white/75',
  'shadow-[0_8px_32px_-8px_rgba(0,0,0,0.08)] backdrop-blur-md',
  'ring-1 ring-black/[0.04]',
);

export const bookingIconOrb = cn(
  'flex shrink-0 items-center justify-center rounded-2xl',
  'shadow-[0_4px_14px_-4px_rgba(0,0,0,0.12)] ring-1 ring-white/80',
);

export const bookingStatTile = cn(
  'flex items-center gap-3 rounded-2xl border border-surface-100/90',
  'bg-white/90 p-3.5 shadow-sm ring-1 ring-black/[0.02]',
  'backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5',
);

export const bookingSectionLabel =
  'text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400';
