import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-32 text-center sm:px-6">
      <p className="text-sm font-semibold text-brand-600">404</p>
      <h1 className="mt-2 text-3xl font-extrabold text-ink-950 sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-3 text-sm text-ink-500 sm:text-base">
        The page you’re looking for doesn’t exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-500"
      >
        Back to home
      </Link>
    </section>
  )
}
