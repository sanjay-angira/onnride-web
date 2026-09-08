import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface ProfilePageShellProps {
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; href?: string }[];
  children: React.ReactNode;
}

export function ProfilePageShell({
  title,
  subtitle,
  breadcrumb,
  children,
}: ProfilePageShellProps) {
  return (
    <div className="min-h-screen bg-surface-50">
      <section className="relative overflow-hidden bg-surface-950 text-white">
        <div className="absolute inset-0 bg-hero-pattern opacity-70" />
        <div className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-brand-500/15 blur-3xl" />

        <div className="section-container relative py-10 sm:py-12">
          {breadcrumb?.length ? (
            <nav
              aria-label="Breadcrumb"
              className="mb-4 flex flex-wrap items-center gap-1 text-sm text-slate-400"
            >
              <Link href="/" className="hover:text-brand-300">
                Home
              </Link>
              {breadcrumb.map((item) => (
                <span key={item.label} className="inline-flex items-center gap-1">
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                  {item.href ? (
                    <Link href={item.href} className="hover:text-brand-300">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-brand-200">{item.label}</span>
                  )}
                </span>
              ))}
            </nav>
          ) : null}
          <h1 className="font-display text-3xl font-bold sm:text-4xl">{title}</h1>
          {subtitle ? <p className="mt-2 max-w-xl text-slate-400">{subtitle}</p> : null}
        </div>
      </section>

      <div className="section-container relative py-8 sm:py-12">{children}</div>
    </div>
  );
}
