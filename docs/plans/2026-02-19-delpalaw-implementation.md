# DELPALaw Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a conversion-focused law firm website for DELPALaw (Andre Jerry, DE + PA) covering criminal defense, estate planning, and business law — with Stripe payments and AI-powered intake/chat.

**Architecture:** Next.js 14 App Router site with Tailwind CSS for styling. Stripe Checkout (hosted, redirect) handles all payments — flat fee, retainer, and recurring subscription — with zero card data touching DELPALaw servers. AI chat uses the Claude API with hard guardrails; speech-to-text uses the browser-native Web Speech API at MVP.

**Tech Stack:** Next.js 14, Tailwind CSS, Stripe, Claude API (claude-sonnet-4-6), Web Speech API, Vercel deployment, Jest + React Testing Library + jest-axe for testing.

---

## Research Phase (Deliverables 1–6)

These tasks produce the analysis documents specified in the brief. They require web research, not code. Tests are document completeness checks.

---

### Task 1: Competitive Analysis — Local DE/PA Firms

**Files:**
- Create: `docs/research/competitive-analysis.md`
- Create: `docs/research/competitor-table.csv`

**Step 1: Research 18–25 competitor sites**

Search for and analyze:
- 8–10 local DE/PA solo/small firms (criminal defense, estate planning, business law)
- 4–6 practice-area specialists (pure criminal, pure estate, pure business)
- 3 premium out-of-region benchmark firms for best-in-class UX

For each competitor capture:
- Firm name + URL
- Practice focus
- Primary CTA(s) + placement
- Intake path (phone, form, scheduling, chat)
- Trust signals (reviews, badges, results, associations)
- Content strength (FAQ hubs, guides, blogs, case results)
- Visual style notes
- Mobile usability notes
- Accessibility red flags

**Step 2: Write competitor-table.csv**

```csv
firm_name,url,practice_focus,primary_ctas,intake_path,trust_signals,content_strength,visual_style,mobile_notes,accessibility_flags
"[Firm Name]","[URL]","[Focus]","[CTAs]","[Intake]","[Signals]","[Content]","[Style]","[Mobile]","[A11y]"
```

Save to `docs/research/competitor-table.csv`.

**Step 3: Write competitive-analysis.md**

Structure:
```markdown
# DELPALaw Competitive Analysis

## Competitor Set (table or links to CSV)

## Pattern Summary by Category

### A) Visual Credibility
### B) Conversion Mechanics
### C) Content That Closes (by practice area)
### D) Trust & Compliance

## Winning Pattern Library
## Anti-Pattern List
## Differentiation Opportunities (5–10 ideas)

## Pricing Benchmarks
### Criminal Defense
### Estate Planning
### Business Law
```

**Step 4: Verify document completeness**

Check: both files exist, competitor-table.csv has 18+ rows, competitive-analysis.md contains all required sections and pricing benchmarks.

**Step 5: Commit**

```bash
git add docs/research/
git commit -m "research: add competitive analysis and competitor table"
```

---

### Task 2: Site Strategy, Payments Flows, AI Safety Spec, Design Direction

**Files:**
- Create: `docs/research/site-strategy.md`
- Create: `docs/research/payments-flows.md`
- Create: `docs/research/ai-safety-ux-spec.md`
- Create: `docs/research/design-direction.md`

**Step 1: Write site-strategy.md**

Draw from `docs/plans/2026-02-19-delpalaw-design.md`. Include:
- Positioning statement
- 3 primary audiences
- MVP sitemap + Phase 2 sitemap
- Full page blueprints (all MVP pages) with: purpose, above-fold copy, section H2s, trust modules, microcopy, internal link strategy

**Step 2: Write payments-flows.md**

Include: all 3 Stripe flows (flat fee, retainer, subscription) as step-by-step diagrams, pricing presentation patterns, refund/cancellation policy templates, PCI exposure plan.

**Step 3: Write ai-safety-ux-spec.md**

Include: speech-to-text UX flow + data handling, chat tone guide, 3 scripted example chats, refusal templates (8 minimum), risk triggers + escalation actions.

**Step 4: Write design-direction.md**

Include: full color palette with hex values + WCAG grades + usage rules, typography scale, all component styles (buttons, cards, nav, trust bar, forms), photography direction.

**Step 5: Commit**

```bash
git add docs/research/
git commit -m "research: add strategy, payments, AI spec, and design direction docs"
```

---

## Build Phase

---

### Task 3: Project Scaffold

**Files:**
- Create: `package.json` (via next create)
- Create: `tailwind.config.ts`
- Create: `app/globals.css`
- Create: `.env.local.example`
- Create: `.env.local` (gitignored)
- Modify: `.gitignore`

**Step 1: Initialize Next.js project**

```bash
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-git
```

Answer prompts: Yes to TypeScript, Yes to Tailwind, Yes to ESLint, Yes to App Router, Yes to src directory.

**Step 2: Install dependencies**

```bash
npm install @stripe/stripe-js stripe @anthropic-ai/sdk
npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-axe
npm install --save-dev @types/jest ts-jest
```

**Step 3: Configure Jest**

Create `jest.config.ts`:
```typescript
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
}

export default createJestConfig(config)
```

Create `jest.setup.ts`:
```typescript
import '@testing-library/jest-dom'
```

**Step 4: Configure Tailwind with design tokens**

Replace `tailwind.config.ts` with:
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          900: '#0D2B6B',
          700: '#1A4B9C',
          500: '#2E6FD8',
          100: '#E8F0FB',
          50:  '#EEF3FC',
        },
        gold: {
          700: '#A07830',
          500: '#C9A84C',
          300: '#E8D4A0',
        },
        gray: {
          900: '#1A1A1A',
          600: '#4A4A4A',
          400: '#9A9A9A',
          200: '#E8E8E8',
          100: '#F2F2F2',
          50:  '#F7F7F8',
        },
        red: {
          600: '#DC2626',
        },
        green: {
          600: '#16A34A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

**Step 5: Create .env.local.example**

```bash
# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Claude API
ANTHROPIC_API_KEY=sk-ant-...

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_PHONE_NUMBER=
NEXT_PUBLIC_EMAIL=
```

Copy to `.env.local` and add real keys. Add `.env.local` to `.gitignore`.

**Step 6: Add Inter font to app/layout.tsx**

```typescript
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
```

**Step 7: Run dev server to verify scaffold**

```bash
npm run dev
```

Expected: http://localhost:3000 loads default Next.js page with no errors.

**Step 8: Run tests to verify test setup**

```bash
npm test -- --passWithNoTests
```

Expected: PASS (no tests yet, but setup works)

**Step 9: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js project with Tailwind design tokens and test setup"
```

---

### Task 4: Core UI Components

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Card.tsx`
- Create: `src/components/ui/Badge.tsx`
- Create: `src/__tests__/components/ui/Button.test.tsx`
- Create: `src/__tests__/components/ui/Card.test.tsx`

**Step 1: Write failing tests**

`src/__tests__/components/ui/Button.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/Button'

describe('Button', () => {
  it('renders primary variant with correct classes', () => {
    render(<Button variant="primary">Book a Consult</Button>)
    const btn = screen.getByRole('button', { name: /book a consult/i })
    expect(btn).toHaveClass('bg-blue-700')
    expect(btn).toHaveClass('text-white')
  })

  it('renders urgent variant with gold background', () => {
    render(<Button variant="urgent">Call Now</Button>)
    const btn = screen.getByRole('button', { name: /call now/i })
    expect(btn).toHaveClass('bg-gold-700')
  })

  it('renders secondary ghost variant', () => {
    render(<Button variant="secondary">Learn More</Button>)
    const btn = screen.getByRole('button', { name: /learn more/i })
    expect(btn).toHaveClass('border-blue-700')
    expect(btn).toHaveClass('bg-transparent')
  })

  it('renders as anchor when href provided', () => {
    render(<Button href="/contact" variant="primary">Contact</Button>)
    const link = screen.getByRole('link', { name: /contact/i })
    expect(link).toHaveAttribute('href', '/contact')
  })
})
```

**Step 2: Run tests to verify they fail**

```bash
npm test Button.test.tsx
```

Expected: FAIL — "Cannot find module '@/components/ui/Button'"

**Step 3: Implement Button component**

`src/components/ui/Button.tsx`:
```typescript
import Link from 'next/link'

type Variant = 'primary' | 'urgent' | 'secondary'

interface ButtonProps {
  variant: Variant
  href?: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}

const variants: Record<Variant, string> = {
  primary:   'bg-blue-700 text-white hover:bg-blue-900 focus:ring-blue-500',
  urgent:    'bg-gold-700 text-white hover:bg-yellow-800 focus:ring-gold-500',
  secondary: 'bg-transparent border-2 border-blue-700 text-blue-700 hover:bg-blue-50 focus:ring-blue-500',
}

const base = 'inline-flex items-center justify-center rounded-md px-6 py-3 font-semibold text-sm leading-tight focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'

export function Button({ variant, href, onClick, children, className = '', type = 'button', disabled }: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`

  if (href) {
    return <Link href={href} className={classes}>{children}</Link>
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  )
}
```

**Step 4: Run tests to verify they pass**

```bash
npm test Button.test.tsx
```

Expected: PASS — 4 tests passing

**Step 5: Implement Card component**

`src/components/ui/Card.tsx`:
```typescript
interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div className={`
      bg-white border border-gray-200 rounded-lg p-6
      shadow-sm
      ${hover ? 'hover:shadow-md transition-shadow cursor-pointer' : ''}
      ${className}
    `}>
      {children}
    </div>
  )
}
```

**Step 6: Implement Badge component**

`src/components/ui/Badge.tsx`:
```typescript
type BadgeVariant = 'blue' | 'gold' | 'gray'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
}

