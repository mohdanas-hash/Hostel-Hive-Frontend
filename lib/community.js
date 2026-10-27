// Filtering and demo-post creation for the Community page, kept separate
// from presentation so data/communityPosts.js can later be replaced by a
// real API response without rewriting the components that call these.

// A post matches as soon as any one word of the query is found, rather than
// requiring the whole typed phrase to appear verbatim — mirrors
// lib/listings.js's filterAndSortListings.
function queryWords(query) {
  return query.trim().toLowerCase().split(/\s+/).filter(Boolean)
}

export function filterCommunityPosts(posts, { category, query }) {
  const needleWords = query ? queryWords(query) : []

  return posts.filter((post) => {
    if (category && category !== 'all' && post.category !== category) {
      return false
    }

    if (needleWords.length > 0) {
      const haystack = `${post.title} ${post.body}`.toLowerCase()
      const hasMatch = needleWords.some((word) => haystack.includes(word))
      if (!hasMatch) return false
    }

    return true
  })
}

// Builds a post that only ever lives in client-side React state for the
// current session — it is never sent anywhere and disappears on refresh.
export function createDemoPost({ title, category, body }) {
  return {
    id: `local-${Date.now()}`,
    authorName: 'You',
    category,
    title: title.trim(),
    body: body.trim(),
    likeCount: 0,
    commentCount: 0,
  }
}
