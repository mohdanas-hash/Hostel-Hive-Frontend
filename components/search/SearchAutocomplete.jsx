'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const TYPE_BADGE_STYLES = {
  Hostel: 'bg-brand-100 text-brand-600',
  Mess: 'bg-amber-400/20 text-amber-600',
  Cafeteria: 'bg-teal-100 text-teal-600',
  College: 'bg-accent-500/15 text-accent-600',
}

const MIN_QUERY_LENGTH = 2
const DEBOUNCE_MS = 250

// Floating autocomplete used by the Hero, Explore, Mess and Colleges search
// bars. Renders the search-icon + text input itself (so every caller gets
// identical markup/behavior) plus a results dropdown fed by
// /api/search-suggestions. Selecting a result navigates straight to it;
// typing and submitting the surrounding <form> still runs that page's own
// search as before — this only adds the live suggestions on top.
export default function SearchAutocomplete({
  id,
  name,
  value,
  onChange,
  placeholder,
  autoFocus = false,
}) {
  const router = useRouter()
  const containerRef = useRef(null)
  const [results, setResults] = useState([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const query = value.trim()
    if (query.length < MIN_QUERY_LENGTH) {
      setResults([])
      setOpen(false)
      return undefined
    }

    let cancelled = false
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(`/api/search-suggestions?q=${encodeURIComponent(query)}`)
        if (cancelled || !response.ok) return
        const data = await response.json()
        if (cancelled) return
        setResults(data.results ?? [])
        setOpen(true)
      } catch {
        if (!cancelled) setResults([])
      }
    }, DEBOUNCE_MS)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [value])

  useEffect(() => {
    function handlePointerDown(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [])

  function handleSelect(result) {
    setOpen(false)
    router.push(result.href)
  }

  return (
    <div ref={containerRef} className="relative flex-1">
      <div className="flex items-center gap-2 rounded-xl bg-ink-50 px-4 py-3 focus-within:ring-2 focus-within:ring-brand-500">
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
          id={id}
          name={name}
          type="text"
          value={value}
          autoComplete="off"
          autoFocus={autoFocus}
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => {
            if (results.length > 0) setOpen(true)
          }}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-ink-950 placeholder:text-ink-500 focus:outline-none"
        />
      </div>

      {open && results.length > 0 && (
        <ul className="absolute left-0 right-0 top-full z-20 mt-2 max-h-80 overflow-y-auto rounded-xl border border-ink-100 bg-white py-2 shadow-float">
          {results.map((result) => (
            <li key={`${result.type}-${result.id}`}>
              <button
                type="button"
                onClick={() => handleSelect(result)}
                className="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left transition-colors hover:bg-ink-50 focus-visible:bg-ink-50 focus-visible:outline-none"
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-ink-950">
                    {result.name}
                  </span>
                  {result.location && (
                    <span className="block truncate text-xs text-ink-500">{result.location}</span>
                  )}
                </span>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    TYPE_BADGE_STYLES[result.type] ?? 'bg-ink-100 text-ink-700'
                  }`}
                >
                  {result.type}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
