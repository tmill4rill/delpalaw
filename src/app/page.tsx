import { Hero } from '@/components/home/Hero'
import { TrustBar } from '@/components/home/TrustBar'
import { TriageCards } from '@/components/home/TriageCards'
import { HowItWorks } from '@/components/home/HowItWorks'
import { ReviewsPreview } from '@/components/home/ReviewsPreview'
import { ServiceAreasCallout } from '@/components/home/ServiceAreasCallout'
import { CtaBand } from '@/components/home/CtaBand'

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <TriageCards />
      <HowItWorks />
      <ReviewsPreview />
      <ServiceAreasCallout />
      <CtaBand
        heading="Ready to Get Started?"
        subhead="Book a consult or pay an existing invoice — all online."
        primaryCta={{ label: 'Book a Free Consult', href: '/contact' }}
        secondaryCta={{ label: 'Pay an Invoice', href: '/pay' }}
      />
    </>
  )
}
