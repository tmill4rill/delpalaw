import { render, screen, fireEvent, act } from '@testing-library/react'
import { DisclaimerBanner } from '@/components/layout/DisclaimerBanner'

describe('DisclaimerBanner', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  it('is visible when sessionStorage has no dismissed key', async () => {
    await act(async () => { render(<DisclaimerBanner />) })
    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.getByText(/does not constitute legal advice/i)).toBeInTheDocument()
  })

  it('is not rendered when sessionStorage key is already set', async () => {
    sessionStorage.setItem('disclaimer-dismissed', 'true')
    await act(async () => { render(<DisclaimerBanner />) })
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('hides banner and sets sessionStorage when dismiss is clicked', async () => {
    await act(async () => { render(<DisclaimerBanner />) })
    const dismissBtn = screen.getByRole('button', { name: /dismiss disclaimer/i })
    await act(async () => { fireEvent.click(dismissBtn) })
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    expect(sessionStorage.getItem('disclaimer-dismissed')).toBe('true')
  })

  it('contains a link to the disclaimer page', async () => {
    await act(async () => { render(<DisclaimerBanner />) })
    expect(screen.getByRole('link', { name: /see full disclaimer/i })).toHaveAttribute('href', '/disclaimer')
  })
})
