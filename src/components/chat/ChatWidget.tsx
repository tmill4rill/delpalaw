'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { ChatMessage } from './ChatMessage'

interface Message {
  role: 'user' | 'assistant'
  content: string
  isUrgent?: boolean
  isCrisis?: boolean
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
  const toggleRef = useRef<HTMLButtonElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  // Scroll to bottom only when widget is open
  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, open])

  // Focus input when opened
  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
    }
  }, [open])

  // Escape key closes widget and returns focus to toggle
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape' && open) {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [open])

  // Abort in-flight fetch on unmount
  useEffect(() => {
    return () => { abortRef.current?.abort() }
  }, [])

  const handleToggle = useCallback(() => {
    setOpen(prev => {
      if (prev) {
        // Closing — schedule focus return after state update
        setTimeout(() => toggleRef.current?.focus(), 0)
      }
      return !prev
    })
  }, [])

  async function send() {
    const text = input.trim()
    if (!text || loading) return

    const userMessage: Message = { role: 'user', content: text }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setLoading(true)
    setError(null)

    // Abort any previous in-flight request
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
        signal: controller.signal,
      })

      const data = await res.json()
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.content,
        isUrgent: data.risk === 'urgent',
        isCrisis: data.risk === 'crisis',
      }])
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return
      setError('Connection error. Please try again or call Andre directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle button */}
      <button
        ref={toggleRef}
        onClick={handleToggle}
        className="w-14 h-14 rounded-full bg-blue-700 text-white shadow-lg flex items-center justify-center hover:bg-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-colors"
        aria-label={open ? 'Close chat' : 'Questions? Chat with us'}
        aria-expanded={open}
        aria-controls="chat-window"
      >
        {open ? (
          /* Close X icon */
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
          </svg>
        ) : (
          /* Chat bubble icon */
          <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 12H5.17L4 15.17V4h16v10z"/>
          </svg>
        )}
      </button>

      {/* Chat window — always in DOM, shown/hidden for aria-live announcements */}
      <div
        id="chat-window"
        hidden={!open}
        className="absolute bottom-16 right-0 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col"
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

        {/* Disclaimer banner — persistent, not dismissible */}
        <div className="bg-yellow-50 border-b border-yellow-200 px-3 py-2">
          <p className="text-xs text-yellow-900 leading-snug">{DISCLAIMER}</p>
        </div>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto px-3 py-3"
          aria-live="polite"
          aria-relevant="additions"
          aria-label="Chat messages"
        >
          {messages.map((m, i) => (
            <ChatMessage
              key={i}
              role={m.role}
              content={m.content}
              isUrgent={m.isUrgent}
              isCrisis={m.isCrisis}
            />
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
