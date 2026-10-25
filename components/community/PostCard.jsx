'use client'

import { useState } from 'react'
import { COMMUNITY_CATEGORIES } from '../../data/communityPosts'

const CATEGORY_LABELS = Object.fromEntries(
  COMMUNITY_CATEGORIES.map((category) => [category.id, category.label]),
)

export default function PostCard({ post }) {
  const [liked, setLiked] = useState(false)
  const displayLikes = (post.likeCount ?? 0) + (liked ? 1 : 0)

  return (
    <article className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-600">
          {CATEGORY_LABELS[post.category] ?? post.category}
        </span>
        <span className="rounded-full bg-ink-50 px-3 py-1 text-xs font-medium text-ink-500">
          {post.sampleLabel}
        </span>
      </div>

      <h3 className="mt-3 break-words text-lg font-bold text-ink-950">
        {post.title}
      </h3>
      <p className="mt-1 text-xs text-ink-500">
        Posted by {post.authorName}{' '}
        <span className="text-ink-400">(sample profile, not a real student)</span>
      </p>
      <p className="mt-3 break-words text-sm leading-relaxed text-ink-700">
        {post.body}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-ink-100 pt-4">
        <button
          type="button"
          aria-pressed={liked}
          onClick={() => setLiked((value) => !value)}
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ${
            liked
              ? 'border-brand-600 bg-brand-600 text-white'
              : 'border-ink-100 text-ink-700 hover:border-brand-400'
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill={liked ? 'currentColor' : 'none'}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              d="M12 21s-7.5-4.6-10-9.2C.4 8.1 2 4.5 5.6 4a5 5 0 016.4 2 5 5 0 016.4-2c3.6.5 5.2 4.1 3.6 7.8C19.5 16.4 12 21 12 21z"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
          {displayLikes}
          <span className="sr-only">likes — this session only, not saved</span>
        </button>

        <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-400">
          {post.commentCount ?? 0} comments
          <span className="text-ink-300">· coming soon</span>
        </span>
      </div>
    </article>
  )
}
