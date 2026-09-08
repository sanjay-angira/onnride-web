'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  offset?: number;
}

export function FloatingElement({
  children,
  className,
  duration = 5,
  offset = 10,
}: FloatingElementProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      animate={{ y: [-offset / 2, offset / 2, -offset / 2] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
      className={cn('transform-gpu will-change-transform', className)}
    >
      {children}
    </motion.div>
  );
}
