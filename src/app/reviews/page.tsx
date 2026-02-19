import { Metadata } from 'next'
import Link from 'next/link'
import { CtaBand } from '@/components/home/CtaBand'

export const metadata: Metadata = {
  title: 'Client Reviews',
  description: 'Read what DELPALaw clients say about working with attorney Andre Jerry in Delaware and Pennsylvania.',
}

const testimonials = [
  {
    quote: 'Andre responded the same day I called and had a clear plan for my case by the end of the week. I never felt like I was in the dark.',
    name: 'Client — Criminal Defense',
    area: 'Delaware',
  },
  {
    quote: 'We finally got our estate plan done after putting it off for years. Andre made the whole process straightforward and less scary than we expected.',
    name: 'Client — Estate Planning',
    area: 'Pennsylvania',
  },
  {
    quote: 'Our operating agreement was a mess. Andre fixed it in plain language and explained every section. Worth every dollar.',
    name: 'Client — Business Law',
    area: 'Delaware',
  },
]

const outcomes = [
  { label: 'DUI — First Offense', result: 'Charges reduced. No license suspension.' },
  { label: 'Drug Possession', result: 'Diversion program. No conviction on record.' },
  { label: 'Estate Plan — Family with Minor Children', result: 'Will, trust, and guardianship designation completed in two weeks.' },
  { label: 'LLC Operating Agreement', result: 'Drafted and executed for a 3-partner business in under 10 days.' },
]

export default function ReviewsPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 px-4 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          What DELPALaw Clients Are Saying
        </h1>
        <p className="text-gray-600 text-lg">
          Real feedback from clients across Delaware and Pennsylvania.
        </p>
      </section>

      {/* Google aggregate placeholder */}
      <section className="py-6 px-4 bg-cream">
        <div className="max-w-md mx-auto text-center">
          <p className="text-4xl font-bold text-blue-900">5.0</p>
          <p className="text-yellow-600 text-2xl" aria-hidden="true">★★★★★</p>
          <p className="text-sm text-gray-600 mt-1">Google rating — [review count placeholder]</p>
          <a
            href="https://g.page/r/[google-place-id]/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-sm text-blue-700 font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
          >
            Leave a Google Review →
          </a>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Client Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <figure key={i} className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col">
              <blockquote className="text-gray-700 text-sm leading-relaxed flex-1">
                <span aria-hidden="true">&ldquo;</span>{t.quote}<span aria-hidden="true">&rdquo;</span>
              </blockquote>
              <figcaption className="mt-4 text-xs text-gray-500">
                <span className="font-medium text-gray-700">{t.name}</span>
                <span className="mx-1">·</span>
                {t.area}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Outcome summaries */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Representative Outcomes</h2>
          <p className="text-sm text-gray-500 mb-8">
            Past results do not guarantee future outcomes. Every matter is unique. These summaries are provided for general information only.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {outcomes.map(o => (
              <div key={o.label} className="bg-white border border-gray-200 rounded-lg p-5">
                <p className="font-semibold text-gray-900 text-sm">{o.label}</p>
                <p className="text-gray-600 text-sm mt-1">{o.result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        heading="Ready to Get the Help You Need?"
        subhead="Book a free consult with Andre today."
        primaryCta={{ label: 'Book a Free Consult', href: '/contact' }}
      />
    </>
  )
}
