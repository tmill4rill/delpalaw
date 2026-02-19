/**
 * @jest-environment node
 */
// Mock Stripe constructor and @/lib/stripe module
jest.mock('stripe', () => jest.fn().mockImplementation(() => ({})))

jest.mock('@/lib/stripe', () => ({
  stripe: {
    checkout: {
      sessions: {
        create: jest.fn().mockResolvedValue({ url: 'https://checkout.stripe.com/test' }),
      },
    },
  },
  buildCheckoutSession: jest.fn().mockReturnValue({ mode: 'payment' }),
}))

import { POST } from '@/app/api/stripe/checkout/route'
import { NextRequest } from 'next/server'

function makeRequest(body: unknown) {
  return new NextRequest('http://localhost/api/stripe/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

describe('POST /api/stripe/checkout', () => {
  it('returns 400 on missing required fields', async () => {
    const res = await POST(makeRequest({}))
    expect(res.status).toBe(400)
  })

  it('returns 400 on invalid email', async () => {
    const res = await POST(makeRequest({
      type: 'flat-fee',
      serviceLabel: 'LLC Formation',
      amount: 50000,
      email: 'not-an-email',
    }))
    expect(res.status).toBe(400)
  })

  it('returns 400 on invalid type', async () => {
    const res = await POST(makeRequest({
      type: 'invalid-type',
      serviceLabel: 'LLC Formation',
      amount: 50000,
      email: 'client@test.com',
    }))
    expect(res.status).toBe(400)
  })

  it('returns 200 with session URL on valid body', async () => {
    const res = await POST(makeRequest({
      type: 'flat-fee',
      serviceLabel: 'LLC Formation',
      amount: 50000,
      email: 'client@test.com',
    }))
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.url).toBe('https://checkout.stripe.com/test')
  })
})
