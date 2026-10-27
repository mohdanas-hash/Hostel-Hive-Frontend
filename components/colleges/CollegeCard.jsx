import FavoriteButton from '../ui/FavoriteButton'

export default function CollegeCard({ college }) {
  const { id, name, city, address, isCentral } = college

  return (
    <article className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card transition-transform hover:-translate-y-1 sm:p-6">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-bold text-ink-950">{name}</h3>
        <div className="flex shrink-0 items-center gap-2">
          {isCentral && (
            <span className="rounded-full bg-amber-400/20 px-2.5 py-1 text-xs font-semibold text-amber-600">
              Central
            </span>
          )}
          <FavoriteButton
            item={{
              id: `college-${id}`,
              name,
              type: 'College',
              location: city,
              href: `/colleges?q=${encodeURIComponent(name)}`,
            }}
          />
        </div>
      </div>
      <p className="mt-1 text-sm text-ink-500">{city}</p>
      <p className="mt-2 text-sm text-ink-700">{address ?? 'Address not listed yet'}</p>
    </article>
  )
}
