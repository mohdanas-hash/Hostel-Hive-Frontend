// Filtering and demo-post creation for the Community page, kept separate
// from presentation so data/communityPosts.js can later be replaced by a
// real API response without rewriting the components that call these.

export function filterCommunityPosts(posts, { category, query }) {
  const needle = query?.trim().toLowerCase()

  return posts.filter((post) => {
    if (category && category !== 'all' && post.category !== category) {
      return false
    }

    if (needle) {
      const haystack = `${post.title} ${post.body}`.toLowerCase()
      if (!haystack.includes(needle)) return false
    }

    return true
  })
}

// Builds a post that only ever lives in client-side React state for the
// current session — it is never sent anywhere and disappears on refresh.
export function createDemoPost({ title, category, body }) {
  return {
    id: `demo-${Date.now()}`,
    authorName: 'You',
    category,
    title: title.trim(),
    body: body.trim(),
    sampleLabel: 'Your demo post (this session only)',
    likeCount: 0,
    commentCount: 0,
  }
}
