'use client'

import { useEffect, useRef } from 'react'

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

// Generic accessible confirm/cancel dialog (focus trap, Escape-to-close,
// focus restored to the trigger on close) — the same pattern already proven
// in CreatePostModal.jsx, extracted so it can be reused for destructive
// confirmations like logout.
export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  pending = false,
  error = null,
  onConfirm,
  onCancel,
}) {
  const dialogRef = useRef(null)
  const confirmButtonRef = useRef(null)
  const triggerRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    triggerRef.current = document.activeElement
    confirmButtonRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        if (!pending) onCancel()
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
      if (triggerRef.current instanceof HTMLElement) {
        triggerRef.current.focus()
      }
    }
  }, [open, onCancel, pending])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/60 px-4 py-8 animate-dialog-backdrop">
      <button
        type="button"
        aria-label="Close dialog"
        onClick={() => {
          if (!pending) onCancel()
        }}
        className="absolute inset-0 cursor-default"
      />

      <div
        ref={dialogRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-heading"
        aria-describedby={description ? 'confirm-dialog-description' : undefined}
        className="animate-dialog-panel relative z-10 w-full max-w-sm rounded-2xl bg-white p-6 shadow-float"
      >
        <h2 id="confirm-dialog-heading" className="text-lg font-bold text-ink-950">
          {title}
        </h2>
        {description && (
          <p id="confirm-dialog-description" className="mt-2 text-sm text-ink-500">
            {description}
          </p>
        )}

        {error && (
          <p role="alert" className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={pending}
            className="rounded-xl border border-ink-100 px-5 py-2.5 text-sm font-semibold text-ink-700 transition-colors hover:bg-ink-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {cancelLabel}
          </button>
          <button
            ref={confirmButtonRef}
            type="button"
            onClick={onConfirm}
            disabled={pending}
            className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-70"
          >
            {pending ? 'Logging out…' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
