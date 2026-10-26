import { redirect } from 'next/navigation'
import RegisterForm from '../../components/auth/RegisterForm'
import { fetchColleges } from '../../lib/api'
import { getCurrentUser } from '../../lib/auth'

export const metadata = {
  title: 'Create an account',
  description: 'Create a free Hostel Hive account to review and book hostels, messes and cafeterias.',
}

export default async function RegisterPage() {
  const user = await getCurrentUser()
  if (user) redirect('/')

  // Non-fatal: the college picker is a nice-to-have on signup, not a
  // blocker — if the catalog fails to load, registration still works
  // without it (`college_id` is optional on the backend).
  const colleges = await fetchColleges().catch(() => [])

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold text-ink-950">Create your account</h1>
      <p className="mt-2 text-sm text-ink-500">
        Join Hostel Hive to explore listings, write reviews, and manage bookings.
      </p>
      <div className="mt-6 rounded-2xl border border-ink-100 bg-white p-6 shadow-card sm:p-8">
        <RegisterForm colleges={colleges} />
      </div>
    </section>
  )
}
