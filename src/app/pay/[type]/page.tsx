import Link from 'next/link'
import { CHECKOUT_CONFIG, CheckoutTypeForm, type PaymentType } from '@/components/payments/PaymentCards'

const VALID_TYPES: PaymentType[] = ['flat-fee', 'retainer', 'subscription']

export function generateStaticParams() {
  return VALID_TYPES.map(type => ({ type }))
}

export default async function PayTypePage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params
  const config = CHECKOUT_CONFIG[type as PaymentType]

  if (!config) {
    return (
      <div className="py-16 px-4 max-w-md mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Payment type not found.</h1>
        <Link href="/pay" className="text-blue-700 font-semibold hover:underline">
          ← Back to Pay Online
        </Link>
      </div>
    )
  }

  return (
    <div className="py-16 px-4 max-w-md mx-auto">
      <Link
        href="/pay"
        className="text-sm text-blue-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded mb-6 inline-block"
      >
        ← Back
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{config.title}</h1>
      <p className="text-gray-600 text-sm mb-8">{config.description}</p>

      <CheckoutTypeForm type={type as PaymentType} />
    </div>
  )
}
