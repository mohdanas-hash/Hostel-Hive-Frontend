'use client'

import { useLinkStatus } from 'next/link'

// app/listings/[id] has no loading.js on purpose: that file wraps the page
// in a Suspense boundary, which forces the response to start streaming (and
// its HTTP status to lock at 200) before notFound() can run for a genuinely
// missing listing — see Next's own docs on loading.js "Status codes". This
// hint is the documented fallback for a dynamic route that can't use a
// route-level loading fallback: a subtle pending indicator on the Link
// itself instead. Pair with `prefetch={false}` on the Link for it to be
// meaningful (prefetched navigations skip the pending state entirely).
export default function ListingLinkHint() {
  const { pending } = useLinkStatus()
  return (
    <span
      aria-hidden="true"
      className={`listing-link-hint ${pending ? 'is-pending' : ''}`}
    />
  )
}
