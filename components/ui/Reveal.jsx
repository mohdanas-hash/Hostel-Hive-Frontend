'use client'

import { useEffect, useRef, useState } from 'react'

// Fades/slides a section in once it scrolls into view. Wraps server-rendered
// children (e.g. async Suspense content) without needing those children
// themselves to be Client Components. Disconnects after the first reveal —
// this is a one-time entrance, not a repeating scroll effect.
export default function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
