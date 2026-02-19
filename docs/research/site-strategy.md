# DELPALaw Site Strategy

## Positioning Statement

DELPALaw gives individuals, families, and businesses in Delaware and Pennsylvania direct access to experienced legal counsel — without the overhead of a large firm. One attorney, Andre Jerry, handles every matter personally across three practice areas: criminal defense, estate planning, and business law.

The core differentiator is direct access. Competitors in this market offer the same services but require clients to navigate associates, paralegals, and handoff chains. DELPALaw competes on accountability: you work with Andre every call, every hearing, every document.

The secondary differentiator is dual-state coverage. DELPALaw is licensed in both Delaware and Pennsylvania — a practical advantage for the cross-border population centered on Wilmington, Chester County, and the Philadelphia metro who live in one state and work in the other.

---

## Primary Audiences (3)

### Audience 1 — Criminal Defendant

| Dimension | Detail |
|---|---|
| Emotional state | Urgent, scared, time-pressured, often in shock |
| Typical scenario | Recently arrested or charged; court date approaching; first-time offense |
| Primary need | Immediate guidance and reassurance that their situation is manageable |
| Primary CTA | Call Now / Book Emergency Consult |
| Secondary need | Understand the process, understand costs |
| Content hook | "What to do right now" — numbered steps for the first 24–48 hours |
| Tone | Calm authority. Acknowledge the situation before selling the attorney. |

### Audience 2 — Estate Planner

| Dimension | Detail |
|---|---|
| Emotional state | Deliberate, cautious, life-event-triggered (new baby, illness, death of parent) |
| Typical scenario | Has been meaning to create a will or trust; finally ready to act |
| Primary need | Education first, then a clear low-pressure path to action |
| Primary CTA | Book a Planning Consult / See Our Packages |
| Secondary need | Pricing clarity; confidence that the process is simple |
| Content hook | Plain-language explanations; tiered package display |
| Tone | Warm, reassuring. Peace of mind, not consequence framing. |

### Audience 3 — Business Owner

| Dimension | Detail |
|---|---|
| Emotional state | Practical, ROI-minded, busy, skeptical of lawyers |
| Typical scenario | Starting a business, signing a contract, growing and needs ongoing counsel |
| Primary need | Reliable, transparent, ongoing legal counsel without hourly billing surprises |
| Primary CTA | Explore Monthly Retainer / Book an Intro Call |
| Secondary need | Understand what the retainer includes; confidence in Delaware law expertise |
| Content hook | Monthly retainer framing; risk-reduction copy; Delaware Court of Chancery credential |
| Tone | Direct, practical. Business language, not legal language. |

---

## Architecture Decision

**Option A — Unified Brand Hub** (selected)

One cohesive site under a single DELPALaw identity. The homepage performs light audience triage ("What brings you here today?") routing visitors to the appropriate practice area pillar. Practice area pages carry tailored content, tone, and CTAs for each audience. Shared infrastructure — payments, intake, AI chat — serves all three practice areas from a single Next.js codebase.

**Rationale:** Three separate microsites would fragment SEO authority, duplicate development overhead, and prevent the single-attorney brand story from landing. The unified hub positions DELPALaw's breadth as a feature — one trusted attorney for multiple life and business needs — rather than splitting it across disconnected properties. Audience triage on the homepage prevents confusion without requiring separate domains.

---

## MVP Sitemap

```
DELPALaw
├── Home                          /
├── About (Andre Jerry)           /about
├── Practice Areas (hub)          /practice-areas
│   ├── Criminal Defense          /criminal-defense
│   ├── Estate Planning           /estate-planning
│   └── Business Law              /business-law
├── Service Areas (hub)           /service-areas
│   ├── Delaware                  /service-areas/delaware
│   └── Pennsylvania              /service-areas/pennsylvania
├── Reviews & Testimonials        /reviews
├── FAQ                           /faq
│   ├── General FAQ               /faq (simple accordion, 10 general questions with links to practice-specific FAQ pages below)
│   ├── Criminal Defense FAQ      /faq/criminal-defense
│   ├── Estate Planning FAQ       /faq/estate-planning
│   └── Business Law FAQ          /faq/business-law
├── Contact / Intake              /contact
├── Pay Online                    /pay
│   ├── Flat Fee                  /pay/flat-fee
│   ├── Retainer                  /pay/retainer
│   └── Subscription              /pay/subscription
└── Legal                         /legal
    ├── Privacy Policy            /legal/privacy
    ├── Terms of Use              /legal/terms
    └── Disclaimer                /legal/disclaimer
```

---

## Phase 2 Sitemap

```
DELPALaw (Phase 2 additions)
├── Blog / Resources              /resources
│   ├── Criminal Defense          /resources/criminal-defense
│   ├── Estate Planning           /resources/estate-planning
│   └── Business Law              /resources/business-law
├── Case Results                  /results (bar rules permitting)
├── City / Location Pages         /wilmington-criminal-defense-attorney
│                                 /philadelphia-estate-planning-attorney
│                                 (and similar — deep local SEO)
├── Client Portal                 /portal
│   ├── Login                     /portal/login
│   ├── Documents                 /portal/documents
│   └── Invoices                  /portal/invoices
└── Referral / Co-counsel         /referral
```

---

## Navigation Structure

### Primary Navigation (desktop)

