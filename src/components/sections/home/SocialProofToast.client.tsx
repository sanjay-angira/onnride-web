'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Bike, X } from 'lucide-react';
import { HOME_SOCIAL_PROOF } from '@/constants/homepage';
import { cn } from '@/lib/utils';

export function SocialProofToast() {
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed || prefersReducedMotion) return;

    const showTimer = window.setTimeout(() => setVisible(true), 4000);

    return () => window.clearTimeout(showTimer);
  }, [dismissed, prefersReducedMotion]);

  useEffect(() => {
    if (dismissed || prefersReducedMotion || !visible) return;

    const rotateTimer = window.setInterval(() => {
      setIndex((current) => (current + 1) % HOME_SOCIAL_PROOF.length);
    }, 9000);

    return () => window.clearInterval(rotateTimer);
  }, [dismissed, prefersReducedMotion, visible]);

  if (dismissed || prefersReducedMotion) return null;

  const proof = HOME_SOCIAL_PROOF[index];

  return (
    <div
      className={cn(
        'pointer-events-none fixed z-30',
        'bottom-[5.75rem] left-3 right-[4.75rem] sm:bottom-[5.5rem] sm:left-6 sm:right-auto lg:bottom-6',
      )}
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        {visible ? (
          <motion.div
            key={proof.name + proof.city + index}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="pointer-events-auto flex w-full max-w-[17.5rem] items-start gap-2.5 rounded-xl border border-border bg-white/95 p-2.5 shadow-lg backdrop-blur-md sm:max-w-sm sm:gap-3 sm:rounded-2xl sm:p-4"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 sm:h-10 sm:w-10 sm:rounded-xl">
              <Bike className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold leading-snug text-primary sm:text-sm">
                {proof.name} booked in {proof.city}
              </p>
              <p className="mt-0.5 truncate text-[11px] text-secondary sm:text-xs">
                {proof.vehicle} · {proof.minutesAgo} min ago
              </p>
            </div>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              className="-mr-0.5 shrink-0 rounded-lg p-0.5 text-muted-foreground hover:bg-muted hover:text-primary sm:p-1"
              aria-label="Dismiss notification"
            >
              <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
