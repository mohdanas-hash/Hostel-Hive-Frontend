'use client'

import { useId, useMemo, useState } from 'react'

const ROOM_OPTIONS = {
  Hostel: [
    { id: 'shared', label: 'Shared room', multiplier: 1 },
    { id: 'double', label: 'Double sharing', multiplier: 1.3 },
    { id: 'single', label: 'Single room', multiplier: 1.8 },
  ],
  Mess: [
    { id: 'monthly', label: 'Monthly plan', multiplier: 1 },
    { id: 'quarterly', label: 'Quarterly plan', multiplier: 2.85 },
  ],
  Cafeteria: [
    { id: 'monthly', label: 'Monthly plan', multiplier: 1 },
    { id: 'quarterly', label: 'Quarterly plan', multiplier: 2.85 },
  ],
}

const INSTALLMENT_PLANS = [
  { id: 1, label: 'Pay in full' },
  { id: 3, label: '3 installments' },
  { id: 6, label: '6 installments' },
]

function formatInr(amount) {
  return `₹${Math.round(amount).toLocaleString('en-IN')}`
}

function addMonths(date, months) {
  const d = new Date(date)
  d.setMonth(d.getMonth() + months)
  return d
}

function formatDate(date) {
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function ReservationModal({ open, onClose, type, listingName, baseAmount }) {
  const headingId = useId()
  const roomOptions = ROOM_OPTIONS[type] ?? ROOM_OPTIONS.Hostel
  const [roomId, setRoomId] = useState(roomOptions[0].id)
  const [installments, setInstallments] = useState(1)
  const [status, setStatus] = useState('form') // 'form' | 'processing' | 'success'
  const [bookingRef, setBookingRef] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '' })

  const selectedRoom = roomOptions.find((option) => option.id === roomId) ?? roomOptions[0]
  const totalAmount = useMemo(
    () => (typeof baseAmount === 'number' ? baseAmount * selectedRoom.multiplier : 0),
    [baseAmount, selectedRoom],
  )
  const schedule = useMemo(() => {
    const perInstallment = totalAmount / installments
    const today = new Date()
    return Array.from({ length: installments }, (_, index) => ({
      amount: perInstallment,
      due: index === 0 ? today : addMonths(today, index),
    }))
  }, [totalAmount, installments])

  if (!open) return null

  function handleSubmit(event) {
    event.preventDefault()
    setStatus('processing')
    // No payment gateway or backend is connected yet — this simulates the
    // flow so the UI/UX can be reviewed end to end without claiming a real
    // charge went through.
    window.setTimeout(() => {
      setBookingRef(`HH-${Date.now().toString(36).toUpperCase()}`)
      setStatus('success')
    }, 1100)
  }

  function handleClose() {
    setStatus('form')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/60 px-4 py-8 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        className="animate-dialog-panel relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-float sm:p-8"
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full p-1.5 text-ink-500 hover:bg-ink-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>

        {status === 'success' ? (
          <div className="py-4 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-500/15 text-accent-600">
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h2 id={headingId} className="mt-4 text-xl font-bold text-ink-950">
              Reservation confirmed
            </h2>
            <p className="mt-1 text-sm text-ink-500">
              Booking reference <span className="font-semibold text-ink-950">{bookingRef}</span>
            </p>

            <dl className="mt-6 space-y-2 rounded-xl bg-ink-50 p-4 text-left text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-500">{listingName}</dt>
                <dd className="font-semibold text-ink-950">{selectedRoom.label}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-500">Total amount</dt>
                <dd className="font-semibold text-ink-950">{formatInr(totalAmount)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-500">Payment plan</dt>
                <dd className="font-semibold text-ink-950">
                  {installments === 1 ? 'Paid in full' : `${installments} installments`}
                </dd>
              </div>
            </dl>

            <p className="mt-4 rounded-lg bg-amber-400/10 px-3 py-2 text-xs text-amber-700">
              This is a demo checkout — no payment gateway is connected yet, so no real charge was made.
            </p>

            <button
              type="button"
              onClick={handleClose}
              className="mt-6 w-full rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 id={headingId} className="text-xl font-bold text-ink-950">
              Reserve at {listingName}
            </h2>
            <p className="mt-1 text-sm text-ink-500">Pick a plan, choose how you&apos;d like to pay, and confirm.</p>

            <fieldset className="mt-6">
              <legend className="text-sm font-semibold text-ink-950">Room / plan</legend>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {roomOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={roomId === option.id}
                    onClick={() => setRoomId(option.id)}
                    className={`rounded-xl border px-3 py-2.5 text-left text-sm font-semibold transition-colors ${
                      roomId === option.id
                        ? 'border-brand-500 bg-brand-100 text-brand-600'
                        : 'border-ink-100 text-ink-700 hover:border-brand-400'
                    }`}
                  >
                    {option.label}
                    <span className="mt-0.5 block text-xs font-normal text-ink-500">
                      {formatInr((baseAmount ?? 0) * option.multiplier)}
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-5">
              <legend className="text-sm font-semibold text-ink-950">How would you like to pay?</legend>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {INSTALLMENT_PLANS.map((plan) => (
                  <button
                    key={plan.id}
                    type="button"
                    aria-pressed={installments === plan.id}
                    onClick={() => setInstallments(plan.id)}
                    className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors ${
                      installments === plan.id
                        ? 'border-brand-500 bg-brand-100 text-brand-600'
                        : 'border-ink-100 text-ink-700 hover:border-brand-400'
                    }`}
                  >
                    {plan.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-4 space-y-2 rounded-xl bg-ink-50 p-4 text-sm">
              {schedule.map((installment, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-ink-500">
                    {index === 0 ? 'Due today' : `Installment ${index + 1} · ${formatDate(installment.due)}`}
                  </span>
                  <span className="font-semibold text-ink-950">{formatInr(installment.amount)}</span>
                </div>
              ))}
              <div className="flex justify-between border-t border-ink-100 pt-2 text-sm font-bold text-ink-950">
                <span>Total</span>
                <span>{formatInr(totalAmount)}</span>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="res-name" className="text-xs font-semibold text-ink-500">
                  Full name
                </label>
                <input
                  id="res-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                  className="mt-1 w-full rounded-lg border border-ink-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div>
                <label htmlFor="res-phone" className="text-xs font-semibold text-ink-500">
                  Phone number
                </label>
                <input
                  id="res-phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                  className="mt-1 w-full rounded-lg border border-ink-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="res-email" className="text-xs font-semibold text-ink-500">
                  Email
                </label>
                <input
                  id="res-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                  className="mt-1 w-full rounded-lg border border-ink-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'processing'}
              className="mt-6 w-full rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-500 disabled:cursor-wait disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              {status === 'processing'
                ? 'Processing…'
                : `Confirm & pay ${formatInr(schedule[0]?.amount ?? 0)}`}
            </button>
            <p className="mt-3 text-center text-xs text-ink-500">
              Demo checkout — no payment gateway is connected yet, so no real charge is made.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
