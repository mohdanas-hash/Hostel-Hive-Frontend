import { redirect } from 'next/navigation'
import LoginForm from '../../components/auth/LoginForm'
import { getCurrentUser } from '../../lib/auth'

export const metadata = {
  title: 'Log in',
  description: 'Log in to your Hostel Hive account.',
}

export default async function LoginPage() {
  const user = await getCurrentUser()
  if (user) redirect('/')

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold text-ink-950">Welcome back</h1>
      <p className="mt-2 text-sm text-ink-500">
        Log in to save favourites, write reviews, and manage your bookings.
      </p>
      <div className="mt-6 rounded-2xl border border-ink-100 bg-white p-6 shadow-card sm:p-8">
        <LoginForm />
      </div>
    </section>
  )
}
