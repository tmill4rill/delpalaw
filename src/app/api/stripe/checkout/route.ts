import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { stripe, buildCheckoutSession } from '@/lib/stripe'

const checkoutSchema = z.object({
  type: z.enum(['flat-fee', 'retainer', 'subscription']),
  serviceLabel: z.string().min(1).max(200),
  amount: z.number().int().positive().max(1_000_000),
  email: z.string().email(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = checkoutSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: result.error.flatten() },
        { status: 400 }
      )
    }

    const sessionParams = buildCheckoutSession(result.data)
    const session = await stripe.checkout.sessions.create(sessionParams)

    if (!session.url) {
      console.error('[stripe/checkout] session.url was null, sessionId:', session.id)
      return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
    }

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[stripe/checkout] error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