```
[DELPALaw logo]   Practice Areas   About   Reviews   Pay Online   Contact   [Book a Consult — gold button]
```

- Logo: white Inter 700 on blue-900 background; links to /
- Practice Areas: dropdown revealing Criminal Defense / Estate Planning / Business Law
- About: links to /about
- Reviews: links to /reviews
- Pay Online: links to /pay
- Contact: links to /contact
- Sticky CTA: "Book a Consult" — gold-700 button, always visible, links to /contact

### Mobile Navigation

- Hamburger icon (top-right) — opens full-screen overlay on blue-900
- Menu items stacked vertically with generous tap targets (minimum 44px height)
- Phone number displayed prominently at top of mobile menu as clickable tel: link
- "Book a Consult" CTA at bottom of mobile menu
- No nested dropdowns on mobile — practice area sub-pages accessible from /practice-areas hub

### Footer Navigation

```
Column 1: Practice Areas
  - Criminal Defense
  - Estate Planning
  - Business Law

Column 2: About
  - About Andre Jerry
  - Reviews & Testimonials
  - Service Areas

Column 3: Help
  - FAQ
  - Contact / Intake
  - Pay Online

Column 4: Legal
  - Privacy Policy
  - Terms of Use
  - Disclaimer

Footer bottom bar:
  - Phone (clickable tel: link)
  - "Licensed in Delaware and Pennsylvania" — bar admission disclosure
  - Disclaimer: "This website provides general information only. Nothing on this site constitutes legal advice or creates an attorney-client relationship."
  - Copyright + DELPALaw name
  - Stripe + SSL trust badges (near Pay Online link)
```

### Sticky Disclaimer Bar (first visit only)

Dismissible sticky bar at bottom of viewport on first visit:

> "This site provides general information only. Nothing on this site constitutes legal advice or creates an attorney-client relationship. Results may vary."

Implemented as a cookie-gated component. Dismissed state persists for 30 days.

---

## Page Blueprints

### Home

**Purpose:** Establish credibility instantly, triage visitors to the right practice area, drive consult bookings.

**Above the Fold**

| Element | Content |
|---|---|
| H1 | "Serious Legal Matters Deserve Serious Counsel." |
| Subhead | "Criminal defense, estate planning, and business law for clients across Delaware and Pennsylvania." |
| CTA 1 | "Book a Free Consult" — blue-700 primary button → /contact |
| CTA 2 | "Call Now: [phone]" — gold text link, tel: link |
| Visual | Professional headshot of Andre Jerry, dark blue-900 background, subtle DE/PA state outline graphic |

**Section Outline**

1. **Trust bar** — Google review star rating + count; bar admission badges (DE + PA); years in practice; "Available for emergency consultations" note
2. **"What Brings You Here Today?"** — three triage cards: "I need help now" (Criminal Defense / blue urgent badge) · "I'm planning for the future" (Estate Planning / warm icon) · "I need ongoing business counsel" (Business Law / professional icon). Each card links to the corresponding pillar page.
3. **How DELPALaw Works** — 3-step process: (1) Tell us your situation — form or call. (2) Andre reviews and responds — usually same day. (3) Move forward — with a lawyer who answers.
4. **Practice Areas** — brief cards linking to Criminal Defense, Estate Planning, Business Law pillar pages. One sentence description + 3 service bullets + CTA per card.
5. **About Andre Jerry** — 2-paragraph summary; "big-firm experience, personal accountability" hook; photo; "Meet Andre" link → /about
6. **Recent Reviews** — 3 review cards (Google reviews); 4.X stars aggregate; "See all reviews" link → /reviews
7. **Service Areas** — DE + PA map callout; city name links; "Most matters handled by phone or video" note
8. **Closing CTA band** — blue-900 background; "Ready to talk?" H2; "Book a Consult" primary button + "Pay an Invoice" ghost button

**Trust Modules**

| Location | Module |
|---|---|
| Below hero | Horizontal trust bar: Google stars + count · DE/PA bar badges · Years in practice |
| Triage section | "Available for emergency consultations" badge on Criminal Defense card |
| About section | Headshot + credentials callout |
| Reviews section | Star rating visual + named review cards |
| Footer | Bar admission disclosure + disclaimer |

**Microcopy**

| Element | Copy |
|---|---|
| Triage card 1 | "I need help now" |
| Triage card 2 | "I'm planning for the future" |
| Triage card 3 | "I need ongoing business counsel" |
| How it works step 3 | "Move forward — with a lawyer who answers." |
| Review section link | "See all [N] reviews" |
| Closing CTA | "Ready to talk? Book a consult — or call us now." |

**Internal Links from This Page**

- /criminal-defense (triage card + practice areas card)
- /estate-planning (triage card + practice areas card)
- /business-law (triage card + practice areas card)
- /about (About section "Meet Andre" link)
- /reviews (Reviews section "See all reviews")
- /contact (CTA band + sticky header)
- /pay (Closing CTA band "Pay an Invoice")
- /service-areas/delaware (Service areas map)
- /service-areas/pennsylvania (Service areas map)

---

### About — Andre Jerry

**Purpose:** Convert skeptical visitors through personal credibility and differentiation from large firms.

**Above the Fold**

