import { Metadata } from 'next'
import { PageHero } from '@/components/practice/PageHero'
import { ProcessTimeline } from '@/components/practice/ProcessTimeline'
import { FaqAccordion } from '@/components/practice/FaqAccordion'
import { CtaBand } from '@/components/home/CtaBand'

export const metadata: Metadata = {
  title: 'Estate Planning',
  description: 'Wills, trusts, and powers of attorney for Delaware and Pennsylvania families. Clear, affordable, and done right.',
}

const processSteps = [
  { label: 'Initial Consult', description: 'Andre learns about your family, assets, and goals. No forms, no jargon — just a conversation.' },
  { label: 'Plan Design', description: 'Andre recommends the right documents for your situation — will, trust, POA, or a combination.' },
  { label: 'Document Drafting', description: 'Your documents are prepared in plain English and reviewed with you before signing.' },
  { label: 'Signing & Execution', description: 'Documents are signed with the proper witnesses and notarization required by DE or PA law.' },
  { label: 'Secure Storage Guidance', description: 'Andre advises on where to keep originals and how to inform your family members.' },
]

const faqs = [
  { question: 'Do I really need a will?', answer: 'Yes. Without a will, state law decides who inherits your assets — which may not reflect your wishes. A simple will also designates a guardian for minor children.' },
  { question: 'What is the difference between a will and a trust?', answer: 'A will takes effect after death and goes through probate court. A trust can take effect immediately and avoids probate, which is faster and more private. Andre can advise which is right for your situation.' },
  { question: 'How much does estate planning cost in Delaware or Pennsylvania?', answer: 'DELPALaw offers flat-fee estate planning so you know the cost upfront. Basic will packages start at competitive rates — ask for a quote during your consult.' },
  { question: 'What is a power of attorney?', answer: 'A power of attorney authorizes someone you trust to make financial or healthcare decisions on your behalf if you become incapacitated. Without one, a court may need to appoint a guardian.' },
  { question: 'Can I update my estate plan?', answer: 'Yes, and you should — especially after major life events like marriage, divorce, the birth of a child, or significant changes in assets. Andre offers update consultations.' },
]

export default function EstatePlanningPage() {
  return (
    <>
      <PageHero
        headline="Protect Your Family. Protect Your Legacy."
        subhead="Estate planning in plain language — wills, trusts, and powers of attorney for Delaware and Pennsylvania families."
        primaryCta={{ label: 'Book a Planning Consult', href: '/contact' }}
      />

      {/* Why plan now */}
      <section className="py-12 px-4 bg-blue-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Why Plan Now?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { heading: 'Control', body: 'Decide who inherits your assets — not the state.' },
              { heading: 'Protection', body: 'Name a guardian for your children and protect them.' },
              { heading: 'Peace of Mind', body: 'Know your family is cared for no matter what happens.' },
            ].map(item => (
              <div key={item.heading} className="bg-white rounded-lg p-5 border border-gray-200">
                <h3 className="font-semibold text-blue-900 mb-2">{item.heading}</h3>
                <p className="text-sm text-gray-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we offer */}
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">What We Offer</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Last Will & Testament', 'Living Will', 'Revocable Trust', 'Power of Attorney', 'Healthcare Proxy', 'Guardianship Designation', 'Trust Administration', 'Probate Assistance'].map(item => (
            <div key={item} className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium text-gray-800">
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Process timeline */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">The Estate Planning Process</h2>
          <ProcessTimeline steps={processSteps} />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Estate Planning FAQ</h2>
        <FaqAccordion items={faqs} id="estate-planning-faq" />
      </section>

      <CtaBand
        heading="Start Your Estate Plan Today."
        subhead="A one-hour consult is all it takes to protect everything you've built."
        primaryCta={{ label: 'Book a Planning Consult', href: '/contact' }}
        secondaryCta={{ label: 'View Pricing', href: '/pay' }}
      />
    </>
  )
}
