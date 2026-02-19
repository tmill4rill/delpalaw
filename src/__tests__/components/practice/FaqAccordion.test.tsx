import { render, screen, fireEvent } from '@testing-library/react'
import { axe } from 'jest-axe'
import { FaqAccordion } from '@/components/practice/FaqAccordion'

const faqs = [
  { question: 'What should I do if arrested?', answer: 'Remain silent and call an attorney.' },
  { question: 'How much does it cost?', answer: 'Fees vary by matter.' },
]

describe('FaqAccordion', () => {
  it('renders all questions', () => {
    render(<FaqAccordion items={faqs} />)
    expect(screen.getByText('What should I do if arrested?')).toBeInTheDocument()
    expect(screen.getByText('How much does it cost?')).toBeInTheDocument()
  })

  it('answers are hidden by default', () => {
    render(<FaqAccordion items={faqs} />)
    expect(screen.queryByText('Remain silent and call an attorney.')).not.toBeVisible()
  })

  it('expands answer on click', () => {
    render(<FaqAccordion items={faqs} />)
    fireEvent.click(screen.getByText('What should I do if arrested?'))
    expect(screen.getByText('Remain silent and call an attorney.')).toBeVisible()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<FaqAccordion items={faqs} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
