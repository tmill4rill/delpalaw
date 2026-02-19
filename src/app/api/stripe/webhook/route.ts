import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.error('[stripe/webhook] STRIPE_WEBHOOK_SECRET is not set')
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
  }

  let event: ReturnType<typeof stripe.webhooks.constructEvent>

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('[stripe/webhook] signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object
      console.log('[stripe/webhook] payment completed:', {
        sessionId: session.id,
        customerEmail: session.customer_email,
      })
      // TODO: Send confirmation email via Resend/SendGrid
      break
    }
    case 'customer.subscription.deleted': {
      const subscription = event.data.object
      console.log('[stripe/webhook] subscription cancelled:', subscription.id)
      // TODO: Notify Andre of cancellation
      break
    }
    default:
      break
  }

  return NextResponse.json({ received: true })
}
