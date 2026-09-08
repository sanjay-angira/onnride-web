'use client';

import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FadeInViewProps extends HTMLMotionProps<'div'> {
  delay?: number;
  duration?: number;
  y?: number;
}

export function FadeInView({
  children,
  className,
  delay = 0,
  duration = 0.5,
  y = 24,
  ...props
}: FadeInViewProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
