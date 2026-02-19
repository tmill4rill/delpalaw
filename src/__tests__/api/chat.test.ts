/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server'

jest.mock('@anthropic-ai/sdk', () => {
  return jest.fn().mockImplementation(() => ({
    messages: {
      create: jest.fn().mockResolvedValue({
        content: [{ type: 'text', text: 'Here is some general information about estate planning.' }],
      }),
    },
  }))
})

jest.mock('@/lib/chat-guardrails', () => ({
  detectRiskTriggers: jest.fn().mockReturnValue(null),
  getAdviceRefusal: jest.fn().mockReturnValue(null),
  getRiskResponse: jest.fn().mockReturnValue(null),
  SYSTEM_PROMPT: 'test system prompt',
}))

import { POST } from '@/app/api/chat/route'
import { detectRiskTriggers, getAdviceRefusal, getRiskResponse } from '@/lib/chat-guardrails'

const mockDetect = detectRiskTriggers as jest.Mock
const mockAdvice = getAdviceRefusal as jest.Mock
const mockRisk = getRiskResponse as jest.Mock

function makeRequest(body: unknown) {
  return new NextRequest('http://localhost/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

describe('POST /api/chat', () => {
  beforeEach(() => {
    mockDetect.mockReturnValue(null)
    mockAdvice.mockReturnValue(null)
    mockRisk.mockReturnValue(null)
  })

  it('returns 400 for empty messages array', async () => {
    const res = await POST(makeRequest({ messages: [] }))
    expect(res.status).toBe(400)
  })

  it('returns 400 for missing messages field', async () => {
    const res = await POST(makeRequest({}))
    expect(res.status).toBe(400)
  })

  it('returns assistant response for valid message', async () => {
    const res = await POST(makeRequest({
      messages: [{ role: 'user', content: 'How does estate planning work?' }],
    }))
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.content).toBeTruthy()
  })

  it('returns crisis response immediately without calling Claude', async () => {
    mockDetect.mockReturnValue('crisis')
    mockRisk.mockReturnValue('Please contact 988.')

    const res = await POST(makeRequest({
      messages: [{ role: 'user', content: 'I want to hurt myself' }],
    }))
    const data = await res.json()
    expect(data.content).toBe('Please contact 988.')
    expect(data.risk).toBe('crisis')
  })

  it('returns advice refusal without calling Claude', async () => {
    mockAdvice.mockReturnValue("That's a question only Andre can answer.")

    const res = await POST(makeRequest({
      messages: [{ role: 'user', content: 'Should I plead guilty?' }],
    }))
    const data = await res.json()
    expect(data.content).toBe("That's a question only Andre can answer.")
  })

  it('returns 400 for message content exceeding 2000 chars', async () => {
    const res = await POST(makeRequest({
      messages: [{ role: 'user', content: 'x'.repeat(2001) }],
    }))
    expect(res.status).toBe(400)
  })
})
