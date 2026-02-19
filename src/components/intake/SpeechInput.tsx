'use client'
import { useState, useEffect, useRef } from 'react'

// Minimal Web Speech API types (not in standard TypeScript DOM lib)
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList
}

interface SpeechRecognitionInstance {
  continuous: boolean
  interimResults: boolean
  lang: string
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: ((event: Event) => void) | null
  onend: (() => void) | null
  start(): void
  stop(): void
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance

function getSpeechRecognition(): SpeechRecognitionConstructor | null {
  if (typeof window === 'undefined') return null
  const win = window as Window & {
    SpeechRecognition?: SpeechRecognitionConstructor
    webkitSpeechRecognition?: SpeechRecognitionConstructor
  }
  return win.SpeechRecognition ?? win.webkitSpeechRecognition ?? null
}

interface SpeechInputProps {
  value: string
  onChange: (value: string) => void
  id?: string
  label?: string
}

export function SpeechInput({ value, onChange, id = 'speech-input', label = 'Description' }: SpeechInputProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    setSpeechSupported(getSpeechRecognition() !== null)
  }, [])

  function formatTime(secs: number) {
    const m = Math.floor(secs / 60).toString().padStart(2, '0')
    const s = (secs % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  function startRecording() {
    const SR = getSpeechRecognition()
    if (!SR) return

    const recognition = new SR()
    recognition.continuous = true
    recognition.interimResults = false
    recognition.lang = 'en-US'

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const parts: string[] = []
      for (let i = 0; i < event.results.length; i++) {
        parts.push(event.results[i][0].transcript)
      }
      const transcript = parts.join(' ').trim()
      onChange(value ? `${value} ${transcript}` : transcript)
    }

    recognition.onerror = () => stopRecording()
    recognition.onend = () => {
      if (timerRef.current) clearInterval(timerRef.current)
      setIsRecording(false)
    }

    recognition.start()
    recognitionRef.current = recognition
    setIsRecording(true)
    setSeconds(0)
    timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000)
  }

  function stopRecording() {
    recognitionRef.current?.stop()
    recognitionRef.current = null
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    setIsRecording(false)
  }

  return (
    <div className="space-y-2">
      <p className="text-xs text-gray-500">
        🔒 Don&rsquo;t include sensitive details like SSNs, account numbers, or anything you wouldn&rsquo;t put in an email.
      </p>
      <textarea
        id={id}
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={5}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        aria-label={label}
        placeholder="Briefly describe your situation..."
      />
      {speechSupported && (
        <div className="flex items-center gap-3 flex-wrap">
          {!isRecording ? (
            <button
              type="button"
              onClick={startRecording}
              className="text-sm text-blue-700 font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
            >
              🎤 Speak instead of typing
            </button>
          ) : (
            <>
              <span className="text-sm text-red-600 font-mono" aria-live="polite">
                ● REC {formatTime(seconds)}
              </span>
              <button
                type="button"
                onClick={stopRecording}
                className="text-sm text-red-600 font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded"
              >
                Stop
              </button>
            </>
          )}
          {value && !isRecording && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="text-sm text-gray-500 hover:text-red-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 rounded"
            >
              Delete transcript
            </button>
          )}
        </div>
      )}
    </div>
  )
}
