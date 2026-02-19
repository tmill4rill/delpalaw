import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? 'test_placeholder', {
  apiVersion: '2026-01-28.clover',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export interface CheckoutParams {
  type: 'flat-fee' | 'retainer' | 'subscription'
  serviceLabel: string
  amount: number  // in cents
  email: string
}

export function buildCheckoutSession(
  params: CheckoutParams
): Stripe.Checkout.SessionCreateParams {
  const { type, serviceLabel, amount, email } = params

  const isSubscription = type === 'subscription'
  const isRetainer = type === 'retainer'

  const productData: Stripe.Checkout.SessionCreateParams.LineItem.PriceData.ProductData = {
    name: serviceLabel,
    ...(isRetainer
      ? { description: 'Retainer deposit — unearned funds returned per applicable bar rules.' }
      : {}),
  }

  const priceData: Stripe.Checkout.SessionCreateParams.LineItem.PriceData = {
    currency: 'usd',
    unit_amount: amount,
    product_data: productData,
    ...(isSubscription ? { recurring: { interval: 'month' } } : {}),
  }

  return {
    mode: isSubscription ? 'subscription' : 'payment',
    customer_email: email,
    line_items: [{ price_data: priceData, quantity: 1 }],
    success_url: `${SITE_URL}/payment-confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${SITE_URL}/pay`,
    metadata: { payment_type: type },
  }
}