| Element | Content |
|---|---|
| H1 | "A Lawyer Who Picks Up the Phone." |
| Subhead | "Andre Jerry brings big-firm experience to clients who deserve personal attention." |
| CTA 1 | "Book a Consult" — primary button → /contact |
| CTA 2 | "See Practice Areas" — ghost button → /practice-areas |
| Visual | Full-width or 2-column layout with Andre's headshot (warm, approachable, professional) |

**Section Outline**

1. **Andre's Story** — personal narrative: background, path to law, why Delaware + Pennsylvania, why solo practice. Written in first person or close third. Specific courthouse knowledge ("I practice regularly in New Castle County Court of Common Pleas and the Delaware Court of Chancery").
2. **Education & Bar Admissions** — law school, bar admissions (Delaware + Pennsylvania), year admitted. Placeholder badge slots for DE and PA bar association logos.
3. **Why DELPALaw vs a Large Firm** — 3-column comparison table:
   - Large firm: associates handle most calls / delayed responses / hourly billing surprises
   - DELPALaw: Andre handles every matter personally / same-day response / transparent flat fees and retainers
4. **Associations & Recognition** — placeholder section for professional memberships, bar associations, awards (Delaware State Bar Association, Philadelphia Bar Association, etc.)
5. **Personal Quote from Andre** — blockquote styled element: direct statement of his philosophy or commitment to clients
6. **CTA Band** — "Ready to work with Andre?" H2 + "Book a Consult" primary button + phone link

**Trust Modules**

| Location | Module |
|---|---|
| Education section | Bar admission badge placeholders |
| Comparison section | 3-column table with visual checkmarks |
| Associations section | Logo placeholder slots |
| Quote | Styled blockquote with Andre's name and credential |

**Microcopy**

| Element | Copy |
|---|---|
| Comparison table header (DELPALaw column) | "With Andre Jerry" |
| Associations placeholder | "Associations and recognition to be added." |
| CTA band subhead | "No associates. No handoffs. You get Andre — every call, every hearing, every document." |

**Internal Links from This Page**

- /practice-areas (CTA 2 + section links)
- /criminal-defense (from practice area mentions)
- /estate-planning (from practice area mentions)
- /business-law (from practice area mentions)
- /contact (CTA band)
- /reviews (link near quote or testimonials callout)

---

### Practice Areas Hub

**Purpose:** SEO landing point for practice area searches; routing page to the three pillar pages.

**Above the Fold**

| Element | Content |
|---|---|
| H1 | "Three Practice Areas. One Accountable Attorney." |
| Subhead | "Whether you're facing a charge, protecting your family's future, or running a business — DELPALaw is ready." |
| CTA 1 | "Book a Consult" — primary button → /contact |
| CTA 2 | "Call Now: [phone]" — gold text link |

**Section Outline**

1. **Three Large Cards** — one per practice area. Each card contains: practice area name (H2) · one-sentence description · 3 bullet services · "Learn More" CTA linking to pillar page
   - Criminal Defense: "Aggressive defense for individuals facing charges in Delaware and Pennsylvania."
   - Estate Planning: "Simple, clear estate plans that protect your family and your legacy."
   - Business Law: "Formation, contracts, disputes, and ongoing counsel for DE and PA businesses."
2. **"Not sure where to start?"** — secondary block with chat prompt or contact route: "Describe your situation to Andre and he'll tell you where to begin." → /contact or opens chat widget

**Trust Modules**

| Location | Module |
|---|---|
| Cards | Short credential callout per practice area (e.g., "Delaware Court of Chancery" for Business Law) |
| Below cards | Trust bar: bar admissions + availability note |

**Microcopy**

| Element | Copy |
|---|---|
| Not sure block | "Not sure where to start? Describe your situation — no commitment required." |
| Card CTA | "Learn More About [Practice Area]" |

**Internal Links from This Page**

- /criminal-defense
- /estate-planning
- /business-law
- /contact
- /about

---

### Criminal Defense

**Purpose:** Capture high-intent criminal defense prospects, address urgency, drive immediate contact. This page must function as both a calming resource and an urgent CTA machine.

**Above the Fold**

| Element | Content |
|---|---|
| H1 | "Charged With a Crime in Delaware or Pennsylvania?" |
| Subhead | "Every hour matters. Get an experienced criminal defense attorney on your side — today." |
| CTA 1 | "Call Now: [phone]" — gold-on-blue urgent button, tel: link |
| CTA 2 | "Book Emergency Consult" — primary button → /contact?area=criminal |
| Visual | Clean, serious — courtroom architecture or legal documents. No police/handcuff imagery. |

**Section Outline**

