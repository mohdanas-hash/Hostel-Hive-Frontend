import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google'
import { logoutAction } from './actions/auth'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'
import { fetchColleges } from '../lib/api'
import { getCurrentUser } from '../lib/auth'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
})

// Editorial display face for hero/section headlines only (the
// ui-ux-pro-max design-system search for this product recommended an
// Inter/Playfair pairing) — Plus Jakarta Sans stays the body/UI face
// everywhere else, so this is additive, not a site-wide font swap.
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-playfair-display',
  display: 'swap',
})

const SITE_NAME = 'Hostel Hive'
const DEFAULT_TITLE = 'Hostel Hive — Student Housing & Food, Sorted'
const SITE_DESCRIPTION =
  'Hostel Hive is the student marketplace for finding and comparing trusted hostels, messes, cafeterias and colleges — backed by real student reviews.'

// No social-preview image is included: public/ has no suitable asset, and
// og:image/twitter:image both require an absolute URL (no metadataBase is
// configured, since the production domain isn't known yet — see
// alternates.canonical in app/explore/page.jsx for the same constraint).
export const metadata = {
  title: {
    default: DEFAULT_TITLE,
    template: '%s | Hostel Hive',
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: DEFAULT_TITLE,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: DEFAULT_TITLE,
    description: SITE_DESCRIPTION,
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default async function RootLayout({ children }) {
  const user = await getCurrentUser()
  // Non-fatal: the college picker in the sign-up form is a nice-to-have, not
  // a blocker — see the same pattern in app/register/page.jsx.
  const colleges = await fetchColleges().catch(() => [])

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${plusJakartaSans.variable} ${playfairDisplay.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-ink-50 font-sans">
        <Navbar user={user} logoutAction={logoutAction} colleges={colleges} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
