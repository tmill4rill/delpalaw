import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Attorney Advertising Disclaimer',
  description: 'Attorney advertising disclaimer for DELPALaw, the law practice of Andre Jerry.',
}

const LAST_UPDATED = 'February 19, 2026'

export default function DisclaimerPage() {
  return (
    <article className="py-16 px-4 max-w-3xl mx-auto prose prose-gray max-w-none">
      <h1>Attorney Advertising Disclaimer</h1>
      <p className="text-sm text-gray-500">Last updated: {LAST_UPDATED}</p>

      <p>
        <strong>Attorney Advertising.</strong> The information on this website is for general informational purposes only and does not constitute legal advice. Transmission or receipt of information on this site does not create an attorney-client relationship. Do not act or refrain from acting based on any content on this site without first seeking legal counsel.
      </p>

      <h2>No Attorney-Client Relationship</h2>
      <p>
        Contacting DELPALaw by any means — including completing the online contact form, using the chat assistant, or calling — does not create an attorney-client relationship. An attorney-client relationship is formed only when both you and Andre Jerry have signed a written representation agreement.
      </p>

      <h2>Past Results Do Not Guarantee Future Outcomes</h2>
      <p>
        Any results described on this website, including case outcomes and client testimonials, are based on specific facts and circumstances that are unique to each matter. Past results are not a guarantee, warranty, or prediction of the outcome of any future matter.
      </p>

      <h2>Licensed in Delaware and Pennsylvania</h2>
      <p>
        Andre Jerry is licensed to practice law in the State of Delaware and the Commonwealth of Pennsylvania. References to "DELPALaw" refer to the law practice of Andre Jerry. This site is not intended to solicit clients in jurisdictions where DELPALaw is not licensed to practice.
      </p>

      <h2>Responsible Attorney</h2>
      <p>
        All communications and advertising from DELPALaw are the responsibility of Andre Jerry, Esq. For questions about this disclaimer, <Link href="/contact">contact us</Link>.
      </p>

      <h2>AI Chat Tool Disclosure</h2>
      <p>
        This website uses an AI-powered chat assistant. The AI tool is not an attorney, does not provide legal advice, and does not create an attorney-client relationship. All responses from the AI tool are general information only. For legal advice specific to your situation, consult a licensed attorney.
      </p>

      <hr />
      <div className="text-sm text-gray-500 flex gap-4 flex-wrap">
        <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
        <Link href="/terms" className="hover:underline">Terms of Use</Link>
      </div>
    </article>
  )
}
