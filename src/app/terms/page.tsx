import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'DELPALaw terms of use — conditions for using delpalaw.com.',
}

const LAST_UPDATED = 'February 19, 2026'

export default function TermsPage() {
  return (
    <article className="py-16 px-4 max-w-3xl mx-auto prose prose-gray max-w-none">
      <h1>Terms of Use</h1>
      <p className="text-sm text-gray-500">Last updated: {LAST_UPDATED}</p>

      <h2>Acceptance of Terms</h2>
      <p>
        By using delpalaw.com, you agree to these terms. If you do not agree, please do not use this site.
      </p>

      <h2>No Attorney-Client Relationship</h2>
      <p>
        Using this website, submitting a contact form, or interacting with the chat assistant does not create an attorney-client relationship with DELPALaw or Andre Jerry. An attorney-client relationship is established only through a signed representation agreement. Do not share confidential information through this site unless a representation agreement is in place.
      </p>

      <h2>Not Legal Advice</h2>
      <p>
        The information on this website is for general informational purposes only. It is not legal advice and should not be relied upon as such. Laws vary by jurisdiction and change over time. Consult a licensed attorney for advice specific to your situation.
      </p>

      <h2>AI Chat Tool</h2>
      <p>
        This site uses an AI-powered chat tool to answer general questions. The AI tool is not an attorney. Its responses are not legal advice. It does not create an attorney-client relationship. Do not submit confidential case details through the chat.
      </p>

      <h2>Accuracy of Information</h2>
      <p>
        DELPALaw makes reasonable efforts to keep information on this site current and accurate, but makes no warranties about the completeness, accuracy, or fitness for a particular purpose of any content. Legal information can change quickly — verify any information with a licensed attorney.
      </p>

      <h2>Links to Third-Party Sites</h2>
      <p>
        This site may link to third-party websites. DELPALaw does not control those sites and is not responsible for their content, privacy practices, or accuracy. Links do not constitute endorsement.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        All content on this site is the property of DELPALaw or its licensors. You may not reproduce, distribute, or create derivative works from site content without written permission.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, DELPALaw and Andre Jerry are not liable for any direct, indirect, incidental, or consequential damages arising from your use of this site or reliance on its content.
      </p>

      <h2>Governing Law</h2>
      <p>
        These terms are governed by the laws of the State of Delaware without regard to conflicts of law principles.
      </p>

      <h2>Changes to These Terms</h2>
      <p>
        We may update these terms from time to time. The most current version will always be posted on this page with the date of last update.
      </p>

      <h2>Contact</h2>
      <p>
        Questions? <Link href="/contact">Contact us</Link>.
      </p>

      <hr />
      <div className="text-sm text-gray-500 flex gap-4 flex-wrap">
        <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
        <Link href="/disclaimer" className="hover:underline">Disclaimer</Link>
      </div>
    </article>
  )
}
