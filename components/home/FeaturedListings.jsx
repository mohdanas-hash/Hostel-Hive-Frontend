import Link from 'next/link'
import { placeholderListings } from '../../data/placeholderListings'
import ListingCard from '../ui/ListingCard'

export default function FeaturedListings() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-2xl font-extrabold text-ink-950 sm:text-3xl">
            Popular near you
          </h2>
          <p className="mt-2 text-sm text-ink-500 sm:text-base">
            A snapshot of highly-rated hostels, messes and cafeterias.
          </p>
        </div>
        <Link
          href="/explore"
          className="rounded text-sm font-semibold text-brand-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
        >
          View all listings →
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {placeholderListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </section>
  )
}
