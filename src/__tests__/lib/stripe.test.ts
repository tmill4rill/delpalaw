// Mock Stripe constructor so it doesn't fail in jsdom/test environment
jest.mock('stripe', () => jest.fn().mockImplementation(() => ({})))

import { buildCheckoutSession } from '@/lib/stripe'

describe('buildCheckoutSession', () => {
  it('flat-fee: sets mode payment with correct amount and product name', () => {
    const params = buildCheckoutSession({
      type: 'flat-fee',
      serviceLabel: 'LLC Formation',
      amount: 50000,
      email: 'client@test.com',
    })

    expect(params.mode).toBe('payment')
    expect(params.customer_email).toBe('client@test.com')

    const item = params.line_items![0]
    expect(item.price_data!.unit_amount).toBe(50000)
    expect(item.price_data!.product_data!.name).toBe('LLC Formation')
    expect(item.price_data!.recurring).toBeUndefined()
    expect(item.quantity).toBe(1)
  })

  it('subscription: sets mode subscription with monthly recurring interval', () => {
    const params = buildCheckoutSession({
      type: 'subscription',
      serviceLabel: 'Business Counsel Plan',
      amount: 75000,
      email: 'client@test.com',
    })

    expect(params.mode).toBe('subscription')
    expect(params.line_items![0].price_data!.recurring!.interval).toBe('month')
    expect(params.line_items![0].price_data!.product_data!.name).toBe('Business Counsel Plan')
  })

  it('retainer: sets mode payment with IOLTA description', () => {
    const params = buildCheckoutSession({
      type: 'retainer',
      serviceLabel: 'Criminal Defense Retainer',
      amount: 250000,
      email: 'client@test.com',
    })

    expect(params.mode).toBe('payment')
    expect(params.line_items![0].price_data!.product_data!.description).toMatch(
      /unearned funds returned/i
    )
  })
})
