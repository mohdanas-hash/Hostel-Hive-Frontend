import Image from 'next/image'
import { FOOD_TYPE_LABELS } from '../../lib/messes'
import { getSampleMenu } from '../../data/demoMessMenus'
import FavoriteButton from '../ui/FavoriteButton'

const MEAL_LABELS = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
}

export default function MessCard({ mess }) {
  const {
    id,
    name,
    locality,
    priceFrom,
    mealsPerDay,
    foodType,
    hygieneRating,
    amenities,
    imageUrl,
  } = mess

  const priceDisplay =
    typeof priceFrom === 'number' && Number.isFinite(priceFrom)
      ? `₹${priceFrom.toLocaleString('en-IN')}`
      : 'Price unavailable'

  const sampleMenu = getSampleMenu(foodType)

  return (
    <article className="group overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-float motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div className="relative h-36 overflow-hidden bg-gradient-to-br from-amber-400/25 via-brand-100 to-brand-400/20">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        )}
        {foodType && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-600">
            {FOOD_TYPE_LABELS[foodType] ?? foodType}
          </span>
        )}
        <FavoriteButton
          item={{ id, name, type: 'Mess', location: locality, href: `/listings/${id}` }}
          className="absolute right-3 top-3"
        />
      </div>

      <div className="p-5">
        <h3 className="text-base font-bold text-ink-950">{name}</h3>
        <p className="mt-1 text-sm text-ink-500">{locality}</p>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500">
          {typeof mealsPerDay === 'number' && (
            <span>{mealsPerDay} meals/day</span>
          )}
          {typeof hygieneRating === 'number' && (
            <span className="inline-flex items-center gap-1">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-amber-500" fill="currentColor">
                <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8l-6.2 3.2 1.2-6.8-5-4.9 6.9-1z" />
              </svg>
              {hygieneRating} hygiene
            </span>
          )}
        </div>

        {amenities?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {amenities.slice(0, 3).map((item) => (
              <span
                key={item}
                className="rounded-full bg-ink-50 px-2.5 py-1 text-xs text-ink-700"
              >
                {item}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between border-t border-ink-100 pt-4">
          <p className="text-sm font-bold text-ink-950">
            {priceDisplay}
            {priceDisplay !== 'Price unavailable' && (
              <span className="text-xs font-normal text-ink-500">/month</span>
            )}
          </p>
        </div>

        <details className="group/menu mt-3 rounded-xl border border-dashed border-ink-100 bg-ink-50 px-3 py-2">
          <summary className="cursor-pointer list-none text-xs font-semibold text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
            Sample menu preview
          </summary>
          <p className="mt-2 text-[11px] font-medium uppercase tracking-wide text-amber-600">
            Illustrative only — not verified with this provider
          </p>
          <dl className="mt-2 space-y-1 text-xs text-ink-700">
            {Object.entries(sampleMenu).map(([meal, items]) => (
              <div key={meal} className="flex gap-2">
                <dt className="w-20 shrink-0 font-semibold text-ink-950">
                  {MEAL_LABELS[meal] ?? meal}
                </dt>
                <dd>{items}</dd>
              </div>
            ))}
          </dl>
        </details>
      </div>
    </article>
  )
}
