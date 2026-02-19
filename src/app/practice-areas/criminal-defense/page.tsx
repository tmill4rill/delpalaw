import { Metadata } from 'next'
import { PageHero } from '@/components/practice/PageHero'
import { ProcessTimeline } from '@/components/practice/ProcessTimeline'
import { FaqAccordion } from '@/components/practice/FaqAccordion'
import { CtaBand } from '@/components/home/CtaBand'

export const metadata: Metadata = {
  title: 'Criminal Defense',
  description: 'Experienced criminal defense attorney in Delaware and Pennsylvania. DUI, drug offenses, assault, expungement. Call now.',
}

const processSteps = [
  { label: 'Arrest / Charge', description: 'You are charged. This is when legal representation matters most.' },
  { label: 'Arraignment', description: 'You enter a plea. Andre advises on the best approach before this hearing.' },
  { label: 'Discovery', description: 'Both sides exchange evidence. Andre reviews everything to build your defense.' },
  { label: 'Negotiation / Motions', description: 'Many cases resolve here through plea negotiations or suppression motions.' },
  { label: 'Trial (if needed)', description: 'If a fair resolution is not possible, Andre takes your case to trial.' },
  { label: 'Resolution', description: 'Sentencing, acquittal, or dismissal — Andre guides you through every outcome.' },
]

const faqs = [
  { question: 'What should I do if I am arrested?', answer: 'Exercise your right to remain silent. Do not answer questions without an attorney present. Call DELPALaw as soon as possible.' },
  { question: 'How quickly can I reach Andre after an arrest?', answer: 'Andre is available for emergency consultations. Call the office directly — do not wait until business hours for an urgent situation.' },
  { question: 'How much does criminal defense cost in Delaware or Pennsylvania?', answer: 'Fees are typically flat-rate and depend on the charges and complexity. Andre will give you a clear quote during your consult — no hidden fees.' },
  { question: 'Can I get an expungement in Delaware or Pennsylvania?', answer: 'Expungement eligibility depends on the offense, outcome, and time elapsed. Many misdemeanors and dismissed charges qualify. Ask Andre during your consult.' },
  { question: 'What is the difference between a misdemeanor and a felony?', answer: 'Misdemeanors are less serious offenses typically punishable by up to one year in jail. Felonies carry heavier penalties including potential prison time. Both benefit from early legal representation.' },
]

const PHONE = process.env.NEXT_PUBLIC_PHONE_NUMBER || null

export default function CriminalDefensePage() {
  return (
    <>
      <PageHero
        headline="Charged With a Crime in Delaware or Pennsylvania?"
        subhead="Every hour matters. Get an experienced criminal defense attorney on your side — today."
        primaryCta={
          PHONE
            ? { label: `Call Now: ${PHONE}`, href: `tel:${PHONE}` }
            : { label: 'Book Emergency Consult', href: '/contact' }
        }
        secondaryCta={
          PHONE
            ? { label: 'Book Emergency Consult', href: '/contact' }
            : undefined
        }
      />

      {/* What to do right now */}
      <section className="py-12 px-4 bg-gold-50 border-l-4 border-gold-700">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">What to Do Right Now</h2>
          <ol className="space-y-2 text-sm text-gray-800">
            <li className="flex gap-3"><span className="font-bold text-gold-700">1.</span> Stay calm. Do not resist or argue.</li>
            <li className="flex gap-3"><span className="font-bold text-gold-700">2.</span> Exercise your right to remain silent — do not answer questions.</li>
            <li className="flex gap-3"><span className="font-bold text-gold-700">3.</span> Do not consent to a search of your person, car, or home.</li>
            <li className="flex gap-3"><span className="font-bold text-gold-700">4.</span> Ask for an attorney immediately and do not speak until one is present.</li>
            <li className="flex gap-3"><span className="font-bold text-gold-700">5.</span> Call DELPALaw as soon as you are able.</li>
          </ol>
        </div>
      </section>

      {/* Why choose DELPALaw for your defense */}
      <section className="py-12 px-4 bg-cream">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Why Choose DELPALaw for Your Defense</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { heading: 'Available When It Matters', body: 'Andre takes emergency calls — not just 9-to-5. When you are charged, hours count.' },
              { heading: 'Flat-Rate Fees', body: 'Know the cost before work begins. No hourly billing surprises on top of an already stressful situation.' },
              { heading: 'Dual-State Coverage', body: 'Licensed in both Delaware and Pennsylvania — one attorney who knows both jurisdictions.' },
            ].map(item => (
              <div key={item.heading} className="bg-white rounded-lg p-5 border border-gray-200">
                <h3 className="font-semibold text-blue-900 mb-2">{item.heading}</h3>
                <p className="text-sm text-gray-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Charges we handle */}
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Charges We Handle</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {['DUI / DWI', 'Drug Offenses', 'Assault & Battery', 'Theft & Robbery', 'White Collar Crime', 'Expungement'].map(charge => (
            <div key={charge} className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium text-gray-800">
              {charge}
            </div>
          ))}
        </div>
      </section>

      {/* Process timeline */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">The Defense Process</h2>
          <ProcessTimeline steps={processSteps} />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Criminal Defense FAQ</h2>
        <FaqAccordion items={faqs} id="criminal-defense-faq" />
      </section>

      <CtaBand
        heading="Don't Wait. Your Defense Starts Now."
        subhead="Call or book an emergency consult — available when it matters most."
        primaryCta={{ label: 'Book Emergency Consult', href: '/contact' }}
        secondaryCta={PHONE ? { label: `Call: ${PHONE}`, href: `tel:${PHONE}` } : undefined}
      />
    </>
  )
}
