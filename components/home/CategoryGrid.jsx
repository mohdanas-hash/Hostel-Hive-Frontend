import Link from 'next/link'

const categories = [
  {
    title: 'Hostels & PGs',
    description: 'Verified rooms with ratings on safety, mess and upkeep.',
    href: '/explore?type=hostel',
    icon: (
      <path d="M6 20V11l6-4 6 4v9h-4v-6H10v6z" />
    ),
  },
  {
    title: 'Messes',
    description: 'Compare monthly plans, menus and hygiene ratings.',
    href: '/explore?type=mess',
    icon: (
      <path d="M8 2v6a2 2 0 002 2v12h2V10a2 2 0 002-2V2h-2v6h-0.001V2H8z" />
    ),
  },
  {
    title: 'Cafeterias',
    description: 'Find study-friendly spots and quick bites on campus.',
    href: '/explore?type=cafeteria',
    icon: (
      <path d="M4 3h14v2H4V3zm0 4h14v2a6 6 0 01-6 6v2h2v2H8v-2h2v-2a6 6 0 01-6-6V7zm16 0h1a2 2 0 012 2v2a2 2 0 01-2 2h-1V7z" />
    ),
  },
  {
    title: 'Colleges',
    description: 'Explore campuses, admissions info and student reviews.',
    // The mock data has no "College" listings, so this points at the
    // dedicated /colleges page rather than an Explore filter with nothing to show.
    href: '/colleges',
    icon: (
      <path d="M12 3l9 5-9 5-9-5 9-5zm-7 8.2v4.1c0 1.3 3.1 3.7 7 3.7s7-2.4 7-3.7v-4.1l-7 3.9-7-3.9z" />
    ),
  },
]

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-2xl font-extrabold text-ink-950 sm:text-3xl">
          Everything a student needs, in one place
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-ink-500 sm:text-base">
          Explore by category to find what fits your routine and budget.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.title}
            href={category.href}
            className="block rounded-2xl border border-ink-100 bg-white p-6 shadow-card transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-100 text-brand-600">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                {category.icon}
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-bold text-ink-950">
              {category.title}
            </h3>
            <p className="mt-1.5 text-sm text-ink-500">
              {category.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
