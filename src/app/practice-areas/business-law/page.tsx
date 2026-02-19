import { Metadata } from 'next'
import { PageHero } from '@/components/practice/PageHero'
import { ProcessTimeline } from '@/components/practice/ProcessTimeline'
import { FaqAccordion } from '@/components/practice/FaqAccordion'
import { CtaBand } from '@/components/home/CtaBand'

export const metadata: Metadata = {
  title: 'Business Law',
  description: 'Business formation, contracts, and ongoing legal counsel for Delaware and Pennsylvania businesses. Flat fees and monthly retainers available.',
}

const processSteps = [
  { label: 'Business Assessment', description: 'Andre reviews your business structure, contracts, and legal exposure to identify priorities.' },
  { label: 'Entity Formation (if needed)', description: 'LLC or corporation formation filed in DE or PA with proper operating agreements and bylaws.' },
  { label: 'Contract Review & Drafting', description: 'Client agreements, vendor contracts, NDAs, and employment agreements reviewed or drafted from scratch.' },
  { label: 'Ongoing Retainer (optional)', description: 'For clients who need regular legal support, a monthly retainer provides access to Andre for questions, reviews, and filings.' },
  { label: 'Dispute Resolution', description: 'If a dispute arises, Andre handles negotiation, demand letters, and litigation if necessary.' },
]

const faqs = [
  { question: 'Should I form an LLC or a corporation?', answer: 'It depends on your goals. LLCs offer flexibility and pass-through taxation. Corporations are better for raising investor capital. Andre can walk you through the trade-offs during a consult.' },
  { question: 'Why form an LLC in Delaware?', answer: 'Delaware has one of the most business-friendly legal environments in the country — strong privacy protections, a sophisticated Court of Chancery, and no sales tax. Many businesses incorporate here even if they operate elsewhere.' },
  { question: 'Do I need a lawyer to review my contracts?', answer: 'Contract disputes are one of the most common sources of business litigation. A brief review upfront is far less expensive than resolving a dispute later. Andre offers flat-fee contract reviews.' },
  { question: 'How does the monthly retainer work?', answer: 'A monthly retainer gives you a set number of hours of legal access each month — for questions, document reviews, and filings. It is ideal for businesses that need ongoing support without hourly billing surprises.' },
  { question: 'Can DELPALaw help with a business dispute?', answer: 'Yes. Andre handles business disputes including contract breaches, partnership conflicts, and collections matters in both Delaware and Pennsylvania.' },
]

export default function BusinessLawPage() {
  return (
    <>
      <PageHero
        headline="Legal Counsel That Grows With Your Business."
        subhead="Entity formation, contract review, and ongoing retainer support for Delaware and Pennsylvania businesses."
        primaryCta={{ label: 'Book a Business Consult', href: '/contact' }}
        secondaryCta={{ label: 'See Retainer Options', href: '/pay' }}
      />

      {/* Why businesses choose DELPALaw */}
      <section className="py-12 px-4 bg-blue-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Why Businesses Choose DELPALaw</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { heading: 'Flat Fees', body: 'No hourly billing surprises. Know the cost before work begins.' },
              { heading: 'Dual-State Coverage', body: 'Licensed in both DE and PA — one attorney for both states.' },
              { heading: 'Responsive', body: 'Andre answers questions directly. No paralegal gatekeeping.' },
            ].map(item => (
              <div key={item.heading} className="bg-white rounded-lg p-5 border border-gray-200">
                <h3 className="font-semibold text-blue-900 mb-2">{item.heading}</h3>
                <p className="text-sm text-gray-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Business Legal Services</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['LLC Formation', 'Corporation Formation', 'Operating Agreements', 'Contract Drafting', 'Contract Review', 'NDA / Confidentiality', 'Business Disputes', 'Monthly Retainer'].map(item => (
            <div key={item} className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium text-gray-800">
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">How We Work Together</h2>
          <ProcessTimeline steps={processSteps} />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Business Law FAQ</h2>
        <FaqAccordion items={faqs} />
      </section>

      <CtaBand
        heading="Ready to Protect and Grow Your Business?"
        subhead="Book a consult or explore retainer options — transparent pricing, no surprises."
        primaryCta={{ label: 'Book a Business Consult', href: '/contact' }}
        secondaryCta={{ label: 'View Retainer Pricing', href: '/pay' }}
      />
    </>
  )
}
