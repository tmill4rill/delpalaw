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

  it('does not show speech controls when Speech API is unavailable', () => {
    // jsdom does not implement SpeechRecognition, so speechSupported stays false
    render(<SpeechInput value="" onChange={() => {}} />)
    expect(screen.queryByText(/speak instead of typing/i)).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /stop/i })).not.toBeInTheDocument()
  })
})
