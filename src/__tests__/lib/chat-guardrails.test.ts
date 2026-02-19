import { detectRiskTriggers, getRiskResponse, isLegalAdviceRequest, getAdviceRefusal } from '@/lib/chat-guardrails'

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

  it('detects handcuffed urgency', () => {
    expect(detectRiskTriggers('he was handcuffed outside his house')).toBe('urgent')
  })

  it('detects taken in urgency', () => {
    expect(detectRiskTriggers('my brother was taken in last night')).toBe('urgent')
  })

  it('detects court-in-N-days urgency with date variants', () => {
    expect(detectRiskTriggers('I have a court date in 2 days')).toBe('urgent')
  })

  it('detects distress signals', () => {
    expect(detectRiskTriggers('I am thinking about hurting myself')).toBe('crisis')
  })

  it('detects want to end it crisis signal', () => {
    expect(detectRiskTriggers("I just want to end it all")).toBe('crisis')
  })

  it('crisis takes priority over urgent when both signals present', () => {
    expect(detectRiskTriggers('I was arrested and I want to end it')).toBe('crisis')
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

  it('detects document interpretation request', () => {
    expect(isLegalAdviceRequest('can you review this contract and tell me if it is good')).toBe(true)
  })

  it('detects ignore lawsuit advice', () => {
    expect(isLegalAdviceRequest('what happens if I ignore the lawsuit')).toBe(true)
  })

  it('returns false for general questions', () => {
    expect(isLegalAdviceRequest('how does the estate planning process work')).toBe(false)
  })
})

describe('getRiskResponse', () => {
  it('returns crisis response containing 988 for crisis level', () => {
    const response = getRiskResponse('crisis')
    expect(response).toMatch(/988/)
  })

  it('returns urgent response containing phone reference for urgent level', () => {
    const response = getRiskResponse('urgent')
    expect(response).toMatch(/call|phone|\d{3}|Andre/i)
  })

  it('urgent response contains "call Andre"', () => {
    const response = getRiskResponse('urgent')
    expect(response).toMatch(/call Andre/i)
  })

  it('returns null for null level', () => {
    expect(getRiskResponse(null)).toBeNull()
  })
})

describe('getAdviceRefusal', () => {
  it('returns plea refusal for guilty plea question', () => {
    const result = getAdviceRefusal('should I plead guilty')
    expect(result).toMatch(/attorney|consult/i)
  })

  it('returns outcome refusal for win prediction question', () => {
    const result = getAdviceRefusal('will I win my case')
    expect(result).toMatch(/predict|outcomes|consult/i)
  })

  it('returns police refusal for police interview question', () => {
    const result = getAdviceRefusal('what should I tell the police')
    expect(result).toMatch(/remain silent|attorney/i)
  })

  it('returns contract refusal for document review request', () => {
    const result = getAdviceRefusal('can you review this contract')
    expect(result).toMatch(/attorney|contract|consult/i)
  })

  it('returns null for non-advice question', () => {
    expect(getAdviceRefusal('how does estate planning work')).toBeNull()
  })
})