1. **What to Do Right Now** — numbered checklist for the first 24–48 hours after arrest/charge: (1) Exercise your right to remain silent. (2) Do not speak to police without an attorney present. (3) Contact Andre immediately — calls answered promptly. (4) Write down everything you remember. (5) Do not post about your situation on social media.
2. **Charges We Handle** — charge type cards with brief descriptions: DUI/DWI · Drug Charges (possession through trafficking) · Assault / Domestic Violence · Theft / Robbery · White Collar / Fraud · Expungement. Each links to a Phase 2 charge-specific page (placeholder links for now).
3. **The Defense Process** — timeline visualization: Arrest/Charge → Arraignment → Pre-Trial Conferences → Motions Hearing → Trial or Plea → Sentencing → Post-Conviction (if applicable). Brief explanation under each stage.
4. **Why Early Counsel Matters** — 3-point argument: evidence preservation · constitutional rights protection · negotiating leverage before charges are formalized
5. **What We Fight For** — outcome-framed (not consequence-framed): charges reduced or dismissed · minimum sentencing outcomes · record expungement eligibility after resolution. Placeholder for 3–5 case outcome summaries ("Delaware DUI charge, reduced to reckless driving" format; omit client names).
6. **Fees & Payment** — intro paragraph: "Criminal defense fees vary by charge type and complexity. Andre provides transparent flat-fee quotes after your initial consultation. Payment plans available." Link → /pay
7. **Criminal Defense FAQ** — embedded accordion, 5–8 questions (see FAQ Structure section)
8. **Service Areas Callout** — "Representing clients throughout Delaware and Pennsylvania — Wilmington, Dover, Newark, Philadelphia, Chester County, and beyond."
9. **CTA Band** — blue-900 background: "Don't wait. Call or book a consult now." H2 + "Call Now: [phone]" urgent button + "Book Emergency Consult" primary button

**Trust Modules**

| Location | Module |
|---|---|
| Hero area | "Available for emergency consultations" badge |
| Below hero | Trust bar: bar admissions + response time note ("Andre responds promptly — day or night for urgent matters") |
| Charges section | "Delaware + Pennsylvania licensed" callout |
| Fees section | "Payment plans available" callout |
| Case outcomes | Outcome summary cards (placeholder format) |

**Microcopy**

| Element | Copy |
|---|---|
| Emergency badge | "Available for emergency consultations" |
| Response time note | "Andre responds promptly to all urgent inquiries." |
| Payment plans note | "Flexible payment arrangements available. Ask during your consult." |
| CTA band subhead | "Waiting is the one thing that makes any criminal defense case harder. Call now." |
| Booking button | "Book Emergency Consult" |

**Internal Links from This Page**

- /contact?area=criminal (all CTAs)
- /pay (Fees section)
- /faq/criminal-defense (FAQ section header)
- /service-areas/delaware (Service areas callout)
- /service-areas/pennsylvania (Service areas callout)
- /about (sidebar or inline attorney reference)

---

### Estate Planning

**Purpose:** Educate and reassure deliberate visitors; build trust through transparency; present clear package options; drive planning consults.

**Above the Fold**

| Element | Content |
|---|---|
| H1 | "Protect What You've Built. Plan for Who Comes Next." |
| Subhead | "Simple, clear estate plans for Delaware and Pennsylvania families — without the legalese." |
| CTA 1 | "Book a Planning Consult" — primary button → /contact?area=estate |
| CTA 2 | "See Our Packages" — ghost button → anchors to packages section |
| Visual | Warm, family-oriented — multi-generational group, calm interior. No mortality imagery. |

**Section Outline**

1. **Why Estate Planning Can't Wait** — gentle, life-event framing (not fear-based): "A will isn't about death — it's about the people you love and what happens to them when you can't speak for yourself." Life event triggers: new baby, marriage, divorce, purchasing property, business ownership, aging parent.
2. **What We Help With** — service list with brief plain-language descriptions:
   - Last Will & Testament — "Who gets what, and who's in charge"
   - Revocable Living Trust — "Pass assets without probate court"
   - Durable Power of Attorney — "Who handles your finances if you can't"
   - Healthcare Directive / Living Will — "Your medical wishes, in writing"
   - Guardianship Designation — "Who raises your children if you can't"
   - Probate Administration — "Settling an estate after a loss"
3. **Planning Packages** — three-tier package cards (pricing TBD; ranges from competitive analysis: Basic $500–$900, Comprehensive $1,200–$2,000, Trust-Based $2,500–$4,500):
   - **Basic Will Package** — Single person or couple: will, healthcare directive, financial POA. Starting at $[TBD].
   - **Comprehensive Estate Package** — Married couple: dual wills, dual POAs, dual healthcare directives, disposition of remains. Starting at $[TBD].
   - **Trust-Based Plan** — Couple or individual: revocable living trust, pour-over wills, POAs, healthcare directives. Starting at $[TBD].
   - Each card: inclusions list · price placeholder · "Get a Quote" or "Book Consult" CTA
   - Disclaimer under cards: "Published ranges are estimates. Final fees depend on complexity and specific circumstances. All pricing confirmed during your consult."
4. **The Estate Planning Process** — 3 steps: (1) Consult — 60-minute planning conversation (free). (2) Documents drafted — Andre drafts your plan in plain language; you review before signing. (3) Signed and stored — your plan is finalized. We walk you through storage and next steps.
5. **Plain-Language Glossary** — collapsible accordion: Probate · Trustee · Beneficiary · Power of Attorney · Living Will · Guardian · Pour-Over Will. Written for non-lawyers.
6. **Estate Planning FAQ** — embedded accordion, 5–8 questions
7. **CTA Band** — warm tone: "Start with a free consult. No pressure, no jargon." + "Book a Planning Consult" button

**Trust Modules**

| Location | Module |
|---|---|
| Hero | Warm photography signals approachability |
| Packages section | "No hidden fees" callout; package clarity; price disclaimer |
| Process section | "Written in plain language — you'll understand every document before you sign" |
| FAQ | Reduces pre-commitment anxiety |

