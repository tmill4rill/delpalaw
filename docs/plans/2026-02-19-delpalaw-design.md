# DELPALaw — Site Design Document

**Date:** 2026-02-19
**Firm:** DELPALaw (Delaware + Pennsylvania Law)
**Attorney:** Andre Jerry
**Stack:** Next.js + Tailwind CSS + Stripe + Supabase/Auth (Phase 2)

---

## Positioning

> DELPALaw gives individuals, families, and businesses in Delaware and Pennsylvania direct access to experienced legal counsel — without the overhead of a large firm. One attorney, full accountability, three practice areas.

**Tagline:** TBD (working candidate: "Delaware + Pennsylvania Law")

---

## Primary Audiences

| Audience | Emotional state | Primary need | Primary CTA |
|---|---|---|---|
| Criminal defendant | Urgent, scared, time-pressured | Immediate guidance | Call now / Book emergency consult |
| Estate planner | Deliberate, cautious, trust-focused | Education first, then action | Book planning consult / See packages |
| Business owner | Practical, ROI-minded, busy | Reliable ongoing counsel | Explore retainer / Book intro call |

---

## Architecture Decision

**Option A — Unified Brand Hub** (selected)

One cohesive site under a single DELPALaw identity. Homepage does light audience triage ("What brings you here?"). Practice area pillar pages carry deep tailored content. Shared infrastructure — payments, intake, AI chat — serves all three practice areas from a single codebase.

---

## Service Areas

**Delaware:** Wilmington, Dover, Newark, Middletown, Smyrna (statewide)
**Pennsylvania:** Philadelphia, Chester County, Delaware County, Montgomery County (statewide)
**Remote:** Most matters handled by phone or video.

---

## Intake Method

**Online-first.** Form/booking submission leads. Phone ("Call Now") is always present but secondary. Speech-to-text mic available on intake form as an alternative to typing.

---

## MVP Sitemap

```
DELPALaw
├── Home
├── About (Andre Jerry)
├── Practice Areas (hub)
│   ├── Criminal Defense
│   ├── Estate Planning
│   └── Business Law
├── Service Areas
│   ├── Delaware
│   └── Pennsylvania
├── Reviews & Testimonials
├── FAQ
│   ├── General FAQ
│   ├── Criminal Defense FAQ
│   ├── Estate Planning FAQ
│   └── Business Law FAQ
├── Contact / Intake
├── Pay Online
│   ├── Flat Fee
│   ├── Retainer
│   └── Subscription (Business Counsel)
└── Legal
    ├── Privacy Policy
    ├── Terms of Use
    └── Disclaimer
```

## Phase 2 Sitemap Additions

```
├── Blog / Resources (by practice area)
├── Case Results (bar rules permitting)
├── City/Location pages (local SEO)
├── Client Portal (account login, documents, invoices)
└── Referral / Co-counsel page
```

---

## Page Blueprints

### Home

**Purpose:** Establish credibility instantly, triage visitors to the right practice area, drive consult bookings.

**Above the fold**
- Headline: "Serious Legal Matters Deserve Serious Counsel."
- Subhead: "Criminal defense, estate planning, and business law for clients across Delaware and Pennsylvania."
- CTA 1: "Book a Free Consult" (primary — blue-700)
- CTA 2: "Call Now: [phone]" (secondary — gold text link)
- Visual: Professional headshot of Andre Jerry, dark background, subtle DE/PA state outline graphic

**Section outline**
1. Trust bar — bar admission badges, years in practice, Google review stars, cities served
2. "What Brings You Here Today?" — three triage cards (Criminal / Estate / Business)
3. How DELPALaw Works — 3-step process
4. Practice Areas — brief cards linking to pillar pages
5. About Andre Jerry — 2-paragraph summary + "Meet Andre" link
6. Recent Reviews — 3 review cards + "See all reviews" link
7. Service Areas — DE + PA map callout with city links
8. Closing CTA band — "Book a Consult" + "Pay an Invoice"

**Microcopy**
- Triage cards: "I need help now" / "I'm planning for the future" / "I need ongoing business counsel"
- Step 3: "Move forward — with a lawyer who answers."

---

### About — Andre Jerry