const variants: Record<BadgeVariant, string> = {
  blue: 'bg-blue-50 text-blue-700',
  gold: 'bg-yellow-50 text-gold-700',
  gray: 'bg-gray-50 text-gray-600',
}

export function Badge({ children, variant = 'blue' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  )
}
```

**Step 7: Commit**

```bash
git add src/components/ui/ src/__tests__/
git commit -m "feat: add Button, Card, Badge UI components with tests"
```

---

### Task 5: Layout — Header and Footer

**Files:**
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/Footer.tsx`
- Create: `src/components/layout/DisclaimerBanner.tsx`
- Modify: `src/app/layout.tsx`
- Create: `src/__tests__/components/layout/Header.test.tsx`

**Step 1: Write failing Header tests**

`src/__tests__/components/layout/Header.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Header } from '@/components/layout/Header'

describe('Header', () => {
  it('renders firm name', () => {
    render(<Header />)
    expect(screen.getByText('DELPALaw')).toBeInTheDocument()
  })

  it('renders primary navigation links', () => {
    render(<Header />)
    expect(screen.getByRole('link', { name: /practice areas/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /pay online/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument()
  })

  it('renders sticky CTA button', () => {
    render(<Header />)
    expect(screen.getByRole('link', { name: /book a consult/i })).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Header />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
```

**Step 2: Run tests to verify they fail**

```bash
npm test Header.test.tsx
```

Expected: FAIL — "Cannot find module '@/components/layout/Header'"

**Step 3: Implement Header**

`src/components/layout/Header.tsx`:
```typescript
'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'

const navLinks = [
  { href: '/practice-areas', label: 'Practice Areas' },
  { href: '/about', label: 'About' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/pay', label: 'Pay Online' },
  { href: '/contact', label: 'Contact' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-blue-900 shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-white font-bold text-xl tracking-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-900 rounded">
            DELPALaw
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
              >
                {link.label}
              </Link>
            ))}
            <Button variant="urgent" href="/contact">Book a Consult</Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="sr-only">Menu</span>
            <div className="w-6 h-0.5 bg-white mb-1" />
            <div className="w-6 h-0.5 bg-white mb-1" />
            <div className="w-6 h-0.5 bg-white" />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div id="mobile-menu" className="md:hidden bg-blue-900 pb-4">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-white py-2 px-4 text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 pt-2">
              <Button variant="urgent" href="/contact" className="w-full">Book a Consult</Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
```

**Step 4: Implement Footer**

`src/components/layout/Footer.tsx`:
```typescript
import Link from 'next/link'

const practiceLinks = [
  { href: '/practice-areas/criminal-defense', label: 'Criminal Defense' },
  { href: '/practice-areas/estate-planning', label: 'Estate Planning' },
  { href: '/practice-areas/business-law', label: 'Business Law' },
]

const firmLinks = [
  { href: '/about', label: 'About Andre Jerry' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/faq', label: 'FAQ' },
  { href: '/service-areas', label: 'Service Areas' },
  { href: '/contact', label: 'Contact' },
  { href: '/pay', label: 'Pay Online' },
]

const legalLinks = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Use' },
  { href: '/disclaimer', label: 'Disclaimer' },
]

export function Footer() {
  return (
    <footer className="bg-blue-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <p className="font-bold text-xl mb-2">DELPALaw</p>
            <p className="text-sm text-gray-200">Delaware + Pennsylvania Law</p>
            <p className="text-sm text-gray-200 mt-1">Andre Jerry, Esq.</p>
            <p className="text-sm text-gray-200 mt-3">
              <a href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`} className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
                {process.env.NEXT_PUBLIC_PHONE_NUMBER || '[Phone TBD]'}
              </a>
            </p>
            <p className="text-sm text-gray-200">
              <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`} className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
                {process.env.NEXT_PUBLIC_EMAIL || '[Email TBD]'}
              </a>
            </p>
          </div>

          {/* Practice areas */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wide mb-3 text-gold-500">Practice Areas</h3>
            <ul className="space-y-2">
              {practiceLinks.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-200 hover:text-white hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Firm links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wide mb-3 text-gold-500">Firm</h3>
            <ul className="space-y-2">
              {firmLinks.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-200 hover:text-white hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wide mb-3 text-gold-500">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-200 hover:text-white hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-blue-700 mt-10 pt-6">
          <p className="text-xs text-gray-300 leading-relaxed">
            Attorney Advertising. This site provides general information only. Nothing on this website constitutes legal advice or creates an attorney-client relationship. Results in prior matters do not guarantee similar outcomes. DELPALaw is licensed to practice law in Delaware and Pennsylvania.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            © {new Date().getFullYear()} DELPALaw. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
```

**Step 5: Implement DisclaimerBanner (dismissible, first visit)**

`src/components/layout/DisclaimerBanner.tsx`:
```typescript
'use client'
import { useState, useEffect } from 'react'

export function DisclaimerBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = sessionStorage.getItem('disclaimer-dismissed')
    if (!dismissed) setVisible(true)
  }, [])

  const dismiss = () => {
    sessionStorage.setItem('disclaimer-dismissed', 'true')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div role="alert" className="bg-gray-900 text-white text-xs py-2 px-4 flex items-center justify-between">
      <p className="flex-1 mr-4">
        This site provides general information only and does not constitute legal advice.{' '}
        <a href="/disclaimer" className="underline focus:outline-none focus:ring-2 focus:ring-blue-500">
          See full disclaimer.
        </a>
      </p>
      <button
        onClick={dismiss}
        aria-label="Dismiss disclaimer"
        className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded flex-shrink-0"
      >
        ✕
      </button>
    </div>
  )
}
```

**Step 6: Update app/layout.tsx**

```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { DisclaimerBanner } from '@/components/layout/DisclaimerBanner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'DELPALaw — Delaware & Pennsylvania Law Firm',
    template: '%s | DELPALaw',
  },
  description: 'Criminal defense, estate planning, and business law for clients across Delaware and Pennsylvania. Attorney Andre Jerry.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-900`}>
        <DisclaimerBanner />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

**Step 7: Run Header tests**

```bash
npm test Header.test.tsx
```

Expected: PASS — 4 tests passing

**Step 8: Commit**

```bash
git add src/components/layout/ src/app/layout.tsx src/__tests__/
git commit -m "feat: add Header, Footer, and DisclaimerBanner layout components"
```

---

### Task 6: Home Page

**Files:**
- Create: `src/components/home/Hero.tsx`
- Create: `src/components/home/TrustBar.tsx`
- Create: `src/components/home/TriageCards.tsx`
- Create: `src/components/home/HowItWorks.tsx`
- Create: `src/components/home/ReviewsPreview.tsx`
- Create: `src/components/home/ServiceAreasCallout.tsx`
- Create: `src/components/home/CtaBand.tsx`
- Modify: `src/app/page.tsx`
- Create: `src/__tests__/components/home/Hero.test.tsx`
- Create: `src/__tests__/components/home/TriageCards.test.tsx`

**Step 1: Write failing Hero tests**

`src/__tests__/components/home/Hero.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Hero } from '@/components/home/Hero'

describe('Hero', () => {
  it('renders headline', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /serious legal matters deserve serious counsel/i
    )
  })

  it('renders primary CTA linking to contact', () => {
    render(<Hero />)
    const cta = screen.getByRole('link', { name: /book a free consult/i })
    expect(cta).toHaveAttribute('href', '/contact')
  })

  it('renders phone CTA', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /call now/i })).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Hero />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
```

**Step 2: Write failing TriageCards tests**

`src/__tests__/components/home/TriageCards.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import { TriageCards } from '@/components/home/TriageCards'

describe('TriageCards', () => {
  it('renders three triage cards', () => {
    render(<TriageCards />)
    expect(screen.getByText(/i need help now/i)).toBeInTheDocument()
    expect(screen.getByText(/i'm planning for the future/i)).toBeInTheDocument()
    expect(screen.getByText(/i need ongoing business counsel/i)).toBeInTheDocument()
  })

  it('each card links to the correct practice area', () => {
    render(<TriageCards />)
    expect(screen.getByRole('link', { name: /criminal defense/i })).toHaveAttribute(
      'href', '/practice-areas/criminal-defense'
    )
    expect(screen.getByRole('link', { name: /estate planning/i })).toHaveAttribute(
      'href', '/practice-areas/estate-planning'
    )
    expect(screen.getByRole('link', { name: /business law/i })).toHaveAttribute(
      'href', '/practice-areas/business-law'
    )
  })
})
```

**Step 3: Run tests to verify they fail**

```bash
npm test Hero.test.tsx TriageCards.test.tsx
```

Expected: FAIL on both

**Step 4: Implement Hero**

