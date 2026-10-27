import Link from 'next/link'
import CollegeCard from '../../components/colleges/CollegeCard'
import { fetchColleges } from '../../lib/api'
import { filterColleges } from '../../lib/colleges'

export const metadata = {
  title: 'Colleges',
  description: 'Browse colleges on Hostel Hive, verified against the live catalog.',
}

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2'

export default async function CollegesPage({ searchParams }) {
  const resolvedSearchParams = await searchParams
  const selectedCity =
    typeof resolvedSearchParams?.city === 'string' ? resolvedSearchParams.city : ''
  const query = typeof resolvedSearchParams?.q === 'string' ? resolvedSearchParams.q : ''

  // A fetch failure here propagates to app/colleges/error.jsx rather than
  // being caught and swapped for mock data.
  const colleges = await fetchColleges()
  const cities = [...new Set(colleges.map((college) => college.city))].sort()
  const results = filterColleges(colleges, { city: selectedCity, q: query })

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-extrabold text-ink-950 sm:text-4xl">Colleges</h1>
        <p className="mt-3 text-sm text-ink-500 sm:text-base">
          Browse colleges from Hostel Hive&apos;s live catalog.
        </p>
      </div>

      <form method="get" className="mt-6 flex max-w-md items-center gap-2">
        {selectedCity && <input type="hidden" name="city" value={selectedCity} />}
        <label htmlFor="college-search" className="sr-only">
          Search colleges by name
        </label>
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-ink-100 bg-white px-4 py-2.5 shadow-card focus-within:ring-2 focus-within:ring-brand-500">
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 flex-shrink-0 text-ink-500"
            fill="none"
            stroke="currentColor"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" strokeWidth="2" />
            <path d="M21 21l-4.3-4.3" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            id="college-search"
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search colleges by name"
            className="w-full bg-transparent text-sm text-ink-950 placeholder:text-ink-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className={`rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-500 ${FOCUS_RING}`}
        >
          Search
        </button>
      </form>

      {/* Only worth showing once there's an actual choice to make. */}
      {cities.length > 1 && (
        <div
          className="mt-4 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter colleges by city"
        >
          <Link
            href={query ? `/colleges?q=${encodeURIComponent(query)}` : '/colleges'}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${FOCUS_RING} ${
              !selectedCity
                ? 'bg-brand-600 text-white'
                : 'border border-ink-100 bg-white text-ink-700 hover:border-brand-400'
            }`}
          >
            All cities
          </Link>
          {cities.map((city) => (
            <Link
              key={city}
              href={`/colleges?city=${encodeURIComponent(city)}${query ? `&q=${encodeURIComponent(query)}` : ''}`}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${FOCUS_RING} ${
                selectedCity === city
                  ? 'bg-brand-600 text-white'
                  : 'border border-ink-100 bg-white text-ink-700 hover:border-brand-400'
              }`}
            >
              {city}
            </Link>
          ))}
        </div>
      )}

      <p className="mt-6 text-sm font-medium text-ink-700" aria-live="polite">
        {results.length} {results.length === 1 ? 'college' : 'colleges'} found
      </p>

      {results.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((college) => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-ink-100 bg-white px-6 py-16 text-center">
          <h2 className="text-lg font-bold text-ink-950">No colleges found</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink-500">
            {selectedCity || query ? (
              <>
                No colleges match
                {query && <> &ldquo;{query}&rdquo;</>}
                {selectedCity && <> in {selectedCity}</>}.{' '}
                <Link href="/colleges" className="font-semibold text-brand-600 hover:underline">
                  View all colleges
                </Link>
                .
              </>
            ) : (
              'No colleges are available right now.'
            )}
          </p>
        </div>
      )}
    </section>
  )
}
