import Link from 'next/link'

type Variant = 'primary' | 'urgent' | 'secondary'

interface ButtonProps {
  variant: Variant
  href?: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}

const variants: Record<Variant, string> = {
  primary:   'bg-blue-700 text-white hover:bg-blue-900 focus:ring-blue-500',
  urgent:    'bg-gold-700 text-white hover:bg-yellow-800 focus:ring-gold-500',
  secondary: 'bg-transparent border-2 border-blue-700 text-blue-700 hover:bg-blue-50 focus:ring-blue-500',
}

const base = 'inline-flex items-center justify-center rounded-md px-6 py-3 font-semibold text-sm leading-tight focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'

export function Button({ variant, href, onClick, children, className = '', type = 'button', disabled }: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`

  if (href) {
    return <Link href={href} className={classes}>{children}</Link>
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  )
}
