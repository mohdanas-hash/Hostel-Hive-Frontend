'use client'

import { useState } from 'react'
import SearchAutocomplete from '../search/SearchAutocomplete'

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2'

// A thin client wrapper around the shared SearchAutocomplete so /colleges
// (a Server Component) can still get live suggestions. The input keeps its
// `name="q"` so the surrounding <form method="get"> still works as a normal
// page search (Enter or the Search button) without JavaScript.
export default function CollegeSearchBar({ selectedCity, initialQuery }) {
  const [query, setQuery] = useState(initialQuery)

  return (
    <form method="get" className="mt-6 flex max-w-md items-center gap-2">
      {selectedCity && <input type="hidden" name="city" value={selectedCity} />}
      <label htmlFor="college-search" className="sr-only">
        Search colleges by name
      </label>
      <SearchAutocomplete
        id="college-search"
        name="q"
        value={query}
        onChange={setQuery}
        placeholder="Search colleges by name"
      />
      <button
        type="submit"
        className={`rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-500 ${FOCUS_RING}`}
      >
        Search
      </button>
    </form>
  )
}
