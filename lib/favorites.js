'use client'

// Client-only, localStorage-backed "saved items" list. There is no
// favorites endpoint on the real backend (verified against its OpenAPI
// schema — only /auth/login, /auth/register and a read-only /auth/me
// exist), so this deliberately never claims to sync across devices: it's a
// per-browser convenience, read by the /profile page and written by
// FavoriteButton. Components in the same tab stay in sync via a window
// CustomEvent, since the native `storage` event only fires in *other* tabs.
const STORAGE_KEY = 'hh_favorites'
const CHANGE_EVENT = 'hh-favorites-changed'

function readAll() {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeAll(favorites) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT))
  } catch {
    // Storage unavailable (private browsing, quota, etc.) — favoriting
    // silently no-ops rather than throwing and breaking the page.
  }
}

export function getFavorites() {
  return readAll()
}

export function isFavorited(id) {
  return readAll().some((item) => item.id === id)
}

// `item` shape: { id, name, type, location, href }
export function toggleFavorite(item) {
  const current = readAll()
  const exists = current.some((entry) => entry.id === item.id)
  const next = exists
    ? current.filter((entry) => entry.id !== item.id)
    : [...current, { ...item, savedAt: new Date().toISOString() }]
  writeAll(next)
  return !exists
}

export function removeFavorite(id) {
  writeAll(readAll().filter((entry) => entry.id !== id))
}

export function subscribeFavorites(callback) {
  function handleChange() {
    callback(readAll())
  }
  window.addEventListener(CHANGE_EVENT, handleChange)
  window.addEventListener('storage', handleChange)
  return () => {
    window.removeEventListener(CHANGE_EVENT, handleChange)
    window.removeEventListener('storage', handleChange)
  }
}
