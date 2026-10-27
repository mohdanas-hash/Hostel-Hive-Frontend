// The production domain isn't configured yet (see the metadataBase comment
// in app/layout.jsx), so this falls back to a placeholder host. Set
// NEXT_PUBLIC_SITE_URL once a real domain exists so the emitted <loc> URLs
// are correct.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hostelhive.example.com'

const STATIC_ROUTES = [
  { path: '/', changeFrequency: 'daily', priority: 1 },
  { path: '/explore', changeFrequency: 'daily', priority: 0.9 },
  { path: '/messes', changeFrequency: 'daily', priority: 0.8 },
  { path: '/colleges', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/community', changeFrequency: 'daily', priority: 0.6 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.4 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.4 },
  { path: '/login', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/register', changeFrequency: 'yearly', priority: 0.2 },
]

export default function sitemap() {
  const lastModified = new Date()

  return STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
