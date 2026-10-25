import { hasVerifiedCoordinates } from '../../lib/listings'

// Kept isolated so a real map provider can be swapped in later without
// touching the listing detail page. No listing in the current mock data
// carries verified latitude/longitude, so the interactive branch below is
// unused today — it exists to document where that provider would plug in.
// A static/embed option (e.g. a Google Maps embed URL) or a client-side
// library (e.g. react-leaflet, MapLibre GL) would both work once real
// coordinates are available; the choice depends on whether the backend can
// supply a tile/embed key.
export default function LocationMap({ listing }) {
  const available = hasVerifiedCoordinates(listing)

  return (
    <section
      aria-labelledby="location-heading"
      className="rounded-2xl border border-ink-100 bg-white p-6 shadow-card"
    >
      <h2 id="location-heading" className="text-lg font-bold text-ink-950">
        Location
      </h2>

      {available ? (
        <div className="mt-4 flex h-64 items-center justify-center rounded-xl bg-ink-50 text-sm text-ink-500">
          Map at {listing.latitude}, {listing.longitude}
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-dashed border-ink-200 bg-ink-50 px-4 py-10 text-center">
          <p className="text-sm font-semibold text-ink-700">
            Map location unavailable
          </p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-ink-500">
            We don&apos;t have verified coordinates for this listing yet, so no
            map marker is shown.
          </p>
        </div>
      )}
    </section>
  )
}
