import Image from 'next/image'
import Link from 'next/link'
import { PRICE_UNIT_SUFFIX } from '../../lib/listings'
import FavoriteButton from './FavoriteButton'
import ListingLinkHint from './ListingLinkHint'

export default function ListingCard({ listing }) {
  const {
    id,
    name,
    type,
    locality,
    rating,
    reviews,
    priceFrom,
    priceUnit,
    amenities,
    imageUrl,
  } = listing

  const priceSuffix = PRICE_UNIT_SUFFIX[priceUnit] ?? '/mo'
  const priceDisplay =
    typeof priceFrom === 'number' && Number.isFinite(priceFrom)
      ? `₹${priceFrom.toLocaleString('en-IN')}`
      : 'Price unavailable'

  return (
    <article className="group overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-float motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div className="relative h-40 overflow-hidden bg-gradient-to-br from-brand-100 to-amber-400/20">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        )}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-600">
          {type}
        </span>
        <FavoriteButton
          item={{ id, name, type, location: locality, href: `/listings/${id}` }}
          className="absolute right-3 top-3"
        />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold text-ink-950">{name}</h3>
          {rating != null && (
            <div className="flex items-center gap-1 text-sm font-semibold text-ink-950">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-amber-500" fill="currentColor">
                <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8l-6.2 3.2 1.2-6.8-5-4.9 6.9-1z" />
              </svg>
              {rating}
            </div>
          )}
        </div>

        <p className="mt-1 text-sm text-ink-500">{locality}</p>

        {amenities.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {amenities.slice(0, 3).map((item) => (
              <span
                key={item}
                className="rounded-full bg-ink-50 px-2.5 py-1 text-xs text-ink-700"
              >
                {item}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between border-t border-ink-100 pt-4">
          <div>
            <p className="text-sm font-bold text-ink-950">
              {priceDisplay}
              {priceDisplay !== 'Price unavailable' && (
                <span className="text-xs font-normal text-ink-500">{priceSuffix}</span>
              )}
            </p>
            {reviews != null && (
              <p className="text-xs text-ink-500">{reviews} reviews</p>
            )}
          </div>
          <Link
            href={`/listings/${id}`}
            prefetch={false}
            className="inline-flex items-center rounded-full border border-brand-600 px-4 py-1.5 text-xs font-semibold text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            View details
            <ListingLinkHint />
          </Link>
        </div>
      </div>
    </article>
  )
}
