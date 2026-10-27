'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { buildExploreQueryString, SORT_OPTIONS } from '../../lib/listings'

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2'

function TypePill({ id, checked, label, onChange }) {
  return (
    <div>
      <input
        type="radio"
        id={id}
        name="explore-type"
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <label
        htmlFor={id}
        className={`cursor-pointer whitespace-nowrap rounded-full border border-ink-100 px-4 py-1.5 text-sm font-semibold text-ink-700 transition-colors peer-checked:border-brand-600 peer-checked:bg-brand-600 peer-checked:text-white hover:border-brand-400 peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-brand-500 peer-focus-visible:ring-offset-2`}
      >
        {label}
      </label>
    </div>
  )
}

export default function ExploreFilters({ typeOptions, amenityOptions, initialFilters }) {
  const router = useRouter()
  // `initialFilters` only changes between mounts: the parent Server
  // Component is keyed on the current query string (see app/explore/page.jsx),
  // so a new URL — including from browser back/forward — remounts this
  // component with fresh initial state instead of needing an effect to
  // resync it.
  const [filters, setFilters] = useState(initialFilters)
  // No route-level loading.js on /explore (see app/explore/page.jsx for why:
  // it would lock the response status to 200 even on a genuine API
  // failure). Pending feedback for every filter change is handled here
  // instead, via the official router.push()-inside-useTransition pattern —
  // see Next's "Filter with pending feedback" guide
  // (node_modules/next/dist/docs/01-app/02-guides/interactive-apps.md).
  const [isPending, startTransition] = useTransition()

  function applyFilters(next) {
    setFilters(next)
    const qs = buildExploreQueryString(next)
    startTransition(() => {
      router.push(qs ? `/explore?${qs}` : '/explore', { scroll: false })
    })
  }

  function handleSearchSubmit(event) {
    event.preventDefault()
    applyFilters({ ...filters, q: filters.q.trim() })
  }

  function handleTypeChange(value) {
    applyFilters({ ...filters, type: value })
  }

  function handleAmenityToggle(amenity) {
    const next = filters.amenities.includes(amenity)
      ? filters.amenities.filter((item) => item !== amenity)
      : [...filters.amenities, amenity]
    applyFilters({ ...filters, amenities: next })
  }

  function commitMaxPrice() {
    applyFilters({ ...filters, maxPrice: filters.maxPrice })
  }

  function handleSortChange(event) {
    applyFilters({ ...filters, sort: event.target.value })
  }

  function handleClearAll() {
    applyFilters({ q: '', type: '', amenities: [], maxPrice: '', sort: 'relevance' })
  }

  const hasActiveFilters =
    Boolean(filters.q) ||
    Boolean(filters.type) ||
    filters.amenities.length > 0 ||
    Boolean(filters.maxPrice) ||
    filters.sort !== 'relevance'

  return (
    <div
      data-pending={isPending ? '' : undefined}
      aria-busy={isPending}
      className="mt-8 space-y-6 rounded-2xl border border-ink-100 bg-white p-5 shadow-card transition-opacity sm:p-6 data-[pending]:opacity-70"
    >
      <form onSubmit={handleSearchSubmit} role="search" className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="explore-search" className="sr-only">
          Search by name or location
        </label>
        <div className="flex flex-1 items-center gap-2 rounded-xl bg-ink-50 px-4 py-3 focus-within:ring-2 focus-within:ring-brand-500">
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 flex-shrink-0 text-ink-500"
            fill="none"
            stroke="currentColor"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" strokeWidth="2" />
            <path d="M21 21l-4.3-4.3" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            id="explore-search"
            type="text"
            value={filters.q}
            onChange={(event) => setFilters({ ...filters, q: event.target.value })}
            placeholder="Search by name or location"
            className="w-full bg-transparent text-sm text-ink-950 placeholder:text-ink-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className={`rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-500 disabled:cursor-wait disabled:opacity-80 ${FOCUS_RING}`}
        >
          {isPending ? 'Searching…' : 'Search'}
        </button>
      </form>

      {!filters.type && (
        <fieldset>
          <legend className="text-xs font-semibold uppercase tracking-wide text-ink-500">
            Type
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            <TypePill
              id="explore-type-all"
              checked={!filters.type}
              label="All"
              onChange={() => handleTypeChange('')}
            />
            {typeOptions.map((type) => {
              const value = type.toLowerCase()
              return (
                <TypePill
                  key={type}
                  id={`explore-type-${value}`}
                  checked={filters.type === value}
                  label={type}
                  onChange={() => handleTypeChange(value)}
                />
              )
            })}
          </div>
        </fieldset>
      )}

      {amenityOptions.length > 0 && (
        <fieldset>
          <legend className="text-xs font-semibold uppercase tracking-wide text-ink-500">
            Amenities
          </legend>
          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
            {amenityOptions.map((amenity) => (
              <label
                key={amenity}
                className="flex items-center gap-2 text-sm text-ink-700"
              >
                <input
                  type="checkbox"
                  checked={filters.amenities.includes(amenity)}
                  onChange={() => handleAmenityToggle(amenity)}
                  className={`h-4 w-4 rounded border-ink-300 text-brand-600 ${FOCUS_RING}`}
                />
                {amenity}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-wrap gap-4">
          <div>
            <label
              htmlFor="explore-max-price"
              className="text-xs font-semibold uppercase tracking-wide text-ink-500"
            >
              Max price (₹)
            </label>
            <input
              id="explore-max-price"
              type="number"
              min="0"
              inputMode="numeric"
              value={filters.maxPrice}
              onChange={(event) => setFilters({ ...filters, maxPrice: event.target.value })}
              onBlur={commitMaxPrice}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  commitMaxPrice()
                }
              }}
              placeholder="Any"
              className={`mt-1 block w-28 rounded-lg border border-ink-100 px-3 py-2 text-sm text-ink-950 ${FOCUS_RING}`}
            />
          </div>

          <div>
            <label
              htmlFor="explore-sort"
              className="text-xs font-semibold uppercase tracking-wide text-ink-500"
            >
              Sort by
            </label>
            <select
              id="explore-sort"
              value={filters.sort}
              onChange={handleSortChange}
              className={`mt-1 block rounded-lg border border-ink-100 px-3 py-2 text-sm text-ink-950 ${FOCUS_RING}`}
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleClearAll}
            className={`self-start rounded text-sm font-semibold text-brand-600 hover:underline sm:self-auto ${FOCUS_RING}`}
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  )
}
