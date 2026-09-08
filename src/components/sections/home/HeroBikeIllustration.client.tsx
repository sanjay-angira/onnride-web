'use client';

import { cn } from '@/lib/utils';

export function HeroBikeIllustration() {
  return (
    <div
      className="relative aspect-square w-full max-w-md perspective-[1200px] lg:max-w-lg xl:max-w-xl"
      aria-hidden
    >
      <div
        className={cn(
          'relative h-full w-full transform-gpu transition-transform duration-700',
          'hover:[transform:rotateY(-8deg)_rotateX(4deg)_translateZ(20px)]',
        )}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute inset-[8%] rounded-[2rem] bg-gradient-to-br from-muted to-white shadow-premium" />

        <div
          className="absolute inset-[12%] flex items-center justify-center rounded-[1.75rem] border border-border bg-white shadow-card"
          style={{ transform: 'translateZ(40px)' }}
        >
          <svg
            viewBox="0 0 400 280"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-[70%] w-[85%]"
            role="img"
            aria-label="Premium motorcycle illustration"
          >
            <defs>
              <linearGradient id="bike-body" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#111827" />
                <stop offset="100%" stopColor="#374151" />
              </linearGradient>
              <linearGradient id="bike-accent" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#fb923c" />
              </linearGradient>
            </defs>

            <ellipse cx="120" cy="220" rx="52" ry="52" stroke="#E5E7EB" strokeWidth="8" fill="none" />
            <ellipse cx="280" cy="220" rx="52" ry="52" stroke="#E5E7EB" strokeWidth="8" fill="none" />
            <circle cx="120" cy="220" r="8" fill="#374151" />
            <circle cx="280" cy="220" r="8" fill="#374151" />

            <path
              d="M120 220 L180 180 L240 160 L280 220"
              stroke="url(#bike-body)"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M180 180 L200 120 L260 100 L280 140"
              stroke="url(#bike-body)"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />

            <rect x="195" y="95" width="70" height="30" rx="8" fill="url(#bike-body)" />
            <rect x="210" y="80" width="40" height="20" rx="6" fill="url(#bike-accent)" opacity="0.9" />

            <path
              d="M260 100 L280 60 L300 55"
              stroke="url(#bike-body)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="300" cy="55" r="6" fill="#f97316" />

            <path
              d="M200 120 Q220 140 240 160"
              stroke="url(#bike-accent)"
              strokeWidth="3"
              fill="none"
              opacity="0.6"
            />
          </svg>
        </div>

        <div
          className="absolute -right-2 top-[18%] rounded-xl border border-border bg-white px-4 py-2.5 shadow-premium"
          style={{ transform: 'translateZ(60px)' }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            From
          </p>
          <p className="text-lg font-bold text-primary">₹299<span className="text-xs font-normal text-secondary">/day</span></p>
        </div>

        <div
          className="absolute -left-2 bottom-[22%] rounded-xl border border-border bg-white px-4 py-2.5 shadow-premium"
          style={{ transform: 'translateZ(50px)' }}
        >
          <p className="text-xs font-semibold text-success">✓ Verified Fleet</p>
        </div>
      </div>
    </div>
  );
}
