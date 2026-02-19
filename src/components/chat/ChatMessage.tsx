interface ChatMessageProps {
  role: 'user' | 'assistant'
  content: string
  isUrgent?: boolean
  isCrisis?: boolean
}

export function ChatMessage({ role, content, isUrgent, isCrisis }: ChatMessageProps) {
  const isUser = role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div
        role={isUrgent || isCrisis ? 'alert' : undefined}
        className={[
          'max-w-[85%] rounded-lg px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap',
          isUser
            ? 'bg-blue-700 text-white'
            : isCrisis
              ? 'bg-red-50 border-2 border-red-400 text-gray-900'
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
