import { render, screen } from '@testing-library/react'
import { TriageCards } from '@/components/home/TriageCards'

describe('TriageCards', () => {
  it('renders three triage cards', () => {
    render(<TriageCards />)
    expect(screen.getByText(/i need help now/i)).toBeInTheDocument()
    expect(screen.getByText(/i'm planning for the future/i)).toBeInTheDocument()
    expect(screen.getByText(/i need ongoing business counsel/i)).toBeInTheDocument()
  })

  it('each card links to the correct practice area', () => {
    render(<TriageCards />)
    expect(screen.getByRole('link', { name: /criminal defense/i })).toHaveAttribute(
      'href', '/practice-areas/criminal-defense'
    )
    expect(screen.getByRole('link', { name: /estate planning/i })).toHaveAttribute(
      'href', '/practice-areas/estate-planning'
    )
    expect(screen.getByRole('link', { name: /business law/i })).toHaveAttribute(
      'href', '/practice-areas/business-law'
    )
  })
})
