export default function MessesLoading() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <div className="h-9 w-48 animate-pulse rounded-lg bg-ink-100" />
        <div className="mt-3 h-4 w-80 max-w-full animate-pulse rounded bg-ink-100" />
      </div>

      <div className="mt-8 h-40 animate-pulse rounded-2xl border border-ink-100 bg-ink-50" />

      <div className="mt-6 h-4 w-32 animate-pulse rounded bg-ink-100" />

      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-72 animate-pulse rounded-2xl border border-ink-100 bg-ink-50"
          />
        ))}
      </div>
    </section>
  )
}
