'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRef, useState } from 'react'
import AuthModal from '../auth/AuthModal'
import ConfirmDialog from '../ui/ConfirmDialog'

const navLinks = [
  { to: '/explore', label: 'Explore' },
  { to: '/colleges', label: 'Colleges' },
  { to: '/explore?type=hostel', label: 'Hostels' },
  { to: '/messes', label: 'Mess' },
  { to: '/explore?type=cafeteria', label: 'Cafeterias' },
  { to: '/community', label: 'Community' },
]

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950'

function NavItem({ to, label, onClick }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [toPath, toQuery = ''] = to.split('?')
  const toType = new URLSearchParams(toQuery).get('type')
  const isActive = pathname === toPath && searchParams.get('type') === toType

  return (
    <Link
      href={to}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      className={`group relative rounded text-sm font-medium transition-colors ${FOCUS_RING} ${
        isActive ? 'text-brand-400' : 'text-ink-300 hover:text-white'
      }`}
    >
      {label}
      <span
        className={`absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-brand-400 transition-transform duration-300 ease-out group-hover:scale-x-100 ${
          isActive ? 'scale-x-100' : ''
        }`}
        aria-hidden="true"
      />
    </Link>
  )
}

// Submits the hidden logout form via requestSubmit() after the user
// confirms — redirect() inside the server action is handled natively by the
// form's navigation, so there's no need to intercept or interpret the
// NEXT_REDIRECT control-flow error that calling the action as a bare async
// function would raise.
function LogoutControl({ user, logoutAction, variant = 'desktop' }) {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [pending, setPending] = useState(false)
  const formRef = useRef(null)

  function handleConfirm() {
    setPending(true)
    formRef.current?.requestSubmit()
  }

  const triggerClasses =
    variant === 'desktop'
      ? `rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-ink-300 transition-colors hover:border-white/30 hover:text-white ${FOCUS_RING}`
      : `w-full rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-ink-300 transition-colors hover:text-white ${FOCUS_RING}`

  return (
    <>
      <Link
        href="/profile"
        className={`text-sm font-medium text-ink-300 hover:text-white rounded ${FOCUS_RING} ${
          variant === 'mobile' ? 'block' : ''
        }`}
      >
        Hi, {user.name.split(' ')[0]}
      </Link>
      <form ref={formRef} action={logoutAction} className={variant === 'mobile' ? 'w-full' : undefined}>
        <button type="button" onClick={() => setConfirmOpen(true)} className={triggerClasses}>
          Log out
        </button>
      </form>

      <ConfirmDialog
        open={confirmOpen}
        title="Log out of Hostel Hive?"
        description="You'll need to log in again to access your account."
        confirmLabel="Yes, log out"
        cancelLabel="No, stay"
        pending={pending}
        onConfirm={handleConfirm}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  )
}

function AuthControls({ user, logoutAction, className = '', onOpenAuth }) {
  if (user) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <LogoutControl user={user} logoutAction={logoutAction} variant="desktop" />
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <button
        type="button"
        onClick={() => onOpenAuth('login')}
        className={`rounded text-sm font-semibold text-ink-300 hover:text-white ${FOCUS_RING}`}
      >
        Log in
      </button>
      <button
        type="button"
        onClick={() => onOpenAuth('register')}
        className={`rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-brand-600 ${FOCUS_RING}`}
      >
        Sign in
      </button>
    </div>
  )
}

export default function Navbar({ user = null, logoutAction, colleges = [] }) {
  const [open, setOpen] = useState(false)
  const [authModal, setAuthModal] = useState({ open: false, tab: 'login' })

  function openAuth(tab) {
    setOpen(false)
    setAuthModal({ open: true, tab })
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className={`flex items-center gap-2 rounded ${FOCUS_RING}`}>
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-white">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M6 20V11l6-4 6 4v9h-4v-6H10v6z" />
            </svg>
          </span>
          <span className="text-lg font-extrabold tracking-tight text-white">
            Hostel Hive
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <NavItem key={link.to} {...link} />
          ))}
        </nav>

        <AuthControls
          user={user}
          logoutAction={logoutAction}
          className="hidden lg:flex"
          onOpenAuth={openAuth}
        />

        <button
          type="button"
          aria-label="Toggle menu"
          className={`grid h-10 w-10 place-items-center rounded-lg border border-white/15 text-white lg:hidden ${FOCUS_RING}`}
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
        <nav className="flex flex-col gap-4 border-t border-white/10 bg-ink-950 px-4 py-5 lg:hidden">
          {navLinks.map((link) => (
            <NavItem key={link.to} {...link} onClick={() => setOpen(false)} />
          ))}
          <div className="mt-2 flex flex-col gap-3">
            {user ? (
              <LogoutControl user={user} logoutAction={logoutAction} variant="mobile" />
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => openAuth('login')}
                  className={`rounded-full border border-white/15 px-5 py-2.5 text-center text-sm font-semibold text-ink-300 ${FOCUS_RING}`}
                >
                  Log in
                </button>
                <button
                  type="button"
                  onClick={() => openAuth('register')}
                  className={`rounded-full bg-brand-700 px-5 py-2.5 text-center text-sm font-semibold text-white ${FOCUS_RING}`}
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </nav>
      )}

      <AuthModal
        open={authModal.open}
        onClose={() => setAuthModal((prev) => ({ ...prev, open: false }))}
        initialTab={authModal.tab}
        colleges={colleges}
      />
    </header>
  )
}
