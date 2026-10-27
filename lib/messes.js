// Filtering/search logic for /messes, kept separate from presentation —
// mirrors lib/listings.js's pattern so the real backend response (mapMess in
// lib/api.js) can be filtered without any UI component touching raw fields.

export const FOOD_TYPE_LABELS = {
  veg: 'Vegetarian',
  non_veg: 'Non-vegetarian',
  both: 'Veg & Non-veg',
}

const DEFAULT_SORT = 'relevance'

export const MESS_SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
]

// Only offers a food-type filter option that at least one mess in the
// current dataset actually has — never shows a filter with zero results.
export function getFoodTypeOptions(messes) {
  return [...new Set(messes.map((mess) => mess.foodType).filter(Boolean))]
}

function readParam(searchParams, key) {
  const value = searchParams?.[key]
  return typeof value === 'string' ? value : ''
}

export function parseMessSearchParams(searchParams) {
  return {
    q: readParam(searchParams, 'q'),
    foodType: readParam(searchParams, 'foodType'),
    maxPrice: readParam(searchParams, 'maxPrice'),
    sort: readParam(searchParams, 'sort') || DEFAULT_SORT,
  }
}

export function buildMessQueryString(filters) {
  const params = new URLSearchParams()

  if (filters.q?.trim()) params.set('q', filters.q.trim())
  if (filters.foodType) params.set('foodType', filters.foodType)
  if (filters.maxPrice) params.set('maxPrice', filters.maxPrice)
  if (filters.sort && filters.sort !== DEFAULT_SORT) params.set('sort', filters.sort)

  return params.toString()
}

export function filterAndSortMesses(messes, filters) {
  const searchQuery = (filters.q ?? '').toString().toLowerCase().trim()
  const maxPrice = filters.maxPrice ? Number(filters.maxPrice) : null

  let results = messes.filter((mess) => {
    if (searchQuery) {
      const name = (mess?.name ?? '').toLowerCase()
      const address = (mess?.locality ?? '').toLowerCase()
      if (!name.includes(searchQuery) && !address.includes(searchQuery)) return false
    }

    if (filters.foodType && mess.foodType !== filters.foodType) {
      return false
    }

    if (
      maxPrice !== null &&
      !Number.isNaN(maxPrice) &&
      typeof mess.priceFrom === 'number' &&
      mess.priceFrom > maxPrice
    ) {
      return false
    }

    return true
  })

  results = [...results]
  switch (filters.sort) {
    case 'price-asc':
      results.sort((a, b) => (a.priceFrom ?? Infinity) - (b.priceFrom ?? Infinity))
      break
    case 'price-desc':
      results.sort((a, b) => (b.priceFrom ?? -Infinity) - (a.priceFrom ?? -Infinity))
      break
    default:
      break
  }

  return results
}
