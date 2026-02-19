import { render, screen, act } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Header } from '@/components/layout/Header'

describe('Header', () => {
  it('renders firm name', async () => {
    await act(async () => { render(<Header />) })
    expect(screen.getByText('DELPALaw')).toBeInTheDocument()
  })

  it('renders primary navigation links', async () => {
    await act(async () => { render(<Header />) })
    expect(screen.getByRole('link', { name: /practice areas/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /pay online/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument()
  })

  it('renders sticky CTA button', async () => {
    await act(async () => { render(<Header />) })
    expect(screen.getByRole('link', { name: /book a consult/i })).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    let container: HTMLElement
    await act(async () => {
      const result = render(<Header />)
      container = result.container
    })
    const results = await axe(container!)
    expect(results).toHaveNoViolations()
  })
})
