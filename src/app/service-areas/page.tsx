import { Metadata } from 'next'
import Link from 'next/link'
import { CtaBand } from '@/components/home/CtaBand'

export const metadata: Metadata = {
  title: 'Service Areas',
  description: 'DELPALaw serves clients across Delaware and southeastern Pennsylvania, with remote consultations available statewide.',
}

const delawareCities = [
  { city: 'Wilmington', note: 'Primary office area' },
  { city: 'Dover', note: 'State capital — criminal defense and business matters' },
  { city: 'Newark', note: 'University of Delaware area' },
  { city: 'Middletown', note: 'New Castle County' },
  { city: 'Smyrna', note: 'Kent County' },
  { city: 'Milford', note: 'Kent and Sussex counties' },
  { city: 'Georgetown', note: 'Sussex County seat' },
  { city: 'Lewes', note: 'Coastal Delaware' },
]

const pennsylvaniaCities = [
  { city: 'Philadelphia', note: 'Court appearances and business matters' },
  { city: 'Chester County', note: 'Southeastern PA' },
  { city: 'Delaware County', note: 'Southeastern PA' },
  { city: 'Montgomery County', note: 'Suburban Philadelphia' },
  { city: 'Bucks County', note: 'Southeastern PA' },
  { city: 'Lancaster County', note: 'South central PA' },
]

export default function ServiceAreasPage() {
  return (
    <>
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Service Areas</h1>
        <p className="text-xl text-gray-600 mb-12">
          DELPALaw serves clients across Delaware and Pennsylvania. Remote consultations are available anywhere in both states.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Delaware */}
          <div>
            <h2 className="text-xl font-bold text-blue-900 mb-5">Delaware</h2>
            <ul className="space-y-3">
              {delawareCities.map(item => (
                <li key={item.city} className="flex gap-3 items-start">
                  <span className="mt-1 w-2 h-2 rounded-full bg-gold-600 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <span className="font-medium text-gray-900">{item.city}</span>
                    <span className="text-gray-500 text-sm ml-2">— {item.note}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Pennsylvania */}
          <div>
            <h2 className="text-xl font-bold text-blue-900 mb-5">Pennsylvania</h2>
            <ul className="space-y-3">
              {pennsylvaniaCities.map(item => (
                <li key={item.city} className="flex gap-3 items-start">
                  <span className="mt-1 w-2 h-2 rounded-full bg-gold-600 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <span className="font-medium text-gray-900">{item.city}</span>
                    <span className="text-gray-500 text-sm ml-2">— {item.note}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Remote callout */}
      <section className="py-10 px-4 bg-cream">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-blue-900 mb-3">Can't Travel? No Problem.</h2>
          <p className="text-gray-700 mb-6">
            DELPALaw offers remote consultations by phone and video for clients anywhere in Delaware and Pennsylvania. Most matters can be handled entirely online — from intake to document signing.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md px-6 py-3 font-semibold text-sm bg-blue-700 text-white hover:bg-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-colors"
          >
            Book a Remote Consult
          </Link>
        </div>
      </section>

      <CtaBand
        heading="Wherever You Are in DE or PA"
        subhead="Andre can help. Book a consultation today."
        primaryCta={{ label: 'Book a Free Consult', href: '/contact' }}
        secondaryCta={{ label: 'View Practice Areas', href: '/practice-areas' }}
      />
    </>
  )
}
