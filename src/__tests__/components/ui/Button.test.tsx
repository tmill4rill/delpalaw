import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/Button'

describe('Button', () => {
  it('renders primary variant with correct classes', () => {
    render(<Button variant="primary">Book a Consult</Button>)
    const btn = screen.getByRole('button', { name: /book a consult/i })
    expect(btn).toHaveClass('bg-blue-700')
    expect(btn).toHaveClass('text-white')
  })

  it('renders urgent variant with gold background', () => {
    render(<Button variant="urgent">Call Now</Button>)
    const btn = screen.getByRole('button', { name: /call now/i })
    expect(btn).toHaveClass('bg-gold-700')
  })

  it('renders secondary ghost variant', () => {
    render(<Button variant="secondary">Learn More</Button>)
    const btn = screen.getByRole('button', { name: /learn more/i })
    expect(btn).toHaveClass('border-blue-700')
    expect(btn).toHaveClass('bg-transparent')
  })

  it('renders as anchor when href provided', () => {
    render(<Button href="/contact" variant="primary">Contact</Button>)
    const link = screen.getByRole('link', { name: /contact/i })
    expect(link).toHaveAttribute('href', '/contact')
  })
})
