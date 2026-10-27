'use client'

import { useState } from 'react'
import ReservationModal from './ReservationModal'

const COPY = {
  Hostel: {
    heading: 'Reserve your room',
    cta: 'Reserve now',
    note: 'Pay in full or split the fee into installments.',
  },
  Mess: {
    heading: 'Meal plans',
    cta: 'Subscribe now',
    note: 'Pay monthly or save with a quarterly plan.',
  },
  Cafeteria: {
    heading: 'Meal plans',
    cta: 'Subscribe now',
    note: 'Pay monthly or save with a quarterly plan.',
  },
}

export default function BookingAction({ type, listingName, baseAmount }) {
  const [open, setOpen] = useState(false)
  const copy = COPY[type]
  if (!copy) return null

  const hasAmount = typeof baseAmount === 'number' && Number.isFinite(baseAmount)

  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-card">
      <h2 className="text-lg font-bold text-ink-950">{copy.heading}</h2>
      <button
        type="button"
        disabled={!hasAmount}
        title={hasAmount ? undefined : 'Pricing is unavailable for this listing.'}
        onClick={() => setOpen(true)}
        className="mt-4 w-full rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-500 disabled:cursor-not-allowed disabled:bg-ink-100 disabled:text-ink-500 disabled:hover:bg-ink-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
      >
        {copy.cta}
      </button>
      <p className="mt-3 text-xs text-ink-500">{copy.note}</p>

      {hasAmount && (
        <ReservationModal
          open={open}
          onClose={() => setOpen(false)}
          type={type}
          listingName={listingName}
          baseAmount={baseAmount}
        />
      )}
    </div>
  )
}
