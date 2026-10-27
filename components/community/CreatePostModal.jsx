'use client'

import { useEffect, useRef, useState } from 'react'
import { COMMUNITY_CATEGORIES } from '../../data/communityPosts'

const POST_CATEGORIES = COMMUNITY_CATEGORIES.filter((category) => category.id !== 'all')

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

export default function CreatePostModal({ open, onClose, onSubmit }) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState(POST_CATEGORIES[0].id)
  const [body, setBody] = useState('')
  const [errors, setErrors] = useState({})
  const dialogRef = useRef(null)
  const titleInputRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    titleInputRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const focusable = dialogRef.current?.querySelectorAll(FOCUSABLE_SELECTOR)
      if (!focusable || focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, onClose])

  if (!open) return null

  function resetForm() {
    setTitle('')
    setBody('')
    setCategory(POST_CATEGORIES[0].id)
    setErrors({})
  }

  function handleClose() {
    resetForm()
    onClose()
  }

  function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = {}
    if (!title.trim()) nextErrors.title = 'Title is required.'
    if (!body.trim()) {
      nextErrors.body = 'Post body is required.'
    } else if (body.trim().length < 10) {
      nextErrors.body = 'Please write a bit more — at least 10 characters.'
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    onSubmit({ title, category, body })
    resetForm()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/60 px-4 py-8">
      <button
        type="button"
        aria-label="Close dialog"
        onClick={handleClose}
        className="absolute inset-0 cursor-default"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-post-heading"
        className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-float sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id="create-post-heading" className="text-xl font-bold text-ink-950">
            Create a post
          </h2>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="rounded-full p-1 text-ink-500 hover:text-ink-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <p className="mt-2 text-sm text-ink-500">
          This post is added to your feed for this browser session only — it
          isn&apos;t saved anywhere and will disappear on refresh.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
          <div>
            <label
              htmlFor="post-title"
              className="text-xs font-semibold uppercase tracking-wide text-ink-500"
            >
              Title
            </label>
            <input
              id="post-title"
              ref={titleInputRef}
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              aria-invalid={Boolean(errors.title)}
              aria-describedby={errors.title ? 'post-title-error' : undefined}
              className="mt-1 block w-full rounded-lg border border-ink-100 px-3 py-2 text-sm text-ink-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            />
            {errors.title && (
              <p id="post-title-error" className="mt-1 text-xs text-red-600">
                {errors.title}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="post-category"
              className="text-xs font-semibold uppercase tracking-wide text-ink-500"
            >
              Category
            </label>
            <select
              id="post-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="mt-1 block w-full rounded-lg border border-ink-100 px-3 py-2 text-sm text-ink-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              {POST_CATEGORIES.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="post-body"
              className="text-xs font-semibold uppercase tracking-wide text-ink-500"
            >
              Post
            </label>
            <textarea
              id="post-body"
              value={body}
              onChange={(event) => setBody(event.target.value)}
              rows={4}
              aria-invalid={Boolean(errors.body)}
              aria-describedby={errors.body ? 'post-body-error' : undefined}
              className="mt-1 block w-full rounded-lg border border-ink-100 px-3 py-2 text-sm text-ink-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            />
            {errors.body && (
              <p id="post-body-error" className="mt-1 text-xs text-red-600">
                {errors.body}
              </p>
            )}
          </div>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-ink-100 px-5 py-2.5 text-sm font-semibold text-ink-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
