interface ChatMessageProps {
  role: 'user' | 'assistant'
  content: string
  isUrgent?: boolean
}

export function ChatMessage({ role, content, isUrgent }: ChatMessageProps) {
  const isUser = role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div
        className={[
          'max-w-[85%] rounded-lg px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap',
          isUser
            ? 'bg-blue-700 text-white'
            : isUrgent
              ? 'bg-yellow-50 border border-yellow-400 text-gray-900'
              : 'bg-gray-100 text-gray-900',
        ].join(' ')}
      >
        {content}
      </div>
    </div>
  )
}
