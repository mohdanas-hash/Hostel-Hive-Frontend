// Server-only session/auth data-access layer. Talks to the real Hostel Hive
// backend's OAuth2PasswordBearer auth (`/auth/login`, `/auth/register`,
// `/auth/me` — verified against the live OpenAPI schema at
// https://hostel-hive-backend.onrender.com/openapi.json). The backend issues
// a bearer JWT (`TokenOut.access_token`); this app stores that token as-is
// in an httpOnly cookie on its own domain rather than inventing a second
// session format, and sends it back as `Authorization: Bearer <token>` on
// requests that need it.
import 'server-only'

import { cache } from 'react'
import { cookies } from 'next/headers'
import { API_BASE_URL } from './api'

export const SESSION_COOKIE = 'hh_session'

const DEFAULT_MAX_AGE_SECONDS = 60 * 60 * 24 * 7 // 7 days, used if the JWT has no readable `exp`

// Reads the standard JWT `exp` claim (seconds since epoch) without verifying
// the signature — verification happens on the backend via `/auth/me`. This
// is only used to pick a sensible cookie lifetime.
function readJwtExpirySeconds(token) {
  try {
    const payloadSegment = token.split('.')[1]
    if (!payloadSegment) return null
    const payload = JSON.parse(
      Buffer.from(payloadSegment, 'base64url').toString('utf8'),
    )
    if (typeof payload.exp !== 'number') return null
    return Math.max(0, payload.exp - Math.floor(Date.now() / 1000))
  } catch {
    return null
  }
}

// Sets the session cookie. Must be called from a Server Action or Route
// Handler (Next.js disallows writing cookies during Server Component render).
export async function setSessionCookie(token) {
  const cookieStore = await cookies()
  const maxAge = readJwtExpirySeconds(token) ?? DEFAULT_MAX_AGE_SECONDS

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge,
  })
}

export async function clearSessionCookie() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

export async function getSessionToken() {
  const cookieStore = await cookies()
  return cookieStore.get(SESSION_COOKIE)?.value ?? null
}

// Verifies the session against the backend and returns the authenticated
// user, or `null` if there is no session or it's no longer valid (expired,
// revoked, backend unreachable). Memoized per request with React's `cache`
// so multiple components (e.g. the layout's nav and a page) share one call.
export const getCurrentUser = cache(async () => {
  const token = await getSessionToken()
  if (!token) return null

  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    })

    if (!response.ok) return null
    return await response.json()
  } catch {
    // Network failure reaching the backend: treat as "can't confirm the
    // session" rather than crashing the page.
    return null
  }
})