`src/components/home/Hero.tsx`:
```typescript
import { Button } from '@/components/ui/Button'

const PHONE = process.env.NEXT_PUBLIC_PHONE_NUMBER || '[Phone TBD]'

export function Hero() {
  return (
    <section className="bg-blue-900 text-white py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          Serious Legal Matters<br />Deserve Serious Counsel.
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
          Criminal defense, estate planning, and business law for clients
          across Delaware and Pennsylvania.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button variant="urgent" href="/contact">Book a Free Consult</Button>
          <a
            href={`tel:${PHONE}`}
            className="text-gold-500 font-semibold text-sm flex items-center underline hover:text-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-500 rounded"
          >
            Call Now: {PHONE}
          </a>
        </div>
      </div>
    </section>
  )
}
```

**Step 5: Implement TrustBar**

`src/components/home/TrustBar.tsx`:
```typescript
const trustItems = [
  { icon: '⚖️', label: 'Licensed in DE & PA' },
  { icon: '⭐', label: 'Google Reviews [placeholder]' },
  { icon: '🏛️', label: 'Bar Admissions [placeholder]' },
  { icon: '📍', label: 'Serving Wilmington, Philadelphia + more' },
]

export function TrustBar() {
  return (
    <div className="bg-gray-50 border-t-2 border-gold-500 py-4">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-6 md:gap-10">
        {trustItems.map(item => (
          <div key={item.label} className="flex items-center gap-2 text-sm text-gray-900">
            <span aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
```

**Step 6: Implement TriageCards**

`src/components/home/TriageCards.tsx`:
```typescript
import Link from 'next/link'
import { Card } from '@/components/ui/Card'

const cards = [
  {
    label: 'I need help now',
    heading: 'Criminal Defense',
    description: 'Facing charges or an arrest? Time is critical. Get an experienced attorney on your side today.',
    href: '/practice-areas/criminal-defense',
    urgency: true,
  },
  {
    label: "I'm planning for the future",
    heading: 'Estate Planning',
    description: 'Protect your family and your assets with a clear, simple estate plan.',
    href: '/practice-areas/estate-planning',
    urgency: false,
  },
  {
    label: 'I need ongoing business counsel',
    heading: 'Business Law',
    description: 'Legal support for contracts, formations, and disputes — on a retainer that makes sense.',
    href: '/practice-areas/business-law',
    urgency: false,
  },
]

export function TriageCards() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2">What Brings You Here Today?</h2>
        <p className="text-gray-600 text-center mb-10">Choose your situation to find the right help.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map(card => (
            <Link key={card.href} href={card.href} className="group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg">
              <Card hover className="h-full flex flex-col">
                <span className={`text-xs font-semibold uppercase tracking-wide mb-2 ${card.urgency ? 'text-gold-700' : 'text-blue-700'}`}>
                  {card.label}
                </span>
                <h3 className="text-xl font-bold mb-3">{card.heading}</h3>
                <p className="text-gray-600 text-sm flex-1">{card.description}</p>
                <span className="mt-4 text-blue-700 font-semibold text-sm group-hover:underline">
                  Learn more →
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Step 7: Implement HowItWorks**

`src/components/home/HowItWorks.tsx`:
```typescript
const steps = [
  { number: '1', heading: 'Book a consult', body: 'Submit a quick intake form or call. Andre will follow up within one business day.' },
  { number: '2', heading: 'Get a clear plan', body: "You'll know exactly what to expect — the process, the cost, and the timeline." },
  { number: '3', heading: 'Move forward with confidence', body: 'With a lawyer who answers, advocates, and sees your matter through.' },
]

export function HowItWorks() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">How DELPALaw Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map(step => (
            <div key={step.number} className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-700 text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">
                {step.number}
              </div>
              <h3 className="font-semibold text-lg mb-2">{step.heading}</h3>
              <p className="text-gray-600 text-sm">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Step 8: Implement ReviewsPreview (placeholder)**

`src/components/home/ReviewsPreview.tsx`:
```typescript
import Link from 'next/link'

const placeholderReviews = [
  { name: 'Client Name', text: '[Review placeholder — to be replaced with real Google reviews]', rating: 5 },
  { name: 'Client Name', text: '[Review placeholder — to be replaced with real Google reviews]', rating: 5 },
  { name: 'Client Name', text: '[Review placeholder — to be replaced with real Google reviews]', rating: 5 },
]

export function ReviewsPreview() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2">What DELPALaw Clients Are Saying</h2>
        <p className="text-gray-600 text-center mb-10">⭐⭐⭐⭐⭐ — [Google review aggregate placeholder]</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {placeholderReviews.map((review, i) => (
            <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <p className="text-yellow-500 mb-2">{'★'.repeat(review.rating)}</p>
              <p className="text-sm text-gray-700 italic mb-3">"{review.text}"</p>
              <p className="text-xs font-semibold text-gray-900">— {review.name}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/reviews" className="text-blue-700 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
            See all reviews →
          </Link>
        </div>
      </div>
    </section>
  )
}
```

**Step 9: Implement CtaBand**

