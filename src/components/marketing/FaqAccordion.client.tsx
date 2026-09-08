'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FaqItem {
  q: string;
  a: string;
}

export function FaqAccordion({
  items,
  variant = 'default',
}: {
  items: readonly FaqItem[];
  variant?: 'default' | 'brand' | 'light';
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div
      className={cn(
        'divide-y rounded-2xl border bg-white shadow-card',
        variant === 'brand'
          ? 'divide-brand-100 border-brand-200/60'
          : 'divide-border border-border',
      )}
    >
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.q}>
            <button
              type="button"
              className={cn(
                'flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition sm:px-6',
                isOpen && variant === 'brand' && 'bg-brand-50/80',
              )}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span className="font-medium text-surface-900">{item.q}</span>
              <ChevronDown
                className={cn(
                  'h-5 w-5 shrink-0 transition-transform',
                  variant === 'brand' ? 'text-brand-500' : 'text-slate-400',
                  isOpen && 'rotate-180',
                )}
                aria-hidden
              />
            </button>
            {isOpen ? (
              <div className="px-5 pb-4 text-sm leading-relaxed text-slate-600 sm:px-6">{item.a}</div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
