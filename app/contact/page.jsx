import Link from 'next/link'

export const metadata = {
  title: 'Contact & Help',
  description:
    'Get help using Hostel Hive, find answers to common questions, or report incorrect listing information.',
  alternates: { canonical: '/contact' },
}

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2'

const faqs = [
  {
    question: 'How do I find a hostel, mess or cafeteria near my college?',
    answer:
      'Go to Explore and use the type, amenities and max price filters, or go to Colleges to browse by city first and then look for listings nearby.',
  },
  {
    question: 'Why does a listing show no rating?',
    answer:
      'Ratings are calculated from real student reviews. A listing shows no rating simply because it has not received any reviews yet — that is not an error.',
  },
  {
    question: "I found incorrect information on a listing — what do I do?",
    answer:
      'Hostel Hive does not yet have a way to submit a correction report directly from the site — see the note above about the missing contact integration.',
  },
  {
    question: 'Do I need an account to browse listings?',
    answer:
      'No — browsing hostels, messes, cafeterias and colleges is open to everyone. You only need an account to save favourites, write reviews or manage bookings.',
  },
  {
    question: 'I registered or logged in, but nothing changed — why?',
    answer:
      'Make sure you are using the email and password you registered with, and check for a specific error message on the form. If the backend is temporarily unreachable, the form will say so rather than silently failing.',
  },
]

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-extrabold text-ink-950 sm:text-4xl">Contact & Help</h1>
      <p className="mt-4 text-sm leading-relaxed text-ink-500 sm:text-base">
        Have a question about browsing listings, finding accommodation or
        mess services, or something that looks wrong on the site? Start with
        the FAQ below — if it does not cover your issue, reach out directly.
      </p>

      <div className="mt-8 rounded-2xl border border-dashed border-amber-500/50 bg-amber-50 p-5 text-sm text-ink-700">
        <strong className="font-semibold text-ink-950">No contact channel configured yet.</strong>{' '}
        Hostel Hive&apos;s backend does not currently have a support-ticket or
        message-submission endpoint, and no official support email or phone
        number is configured in this project. This page intentionally does
        not include a &quot;Send&quot; form, or a made-up email address, since
        either would be misleading. Once a real support endpoint or contact
        address exists, it belongs here.
      </div>

      <div className="mt-10 space-y-4">
        <h2 className="text-xl font-bold text-ink-950">Frequently asked questions</h2>
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

      <p className="mt-10 text-sm text-ink-500">
        Looking for listings instead?{' '}
        <Link href="/explore" className={`font-semibold text-brand-600 hover:underline ${FOCUS_RING}`}>
          Explore hostels, messes & cafeterias
        </Link>
        .
      </p>
    </section>
  )
}
