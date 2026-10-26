'use client'

import { useState } from 'react'
import { hasVerifiedCoordinates } from '../../lib/listings'

// No listing from the live backend (or the mock dataset) carries verified
// latitude/longitude — confirmed against the live /hostels, /messes,
// /cafeterias and /colleges responses, none of which include coordinate
// fields at all. Fabricating coordinates by geocoding the address text
// ourselves was explicitly ruled out, so this renders a real, interactive
// map two ways, in order of trust:
//   1. Verified coordinates, if a future backend revision adds them — a
//      precise marker, via Google's keyless "q=lat,lng" embed.
//   2. The listing's own verified street address (`listing.locality`,
//      sourced straight from the backend's `address` field) — Google's own
//      geocoder resolves it, exactly as if a visitor had typed it into Maps
//      themselves. No coordinates are invented by this app.
// If neither exists, it shows the same honest "unavailable" empty state
// that was already here, rather than a blank box.
const UNLISTED_ADDRESS = 'Address not listed yet'

function buildMapQuery(listing) {
  if (hasVerifiedCoordinates(listing)) {
    return `${listing.latitude},${listing.longitude}`
  }

  if (listing?.locality && listing.locality !== UNLISTED_ADDRESS) {
    return listing.locality
  }

  return null
}

export default function LocationMap({ listing }) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const query = buildMapQuery(listing)
  const mapsUrl = query ? `https://www.google.com/maps?q=${encodeURIComponent(query)}` : null

  return (
    <section
      aria-labelledby="location-heading"
      className="rounded-2xl border border-ink-100 bg-white p-6 shadow-card"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 id="location-heading" className="text-lg font-bold text-ink-950">
          Location
        </h2>
        {mapsUrl && (
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            Open in Google Maps
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" aria-hidden="true">
              <path d="M7 17 17 7M9 7h8v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        )}
      </div>

      {!query && (
        <div className="mt-4 rounded-xl border border-dashed border-ink-200 bg-ink-50 px-4 py-10 text-center">
          <p className="text-sm font-semibold text-ink-700">Map location unavailable</p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-ink-500">
            We don&apos;t have a verified address or coordinates for this
            listing yet, so no map is shown.
          </p>
        </div>
      )}

      {query && failed && (
        <div className="mt-4 rounded-xl border border-dashed border-ink-200 bg-ink-50 px-4 py-10 text-center">
          <p className="text-sm font-semibold text-ink-700">Map couldn&apos;t load</p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-ink-500">
            The embedded map failed to load — this can happen if your browser
            or network blocks third-party embeds.{' '}
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-600 hover:underline">
              Open the location in Google Maps
            </a>{' '}
            instead.
          </p>
        </div>
      )}

      {query && !failed && (
        <div className="relative mt-4 h-64 overflow-hidden rounded-xl bg-ink-50 sm:h-80">
          {!loaded && (
            <div className="shimmer absolute inset-0 grid place-items-center overflow-hidden bg-ink-100">
              <span className="text-xs font-medium text-ink-500">Loading map…</span>
            </div>
          )}
          <iframe
            title={`Map showing the location of ${listing?.name ?? 'this listing'}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
            className={`h-full w-full border-0 transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
          />
        </div>
      )}
    </section>
  )
}