`src/components/home/CtaBand.tsx`:
```typescript
import { Button } from '@/components/ui/Button'

interface CtaBandProps {
  heading: string
  subhead?: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  dark?: boolean
}

export function CtaBand({ heading, subhead, primaryCta, secondaryCta, dark = true }: CtaBandProps) {
  return (
    <section className={`py-16 px-4 ${dark ? 'bg-blue-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-3">{heading}</h2>
        {subhead && <p className={`mb-8 ${dark ? 'text-gray-200' : 'text-gray-600'}`}>{subhead}</p>}
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="urgent" href={primaryCta.href}>{primaryCta.label}</Button>
          {secondaryCta && (
            <Button variant="secondary" href={secondaryCta.href}
              className={dark ? 'border-white text-white hover:bg-blue-700' : ''}>
              {secondaryCta.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
```

**Step 10: Assemble Home page**

`src/app/page.tsx`:
```typescript
import { Hero } from '@/components/home/Hero'
import { TrustBar } from '@/components/home/TrustBar'
import { TriageCards } from '@/components/home/TriageCards'
import { HowItWorks } from '@/components/home/HowItWorks'
import { ReviewsPreview } from '@/components/home/ReviewsPreview'
import { CtaBand } from '@/components/home/CtaBand'

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <TriageCards />
      <HowItWorks />
      <ReviewsPreview />
      <CtaBand
        heading="Ready to Get Started?"
        subhead="Book a consult or pay an existing invoice — all online."
        primaryCta={{ label: 'Book a Free Consult', href: '/contact' }}
        secondaryCta={{ label: 'Pay an Invoice', href: '/pay' }}
      />
    </>
  )
}
```

**Step 11: Run tests**

```bash
npm test Hero.test.tsx TriageCards.test.tsx
```

Expected: PASS — 7 tests passing

**Step 12: Commit**

```bash
git add src/components/home/ src/app/page.tsx src/__tests__/
git commit -m "feat: add Home page with Hero, TrustBar, TriageCards, HowItWorks, Reviews, CtaBand"
```

---

### Task 7: Practice Area Pages

**Files:**
- Create: `src/app/practice-areas/page.tsx`
- Create: `src/app/practice-areas/criminal-defense/page.tsx`
- Create: `src/app/practice-areas/estate-planning/page.tsx`
- Create: `src/app/practice-areas/business-law/page.tsx`
- Create: `src/components/practice/PageHero.tsx`
- Create: `src/components/practice/ProcessTimeline.tsx`
- Create: `src/components/practice/FaqAccordion.tsx`
- Create: `src/__tests__/components/practice/FaqAccordion.test.tsx`

**Step 1: Write failing FAQ accordion tests**

`src/__tests__/components/practice/FaqAccordion.test.tsx`:
```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { axe } from 'jest-axe'
import { FaqAccordion } from '@/components/practice/FaqAccordion'

const faqs = [
  { question: 'What should I do if arrested?', answer: 'Remain silent and call an attorney.' },
  { question: 'How much does it cost?', answer: 'Fees vary by matter.' },
]

describe('FaqAccordion', () => {
  it('renders all questions', () => {
    render(<FaqAccordion items={faqs} />)
    expect(screen.getByText('What should I do if arrested?')).toBeInTheDocument()
    expect(screen.getByText('How much does it cost?')).toBeInTheDocument()
  })

  it('answers are hidden by default', () => {
    render(<FaqAccordion items={faqs} />)
    expect(screen.queryByText('Remain silent and call an attorney.')).not.toBeVisible()
  })

  it('expands answer on click', () => {
    render(<FaqAccordion items={faqs} />)
    fireEvent.click(screen.getByText('What should I do if arrested?'))
    expect(screen.getByText('Remain silent and call an attorney.')).toBeVisible()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<FaqAccordion items={faqs} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
```

**Step 2: Run tests to verify they fail**

```bash
npm test FaqAccordion.test.tsx
```

Expected: FAIL

**Step 3: Implement FaqAccordion**

`src/components/practice/FaqAccordion.tsx`:
```typescript
'use client'
import { useState } from 'react'

interface FaqItem {
  question: string
  answer: string
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <dl className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="border border-gray-200 rounded-lg">
          <dt>
            <button
              className="w-full flex justify-between items-center px-5 py-4 text-left font-semibold text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
              aria-expanded={open === i}
              aria-controls={`faq-answer-${i}`}
              onClick={() => setOpen(open === i ? null : i)}
            >
              {item.question}
              <span aria-hidden="true" className="ml-4 text-blue-700 flex-shrink-0">
                {open === i ? '−' : '+'}
              </span>
            </button>
          </dt>
          <dd
            id={`faq-answer-${i}`}
            className={`px-5 pb-4 text-gray-600 text-sm ${open === i ? 'block' : 'hidden'}`}
          >
            {item.answer}
          </dd>
        </div>
      ))}
    </dl>
  )
}
```

**Step 4: Run tests to verify they pass**

```bash
npm test FaqAccordion.test.tsx
```

Expected: PASS

**Step 5: Implement PageHero**

`src/components/practice/PageHero.tsx`:
```typescript
import { Button } from '@/components/ui/Button'

interface PageHeroProps {
  headline: string
  subhead: string
  primaryCta: { label: string; href: string; variant?: 'primary' | 'urgent' }
  secondaryCta?: { label: string; href: string }
  dark?: boolean
}

export function PageHero({ headline, subhead, primaryCta, secondaryCta, dark = true }: PageHeroProps) {
  return (
    <section className={`py-16 px-4 ${dark ? 'bg-blue-900 text-white' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">{headline}</h1>
        <p className={`text-lg mb-8 ${dark ? 'text-gray-200' : 'text-gray-600'}`}>{subhead}</p>
        <div className="flex flex-wrap gap-4">
          <Button variant={primaryCta.variant || 'urgent'} href={primaryCta.href}>
            {primaryCta.label}
          </Button>
          {secondaryCta && (
            <Button variant="secondary" href={secondaryCta.href}
              className={dark ? 'border-white text-white hover:bg-blue-700' : ''}>
              {secondaryCta.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
```

**Step 6: Implement ProcessTimeline**

`src/components/practice/ProcessTimeline.tsx`:
```typescript
interface TimelineStep {
  label: string
  description: string
}

export function ProcessTimeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <ol className="relative border-l-2 border-blue-700 ml-4 space-y-8">
      {steps.map((step, i) => (
        <li key={i} className="pl-6">
          <div className="absolute -left-2.5 w-5 h-5 rounded-full bg-blue-700 flex items-center justify-center">
            <span className="text-white text-xs font-bold">{i + 1}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">{step.label}</h3>
          <p className="text-sm text-gray-600">{step.description}</p>
        </li>
      ))}
    </ol>
  )
}
```

**Step 7: Build Practice Areas hub page**

`src/app/practice-areas/page.tsx`:
```typescript
import { Metadata } from 'next'
import { PageHero } from '@/components/practice/PageHero'
import { Card } from '@/components/ui/Card'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Practice Areas',
  description: 'Criminal defense, estate planning, and business law for Delaware and Pennsylvania clients.',
}

const areas = [
  {
    heading: 'Criminal Defense',
    href: '/practice-areas/criminal-defense',
    description: 'From DUI to serious felonies — immediate representation for defendants in DE and PA.',
    services: ['DUI / Drug Offenses', 'Assault & Theft', 'Expungement', 'White Collar'],
  },
  {
    heading: 'Estate Planning',
    href: '/practice-areas/estate-planning',
    description: 'Wills, trusts, and powers of attorney — in plain language, without the jargon.',
    services: ['Wills & Living Wills', 'Trusts', 'Powers of Attorney', 'Guardianship'],
  },
  {
    heading: 'Business Law',
    href: '/practice-areas/business-law',
    description: 'Formation, contracts, disputes, and ongoing retainer counsel for DE and PA businesses.',
    services: ['LLC / Corp Formation', 'Contract Review', 'Business Disputes', 'Monthly Retainer'],
  },
]

export default function PracticeAreasPage() {
  return (
    <>
      <PageHero
        headline="Three Practice Areas. One Accountable Attorney."
        subhead="Whether you're facing a charge, protecting your family's future, or running a business — DELPALaw is ready."
        primaryCta={{ label: 'Book a Consult', href: '/contact' }}
      />
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {areas.map(area => (
            <Card key={area.href} hover>
              <h2 className="text-xl font-bold mb-2">{area.heading}</h2>
              <p className="text-gray-600 text-sm mb-4">{area.description}</p>
              <ul className="space-y-1 mb-6">
                {area.services.map(s => (
                  <li key={s} className="text-sm text-gray-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-700 flex-shrink-0" aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
              <Link href={area.href} className="text-blue-700 font-semibold text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
                Learn more →
              </Link>
            </Card>
          ))}
        </div>
        <p className="text-center mt-10 text-gray-600 text-sm">
          Not sure where to start?{' '}
          <Link href="/contact" className="text-blue-700 font-semibold hover:underline">
            Contact us and we'll point you in the right direction.
          </Link>
        </p>
      </section>
    </>
  )
}
```

**Step 8: Build Criminal Defense page**

`src/app/practice-areas/criminal-defense/page.tsx`:
```typescript
import { Metadata } from 'next'
import { PageHero } from '@/components/practice/PageHero'
import { ProcessTimeline } from '@/components/practice/ProcessTimeline'
import { FaqAccordion } from '@/components/practice/FaqAccordion'
import { CtaBand } from '@/components/home/CtaBand'

export const metadata: Metadata = {
  title: 'Criminal Defense',
  description: 'Experienced criminal defense attorney in Delaware and Pennsylvania. DUI, drug offenses, assault, expungement. Call now.',
}

const processSteps = [
  { label: 'Arrest / Charge', description: 'You are charged. This is when legal representation matters most.' },
  { label: 'Arraignment', description: 'You enter a plea. Andre advises on the best approach before this hearing.' },
  { label: 'Discovery', description: 'Both sides exchange evidence. Andre reviews everything to build your defense.' },
  { label: 'Negotiation / Motions', description: 'Many cases resolve here through plea negotiations or suppression motions.' },
  { label: 'Trial (if needed)', description: 'If a fair resolution is not possible, Andre takes your case to trial.' },
  { label: 'Resolution', description: 'Sentencing, acquittal, or dismissal — Andre guides you through every outcome.' },
]

const faqs = [
  { question: 'What should I do if I am arrested?', answer: 'Exercise your right to remain silent. Do not answer questions without an attorney present. Call DELPALaw as soon as possible.' },
  { question: 'How quickly can I reach Andre after an arrest?', answer: 'Andre is available for emergency consultations. Call the office directly — do not wait until business hours for an urgent situation.' },
  { question: 'How much does criminal defense cost in Delaware or Pennsylvania?', answer: 'Fees are typically flat-rate and depend on the charges and complexity. Andre will give you a clear quote during your consult — no hidden fees.' },
  { question: 'Can I get an expungement in Delaware or Pennsylvania?', answer: 'Expungement eligibility depends on the offense, outcome, and time elapsed. Many misdemeanors and dismissed charges qualify. Ask Andre during your consult.' },
  { question: 'What is the difference between a misdemeanor and a felony?', answer: 'Misdemeanors are less serious offenses typically punishable by up to one year in jail. Felonies carry heavier penalties including potential prison time. Both benefit from early legal representation.' },
]

export default function CriminalDefensePage() {
  return (
    <>
      <PageHero
        headline="Charged With a Crime in Delaware or Pennsylvania?"
        subhead="Every hour matters. Get an experienced criminal defense attorney on your side — today."
        primaryCta={{ label: `Call Now: ${process.env.NEXT_PUBLIC_PHONE_NUMBER || '[Phone TBD]'}`, href: `tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}` }}
        secondaryCta={{ label: 'Book Emergency Consult', href: '/contact' }}
      />

      {/* What to do right now */}
      <section className="py-12 px-4 bg-yellow-50 border-l-4 border-gold-700">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">What to Do Right Now</h2>
          <ol className="space-y-2 text-sm text-gray-800">
            <li className="flex gap-3"><span className="font-bold text-blue-700">1.</span> Stay calm. Do not resist or argue.</li>
            <li className="flex gap-3"><span className="font-bold text-blue-700">2.</span> Exercise your right to remain silent — do not answer questions.</li>
            <li className="flex gap-3"><span className="font-bold text-blue-700">3.</span> Do not consent to a search of your person, car, or home.</li>
            <li className="flex gap-3"><span className="font-bold text-blue-700">4.</span> Ask for an attorney immediately and do not speak until one is present.</li>
            <li className="flex gap-3"><span className="font-bold text-blue-700">5.</span> Call DELPALaw as soon as you are able.</li>
          </ol>
        </div>
      </section>

      {/* Charges we handle */}
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Charges We Handle</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {['DUI / DWI', 'Drug Offenses', 'Assault & Battery', 'Theft & Robbery', 'White Collar Crime', 'Expungement'].map(charge => (
            <div key={charge} className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium text-gray-800">
              {charge}
            </div>
          ))}
        </div>
      </section>

      {/* Process timeline */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">The Defense Process</h2>
          <ProcessTimeline steps={processSteps} />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Criminal Defense FAQ</h2>
        <FaqAccordion items={faqs} />
      </section>

      <CtaBand
        heading="Don't Wait. Your Defense Starts Now."
        subhead="Call or book an emergency consult — available when it matters most."
        primaryCta={{ label: 'Book Emergency Consult', href: '/contact' }}
        secondaryCta={{ label: `Call: ${process.env.NEXT_PUBLIC_PHONE_NUMBER || '[Phone TBD]'}`, href: `tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}` }}
      />
    </>
  )
}
```

**Step 9: Build Estate Planning and Business Law pages** (same structure as criminal defense, adapted content — use design doc for copy)

Create `src/app/practice-areas/estate-planning/page.tsx` and `src/app/practice-areas/business-law/page.tsx` following the same pattern: PageHero → content sections → FaqAccordion → CtaBand.

Reference `docs/plans/2026-02-19-delpalaw-design.md` for exact copy blocks, section outlines, and microcopy for each page.

**Step 10: Run all tests**

```bash
npm test
```

Expected: all PASS

**Step 11: Commit**

```bash
git add src/app/practice-areas/ src/components/practice/ src/__tests__/
git commit -m "feat: add Practice Areas hub and Criminal Defense, Estate Planning, Business Law pages"
```

---

### Task 8: Contact / Intake Form with Speech-to-Text

**Files:**
- Create: `src/app/contact/page.tsx`
- Create: `src/components/intake/IntakeForm.tsx`
- Create: `src/components/intake/SpeechInput.tsx`
- Create: `src/__tests__/components/intake/IntakeForm.test.tsx`
- Create: `src/__tests__/components/intake/SpeechInput.test.tsx`

**Step 1: Write failing IntakeForm tests**

`src/__tests__/components/intake/IntakeForm.test.tsx`:
```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { IntakeForm } from '@/components/intake/IntakeForm'

describe('IntakeForm', () => {
  it('renders all required fields', () => {
    render(<IntakeForm />)
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/practice area/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/tell us what.s going on/i)).toBeInTheDocument()
  })

  it('shows validation errors on empty submit', async () => {
    render(<IntakeForm />)
    fireEvent.click(screen.getByRole('button', { name: /send my intake request/i }))
    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument()
    })
  })

  it('submit button is labeled correctly', () => {
    render(<IntakeForm />)
    expect(screen.getByRole('button', { name: /send my intake request/i })).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<IntakeForm />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
```

**Step 2: Write failing SpeechInput tests**

`src/__tests__/components/intake/SpeechInput.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import { SpeechInput } from '@/components/intake/SpeechInput'

describe('SpeechInput', () => {
  it('renders textarea as fallback', () => {
    render(<SpeechInput value="" onChange={() => {}} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('shows consent notice before recording starts', () => {
    render(<SpeechInput value="" onChange={() => {}} />)
    // Consent notice should be visible in the UI
    expect(screen.getByText(/don.t include sensitive details/i)).toBeInTheDocument()
  })
})
```

**Step 3: Run to verify they fail**

```bash
npm test IntakeForm.test.tsx SpeechInput.test.tsx
```

Expected: FAIL

**Step 4: Implement SpeechInput**

`src/components/intake/SpeechInput.tsx`:
```typescript
'use client'
import { useState, useRef, useEffect } from 'react'

interface SpeechInputProps {
  value: string
  onChange: (value: string) => void
  id?: string
}

export function SpeechInput({ value, onChange, id = 'description' }: SpeechInputProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setIsSupported('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)
  }, [])

  const startRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = false
    recognition.lang = 'en-US'

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(r => r[0].transcript)
        .join(' ')
      onChange(value ? `${value} ${transcript}` : transcript)
    }

    recognition.onerror = () => stopRecording()

    recognitionRef.current = recognition
    recognition.start()
    setIsRecording(true)
    setSeconds(0)
    timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000)
  }

  const stopRecording = () => {
    recognitionRef.current?.stop()
    if (timerRef.current) clearInterval(timerRef.current)
    setIsRecording(false)
  }

  const deleteTranscript = () => {
    stopRecording()
    onChange('')
  }

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

  return (
    <div>
      {/* Consent notice */}
      <p className="text-xs text-gray-500 mb-2">
        Don&apos;t include sensitive details like SSNs, account numbers, or anything you wouldn&apos;t put in an email.
      </p>

      {/* Textarea */}
      <textarea
        id={id}
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={4}
        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
        placeholder="Tell us what's going on — in your own words"
      />

      {/* Speech controls */}
      {isSupported && (
        <div className="flex items-center gap-3 mt-2">
          {!isRecording ? (
            <button
              type="button"
              onClick={startRecording}
              className="flex items-center gap-2 text-sm text-blue-700 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              aria-label="Start voice recording"
            >
              🎤 Speak instead of typing
            </button>
          ) : (
            <>
              <span className="flex items-center gap-2 text-sm text-red-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" aria-hidden="true" />
                Recording {formatTime(seconds)}
              </span>
              <button
                type="button"
                onClick={stopRecording}
                className="text-sm text-gray-700 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              >
                Stop
              </button>
            </>
          )}
          {value && (
            <button
              type="button"
              onClick={deleteTranscript}
              className="text-sm text-red-600 hover:underline focus:outline-none focus:ring-2 focus:ring-red-500 rounded ml-auto"
            >
              Delete transcript
            </button>
          )}
        </div>
      )}
    </div>
  )
}
```

**Step 5: Implement IntakeForm**

`src/components/intake/IntakeForm.tsx`:
```typescript
'use client'
import { useState } from 'react'
import { SpeechInput } from './SpeechInput'
import { Button } from '@/components/ui/Button'

interface FormData {
  name: string
  phone: string
  email: string
  practiceArea: string
  description: string
  contactMethod: string
  bestTime: string
}

interface FormErrors {
  name?: string
  email?: string
  practiceArea?: string
}

const INITIAL: FormData = {
  name: '', phone: '', email: '', practiceArea: '',
  description: '', contactMethod: 'email', bestTime: '',
}

export function IntakeForm() {
  const [form, setForm] = useState<FormData>(INITIAL)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const validate = (): boolean => {
    const e: FormErrors = {}
    if (!form.name.trim()) e.name = 'Name is required.'
    if (!form.email.trim()) e.email = 'Email is required.'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email address.'
    if (!form.practiceArea) e.practiceArea = 'Please select a practice area.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    // TODO: wire to API route or form service (e.g. Formspree, Resend)
    await new Promise(r => setTimeout(r, 800)) // placeholder
    setSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div role="alert" className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <p className="text-lg font-semibold text-green-800 mb-2">Got it.</p>
        <p className="text-sm text-green-700">
          Andre will be in touch shortly. If this is urgent, call{' '}
          <a href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`} className="font-semibold underline">
            {process.env.NEXT_PUBLIC_PHONE_NUMBER || '[Phone TBD]'}
          </a>{' '}
          now.
        </p>
      </div>
    )
  }

  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }))

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-1">
          Name <span aria-hidden="true" className="text-red-600">*</span>
        </label>
        <input
          id="name" type="text" value={form.name} onChange={set('name')}
          autoComplete="name" required
          className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-600' : 'border-gray-200'}`}
        />
        {errors.name && <p role="alert" className="text-xs text-red-600 mt-1">{errors.name}</p>}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-1">Phone</label>
        <input
          id="phone" type="tel" value={form.phone} onChange={set('phone')}
          autoComplete="tel"
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-1">
          Email <span aria-hidden="true" className="text-red-600">*</span>
        </label>
        <input
          id="email" type="email" value={form.email} onChange={set('email')}
          autoComplete="email" required
          className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-600' : 'border-gray-200'}`}
        />
        {errors.email && <p role="alert" className="text-xs text-red-600 mt-1">{errors.email}</p>}
      </div>

      {/* Practice area */}
      <div>
        <label htmlFor="practiceArea" className="block text-sm font-medium text-gray-900 mb-1">
          Practice Area <span aria-hidden="true" className="text-red-600">*</span>
        </label>
        <select
          id="practiceArea" value={form.practiceArea} onChange={set('practiceArea')} required
          className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${errors.practiceArea ? 'border-red-600' : 'border-gray-200'}`}
        >
          <option value="">Select...</option>
          <option value="criminal">Criminal Defense</option>
          <option value="estate">Estate Planning</option>
          <option value="business">Business Law</option>
          <option value="unsure">Not sure</option>
        </select>
        {errors.practiceArea && <p role="alert" className="text-xs text-red-600 mt-1">{errors.practiceArea}</p>}
      </div>

      {/* Description with speech input */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-900 mb-1">
          Tell us what&apos;s going on — in your own words
        </label>
        <SpeechInput
          id="description"
          value={form.description}
          onChange={v => setForm(f => ({ ...f, description: v }))}
        />
      </div>

      {/* Preferred contact */}
      <div>
        <fieldset>
          <legend className="text-sm font-medium text-gray-900 mb-2">Preferred contact method</legend>
          <div className="flex gap-4">
            {['email', 'phone'].map(method => (
              <label key={method} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="radio" name="contactMethod" value={method}
                  checked={form.contactMethod === method}
                  onChange={set('contactMethod')}
                  className="focus:ring-blue-500"
                />
                {method.charAt(0).toUpperCase() + method.slice(1)}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Best time */}
      <div>
        <label htmlFor="bestTime" className="block text-sm font-medium text-gray-900 mb-1">Best time to reach you</label>
        <select
          id="bestTime" value={form.bestTime} onChange={set('bestTime')}
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">No preference</option>
          <option value="morning">Morning (9am–12pm)</option>
          <option value="afternoon">Afternoon (12pm–5pm)</option>
          <option value="evening">Evening (5pm–8pm)</option>
        </select>
      </div>

      {/* Confidentiality note */}
      <p className="text-xs text-gray-500">
        🔒 Confidential inquiry. Attorney-client privilege attaches upon engagement. We will never spam you.
      </p>

      <Button type="submit" variant="primary" disabled={submitting} className="w-full">
        {submitting ? 'Sending...' : 'Send My Intake Request'}
      </Button>
    </form>
  )
}
```

