'use server'

import { redirect } from 'next/navigation'
import { API_BASE_URL } from '../../lib/api'
import { clearSessionCookie, setSessionCookie } from '../../lib/auth'

// Field names as they appear in the backend's FastAPI validation error
// `loc` arrays (e.g. ["body", "email"]) — used to route 422 errors back to
// the right form field instead of showing one generic message.
const FIELD_NAMES = ['name', 'email', 'password', 'college_id']

function fieldErrorsFromValidationDetail(detail) {
  const errors = {}
  if (!Array.isArray(detail)) return errors

  for (const issue of detail) {
    const field = issue.loc?.[issue.loc.length - 1]
    if (FIELD_NAMES.includes(field)) {
      errors[field] = issue.msg
    }
  }
  return errors
}

// Reads a non-OK response body once and returns a plain-English message,
// handling both FastAPI's validation-error shape (`{detail: [...]}`) and its
// plain error shape (`{detail: "..."}`), without assuming either is present.
async function readErrorResponse(response) {
  let body = null
  try {
    body = await response.json()
  } catch {
    // Non-JSON body (e.g. the backend is down and a proxy returned HTML).
  }

  if (Array.isArray(body?.detail)) {
    return {
      message: 'Please fix the highlighted fields.',
      fieldErrors: fieldErrorsFromValidationDetail(body.detail),
    }
  }

  if (typeof body?.detail === 'string') {
    return { message: body.detail, fieldErrors: {} }
  }

  if (response.status === 401) {
    return { message: 'Invalid email or password.', fieldErrors: {} }
  }

  return {
    message: 'Something went wrong on the server. Please try again.',
    fieldErrors: {},
  }
}

export async function loginAction(_prevState, formData) {
  const email = formData.get('email')?.toString().trim() ?? ''
  const password = formData.get('password')?.toString() ?? ''

  if (!email || !password) {
    return { message: 'Please enter both your email and password.', fieldErrors: {} }
  }

  let shouldRedirect = false

  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ username: email, password }),
    })

    if (!response.ok) {
      return await readErrorResponse(response)
    }

    const data = await response.json()
    await setSessionCookie(data.access_token)
    shouldRedirect = true
  } catch {
    return {
      message: "Couldn't reach the server. Check your connection and try again.",
      fieldErrors: {},
    }
  }

  if (shouldRedirect) redirect('/')
}

export async function registerAction(_prevState, formData) {
  const name = formData.get('name')?.toString().trim() ?? ''
  const email = formData.get('email')?.toString().trim() ?? ''
  const password = formData.get('password')?.toString() ?? ''
  const confirmPassword = formData.get('confirmPassword')?.toString() ?? ''
  const collegeIdRaw = formData.get('collegeId')?.toString() ?? ''

  const fieldErrors = {}
  if (!name) fieldErrors.name = 'Please enter your name.'
  if (!email) fieldErrors.email = 'Please enter your email.'
  if (!password) fieldErrors.password = 'Please enter a password.'
  if (password && password.length < 6) {
    fieldErrors.password = 'Password must be at least 6 characters.'
  }
  if (password && confirmPassword && password !== confirmPassword) {
    fieldErrors.confirmPassword = 'Passwords do not match.'
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { message: 'Please fix the highlighted fields.', fieldErrors }
  }

  let shouldRedirect = false

  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        password,
        role: 'student',
        college_id: collegeIdRaw ? Number(collegeIdRaw) : null,
      }),
    })

    if (!response.ok) {
      return await readErrorResponse(response)
    }

    const data = await response.json()
    await setSessionCookie(data.access_token)
    shouldRedirect = true
  } catch {
    return {
      message: "Couldn't reach the server. Check your connection and try again.",
      fieldErrors: {},
    }
  }

  if (shouldRedirect) redirect('/')
}

export async function logoutAction() {
  await clearSessionCookie()
  redirect('/')
}
