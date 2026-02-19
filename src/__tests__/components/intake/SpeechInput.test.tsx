import { render, screen } from '@testing-library/react'
import { SpeechInput } from '@/components/intake/SpeechInput'

describe('SpeechInput', () => {
  it('renders textarea as fallback', () => {
    render(<SpeechInput value="" onChange={() => {}} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('shows consent notice before recording starts', () => {
    render(<SpeechInput value="" onChange={() => {}} />)
    expect(screen.getByText(/sensitive details/i)).toBeInTheDocument()
  })
})
