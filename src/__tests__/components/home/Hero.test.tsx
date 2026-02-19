import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Hero } from '@/components/home/Hero'

describe('Hero', () => {
  it('renders headline', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /serious legal matters deserve serious counsel/i
    )
  })

  it('renders primary CTA linking to contact', () => {
    render(<Hero />)
    const cta = screen.getByRole('link', { name: /book a free consult/i })
    expect(cta).toHaveAttribute('href', '/contact')
  })

  it('renders phone CTA', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /call now/i })).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Hero />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
