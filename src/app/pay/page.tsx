import { Metadata } from 'next'
import { PaymentCards } from '@/components/payments/PaymentCards'

export const metadata: Metadata = {
  title: 'Pay Online',
  description: 'Pay your invoice, retainer, or start a monthly business counsel subscription securely online.',
}

const PHONE = process.env.NEXT_PUBLIC_PHONE_NUMBER || null

export default function PayPage() {
  return (
    <div className="py-16 px-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Pay Your Invoice or Retainer Securely Online.
      </h1>
      <p className="text-gray-600 mb-10">
        Simple, secure checkout powered by Stripe.
        {PHONE && (
          <>{' '}Questions? Call{' '}
            <a
              href={`tel:${PHONE}`}
              className="text-blue-700 font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
            >
              {PHONE}
            </a>.
          </>
        )}
      </p>

      <PaymentCards />

      {/* Trust indicators */}
      <div className="mt-10 flex flex-wrap gap-6 justify-center text-sm text-gray-500">
        {[
          { icon: '🔒', text: 'Stripe secure checkout' },
          { icon: '🛡️', text: '256-bit SSL encryption' },
          { icon: '📧', text: 'Email receipt included' },
          { icon: '✓', text: 'No card data stored by DELPALaw' },
        ].map(item => (
          <span key={item.text} className="flex items-center gap-1">
            <span aria-hidden="true">{item.icon}</span>
            {item.text}
          </span>
        ))}
      </div>

      {/* Refund & Cancellation Policy */}
      <section className="mt-12 pt-8 border-t border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Refund &amp; Cancellation Policy</h2>
        <dl className="space-y-4 text-sm text-gray-600">
          <div>
            <dt className="font-semibold text-gray-900">Flat fee</dt>
            <dd>Non-refundable once work has commenced. Refund within 5 business days if engagement has not started.</dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900">Retainer</dt>
            <dd>Unearned funds returned within 30 days of matter closing per applicable bar rules.</dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900">Subscription</dt>
            <dd>Cancel anytime before next billing date. No partial-month refunds. Access continues through billing period end.</dd>
          </div>
        </dl>
      </section>
    </div>
  )
}
