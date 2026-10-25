import Link from 'next/link'
import { notFound } from 'next/navigation'
import BookingAction from '../../../components/listing/BookingAction'
import LocationMap from '../../../components/listing/LocationMap'
import { placeholderListings } from '../../../data/placeholderListings'
import { fetchCafeteriaById, fetchHostelById, fetchMessById } from '../../../lib/api'
import { getListingById, PRICE_UNIT_SUFFIX } from '../../../lib/listings'

// Real listing ids are namespaced by type (see lib/api.js), e.g. "hostel-9",
// which already disambiguates the three backend tables' independent,
// overlapping integer id sequences from a single [id] route segment — so a
// separate /listings/[type]/[id] route isn't needed. Anything that doesn't
// match this pattern (e.g. "ph-1") is treated as mock data, preserving the
// existing /listings/[id] route and homepage links untouched.
const REAL_ID_PATTERN = /^(hostel|mess|cafeteria)-(\d+)$/

const REAL_FETCHERS = {
  hostel: fetchHostelById,
  mess: fetchMessById,
  cafeteria: fetchCafeteriaById,
}

const GENDER_LABELS = { boys: 'Boys', girls: 'Girls', co_ed: 'Co-ed' }
const FOOD_TYPE_LABELS = {
  veg: 'Vegetarian',
  non_veg: 'Non-vegetarian',
  both: 'Veg & non-veg',
}

async function resolveListing(id) {
  const match = id.match(REAL_ID_PATTERN)

  if (match) {
    const [, typeSlug, numericId] = match
    // Lets a genuine fetch failure (network error, 5xx) propagate to
    // app/listings/[id]/error.jsx rather than being caught and swapped for
    // mock data. A real 404 resolves to `null` here, handled below.
    const listing = await REAL_FETCHERS[typeSlug](numericId)
    return { listing, isRealData: true }
  }

  return { listing: getListingById(placeholderListings, id), isRealData: false }
}

function buildDetailRows(listing) {
  if (listing.type === 'Hostel') {
    const rows = []
    if (listing.gender) {
      rows.push(['Gender', GENDER_LABELS[listing.gender] ?? listing.gender])
    }
    if (listing.roomType) rows.push(['Room type', listing.roomType])
    if (listing.availableBeds != null && listing.totalBeds != null) {
      rows.push(['Beds available', `${listing.availableBeds} of ${listing.totalBeds}`])
    }
    if (typeof listing.hasAc === 'boolean') {
      rows.push(['AC', listing.hasAc ? 'Yes' : 'No'])
    }
    if (typeof listing.includesMess === 'boolean') {
      rows.push(['Mess included', listing.includesMess ? 'Yes' : 'No'])
    }
    return rows
  }

  if (listing.type === 'Mess') {
    const rows = []
    if (listing.foodType) {
      rows.push(['Food type', FOOD_TYPE_LABELS[listing.foodType] ?? listing.foodType])
    }
    if (listing.mealsPerDay != null) rows.push(['Meals per day', listing.mealsPerDay])
    if (listing.hygieneRating != null) rows.push(['Hygiene rating', listing.hygieneRating])
    return rows
  }

  if (listing.type === 'Cafeteria') {
    const rows = []
    if (listing.cuisine) rows.push(['Cuisine', listing.cuisine])
    if (typeof listing.homeDelivery === 'boolean') {
      rows.push(['Home delivery', listing.homeDelivery ? 'Yes' : 'No'])
    }
    if (listing.opensAt && listing.closesAt) {
      rows.push(['Hours', `${listing.opensAt} – ${listing.closesAt}`])
    }
    if (listing.hygieneRating != null) rows.push(['Hygiene rating', listing.hygieneRating])
    return rows
  }

  return []
}

// Matches lib/api.js's safeLocality() fallback string. Duplicated here
// (rather than imported) because that fallback is private to lib/api.js —
// if it ever changes, update both.
const UNKNOWN_LOCALITY = 'Address not listed yet'

function buildListingDescription(listing) {
  const hasKnownLocality = listing.locality && listing.locality !== UNKNOWN_LOCALITY
  return hasKnownLocality
    ? `${listing.type} in ${listing.locality} on Hostel Hive.`
    : `${listing.type} on Hostel Hive.`
}

export async function generateMetadata({ params }) {
  const { id } = await params
  const { listing } = await resolveListing(id)

  if (!listing) {
    return { title: 'Listing not found' }
  }

  return {
    title: listing.name,
    description: buildListingDescription(listing),
  }
}

export default async function ListingDetailPage({ params }) {
  const { id } = await params
  const { listing, isRealData } = await resolveListing(id)

  if (!listing) {
    notFound()
  }

  const { name, type, locality, rating, reviews, priceFrom, amenities, priceUnit } = listing
  const priceSuffix = PRICE_UNIT_SUFFIX[priceUnit] ?? '/mo'
  const priceDisplay =
    typeof priceFrom === 'number' && Number.isFinite(priceFrom)
      ? `₹${priceFrom.toLocaleString('en-IN')}`
      : 'Price unavailable'
  const detailRows = buildDetailRows(listing)

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/explore"
        className="inline-flex items-center gap-1 rounded text-sm font-semibold text-brand-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
      >
        ← Back to Explore
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <span className="inline-flex rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-600">
            {type}
          </span>

          <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
            <h1 className="text-3xl font-extrabold text-ink-950 sm:text-4xl">
              {name}
            </h1>
            {rating != null && (
              <div className="flex items-center gap-1 text-base font-semibold text-ink-950">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-amber-500"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8l-6.2 3.2 1.2-6.8-5-4.9 6.9-1z" />
                </svg>
                {rating}
                {reviews != null && (
                  <span className="text-sm font-normal text-ink-500">
                    ({reviews} reviews)
                  </span>
                )}
              </div>
            )}
          </div>

          <p className="mt-2 text-sm text-ink-500 sm:text-base">{locality}</p>

          {isRealData ? (
            rating == null && (
              <p className="mt-1 text-xs text-ink-400">
                No rating yet — this listing has no reviews on record.
              </p>
            )
          ) : (
            <p className="mt-1 text-xs text-ink-400">
              Rating and review count are sample/prototype data, not live figures.
            </p>
          )}

          {detailRows.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-bold text-ink-950">Details</h2>
              <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 rounded-2xl border border-ink-100 bg-white p-4 shadow-card sm:grid-cols-2">
                {detailRows.map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between gap-4 text-sm sm:justify-start sm:gap-2">
                    <dt className="text-ink-500">{label}</dt>
                    <dd className="font-semibold text-ink-950">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {amenities?.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-bold text-ink-950">Amenities</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="rounded-full bg-ink-50 px-3 py-1.5 text-sm text-ink-700"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8">
            <LocationMap listing={listing} />
          </div>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-card">
            <p className="text-2xl font-extrabold text-ink-950">
              {priceDisplay}
              {priceDisplay !== 'Price unavailable' && (
                <span className="text-sm font-normal text-ink-500">{priceSuffix}</span>
              )}
            </p>
            <p className="mt-1 text-xs text-ink-500">
              {isRealData ? 'Starting price' : 'Starting price — sample data.'}
            </p>
          </div>

          <BookingAction type={type} />
        </aside>
      </div>
    </section>
  )
}