**Step 6: Build Contact page**

`src/app/contact/page.tsx`:
```typescript
import { Metadata } from 'next'
import { IntakeForm } from '@/components/intake/IntakeForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: "Tell Andre what's going on. He'll follow up within one business day.",
}

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">Let&apos;s Talk About Your Situation.</h1>
      <p className="text-gray-600 mb-8">
        Fill out the form below and Andre will follow up within one business day — usually sooner.
        Prefer to call?{' '}
        <a href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`} className="text-blue-700 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
          {process.env.NEXT_PUBLIC_PHONE_NUMBER || '[Phone TBD]'}
        </a>
      </p>

      <IntakeForm />

      <div className="mt-10 border-t border-gray-200 pt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">What Happens Next</h2>
        <ol className="space-y-3">
          {[
            'Submit your intake form.',
            'Andre reviews your situation.',
            'You hear back within one business day — often sooner.',
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
              <span className="w-6 h-6 rounded-full bg-blue-700 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
```

**Step 7: Run tests**

```bash
npm test IntakeForm.test.tsx SpeechInput.test.tsx
```

Expected: PASS

**Step 8: Commit**

```bash
git add src/app/contact/ src/components/intake/ src/__tests__/
git commit -m "feat: add Contact page with IntakeForm and SpeechInput speech-to-text"
```

---

### Task 9: Payments — Stripe Integration

**Files:**
- Create: `src/lib/stripe.ts`
- Create: `src/app/api/stripe/checkout/route.ts`
- Create: `src/app/api/stripe/webhook/route.ts`
- Create: `src/app/pay/page.tsx`
- Create: `src/app/pay/[type]/page.tsx`
- Create: `src/app/payment-confirmation/page.tsx`
- Create: `src/components/payments/PaymentCards.tsx`
- Create: `src/__tests__/lib/stripe.test.ts`
- Create: `src/__tests__/api/stripe-checkout.test.ts`

**Step 1: Write failing Stripe lib tests**

`src/__tests__/lib/stripe.test.ts`:
```typescript
import { buildCheckoutSession } from '@/lib/stripe'

describe('buildCheckoutSession', () => {
  it('builds flat-fee session with correct mode', () => {
    const params = buildCheckoutSession({
      type: 'flat-fee',
      serviceLabel: 'Will Drafting',
      amount: 75000, // cents
      email: 'client@example.com',
    })
    expect(params.mode).toBe('payment')
    expect(params.line_items[0].price_data.unit_amount).toBe(75000)
    expect(params.line_items[0].price_data.product_data.name).toBe('Will Drafting')
  })

  it('builds subscription session with recurring mode', () => {
    const params = buildCheckoutSession({
      type: 'subscription',
      serviceLabel: 'Business Counsel Monthly',
      amount: 50000,
      email: 'client@example.com',
    })
    expect(params.mode).toBe('subscription')
    expect(params.line_items[0].price_data.recurring).toEqual({ interval: 'month' })
  })

  it('builds retainer session with payment mode', () => {
    const params = buildCheckoutSession({
      type: 'retainer',
      serviceLabel: 'Retainer Deposit',
      amount: 200000,
      email: 'client@example.com',
    })
    expect(params.mode).toBe('payment')
  })
})
```

**Step 2: Run to verify they fail**

```bash
npm test stripe.test.ts
```

Expected: FAIL

**Step 3: Implement Stripe lib**

`src/lib/stripe.ts`:
```typescript
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

type PaymentType = 'flat-fee' | 'retainer' | 'subscription'

interface CheckoutParams {
  type: PaymentType
  serviceLabel: string
  amount: number // cents
  email: string
}

export function buildCheckoutSession(params: CheckoutParams): Stripe.Checkout.SessionCreateParams {
  const { type, serviceLabel, amount, email } = params
  const isSubscription = type === 'subscription'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const priceData: Stripe.Checkout.SessionCreateParams.LineItem['price_data'] = {
    currency: 'usd',
    unit_amount: amount,
    product_data: {
      name: serviceLabel,
      description: type === 'retainer'
        ? 'Retainer deposit — unearned funds returned per applicable bar rules.'
        : undefined,
    },
    ...(isSubscription ? { recurring: { interval: 'month' } } : {}),
  }

  return {
    mode: isSubscription ? 'subscription' : 'payment',
    customer_email: email,
    line_items: [{ price_data: priceData, quantity: 1 }],
    success_url: `${siteUrl}/payment-confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/pay`,
    metadata: { payment_type: type },
  }
}
```

**Step 4: Run to verify tests pass**

```bash
npm test stripe.test.ts
```

Expected: PASS

**Step 5: Implement checkout API route**

`src/app/api/stripe/checkout/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { stripe, buildCheckoutSession } from '@/lib/stripe'
import { z } from 'zod'

const schema = z.object({
  type: z.enum(['flat-fee', 'retainer', 'subscription']),
  serviceLabel: z.string().min(1).max(200),
  amount: z.number().int().positive().max(10_000_00), // max $10,000
  email: z.string().email(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const sessionParams = buildCheckoutSession(parsed.data)
    const session = await stripe.checkout.sessions.create(sessionParams)

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 })
  }
}
```

Note: Install `zod` — `npm install zod`.

**Step 6: Implement webhook handler**

`src/app/api/stripe/webhook/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Handle events
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      // TODO: send confirmation email via Resend/SendGrid
      console.log('Payment complete:', session.id, session.customer_email)
      break
    }
    case 'customer.subscription.deleted': {
      // TODO: notify Andre of cancellation
      break
    }
  }

  return NextResponse.json({ received: true })
}
```

**Step 7: Implement PaymentCards component**

`src/components/payments/PaymentCards.tsx`:
```typescript
'use client'
import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