**Purpose:** Convert skeptical visitors through personal credibility and differentiation from large firms.

**Above the fold**
- Headline: "A Lawyer Who Picks Up the Phone."
- Subhead: "Andre Jerry brings big-firm experience to clients who deserve personal attention."
- CTA 1: "Book a Consult"
- CTA 2: "See Practice Areas"

**Section outline**
1. Andre's story
2. Education & bar admissions (placeholder badges)
3. Why DELPALaw vs a large firm — 3-column comparison
4. Associations & recognition (placeholder)
5. Personal quote from Andre
6. CTA band

---

### Practice Areas Hub

**Purpose:** SEO landing point + routing page.

**Above the fold**
- Headline: "Three Practice Areas. One Accountable Attorney."
- Subhead: "Whether you're facing a charge, protecting your family's future, or running a business — DELPALaw is ready."

**Section outline**
1. Three large cards — each with 1-sentence description, 3 bullet services, CTA
2. "Not sure where to start?" → Contact/Chat route

---

### Criminal Defense (pillar)

**Above the fold**
- Headline: "Charged With a Crime in Delaware or Pennsylvania?"
- Subhead: "Every hour matters. Get an experienced criminal defense attorney on your side — today."
- CTA 1: "Call Now: [phone]" (urgent — gold on blue)
- CTA 2: "Book Emergency Consult" (primary button)

**Section outline**
1. What to do right now — numbered checklist
2. Charges we handle — DUI, drug, assault, theft, white collar, expungement
3. The defense process — timeline
4. Why early counsel matters
5. Outcomes we've worked toward (framed as "what we fight for")
6. Fees & payment intro + link to Pay Online
7. Criminal Defense FAQ
8. Service areas callout
9. CTA band — "Don't wait. Call or book a consult now."

**Trust modules:** "Available for emergency consultations" badge, response time note

---

### Estate Planning (pillar)

**Above the fold**
- Headline: "Protect What You've Built. Plan for Who Comes Next."
- Subhead: "Simple, clear estate plans for Delaware and Pennsylvania families — without the legalese."
- CTA 1: "Book a Planning Consult"
- CTA 2: "See Our Packages"

**Section outline**
1. Why estate planning can't wait — gentle, life-event framing
2. What we help with — wills, trusts, POA, healthcare directives, guardianship
3. Planning packages — tiered cards (pricing TBD)
4. The estate planning process — 3 steps
5. Plain-language glossary (collapsible)
6. Estate Planning FAQ
7. CTA band — "Start with a free consult. No pressure, no jargon."

**Trust modules:** Warm photography, package clarity, "No hidden fees" callout

---

### Business Law (pillar)

**Above the fold**
- Headline: "Legal Counsel for Businesses That Can't Afford Surprises."
- Subhead: "Contracts, formations, disputes, and ongoing counsel for DE and PA businesses — with transparent pricing."
- CTA 1: "Explore Monthly Retainer"
- CTA 2: "Book an Intro Call"

**Section outline**
1. What business owners come to us for
2. Industries we serve (placeholder)
3. Retainer plan — inclusions, pricing, how to start
4. Project-based work for one-off needs
5. Why a retainer beats hiring in-house
6. Business Law FAQ
7. CTA band — "Get a lawyer in your corner before you need one."

**Trust modules:** "Flat monthly fee — no surprise invoices," industries served list

---

### Contact / Intake

**Purpose:** Single low-friction path to a consult. Online-first.

**Above the fold**
- Headline: "Let's Talk About Your Situation."
- Subhead: "Fill out the form below and Andre will follow up within one business day — usually sooner."

**Form fields:** Name, Phone, Email, Practice Area (dropdown), Brief description (textarea + speech-to-text), Preferred contact method, Best time to reach

**Microcopy**
- Description label: "Tell us what's going on — in your own words"
- Speech-to-text notice: "You can speak your situation instead of typing. We'll transcribe it for you. Don't include sensitive details like SSNs or account numbers."
- Submit button: "Send My Intake Request"
- Confirmation: "Got it. Andre will be in touch shortly. If this is urgent, call [phone] now."

**Trust module:** "Confidential inquiry — attorney-client privilege attaches upon engagement"

