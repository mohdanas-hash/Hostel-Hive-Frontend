'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { FOOD_TYPE_LABELS, MESS_SORT_OPTIONS, buildMessQueryString } from '../../lib/messes'
import SearchAutocomplete from '../search/SearchAutocomplete'

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2'

function FoodTypePill({ id, checked, label, onChange }) {
  return (
    <div>
      <input
        type="radio"
        id={id}
        name="mess-food-type"
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <label
        htmlFor={id}
        className="cursor-pointer whitespace-nowrap rounded-full border border-ink-100 px-4 py-1.5 text-sm font-semibold text-ink-700 transition-colors peer-checked:border-brand-600 peer-checked:bg-brand-600 peer-checked:text-white hover:border-brand-400 peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-brand-500 peer-focus-visible:ring-offset-2"
      >
        {label}
      </label>
    </div>
  )
}

// `initialFilters` only changes between mounts: the parent Server Component
// is keyed on the current query string (see app/messes/page.jsx), so a new
// URL — including from browser back/forward — remounts this with fresh
// state, matching the existing ExploreFilters.jsx pattern.
export default function MessFilters({ foodTypeOptions, initialFilters }) {
  const router = useRouter()
  const [filters, setFilters] = useState(initialFilters)
  const [isPending, startTransition] = useTransition()

  function applyFilters(next) {
    setFilters(next)
    const qs = buildMessQueryString(next)
    startTransition(() => {
      router.push(qs ? `/messes?${qs}` : '/messes', { scroll: false })
    })
  }

  function handleSearchSubmit(event) {
    event.preventDefault()
    applyFilters({ ...filters, q: filters.q.trim() })
  }

  function handleFoodTypeChange(value) {
    applyFilters({ ...filters, foodType: value })
  }

  function commitMaxPrice() {
    applyFilters({ ...filters, maxPrice: filters.maxPrice })
  }

  function handleSortChange(event) {
    applyFilters({ ...filters, sort: event.target.value })
  }

  function handleClearAll() {
    applyFilters({ q: '', foodType: '', maxPrice: '', sort: 'relevance' })
  }

  const hasActiveFilters =
    Boolean(filters.q) ||
    Boolean(filters.foodType) ||
    Boolean(filters.maxPrice) ||
    filters.sort !== 'relevance'

  return (
    <div
      data-pending={isPending ? '' : undefined}
      aria-busy={isPending}
      className="mt-8 space-y-6 rounded-2xl border border-ink-100 bg-white p-5 shadow-card transition-opacity sm:p-6 data-[pending]:opacity-70"
    >
      <form onSubmit={handleSearchSubmit} role="search" className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="mess-search" className="sr-only">
          Search by provider name or locality
        </label>
        <SearchAutocomplete
          id="mess-search"
          value={filters.q}
          onChange={(value) => setFilters({ ...filters, q: value })}
          placeholder="Search by provider name or locality"
        />
        <button
          type="submit"
          disabled={isPending}
          className={`rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-500 disabled:cursor-wait disabled:opacity-80 ${FOCUS_RING}`}
        >
          {isPending ? 'Searching…' : 'Search'}
        </button>
      </form>

      {foodTypeOptions.length > 0 && (
        <fieldset>
          <legend className="text-xs font-semibold uppercase tracking-wide text-ink-500">
            Food type
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            <FoodTypePill
              id="mess-food-type-all"
              checked={!filters.foodType}
              label="All"
              onChange={() => handleFoodTypeChange('')}
            />
            {foodTypeOptions.map((foodType) => (
              <FoodTypePill
                key={foodType}
                id={`mess-food-type-${foodType}`}
                checked={filters.foodType === foodType}
                label={FOOD_TYPE_LABELS[foodType] ?? foodType}
                onChange={() => handleFoodTypeChange(foodType)}
              />
            ))}
          </div>
        </fieldset>
      )}

      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-wrap gap-4">
          <div>
            <label
              htmlFor="mess-max-price"
              className="text-xs font-semibold uppercase tracking-wide text-ink-500"
            >
              Max price (₹/month)
            </label>
            <input
              id="mess-max-price"
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
              htmlFor="mess-sort"
              className="text-xs font-semibold uppercase tracking-wide text-ink-500"
            >
              Sort by
            </label>
            <select
              id="mess-sort"
              value={filters.sort}
              onChange={handleSortChange}
              className={`mt-1 block rounded-lg border border-ink-100 px-3 py-2 text-sm text-ink-950 ${FOCUS_RING}`}
            >
              {MESS_SORT_OPTIONS.map((option) => (
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
