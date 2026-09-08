export function FeaturedBikesSkeleton() {
  return (
    <section aria-hidden className="home-section bg-white">
      <div className="section-container">
        <div className="home-section-header sm:mx-auto sm:text-center">
          <div className="mx-auto h-4 w-32 animate-pulse rounded bg-muted sm:mx-auto" />
          <div className="mt-3 h-9 w-64 max-w-full animate-pulse rounded-lg bg-muted sm:mx-auto" />
          <div className="mt-3 h-5 w-full max-w-md animate-pulse rounded bg-muted sm:mx-auto" />
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-[280px] animate-pulse rounded-2xl bg-muted"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
