import Link from 'next/link'

const practiceLinks = [
  { href: '/practice-areas/criminal-defense', label: 'Criminal Defense' },
  { href: '/practice-areas/estate-planning', label: 'Estate Planning' },
  { href: '/practice-areas/business-law', label: 'Business Law' },
]

const firmLinks = [
  { href: '/about', label: 'About Andre Jerry' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/faq', label: 'FAQ' },
  { href: '/service-areas', label: 'Service Areas' },
  { href: '/contact', label: 'Contact' },
  { href: '/pay', label: 'Pay Online' },
]

const legalLinks = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Use' },
  { href: '/disclaimer', label: 'Disclaimer' },
]

export function Footer() {
  const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER
  const email = process.env.NEXT_PUBLIC_EMAIL

  return (
    <footer className="bg-blue-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <p className="font-bold text-xl mb-2">DELPALaw</p>
            <p className="text-sm text-gray-200">Delaware + Pennsylvania Law</p>
            <p className="text-sm text-gray-200 mt-1">Andre Jerry, Esq.</p>
            {phone && (
              <p className="text-sm text-gray-200 mt-3">
                <a
                  href={`tel:${phone}`}
                  className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                >
                  {phone}
                </a>
              </p>
            )}
            {email && (
              <p className="text-sm text-gray-200">
                <a
                  href={`mailto:${email}`}
                  className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                >
                  {email}
                </a>
              </p>
            )}
          </div>

          {/* Practice areas */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wide mb-3 text-gold-500">Practice Areas</h3>
            <ul className="space-y-2">
              {practiceLinks.map(l => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-gray-200 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Firm links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wide mb-3 text-gold-500">Firm</h3>
            <ul className="space-y-2">
              {firmLinks.map(l => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-gray-200 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wide mb-3 text-gold-500">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map(l => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-gray-200 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-blue-700 mt-10 pt-6">
          <p className="text-xs text-gray-300 leading-relaxed">
            Attorney Advertising. This site provides general information only. Nothing on this website constitutes legal advice or creates an attorney-client relationship. Results in prior matters do not guarantee similar outcomes. DELPALaw is licensed to practice law in Delaware and Pennsylvania.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            © {new Date().getFullYear()} DELPALaw. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
