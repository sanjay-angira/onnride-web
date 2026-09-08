import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface MarketingPageShellProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  breadcrumb?: { label: string; href?: string }[];
  children: React.ReactNode;
}

export function MarketingPageShell({
  title,
  subtitle,
  eyebrow,
  breadcrumb,
  children,
}: MarketingPageShellProps) {
  return (
    <div className="min-h-screen bg-surface-50">
      <section className="relative overflow-hidden bg-surface-950 text-white">
        <div className="absolute inset-0 bg-hero-pattern opacity-70" />
        <div className="absolute inset-0 bg-road-lines opacity-25" />
        <div className="absolute -right-24 top-0 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />

        <div className="section-container relative py-10 sm:py-14">
          {breadcrumb?.length ? (
            <nav
              aria-label="Breadcrumb"
              className="mb-5 flex flex-wrap items-center gap-1 text-sm text-slate-400"
            >
              <Link href="/" className="transition hover:text-brand-300">
                Home
              </Link>
              {breadcrumb.map((item) => (
                <span key={item.label} className="inline-flex items-center gap-1">
                  <ChevronRight className="h-3.5 w-3.5 text-slate-600" aria-hidden />
                  {item.href ? (
                    <Link href={item.href} className="transition hover:text-brand-300">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-brand-200">{item.label}</span>
                  )}
                </span>
              ))}
            </nav>
          ) : null}

          {eyebrow ? (
            <p className="home-section-label text-brand-400">{eyebrow}</p>
          ) : null}
          <h1 className="home-section-title-light mt-2 max-w-3xl">{title}</h1>
          {subtitle ? (
            <p className="home-section-subtitle-light mt-4 max-w-2xl">{subtitle}</p>
          ) : null}
        </div>
      </section>

      <div className="relative bg-gradient-to-b from-brand-50/60 via-white to-surface-50">
        <div className="absolute inset-0 bg-section-dots bg-dots opacity-40" aria-hidden />
        <div className="section-container relative py-10 sm:py-14">{children}</div>
      </div>
    </div>
  );
}
