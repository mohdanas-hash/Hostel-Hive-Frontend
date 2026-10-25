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

export const metadata = {
  title: {
    default: 'Hostel Hive — Student Housing & Food, Sorted',
    template: '%s | Hostel Hive',
  },
  description:
    'Hostel Hive is the student marketplace for finding and comparing trusted hostels, messes, cafeterias and colleges — backed by real student reviews.',
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
