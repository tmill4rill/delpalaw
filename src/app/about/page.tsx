import { Metadata } from 'next'
import Link from 'next/link'
import { CtaBand } from '@/components/home/CtaBand'

export const metadata: Metadata = {
  title: 'About Andre Jerry',
  description: 'DELPALaw is the practice of Andre Jerry, a licensed attorney in Delaware and Pennsylvania focused on criminal defense, estate planning, and business law.',
}

const comparisons = [
  {
    label: 'Responsiveness',
    delpa: 'Andre picks up the phone. You get his direct line — not a receptionist.',
    large: 'Associates handle intake. You may not speak with a partner for weeks.',
  },
  {
    label: 'Fees',
    delpa: 'Flat fees for defined services. You know the cost before work begins.',
    large: 'Hourly billing. Costs compound with every email and call.',
  },
  {
    label: 'Attention',
    delpa: 'One attorney. Your matter gets focused, personal attention.',
    large: 'Cases move between attorneys and paralegals. Continuity varies.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 px-4 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          A Lawyer Who Picks Up the Phone
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          DELPALaw exists because legal help shouldn't feel intimidating, inaccessible, or expensive. Andre Jerry built this practice to be the kind of law firm he'd want to call if his family needed help.
        </p>
      </section>

      {/* Story */}
      <section className="py-12 px-4 bg-blue-50">
        <div className="max-w-3xl mx-auto space-y-5 text-gray-700 text-base leading-relaxed">
          <h2 className="text-2xl font-bold text-blue-900">The Practice</h2>
          <p>
            Andre Jerry is a licensed attorney in Delaware and Pennsylvania, focusing on criminal defense, estate planning, and business law. He founded DELPALaw to serve individuals and small business owners who deserve the same quality of legal representation as larger clients — without the overhead and impersonal service of a large firm.
          </p>
          <p>
            Every matter at DELPALaw is handled by Andre directly. There are no associates passing your file. When you call, Andre answers. When you have a question, you get a real answer — not a billable-hour invoice for a brief conversation.
          </p>
          <p>
            DELPALaw serves clients across Delaware and southeastern Pennsylvania, with a focus on Wilmington, Dover, Newark, Philadelphia, and the surrounding counties.
          </p>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-12 px-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Credentials</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'Bar Admission — Delaware', detail: 'Delaware Supreme Court' },
            { label: 'Bar Admission — Pennsylvania', detail: 'Pennsylvania Supreme Court' },
            { label: 'Law School', detail: '[Placeholder — to be updated]' },
            { label: 'Associations', detail: '[Placeholder — to be updated]' },
          ].map(item => (
            <div key={item.label} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
              <p className="text-gray-600 text-sm mt-1">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">DELPALaw vs. a Large Firm</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-3 pr-6 font-semibold text-gray-700 w-1/4"> </th>
                  <th className="text-left py-3 pr-6 font-semibold text-blue-900 w-3/8">DELPALaw</th>
                  <th className="text-left py-3 font-semibold text-gray-500 w-3/8">Large Firm</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map(row => (
                  <tr key={row.label} className="border-b border-gray-200">
                    <td className="py-4 pr-6 font-medium text-gray-700 align-top">{row.label}</td>
                    <td className="py-4 pr-6 text-gray-900 align-top">{row.delpa}</td>
                    <td className="py-4 text-gray-500 align-top">{row.large}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Quote placeholder */}
      <section className="py-12 px-4 max-w-3xl mx-auto">
        <blockquote className="border-l-4 border-gold-600 pl-6 text-xl text-gray-700 italic leading-relaxed">
          "My goal is simple: give every client the kind of legal help that actually changes their situation — and be honest when I can't."
        </blockquote>
        <p className="mt-4 text-sm text-gray-500 pl-6">— Andre Jerry, DELPALaw</p>
      </section>

      <CtaBand
        heading="Ready to Work Together?"
        subhead="Book a free consultation with Andre — no commitment, just a conversation about what you need."
        primaryCta={{ label: 'Book a Free Consult', href: '/contact' }}
        secondaryCta={{ label: 'View Practice Areas', href: '/practice-areas' }}
      />
    </>
  )
}
