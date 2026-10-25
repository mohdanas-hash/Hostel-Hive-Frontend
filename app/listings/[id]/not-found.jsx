import Link from 'next/link'

export default function ListingNotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-32 text-center sm:px-6">
      <p className="text-sm font-semibold text-brand-600">404</p>
      <h1 className="mt-2 text-3xl font-extrabold text-ink-950 sm:text-4xl">
        Listing not found
      </h1>
      <p className="mt-3 text-sm text-ink-500 sm:text-base">
        This listing doesn’t exist or may have been removed.
      </p>
      <Link
        href="/explore"
        className="mt-6 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
      >
        Back to Explore
      </Link>
    </section>
  )
}
