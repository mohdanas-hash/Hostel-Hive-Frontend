import { placeholderTestimonials } from '../../data/placeholderListings'

export default function Testimonials() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-ink-950 sm:text-3xl">
            What students are saying
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-ink-500 sm:text-base">
            Real stories from the Hostel Hive community.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {placeholderTestimonials.map((item) => (
            <blockquote
              key={item.id}
              className="flex flex-col rounded-2xl border border-ink-100 bg-ink-50 p-6"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 text-brand-400"
                fill="currentColor"
              >
                <path d="M7 7h4v6a4 4 0 01-4 4H6v-2h1a2 2 0 002-2H7V7zm10 0h4v6a4 4 0 01-4 4h-1v-2h1a2 2 0 002-2h-2V7z" />
              </svg>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-700">
                “{item.quote}”
              </p>
              <footer className="mt-4">
                <p className="text-sm font-bold text-ink-950">{item.name}</p>
                <p className="text-xs text-ink-500">{item.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
