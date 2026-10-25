// No real price plan, availability, or business rules exist for any listing
// yet, so this intentionally renders a disabled, clearly-labeled action
// rather than anything that looks like working checkout.
const COPY = {
  Hostel: {
    heading: 'Reserve your room',
    cta: 'Reserve (coming soon)',
    note: "Reservations aren't connected yet — check back once Hostel Hive is live with real booking.",
  },
  Mess: {
    heading: 'Meal plans',
    cta: 'Subscribe (coming soon)',
    note: "Meal-plan subscriptions aren't connected yet — check back once Hostel Hive is live with real plans.",
  },
  Cafeteria: {
    heading: 'Meal plans',
    cta: 'Subscribe (coming soon)',
    note: "Meal-plan subscriptions aren't connected yet — check back once Hostel Hive is live with real plans.",
  },
}

export default function BookingAction({ type }) {
  const copy = COPY[type]
  if (!copy) return null

  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-card">
      <h2 className="text-lg font-bold text-ink-950">{copy.heading}</h2>
      <button
        type="button"
        disabled
        title={copy.note}
        className="mt-4 w-full cursor-not-allowed rounded-xl bg-ink-100 px-6 py-3 text-sm font-semibold text-ink-500"
      >
        {copy.cta}
      </button>
      <p className="mt-3 text-xs text-ink-500">{copy.note}</p>
    </div>
  )
}
