const benefits = [
  {
    title: 'One place to compare',
    body: 'Hostels, messes and cafeterias in a single search instead of scattered listings and word-of-mouth.',
    icon: (
      <path d="M4 5h16v2H4V5zm0 6h16v2H4v-2zm0 6h10v2H4v-2z" />
    ),
  },
  {
    title: 'Food options that fit',
    body: 'Filter mess and tiffin providers by food type and budget before you commit to a monthly plan.',
    icon: (
      <path d="M8 2v6a2 2 0 002 2v12h2V10a2 2 0 002-2V2h-2v6h-0.001V2H8z" />
    ),
  },
  {
    title: 'Research before you move',
    body: 'Check pricing, amenities and service details ahead of time, especially useful when moving to a new city.',
    icon: (
      <path d="M12 2l9 5-9 5-9-5 9-5zm-7 8.2v4.1c0 1.3 3.1 3.7 7 3.7s7-2.4 7-3.7v-4.1l-7 3.9-7-3.9z" />
    ),
  },
  {
    title: 'Stay connected on campus',
    body: 'Ask questions and learn from other students in the community before making a decision.',
    icon: (
      <path d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5z" />
    ),
  },
]

export default function StudentBenefits() {
  return (
    <section className="bg-ink-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-2xl font-extrabold text-ink-950 sm:text-3xl">
            Built for the way students actually search
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-ink-500 sm:text-base">
            Practical ways Hostel Hive makes hostel and food discovery easier.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-2xl border border-ink-100 bg-white p-6"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-100 text-brand-600">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                  {benefit.icon}
                </svg>
              </div>
              <h3 className="mt-4 text-base font-bold text-ink-950">{benefit.title}</h3>
              <p className="mt-1.5 text-sm text-ink-500">{benefit.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
