'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { registerAction } from '../../app/actions/auth'

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2'

const initialState = { message: null, fieldErrors: {} }

function Field({ id, name, label, type = 'text', autoComplete, fieldErrors }) {
  const error = fieldErrors?.[name === 'collegeId' ? 'college_id' : name]

  return (
    <div>
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wide text-ink-500 dark:text-slate-400">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`mt-1 block w-full rounded-lg border border-ink-100 bg-white px-3 py-2 text-sm text-ink-950 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 ${FOCUS_RING}`}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}

export default function RegisterForm({ colleges = [], onSwitchToLogin }) {
  const [state, formAction, pending] = useActionState(registerAction, initialState)

  return (
    <form action={formAction} noValidate className="mt-6 space-y-4">
      {state.message && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
          {state.message}
        </p>
      )}

      <Field id="register-name" name="name" label="Name" fieldErrors={state.fieldErrors} />
      <Field
        id="register-email"
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        fieldErrors={state.fieldErrors}
      />
      <Field
        id="register-password"
        name="password"
        label="Password"
        type="password"
        autoComplete="new-password"
        fieldErrors={state.fieldErrors}
      />
      <Field
        id="register-confirm-password"
        name="confirmPassword"
        label="Confirm password"
        type="password"
        autoComplete="new-password"
        fieldErrors={state.fieldErrors}
      />

      {colleges.length > 0 && (
        <div>
          <label
            htmlFor="register-college"
            className="text-xs font-semibold uppercase tracking-wide text-ink-500 dark:text-slate-400"
          >
            College (optional)
          </label>
          <select
            id="register-college"
            name="collegeId"
            defaultValue=""
            className={`mt-1 block w-full rounded-lg border border-ink-100 bg-white px-3 py-2 text-sm text-ink-950 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 ${FOCUS_RING}`}
          >
            <option value="">Select your college</option>
            {colleges.map((college) => (
              <option key={college.id} value={college.id}>
                {college.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className={`w-full rounded-xl bg-accent-600 px-5 py-2.5 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-500 disabled:cursor-wait disabled:opacity-70 ${FOCUS_RING}`}
      >
        {pending ? 'Creating account…' : 'Create account'}
      </button>

      <p className="text-center text-sm text-ink-500 dark:text-slate-400">
        Already have an account?{' '}
        {onSwitchToLogin ? (
          <button
            type="button"
            onClick={onSwitchToLogin}
            className={`font-semibold text-brand-600 hover:underline dark:text-brand-400 ${FOCUS_RING}`}
          >
            Log in
          </button>
        ) : (
          <Link href="/login" className={`font-semibold text-brand-600 hover:underline dark:text-brand-400 ${FOCUS_RING}`}>
            Log in
          </Link>
        )}
      </p>
    </form>
  )
}
