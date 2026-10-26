const steps = [
  {
    title: 'Search by college or city',
    body: 'Start from the homepage or Explore and look up hostels, messes and cafeterias near your campus.',
  },
  {
    title: 'Compare and filter',
    body: 'Narrow results by type, amenities and budget so you only look at options that actually fit.',
  },
  {
    title: 'Check the details',
    body: 'Open a listing to see pricing, room type or food type, amenities and service details in one place.',
  },
  {
    title: 'Decide with confidence',
    body: 'Create a free account to keep track of what you have found, then reach out directly to the provider.',
  },
]

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="font-display text-2xl font-extrabold text-ink-950 sm:text-3xl">
          How Hostel Hive works
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-ink-500 sm:text-base">
          From search to decision, in four steps.
        </p>
      </div>

      <ol className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="relative rounded-2xl border border-ink-100 bg-white p-6 shadow-card"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-600 text-sm font-bold text-white">
              {index + 1}
            </span>
            <h3 className="mt-4 text-base font-bold text-ink-950">{step.title}</h3>
            <p className="mt-1.5 text-sm text-ink-500">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
