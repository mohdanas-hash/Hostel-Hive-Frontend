'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { placeholderCategories } from '../../data/placeholderListings'
import { buildExploreQueryString, CATEGORY_TYPE_MAP } from '../../lib/listings'

export default function Hero() {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState(
    placeholderCategories[0].id,
  )
  const [query, setQuery] = useState('')

  function handleSearchSubmit(event) {
    event.preventDefault()

    // The mock data has no "College" listings, so a college search has
    // nothing to filter — send it to the dedicated Colleges page instead of
    // an Explore results page that could only ever show zero results.
    if (activeCategory === 'colleges') {
      router.push('/colleges')
      return
    }

    const qs = buildExploreQueryString({
      q: query,
      type: CATEGORY_TYPE_MAP[activeCategory] ?? '',
      amenities: [],
      maxPrice: '',
      sort: 'relevance',
    })
    router.push(qs ? `/explore?${qs}` : '/explore')
  }

  return (
    <section className="relative overflow-hidden bg-ink-950">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            'radial-gradient(60% 50% at 80% 0%, rgba(124,58,237,0.55), transparent), radial-gradient(45% 45% at 12% 105%, rgba(245,158,11,0.3), transparent), radial-gradient(35% 35% at 50% 0%, rgba(157,92,245,0.25), transparent)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'linear-gradient(to bottom, black, transparent)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            Trusted by 12,000+ students across 40+ campuses
          </span>

          <h1 className="animate-fade-up-1 font-display mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Find your home away from home,{' '}
            <span className="italic text-brand-400">sorted.</span>
          </h1>

          <p className="animate-fade-up-2 mx-auto mt-5 max-w-xl text-base text-ink-300 sm:text-lg">
            Discover and compare hostels, messes, cafeterias and colleges —
            backed by real reviews from real students.
          </p>
        </div>

        <div className="animate-fade-up-3 mx-auto mt-10 max-w-3xl rounded-2xl bg-white p-2 shadow-glow sm:p-3">
          <div className="flex gap-1 overflow-x-auto px-2 pt-1 pb-3 sm:px-1">
            {placeholderCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                aria-pressed={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                  activeCategory === category.id
                    ? 'bg-brand-600 text-white'
                    : 'text-ink-500 hover:bg-ink-50'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <form
            className="flex flex-col gap-2 p-1 sm:flex-row"
            onSubmit={handleSearchSubmit}
          >
            <label htmlFor="hero-search" className="sr-only">
              Search by college, city or locality
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
                id="hero-search"
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by college, city or locality"
                className="w-full bg-transparent text-sm text-ink-950 placeholder:text-ink-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
            >
              Search
            </button>
          </form>
        </div>

        <div className="animate-fade-up-3 mx-auto mt-12 grid max-w-3xl grid-cols-3 gap-4 text-center text-white sm:gap-8">
          {[
            ['2,400+', 'Verified listings'],
            ['12,000+', 'Student reviews'],
            ['40+', 'Campuses covered'],
          ].map(([value, label]) => (
            <div key={label}>
              <p className="text-2xl font-extrabold sm:text-3xl">{value}</p>
              <p className="mt-1 text-xs text-ink-300 sm:text-sm">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
