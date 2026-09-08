'use client';

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type MotionStyle,
} from 'framer-motion';
import { type MouseEvent, type ReactNode, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Tilt3DProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  maxTilt?: number;
  scale?: number;
  perspective?: number;
  disabled?: boolean;
  style?: MotionStyle;
}

export function Tilt3D({
  children,
  className,
  innerClassName,
  maxTilt = 10,
  scale = 1.015,
  perspective = 1200,
  disabled = false,
  style,
}: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const rotateX = useSpring(0, { stiffness: 260, damping: 28 });
  const rotateY = useSpring(0, { stiffness: 260, damping: 28 });

  const isDisabled = disabled || prefersReducedMotion;

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (isDisabled || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    rotateY.set(x * maxTilt * 2);
    rotateX.set(-y * maxTilt * 2);
  }

  function resetTilt() {
    rotateX.set(0);
    rotateY.set(0);
  }

  if (isDisabled) {
    return <div className={cn('h-full w-full', className)}>{children}</div>;
  }

  return (
    <div className={cn('h-full w-full transform-gpu', className)} style={{ perspective }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          ...style,
        }}
        whileHover={{ scale }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className={cn('h-full w-full transform-gpu will-change-transform', innerClassName)}
      >
        {children}
      </motion.div>
    </div>
  );
}
