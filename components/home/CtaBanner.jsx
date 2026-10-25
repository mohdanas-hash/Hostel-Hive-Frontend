export default function CtaBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-brand-600 px-6 py-14 text-center sm:px-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              'radial-gradient(50% 60% at 90% 10%, rgba(245,158,11,0.35), transparent)',
          }}
        />
        <div className="relative">
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
            Moving to a new city for college?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-brand-100 sm:text-base">
            Create a free profile to save listings, compare options and get
            personalized recommendations.
          </p>
          <button
            type="button"
            className="mt-6 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-600 transition-transform hover:-translate-y-0.5"
          >
            Create your free account
          </button>
        </div>
      </div>
    </section>
  )
}
