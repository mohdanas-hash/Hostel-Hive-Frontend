const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2'

const faqs = [
  {
    question: 'Do I need an account to browse listings?',
    answer:
      'No — browsing hostels, messes, cafeterias and colleges is open to everyone. You only need an account to save favourites, write reviews or manage bookings.',
  },
  {
    question: 'Is the mess and food data on Hostel Hive real?',
    answer:
      'Listings come from Hostel Hive’s live catalog when available. Sample daily menus and the community feed are clearly labelled as illustrative/demo content where real data doesn’t exist yet.',
  },
  {
    question: 'Why does a listing show no rating?',
    answer:
      'Ratings come from real student reviews. A listing shows no rating simply because it hasn’t received any yet — that’s not an error.',
  },
  {
    question: 'Can I book a hostel or subscribe to a mess plan here?',
    answer:
      'Not yet — Hostel Hive currently supports discovery and comparison, not booking or payments. Reach out to a provider directly using the details on its listing.',
  },
]

export default function FAQSection() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="font-display text-2xl font-extrabold text-ink-950 sm:text-3xl">
          Frequently asked questions
        </h2>
      </div>

      <div className="mt-8 space-y-4">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-2xl border border-ink-100 bg-white p-5 shadow-card"
          >
            <summary
              className={`cursor-pointer list-none text-sm font-semibold text-ink-950 ${FOCUS_RING}`}
            >
              {faq.question}
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-ink-500">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
