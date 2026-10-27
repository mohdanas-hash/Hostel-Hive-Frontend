import { redirect } from 'next/navigation'
import SavedItems from '../../components/profile/SavedItems'
import { fetchColleges } from '../../lib/api'
import { getCurrentUser } from '../../lib/auth'

export const metadata = {
  title: 'Your profile',
  description: 'View your Hostel Hive account details and saved listings.',
}

const ROLE_LABELS = {
  student: 'Student',
  admin: 'Admin',
}

export default async function ProfilePage() {
  const user = await getCurrentUser()
  if (!user) redirect('/login')

  // Non-fatal: the account card still renders without a resolved college
  // name if this fails — it falls back to showing nothing rather than
  // blocking the whole page over a lookup that isn't essential.
  const colleges = await fetchColleges().catch(() => [])
  const college = colleges.find((item) => item.id === user.college_id) ?? null

  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-ink-950 sm:text-4xl">Your profile</h1>
      <p className="mt-2 text-sm text-ink-500">
        Your account details and the hostels, messes, cafeterias and colleges you&apos;ve saved.
      </p>

      <div className="mt-8 rounded-2xl border border-ink-100 bg-white p-6 shadow-card sm:p-8">
        <div className="flex items-center gap-4">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-brand-100 text-xl font-bold text-brand-600">
            {user.name?.[0]?.toUpperCase() ?? '?'}
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-lg font-bold text-ink-950">{user.name}</h2>
            <p className="truncate text-sm text-ink-500">{user.email}</p>
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 border-t border-ink-100 pt-6 sm:grid-cols-2">
          <div className="flex items-center justify-between gap-4 text-sm sm:justify-start sm:gap-2">
            <dt className="text-ink-500">Role</dt>
            <dd className="font-semibold text-ink-950">{ROLE_LABELS[user.role] ?? user.role}</dd>
          </div>
          <div className="flex items-center justify-between gap-4 text-sm sm:justify-start sm:gap-2">
            <dt className="text-ink-500">College</dt>
            <dd className="font-semibold text-ink-950">{college?.name ?? 'Not set'}</dd>
          </div>
        </dl>

        <p className="mt-6 rounded-lg bg-ink-50 px-3 py-2 text-xs text-ink-500">
          These details come straight from your account and aren&apos;t editable here yet — the
          backend doesn&apos;t currently support updating a profile after registration.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-bold text-ink-950">Saved</h2>
        <p className="mt-1 text-sm text-ink-500">
          Saved on this device only — not synced to your account or visible on other devices.
        </p>
        <div className="mt-4">
          <SavedItems />
        </div>
      </div>
    </section>
  )
}
