import CommunityFeed from '../../components/community/CommunityFeed'
import { communityPosts } from '../../data/communityPosts'

export const metadata = {
  title: 'Student Community',
  description:
    'Browse student discussions on hostel life, mess food, colleges and roommates on the Hostel Hive community.',
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

      <div className="mt-8">
        <CommunityFeed initialPosts={communityPosts} />
      </div>
    </section>
  )
}