const FLAT_FEE_SERVICES = [
  { label: 'Simple Will', amount: 0 },           // TBD from competitive analysis
  { label: 'DUI Defense Consultation', amount: 0 },
  { label: 'LLC Formation', amount: 0 },
  { label: 'Contract Review', amount: 0 },
  { label: 'Expungement Filing', amount: 0 },
]

// Amount 0 = "contact for pricing" — updated once competitive analysis is done

function CheckoutButton({ type, serviceLabel, amount, email, label }: {
  type: 'flat-fee' | 'retainer' | 'subscription'
  serviceLabel: string
  amount: number
  email: string
  label: string
}) {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, serviceLabel, amount, email }),
    })
    const data = await res.json()
    if (data.url) window.location.href = data.url
    else setLoading(false)
  }

  return (
    <Button variant="primary" onClick={handleClick} disabled={loading}>
      {loading ? 'Redirecting...' : label}
    </Button>
  )
}

export function PaymentCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Flat fee */}
      <Card>
        <h2 className="text-xl font-bold mb-1">Flat Fee</h2>
        <p className="text-sm text-gray-600 mb-4">Pay for a specific service</p>
        <p className="text-xs text-gray-500 mb-4">
          Select your service below or enter a custom amount from your invoice.
        </p>
        <Button variant="primary" href="/pay/flat-fee">Pay for a Service</Button>
      </Card>

      {/* Retainer */}
      <Card>
        <h2 className="text-xl font-bold mb-1">Retainer</h2>
        <p className="text-sm text-gray-600 mb-4">Pay your retainer deposit</p>
        <p className="text-xs text-gray-500 mb-4">
          Use the amount Andre quoted you, or enter your invoice amount.
        </p>
        <Button variant="primary" href="/pay/retainer">Pay My Retainer</Button>
      </Card>

      {/* Subscription */}
      <Card>
        <h2 className="text-xl font-bold mb-1">Business Counsel Plan</h2>
        <p className="text-sm text-gray-600 mb-4">Monthly ongoing legal counsel</p>
        <p className="text-xs text-gray-500 mb-4">
          Cancel anytime. No contracts, no surprise invoices.
        </p>
        <Button variant="primary" href="/pay/subscription">Start Monthly Plan</Button>
      </Card>
    </div>
  )
}
```

**Step 8: Build Pay Online page**

`src/app/pay/page.tsx`:
```typescript
import { Metadata } from 'next'
import { PaymentCards } from '@/components/payments/PaymentCards'

export const metadata: Metadata = {
  title: 'Pay Online',
  description: 'Pay your invoice, retainer, or start a monthly business counsel subscription securely online.',
}

