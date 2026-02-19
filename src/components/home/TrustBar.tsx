const trustItems = [
  { icon: '⚖️', label: 'Licensed in DE & PA' },
  { icon: '⭐', label: 'Google Reviews [placeholder]' },
  { icon: '🏛️', label: 'Bar Admissions [placeholder]' },
  { icon: '📍', label: 'Serving Wilmington, Philadelphia + more' },
]

export function TrustBar() {
  return (
    <div className="bg-gray-50 border-t-2 border-gold-500 py-4">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-6 md:gap-10">
        {trustItems.map(item => (
          <div key={item.label} className="flex items-center gap-2 text-sm text-gray-900">
            <span aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
