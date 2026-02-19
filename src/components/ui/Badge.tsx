type BadgeVariant = 'blue' | 'gold' | 'gray'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
}

const variants: Record<BadgeVariant, string> = {
  blue: 'bg-blue-50 text-blue-700',
  gold: 'bg-yellow-50 text-gold-700',
  gray: 'bg-gray-50 text-gray-600',
}

export function Badge({ children, variant = 'blue' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  )
}
