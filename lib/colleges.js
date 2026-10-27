// Search/filter logic for /colleges, kept separate from presentation —
// case-insensitive, partial-substring match against name/address so a query
// like "allen" matches "Allenhouse Institute of Technology" instead of
// requiring an exact, full, same-case match. Mirrors the same safe pattern
// used by lib/listings.js and lib/messes.js.

export function filterColleges(colleges, { city, q } = {}) {
  const searchQuery = (q ?? '').toString().toLowerCase().trim()

  return (colleges ?? []).filter((college) => {
    if (city && college?.city !== city) return false

    if (searchQuery) {
      const name = (college?.name ?? '').toLowerCase()
      const address = `${college?.city ?? ''} ${college?.address ?? ''}`.toLowerCase()
      if (!name.includes(searchQuery) && !address.includes(searchQuery)) return false
    }

    return true
  })
}
