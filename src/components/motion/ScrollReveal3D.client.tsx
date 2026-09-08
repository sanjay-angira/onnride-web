'use client';

import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScrollReveal3DProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  rotateX?: number;
  y?: number;
}

export function ScrollReveal3D({
  children,
  className,
  delay = 0,
  rotateX = 14,
  y = 28,
  ...props
}: ScrollReveal3DProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, rotateX, y }}
      whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
      viewport={{ once: true, amount: 0.35, margin: '-40px' }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      style={{ transformPerspective: 900, transformStyle: 'preserve-3d' }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
