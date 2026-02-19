# DELPALaw Payments Flows

## Guiding Principles

1. **Stripe Checkout (hosted) for all transactions.** DELPALaw never handles raw card data. The browser redirects to Stripe's hosted checkout page for all payment flows. No embedded card forms (Stripe Elements) in the MVP. This keeps PCI scope at SAQ A — the lowest possible level for a card-not-present merchant.

2. **Three distinct flows, one payment hub.** All payment entry points across the site converge on /pay, then branch to /pay/flat-fee, /pay/retainer, or /pay/subscription. Visitors who arrive via direct link (e.g., from an invoice email) land on the appropriate sub-page. No dead ends — each sub-page links back to the hub if the visitor chose the wrong flow.

3. **Receipts are automatic; follow-up is personal.** Stripe sends automated email receipts. Andre or a designated contact sends a personal follow-up within one business day to confirm next steps. The confirmation page sets this expectation explicitly.

4. **Transparency builds trust.** Every payment flow shows what is being paid for, how much, what happens next, and how to cancel or request a refund. No hidden fees. No ambiguity.

5. **Online payment does not create representation.** A signed representation agreement is required to establish an attorney-client relationship. Payment alone does not create representation. This disclosure appears on the /pay hub, each payment sub-page, and in the Stripe Checkout session metadata (displayed to the user during checkout).

6. **Bar compliance first.** All refund and cancellation policies, trust account handling, and fee disclosures must be reviewed by Andre (and ideally a bar compliance advisor) before publication. IOLTA trust account rules apply to retainer deposits.

---

## Flow 1 — Flat Fee (step-by-step)

**Use case:** Client has been quoted a specific fee for a defined service — expungement, will package, LLC formation, contract review, etc. They are paying the full amount or an agreed installment.

**Entry points on site:**
- /pay → "Pay for a Service" card → /pay/flat-fee
- Invoice email with direct link to /pay/flat-fee?service=[service_slug]&amount=[amount]
- Criminal Defense pillar page → "Fees & Payment" section → /pay
- Estate Planning pillar page → package card CTA → /pay/flat-fee

---

**Step 1: Service Selection (/pay/flat-fee)**

Page heading: "Pay for a Legal Service"

The client selects their service from a dropdown or sees a pre-filled service if arriving from a direct invoice link.

Dropdown options (configurable by Andre):
- Delaware Expungement
- Simple Will Package
- Comprehensive Estate Package
- Trust-Based Estate Plan
- LLC Formation + Operating Agreement
- Contract Review
- Criminal Defense — DUI
- Criminal Defense — Drug Charges
- Criminal Defense — Other
- Other / Custom Amount

If "Other / Custom Amount" is selected, a text input field appears: "Invoice amount (provided by Andre)" with validation for dollar amounts.

Display block below selection:
```
Service: [Selected service]
Amount: $[Amount]
```

Microcopy below form: "Not sure which service to select? Call [phone] or [contact link] and Andre will send you a direct payment link."

Progress indicator: Step 1 of 3 — Select Service

---

**Step 2: Client Information (/pay/flat-fee — same page, step 2)**

Fields:
- Full name (text)
- Email address (email) — receipt sent here
- Phone (tel) — optional; used for Andre's follow-up

Note: "We use your email only to send your payment receipt. We do not send marketing emails without your permission."

Legal disclosure (shown before proceeding to Stripe):
> "Payment does not create an attorney-client relationship. An attorney-client relationship is established only upon execution of a signed representation agreement."

"Proceed to Secure Checkout" button → initiates Stripe Checkout session

Progress indicator: Step 2 of 3 — Your Information

---

**Step 3: Stripe Checkout (Stripe-hosted page)**

Stripe handles:
- Card entry (number, expiry, CVC)
- Billing address (optional — configurable)
- Payment processing

Stripe Checkout session parameters (set server-side via Stripe API):
- `mode: 'payment'` (one-time payment)
- `line_items`: service name + amount
- `success_url`: `${NEXT_PUBLIC_SITE_URL}/pay/confirmation?session_id={CHECKOUT_SESSION_ID}`
  > **Developer note:** Set `NEXT_PUBLIC_SITE_URL=http://localhost:3000` in `.env.local` for local development.
- `cancel_url`: `${NEXT_PUBLIC_SITE_URL}/pay/flat-fee`
- `customer_email`: pre-filled from step 2
- `metadata`: `{ flow: 'flat-fee', service: '[service_slug]', client_name: '[name]' }`

Stripe branding: Use Stripe's built-in branding with DELPALaw name and logo configured in Stripe Dashboard.

