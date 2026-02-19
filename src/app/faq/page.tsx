import { Metadata } from 'next'
import Link from 'next/link'
import { FaqAccordion } from '@/components/practice/FaqAccordion'
import { CtaBand } from '@/components/home/CtaBand'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Common questions about working with DELPALaw — fees, process, consultations, and practice areas.',
}

const faqs = [
  {
    question: 'How do I know if I need a lawyer?',
    answer: 'If you are facing criminal charges, need to plan for your family\'s future, or are dealing with a business legal issue, a lawyer can make a real difference. When in doubt, a free consultation costs nothing and helps you understand your options.',
  },
  {
    question: 'How much does it cost to hire DELPALaw?',
    answer: 'DELPALaw offers flat fees for most defined services — you know the cost before work begins. For complex or ongoing matters, Andre will discuss a retainer or payment structure at your consult. There are no surprise invoices.',
  },
  {
    question: 'What happens during a consultation?',
    answer: 'Andre will spend time understanding your situation, explain your legal options in plain language, and give you a clear sense of what he can do for you and what it will cost. There\'s no pressure and no commitment.',
  },
  {
    question: 'Do you offer payment plans?',
    answer: 'In some circumstances, yes. Ask Andre directly during your consult — he understands that legal needs often come at difficult financial moments.',
  },
  {
    question: 'Are you licensed in both Delaware and Pennsylvania?',
    answer: 'Yes. Andre Jerry is licensed to practice in both Delaware and Pennsylvania. He regularly handles matters in both states.',
  },
  {
    question: 'How quickly can I get an appointment?',
    answer: 'In most cases, you can book a consultation within a few business days. For urgent matters — especially criminal defense — call directly. Andre makes time for time-sensitive situations.',
  },
  {
    question: 'What information should I bring to my first consult?',
    answer: 'Bring any documents related to your matter: court papers, contracts, notices, or correspondence. If you don\'t have anything yet, that\'s fine — Andre can work from a description of your situation.',
  },
  {
    question: 'Can I handle my legal matter remotely?',
    answer: 'Yes. DELPALaw offers remote consultations and can handle most matters by phone, video, and email. In-person meetings are available and sometimes preferable for document signing.',
  },
  {
    question: 'What areas of law does DELPALaw handle?',
    answer: 'DELPALaw focuses on criminal defense, estate planning, and business law for clients in Delaware and Pennsylvania. Andre does not practice family law, immigration, personal injury, or real estate transactions.',
  },
  {
    question: 'How do I pay?',
    answer: 'DELPALaw accepts payment online via Stripe — flat fee, retainer, or monthly business counsel plan. You can pay at delpalaw.com/pay. Checks are also accepted.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
}

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="py-16 px-4 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-600 text-lg mb-12">
          Common questions about working with DELPALaw. If you don't see your question here, ask us directly.
        </p>

        <FaqAccordion items={faqs} id="general-faq" />

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-4">Looking for practice-area FAQs?</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/practice-areas/criminal-defense"
              className="text-sm text-blue-700 font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
            >
              Criminal Defense FAQ →
            </Link>
            <Link
              href="/practice-areas/estate-planning"
              className="text-sm text-blue-700 font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
            >
              Estate Planning FAQ →
            </Link>
            <Link
              href="/practice-areas/business-law"
              className="text-sm text-blue-700 font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
            >
              Business Law FAQ →
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        heading="Still Have Questions?"
        subhead="Book a free consultation with Andre. He'll answer anything."
        primaryCta={{ label: 'Book a Free Consult', href: '/contact' }}
      />
    </>
  )
}
