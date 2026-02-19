'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { SpeechInput } from './SpeechInput'

interface FormState {
  name: string
  phone: string
  email: string
  practiceArea: string
  description: string
  contactMethod: 'email' | 'phone'
  bestTime: string
}

interface FormErrors {
  name?: string
  email?: string
  practiceArea?: string
}

const INITIAL_STATE: FormState = {
  name: '',
  phone: '',
  email: '',
  practiceArea: '',
  description: '',
  contactMethod: 'email',
  bestTime: 'no-preference',
}

const PHONE = process.env.NEXT_PUBLIC_PHONE_NUMBER || null

export function IntakeForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function validate(): FormErrors {
    const errs: FormErrors = {}
    if (!form.name.trim()) errs.name = 'Name is required.'
    if (!form.email.trim()) {
      errs.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Enter a valid email address.'
    }
    if (!form.practiceArea) errs.practiceArea = 'Please select a practice area.'
    return errs
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    setSubmitting(true)
    // TODO: Wire to API route or form service (Formspree, Resend)
    await new Promise(r => setTimeout(r, 500))
    setSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div role="status" className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <p className="text-green-800 font-semibold mb-1">Got it. Andre will be in touch shortly.</p>
        {PHONE && (
          <p className="text-sm text-green-700">
            If this is urgent, call{' '}
            <a
              href={`tel:${PHONE}`}
              className="font-semibold underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 rounded"
            >
              {PHONE}
            </a>{' '}
            now.
          </p>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Name */}
      <div>
        <label htmlFor="intake-name" className="block text-sm font-medium text-gray-900 mb-1">
          Name <span aria-hidden="true" className="text-red-600">*</span>
        </label>
        <input
          id="intake-name"
          type="text"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-required="true"
          aria-describedby={errors.name ? 'intake-name-error' : undefined}
        />
        {errors.name && (
          <p id="intake-name-error" role="alert" className="mt-1 text-xs text-red-600">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="intake-email" className="block text-sm font-medium text-gray-900 mb-1">
          Email <span aria-hidden="true" className="text-red-600">*</span>
        </label>
        <input
          id="intake-email"
          type="email"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-required="true"
          aria-describedby={errors.email ? 'intake-email-error' : undefined}
        />
        {errors.email && (
          <p id="intake-email-error" role="alert" className="mt-1 text-xs text-red-600">{errors.email}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="intake-phone" className="block text-sm font-medium text-gray-900 mb-1">
          Phone
        </label>
        <input
          id="intake-phone"
          type="tel"
          value={form.phone}
          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        />
      </div>

      {/* Practice Area */}
      <div>
        <label htmlFor="intake-practice-area" className="block text-sm font-medium text-gray-900 mb-1">
          Practice Area <span aria-hidden="true" className="text-red-600">*</span>
        </label>
        <select
          id="intake-practice-area"
          value={form.practiceArea}
          onChange={e => setForm(f => ({ ...f, practiceArea: e.target.value }))}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 bg-white"
          aria-required="true"
          aria-describedby={errors.practiceArea ? 'intake-practice-area-error' : undefined}
        >
          <option value="">Select a practice area</option>
          <option value="criminal-defense">Criminal Defense</option>
          <option value="estate-planning">Estate Planning</option>
          <option value="business-law">Business Law</option>
          <option value="not-sure">Not sure</option>
        </select>
        {errors.practiceArea && (
          <p id="intake-practice-area-error" role="alert" className="mt-1 text-xs text-red-600">{errors.practiceArea}</p>
        )}
      </div>

      {/* Description with SpeechInput */}
      <div>
        <label htmlFor="speech-input" className="block text-sm font-medium text-gray-900 mb-1">
          Tell us what&rsquo;s going on
        </label>
        <SpeechInput
          id="speech-input"
          label="Tell us what's going on"
          value={form.description}
          onChange={val => setForm(f => ({ ...f, description: val }))}
        />
      </div>

      {/* Preferred contact method */}
      <fieldset>
        <legend className="text-sm font-medium text-gray-900 mb-2">Preferred contact method</legend>
        <div className="flex gap-6">
          {(['email', 'phone'] as const).map(method => (
            <label key={method} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="radio"
                name="contactMethod"
                value={method}
                checked={form.contactMethod === method}
                onChange={() => setForm(f => ({ ...f, contactMethod: method }))}
                className="focus-visible:outline-none"
              />
              {method === 'email' ? 'Email' : 'Phone'}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Best time */}
      <div>
        <label htmlFor="intake-best-time" className="block text-sm font-medium text-gray-900 mb-1">
          Best time to reach you
        </label>
        <select
          id="intake-best-time"
          value={form.bestTime}
          onChange={e => setForm(f => ({ ...f, bestTime: e.target.value }))}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 bg-white"
        >
          <option value="morning">Morning (9am–12pm)</option>
          <option value="afternoon">Afternoon (12pm–5pm)</option>
          <option value="evening">Evening (5pm–8pm)</option>
          <option value="no-preference">No preference</option>
        </select>
      </div>

      {/* Confidentiality notice */}
      <p className="text-xs text-gray-500 text-center">
        🔒 Confidential inquiry. Attorney-client privilege attaches upon engagement. We will never spam you.
      </p>

      <Button type="submit" variant="primary" disabled={submitting} className="w-full justify-center">
        {submitting ? 'Sending...' : 'Send My Intake Request'}
      </Button>
    </form>
  )
}
