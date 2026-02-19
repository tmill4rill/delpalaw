import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'DELPALaw privacy policy — how we collect, use, and protect your information.',
}

const LAST_UPDATED = 'February 19, 2026'

export default function PrivacyPage() {
  return (
    <article className="py-16 px-4 max-w-3xl mx-auto prose prose-gray max-w-none">
      <h1>Privacy Policy</h1>
      <p className="text-sm text-gray-500">Last updated: {LAST_UPDATED}</p>

      <h2>Who We Are</h2>
      <p>
        DELPALaw is the law practice of Andre Jerry, licensed in Delaware and Pennsylvania. This privacy policy describes how we collect and handle information on delpalaw.com.
      </p>

      <h2>Information We Collect</h2>
      <p>We collect information you provide directly, including:</p>
      <ul>
        <li>Contact form submissions (name, email, phone, description of your legal matter)</li>
        <li>Payment information processed through Stripe (we do not store card data)</li>
        <li>Chat widget messages</li>
      </ul>
      <p>We also collect standard server logs (IP address, browser type, pages visited) through our hosting provider.</p>

      <h2>How We Use Your Information</h2>
      <p>Information you provide through the contact form or intake process is used to:</p>
      <ul>
        <li>Respond to your inquiry</li>
        <li>Schedule a consultation</li>
        <li>Communicate about your legal matter if representation is established</li>
      </ul>
      <p>We do not sell your information to third parties. We do not use your information for marketing unless you specifically request updates.</p>

      <h2>Third-Party Services</h2>

      <h3>Stripe</h3>
      <p>
        Online payments are processed through Stripe. When you pay online, your payment information goes directly to Stripe — DELPALaw does not receive or store card numbers. Stripe&apos;s privacy policy governs data collected during payment processing.
      </p>

      <h3>AI Chat Feature</h3>
      <p>
        Our website uses an AI assistant powered by Anthropic&apos;s Claude API. When you interact with the chat widget, your messages are sent to Anthropic&apos;s API for processing. DELPALaw does not permanently store chat transcripts. Anthropic&apos;s handling of API request data is governed by Anthropic&apos;s privacy policy and terms of service.
      </p>
      <p>
        <strong>Do not submit sensitive personal information</strong> — Social Security numbers, financial account details, or confidential case information — through the chat widget. Use the secure contact form or call Andre directly for sensitive matters.
      </p>

      <h3>Speech-to-Text</h3>
      <p>
        The speech-to-text feature on our contact form uses your browser&apos;s built-in speech recognition. No audio is recorded or stored by DELPALaw. Audio is processed locally in your browser.
      </p>

      <h2>Cookies</h2>
      <p>
        This site uses minimal cookies required for normal site operation. We do not use advertising or tracking cookies. No third-party analytics scripts are deployed.
      </p>

      <h2>Data Retention</h2>
      <p>
        Contact form submissions are retained for as long as necessary to respond to your inquiry and, if representation is established, for the duration of the attorney-client relationship plus the applicable records retention period under bar rules.
      </p>

      <h2>Your Rights</h2>
      <p>
        You may request access to, correction of, or deletion of personal information we hold about you by contacting us at the email below. Delaware and Pennsylvania residents may have additional rights under applicable state law.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this privacy policy? <Link href="/contact">Contact us</Link>.
      </p>

      <hr />
      <div className="text-sm text-gray-500 flex gap-4 flex-wrap">
        <Link href="/terms" className="hover:underline">Terms of Use</Link>
        <Link href="/disclaimer" className="hover:underline">Disclaimer</Link>
      </div>
    </article>
  )
}
