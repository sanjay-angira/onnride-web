import Link from 'next/link';
import { Check, Minus, X } from 'lucide-react';
import { PageBottomCta } from '@/components/marketing/PageBottomCta';
import type { CompareCell, ComparePage } from '@/content/compare';
import { bikeRentalCityPath } from '@/lib/bike-rental-paths';

function CellIcon({ value }: { value: CompareCell }) {
  if (value === 'yes') {
    return (
      <span className="inline-flex items-center gap-1.5 font-medium text-emerald-700">
        <Check className="h-4 w-4" aria-hidden /> Yes
      </span>
    );
  }
  if (value === 'no') {
    return (
      <span className="inline-flex items-center gap-1.5 font-medium text-rose-700">
        <X className="h-4 w-4" aria-hidden /> No
      </span>
    );
  }
  if (value === 'partial') {
    return (
      <span className="inline-flex items-center gap-1.5 font-medium text-amber-700">
        <Minus className="h-4 w-4" aria-hidden /> Partial
      </span>
    );
  }
  return <span className="text-slate-700">{value}</span>;
}

export function CompareArticle({ page }: { page: ComparePage }) {
  return (
    <article className="mx-auto max-w-3xl">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        Updated {page.updatedAt} · Independent comparison — competitor features change; verify live
        quotes
      </p>

      <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50/60 p-5 sm:p-6">
        <h2 className="font-display text-lg font-bold text-surface-900">Quick answer</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">{page.quickAnswer}</p>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-surface-200 bg-white shadow-card">
        <table className="w-full min-w-[32rem] text-left text-sm">
          <caption className="sr-only">
            Feature comparison between OnnRide and {page.competitorName}
          </caption>
          <thead className="bg-surface-100 text-surface-900">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold">
                Feature
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                OnnRide
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                {page.competitorName}
              </th>
            </tr>
          </thead>
          <tbody>
            {page.rows.map((row) => (
              <tr key={row.feature} className="border-t border-surface-100">
                <th scope="row" className="px-4 py-3 font-medium text-surface-900">
                  {row.feature}
                </th>
                <td className="px-4 py-3">
                  <CellIcon value={row.onnride} />
                </td>
                <td className="px-4 py-3">
                  <CellIcon value={row.competitor} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-slate-600">
        <span className="font-medium text-surface-900">Verdict: </span>
        {page.verdict}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5">
          <h2 className="font-display text-base font-bold text-emerald-900">Best for OnnRide</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-emerald-950/80">
            {page.bestForOnnRide.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="font-display text-base font-bold text-surface-900">
            Best for {page.competitorName}
          </h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-slate-600">
            {page.bestForCompetitor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {page.sections.map((section) => (
        <section key={section.heading} className="mt-10">
          <h2 className="font-display text-xl font-bold text-surface-900">{section.heading}</h2>
          {section.body.map((para) => (
            <p key={para.slice(0, 48)} className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              {para}
            </p>
          ))}
        </section>
      ))}

      <section className="mt-10">
        <h2 className="font-display text-xl font-bold text-surface-900">FAQs</h2>
        <ul className="mt-4 space-y-3">
          {page.faqs.map((faq) => (
            <li key={faq.q} className="rounded-2xl border border-surface-200 bg-white p-5">
              <h3 className="font-semibold text-surface-900">{faq.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{faq.a}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-bold text-surface-900">Popular rental cities</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {page.relatedCitySlugs.map((slug) => (
            <li key={slug}>
              <Link
                href={bikeRentalCityPath(slug)}
                className="inline-flex rounded-full border border-surface-200 bg-white px-3 py-1.5 text-sm font-medium text-surface-800 transition hover:border-brand-300 hover:text-brand-700"
              >
                Bike on rent in{' '}
                {slug
                  .split('-')
                  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(' ')}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {page.relatedCompareSlugs.length > 0 ? (
        <section className="mt-10">
          <h2 className="font-display text-xl font-bold text-surface-900">Related comparisons</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {page.relatedCompareSlugs.map((slug) => (
              <li key={slug}>
                <Link href={`/compare/${slug}`} className="font-medium text-brand-700 hover:underline">
                  /compare/{slug}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <p className="mt-8 text-xs text-slate-500">
        Competitor website for reference:{' '}
        <a
          href={page.competitorWebsite}
          className="underline"
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          {page.competitorWebsite}
        </a>
        . Features and pricing change — OnnRide does not claim affiliation with {page.competitorName}.
      </p>

      <div className="mt-10">
        <PageBottomCta
          title="Compare live bikes on OnnRide"
          description="Search your city and dates — verified vendors, helmet included, transparent deposits."
          primaryHref="/search"
          primaryLabel="Search bikes"
          secondaryHref="/bike-rental"
          secondaryLabel="Browse cities"
        />
      </div>
    </article>
  );
}
