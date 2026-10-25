export default function PlaceholderContent({ title }) {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <span className="rounded-full bg-brand-100 px-4 py-1.5 text-xs font-semibold text-brand-600">
        Coming soon
      </span>
      <h1 className="mt-4 text-3xl font-extrabold text-ink-950 sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 text-sm text-ink-500 sm:text-base">
        This page is part of the Hostel Hive roadmap and will be built once
        the connected backend and data are ready.
      </p>
    </section>
  )
}