---

**Step 4: Payment Confirmation (/pay/confirmation)**

Triggered by Stripe `checkout.session.completed` webhook (server-side) before page renders.

Page displays:
```
Payment received.

Thank you, [name]. Your payment of $[amount] for [service] has been received.

A receipt has been sent to [email].

Andre will follow up within one business day to confirm next steps. If this is urgent, call [phone] now.
```

Stripe also sends automatic email receipt to client's email address.

Server-side action on webhook:
- Record payment confirmation in database (client name, email, service, amount, Stripe session ID, timestamp)
- Send internal notification to Andre (email or SMS) with client details and payment summary

---

**Developer Notes — Flow 1**

- Use `stripe.checkout.sessions.create()` with `mode: 'payment'`
- Validate and sanitize service/amount inputs server-side before creating Stripe session
- Never trust client-side amount parameters — amount must be looked up from a server-side price map or entered manually by Andre via admin
- Use Stripe webhook `checkout.session.completed` event; verify webhook signature before processing
- Idempotency: use Stripe idempotency keys to prevent duplicate processing

---

## Flow 2 — Retainer (step-by-step)

> ⚠️ **DO NOT IMPLEMENT until IOLTA compliance decision is made.**
> See Open Items table. Retainer funds may require LawPay instead of Stripe for trust account compliance.
> This must be confirmed with a bar compliance advisor before Task 9 retainer flow implementation.

**Use case:** Client is paying a retainer deposit into Andre's trust account (IOLTA). This is a one-time payment that funds the retainer balance from which fees are drawn as work is performed.

**Important bar compliance note:** Retainer deposits in most jurisdictions must go into an IOLTA trust account and may only be transferred to the operating account as fees are earned. Stripe's standard payments flow deposits directly to the operating account. For IOLTA compliance, consider LawPay (specifically designed for legal trust accounts and endorsed by state bar guidance) rather than standard Stripe for retainer flows. **This must be confirmed with a bar compliance advisor before launching the retainer payment flow.**

**Entry points on site:**
- /pay → "Pay My Retainer" card → /pay/retainer
- Direct link from Andre's engagement letter or invoice email
- Business Law pillar page → retainer section → /pay/retainer

---

**Step 1: Retainer Amount (/pay/retainer)**

Page heading: "Pay Your Retainer Deposit"

Brief explanation:
> "A retainer deposit funds your trust account balance. Andre draws from this as work is performed. You'll receive an accounting of all time and charges. Unearned funds are returned to you at the close of your matter."

Two amount options:

**Option A — Standard amount** (if applicable — placeholder, exact amounts TBD):
- Standard criminal defense retainer: $[TBD]
- Standard estate planning retainer: $[TBD]
- Standard business law retainer: $[TBD]

Radio buttons or dropdown for selection.

**Option B — Custom amount:**
"My retainer was quoted at a different amount" → text input: "Enter retainer amount"

Microcopy: "Andre will have specified your retainer amount in your engagement letter or intake confirmation. Use the amount stated there."

Progress indicator: Step 1 of 3 — Retainer Amount

---

**Step 2: Client Information (/pay/retainer — same page, step 2)**

Fields:
- Full name (text)
- Email address (email)
- Phone (tel) — optional

Legal disclosure:
> "Retainer deposits are held in trust and applied to fees as earned. This payment does not create an attorney-client relationship independent of your signed representation agreement. Unearned retainer funds will be returned within 30 days of matter closing, per applicable bar rules."

"Proceed to Secure Checkout" button → initiates Stripe Checkout session

Progress indicator: Step 2 of 3 — Your Information

---

**Step 3: Stripe Checkout (Stripe-hosted)**

Stripe session parameters:
- `mode: 'payment'` (one-time payment)
- `line_items`: "Retainer Deposit — DELPALaw" + amount
- `success_url`: `${NEXT_PUBLIC_SITE_URL}/pay/confirmation?session_id={CHECKOUT_SESSION_ID}&flow=retainer`
  > **Developer note:** Set `NEXT_PUBLIC_SITE_URL=http://localhost:3000` in `.env.local` for local development.
- `cancel_url`: `${NEXT_PUBLIC_SITE_URL}/pay/retainer`
- `customer_email`: pre-filled
- `metadata`: `{ flow: 'retainer', client_name: '[name]', matter_type: '[selected]' }`

---

**Step 4: Payment Confirmation (/pay/confirmation?flow=retainer)**

Page displays:
```
Retainer payment received.

Thank you, [name]. Your retainer deposit of $[amount] has been received and will be credited to your trust account.

A receipt has been sent to [email]. The receipt notes that this is a retainer deposit.

Andre will follow up within one business day to confirm your matter is ready to proceed.
```

