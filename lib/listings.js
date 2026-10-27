// Filtering/sorting logic for the Explore page, kept separate from
// presentation so the mock data source in data/placeholderListings.js can
// later be swapped for a real API response without rewriting this module's
// callers.

// Maps a Hero/CategoryGrid category id (plural, matches
// data/placeholderListings.js `placeholderCategories`) to the `type` query
// value used on /explore. "colleges" is intentionally omitted: no listing in
// the mock data has type "College", so there is nothing for it to filter —
// it is routed to the existing /colleges page instead (see Hero.jsx and
// CategoryGrid.jsx).
export const CATEGORY_TYPE_MAP = {
  hostels: 'hostel',
  messes: 'mess',
  cafeterias: 'cafeteria',
}

export const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Rating: High to Low' },
]

const DEFAULT_SORT = 'relevance'

// Shared by ListingCard.jsx and the listing detail page so both label prices
// identically. Mock data (data/placeholderListings.js) has no `priceUnit`
// field at all, so callers fall back to the historical '/mo' label when this
// map has no match — that keeps the homepage's mock cards unchanged.
// Cafeteria prices are a per-meal average, never monthly, so they get their
// own explicit label rather than reusing "/month".
export const PRICE_UNIT_SUFFIX = {
  month: '/month',
  meal: ' avg. per meal',
}

// Listing types actually present in the mock data, used to build the Explore
// page's type filter so it never offers an option with zero possible results.
export function getListingTypes(listings) {
  return [...new Set(listings.map((listing) => listing.type))].sort()
}

export function getAmenityOptions(listings) {
  const amenities = new Set()
  for (const listing of listings) {
    for (const amenity of listing.amenities ?? []) {
      amenities.add(amenity)
    }
  }
  return [...amenities].sort()
}

function readParam(searchParams, key) {
  const value = searchParams?.[key]
  return typeof value === 'string' ? value : ''
}

export function parseExploreSearchParams(searchParams) {
  const amenitiesParam = readParam(searchParams, 'amenities')

  return {
    q: readParam(searchParams, 'q'),
    type: readParam(searchParams, 'type').toLowerCase(),
    amenities: amenitiesParam ? amenitiesParam.split(',').filter(Boolean) : [],
    maxPrice: readParam(searchParams, 'maxPrice'),
    sort: readParam(searchParams, 'sort') || DEFAULT_SORT,
  }
}

export function buildExploreQueryString(filters) {
  const params = new URLSearchParams()

  if (filters.q?.trim()) params.set('q', filters.q.trim())
  if (filters.type) params.set('type', filters.type)
  if (filters.amenities?.length) params.set('amenities', filters.amenities.join(','))
  if (filters.maxPrice) params.set('maxPrice', filters.maxPrice)
  if (filters.sort && filters.sort !== DEFAULT_SORT) params.set('sort', filters.sort)

  return params.toString()
}

export function getListingById(listings, id) {
  return listings.find((listing) => listing.id === id) ?? null
}

// A listing only gets a map marker once it carries verified latitude/
// longitude fields. data/placeholderListings.js does not include these yet —
// callers must not geocode `locality` text to fake coordinates.
export function hasVerifiedCoordinates(listing) {
  return (
    typeof listing?.latitude === 'number' &&
    typeof listing?.longitude === 'number'
  )
}

export function filterAndSortListings(listings, filters) {
  const searchQuery = (filters.q ?? '').toString().toLowerCase().trim()
  const maxPrice = filters.maxPrice ? Number(filters.maxPrice) : null

  let results = listings.filter((listing) => {
    if (searchQuery) {
      const name = (listing?.name ?? '').toLowerCase()
      const address = (listing?.locality ?? '').toLowerCase()
      if (!name.includes(searchQuery) && !address.includes(searchQuery)) return false
    }

    if (filters.type && listing.type.toLowerCase() !== filters.type) {
      return false
    }

    if (filters.amenities?.length) {
      const listingAmenities = listing.amenities ?? []
      const hasAllAmenities = filters.amenities.every((amenity) =>
        listingAmenities.includes(amenity),
      )
      if (!hasAllAmenities) return false
    }

    if (maxPrice !== null && !Number.isNaN(maxPrice) && listing.priceFrom > maxPrice) {
      return false
    }

    return true
  })

  results = [...results]
  switch (filters.sort) {
    case 'price-asc':
      results.sort((a, b) => a.priceFrom - b.priceFrom)
      break
    case 'price-desc':
      results.sort((a, b) => b.priceFrom - a.priceFrom)
      break
    case 'rating-desc':
      // Real listings can have a null rating (no reviews yet) — sort those
      // last. Subtracting two -Infinity fallbacks produces NaN, which breaks
      // Array.sort's stability guarantee (verified live: every listing
      // currently has a null rating, and the naive `(b ?? -Infinity) -
      // (a ?? -Infinity)` comparator visibly scrambled the order because of
      // it) — so ties, including the common null/null case, are resolved
      // explicitly instead of via subtraction.
      results.sort((a, b) => {
        const ratingA = typeof a.rating === 'number' ? a.rating : -Infinity
        const ratingB = typeof b.rating === 'number' ? b.rating : -Infinity
        if (ratingA === ratingB) return 0
        return ratingB - ratingA
      })
      break
    default:
      break
  }

  return results
}
