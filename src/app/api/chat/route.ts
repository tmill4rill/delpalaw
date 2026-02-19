import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { z } from 'zod'
import { detectRiskTriggers, getAdviceRefusal, getRiskResponse, SYSTEM_PROMPT } from '@/lib/chat-guardrails'

if (!process.env.ANTHROPIC_API_KEY && process.env.NODE_ENV === 'production') {
  throw new Error('ANTHROPIC_API_KEY is not set')
}

const client = new Anthropic()

const schema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string().min(1).max(2000),
  })).min(1).max(20),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const messages = parsed.data.messages
    const lastMessage = messages[messages.length - 1].content

    // Check risk triggers BEFORE sending to Claude
    const riskLevel = detectRiskTriggers(lastMessage)
    if (riskLevel) {
      return NextResponse.json({ content: getRiskResponse(riskLevel), risk: riskLevel })
    }

    // Check for legal advice requests BEFORE sending to Claude
    const adviceRefusal = getAdviceRefusal(lastMessage)
    if (adviceRefusal) {
      return NextResponse.json({ content: adviceRefusal })
    }

    // Send to Claude with system prompt
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: messages.map(m => ({ role: m.role, content: m.content })),
    })

    const content = response.content[0].type === 'text' ? response.content[0].text : ''

    return NextResponse.json({ content })
  } catch (error) {
    console.error('[chat] error:', error)
    return NextResponse.json(
      { content: "I'm having trouble connecting right now. Please call Andre directly or submit an intake form." },
      { status: 200 } // return 200 so client shows graceful degradation message
    )
  }
}
