import { Button } from '@/components/ui/Button'

const PHONE = process.env.NEXT_PUBLIC_PHONE_NUMBER || '[Phone TBD]'

export function Hero() {
  return (
    <section className="bg-blue-900 text-white py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          Serious Legal Matters Deserve Serious Counsel.
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
          Criminal defense, estate planning, and business law for clients
          across Delaware and Pennsylvania.
        </p>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="urgent" href="/contact">Book a Free Consult</Button>
          <a
            href={`tel:${PHONE}`}
            aria-label={`Call now: ${PHONE}`}
            className="text-gold-500 font-semibold text-sm flex items-center underline hover:text-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded"
          >
            Call Now: {PHONE}
          </a>
        </div>
      </div>
    </section>
  )
}