Receipt note: Receipt email subject line and body should specify "RETAINER DEPOSIT" to distinguish from flat-fee payments. Configure in Stripe Dashboard payment description.

Server-side action on webhook:
- Record retainer payment separately from flat-fee payments (different event type in database)
- Notify Andre with retainer-specific alert
- Log for IOLTA reconciliation purposes

---

**Developer Notes — Flow 2**

- Stripe does not natively support IOLTA trust account separation. Evaluate LawPay as an alternative or consult bar rules before launch.
- If using Stripe: configure a separate Stripe account or bank account designated for trust funds, distinct from operating account. Do not commingle.
- Receipt metadata must clearly label this as a retainer/trust deposit for accounting purposes.
- Webhook logging must be sufficient for trust account reconciliation audits.

---

## Flow 3 — Business Counsel Subscription (step-by-step)

**Use case:** Business owner client starts a recurring monthly general counsel retainer. Stripe handles recurring billing automatically.

**Entry points on site:**
- /pay → "Start Monthly Plan" card → /pay/subscription
- Business Law pillar page → retainer section → "Start Monthly Plan" CTA → /pay/subscription
- Sticky header "Book a Consult" → intake form → after intake, Andre sends direct subscription link

---

**Step 1: Plan Details (/pay/subscription)**

Page heading: "Start Your Monthly Business Counsel Plan"

Plan details card (full-width, prominent):
```
Business Counsel Monthly Plan
$[TBD]/month

Includes:
- [X] hours of attorney time per month
- Unlimited email/phone Q&A (reasonable use)
- Contract review (up to [X] pages/month)
- Priority response — Andre responds within [X] hours
- Monthly check-in call (30 minutes)

Cancel anytime before your next billing date.
No setup fee. No long-term commitment.
```

Disclaimer below plan card:
> "Subscription billing does not guarantee availability for litigation or matters outside the scope of general counsel services. Andre will advise you if your needs exceed the plan scope."

"Get Started" button → proceeds to step 2

Progress indicator: Step 1 of 3 — Plan Details

---

**Step 2: Client Information (/pay/subscription — same page, step 2)**

Fields:
- Full name (text)
- Business name (text) — optional
- Email address (email)
- Phone (tel) — optional

Legal disclosure:
> "Monthly plan enrollment does not create an attorney-client relationship independent of your signed engagement agreement. Andre will send an engagement letter for your signature before the first billing cycle if one is not already on file."

"Proceed to Secure Checkout" button → initiates Stripe Checkout session

Progress indicator: Step 2 of 3 — Your Information

---

**Step 3: Stripe Checkout (Stripe-hosted)**

Stripe session parameters:
- `mode: 'subscription'` (recurring billing)
- `line_items`: Stripe Price ID for monthly plan (created in Stripe Dashboard)
- `success_url`: `${NEXT_PUBLIC_SITE_URL}/pay/confirmation?session_id={CHECKOUT_SESSION_ID}&flow=subscription`
  > **Developer note:** Set `NEXT_PUBLIC_SITE_URL=http://localhost:3000` in `.env.local` for local development.
- `cancel_url`: `${NEXT_PUBLIC_SITE_URL}/pay/subscription`
- `customer_email`: pre-filled
- `subscription_data.metadata`: `{ flow: 'subscription', client_name: '[name]', business_name: '[business]' }`
- `billing_address_collection: 'auto'`

Monthly billing: Stripe auto-charges the saved card on the same day each month. Stripe sends automatic receipt emails.

---

**Step 4: Payment Confirmation (/pay/confirmation?flow=subscription)**

Page displays:
```
You're enrolled in the Business Counsel Monthly Plan.

Thank you, [name]. Your first payment of $[amount] has been processed.

A receipt has been sent to [email]. You'll be billed automatically on the same date each month.

Andre will reach out within one business day to schedule your first check-in call and confirm your engagement is active.

Manage your subscription: [Stripe Customer Portal link]
```

Stripe Customer Portal link: Generated via `stripe.billingPortal.sessions.create()`. Allows client to update payment method, view billing history, or cancel subscription without contacting Andre.

Server-side action on webhook (`customer.subscription.created`):
- Create customer record in database
- Set subscription status to active
- Notify Andre with new subscription alert (client name, business, start date)
- If no engagement agreement on file: trigger prompt to send engagement letter

Ongoing webhook events to handle:
- `invoice.payment_succeeded` — log successful monthly payment
- `invoice.payment_failed` — notify Andre; flag account; Stripe handles retry logic
- `customer.subscription.deleted` — mark subscription as canceled; notify Andre

