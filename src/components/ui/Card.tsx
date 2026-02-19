interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  dark?: boolean
}

export function Card({ children, className = '', hover = false, dark = false }: CardProps) {
  const classes = [
    dark
      ? 'bg-gray-900 border border-gray-700 rounded-lg p-6 shadow-sm text-white'
      : 'bg-white border border-gray-200 rounded-lg p-6 shadow-sm',
    hover ? 'hover:shadow-md transition-shadow cursor-pointer' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      {children}
    </div>
  )
}
