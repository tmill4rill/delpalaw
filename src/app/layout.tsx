import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { DisclaimerBanner } from '@/components/layout/DisclaimerBanner'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: {
    default: 'DELPALaw — Delaware & Pennsylvania Law Firm',
    template: '%s | DELPALaw',
  },
  description: 'Criminal defense, estate planning, and business law for clients across Delaware and Pennsylvania. Attorney Andre Jerry.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-white text-gray-900`}>
        <a href="#main-content" className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[100] focus-visible:bg-white focus-visible:text-blue-900 focus-visible:px-4 focus-visible:py-2 focus-visible:rounded focus-visible:font-semibold">
          Skip to main content
        </a>
        <DisclaimerBanner />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
