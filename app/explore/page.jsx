import Link from 'next/link'
import ExploreFilters from '../../components/explore/ExploreFilters'
import ListingCard from '../../components/ui/ListingCard'
import { fetchExploreListings } from '../../lib/api'
import {
  filterAndSortListings,
  getAmenityOptions,
  getListingTypes,
  parseExploreSearchParams,
} from '../../lib/listings'

export const metadata = {
  title: 'Explore Hostels, Messes & Cafeterias',
  description:
    'Search and filter real student hostels, messes and cafeterias on Hostel Hive.',
}

export default async function ExplorePage({ searchParams }) {
  const resolvedSearchParams = await searchParams
  const filters = parseExploreSearchParams(resolvedSearchParams)
  // A fetch failure here propagates to app/explore/error.jsx rather than
  // being caught and papered over with mock data.
  const listings = await fetchExploreListings()
  const typeOptions = getListingTypes(listings)
  const amenityOptions = getAmenityOptions(listings)
  const results = filterAndSortListings(listings, filters)

  return (
    <section className="group mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-extrabold text-ink-950 sm:text-4xl">
          Explore hostels, messes & cafeterias
        </h1>
        <p className="mt-3 text-sm text-ink-500 sm:text-base">
          Search and filter live listings from Hostel Hive&apos;s catalog.
        </p>
      </div>

      <ExploreFilters
        key={JSON.stringify(filters)}
        typeOptions={typeOptions}
        amenityOptions={amenityOptions}
        initialFilters={filters}
      />

      {/* Dims while a filter change is pending (see ExploreFilters.jsx's
          data-pending marker) — no route-level loading.js is used here, so
          this is the page's only "something is loading" signal. */}
      <div className="transition-opacity group-has-[[data-pending]]:opacity-60">
        <p className="mt-6 text-sm font-medium text-ink-700" aria-live="polite">
          {results.length} {results.length === 1 ? 'listing' : 'listings'} found
        </p>

        {results.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-ink-100 bg-white px-6 py-16 text-center">
            <h2 className="text-lg font-bold text-ink-950">
              No listings match your filters
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink-500">
              Try a different search term or remove a filter. You can also{' '}
              <Link href="/explore" className="font-semibold text-brand-600 hover:underline">
                start over
              </Link>{' '}
              to see all listings.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
