const steps = [
  {
    number: '1',
    heading: 'Book a consult',
    body: 'Submit a quick intake form or call. Andre will follow up within one business day.',
  },
  {
    number: '2',
    heading: 'Get a clear plan',
    body: "You'll know exactly what to expect — the process, the cost, and the timeline.",
  },
  {
    number: '3',
    heading: 'Move forward with confidence',
    body: 'With a lawyer who answers, advocates, and sees your matter through.',
  },
]

export function HowItWorks() {
  return (
    <section className="py-16 px-4 bg-cream">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">How DELPALaw Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map(step => (
            <div key={step.number} className="text-center">
              <div
                className="w-12 h-12 rounded-full bg-blue-700 text-white font-bold text-xl flex items-center justify-center mx-auto mb-4"
                aria-hidden="true"
              >
                {step.number}
              </div>
              <h3 className="font-semibold text-lg mb-2">{step.heading}</h3>
              <p className="text-gray-600 text-sm">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
