'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

interface CountUpProps {
  value: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

export function CountUp({
  value,
  suffix = '',
  decimals = 0,
  duration = 1400,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const hasAnimated = useRef(false);
  // Start at final value so crawlers and first paint show real stats (not 0).
  const [display, setDisplay] = useState(value);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplay(value);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReducedMotion, value]);

  useEffect(() => {
    if (!started || prefersReducedMotion || hasAnimated.current) return;

    hasAnimated.current = true;
    setDisplay(0);

    let frame = 0;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(value * eased);

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, value, duration, prefersReducedMotion]);

  const formatted =
    decimals > 0 ? display.toFixed(decimals) : Math.round(display).toString();

  return (
    <span ref={ref} className={className}>
      {formatted}
      {suffix}
    </span>
  );
}
