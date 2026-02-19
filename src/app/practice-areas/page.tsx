import { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/practice/PageHero'
import { Card } from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'Practice Areas',
  description: 'Criminal defense, estate planning, and business law for Delaware and Pennsylvania clients.',
}

const areas = [
  {
    heading: 'Criminal Defense',
    href: '/practice-areas/criminal-defense',
    description: 'From DUI to serious felonies — immediate representation for defendants in DE and PA.',
    services: ['DUI / Drug Offenses', 'Assault & Theft', 'Expungement', 'White Collar'],
  },
  {
    heading: 'Estate Planning',
    href: '/practice-areas/estate-planning',
    description: 'Wills, trusts, and powers of attorney — in plain language, without the jargon.',
    services: ['Wills & Living Wills', 'Trusts', 'Powers of Attorney', 'Guardianship'],
  },
  {
    heading: 'Business Law',
    href: '/practice-areas/business-law',
    description: 'Formation, contracts, disputes, and ongoing retainer counsel for DE and PA businesses.',
    services: ['LLC / Corp Formation', 'Contract Review', 'Business Disputes', 'Monthly Retainer'],
  },
]

export default function PracticeAreasPage() {
  return (
    <>
      <PageHero
        headline="Three Practice Areas. One Accountable Attorney."
        subhead="Whether you're facing a charge, protecting your family's future, or running a business — DELPALaw is ready."
        primaryCta={{ label: 'Book a Consult', href: '/contact' }}
      />
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {areas.map(area => (
            <Card key={area.href} dark>
              <h2 className="text-xl font-bold mb-2">{area.heading}</h2>
              <p className="text-gray-300 text-sm mb-4">{area.description}</p>
              <ul className="space-y-1 mb-6">
                {area.services.map(s => (
                  <li key={s} className="text-sm text-gray-200 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0" aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
              <Link
                href={area.href}
                aria-label={`Learn more about ${area.heading}`}
                className="text-gold-300 font-semibold text-sm hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded"
              >
                Learn more →
              </Link>
            </Card>
          ))}
        </div>
        <p className="text-center mt-10 text-gray-600 text-sm">
          Not sure where to start?{' '}
          <Link href="/contact" className="text-blue-700 font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
            Contact us and we'll point you in the right direction.
          </Link>
        </p>
      </section>
    </>
  )
}
