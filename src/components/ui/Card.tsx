interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className = '', hover = false }: CardProps) {
  const classes = [
    'bg-white border border-gray-200 rounded-lg p-6 shadow-sm',
    hover ? 'hover:shadow-md transition-shadow cursor-pointer' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      {children}
    </div>
  )
}