export default function PayPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">Pay Your Invoice or Retainer Securely Online.</h1>
      <p className="text-gray-600 mb-10">
        Simple, secure checkout powered by Stripe. Questions?{' '}
        <a href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`} className="text-blue-700 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
          Call {process.env.NEXT_PUBLIC_PHONE_NUMBER || '[Phone TBD]'}
        </a>
      </p>

      <PaymentCards />

      {/* Trust bar */}
      <div className="flex flex-wrap justify-center gap-6 mt-10 py-6 border-t border-gray-200">
        {['🔒 Stripe secure checkout', '256-bit SSL encryption', '📧 Email receipt included', 'No card data stored by DELPALaw'].map(item => (
          <span key={item} className="text-xs text-gray-500">{item}</span>
        ))}
      </div>

      {/* Refund policy */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6 text-sm text-gray-600">
        <h2 className="font-semibold text-gray-900 mb-2">Refund & Cancellation Policy</h2>
        <ul className="space-y-1 list-disc list-inside">
          <li><strong>Flat fee:</strong> Non-refundable once work has commenced. If engagement has not started, refund within 5 business days upon written request.</li>
          <li><strong>Retainer:</strong> Unearned retainer funds returned within 30 days of matter closing, per applicable bar rules.</li>
          <li><strong>Subscription:</strong> Cancel anytime before next billing date. No partial-month refunds. Access continues through end of billing period.</li>
        </ul>
      </div>
    </div>
  )
}
```

**Step 9: Build payment-confirmation page**

`src/app/payment-confirmation/page.tsx`:
```typescript
import { Metadata } from 'next'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = { title: 'Payment Received' }

export default function PaymentConfirmationPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
        <span className="text-3xl">✓</span>
      </div>
      <h1 className="text-2xl font-bold mb-3">Payment Received.</h1>
      <p className="text-gray-600 mb-6">
        You&apos;ll receive a receipt at your email address. Andre will follow up to confirm next steps.
      </p>
      <p className="text-sm text-gray-500 mb-8">
        Questions? Call{' '}
        <a href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`} className="text-blue-700 hover:underline">
          {process.env.NEXT_PUBLIC_PHONE_NUMBER || '[Phone TBD]'}
        </a>
      </p>
      <Button variant="primary" href="/">Back to Home</Button>
    </div>
  )
}
```

**Step 10: Run all tests**

```bash
npm test
```

Expected: all PASS

**Step 11: Commit**

```bash
git add src/lib/ src/app/api/stripe/ src/app/pay/ src/app/payment-confirmation/ src/components/payments/ src/__tests__/
git commit -m "feat: add Stripe payments — flat fee, retainer, subscription flows"
```

---

### Task 10: Chat Assistant with Safety Guardrails

**Files:**
- Create: `src/lib/chat-guardrails.ts`
- Create: `src/app/api/chat/route.ts`
- Create: `src/components/chat/ChatWidget.tsx`
- Create: `src/components/chat/ChatMessage.tsx`
- Create: `src/__tests__/lib/chat-guardrails.test.ts`
- Create: `src/__tests__/api/chat.test.ts`

**Step 1: Write failing guardrails tests**

`src/__tests__/lib/chat-guardrails.test.ts`:
```typescript
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
```

**Step 2: Run to verify they fail**

```bash
npm test chat-guardrails.test.ts
```

Expected: FAIL

**Step 3: Implement guardrails**

`src/lib/chat-guardrails.ts`:
```typescript
export type RiskLevel = 'urgent' | 'crisis' | null

const URGENT_PATTERNS = [
  /\barrested\b/i, /\bin custody\b/i, /\bcourt (today|tomorrow|tonight)\b/i,
  /\bwarrant\b/i, /\bhearing (today|tomorrow)\b/i, /\bjust got charged\b/i,
]

const CRISIS_PATTERNS = [
  /hurt(ing)? myself/i, /end my life/i, /suicid/i, /don.t want to (be here|live)/i,
]

const ADVICE_PATTERNS = [
  /should I (plead|take the deal|confess|admit)/i,
  /will I win/i, /what (are|are my) (my )?(chances|odds)/i,
  /what should I tell the police/i,
  /how (do I|can I) (hide|conceal|get rid of)/i,
  /should I (ignore|not respond to) the (lawsuit|subpoena|summons)/i,
  /is this (illegal|a crime|fraud|considered)/i,
  /can (I|you) get (out of|away with)/i,
]

export function detectRiskTriggers(message: string): RiskLevel {
  if (CRISIS_PATTERNS.some(p => p.test(message))) return 'crisis'
  if (URGENT_PATTERNS.some(p => p.test(message))) return 'urgent'
  return null
}

export function isLegalAdviceRequest(message: string): boolean {
  return ADVICE_PATTERNS.some(p => p.test(message))
}

export function getRiskResponse(level: RiskLevel): string | null {
  if (level === 'crisis') {
    return "I'm concerned about what you shared. Please reach out for support right now: call or text 988 (Suicide & Crisis Lifeline). I'm not equipped to help with this, but they are — 24/7."
  }
  if (level === 'urgent') {
    return "This sounds urgent. Please call Andre directly rather than waiting for a callback — every hour can matter in a situation like this."
  }
  return null
}

export function getAdviceRefusal(message: string): string | null {
  if (!isLegalAdviceRequest(message)) return null
  if (/plead (guilty|not guilty)/i.test(message)) {
    return "That's a decision only you and your attorney can make together — it depends on facts specific to your case. Andre can walk you through your options in a consult."
  }
  if (/win|chances|odds/i.test(message)) {
    return "I can't predict outcomes — no one honestly can. What I can tell you is that early counsel improves your position. Want to book a consult?"
  }
  if (/tell the police/i.test(message)) {
    return "I can't advise on that. What I can say is that you have the right to remain silent and the right to an attorney. If you need immediate guidance, call Andre now."
  }
  if (/hide|conceal/i.test(message)) {
    return "That's not something I can help with — and it's not something DELPALaw advises on. Is there something else I can help you with?"
  }
  return "I'm here to help with general information and to connect you with Andre — I'm not able to give legal advice. Want to book a consult or have me answer a general question?"
}

export const SYSTEM_PROMPT = `You are a helpful assistant for DELPALaw, a law firm serving Delaware and Pennsylvania. Andre Jerry is the attorney.

You can:
- Explain what each practice area covers in plain language
- Answer general "how does the process work" questions
- Help visitors identify which practice area fits their situation
- Collect name, email, and practice area interest to route to intake
- Surface next steps: call, book a consult, submit intake, or pay invoice

You CANNOT:
- Give legal advice of any kind
- Predict outcomes or probabilities
- Advise on whether to plead guilty or take a deal
- Tell someone what to say to police, prosecutors, or courts
- Advise on concealment, evasion, or destruction of evidence
- Make determinations about whether something is legal or illegal

When you don't know something specific to a case: "That depends on specifics I don't have — Andre can advise you directly in a consult."

Always end responses with a clear next step: book a consult, call, submit intake form, or ask another question.

Tone: credible, calm, direct, boundaried. Short sentences. No legalese. No hedging filler.

Phone: ${process.env.NEXT_PUBLIC_PHONE_NUMBER || '[Phone TBD]'}
Book a consult: [site URL]/contact
Pay online: [site URL]/pay`
```

**Step 4: Run guardrails tests to verify they pass**

```bash
npm test chat-guardrails.test.ts
```

Expected: PASS — 9 tests passing

**Step 5: Implement chat API route**

`src/app/api/chat/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { detectRiskTriggers, getAdviceRefusal, getRiskResponse, SYSTEM_PROMPT } from '@/lib/chat-guardrails'
import { z } from 'zod'

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
      max_tokens: 400,
      system: SYSTEM_PROMPT,
      messages: messages.map(m => ({ role: m.role, content: m.content })),
    })

    const content = response.content[0].type === 'text' ? response.content[0].text : ''

    return NextResponse.json({ content })
  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json(
      { content: "I'm having trouble connecting right now. Please call Andre directly or submit an intake form." },
      { status: 200 } // return 200 so client shows graceful message
    )
  }
}
```

**Step 6: Implement ChatMessage**

`src/components/chat/ChatMessage.tsx`:
```typescript
interface ChatMessageProps {
  role: 'user' | 'assistant'
  content: string
  isUrgent?: boolean
}

export function ChatMessage({ role, content, isUrgent }: ChatMessageProps) {
  const isUser = role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`
        max-w-[85%] rounded-lg px-4 py-3 text-sm leading-relaxed
        ${isUser
          ? 'bg-blue-700 text-white'
          : isUrgent
            ? 'bg-yellow-50 border border-gold-500 text-gray-900'
            : 'bg-gray-100 text-gray-900'
        }
      `}>
        {content}
      </div>
    </div>
  )
}
```

**Step 7: Implement ChatWidget**

`src/components/chat/ChatWidget.tsx`:
```typescript
'use client'
import { useState, useRef, useEffect } from 'react'
import { ChatMessage } from './ChatMessage'
import { Button } from '@/components/ui/Button'

