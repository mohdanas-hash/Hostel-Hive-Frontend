import Link from 'next/link'
import Reveal from '../ui/Reveal'

export default function CtaBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal className="relative overflow-hidden rounded-3xl bg-ink-950 px-6 py-14 sm:px-16">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(55% 70% at 88% 0%, rgba(124,58,237,0.45), transparent), radial-gradient(40% 55% at 6% 100%, rgba(20,184,166,0.3), transparent)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative grid gap-8 sm:grid-cols-[1.4fr_1fr] sm:items-center">
          <div className="text-center sm:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-teal-100">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
              Free for students, always
            </span>
            <h2 className="font-display mt-4 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Moving to a new city for college?
            </h2>
            <p className="mt-3 max-w-xl text-sm text-ink-300 sm:text-base">
              Create a free profile to save listings, compare options and get
              personalized recommendations before move-in day.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 sm:items-end">
            <Link
              href="/register"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-600 shadow-glow transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 sm:w-auto"
            >
              Create your free account
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <p className="text-xs text-ink-300">
              Already have one?{' '}
              <Link href="/login" className="font-semibold text-white underline-offset-2 hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
