'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { loginAction } from '../../app/actions/auth'

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2'

const initialState = { message: null, fieldErrors: {} }

export default function LoginForm({ onSwitchToRegister }) {
  const [state, formAction, pending] = useActionState(loginAction, initialState)

  return (
    <form action={formAction} noValidate className="mt-6 space-y-4">
      {state.message && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
          {state.message}
        </p>
      )}

      <div>
        <label htmlFor="login-email" className="text-xs font-semibold uppercase tracking-wide text-ink-500 dark:text-slate-400">
          Email
        </label>
        <input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={Boolean(state.fieldErrors?.email)}
          aria-describedby={state.fieldErrors?.email ? 'login-email-error' : undefined}
          className={`mt-1 block w-full rounded-lg border border-ink-100 bg-white px-3 py-2 text-sm text-ink-950 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 ${FOCUS_RING}`}
        />
        {state.fieldErrors?.email && (
          <p id="login-email-error" className="mt-1 text-xs text-red-600 dark:text-red-400">
            {state.fieldErrors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="login-password" className="text-xs font-semibold uppercase tracking-wide text-ink-500 dark:text-slate-400">
          Password
        </label>
        <input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          aria-invalid={Boolean(state.fieldErrors?.password)}
          aria-describedby={state.fieldErrors?.password ? 'login-password-error' : undefined}
          className={`mt-1 block w-full rounded-lg border border-ink-100 bg-white px-3 py-2 text-sm text-ink-950 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 ${FOCUS_RING}`}
        />
        {state.fieldErrors?.password && (
          <p id="login-password-error" className="mt-1 text-xs text-red-600 dark:text-red-400">
            {state.fieldErrors.password}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className={`w-full rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-500 disabled:cursor-wait disabled:opacity-70 ${FOCUS_RING}`}
      >
        {pending ? 'Logging in…' : 'Log in'}
      </button>

      <p className="text-center text-sm text-ink-500 dark:text-slate-400">
        Don&apos;t have an account?{' '}
        {onSwitchToRegister ? (
          <button
            type="button"
            onClick={onSwitchToRegister}
            className={`font-semibold text-brand-600 hover:underline dark:text-brand-400 ${FOCUS_RING}`}
          >
            Sign up
          </button>
        ) : (
          <Link href="/register" className={`font-semibold text-brand-600 hover:underline dark:text-brand-400 ${FOCUS_RING}`}>
            Sign up
          </Link>
        )}
      </p>
    </form>
  )
}
