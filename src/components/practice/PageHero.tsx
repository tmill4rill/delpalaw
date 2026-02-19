import { Button } from '@/components/ui/Button'

interface PageHeroProps {
  headline: string
  subhead: string
  primaryCta: { label: string; href: string; variant?: 'primary' | 'urgent' }
  secondaryCta?: { label: string; href: string }
  dark?: boolean
}

export function PageHero({ headline, subhead, primaryCta, secondaryCta, dark = true }: PageHeroProps) {
  return (
    <section className={`py-16 px-4 ${dark ? 'bg-blue-900 text-white' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">{headline}</h1>
        <p className={`text-lg mb-8 ${dark ? 'text-gray-200' : 'text-gray-600'}`}>{subhead}</p>
        <div className="flex flex-wrap gap-4">
          <Button variant={primaryCta.variant ?? 'urgent'} href={primaryCta.href}>
            {primaryCta.label}
          </Button>
          {secondaryCta && (
            <Button
              variant="secondary"
              href={secondaryCta.href}
              className={dark ? 'border-white text-white hover:bg-blue-700' : ''}
            >
              {secondaryCta.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
