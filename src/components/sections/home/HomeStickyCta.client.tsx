'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { HOME_HERO } from '@/constants/homepage';
import { cn } from '@/lib/utils';

export function HomeStickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function updateVisibility() {
      const hero = document.querySelector('[data-home-hero]');
      if (!hero) {
        setVisible(window.scrollY > 480);
        return;
      }
      const rect = hero.getBoundingClientRect();
      setVisible(rect.bottom < 72);
    }

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility);

    return () => {
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
    };
  }, []);

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-white/95 p-3 shadow-[0_-4px_24px_rgba(15,23,42,0.08)] backdrop-blur-lg transition-transform duration-300 lg:hidden',
        visible ? 'translate-y-0' : 'pointer-events-none translate-y-full',
      )}
      aria-hidden={!visible}
    >
      <Link href="/search" className="block touch-target">
        <Button size="lg" className="w-full text-base">
          {HOME_HERO.primaryCta}
        </Button>
      </Link>
    </div>
  );
}
