'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export type PaymentType = 'flat-fee' | 'retainer' | 'subscription'

export const CHECKOUT_CONFIG: Record<PaymentType, {
  title: string
  description: string
  defaultAmount: number
  serviceLabel: string
  buttonLabel: string
}> = {
  'flat-fee': {
    title: 'Pay for a Service',
    description: 'Enter your email and the amount from your invoice.',
    defaultAmount: 50000,
    serviceLabel: 'Legal Services — Flat Fee',
    buttonLabel: 'Proceed to Secure Checkout',
  },
  retainer: {
    title: 'Pay Your Retainer',
    description: 'Enter your email and the retainer amount Andre quoted you.',
    defaultAmount: 250000,
    serviceLabel: 'Retainer Deposit',
    buttonLabel: 'Pay Retainer Securely',
  },
  subscription: {
    title: 'Start Your Business Counsel Plan',
    description: 'Monthly ongoing legal counsel. Cancel anytime.',
    defaultAmount: 75000,
    serviceLabel: 'Business Counsel Plan — Monthly',
    buttonLabel: 'Start Monthly Plan',
  },
}

export function CheckoutTypeForm({ type }: { type: PaymentType }) {
  const config = CHECKOUT_CONFIG[type]
  const [email, setEmail] = useState('')
  const [dollars, setDollars] = useState((config.defaultAmount / 100).toFixed(2))

  const amountCents = Math.round(parseFloat(dollars || '0') * 100)

  return (
    <>
      <div className="space-y-5 mb-8">
        <div>
          <label htmlFor="checkout-email" className="block text-sm font-medium text-gray-900 mb-1">
            Email address <span aria-hidden="true" className="text-red-600">*</span>
          </label>
          <input
            id="checkout-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          />
        </div>

        {type !== 'subscription' && (
          <div>
            <label htmlFor="checkout-amount" className="block text-sm font-medium text-gray-900 mb-1">
              Amount ($)
            </label>
            <input
              id="checkout-amount"
              type="number"
              min="1"
              step="0.01"
              value={dollars}
              onChange={e => setDollars(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            />
          </div>
        )}
      </div>

      <CheckoutButton
        type={type}
        serviceLabel={config.serviceLabel}
        amount={type === 'subscription' ? config.defaultAmount : amountCents}
        email={email}
        label={config.buttonLabel}
      />

      <p className="mt-4 text-xs text-gray-500 text-center">
        <span aria-hidden="true">🔒</span>{' '}
        Secure checkout powered by Stripe. DELPALaw never stores your card data.
      </p>
    </>
  )
}

const cards = [
  {
    type: 'flat-fee' as const,
    title: 'Flat Fee',
    description: 'Pay for a specific service',
    subtext: 'Select your service below or enter a custom amount from your invoice.',
    buttonLabel: 'Pay for a Service',
  },
  {
    type: 'retainer' as const,
    title: 'Retainer',
    description: 'Pay your retainer deposit',
    subtext: 'Use the amount Andre quoted you, or enter your invoice amount.',
    buttonLabel: 'Pay My Retainer',
  },
  {
    type: 'subscription' as const,
    title: 'Business Counsel Plan',
    description: 'Monthly ongoing legal counsel',
    subtext: 'Cancel anytime. No contracts, no surprise invoices.',
    buttonLabel: 'Start Monthly Plan',
  },
]

export function PaymentCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map(card => (
        <div key={card.type} className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col">
          <h2 className="text-xl font-bold text-gray-900 mb-1">{card.title}</h2>
          <p className="text-gray-700 font-medium text-sm mb-2">{card.description}</p>
          <p className="text-gray-500 text-xs mb-6 flex-1">{card.subtext}</p>
          <Link
            href={`/pay/${card.type}`}
            className="inline-flex items-center justify-center rounded-md px-6 py-3 font-semibold text-sm bg-blue-700 text-white hover:bg-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-colors"
          >
            {card.buttonLabel}
          </Link>
        </div>
      ))}
    </div>
  )
}

export interface CheckoutButtonProps {
  type: 'flat-fee' | 'retainer' | 'subscription'
  serviceLabel: string
  amount: number
  email: string
  label: string
}

export function CheckoutButton({ type, serviceLabel, amount, email, label }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleCheckout() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, serviceLabel, amount, email }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? 'Checkout failed')
      }
      router.push(data.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div>
      <Button
        variant="urgent"
        disabled={loading || !email || amount <= 0}
        onClick={handleCheckout}
      >
        {loading ? 'Redirecting…' : label}
      </Button>
      {error && (
        <p role="alert" className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}