**Microcopy**

| Element | Copy |
|---|---|
| Package card CTA | "Get Started" |
| Glossary toggle | "Not sure what that means? See our plain-language glossary." |
| Price disclaimer | "Prices are estimates. Final fees confirmed at your consult — no surprises." |
| CTA band subhead | "No pressure, no jargon. Just a plain conversation about what you need." |
| Process step 2 | "You'll review everything in plain English before anything is signed." |

**Internal Links from This Page**

- /contact?area=estate (all CTAs)
- /pay (brief mention of packages with payment link)
- /faq/estate-planning (FAQ section)
- /service-areas/delaware
- /service-areas/pennsylvania
- /about (attorney reference)
- /business-law (cross-link: "Business owner? Ask about bundled business + estate planning.")

---

### Business Law

**Purpose:** Attract practical, ROI-minded business owners; present the retainer as the smart ongoing-counsel solution; drive intro call bookings.

**Above the Fold**

| Element | Content |
|---|---|
| H1 | "Legal Counsel for Businesses That Can't Afford Surprises." |
| Subhead | "Contracts, formations, disputes, and ongoing counsel for DE and PA businesses — with transparent pricing." |
| CTA 1 | "Explore Monthly Retainer" — primary button → anchors to retainer section |
| CTA 2 | "Book an Intro Call" — ghost button → /contact?area=business |
| Visual | Clean office or boardroom — contract review, modern workspace. Professional, not stuffy. |

**Section Outline**

1. **What Business Owners Come to Us For** — outcome-framed problem list (not a services menu):
   - "Starting a business and need it structured correctly from day one"
   - "Signing a contract and need someone to check it before you're locked in"
   - "Dealing with a dispute before it becomes litigation"
   - "Running a growing business and need a lawyer in your corner every month"
   - Delaware Court of Chancery callout: "Delaware's Court of Chancery is the premier corporate venue nationally. Andre practices there."
2. **Industries We Serve** — placeholder list: contractors + trades · retail and e-commerce · professional services · tech startups · real estate investors · nonprofits. (To be confirmed with Andre.)
3. **Retainer Plan** — inclusions, pricing, how to start:
   - Monthly general counsel retainer: [price TBD — range $500–$2,000/month]
   - Inclusions: [X] hours of attorney time · contract review · email/phone Q&A · priority response time · monthly check-in call
   - Cancel anytime · No long-term commitment
   - "Start Monthly Plan" CTA → /pay/subscription
4. **Project-Based Work** — flat fees for one-off needs:
   - LLC formation + operating agreement: starting at $[TBD]
   - Contract drafting or review: starting at $[TBD]
   - Business succession planning: starting at $[TBD]
   - Dispute demand letter + negotiation: starting at $[TBD]
5. **Why a Retainer Beats Hiring In-House** — 3-point comparison: cost (fraction of in-house salary) · flexibility (scale up or down) · Delaware law expertise (Court of Chancery)
6. **Business Law FAQ** — embedded accordion, 5–8 questions
7. **CTA Band** — practical tone: "Get a lawyer in your corner before you need one." H2 + "Start Monthly Plan" button + "Book an Intro Call" ghost button

**Trust Modules**

| Location | Module |
|---|---|
| Section 1 | "Delaware Court of Chancery" credential callout |
| Retainer section | "Flat monthly fee — no surprise invoices" callout |
| Industries section | Social proof signal: industries served |
| Retainer section | "Cancel anytime" trust note |

**Microcopy**

| Element | Copy |
|---|---|
| Section 1 hook | "The cost of getting your operating agreement right is a fraction of the cost of a partner dispute." |
| Retainer card tagline | "Your lawyer, every month. Flat fee. No surprises." |
| Cancel note | "Cancel anytime before your next billing date." |
| CTA band subhead | "Most business disputes could have been avoided with a contract review that cost less than one hour of litigation." |

**Internal Links from This Page**

- /contact?area=business (all CTAs)
- /pay/subscription (retainer section)
- /pay (project-based work pricing)
- /faq/business-law
- /service-areas/delaware (Court of Chancery mention)
- /service-areas/pennsylvania
- /estate-planning (cross-link: "Business owner? Consider bundling with an estate plan that includes business succession.")
- /about

---

### Contact / Intake

**Purpose:** Single low-friction path to a consult. Online-first.

**Above the Fold**

| Element | Content |
|---|---|
| H1 | "Let's Talk About Your Situation." |
| Subhead | "Fill out the form below and Andre will follow up within one business day — usually sooner." |
| CTA secondary | "Prefer to call? [phone]" — gold text link at top of page |

**Form Fields**

| Field | Type | Required | Notes |
|---|---|---|---|
| Full name | Text input | Yes | Label: "Your name" |
| Phone | Tel input | Yes | Label: "Best phone number" |
| Email | Email input | Yes | Label: "Email address" |
| Practice area | Select dropdown | Yes | Options: Criminal Defense / Estate Planning / Business Law / Not sure yet |
| Brief description | Textarea + speech-to-text mic | Yes | Label: "Tell us what's going on — in your own words" |
| Preferred contact | Radio: Phone / Email / Either | No | Label: "How would you like us to reach you?" |
| Best time to reach | Select: Morning / Afternoon / Evening / Any | No | Label: "Best time to reach you" |

