import Link from 'next/link'
import { Card } from '@/components/ui/Card'

const cards = [
  {
    label: 'I need help now',
    heading: 'Criminal Defense',
    description: 'Facing charges or an arrest? Time is critical. Get an experienced attorney on your side today.',
    href: '/practice-areas/criminal-defense',
    urgency: true,
  },
  {
    label: "I'm planning for the future",
    heading: 'Estate Planning',
    description: 'Protect your family and your assets with a clear, simple estate plan.',
    href: '/practice-areas/estate-planning',
    urgency: false,
  },
  {
    label: 'I need ongoing business counsel',
    heading: 'Business Law',
    description: 'Legal support for contracts, formations, and disputes — on a retainer that makes sense.',
    href: '/practice-areas/business-law',
    urgency: false,
  },
]

export function TriageCards() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2">What Brings You Here Today?</h2>
        <p className="text-gray-600 text-center mb-10">Choose your situation to find the right help.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map(card => (
            <Link
              key={card.href}
              href={card.href}
              aria-label={card.heading}
              className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
            >
              <Card hover className="h-full flex flex-col">
                <span className={`text-xs font-semibold uppercase tracking-wide mb-2 ${card.urgency ? 'text-gold-700' : 'text-blue-700'}`}>
                  {card.label}
                </span>
                <h3 className="text-xl font-bold mb-3">{card.heading}</h3>
                <p className="text-gray-600 text-sm flex-1">{card.description}</p>
                <span className="mt-4 text-blue-700 font-semibold text-sm group-hover:underline" aria-hidden="true">
                  Learn more →
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
