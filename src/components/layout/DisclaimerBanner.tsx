'use client'
import { useState, useSyncExternalStore } from 'react'

function getIsDismissed() {
  if (typeof window === 'undefined') return true
  return sessionStorage.getItem('disclaimer-dismissed') === 'true'
}

export function DisclaimerBanner() {
  const isDismissed = useSyncExternalStore(
    () => () => {},
    () => getIsDismissed(),
    () => true,
  )
  const [manuallyDismissed, setManuallyDismissed] = useState(false)
  const visible = !isDismissed && !manuallyDismissed

  const dismiss = () => {
    sessionStorage.setItem('disclaimer-dismissed', 'true')
    setManuallyDismissed(true)
  }

  if (!visible) return null

  return (
    <div role="status" className="bg-gray-900 text-white text-xs py-2 px-4 flex items-center justify-between">
      <p className="flex-1 mr-4">
        This site provides general information only and does not constitute legal advice.{' '}
        <a
          href="/disclaimer"
          className="underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          See full disclaimer.
        </a>
      </p>
      <button
        onClick={dismiss}
        aria-label="Dismiss disclaimer"
        className="text-gray-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded flex-shrink-0"
      >
        ✕
      </button>
    </div>
  )
}