**Microcopy**

| Element | Copy |
|---|---|
| Description label | "Tell us what's going on — in your own words" |
| Description hint | "No legal jargon needed. Just tell us your situation." |
| Speech-to-text notice | "You can speak your situation instead of typing. We'll transcribe it for you. Don't include sensitive details like Social Security numbers or account numbers." |
| Submit button | "Send My Intake Request" |
| Confirmation message | "Got it. Andre will be in touch shortly. If this is urgent, call [phone] now." |
| Privacy notice below form | "This is a confidential inquiry. Attorney-client privilege attaches upon engagement. We do not sell or share your information." |

**Trust Modules**

| Location | Module |
|---|---|
| Below form headline | "Confidential inquiry — attorney-client privilege attaches upon engagement" |
| Below form | Response time commitment: "Andre reviews every inquiry personally and responds within one business day — often the same day." |
| Page | No CAPTCHA — use honeypot field instead |

**Internal Links from This Page**

- /pay (brief mention: "Already been quoted? Pay online.")
- /faq (link below form: "Have questions first? See our FAQ.")
- /practice-areas (if visitor is unsure which area)
- /legal/privacy (privacy policy link in privacy notice)

---

### Pay Online

**Purpose:** Frictionless, trustworthy payment for flat fees, retainers, and subscriptions. Build confidence that payment is secure.

**Above the Fold**

| Element | Content |
|---|---|
| H1 | "Pay Your Invoice or Retainer Securely Online." |
| Subhead | "Simple, secure checkout powered by Stripe. Your payment information is never stored on our servers." |

**Section Outline**

1. **Three Payment Path Cards** — one per flow:
   - **Flat Fee** — "Pay for a specific service or invoice." "Pay for a Service" button → /pay/flat-fee
   - **Retainer** — "Pay your retainer deposit or balance." "Pay My Retainer" button → /pay/retainer
   - **Business Counsel Plan** — "Start or continue your monthly subscription." "Start Monthly Plan" button → /pay/subscription
2. **Payment Trust Bar** — Stripe badge · SSL padlock icon · "256-bit encryption" · "Your card data is processed by Stripe — DELPALaw never sees your card number"
3. **Refund & Cancellation Policy Summary** — brief plain-language version (see Payments Flows document for full policy)
4. **Questions Block** — "Not sure which to choose?" → "Call us at [phone] or [contact form link]." Brief guidance: flat fee = specific quoted service; retainer = trust account deposit; subscription = monthly plan.
5. **Legal Notice** — "Online payment does not create an attorney-client relationship unless a signed representation agreement is in place. Payments processed securely via Stripe (PCI-DSS Level 1 compliant)."

**Microcopy**

| Element | Copy |
|---|---|
| Flat fee card button | "Pay for a Service" |
| Retainer card button | "Pay My Retainer" |
| Subscription card button | "Start Monthly Plan" |
| Post-payment confirmation | "Payment received. You'll get a receipt at [email]. Andre will follow up to confirm next steps." |
| Trust bar tagline | "DELPALaw never stores your card information. All payments processed by Stripe." |

**Internal Links from This Page**

- /pay/flat-fee
- /pay/retainer
- /pay/subscription
- /contact (Questions block)
- /legal/privacy (payment data disclosure)

---

### Reviews & Testimonials

**Purpose:** Provide third-party social proof to convert skeptical visitors; demonstrate real client outcomes and satisfaction.

**Above the Fold**

| Element | Content |
|---|---|
| H1 | "What DELPALaw Clients Say" |
| Subhead | "Real reviews from real clients across Delaware and Pennsylvania." |

**Section Outline**

1. **Google Review Aggregate Badge** — star rating + total review count; placeholder: "[X] stars · [N] reviews on Google." Link to Google Business profile.
2. **Featured Testimonial Cards** — 3–6 review cards. Each card: reviewer first name + last initial · star rating · review text · practice area tag (Criminal Defense / Estate Planning / Business Law). Cards use real Google review text when available.
3. **"Leave a Review" CTA** — "Had a good experience? We'd appreciate a review." → Google Business link (opens in new tab)
4. **Outcome Summaries** — (bar rules permitting) 3–5 outcome cards: charge type + outcome only, no client names. Example format: "Delaware DUI charge — reduced to reckless driving." Small disclaimer: "Case results depend on individual facts and circumstances. Past results do not guarantee future outcomes."

**Trust Modules**

| Location | Module |
|---|---|
| Top | Google review aggregate badge |
| Cards | Named reviews with practice area tags |
| Outcomes | Outcome cards with disclaimer |

**Microcopy**

| Element | Copy |
|---|---|
| Aggregate badge | "[X.X] stars — [N] reviews" |
| Leave review CTA | "Had a good experience? Let others know." |
| Outcomes disclaimer | "Results depend on individual facts and circumstances. Past results do not guarantee future outcomes." |

**Internal Links from This Page**

- /contact (CTA below review section)
- /about (Andre bio link)
- /practice-areas (practice area tags on review cards link to pillar pages)

---

### FAQ Structure

**Purpose:** Reduce pre-commitment anxiety, answer common objections, improve SEO through FAQ structured data.

**General FAQ Page (/faq)**

10 questions covering process, fees, and expectations — applicable across all practice areas:

