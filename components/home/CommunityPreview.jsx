import Link from 'next/link'
import { COMMUNITY_CATEGORIES, communityPosts } from '../../data/communityPosts'

const PREVIEW_COUNT = 3

const CATEGORY_LABELS = Object.fromEntries(
  COMMUNITY_CATEGORIES.map((category) => [category.id, category.label]),
)

export default function CommunityPreview() {
  const posts = communityPosts.slice(0, PREVIEW_COUNT)

  return (
    <section className="bg-ink-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-2xl font-extrabold text-ink-950 sm:text-3xl">
              Talk to students who get it
            </h2>
            <p className="mt-2 max-w-xl text-sm text-ink-500 sm:text-base">
              Swap experiences on hostel life, mess food and roommates in the
              Hostel Hive community.
            </p>
          </div>
          <Link
            href="/community"
            className="rounded text-sm font-semibold text-brand-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            Visit the community →
          </Link>
        </div>

        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-400/10 px-3 py-1.5 text-xs font-semibold text-ink-700">
          <svg
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5 flex-shrink-0 text-amber-500"
            fill="none"
            stroke="currentColor"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" strokeWidth="2" />
            <path d="M12 11v5" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="8" r="0.5" fill="currentColor" stroke="none" />
          </svg>
          Demo content — sample posts, not real students
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card"
            >
              <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-600">
                {CATEGORY_LABELS[post.category] ?? post.category}
              </span>
              <h3 className="mt-3 break-words text-sm font-bold text-ink-950">
                {post.title}
              </h3>
              <p className="mt-2 line-clamp-3 break-words text-xs leading-relaxed text-ink-500">
                {post.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
