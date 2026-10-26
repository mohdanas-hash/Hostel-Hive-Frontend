import Link from 'next/link'

// Distinct from CategoryGrid (which links to the three core listing types
// plus Colleges/Community): this emphasizes food/budget angles within the
// same data, routing to existing filtered views rather than new pages.
const popularCategories = [
  { label: 'Hostels', href: '/explore?type=hostel' },
  { label: 'Mess & tiffin food', href: '/messes' },
  { label: 'Budget meals', href: '/messes?sort=price-asc' },
  { label: 'Cafeterias', href: '/explore?type=cafeteria' },
  { label: 'Student community', href: '/community' },
]

export default function PopularCategories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-extrabold text-ink-950 sm:text-3xl">
        Popular searches
      </h2>
      <p className="mt-2 max-w-xl text-sm text-ink-500 sm:text-base">
        Quick links into what students look for most.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        {popularCategories.map((category) => (
          <Link
            key={category.label}
            href={category.href}
            className="rounded-full border border-ink-100 bg-white px-5 py-2.5 text-sm font-semibold text-ink-700 shadow-card transition-colors hover:border-brand-400 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            {category.label}
          </Link>
        ))}
      </div>
    </section>
  )
}
