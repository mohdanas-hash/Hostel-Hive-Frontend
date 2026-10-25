import CommunityFeed from '../../components/community/CommunityFeed'
import { communityPosts } from '../../data/communityPosts'

export const metadata = {
  title: 'Student Community',
  description:
    'Browse sample student discussions on hostel life, mess food, colleges and roommates — a demo of the Hostel Hive community.',
}

export default function CommunityPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-extrabold text-ink-950 sm:text-4xl">
          Student Community
        </h1>
        <p className="mt-3 text-sm text-ink-500 sm:text-base">
          Swap experiences, ask questions and talk about student life — from
          hostel hacks to mess food recommendations.
        </p>
      </div>

      <div className="mt-5 flex items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-400/10 px-4 py-3 text-xs text-ink-700 sm:text-sm">
        <svg
          viewBox="0 0 24 24"
          className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500"
          fill="none"
          stroke="currentColor"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" strokeWidth="2" />
          <path d="M12 11v5" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="8" r="0.5" fill="currentColor" stroke="none" />
        </svg>
        <p>
          <strong className="font-semibold">Demo mode:</strong> every post
          below is sample content, not real students. Likes and any post you
          create here only last for this browser session and reset on
          refresh.
        </p>
      </div>

      <div className="mt-8">
        <CommunityFeed initialPosts={communityPosts} />
      </div>
    </section>
  )
}
