'use client'

import { useEffect, useState } from 'react'
import { isFavorited, toggleFavorite } from '../../lib/favorites'

// `item` shape: { id, name, type, location, href } — persisted to
// localStorage on toggle (see lib/favorites.js for why it's device-local).
export default function FavoriteButton({ item, className = '' }) {
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setSaved(isFavorited(item.id))
  }, [item.id])

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? `Remove ${item.name} from saved` : `Save ${item.name}`}
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        setSaved(toggleFavorite(item))
      }}
      className={`grid h-8 w-8 place-items-center rounded-full bg-white/90 text-ink-500 shadow-card transition-colors hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
        saved ? 'text-red-500' : ''
      } ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill={saved ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path
          d="M12 21s-7.5-4.6-10-9.2C.4 8.1 2 4.5 5.6 4a5 5 0 016.4 2 5 5 0 016.4-2c3.6.5 5.2 4.1 3.6 7.8C19.5 16.4 12 21 12 21z"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
