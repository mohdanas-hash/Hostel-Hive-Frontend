const points = [
  {
    title: 'Pricing comes from the listing',
    body: 'Monthly rent, mess plans and cafeteria prices are shown as provided by each listing — compare them directly rather than relying on estimates.',
  },
  {
    title: 'Food type and amenities are explicit',
    body: 'Vegetarian/non-vegetarian status, meals per day and amenities are shown field-by-field, so you can check what matters to you before deciding.',
  },
  {
    title: 'Demo content is always labelled',
    body: 'Community posts and sample menus are clearly marked as demo or illustrative wherever real data isn’t available yet — never presented as verified listings.',
  },
]

export default function TrustSection() {
  return (
    <section className="bg-ink-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-extrabold text-ink-950 sm:text-3xl">
            How to evaluate what you see here
          </h2>
          <p className="mt-2 text-sm text-ink-500 sm:text-base">
            Hostel Hive doesn&apos;t claim verification it hasn&apos;t done.
            Here&apos;s what&apos;s actually behind the listings and content
            on this platform.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {points.map((point) => (
            <div
              key={point.title}
              className="rounded-2xl border border-ink-100 bg-white p-6 shadow-card"
            >
              <h3 className="text-base font-bold text-ink-950">{point.title}</h3>
              <p className="mt-2 text-sm text-ink-500">{point.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
