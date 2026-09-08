'use client';

import { Headphones, MapPin, Star, Users } from 'lucide-react';
import { CountUp } from '@/components/motion/CountUp.client';
import { FadeInView } from '@/components/motion/FadeInView.client';
import { ScrollReveal3D } from '@/components/motion/ScrollReveal3D.client';
import { HOME_STATS } from '@/constants/homepage';

const ICONS = [MapPin, Users, Star, Headphones] as const;

function StatValue({ value }: { value: string }) {
  const numeric = value.match(/^([\d.]+)(.*)$/);

  if (!numeric) {
    return <span>{value}</span>;
  }

  const [, numberPart, suffix] = numeric;
  const parsed = parseFloat(numberPart);
  const decimals = numberPart.includes('.') ? 1 : 0;

  return <CountUp value={parsed} suffix={suffix} decimals={decimals} />;
}

export function StatsSection() {
  return (
    <section aria-label="OnnRide achievements" className="border-y border-border bg-muted">
      <div className="section-container py-10 sm:py-12">
        <FadeInView>
          <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-6">
            {HOME_STATS.map((stat, index) => {
              const Icon = ICONS[index] ?? MapPin;
              return (
                <ScrollReveal3D
                  key={stat.label}
                  delay={index * 0.08}
                  rotateX={18}
                  y={20}
                  className="text-center"
                >
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <dt className="mt-3 text-2xl font-bold text-primary sm:text-3xl">
                    <StatValue value={stat.value} />
                  </dt>
                  <dd className="mt-1 text-sm text-secondary">{stat.label}</dd>
                </ScrollReveal3D>
              );
            })}
          </dl>
        </FadeInView>
      </div>
    </section>
  );
}
