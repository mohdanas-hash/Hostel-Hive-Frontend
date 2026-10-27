'use client'

import { useEffect, useId, useState } from 'react'
import { createPortal } from 'react-dom'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

export default function AuthModal({ open, onClose, initialTab = 'login', colleges = [] }) {
  const headingId = useId()
  const [tab, setTab] = useState(initialTab)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!open || !mounted) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        onClick={(event) => event.stopPropagation()}
        className="animate-dialog-panel relative z-[10000] w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900"
      >
        <div className="max-h-[85vh] overflow-y-auto p-6 sm:p-8">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full p-1.5 text-ink-500 hover:bg-ink-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>

          <h2 id={headingId} className="text-xl font-bold text-ink-950">
            {tab === 'login' ? 'Log in to Hostel Hive' : 'Create your account'}
          </h2>

          <div className="mt-5 grid grid-cols-2 gap-1 rounded-xl bg-ink-50 p-1">
            <button
              type="button"
              aria-pressed={tab === 'login'}
              onClick={() => setTab('login')}
              className={`rounded-lg py-2 text-sm font-semibold transition-colors ${
                tab === 'login' ? 'bg-white text-brand-600 shadow-card' : 'text-ink-500'
              }`}
            >
              Log in
            </button>
            <button
              type="button"
              aria-pressed={tab === 'register'}
              onClick={() => setTab('register')}
              className={`rounded-lg py-2 text-sm font-semibold transition-colors ${
                tab === 'register' ? 'bg-white text-brand-600 shadow-card' : 'text-ink-500'
              }`}
            >
              Sign in
            </button>
          </div>

          {tab === 'login' ? (
            <LoginForm onSwitchToRegister={() => setTab('register')} />
          ) : (
            <RegisterForm colleges={colleges} onSwitchToLogin={() => setTab('login')} />
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}