1. How do I get started with DELPALaw?
2. How much does it cost to work with Andre?
3. What happens during the first consultation?
4. How quickly will Andre respond to my inquiry?
5. Does DELPALaw handle cases across all of Delaware and Pennsylvania?
6. Can I handle my legal matter remotely (by phone or video)?
7. What is the difference between a retainer and a flat fee?
8. How do I pay Andre for legal services?
9. Is my inquiry confidential?
10. What if I already have a lawyer but want a second opinion?

**Practice Area FAQ Pages**

Each embedded on the relevant pillar page and available at /faq/[area]:

*Criminal Defense FAQ (5–8 questions):*
1. What should I do if I've just been arrested?
2. Should I talk to the police without a lawyer?
3. What is the difference between a misdemeanor and a felony in Delaware?
4. How long does a criminal case take in Delaware or Pennsylvania?
5. Can my record be expunged after my case is resolved?
6. What are the typical fees for criminal defense?
7. Can I get a payment plan for my criminal defense?
8. What happens if I miss my court date?

*Estate Planning FAQ (5–8 questions):*
1. Do I really need a will?
2. What happens if I die without a will in Delaware or Pennsylvania?
3. What is the difference between a will and a trust?
4. How long does it take to create an estate plan?
5. How much does estate planning cost?
6. Can I change my will after it's signed?
7. What is a power of attorney and why do I need one?
8. Does DELPALaw handle probate?

*Business Law FAQ (5–8 questions):*
1. Should my business be an LLC or a corporation?
2. Why should I form my business in Delaware?
3. What should be in an operating agreement?
4. What does a monthly retainer include?
5. Can DELPALaw review contracts before I sign them?
6. What happens if a business partner disputes our agreement?
7. Does DELPALaw handle litigation?
8. What is Delaware's Court of Chancery and why does it matter?

**FAQ Implementation Notes**

- All FAQs implemented as accordion components (single-expand or multi-expand)
- Each page's FAQ section includes FAQ structured data (JSON-LD `FAQPage` schema)
- Practice area FAQs are embedded on pillar pages (preferred scroll target) and mirrored at /faq/[area]
- No CAPTCHA, no gating — all FAQs accessible without form submission

**Internal Links from FAQ Pages**

- /contact (each FAQ page CTAs)
- /about (attorney references)
- /practice-areas (cross-links between FAQ verticals)

---

### Service Areas

**Purpose:** Local SEO signal; reassure out-of-area prospects that DELPALaw serves their location.

**Above the Fold**

| Element | Content |
|---|---|
| H1 | "Serving Clients Across Delaware and Pennsylvania" |
| Subhead | "DELPALaw represents clients throughout Delaware and the Pennsylvania metro area — in person, by phone, or by video." |

**Section Outline**

1. **Delaware Cities** — Wilmington · Dover · Newark · Middletown · Smyrna · (statewide). Brief mention of courts served: New Castle County Court of Common Pleas, Delaware Court of Chancery, Delaware Superior Court.
2. **Pennsylvania Cities** — Philadelphia · Chester County · Delaware County · Montgomery County · (statewide). Brief mention of courts served: Philadelphia Court of Common Pleas, Pennsylvania Superior Court.
3. **Remote Consultations Callout** — "Most matters are handled efficiently by phone or video. You don't need to come to an office to get started." Removes geographic barrier for remote-first prospects.
4. **CTA Band** — "Wherever you are in Delaware or Pennsylvania, Andre can help." + "Book a Consult" button + phone link

**Trust Modules**

| Location | Module |
|---|---|
| Delaware section | Courts served list — signals local knowledge |
| Pennsylvania section | Courts served list |
| Remote section | "Same-day response to all inquiries" note |

**Microcopy**

| Element | Copy |
|---|---|
| Remote callout | "No office visit required. Most consultations happen by phone or video — on your schedule." |
| CTA band | "Serving Delaware and Pennsylvania clients — wherever you are." |

**Internal Links from This Page**

- /contact
- /criminal-defense (internal links per practice area by state)
- /estate-planning
- /business-law
- Phase 2: individual city pages (linked from city name anchors)

---

### Legal Pages (Privacy / Terms / Disclaimer)

**Privacy Policy (/legal/privacy)**