---

### Pay Online

**Purpose:** Frictionless, trustworthy payment for flat fees, retainers, and subscriptions.

**Above the fold**
- Headline: "Pay Your Invoice or Retainer Securely Online."
- Subhead: "Simple, secure checkout powered by Stripe."

**Section outline**
1. Three payment path cards — Flat Fee / Retainer / Business Counsel Plan
2. Payment trust bar — Stripe badge, SSL, encryption note
3. Refund & cancellation policy summary
4. Questions block — "Not sure which to choose?"

**Microcopy**
- Flat fee button: "Pay for a Service"
- Retainer button: "Pay My Retainer"
- Subscription button: "Start Monthly Plan"
- Post-payment: "Payment received. You'll get a receipt at [email]. Andre will follow up to confirm next steps."

---

### Reviews & Testimonials

**Section outline**
1. Google review aggregate badge (placeholder)
2. Featured testimonial cards (3–6)
3. "Leave a review" CTA → Google Business link
4. Outcome summaries (bar rules permitting)

---

### FAQ Structure

- General FAQ page: 10 questions (process, fees, expectations)
- Practice area FAQs: 5–8 questions each, embedded on pillar pages
- All FAQs use FAQ structured data schema for Google rich results

---

### Service Areas

**Section outline**
1. Delaware cities — Wilmington, Dover, Newark, Middletown, Smyrna
2. Pennsylvania cities — Philadelphia, Chester County, Delaware County, Montgomery County
3. Remote consultations callout
4. CTA band

*Phase 2: Individual city pages for deep local SEO*

---

### Legal Pages

- **Privacy Policy:** data collected, retention, third-party tools (Stripe, scheduling, AI), cookie policy
- **Terms of Use:** no attorney-client relationship from site use, limitation of liability
- **Disclaimer:** "This site provides general information only. Nothing on this site constitutes legal advice or creates an attorney-client relationship. Results may vary."

Disclaimer appears as dismissible sticky footer bar on first visit.

---

## Navigation

- **Primary nav:** Practice Areas · About · Reviews · Pay Online · Contact
- **Sticky header CTA:** "Book a Consult" (always visible)
- **Footer:** Full sitemap + phone + disclaimer + social + bar admission badges (placeholder)

---

## Payments Flows

### Guiding principle
Stripe Checkout (hosted) for all transactions. DELPALaw never handles raw card data. Minimal PCI scope.

### Flow 1 — Flat Fee
```
User → Pay Online page → "Pay for a Service"
→ Select service from dropdown OR enter custom invoice amount
→ Enter name + email
→ Stripe Checkout (hosted)
→ /payment-confirmation
→ Stripe email receipt
→ Andre notified → confirms next steps
```

### Flow 2 — Retainer
```
User → "Pay My Retainer"
→ Choose: standard amount OR custom amount
→ Enter name + email
→ Stripe Checkout (one-time)
→ Confirmation + email receipt
→ Receipt notes retainer allocation, 1-business-day confirmation
```

### Flow 3 — Business Counsel Subscription
```
User → "Start Monthly Plan"
→ Plan details displayed (inclusions, price, cancel anytime)
→ Enter name + email
→ Stripe Checkout (recurring)
→ Confirmation page
→ Monthly: Stripe auto-charges + receipt
→ "Manage subscription" → Stripe Customer Portal
```

### Pricing presentation patterns
| Practice area | Pattern | Rationale |
|---|---|---|
| Criminal defense | Consult-first, then flat fee quote | Complexity varies |
| Estate planning | Tiered packages with prices | Transparency converts |
| Business law | Monthly retainer with clear inclusions | Subscription buyers need value visibility |

### Refund & cancellation policy template
- **Flat fee:** Non-refundable once work commenced. Refund within 5 business days if engagement not started.
- **Retainer:** Unearned funds returned within 30 days of matter closing, per bar rules.
- **Subscription:** Cancel anytime before next billing date. No partial-month refunds.

*Bar compliance review required before publishing.*

### PCI exposure plan
- All card data handled exclusively by Stripe
- Stripe Checkout (hosted) for all flows — not embedded Elements
- HTTPS required sitewide
- No card data stored in DELPALaw codebase or database
- Stripe webhooks for payment confirmation only

