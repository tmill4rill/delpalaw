import { Metadata } from 'next'
import { IntakeForm } from '@/components/intake/IntakeForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: "Tell Andre what's going on. He'll follow up within one business day.",
}

const PHONE = process.env.NEXT_PUBLIC_PHONE_NUMBER || null

export default function ContactPage() {
  return (
    <div className="py-16 px-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-3">Let&rsquo;s Talk About Your Situation.</h1>
      <p className="text-gray-600 mb-8">
        Fill out the form below and Andre will follow up within one business day — often sooner.
        {PHONE && (
          <>
            {' '}For urgent matters, call{' '}
            <a
              href={`tel:${PHONE}`}
              className="text-blue-700 font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
            >
              {PHONE}
            </a>{' '}
            now.
          </>
        )}
      </p>

      <IntakeForm />

      <section className="mt-12 pt-10 border-t border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">What Happens Next</h2>
        <ol className="space-y-3">
          {[
            'Submit your intake form.',
            'Andre reviews your situation personally.',
            'You hear back within one business day — often sooner.',
          ].map((step, i) => (
            <li key={i} className="flex gap-3 text-sm text-gray-700">
              <span className="font-bold text-blue-700 flex-shrink-0">{i + 1}.</span>
              {step}
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
