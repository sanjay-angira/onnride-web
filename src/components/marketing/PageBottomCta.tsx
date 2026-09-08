import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface PageBottomCtaProps {
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

export function PageBottomCta({
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: PageBottomCtaProps) {
  return (
    <div className="relative mt-12 overflow-hidden rounded-3xl border border-brand-200/60 bg-gradient-to-br from-brand-500 to-brand-700 p-8 text-white shadow-lg shadow-brand-500/20 sm:p-10">
      <div className="absolute inset-0 bg-brand-mesh opacity-30" aria-hidden />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold sm:text-3xl">{title}</h2>
          <p className="mt-2 max-w-xl text-orange-100">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href={primaryHref}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-brand-700 transition hover:bg-brand-50"
          >
            {primaryLabel}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          {secondaryHref && secondaryLabel ? (
            <Link
              href={secondaryHref}
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
