'use client';

import Link from 'next/link';
import { ArrowRight, Check, Minus } from 'lucide-react';
import { FadeInView } from '@/components/motion/FadeInView.client';
import { Button } from '@/components/ui/Button';
import { HOME_PLAN_COMPARE } from '@/constants/homepage';
import { cn } from '@/lib/utils';

function CompareCell({ value }: { value: boolean | string }) {
  if (typeof value === 'string') {
    return <span className="text-sm text-secondary">{value}</span>;
  }

  return value ? (
    <>
      <Check className="mx-auto h-4 w-4 text-success" aria-hidden />
      <span className="sr-only">Included</span>
    </>
  ) : (
    <>
      <Minus className="mx-auto h-4 w-4 text-border" aria-hidden />
      <span className="sr-only">Not included</span>
    </>
  );
}

export function ComparePlansTable() {
  const planKeys = ['daily', 'weekend', 'multiday'] as const;

  return (
    <FadeInView className="mt-14">
      <div className="mb-6 home-section-header sm:mx-0 sm:text-left">
        <h3 className="text-xl font-bold text-primary sm:text-2xl">Compare rental plans</h3>
        <p className="mt-2 text-sm text-secondary sm:text-base">
          Pick the plan that fits your trip — all include helmet & transparent pricing.
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-white shadow-card">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <caption className="sr-only">OnnRide rental plan comparison</caption>
          <thead>
            <tr className="border-b border-border bg-muted/60">
              <th scope="col" className="px-4 py-4 text-sm font-semibold text-primary sm:px-6">
                Features
              </th>
              {HOME_PLAN_COMPARE.plans.map((plan) => (
                <th
                  key={plan.id}
                  scope="col"
                  className={cn(
                    'px-4 py-4 text-center text-sm font-bold sm:px-6',
                    plan.id === 'daily' ? 'bg-brand-50/80 text-brand-700' : 'text-primary',
                  )}
                >
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HOME_PLAN_COMPARE.features.map((row, rowIndex) => (
              <tr
                key={row.label}
                className={cn(
                  'border-b border-border last:border-0',
                  rowIndex % 2 === 0 ? 'bg-white' : 'bg-muted/30',
                )}
              >
                <th
                  scope="row"
                  className="px-4 py-3.5 text-sm font-medium text-primary sm:px-6"
                >
                  {row.label}
                </th>
                {planKeys.map((key) => (
                  <td
                    key={key}
                    className={cn(
                      'px-4 py-3.5 text-center sm:px-6',
                      key === 'daily' && 'bg-brand-50/40',
                    )}
                  >
                    <CompareCell value={row[key]} />
                  </td>
                ))}
              </tr>
            ))}
            <tr className="hidden bg-muted/40 lg:table-row">
              <td className="px-4 py-4 sm:px-6" />
              {HOME_PLAN_COMPARE.plans.map((plan) => (
                <td key={plan.id} className="px-4 py-4 text-center sm:px-6">
                  <Link href={plan.href} className="inline-block touch-target">
                    <Button
                      size="sm"
                      variant={plan.id === 'daily' ? 'primary' : 'outline'}
                      className="gap-1.5 whitespace-nowrap"
                    >
                      {plan.cta}
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </Button>
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:hidden">
        {HOME_PLAN_COMPARE.plans.map((plan) => (
          <div
            key={plan.id}
            className={cn(
              'flex flex-col rounded-xl border border-border bg-white p-4 shadow-sm',
              plan.id === 'daily' && 'border-brand-200 bg-brand-50/50',
            )}
          >
            <p className="mb-3 text-center text-sm font-bold text-primary">{plan.name}</p>
            <Link href={plan.href} className="touch-target mt-auto">
              <Button
                size="md"
                variant={plan.id === 'daily' ? 'primary' : 'outline'}
                className="w-full gap-2"
              >
                {plan.cta}
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </FadeInView>
  );
}
