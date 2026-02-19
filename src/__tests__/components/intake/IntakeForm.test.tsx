import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { axe } from 'jest-axe'
import { IntakeForm } from '@/components/intake/IntakeForm'

describe('IntakeForm', () => {
  it('renders all required fields', () => {
    render(<IntakeForm />)
    expect(screen.getByLabelText(/name/i, { selector: 'input[type="text"]' })).toBeInTheDocument()
    expect(screen.getByLabelText(/phone/i, { selector: 'input[type="tel"]' })).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i, { selector: 'input[type="email"]' })).toBeInTheDocument()
    expect(screen.getByLabelText(/practice area/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/tell us what/i)).toBeInTheDocument()
  })

  it('shows validation errors on empty submit', async () => {
    render(<IntakeForm />)
    fireEvent.click(screen.getByRole('button', { name: /send my intake request/i }))
    await waitFor(() => {
      expect(screen.getByText('Name is required.')).toBeInTheDocument()
      expect(screen.getByText('Email is required.')).toBeInTheDocument()
      expect(screen.getByText('Please select a practice area.')).toBeInTheDocument()
    })
  })

  it('submit button is labeled correctly', () => {
    render(<IntakeForm />)
    expect(screen.getByRole('button', { name: /send my intake request/i })).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<IntakeForm />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