---

**Developer Notes — Flow 3**

- Create Stripe Product and Price objects via Stripe Dashboard or API before launch
- Monthly price amount is set in Stripe (not in code) — changes to pricing require updating the Stripe Price object and potentially migrating existing subscriptions
- Stripe Customer Portal must be configured in Stripe Dashboard (branding, allowed actions: cancel subscription, update payment method)
- Use `stripe.checkout.sessions.create()` with `mode: 'subscription'` — do not attempt custom subscription logic
- Webhook endpoint must handle all subscription lifecycle events with idempotency

---

## Pricing Presentation Patterns

| Practice Area | Payment Pattern | Rationale |
|---|---|---|
| Criminal Defense | Consult-first → flat fee quote | Complexity varies too widely for published price; consult qualifies the case before quoting |
| Estate Planning | Three published package tiers with price ranges | Transparency converts in this market; no DE competitor does this; reduces "how much will this cost" anxiety before the consult |
| Business Law | Monthly retainer with published inclusions + price | Subscription buyers need to see value before committing; clear inclusions remove ambiguity |

### Criminal Defense Pricing Presentation

Published on the criminal defense pillar page and FAQ — not a fixed menu:

> "Criminal defense fees vary based on the charge, jurisdiction, and complexity of your matter. After a free initial consultation, Andre provides a written flat-fee quote for your specific situation. Payment plans are available. Most clients pay between $[TBD] and $[TBD] for misdemeanor charges and $[TBD] and $[TBD] for felony charges."

Disclaimer required: "Published ranges are estimates based on typical matters. Your actual fee will be confirmed in writing before representation begins."

### Estate Planning Package Tiers

| Package | Contents | Published Range |
|---|---|---|
| Basic Will Package | Will + healthcare directive + financial POA (single or couple) | Starting at $[TBD] |
| Comprehensive Estate Package | Dual wills + dual POAs + dual healthcare directives + disposition of remains | Starting at $[TBD] |
| Trust-Based Plan | Revocable living trust + pour-over wills + POAs + healthcare directives (single or couple) | Starting at $[TBD] |

Pricing note on all package cards: "Prices are estimates. Final fees confirmed at your consult based on your specific situation. No surprises."

Based on market benchmarks from competitive analysis (see /docs/research/competitive-analysis.md): Basic $500–$900; Comprehensive $1,200–$2,000; Trust-Based $2,500–$4,500. Andre to confirm positioning within these ranges before publishing.

### Business Counsel Retainer Presentation

Single plan displayed prominently on Business Law pillar page:

> "**Business Counsel Monthly Plan — $[TBD]/month**
> Includes: [X] hours of attorney time · Unlimited Q&A (email/phone) · Contract review up to [X] pages · Priority response within [X] hours · Monthly check-in call. Cancel anytime."

Market range from competitive analysis: $500–$2,000/month for small business general counsel. Andre to set price within this range before launch.

---

## Refund & Cancellation Policy Template

**Note: Bar compliance review required before publishing. Andre must confirm that all refund terms comply with Delaware Rule of Professional Conduct 1.16 and Pennsylvania Rule of Professional Conduct 1.16 regarding termination of representation and return of unearned fees, and with IOLTA trust account requirements. The following is a template — not a final bar-compliant policy.**

---

### Flat Fee Services

> Flat fees are non-refundable once work has commenced on your matter. If you request cancellation before Andre has begun work on your file, you are entitled to a full refund within 5 business days of your cancellation request. Once work has commenced, the flat fee is earned. "Commencement of work" means any attorney time spent on your matter after your payment is received and your engagement letter is signed, including initial file review, research, or communications.

Implementation:
- Cancellation before work commences: issue Stripe refund via API (`stripe.refunds.create()`)
- Cancellation after work commences: no refund; Andre communicates this in writing
- Refund processing time: Stripe refunds typically post within 5–10 business days on client's card statement

### Retainer Deposits

> Retainer deposits are held in trust and applied to fees as earned. You will receive periodic accountings of fees applied against your retainer balance. At the conclusion of your matter, unearned retainer funds — funds not yet applied to earned fees — will be returned to you within 30 days of matter closing. Returns of unearned funds are subject to applicable bar rules governing trust accounts.

Implementation:
- Refund of unearned funds is processed manually by Andre at matter closing
- Stripe refunds for trust account transactions must be processed from the trust account — not the operating account
- Maintain clear records distinguishing earned vs. unearned funds throughout the engagement

