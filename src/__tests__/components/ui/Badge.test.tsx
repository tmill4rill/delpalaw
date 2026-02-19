import { render, screen } from '@testing-library/react'
import { Badge } from '@/components/ui/Badge'

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>Criminal Defense</Badge>)
    expect(screen.getByText('Criminal Defense')).toBeInTheDocument()
  })

  it('applies blue variant classes by default', () => {
    const { container } = render(<Badge>Default</Badge>)
    const badge = container.firstChild as HTMLElement
    expect(badge).toHaveClass('bg-blue-50')
    expect(badge).toHaveClass('text-blue-700')
  })

  it('applies gold variant classes', () => {
    const { container } = render(<Badge variant="gold">Gold</Badge>)
    const badge = container.firstChild as HTMLElement
    expect(badge).toHaveClass('bg-gold-50')
    expect(badge).toHaveClass('text-gold-700')
  })

  it('applies gray variant classes', () => {
    const { container } = render(<Badge variant="gray">Gray</Badge>)
    const badge = container.firstChild as HTMLElement
    expect(badge).toHaveClass('bg-gray-50')
    expect(badge).toHaveClass('text-gray-600')
  })
})
