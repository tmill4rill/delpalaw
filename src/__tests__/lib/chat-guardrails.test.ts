import { detectRiskTriggers, getRiskResponse, isLegalAdviceRequest } from '@/lib/chat-guardrails'

describe('detectRiskTriggers', () => {
  it('detects arrest urgency', () => {
    expect(detectRiskTriggers('I got arrested last night')).toBe('urgent')
  })

  it('detects court date urgency', () => {
    expect(detectRiskTriggers('I have court tomorrow morning')).toBe('urgent')
  })

  it('detects warrant urgency', () => {
    expect(detectRiskTriggers('there is a warrant out for my arrest')).toBe('urgent')
  })

  it('detects distress signals', () => {
    expect(detectRiskTriggers('I am thinking about hurting myself')).toBe('crisis')
  })

  it('returns null for normal messages', () => {
    expect(detectRiskTriggers('I want to update my will')).toBeNull()
  })
})

describe('isLegalAdviceRequest', () => {
  it('detects plea advice request', () => {
    expect(isLegalAdviceRequest('should I plead guilty')).toBe(true)
  })

  it('detects outcome prediction request', () => {
    expect(isLegalAdviceRequest('will I win my case')).toBe(true)
  })

  it('detects police interview advice', () => {
    expect(isLegalAdviceRequest('what should I tell the police')).toBe(true)
  })

  it('returns false for general questions', () => {
    expect(isLegalAdviceRequest('how does the estate planning process work')).toBe(false)
  })
})

describe('getRiskResponse', () => {
  it('returns crisis response for crisis level', () => {
    const response = getRiskResponse('crisis')
    expect(response).toMatch(/988/)
  })

  it('returns urgent response for urgent level', () => {
    const response = getRiskResponse('urgent')
    expect(response).toBeTruthy()
  })

  it('returns null for null level', () => {
    expect(getRiskResponse(null)).toBeNull()
  })
})