### Business Counsel Subscription

> You may cancel your monthly Business Counsel Plan at any time before your next billing date. Cancellations take effect at the end of the current billing period — you retain access to the plan through the end of the period you have paid for. No partial-month refunds are issued. To cancel, use the [Manage Subscription link] in your confirmation email or contact Andre directly.

Implementation:
- Client cancels via Stripe Customer Portal (self-service)
- Stripe handles subscription cancellation at period end (`cancel_at_period_end: true`)
- No server-side partial refund logic required
- Webhook `customer.subscription.deleted` triggers internal cancellation record update

---

## PCI Exposure Plan

### Scope Assessment

DELPALaw's payment implementation targets **SAQ A** (Self-Assessment Questionnaire A) — the lowest PCI-DSS scope level, applicable to merchants that fully outsource card processing to a PCI-compliant third party.

SAQ A eligibility requirements met by this architecture:
- Card data is entered only on Stripe-hosted pages (not DELPALaw pages)
- DELPALaw servers never receive, transmit, or store card data
- No card data in DELPALaw codebase or database
- Stripe Checkout (hosted) for all flows — not Stripe Elements (which would raise scope to SAQ A-EP)

### Implementation Rules (must not be violated)

| Rule | Detail |
|---|---|
| Stripe Checkout (hosted) only | Do not implement Stripe Elements (embedded card form) — this raises PCI scope |
| HTTPS required sitewide | TLS 1.2+ on all pages; enforced at hosting provider (Vercel) |
| No card data in logs | Ensure no card numbers, CVCs, or expiry dates appear in server logs or database |
| No card data in metadata | Stripe metadata fields must never contain card data |
| Stripe webhook signature verification | Verify `stripe-signature` header on all incoming webhook events before processing |
| No card data in query parameters | Never pass card data in URL parameters (Stripe Checkout handles this) |
| Separation of trust and operating funds | Maintain separate bank accounts for trust (retainer) and operating funds |

### Third-Party PCI Posture

- **Stripe**: PCI-DSS Level 1 certified service provider (highest level). Handles all card data. [Stripe's PCI compliance documentation](https://stripe.com/docs/security)
- **Vercel** (hosting): SOC 2 Type II certified; does not interact with card data
- **Supabase** (Phase 2 — client portal): SOC 2 Type II; no card data stored there
- **Note on LawPay**: LawPay is PCI-DSS Level 1 compliant and specifically designed for legal trust accounts. If IOLTA requirements necessitate a payment processor switch for retainer flows, LawPay is the preferred alternative. Its use is explicitly endorsed in ABA and state bar trust account guidance.

### Ongoing Compliance Actions

- Annual SAQ A self-assessment (short questionnaire — approximately 20 questions)
- Quarterly vulnerability scans not required for SAQ A (only required for SAQ A-EP and higher)
- Maintain Stripe webhook logs for 90 days minimum
- Review Stripe security bulletins and update Stripe API library versions within 30 days of security releases
- Do not store Stripe API secret keys in client-side code, version control, or environment variable files committed to git

---

## Open Items (Pricing TBD)

The following pricing decisions have not been confirmed. All published prices are placeholders pending Andre's decision. No payment flows should be activated until these are resolved.

| Item | Status | Notes |
|---|---|---|
| Criminal defense retainer amount (standard) | TBD | Market range: $1,500–$5,000 depending on charge type. Confirm with Andre. |
| Criminal defense fee ranges (by charge type) | TBD | See pricing benchmarks in competitive-analysis.md. Andre to select ranges to publish. |
| Basic Will Package price | TBD | Market range: $500–$900 (single); $750–$1,200 (couple). |
| Comprehensive Estate Package price | TBD | Market range: $1,200–$2,000 (couple). |
| Trust-Based Plan price | TBD | Market range: $2,500–$4,500 (couple). |
| Business Counsel monthly retainer price | TBD | Market range: $500–$2,000/month. Andre to confirm scope and price. |
| Retainer plan inclusions (hours, response time) | TBD | Define specific hours and response time SLA before publishing. |
| IOLTA compliance for retainer flow | TBD | **Legal requirement.** Must confirm bar-compliant payment processor before activating retainer flow. LawPay vs. Stripe with separate trust account. |
| Refund policy bar review | TBD | **Required before publishing.** Template above needs attorney review for DRPC/PA RPC compliance. |
| Scheduling tool selection | TBD | Calendly vs. Cal.com vs. custom — affects confirmation email flows. |
| Payment plan availability for criminal defense | TBD | Competitive advantage if offered. Define terms (down payment, installment schedule) before advertising. |
