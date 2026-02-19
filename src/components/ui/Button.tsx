import Link from 'next/link'

type Variant = 'primary' | 'urgent' | 'secondary'

interface ButtonProps {
  variant: Variant
  href?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  ariaLabel?: string
}

const variants: Record<Variant, string> = {
  primary:   'bg-blue-700 text-white hover:bg-blue-900 focus-visible:ring-blue-500',
  urgent:    'bg-gold-700 text-white hover:bg-gold-900 focus-visible:ring-gold-500',
  secondary: 'bg-transparent border-2 border-blue-700 text-blue-700 hover:bg-blue-50 focus-visible:ring-blue-500',
}

const base = 'inline-flex items-center justify-center rounded-md px-6 py-3 font-semibold text-sm leading-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'

export function Button({ variant, href, onClick, children, className = '', type = 'button', disabled, ariaLabel }: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`

  if (href) {
    if (disabled) {
      return <span className={classes} aria-disabled="true">{children}</span>
    }
    return <Link href={href} className={classes} aria-label={ariaLabel}>{children}</Link>
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled} aria-label={ariaLabel}>
      {children}
    </button>
  )
}