interface Message {
  role: 'user' | 'assistant'
  content: string
  isUrgent?: boolean
}

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content: "Hi, I'm here to help with general questions about DELPALaw's services. What brings you here today?",
}

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMessage: Message = { role: 'user', content: text }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: newMessages.map(m => ({ role: m.role, content: m.content })),
      }),
    })

    const data = await res.json()
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: data.content,
      isUrgent: data.risk === 'urgent',
    }])
    setLoading(false)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-blue-700 text-white shadow-lg flex items-center justify-center hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label={open ? 'Close chat' : 'Open chat assistant'}
        aria-expanded={open}
      >
        {open ? '✕' : '💬'}
      </button>

      {/* Chat window */}
      {open && (
        <div
          className="absolute bottom-16 right-0 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col"
          style={{ height: '420px' }}
          role="dialog"
          aria-label="DELPALaw chat assistant"
        >
          {/* Header */}
          <div className="bg-blue-900 text-white px-4 py-3 rounded-t-xl flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm">DELPALaw Assistant</p>
              <p className="text-xs text-gray-300">General info only — not legal advice</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3">
            {messages.map((m, i) => (
              <ChatMessage key={i} role={m.role} content={m.content} isUrgent={m.isUrgent} />
            ))}
            {loading && (
              <div className="flex justify-start mb-3">
                <div className="bg-gray-100 rounded-lg px-4 py-3 text-sm text-gray-500">
                  Typing...
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick links */}
          <div className="px-3 pb-2 flex gap-2 flex-wrap">
            {['Book a consult', 'Pay invoice'].map(label => (
              <a
                key={label}
                href={label === 'Book a consult' ? '/contact' : '/pay'}
                className="text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-3 py-1 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 px-3 py-3 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask a question..."
              className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Type your message"
            />
            <button
              onClick={send}
              disabled={!input.trim() || loading}
              className="bg-blue-700 text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-blue-900 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Send message"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
```

**Step 8: Add ChatWidget to layout**

In `src/app/layout.tsx`, add after `<Footer />`:
```typescript
import { ChatWidget } from '@/components/chat/ChatWidget'
// ...
<ChatWidget />
```

**Step 9: Run all tests**

```bash
npm test
```

Expected: all PASS

**Step 10: Commit**

```bash
git add src/lib/chat-guardrails.ts src/app/api/chat/ src/components/chat/ src/__tests__/ src/app/layout.tsx
git commit -m "feat: add chat assistant with safety guardrails and speech-to-text intake"
```

---

### Task 11: Remaining Pages

**Files:**
- Create: `src/app/about/page.tsx`
- Create: `src/app/reviews/page.tsx`
- Create: `src/app/faq/page.tsx`
- Create: `src/app/service-areas/page.tsx`
- Create: `src/app/privacy/page.tsx`
- Create: `src/app/terms/page.tsx`
- Create: `src/app/disclaimer/page.tsx`

**Step 1: About page**

`src/app/about/page.tsx` — use design doc blueprint: headline "A Lawyer Who Picks Up the Phone", subhead, story section, credentials placeholder, 3-column comparison (DELPALaw vs large firm), associations placeholder, personal quote placeholder, CTA band.

**Step 2: Reviews page**

`src/app/reviews/page.tsx` — headline "What DELPALaw Clients Are Saying", Google review aggregate placeholder, featured testimonial cards (placeholder copy), "Leave a review" CTA, outcome summaries block (placeholder with bar-rules caveat).

**Step 3: FAQ page**

`src/app/faq/page.tsx` — general FAQ with 10 questions using `FaqAccordion`, links to practice-area FAQs.

General FAQ questions (from design doc):
- How do I know if I need a lawyer?
- How much does it cost to hire DELPALaw?
- What happens during a consultation?
- Do you offer payment plans?
- Are you licensed in both Delaware and Pennsylvania?
- How quickly can I get an appointment?
- What information should I bring to my first consult?
- Can I handle my legal matter remotely?
- What areas of law does DELPALaw handle?
- How do I pay?

**Step 4: Service Areas page**

`src/app/service-areas/page.tsx` — Delaware cities list (Wilmington, Dover, Newark, Middletown, Smyrna), Pennsylvania cities (Philadelphia, Chester County, Delaware County, Montgomery County), remote consultations callout, CTA band.

**Step 5: Legal pages**

- `src/app/privacy/page.tsx` — data collection, retention, third-party tools (Stripe, AI, scheduling), cookie policy
- `src/app/terms/page.tsx` — no attorney-client relationship from site use, limitation of liability
- `src/app/disclaimer/page.tsx` — full attorney advertising disclaimer

All legal pages: include "Last updated" date, link to other legal pages, "Questions? Contact us" link.

**Step 6: Add FAQ schema to FAQ pages**

In each FAQ page, add JSON-LD structured data for Google rich results:
```typescript
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
}
// In page component:
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
```

**Step 7: Commit**

```bash
git add src/app/about/ src/app/reviews/ src/app/faq/ src/app/service-areas/ src/app/privacy/ src/app/terms/ src/app/disclaimer/
git commit -m "feat: add About, Reviews, FAQ, Service Areas, and legal pages"
```

---

### Task 12: SEO, Metadata, and Analytics

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Create: `public/site.webmanifest`

**Step 1: Add per-page metadata**

Each page already exports `metadata` — verify all pages have:
- `title` (uses `%s | DELPALaw` template from root layout)
- `description` (unique, keyword-rich, 150–160 chars)

**Step 2: Add Open Graph metadata to root layout**

```typescript
export const metadata: Metadata = {
  // ... existing
  openGraph: {
    type: 'website',
    siteName: 'DELPALaw',
    locale: 'en_US',
  },
  robots: { index: true, follow: true },
}
```

**Step 3: Generate sitemap**

`src/app/sitemap.ts`:
```typescript
import { MetadataRoute } from 'next'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://delpalaw.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '', '/about', '/practice-areas',
    '/practice-areas/criminal-defense',
    '/practice-areas/estate-planning',
    '/practice-areas/business-law',
    '/service-areas', '/reviews', '/faq', '/contact', '/pay',
  ]
  return routes.map(route => ({
    url: `${BASE}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }))
}
```

**Step 4: Add robots.txt**

`src/app/robots.ts`:
```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/payment-confirmation'] },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  }
}
```

**Step 5: Verify build**

```bash
npm run build
```

Expected: build completes with no errors.

**Step 6: Commit**

```bash
git add src/app/sitemap.ts src/app/robots.ts src/app/layout.tsx public/
git commit -m "feat: add sitemap, robots.txt, and Open Graph metadata"
```

---

### Task 13: Accessibility Audit Pass

**Files:** Any components that fail axe checks.

**Step 1: Run axe audit across all test files**

```bash
npm test -- --testPathPattern="test.tsx"
```

Expected: all PASS with no axe violations.

**Step 2: Manual keyboard navigation check**

Start dev server and verify:
- Tab order is logical on every page
- All interactive elements have visible focus rings
- Skip-to-main link works (add if missing)
- All images have appropriate `alt` text
- All form fields have associated labels
- Error messages are announced via `role="alert"`

**Step 3: Add skip-to-main link**

In `src/app/layout.tsx`, before `<Header>`:
```typescript
<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white text-blue-700 px-4 py-2 rounded font-semibold z-50">
  Skip to main content
</a>
```

**Step 4: Commit**

```bash
git add src/
git commit -m "a11y: add skip-to-main link and resolve any accessibility violations"
```

---

### Task 14: Deployment

**Files:**
- Create: `vercel.json`

**Step 1: Configure Vercel environment variables**

In Vercel dashboard (or via `vercel env add`):
```
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ANTHROPIC_API_KEY
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_PHONE_NUMBER
NEXT_PUBLIC_EMAIL
```

**Step 2: Create vercel.json**

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(self), geolocation=()" }
      ]
    }
  ]
}
```

Note: `microphone=(self)` allows Web Speech API on the site's own origin.

**Step 3: Final build check**

```bash
npm run build && npm run start
```

Verify all pages load, Stripe checkout redirects work in test mode, chat widget works.

**Step 4: Configure Stripe webhook**

In Stripe Dashboard → Webhooks → Add endpoint:
- URL: `https://[your-vercel-url]/api/stripe/webhook`
- Events: `checkout.session.completed`, `customer.subscription.deleted`
- Copy webhook secret → add to Vercel env vars

**Step 5: Deploy**

```bash
npx vercel --prod
```

**Step 6: Final commit**

```bash
git add vercel.json
git commit -m "feat: add Vercel deployment config with security headers"
```

---

## Open Items (to complete after competitive analysis)

- [ ] Update pricing amounts in `PaymentCards` and practice area pages
- [ ] Replace placeholder reviews with real Google review embeds or static cards
- [ ] Add real headshot of Andre Jerry to Hero and About page
- [ ] Fill in bar admissions, associations, and award badges
- [ ] Set real phone number, email in `.env.local`
- [ ] Choose and integrate scheduling tool (Calendly or Cal.com embed on contact page)
- [ ] Update estate planning package tiers with real pricing
- [ ] Update business law retainer price with real figure
- [ ] Legal pages reviewed by Andre for bar compliance
- [ ] Refund policy reviewed by Andre for bar compliance

---

## Testing Strategy Summary

| Layer | Tools | What's tested |
|---|---|---|
| Unit | Jest | Stripe session builder, chat guardrails, form validation |
| Component | React Testing Library | All UI components, correct render, behavior |
| Accessibility | jest-axe | Every component with an axe audit assertion |
| Integration | Manual + browser | Stripe test checkout end-to-end, speech input, chat widget |
| Build | `npm run build` | TypeScript errors, missing env vars, broken imports |
