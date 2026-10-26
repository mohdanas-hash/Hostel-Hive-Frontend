import Link from 'next/link'
import MessCard from '../../components/messes/MessCard'
import MessFilters from '../../components/messes/MessFilters'
import { placeholderMesses } from '../../data/placeholderMesses'
import { ApiError, fetchMesses } from '../../lib/api'
import { filterAndSortMesses, getFoodTypeOptions, parseMessSearchParams } from '../../lib/messes'

export const metadata = {
  title: 'Messes & Food',
  description:
    'Discover mess services, tiffin providers and affordable food options near your college on Hostel Hive.',
  alternates: { canonical: '/messes' },
}

// A backend outage falls back to a small, clearly labelled example dataset
// instead of showing a hard error for the whole page — mirrors the same
// isSample pattern already used by components/home/FeaturedListings.jsx.
async function getMesses() {
  try {
    const messes = await fetchMesses()
    return { messes, isSample: false }
  } catch (error) {
    if (error instanceof ApiError) {
      return { messes: placeholderMesses, isSample: true }
    }
    throw error
  }
}

export default async function MessesPage({ searchParams }) {
  const resolvedSearchParams = await searchParams
  const filters = parseMessSearchParams(resolvedSearchParams)
  const { messes, isSample } = await getMesses()
  const foodTypeOptions = getFoodTypeOptions(messes)
  const results = filterAndSortMesses(messes, filters)

  return (
    <section className="group mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-extrabold text-ink-950 sm:text-4xl">Messes & Food</h1>
        <p className="mt-3 text-sm text-ink-500 sm:text-base">
          Discover mess services, tiffin providers and affordable food options
          near your college — compare food type, meals per day and monthly
          pricing before you decide.
        </p>
      </div>

      {isSample && (
        <div className="mt-5 flex items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-400/10 px-4 py-3 text-xs text-ink-700 sm:text-sm">
          <svg
            viewBox="0 0 24 24"
            className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500"
            fill="none"
            stroke="currentColor"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" strokeWidth="2" />
            <path d="M12 11v5" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="8" r="0.5" fill="currentColor" stroke="none" />
          </svg>
          <p>
            <strong className="font-semibold">Demo data:</strong> Hostel
            Hive&apos;s live catalog is temporarily unavailable, so the
            listings below are illustrative examples, not real providers.
            Provider details are not independently verified.
          </p>
        </div>
      )}

      <MessFilters
        key={JSON.stringify(filters)}
        foodTypeOptions={foodTypeOptions}
        initialFilters={filters}
      />

      <div className="transition-opacity group-has-[[data-pending]]:opacity-60">
        <p className="mt-6 text-sm font-medium text-ink-700" aria-live="polite">
          {results.length} {results.length === 1 ? 'provider' : 'providers'} found
        </p>

        {results.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((mess) => (
              <MessCard key={mess.id} mess={mess} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-ink-100 bg-white px-6 py-16 text-center">
            <h2 className="text-lg font-bold text-ink-950">
              No providers match your filters
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink-500">
              Try a different search term or remove a filter. You can also{' '}
              <Link href="/messes" className="font-semibold text-brand-600 hover:underline">
                start over
              </Link>{' '}
              to see all providers.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
