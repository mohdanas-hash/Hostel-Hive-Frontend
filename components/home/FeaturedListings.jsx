import Link from 'next/link'
import { placeholderListings } from '../../data/placeholderListings'
import { ApiError, fetchExploreListings } from '../../lib/api'
import ListingCard from '../ui/ListingCard'

const FEATURED_COUNT = 4

// Round-robins across listing types so "Popular" shows a mix (e.g. a hostel,
// a mess, a cafeteria) instead of just whichever type the backend happens to
// return first.
function pickFeatured(listings, count) {
  const byType = new Map()
  for (const listing of listings) {
    if (!byType.has(listing.type)) byType.set(listing.type, [])
    byType.get(listing.type).push(listing)
  }
  const types = [...byType.keys()]
  const picked = []
  let i = 0
  while (picked.length < count && types.some((t) => byType.get(t).length > 0)) {
    const bucket = byType.get(types[i % types.length])
    if (bucket.length > 0) picked.push(bucket.shift())
    i++
  }
  return picked
}

async function getFeaturedListings() {
  try {
    const listings = await fetchExploreListings({ limit: 8 })
    return { listings: pickFeatured(listings, FEATURED_COUNT), isSample: false }
  } catch (error) {
    // A live-data outage falls back to the existing mock examples, clearly
    // labeled — never presented as real nearby properties.
    if (error instanceof ApiError) {
      return { listings: placeholderListings.slice(0, FEATURED_COUNT), isSample: true }
    }
    throw error
  }
}

export function FeaturedListingsSkeleton() {
  return (
    <section className="bg-ink-950 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-8 w-56 animate-pulse rounded-lg bg-white/10 motion-reduce:animate-none" />
        <div className="mt-3 h-4 w-72 max-w-full animate-pulse rounded bg-white/10 motion-reduce:animate-none" />
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: FEATURED_COUNT }).map((_, index) => (
            <div
              key={index}
              className="h-72 animate-pulse rounded-2xl bg-white/5 motion-reduce:animate-none"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default async function FeaturedListings() {
  const { listings, isSample } = await getFeaturedListings()

  return (
    <section className="bg-ink-950 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
                Popular on Hostel Hive
              </h2>
              {isSample && (
                <span className="rounded-full bg-amber-400/15 px-2.5 py-1 text-xs font-semibold text-amber-400">
                  Sample listings
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-ink-300 sm:text-base">
              {isSample
                ? 'Live data is temporarily unavailable — these are example listings.'
                : 'A snapshot of listings from our live catalog.'}
            </p>
          </div>
          <Link
            href="/explore"
            className="rounded text-sm font-semibold text-brand-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
          >
            View all listings →
          </Link>
        </div>

        {listings.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <p className="mt-8 text-sm text-ink-300">
            No listings available right now — check back soon.
          </p>
        )}
      </div>
    </section>
  )
}