Required disclosures:
- What data is collected (name, phone, email, intake form content, payment details, chat transcripts, cookies)
- How data is used (intake processing, payment processing, AI chat feature, site analytics)
- Third-party tools: Stripe (payment processing, PCI-DSS Level 1) · scheduling tool (TBD: Calendly or Cal.com) · Claude API (AI chat feature — data subject to Anthropic's privacy policy) · Web Speech API (browser-native, no server-side audio storage in MVP)
- Retention: intake inquiries retained for [X] months; payment records per legal requirements; chat transcripts retained for [X] days
- Cookie policy: analytics cookies (opt-in or opt-out mechanism); session cookies
- Contact for data requests: [email or form link]

**Terms of Use (/legal/terms)**

Required disclosures:
- No attorney-client relationship is created by use of this website
- Content is general information only — not legal advice
- Limitation of liability
- Intellectual property (site content owned by DELPALaw)
- Governing law: Delaware
- Changes to terms

**Disclaimer (/legal/disclaimer)**

Standard disclaimer text (matches sticky bar):
> "This site provides general information only. Nothing on this site constitutes legal advice or creates an attorney-client relationship. Viewing this website does not create an attorney-client relationship. Do not send confidential information through this website until an attorney-client relationship has been established. Results may vary."

Also displayed as:
- Sticky dismissible footer bar on first visit (cookie-gated, dismisses for 30 days)
- Footer text on every page (abbreviated)
- Inline note on Contact and Chat widget

**Bar Compliance Notes on Legal Pages**

Per Delaware Rule of Professional Conduct 7.2(c) and Pennsylvania Rule 7.2(c)(ii):
- Footer must identify the responsible attorney: "Andre Jerry, Attorney at Law"
- Footer must state bar admissions: "Licensed in Delaware and Pennsylvania"
- Published fee ranges must include: "Published ranges are estimates. Actual fees depend on case complexity and confirmed at time of engagement."
- Online payment disclosure: "Online payment does not create an attorney-client relationship unless a signed representation agreement is in place."

**Internal Links from Legal Pages**

- /contact
- /legal/privacy (cross-linked from disclaimer and terms)
- /legal/terms (cross-linked from privacy)
- /legal/disclaimer (cross-linked from privacy and terms)

---

## Internal Linking Strategy

### Linking Philosophy

Every page has a primary conversion action. Internal links support conversion by routing visitors who are not ready for the primary CTA to a secondary destination that keeps them engaged rather than bouncing. No dead ends.

### Hub-and-Spoke Structure

The three practice area pillar pages are the primary hubs. Every page on the site links to at least one pillar page. The homepage and practice areas hub distribute link equity to all three pillar pages equally.

### Cross-Practice Area Links (Deliberate)

| From | To | Link Context |
|---|---|---|
| Criminal Defense | Estate Planning | "Resolved your case? Many clients follow up with an estate plan." |
| Business Law | Estate Planning | "Business owner? Your estate plan should include business succession." |
| Estate Planning | Business Law | "Own a business? Ask about bundled business + estate planning." |
| About | All three pillar pages | Practice area mentions in bio |

### FAQ-to-Pillar Links

Each FAQ page links back to its parent pillar page at the top and bottom. FAQ questions that reference other practice areas link to those pillar pages.

### Service Areas-to-Pillar Links

Each state sub-page links to all three practice area pillar pages with state-specific anchor text: "Criminal defense in Delaware" / "Estate planning in Pennsylvania."

### Anchor Text Guidelines

- Use descriptive anchor text: "Delaware estate planning attorney" not "click here"
- Vary anchor text for repeated links to the same destination
- Do not use the same exact anchor text more than twice per page
- Match anchor text to the H1 or title of the destination page

---

## SEO Notes

### Target Keywords by Page

| Page | Primary Keyword | Secondary Keywords |
|---|---|---|
| Home | Delaware Pennsylvania attorney | DELPALaw · Andre Jerry attorney |
| Criminal Defense | Delaware criminal defense attorney | Wilmington criminal lawyer · PA criminal defense |
| Estate Planning | Delaware estate planning attorney | Wilmington will attorney · Delaware trust attorney |
| Business Law | Delaware business attorney | Wilmington business lawyer · Delaware LLC attorney |
| Service Areas / Delaware | Wilmington criminal defense attorney | Dover attorney · Newark Delaware lawyer |
| Service Areas / Pennsylvania | Philadelphia criminal defense attorney | Chester County attorney · Delaware County lawyer |
| FAQ / Criminal Defense | Delaware DUI attorney FAQ | Pennsylvania criminal defense questions |
| About | Andre Jerry attorney Delaware | DELPALaw attorney Wilmington |

### Technical SEO Requirements (MVP)

- Next.js App Router with static generation for all content pages
- `<title>` and `<meta name="description">` per page — not generic sitewide
- Canonical URLs on all pages
- Open Graph tags for social sharing
- FAQ structured data (JSON-LD `FAQPage`) on all FAQ pages and embedded FAQs
- LocalBusiness structured data (JSON-LD) on homepage: firm name, attorney name, address (or service area), phone, practice areas
- Attorney structured data: `Person` schema on /about with `jobTitle`, `alumniOf`, `memberOf` (bar associations)
- Sitemap.xml and robots.txt generated by Next.js
- Image alt text on all images — descriptive, not keyword-stuffed
- HTTPS required sitewide

### Local SEO Requirements

- Google Business Profile: firm name, address/service area, phone, categories (Criminal Law Attorney · Estate Planning Attorney · Business Law Attorney), hours, photos
- NAP consistency: name, address, phone identical on site, Google Business, and any directory listings
- Phase 2: individual city landing pages for Wilmington, Dover, Newark, Philadelphia, Chester County — each with unique H1, local copy, and local schema
- Encourage Google reviews (link from /reviews page) — target 10+ reviews as baseline

### Content SEO (Phase 2)

- Blog/Resources section with practice area content: "Delaware Expungement Eligibility Guide" · "Delaware Estate Planning Checklist" · "Why Form Your Business in Delaware" — these are organic traffic and lead capture opportunities with no local competitor executing them well
- Downloadable guides with email capture (competitive analysis identified this as an open gap)
- Charge-specific pages for criminal defense (Phase 2): /delaware-dui-defense · /delaware-drug-charges · /delaware-expungement
