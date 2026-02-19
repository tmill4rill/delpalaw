import Link from 'next/link'

const areas = [
  'Wilmington, DE',
  'Dover, DE',
  'Newark, DE',
  'Philadelphia, PA',
  'Chester County, PA',
  'Delaware County, PA',
  'Montgomery County, PA',
]

export function ServiceAreasCallout() {
  return (
    <section className="py-12 px-4 bg-blue-50">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-3 text-blue-900">Serving Delaware &amp; Pennsylvania</h2>
        <p className="text-gray-600 mb-6 text-sm">
          DELPALaw represents clients across both states — in person and remotely.
        </p>
        <ul className="flex flex-wrap justify-center gap-3 mb-6" aria-label="Service areas">
          {areas.map(area => (
            <li key={area} className="bg-white border border-gray-200 rounded-full px-4 py-1 text-sm text-gray-700">
              {area}
            </li>
          ))}
        </ul>
        <Link
          href="/service-areas"
          className="text-blue-700 font-semibold text-sm hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
        >
          View all service areas →
        </Link>
      </div>
    </section>
  )
}
