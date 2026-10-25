'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navLinks = [
  { to: '/explore', label: 'Explore' },
  { to: '/messes', label: 'Messes & Food' },
  { to: '/colleges', label: 'Colleges' },
  { to: '/community', label: 'Community' },
]

function NavItem({ to, label, onClick }) {
  const pathname = usePathname()
  const isActive = pathname === to

  return (
    <Link
      href={to}
      onClick={onClick}
      className={`text-sm font-medium transition-colors ${
        isActive ? 'text-brand-600' : 'text-ink-700 hover:text-brand-600'
      }`}
    >
      {label}
    </Link>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-ink-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-white">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M6 20V11l6-4 6 4v9h-4v-6H10v6z" />
            </svg>
          </span>
          <span className="text-lg font-extrabold tracking-tight text-ink-950">
            Hostel Hive
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <NavItem key={link.to} {...link} />
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            className="text-sm font-semibold text-ink-700 hover:text-brand-600"
          >
            Log in
          </button>
          <button
            type="button"
            className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-float transition-transform hover:-translate-y-0.5 hover:bg-brand-500"
          >
            Get started
          </button>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="grid h-10 w-10 place-items-center rounded-lg border border-ink-100 lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor">
            {open ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-4 border-t border-ink-100 px-4 py-5 lg:hidden">
          {navLinks.map((link) => (
            <NavItem key={link.to} {...link} onClick={() => setOpen(false)} />
          ))}
          <div className="mt-2 flex flex-col gap-3">
            <button
              type="button"
              className="rounded-full border border-ink-100 px-5 py-2.5 text-sm font-semibold text-ink-700"
            >
              Log in
            </button>
            <button
              type="button"
              className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white"
            >
              Get started
            </button>
          </div>
        </nav>
      )}
    </header>
  )
}
