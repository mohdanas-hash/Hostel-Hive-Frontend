'use client'

import Link from 'next/link'
import { useFavorites } from '../../lib/useFavorites'
import { removeFavorite } from '../../lib/favorites'

const TYPE_BADGE_STYLES = {
  Hostel: 'bg-brand-100 text-brand-600',
  Mess: 'bg-amber-400/20 text-amber-600',
  Cafeteria: 'bg-teal-100 text-teal-600',
  College: 'bg-accent-500/15 text-accent-600',
}

const GROUP_ORDER = ['Hostel', 'Mess', 'Cafeteria', 'College']

export default function SavedItems() {
  const favorites = useFavorites()

  if (favorites.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-ink-100 bg-white px-6 py-10 text-center">
        <h3 className="text-sm font-bold text-ink-950">Nothing saved yet</h3>
        <p className="mx-auto mt-1.5 max-w-sm text-sm text-ink-500">
          Tap the heart on any hostel, mess, cafeteria or college to save it here for quick
          access.
        </p>
      </div>
    )
  }

  const grouped = GROUP_ORDER.map((type) => ({
    type,
    items: favorites.filter((item) => item.type === type),
  })).filter((group) => group.items.length > 0)

  return (
    <div className="space-y-6">
      {grouped.map((group) => (
        <div key={group.type}>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-500">
            {group.type === 'Hostel' ? 'Hostels' : `${group.type}s`}
          </h3>
          <ul className="mt-2 space-y-2">
            {group.items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-ink-100 bg-white px-4 py-3"
              >
                <Link href={item.href} className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink-950">{item.name}</p>
                  {item.location && (
                    <p className="truncate text-xs text-ink-500">{item.location}</p>
                  )}
                </Link>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    TYPE_BADGE_STYLES[item.type] ?? 'bg-ink-100 text-ink-700'
                  }`}
                >
                  {item.type}
                </span>
                <button
                  type="button"
                  onClick={() => removeFavorite(item.id)}
                  aria-label={`Remove ${item.name} from saved`}
                  className="shrink-0 rounded-full p-1.5 text-ink-400 hover:bg-ink-50 hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
