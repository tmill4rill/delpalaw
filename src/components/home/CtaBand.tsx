import { Button } from '@/components/ui/Button'

interface CtaBandProps {
  heading: string
  subhead?: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  dark?: boolean
}

export function CtaBand({ heading, subhead, primaryCta, secondaryCta, dark = true }: CtaBandProps) {
  return (
    <section className={`py-16 px-4 ${dark ? 'bg-blue-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-3">{heading}</h2>
        {subhead && (
          <p className={`mb-8 ${dark ? 'text-gray-200' : 'text-gray-600'}`}>{subhead}</p>
        )}
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="urgent" href={primaryCta.href}>{primaryCta.label}</Button>
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
