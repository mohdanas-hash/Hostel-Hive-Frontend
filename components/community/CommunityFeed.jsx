'use client'

import { useId, useState } from 'react'
import { COMMUNITY_CATEGORIES } from '../../data/communityPosts'
import { createDemoPost, filterCommunityPosts } from '../../lib/community'
import CreatePostModal from './CreatePostModal'
import PostCard from './PostCard'

export default function CommunityFeed({ initialPosts }) {
  const [posts, setPosts] = useState(initialPosts)
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const searchId = useId()

  const visiblePosts = filterCommunityPosts(posts, { category, query })

  function handleCreatePost(values) {
    setPosts((current) => [createDemoPost(values), ...current])
    setModalOpen(false)
  }

  function clearFilters() {
    setQuery('')
    setCategory('all')
  }

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-ink-100 bg-white px-4 py-3 shadow-card focus-within:ring-2 focus-within:ring-brand-500">
          <label htmlFor={searchId} className="sr-only">
            Search sample posts
          </label>
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 flex-shrink-0 text-ink-500"
            fill="none"
            stroke="currentColor"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" strokeWidth="2" />
            <path d="M21 21l-4.3-4.3" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            id={searchId}
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search sample posts"
            className="w-full bg-transparent text-sm text-ink-950 placeholder:text-ink-500 focus:outline-none"
          />
        </div>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="whitespace-nowrap rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
        >
          + Create Post
        </button>
      </div>

      <div
        className="mt-5 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter posts by category"
      >
        {COMMUNITY_CATEGORIES.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={category === option.id}
            onClick={() => setCategory(option.id)}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
              category === option.id
                ? 'bg-brand-600 text-white'
                : 'border border-ink-100 bg-white text-ink-700 hover:border-brand-400'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <p className="mt-5 text-sm font-medium text-ink-700" aria-live="polite">
        {visiblePosts.length} {visiblePosts.length === 1 ? 'post' : 'posts'} shown
      </p>

      {visiblePosts.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {visiblePosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-ink-100 bg-white px-6 py-16 text-center">
          <h2 className="text-lg font-bold text-ink-950">
            No posts match your filters
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink-500">
            Try a different search term or category. You can also{' '}
            <button
              type="button"
              onClick={clearFilters}
              className="rounded font-semibold text-brand-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              clear filters
            </button>{' '}
            to see all sample posts.
          </p>
        </div>
      )}

      <CreatePostModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreatePost}
      />
    </>
  )
}
