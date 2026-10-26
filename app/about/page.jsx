import Link from 'next/link'

export const metadata = {
  title: 'About',
  description:
    'Hostel Hive is the student marketplace for discovering and comparing hostels, mess services, cafeterias and colleges.',
  alternates: { canonical: '/about' },
}

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2'

const sections = [
  {
    title: 'Find a place to stay',
    body: 'Browse verified hostel listings near your college with real pricing, room types, amenities and availability — filter by budget, gender, AC, and whether mess is included.',
  },
  {
    title: 'Sort out your meals',
    body: 'Compare mess services and cafeterias by cuisine, meal pricing, hygiene rating and operating hours, so you can decide where to eat before you decide where to live.',
  },
  {
    title: 'Explore by college',
    body: 'Browse by college to see what is available nearby, whether you are moving cities for the first time or comparing options between campuses.',
  },
]

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-extrabold text-ink-950 sm:text-4xl">About Hostel Hive</h1>
      <p className="mt-4 text-sm leading-relaxed text-ink-500 sm:text-base">
        Hostel Hive is a marketplace built for students who need to find
        reliable housing and food options near their college — hostels,
        mess services and cafeterias, all in one place, without relying on
        word-of-mouth or scattered listings.
      </p>

      <div className="mt-10 space-y-8">
        {sections.map((section) => (
          <div key={section.title} className="rounded-2xl border border-ink-100 bg-white p-6 shadow-card">
            <h2 className="text-lg font-bold text-ink-950">{section.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-500">{section.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-dashed border-ink-100 bg-white p-6">
        <h2 className="text-lg font-bold text-ink-950">Start exploring</h2>
        <p className="mt-2 text-sm text-ink-500">
          Ready to look around? Browse live listings or find your college to
          see what is nearby.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/explore"
            className={`rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-500 ${FOCUS_RING}`}
          >
            Explore listings
          </Link>
          <Link
            href="/colleges"
            className={`rounded-full border border-ink-100 px-5 py-2.5 text-sm font-semibold text-ink-700 hover:border-brand-400 ${FOCUS_RING}`}
          >
            Browse colleges
          </Link>
          <Link
            href="/contact"
            className={`rounded-full border border-ink-100 px-5 py-2.5 text-sm font-semibold text-ink-700 hover:border-brand-400 ${FOCUS_RING}`}
          >
            Contact us
          </Link>
        </div>
      </div>
    </section>
  )
}
