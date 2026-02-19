interface TimelineStep {
  label: string
  description: string
}

export function ProcessTimeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <ol className="relative border-l-2 border-blue-700 ml-4 space-y-8" aria-label="Process steps">
      {steps.map((step, i) => (
        <li key={i} className="relative pl-6">
          <div
            className="absolute -left-2.5 w-5 h-5 rounded-full bg-blue-700 flex items-center justify-center"
            aria-hidden="true"
          >
            <span className="text-white text-xs font-bold">{i + 1}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">{step.label}</h3>
          <p className="text-sm text-gray-600">{step.description}</p>
        </li>
      ))}
    </ol>
  )
}