---

## AI Features

### Feature 1 — Speech-to-Text Intake Helper

**Placement:** Contact/Intake page, "Brief description" field.

**UX flow**
1. Mic icon button alongside textarea
2. Click mic → inline consent notice → [Start Recording] / [Type instead]
3. Start Recording → visible pulsing indicator + timer + Stop button
4. User speaks → clicks Stop
5. Transcript appears in textarea for review/edit
6. User edits → submits form normally
7. Delete button clears transcript at any point

**Fallback:** "Type instead" always present. If Web Speech API unsupported → mic hidden, textarea shown normally.

**Data handling (MVP)**
- Browser-native Web Speech API — audio processed locally, not sent to DELPALaw servers
- Transcript treated identically to typed input
- No audio stored
- Phase 2: server-side transcription (Whisper API) requires explicit additional consent

---

### Feature 2 — Chat Assistant

**Placement:** Floating widget, all pages, bottom-right, collapsed by default.

**Capabilities**
- Explain practice areas in plain language
- Answer "how does the process work" questions
- Help visitor identify correct practice area
- Collect name + email + practice area → route to intake or booking
- Surface FAQ answers
- Always end with a clear next step

**Tone guide**
| Quality | In practice |
|---|---|
| Credible | Knowledgeable professional, not a chatbot |
| Calm | Never alarmist, never dismissive |
| Direct | Short sentences, no legalese |
| Boundaried | Comfortable with "I can't advise on that" |
| Routing-focused | Every exchange ends with a clear next step |

**Refusal templates**
| Trigger | Response |
|---|---|
| "Should I plead guilty?" | "That's a decision only you and your attorney can make together — it depends on facts I don't have access to. Andre can walk you through your options in a consult." |
| "Will I win my case?" | "I can't predict outcomes — no one honestly can. What I can tell you is that early counsel improves your position. Want to book a consult?" |
| "What should I tell the police?" | "I can't advise you on that. What I can say is that you have the right to remain silent and the right to an attorney. If you need immediate guidance, call Andre now." |
| "How do I hide assets?" | "That's not something I can help with — and not something DELPALaw advises on. Is there something else I can help you with?" |
| "Can I get out of my contract?" | "Contract questions depend entirely on specific terms and circumstances. Andre can review it in a consult." |
| "Is this considered fraud?" | "I can't make legal determinations. If you have concerns about a business situation, a consult with Andre is the right next step." |
| "What if I ignore the lawsuit?" | "I can't advise on that — ignoring legal action typically has serious consequences. I'd strongly encourage you to speak with Andre before making that decision." |
| Generic legal advice | "I'm here to help with general information and to connect you with Andre — I'm not able to give legal advice. Want to book a consult?" |

**Risk triggers + escalation**
| Trigger | Action |
|---|---|
| "arrested," "in custody," "court tomorrow," "warrant" | Surface Call Now CTA immediately |
| Court date within 48–72 hours | "You have very little time — please call immediately" |
| Distress / self-harm signals | Pause legal routing → display 988 Lifeline + support message |
| "I already have a lawyer" | "I don't want to step on your current counsel — happy to answer general questions." |
| Repeated advice-pushing | "The most helpful thing I can do is connect you with Andre, who can actually advise you." |

---

## Design Direction

### Color Palette

| Token | Hex | Usage | Contrast (on white) |
|---|---|---|---|
| `blue-900` | `#0D2B6B` | Primary brand, nav, headers | AAA |
| `blue-700` | `#1A4B9C` | Primary buttons, links | AAA |
| `blue-500` | `#2E6FD8` | Hover states, accents | AA |
| `gold-700` | `#A07830` | Gold text/labels on light bg | AAA |
| `gold-500` | `#C9A84C` | Accent CTA, highlights (on dark only) | Fail on white |
| `gray-900` | `#1A1A1A` | Body text | AAA |
| `gray-600` | `#4A4A4A` | Secondary text, captions | AAA |
| `gray-200` | `#E8E8E8` | Borders, dividers | — |
| `gray-50` | `#F7F7F8` | Page backgrounds, cards | — |
| `white` | `#FFFFFF` | Card surfaces, hero text on dark | — |

