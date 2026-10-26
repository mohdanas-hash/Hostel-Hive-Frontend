'use client'

export default function MessesError({ reset }) {
  return (
    <section className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <p className="text-sm font-semibold text-red-600">Something went wrong</p>
      <h1 className="mt-2 text-3xl font-extrabold text-ink-950 sm:text-4xl">
        We couldn&apos;t load Messes & Food
      </h1>
      <p className="mt-3 text-sm text-ink-500 sm:text-base">
        Something unexpected happened loading this page. Please try again in
        a moment.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
      >
        Try again
      </button>
    </section>
  )
}
