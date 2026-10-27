import { NextResponse } from 'next/server'
import { fetchColleges, fetchExploreListings } from '../../../lib/api'

// Powers the autocomplete dropdown shared by the Hero, Explore, Mess and
// Colleges search bars (components/search/SearchAutocomplete.jsx). Runs
// server-side so the full catalog never ships to the client just to filter
// it — lib/api.js's `next: { revalidate: 60 }` fetches mean this is cheap on
// repeat calls within that window.
const MAX_RESULTS = 8

function matchesQuery(query, ...fields) {
  const haystack = fields
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
  return haystack.includes(query)
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query = (searchParams.get('q') ?? '').toLowerCase().trim()

  if (!query) {
    return NextResponse.json({ results: [] })
  }

  const [listings, colleges] = await Promise.all([
    fetchExploreListings().catch(() => []),
    fetchColleges().catch(() => []),
  ])

  const listingResults = listings
    .filter((item) => matchesQuery(query, item.name, item.locality))
    .map((item) => ({
      id: item.id,
      name: item.name,
      type: item.type,
      location: item.locality,
      href: `/listings/${item.id}`,
    }))

  const collegeResults = colleges
    .filter((college) => matchesQuery(query, college.name, college.city, college.address))
    .map((college) => ({
      id: `college-${college.id}`,
      name: college.name,
      type: 'College',
      location: college.city,
      href: `/colleges?q=${encodeURIComponent(college.name)}`,
    }))

  const results = [...listingResults, ...collegeResults].slice(0, MAX_RESULTS)

  return NextResponse.json({ results })
}
