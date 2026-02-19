import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Payment Received',
}

const PHONE = process.env.NEXT_PUBLIC_PHONE_NUMBER || null

export default function PaymentConfirmationPage() {
  return (
    <div className="py-20 px-4 max-w-md mx-auto text-center">
      {/* Success icon */}
      <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-green-100 flex items-center justify-center" aria-hidden="true">
        <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-3">Payment Received.</h1>
      <p className="text-gray-600 mb-4">
        You&rsquo;ll receive a receipt at your email address. Andre will follow up to confirm next steps.
      </p>

      {PHONE && (
        <p className="text-sm text-gray-500 mb-8">
          Questions? Call{' '}
          <a
            href={`tel:${PHONE}`}
            className="text-blue-700 font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
          >
            {PHONE}
          </a>
        </p>
      )}

      <Button variant="primary" href="/">
        Back to Home
      </Button>
    </div>
  )
}
