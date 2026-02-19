'use client'
import { useState } from 'react'

interface FaqItem {
  question: string
  answer: string
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <dl className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="border border-gray-200 rounded-lg">
          <dt>
            <button
              className="w-full flex justify-between items-center px-5 py-4 text-left font-semibold text-gray-900 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
              aria-expanded={open === i}
              aria-controls={`faq-answer-${i}`}
              onClick={() => setOpen(open === i ? null : i)}
            >
              {item.question}
              <span aria-hidden="true" className="ml-4 text-blue-700 flex-shrink-0">
                {open === i ? '−' : '+'}
              </span>
            </button>
          </dt>
          <dd
            id={`faq-answer-${i}`}
            hidden={open !== i}
            className="px-5 pb-4 text-gray-600 text-sm"
          >
            {item.answer}
          </dd>
        </div>
      ))}
    </dl>
  )
}