**Accessibility rules**
- Body text: `gray-900` on `white`/`gray-50` — AAA always
- `gold-500` never as text on white — fails contrast
- `gold-700` for text on light backgrounds — AAA
- All interactive elements: AA minimum; primary CTAs: AAA
- Focus rings: `blue-500` 3px offset on all focusable elements

**Usage rules**
- **Blue:** authority, trust, primary actions — nav, primary buttons, headers, hero backgrounds
- **Gold:** premium signal, urgency accent — "Call Now," badges, pricing callouts, dividers. One gold element per viewport max.
- **Gray:** structure — `gray-50` alternating sections, `gray-200` borders/inputs, `gray-900` body copy
- **White:** space and clarity — hero text on blue, card surfaces

### Typography

| Role | Font | Weight | Size (desktop) |
|---|---|---|---|
| Display / H1 | Inter | 700 | 48–56px |
| H2 | Inter | 600 | 32–36px |
| H3 | Inter | 600 | 20–24px |
| Body | Inter | 400 | 16–18px |
| Small / captions | Inter | 400 | 14px |
| Button labels | Inter | 600 | 15–16px |
| Legal / disclaimer | Inter | 400 | 12–13px |

- Line height: 1.6 body, 1.2 headings, 1.5 minimum for all paragraphs (WCAG AA)
- Mobile H1: 32–36px. Body minimum 16px. No text below 14px on mobile.

### Component Styles

**Primary button**
- Background: `blue-700` | Text: `white` (AAA) | Hover: `blue-900`
- Border-radius: 6px | Padding: 12px 24px | Font: Inter 600 15px
- Focus ring: `blue-500` 3px offset

**Urgent/accent button (Call Now)**
- Background: `gold-700` | Text: `white` (AA) | Hover: darken 10%

**Secondary/ghost button**
- Background: transparent | Border: 2px solid `blue-700` | Text: `blue-700`
- Hover: `blue-50` background

**Cards**
- Background: white | Border: 1px solid `gray-200` | Border-radius: 8px
- Shadow: `0 2px 8px rgba(0,0,0,0.06)` | Hover shadow: `0 4px 16px rgba(0,0,0,0.10)`
- Padding: 24px

**Nav / Header**
- Background: `blue-900` | Logo: white Inter 700 | Links: white Inter 500
- Sticky CTA: `gold-700` button — "Book a Consult"
- Mobile: hamburger → full-screen overlay on `blue-900`

**Trust bar**
- Background: `blue-50` or `gray-50` | Icons: `blue-700` | Text: `gray-900`
- Border-top: 2px solid `gold-500`

**Forms**
- Input border: `gray-200` | Focus: `blue-500` 2px ring
- Label: `gray-900` Inter 500 14px | Error: `red-600` border + inline message
- Placeholder: `gray-400` (decorative only — not label replacement)

### Photography Direction
- **Hero:** Real headshot of Andre — dark/blue background, confident but approachable. No stock.
- **Criminal defense:** Clean, serious — courtroom architecture, legal documents. No police/handcuff imagery.
- **Estate planning:** Warm, family-oriented — multi-generational, calm interiors. No mortality imagery.
- **Business law:** Clean office/boardroom — modern workspace, contract review. Professional not stuffy.
- **Avoid:** Scales of justice cliché, gavel stock photos, aggressive "fighter" imagery.

---

## Phase 2 Scope (Explicitly Deferred)

- Client portal / accounts
- Blog / resources content
- City-specific landing pages
- Case results page
- Server-side AI transcription (Whisper API)
- Advanced analytics / A/B testing

---

## Open Items

- [ ] Firm tagline (final)
- [ ] Attorney phone number + email
- [ ] Bar admissions + associations (placeholder slots reserved throughout)
- [ ] Pricing structure per practice area (to be informed by competitive analysis)
- [ ] Google Business profile link (for reviews)
- [ ] Scheduling tool selection (Calendly vs Cal.com vs custom)
- [ ] AI chat model selection (Claude API recommended)
- [ ] Real headshot of Andre Jerry
