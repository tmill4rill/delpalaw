import Link from 'next/link'

const placeholderReviews = [
  { name: 'Client Name', text: '[Review placeholder — to be replaced with real Google reviews]', rating: 5 },
  { name: 'Client Name', text: '[Review placeholder — to be replaced with real Google reviews]', rating: 5 },
  { name: 'Client Name', text: '[Review placeholder — to be replaced with real Google reviews]', rating: 5 },
]

export function ReviewsPreview() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2">What DELPALaw Clients Are Saying</h2>
        <p className="text-gray-600 text-center mb-10">
          <span aria-hidden="true">⭐⭐⭐⭐⭐</span>
          {' '}— [Google review aggregate placeholder]
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {placeholderReviews.map((review, i) => (
            <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <p className="text-yellow-500 mb-2" aria-label={`${review.rating} stars`}>
                {'★'.repeat(review.rating)}
              </p>
              <p className="text-sm text-gray-700 italic mb-3">"{review.text}"</p>
              <p className="text-xs font-semibold text-gray-900">— {review.name}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/reviews"
            className="text-blue-700 font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
          >
            See all reviews →
          </Link>
        </div>
      </div>
    </section>
  )
}
