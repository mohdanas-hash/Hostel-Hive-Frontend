import { Plus_Jakarta_Sans } from 'next/font/google'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body className="flex min-h-screen flex-col bg-ink-50 font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
