'use client'

import { useEffect, useState } from 'react'
import { getFavorites, subscribeFavorites } from './favorites'

// Reactive view of the localStorage favorites list — starts empty so the
// server-rendered and first client render match (no window on the server),
// then syncs once mounted and on every change via subscribeFavorites.
export function useFavorites() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    setFavorites(getFavorites())
    return subscribeFavorites(setFavorites)
  }, [])

  return favorites
}
