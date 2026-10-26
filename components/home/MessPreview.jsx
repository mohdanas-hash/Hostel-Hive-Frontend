import Link from 'next/link'
import { placeholderMesses } from '../../data/placeholderMesses'
import { ApiError, fetchMesses } from '../../lib/api'
import { FOOD_TYPE_LABELS } from '../../lib/messes'

const PREVIEW_COUNT = 3

async function getPreviewMesses() {
  try {
    const messes = await fetchMesses({ limit: PREVIEW_COUNT })
    return { messes: messes.slice(0, PREVIEW_COUNT), isSample: false }
  } catch (error) {
    if (error instanceof ApiError) {
      return { messes: placeholderMesses.slice(0, PREVIEW_COUNT), isSample: true }
    }
    throw error
  }
}

export function MessPreviewSkeleton() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-8 w-64 animate-pulse rounded-lg bg-ink-100 motion-reduce:animate-none" />
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {Array.from({ length: PREVIEW_COUNT }).map((_, index) => (
            <div
              key={index}
              className="h-48 animate-pulse rounded-2xl bg-ink-50 motion-reduce:animate-none"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default async function MessPreview() {
  const { messes, isSample } = await getPreviewMesses()

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-display text-2xl font-extrabold text-ink-950 sm:text-3xl">
                Messes & affordable food, sorted
              </h2>
              {isSample && (
                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-600">
                  Sample listings
                </span>
              )}
            </div>
            <p className="mt-2 max-w-xl text-sm text-ink-500 sm:text-base">
              Compare mess and tiffin providers by food type, meals per day
              and monthly pricing before you commit.
            </p>
          </div>
          <Link
            href="/messes"
            className="rounded text-sm font-semibold text-brand-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            Browse Messes & Food →
          </Link>
        </div>

        {messes.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {messes.map((mess) => (
              <div
                key={mess.id}
                className="overflow-hidden rounded-2xl border border-ink-100 shadow-card"
              >
                <div className="relative h-28 bg-gradient-to-br from-amber-400/25 via-brand-100 to-brand-400/20">
                  {mess.foodType && (
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-600">
                      {FOOD_TYPE_LABELS[mess.foodType] ?? mess.foodType}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-ink-950">{mess.name}</h3>
                  <p className="mt-1 text-sm text-ink-500">{mess.locality}</p>
                  <p className="mt-3 text-sm font-bold text-ink-950">
                    {typeof mess.priceFrom === 'number'
                      ? `₹${mess.priceFrom.toLocaleString('en-IN')}`
                      : 'Price unavailable'}
                    <span className="text-xs font-normal text-ink-500">/month</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-8 text-sm text-ink-500">
            No mess listings available right now — check back soon.
          </p>
        )}
      </div>
    </section>
  )
}
