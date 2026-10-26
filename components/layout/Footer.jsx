import Link from 'next/link'

const columns = [
  {
    title: 'Discover',
    links: [
      { label: 'Hostels', href: '/explore?type=hostel' },
      { label: 'Messes', href: '/messes' },
      { label: 'Cafeterias', href: '/explore?type=cafeteria' },
      { label: 'Colleges', href: '/colleges' },
    ],
  },
  {
    title: 'Students',
    links: [
      { label: 'Explore listings', href: '/explore' },
      { label: 'Community', href: '/community' },
      { label: 'Help Center', href: '/contact' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
]

const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-950">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-white">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M6 20V11l6-4 6 4v9h-4v-6H10v6z" />
                </svg>
              </span>
              <span className="text-lg font-extrabold tracking-tight text-white">
                Hostel Hive
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-300">
              The student marketplace for finding trusted hostels, messes,
              cafeterias and colleges — with real reviews from real students.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-white">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-300 transition-colors hover:text-brand-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-ink-300">
            © {currentYear} Hostel Hive. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-ink-300">
            <a href="#" className="hover:text-brand-400">
              Privacy
            </a>
            <a href="#" className="hover:text-brand-400">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
