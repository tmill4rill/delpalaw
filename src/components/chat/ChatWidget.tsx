'use client'
import { useState, useRef, useEffect } from 'react'
import { ChatMessage } from './ChatMessage'

interface Message {
  role: 'user' | 'assistant'
  content: string
  isUrgent?: boolean
}

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content: "Hi — I'm the DELPALaw assistant. I can answer general questions about criminal defense, estate planning, and business law, or help you book a consult with Andre. I'm an AI tool, not an attorney — please don't share confidential case details here. What brings you here today?",
}

const DISCLAIMER = "This is an automated assistant. You are not speaking with an attorney. Responses are general information only — not legal advice. Do not share confidential case details in this chat."

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
    }
  }, [open])

  async function send() {
    const text = input.trim()
    if (!text || loading) return

    const userMessage: Message = { role: 'user', content: text }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      })

      const data = await res.json()
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.content,
        isUrgent: data.risk === 'urgent',
      }])
    } catch {
      setError('Connection error. Please try again or call Andre directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-blue-700 text-white shadow-lg flex items-center justify-center hover:bg-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-colors"
        aria-label={open ? 'Close chat' : 'Questions? Chat with us'}
        aria-expanded={open}
        aria-controls="chat-window"
      >
        {open
          ? <span aria-hidden="true">✕</span>
          : <span aria-hidden="true">💬</span>
        }
      </button>

      {/* Chat window */}
      <div
        id="chat-window"
        className={[
          'absolute bottom-16 right-0 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col',
          open ? 'flex' : 'hidden',
        ].join(' ')}
        style={{ height: '460px' }}
        role="dialog"
        aria-label="DELPALaw chat assistant"
        aria-modal="false"
      >
        {/* Header */}
        <div className="bg-blue-900 text-white px-4 py-3 rounded-t-xl">
          <p className="font-semibold text-sm">DELPALaw Assistant</p>
          <p className="text-xs text-blue-200 mt-0.5">AI-powered general information — not legal advice.</p>
        </div>

        {/* Disclaimer banner — persistent */}
        <div className="bg-yellow-50 border-b border-yellow-200 px-3 py-2">
          <p className="text-xs text-yellow-900 leading-snug">{DISCLAIMER}</p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-3 py-3" aria-live="polite" aria-label="Chat messages">
          {messages.map((m, i) => (
            <ChatMessage key={i} role={m.role} content={m.content} isUrgent={m.isUrgent} />
          ))}
          {loading && (
            <div className="flex justify-start mb-3" aria-label="Assistant is typing">
              <div className="bg-gray-100 rounded-lg px-4 py-3 text-sm text-gray-500">
                Typing…
              </div>
            </div>
          )}
          {error && (
            <p role="alert" className="text-xs text-red-600 px-1 mb-2">{error}</p>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick links */}
        <div className="px-3 pb-2 flex gap-2 flex-wrap">
          <a
            href="/contact"
            className="text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-3 py-1 hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors"
          >
            Book a consult
          </a>
          <a
            href="/pay"
            className="text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-3 py-1 hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors"
          >
            Pay invoice
          </a>
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 px-3 py-3 flex gap-2">
          <label htmlFor="chat-input" className="sr-only">Type your message</label>
          <input
            id="chat-input"
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
            placeholder="Ask a question…"
            className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            disabled={loading}
            aria-disabled={loading}
          />
          <button
            onClick={send}
            disabled={!input.trim() || loading}
            className="bg-blue-700 text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-blue-900 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors"
            aria-label="Send message"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
