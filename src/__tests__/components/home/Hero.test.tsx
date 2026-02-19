import { render, screen, act } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Hero } from '@/components/home/Hero'

describe('Hero', () => {
  it('renders headline', async () => {
    await act(async () => { render(<Hero />) })
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /serious legal matters deserve serious counsel/i
    )
  })

  it('renders primary CTA linking to contact', async () => {
    await act(async () => { render(<Hero />) })
    const cta = screen.getByRole('link', { name: /book a free consult/i })
    expect(cta).toHaveAttribute('href', '/contact')
  })

  it('renders phone CTA', async () => {
    await act(async () => { render(<Hero />) })
    expect(screen.getByRole('link', { name: /call now/i })).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    let container: HTMLElement
    await act(async () => {
      const result = render(<Hero />)
      container = result.container
    })
    const results = await axe(container!)
    expect(results).toHaveNoViolations()
  })
})
