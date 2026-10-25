// Minimal fetch layer for the verified, public, read-only listing endpoints
// on the real Hostel Hive backend. Built against the OpenAPI spec and live
// sample responses fetched from https://hostel-hive-backend.onrender.com —
// see the Phase 0 integration audit for the full schema verification.
//
// Deliberately uses only native `fetch` (no new dependency). Only `limit` is
// sent as a query parameter: the backend supports several server-side
// filters (min_price, max_price, amenity, sort, ...) but their shapes don't
// line up with the existing Explore UI (e.g. there is no backend text-search
// param, and sort options differ per listing type with no "rating" option at
// all) — pretending those controls are server-side would misrepresent what
// the API actually does. Filtering/sorting therefore still happens
// client-side, in lib/listings.js, exactly as it did against mock data.

const API_BASE_URL = 'https://hostel-hive-backend.onrender.com'

// The backend caps `limit` at 200 and returns a bare array with no total
// count — there is no way to know how many listings exist beyond fetching a
// page of them. 100 is a reasonable single-page sample for this phase; real
// pagination is out of scope here.
const DEFAULT_LISTING_LIMIT = 100

export class ApiError extends Error {}

async function doFetch(path) {
  try {
    return await fetch(`${API_BASE_URL}${path}`, {
      // Revalidate periodically instead of refetching on every request: the
      // Explore page re-renders on every filter change (it reads
      // searchParams), but filtering happens client-side against this same
      // dataset, so there is no need to hit the live backend again for
      // every click — only once per minute at most.
      next: { revalidate: 60 },
    })
  } catch (cause) {
    throw new ApiError(`Network error requesting ${path}`, { cause })
  }
}

async function fetchJson(path) {
  const response = await doFetch(path)

  if (!response.ok) {
    throw new ApiError(`${path} responded with status ${response.status}`)
  }

  return response.json()
}

// For single-item lookups: a 404 is a legitimate "this id doesn't exist"
// answer, not a failure — callers use it to render a not-found state
// instead of the error boundary. Any other non-OK status still throws.
async function fetchJsonOrNull(path) {
  const response = await doFetch(path)

  if (response.status === 404) return null

  if (!response.ok) {
    throw new ApiError(`${path} responded with status ${response.status}`)
  }

  return response.json()
}

function safeRating(value) {
  return typeof value === 'number' ? value : null
}

function safeLocality(address) {
  return address && address.trim() ? address.trim() : 'Address not listed yet'
}

// Maps each verified backend record into the existing listing-card model
// ({ id, name, type, locality, rating, priceFrom, amenities, ... }). IDs are
// namespaced by type because the three tables have independent, overlapping
// integer id sequences. Extra verified fields are carried through under
// their own names for later phases to use — nothing here is invented.
function mapHostel(record) {
  return {
    id: `hostel-${record.id}`,
    name: record.name,
    type: 'Hostel',
    locality: safeLocality(record.address),
    rating: safeRating(record.avg_rating),
    reviews: null,
    priceFrom: record.monthly_rent,
    priceUnit: 'month',
    amenities: record.amenities ?? [],
    imageUrl: record.image_url ?? null,
    gender: record.gender,
    roomType: record.room_type,
    hasAc: record.has_ac,
    includesMess: record.includes_mess,
    availableBeds: record.available_beds,
    totalBeds: record.total_beds,
  }
}

function mapMess(record) {
  return {
    id: `mess-${record.id}`,
    name: record.name,
    type: 'Mess',
    locality: safeLocality(record.address),
    rating: safeRating(record.avg_rating),
    reviews: null,
    priceFrom: record.monthly_price,
    priceUnit: 'month',
    amenities: record.amenities ?? [],
    imageUrl: record.image_url ?? null,
    foodType: record.food_type,
    mealsPerDay: record.meals_per_day,
    hygieneRating: safeRating(record.hygiene_rating),
  }
}

function mapCafeteria(record) {
  return {
    id: `cafeteria-${record.id}`,
    name: record.name,
    type: 'Cafeteria',
    locality: safeLocality(record.address),
    rating: safeRating(record.avg_rating),
    reviews: null,
    priceFrom: record.avg_meal_price,
    priceUnit: 'meal',
    amenities: record.amenities ?? [],
    imageUrl: record.image_url ?? null,
    foodType: record.food_type,
    cuisine: record.cuisine,
    homeDelivery: record.home_delivery,
    opensAt: record.opens_at,
    closesAt: record.closes_at,
    hygieneRating: safeRating(record.hygiene_rating),
  }
}

// Fetches hostels, messes and cafeterias in parallel and returns one merged,
// normalized array ready for lib/listings.js's existing filter/sort
// functions. If any of the three requests fails, this throws (via
// Promise.all) rather than silently returning a partial or mock result —
// the caller (app/explore/page.jsx) lets that propagate to error.jsx.
export async function fetchExploreListings({ limit = DEFAULT_LISTING_LIMIT } = {}) {
  const [hostels, messes, cafeterias] = await Promise.all([
    fetchJson(`/hostels?limit=${limit}`),
    fetchJson(`/messes?limit=${limit}`),
    fetchJson(`/cafeterias?limit=${limit}`),
  ])

  return [
    ...hostels.map(mapHostel),
    ...messes.map(mapMess),
    ...cafeterias.map(mapCafeteria),
  ]
}

// Single-item lookups for the listing detail route. Each returns the same
// normalized shape as fetchExploreListings' entries, or `null` if the
// backend genuinely has no record with that id (a real 404, not an error).
export async function fetchHostelById(id) {
  const record = await fetchJsonOrNull(`/hostels/${id}`)
  return record ? mapHostel(record) : null
}

export async function fetchMessById(id) {
  const record = await fetchJsonOrNull(`/messes/${id}`)
  return record ? mapMess(record) : null
}

export async function fetchCafeteriaById(id) {
  const record = await fetchJsonOrNull(`/cafeterias/${id}`)
  return record ? mapCafeteria(record) : null
}

// Colleges have no listing-style fields (no price, rating, amenities,
// photos) — deliberately not run through mapHostel/mapMess/mapCafeteria,
// since that shape doesn't apply here. College ids are plain backend
// integers: they're never routed through /listings/[id], so there's no
// collision risk with the type-prefixed hostel/mess/cafeteria ids to guard
// against.
function mapCollege(record) {
  return {
    id: record.id,
    name: record.name,
    city: record.city,
    address: record.address && record.address.trim() ? record.address.trim() : null,
    isCentral: Boolean(record.is_central),
  }
}

// The backend's `city` filter is real (unlike Explore's free-text search),
// but with only a handful of colleges total and no pagination on this
// endpoint, the page fetches the full list once and filters by city
// client-side — one network call instead of two, while still never
// claiming a filter the API doesn't support.
export async function fetchColleges() {
  const records = await fetchJson('/colleges')
  return records.map(mapCollege)
}
