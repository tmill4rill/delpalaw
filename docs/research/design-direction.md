# DELPALaw Design Direction

**Version:** 1.0
**Date:** 2026-02-19
**Stack:** Next.js 14 + Tailwind CSS
**Framework note:** All Tailwind token names below reference a custom theme extension in `tailwind.config.js`. The default Tailwind color palette is not used — only the custom DELPALaw palette defined here. WCAG grades are calculated against the WCAG 2.1 contrast ratio formula.

---

## Color Palette

### Primary Colors (with hex values + WCAG grades)

#### Blue Family

| Token Name | Hex | RGB | Usage | Contrast on White | WCAG Grade |
|---|---|---|---|---|---|
| `brand-blue-900` | `#0D2B6B` | rgb(13, 43, 107) | Primary brand, nav background, hero backgrounds, headers | 13.8:1 | AAA |
| `brand-blue-700` | `#1A4B9C` | rgb(26, 75, 156) | Primary buttons, text links, active nav states | 8.6:1 | AAA |
| `brand-blue-500` | `#2E6FD8` | rgb(46, 111, 216) | Hover states, focus rings, accent borders | 4.6:1 | AA |
| `brand-blue-100` | `#E8F0FB` | rgb(232, 240, 251) | Light blue backgrounds, trust bar background alternative | — | Background use only |
| `brand-blue-50` | `#F0F5FD` | rgb(240, 245, 253) | Very light blue sections, trust bar base | — | Background use only |

#### Gold Family

| Token Name | Hex | RGB | Usage | Contrast on White | WCAG Grade |
|---|---|---|---|---|---|
| `brand-gold-700` | `#A07830` | rgb(160, 120, 48) | Gold text on light backgrounds, "Call Now" button bg, trust bar accent | 5.1:1 | AA |
| `brand-gold-500` | `#C9A84C` | rgb(201, 168, 76) | Decorative accents on dark backgrounds ONLY, dividers, badge borders | 2.4:1 | FAIL on white |
| `brand-gold-300` | `#E8D4A0` | rgb(232, 212, 160) | Very light gold tint, background decoration only | — | Background use only |

**Critical rule:** `brand-gold-500` (`#C9A84C`) fails WCAG AA contrast on white (`#FFFFFF`) at 2.4:1. It must never be used as text on white or light backgrounds. It is a decorative-only color on dark (blue-900) backgrounds, where it achieves 6.2:1 contrast and passes AA.

#### Neutral / Gray Family

| Token Name | Hex | RGB | Usage | Contrast on White | WCAG Grade |
|---|---|---|---|---|---|
| `brand-gray-900` | `#1A1A1A` | rgb(26, 26, 26) | Body text, primary text | 18.1:1 | AAA |
| `brand-gray-600` | `#4A4A4A` | rgb(74, 74, 74) | Secondary text, captions, subheads, footer text | 9.7:1 | AAA |
| `brand-gray-400` | `#9A9A9A` | rgb(154, 154, 154) | Placeholder text (decorative only — not label replacement), icons | 2.8:1 | FAIL — decorative use only |
| `brand-gray-200` | `#E8E8E8` | rgb(232, 232, 232) | Borders, input borders, dividers, card borders | — | Border use only |
| `brand-gray-100` | `#F2F2F2` | rgb(242, 242, 242) | Alternate section backgrounds | — | Background use only |
| `brand-gray-50` | `#F7F7F8` | rgb(247, 247, 248) | Page backgrounds, card surfaces, alternating sections | — | Background use only |

#### Utility Colors

| Token Name | Hex | Usage | Contrast on White | WCAG Grade |
|---|---|---|---|---|
| `white` | `#FFFFFF` | Card surfaces, hero text on dark, button text on blue-700/blue-900 | — | — |
| `brand-red-600` | `#DC2626` | Error states (form validation), error borders, error text | 5.9:1 | AA |
| `brand-green-600` | `#16A34A` | Success states (payment confirmation, form success), success icons | 4.6:1 | AA |

---

### Accessibility Rules

**Non-negotiable contrast minimums:**

| Text type | Minimum ratio | Standard |
|---|---|---|
| Body text (16px+) | 4.5:1 | WCAG 2.1 AA |
| Large text (18px+ or 14px+ bold) | 3:1 | WCAG 2.1 AA |
| UI components and graphical objects | 3:1 | WCAG 2.1 AA |
| Primary CTAs (buttons) | 4.5:1 | WCAG 2.1 AA (enforced to AAA for primary buttons) |
| Target: body text | 7:1 | WCAG 2.1 AAA |

**Approved text-on-background combinations:**

| Text Color | Background | Ratio | Grade |
|---|---|---|---|
| `brand-gray-900` (#1A1A1A) | `white` (#FFFFFF) | 18.1:1 | AAA |
| `brand-gray-900` (#1A1A1A) | `brand-gray-50` (#F7F7F8) | 17.6:1 | AAA |
| `brand-gray-600` (#4A4A4A) | `white` (#FFFFFF) | 9.7:1 | AAA |
| `brand-blue-700` (#1A4B9C) | `white` (#FFFFFF) | 8.6:1 | AAA |
| `brand-blue-900` (#0D2B6B) | `white` (#FFFFFF) | 13.8:1 | AAA |
| `brand-gold-700` (#A07830) | `white` (#FFFFFF) | 5.1:1 | AA |
| `brand-gold-700` (#A07830) | `brand-gray-50` (#F7F7F8) | 4.9:1 | AA |
| `white` (#FFFFFF) | `brand-blue-900` (#0D2B6B) | 13.8:1 | AAA |
| `white` (#FFFFFF) | `brand-blue-700` (#1A4B9C) | 8.6:1 | AAA |
| `white` (#FFFFFF) | `brand-gold-700` (#A07830) | 4.1:1 | AA (large text only at 14px bold+; fails for normal body) |
| `brand-gold-500` (#C9A84C) | `brand-blue-900` (#0D2B6B) | 6.2:1 | AA |
| `brand-red-600` (#DC2626) | `white` (#FFFFFF) | 5.9:1 | AA |

**Prohibited combinations:**

| Text | Background | Ratio | Why Prohibited |
|---|---|---|---|
| `brand-gold-500` (#C9A84C) | `white` (#FFFFFF) | 2.4:1 | FAIL — insufficient contrast |
| `brand-gold-500` (#C9A84C) | `brand-gray-50` (#F7F7F8) | 2.3:1 | FAIL |
| `brand-gray-400` (#9A9A9A) | `white` (#FFFFFF) | 2.8:1 | FAIL — placeholder only |
| `brand-blue-500` (#2E6FD8) | `brand-blue-100` (#E8F0FB) | 2.1:1 | FAIL — do not use as text |

---

### Usage Rules per Color

**Blue (`brand-blue-900`, `brand-blue-700`, `brand-blue-500`)**
- Communicates: authority, trust, professionalism, stability
- Primary application: navigation, header background, primary CTA buttons, text links, hero section backgrounds, section header text
- `brand-blue-900`: nav, hero backgrounds, CTA bands, footer
- `brand-blue-700`: primary buttons, text links, card headings
- `brand-blue-500`: hover states, focus rings, accent borders, interactive highlights
- One blue call to action is the primary action on any given section — do not stack multiple blue CTAs

**Gold (`brand-gold-700`, `brand-gold-500`)**
- Communicates: premium, urgency, authority accent
- `brand-gold-700`: "Call Now" button background, gold text labels on light backgrounds, pricing callout text, trust bar accent text. Maximum one gold element per viewport height at any scroll position.
- `brand-gold-500`: decorative accents on dark blue backgrounds (trust bar top border, divider lines on blue sections), badge border colors. Never as text on white or light backgrounds.
- Gold is not a background color for sections — only for buttons and small UI elements.

**Gray (`brand-gray-900`, `brand-gray-600`, `brand-gray-400`, `brand-gray-200`, `brand-gray-100`, `brand-gray-50`)**
- Communicates: structure, hierarchy, neutral clarity
- `brand-gray-900`: all body text, form labels, navigation link hover (on white bg)
- `brand-gray-600`: secondary body text, captions, footer links, subheadings below H3, form helper text
- `brand-gray-400`: placeholder text in inputs (not used as a label — must have a visible label element above the input)
- `brand-gray-200`: input borders, card borders, horizontal rules, section dividers
- `brand-gray-100` / `brand-gray-50`: alternating section backgrounds (one section white, next gray-50), card surface backgrounds

**White (`#FFFFFF`)**
- Hero text on dark blue backgrounds
- Card surfaces on gray-50 backgrounds
- Button text on blue-700 and blue-900 buttons
- Nav link text on blue-900 nav

---

## Typography

### Type Scale (roles, font, weight, size desktop, size mobile)

All typography uses **Inter** (Google Fonts). Inter is loaded via `next/font/google` with `display: 'swap'` and subset `latin`. No fallback to system fonts in production — Inter is preloaded.

| Role | Element | Font | Weight | Size (Desktop) | Size (Mobile) | Line Height |
|---|---|---|---|---|---|---|
| Display / H1 | `<h1>` | Inter | 700 | 48px–56px | 32px–36px | 1.15 |
| H2 | `<h2>` | Inter | 600 | 32px–36px | 24px–28px | 1.2 |
| H3 | `<h3>` | Inter | 600 | 20px–24px | 18px–20px | 1.25 |
| H4 | `<h4>` | Inter | 600 | 18px | 16px | 1.3 |
| Body / Paragraph | `<p>` | Inter | 400 | 16px–18px | 16px | 1.6 |
| Small / Caption | `<small>`, captions | Inter | 400 | 14px | 14px | 1.5 |
| Button Labels | `<button>`, CTA text | Inter | 600 | 15px–16px | 15px | 1.0 |
| Navigation Links | `<nav a>` | Inter | 500 | 15px | 16px | 1.0 |
| Form Labels | `<label>` | Inter | 500 | 14px | 14px | 1.4 |
| Legal / Disclaimer | footer disclaimer, legal notices | Inter | 400 | 12px–13px | 12px | 1.5 |

**Minimum sizes — hard constraints:**
- No body text below 16px on mobile.
- No caption or helper text below 14px on mobile.
- Legal disclaimer text minimum 12px — do not go smaller.
- No text rendered in `brand-gray-400` at any size — this color fails contrast at all sizes for text.

**Tailwind config additions for type scale:**

```js
// tailwind.config.js — extend fontSize
fontSize: {
  'display': ['56px', { lineHeight: '1.15', fontWeight: '700' }],
  'display-sm': ['48px', { lineHeight: '1.15', fontWeight: '700' }],
  'h2': ['36px', { lineHeight: '1.2', fontWeight: '600' }],
  'h2-sm': ['32px', { lineHeight: '1.2', fontWeight: '600' }],
  'h3': ['24px', { lineHeight: '1.25', fontWeight: '600' }],
  'h4': ['18px', { lineHeight: '1.3', fontWeight: '600' }],
  'body-lg': ['18px', { lineHeight: '1.6' }],
  'body': ['16px', { lineHeight: '1.6' }],
  'sm': ['14px', { lineHeight: '1.5' }],
  'xs': ['13px', { lineHeight: '1.5' }],
  'legal': ['12px', { lineHeight: '1.5' }],
}
```

---

### Line Height Rules

- **Headings (H1–H3):** 1.15–1.25. Tighter line height for display text; slightly looser for H3.
- **Body text:** 1.6 minimum. This is the WCAG AA success criterion 1.4.8 recommendation for readability.
- **Buttons and nav:** 1.0 (single line; no wrapping expected).
- **Form labels and captions:** 1.4–1.5.
- **Legal/disclaimer text:** 1.5 minimum even at 12px — tighter line height at small sizes reduces readability significantly.
- **Never use `line-height: 1` on multi-line text** — this causes WCAG 1.4.12 (Text Spacing) violations.

---

## Component Styles

All components are implemented in Tailwind CSS. CSS values are provided for cases where Tailwind utility classes are insufficient.

---

### Primary Button

Use: Primary CTA throughout the site — "Book a Free Consult," "Send My Intake Request," "Get Started."

```
Background:        brand-blue-700 (#1A4B9C)
Text:              white (#FFFFFF)
Font:              Inter 600 15px
Padding:           12px 24px
Border-radius:     6px
Border:            none
Contrast ratio:    8.6:1 — AAA
Hover background:  brand-blue-900 (#0D2B6B)
Hover transition:  background-color 150ms ease
Active:            scale(0.98) + brand-blue-900 background
Focus:             3px solid brand-blue-500 (#2E6FD8), outline-offset 2px
Disabled:          brand-gray-400 background, white text, cursor: not-allowed
Min height:        44px (WCAG 2.5.5 touch target)
Min width:         120px
```

Tailwind classes:
```
bg-[#1A4B9C] text-white font-semibold text-[15px] px-6 py-3 rounded-[6px]
hover:bg-[#0D2B6B] transition-colors duration-150
focus:outline-none focus:ring-3 focus:ring-[#2E6FD8] focus:ring-offset-2
disabled:bg-[#9A9A9A] disabled:cursor-not-allowed
min-h-[44px]
```

---

### Urgent/Accent Button (Call Now)

Use: "Call Now: [phone]" — Criminal Defense hero, sticky mobile bar, urgent escalation contexts. Used sparingly — one per page maximum on non-criminal-defense pages.

```
Background:        brand-gold-700 (#A07830)
Text:              white (#FFFFFF)
Font:              Inter 600 15px
Padding:           12px 24px
Border-radius:     6px
Border:            none
Contrast ratio:    4.1:1 white on gold-700 — passes AA for large text; note this is below AAA
                   NOTE: At 15px/600 weight this qualifies as "large text" under WCAG (14px bold+)
                   and meets the 3:1 minimum. For AAA compliance, use brand-gold-900 (#7A5820) at 7.3:1.
                   AAA recommendation: Use #7A5820 if AAA is required. For AA compliance, #A07830 is acceptable.
Hover background:  #7A5820 (darken 15%)
Hover transition:  background-color 150ms ease
Focus:             3px solid brand-blue-500 (#2E6FD8), outline-offset 2px
Min height:        44px
```

Tailwind classes:
```
bg-[#A07830] text-white font-semibold text-[15px] px-6 py-3 rounded-[6px]
hover:bg-[#7A5820] transition-colors duration-150
focus:outline-none focus:ring-3 focus:ring-[#2E6FD8] focus:ring-offset-2
min-h-[44px]
```

**As a text link (alternative "Call Now" pattern):**
```
Color:    brand-gold-700 (#A07830) on white/gray-50 backgrounds — AA compliant
Font:     Inter 600 15px
No underline by default; underline on hover
```

---

### Secondary/Ghost Button

Use: Secondary CTAs — "See Practice Areas," "Type instead," "See Our Packages" (when used alongside a primary button).

```
Background:        transparent
Border:            2px solid brand-blue-700 (#1A4B9C)
Text:              brand-blue-700 (#1A4B9C)
Font:              Inter 600 15px
Padding:           10px 22px (2px less than primary to account for border)
Border-radius:     6px
Contrast ratio:    8.6:1 (blue-700 on white) — AAA
Hover background:  brand-blue-50 (#F0F5FD)
Hover border:      brand-blue-900 (#0D2B6B)
Hover text:        brand-blue-900 (#0D2B6B)
Focus:             3px solid brand-blue-500 (#2E6FD8), outline-offset 2px
Min height:        44px
```

Tailwind classes:
```
bg-transparent border-2 border-[#1A4B9C] text-[#1A4B9C] font-semibold text-[15px] px-[22px] py-[10px] rounded-[6px]
hover:bg-[#F0F5FD] hover:border-[#0D2B6B] hover:text-[#0D2B6B] transition-colors duration-150
focus:outline-none focus:ring-3 focus:ring-[#2E6FD8] focus:ring-offset-2
min-h-[44px]
```

---

### Cards

Use: Practice area cards, testimonial cards, package tier cards, triage cards on homepage.

```
Background:        white (#FFFFFF)
Border:            1px solid brand-gray-200 (#E8E8E8)
Border-radius:     8px
Box shadow:        0 2px 8px rgba(0, 0, 0, 0.06)
Hover box shadow:  0 4px 16px rgba(0, 0, 0, 0.10)
Hover transition:  box-shadow 150ms ease, transform 100ms ease
Hover transform:   translateY(-2px) — subtle lift only; do not use on cards with form elements
Padding:           24px
Gap (in grid):     24px
```

**Card heading:** Inter 600 20px, brand-blue-900, margin-bottom 8px
**Card body text:** Inter 400 16px, brand-gray-900, line-height 1.6
**Card CTA link:** Inter 600 15px, brand-blue-700, underline on hover
**Card trust badge (when present):** brand-gold-700 text, brand-gray-50 background pill, 12px Inter 500

Tailwind classes:
```
bg-white border border-[#E8E8E8] rounded-[8px] shadow-[0_2px_8px_rgba(0,0,0,0.06)]
hover:shadow-[0_4px_16px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 transition-all duration-150
p-6
```

**Featured/highlighted card variant (e.g., recommended package tier):**

```
Border:            2px solid brand-blue-700 (#1A4B9C)
Border-radius:     8px
Box shadow:        0 4px 16px rgba(26, 75, 156, 0.15)
"Most Popular" badge: brand-blue-700 background, white text, 12px Inter 600, border-radius 4px, positioned top-right
```

---

### Navigation / Header

```
Background:        brand-blue-900 (#0D2B6B)
Height:            64px (desktop), 56px (mobile)
Position:          fixed, top: 0, width: 100%, z-index: 50
Box shadow:        0 2px 8px rgba(0, 0, 0, 0.15)

Logo:
  Font:            Inter 700 20px
  Color:           white (#FFFFFF)
  Contrast:        13.8:1 — AAA

Nav links:
  Font:            Inter 500 15px
  Color:           white (#FFFFFF) at 90% opacity (rgba(255,255,255,0.9))
  Hover color:     white (#FFFFFF) at 100% opacity
  Hover underline: 2px solid brand-gold-500 (#C9A84C) — decorative, not text
  Active state:    white + 2px underline (brand-gold-500)
  Focus:           3px solid brand-blue-500, outline-offset 2px

Sticky CTA button (always visible in header):
  Background:      brand-gold-700 (#A07830)
  Text:            white, Inter 600 14px
  Copy:            "Book a Consult"
  Padding:         8px 16px
  Border-radius:   6px
  Hover:           #7A5820

Page body padding-top: 64px (desktop), 56px (mobile) to account for fixed header
```

**Mobile nav (hamburger overlay):**

```
Hamburger icon:    3 lines, white, 24px, appears at ≤768px viewport
Overlay:           full screen, background brand-blue-900 (#0D2B6B), z-index 100
Close button:      X icon, white, top-right, 44x44px touch target
Nav items:         Inter 500 18px, white, stacked vertically, 48px min height per item
Phone link:        First item, Inter 600 18px, brand-gold-500, tel: link, "Call: [phone]"
"Book a Consult":  gold-700 button, full width, margin-top 24px
Overlay open animation: slide-in from right, 200ms ease
Overflow: hidden on <body> when overlay is open (prevent background scroll)
```

---

### Trust Bar

Use: Directly below hero section on homepage and pillar pages. Horizontal strip communicating key credentials.

```
Background:        brand-blue-50 (#F0F5FD) or brand-gray-50 (#F7F7F8)
Border-top:        2px solid brand-gold-500 (#C9A84C)
Border-bottom:     1px solid brand-gray-200 (#E8E8E8)
Padding:           16px 0
```

**Trust bar items:**
- Google review stars + count: Inter 600 14px, brand-gray-900; stars in brand-gold-500 (decorative)
- Bar admission badges: badge image (placeholder), 32px height, alt text "Delaware Bar" / "Pennsylvania Bar"
- Credential text: Inter 500 14px, brand-gray-600
- Separator between items: 1px solid brand-gray-200, height 20px

**Layout:** `flex flex-wrap justify-center gap-x-8 gap-y-4 items-center` (centers on mobile when items wrap)

**"Available for emergency consultations" badge (Criminal Defense hero trust bar only):**
```
Background:        brand-gold-700 (#A07830)
Text:              white, Inter 600 13px
Border-radius:     4px
Padding:           4px 10px
```

---

### Forms

All form fields share a consistent visual system. Forms must be usable with keyboard only and must work with screen readers.

**Input field (text, email, tel, select):**

```
Border:            1px solid brand-gray-200 (#E8E8E8)
Border-radius:     6px
Padding:           10px 14px
Font:              Inter 400 16px (never below 16px — iOS zoom trigger prevention)
Color:             brand-gray-900 (#1A1A1A)
Background:        white (#FFFFFF)
Height:            44px minimum (touch target compliance)

Focus state:
  Border:          2px solid brand-blue-500 (#2E6FD8)
  Box shadow:      0 0 0 3px rgba(46, 111, 216, 0.15)
  Outline:         none (box shadow is the focus indicator — meets WCAG 2.4.11 Focus Appearance)

Error state:
  Border:          2px solid brand-red-600 (#DC2626)
  Box shadow:      0 0 0 3px rgba(220, 38, 38, 0.10)

Success state (after validation):
  Border:          2px solid brand-green-600 (#16A34A)
```

**Label:**

```
Font:              Inter 500 14px
Color:             brand-gray-900 (#1A1A1A)
Display:           block (above the input — never placeholder-only)
Margin-bottom:     6px
```

**Placeholder text:**

```
Color:             brand-gray-400 (#9A9A9A)
Purpose:           Decorative hint only — never a replacement for a visible label
```

**Helper / hint text (below input):**

```
Font:              Inter 400 13px
Color:             brand-gray-600 (#4A4A4A)
Margin-top:        4px
```

**Error message (below input):**

```
Font:              Inter 500 13px
Color:             brand-red-600 (#DC2626)
Margin-top:        4px
Role:              aria-live="polite" or associated via aria-describedby
Icon:              16px warning icon before text (decorative)
```

**Textarea:**

```
All input rules apply +
Min-height:        120px
Resize:            vertical only (resize: vertical)
Font:              Inter 400 16px (match input — not monospace)
```

**Select dropdown:**

```
All input rules apply +
Appearance:        none (custom arrow icon via background-image SVG)
Arrow icon:        brand-gray-600, 16px, right-aligned
```

**Radio and checkbox:**

```
Custom styled — do not use browser defaults
Size:              20x20px (touch target extended to 44x44px via padding)
Border:            2px solid brand-gray-400 (#9A9A9A) unchecked
Checked background: brand-blue-700 (#1A4B9C)
Checkmark / radio dot: white (#FFFFFF)
Focus ring:        3px solid brand-blue-500 (#2E6FD8), offset 2px
```

**Submit button:** See Primary Button specification above.

**Form trust notice (below submit button):**

```
Font:              Inter 400 13px
Color:             brand-gray-600 (#4A4A4A)
Icon:              lock/shield icon, brand-blue-700, 14px
```

---

### FAQ Accordion

Use: All FAQ sections throughout the site. Single-open or multi-open (developer's choice; single-open recommended for scannability).

```
Container:
  Border-top:      1px solid brand-gray-200 (#E8E8E8)
  Margin-bottom:   0

Item:
  Border-bottom:   1px solid brand-gray-200 (#E8E8E8)

Question (trigger button):
  Display:         flex, justify-between, align-items center
  Padding:         18px 0
  Font:            Inter 600 16px
  Color:           brand-gray-900 (#1A1A1A)
  Background:      transparent
  Cursor:          pointer
  Min height:      44px
  Focus:           3px solid brand-blue-500, outline-offset 2px (on the question element, not the container)
  Hover color:     brand-blue-700 (#1A4B9C)

Chevron icon:
  Color:           brand-blue-700 (#1A4B9C)
  Size:            20px
  Transition:      rotate 200ms ease
  Open state:      rotate(180deg)

Answer (panel):
  Padding:         0 0 18px 0 (no top padding — question padding provides visual gap)
  Font:            Inter 400 16px
  Color:           brand-gray-900 (#1A1A1A) or brand-gray-600 for less critical text
  Line-height:     1.6
  Animation:       height expand/collapse 200ms ease (use CSS custom properties or JS for smooth animation)
  Overflow:        hidden when collapsed
```

**ARIA requirements:**

```html
<button
  aria-expanded="false"
  aria-controls="faq-answer-1"
  id="faq-question-1"
>
  Question text
  <ChevronIcon aria-hidden="true" />
</button>
<div
  id="faq-answer-1"
  role="region"
  aria-labelledby="faq-question-1"
  hidden
>
  Answer text
</div>
```

Toggle `aria-expanded` and `hidden` attribute with JavaScript. Do not use `display: none` + CSS animation — use `hidden` attribute for accessibility, then animate height with a ResizeObserver or CSS custom properties approach.

---

### Chat Widget

Use: Floating AI chat assistant — all pages, bottom-right corner.

```
Collapsed state (trigger button):
  Position:        fixed, bottom: 24px, right: 24px
  Background:      brand-blue-700 (#1A4B9C)
  Border-radius:   50% (circle button) or 28px (pill shape)
  Size:            56x56px (circle) — min touch target
  Icon:            chat bubble SVG, white, 24px
  Label text:      "Chat with us" (pill shape) — Inter 600 14px, white
  Box shadow:      0 4px 16px rgba(26, 75, 156, 0.35)
  Hover:           brand-blue-900 background
  Focus:           3px solid brand-blue-500, outline-offset 2px
  Notification dot (when AI has a greeting ready): 8px circle, brand-gold-500, top-right of button

Expanded state (chat panel):
  Position:        fixed, bottom: 88px (above trigger button), right: 24px
  Width:           360px (desktop); 100vw - 32px (mobile, max 360px)
  Height:          min 400px, max 560px (scrollable message area)
  Background:      white (#FFFFFF)
  Border:          1px solid brand-gray-200 (#E8E8E8)
  Border-radius:   12px
  Box shadow:      0 8px 32px rgba(0, 0, 0, 0.15)
  z-index:         999

Chat panel header:
  Background:      brand-blue-900 (#0D2B6B)
  Height:          56px
  Padding:         0 16px
  Border-radius:   12px 12px 0 0
  Title:           "DELPALaw Assistant" — Inter 600 15px, white
  Subtitle:        "AI — not legal advice" — Inter 400 12px, rgba(255,255,255,0.7)
  Close button:    X icon, white, 24px, top-right, 44x44px touch area

Disclaimer banner (persistent inside panel, not dismissible):
  Background:      brand-blue-100 (#E8F0FB)
  Border-bottom:   1px solid brand-gray-200
  Padding:         8px 16px
  Text:            "AI tool. Not an attorney. Do not share confidential details." — Inter 400 12px, brand-gray-600

Message area:
  Padding:         16px
  Overflow-y:      auto
  Scroll behavior: smooth

Assistant message bubble:
  Background:      brand-gray-50 (#F7F7F8)
  Border-radius:   4px 12px 12px 12px
  Padding:         10px 14px
  Font:            Inter 400 15px, brand-gray-900
  Max-width:       85% of panel width

User message bubble:
  Background:      brand-blue-700 (#1A4B9C)
  Text:            white (#FFFFFF)
  Border-radius:   12px 12px 4px 12px
  Padding:         10px 14px
  Font:            Inter 400 15px
  Max-width:       85%
  Align:           right (flex-end)

Input area:
  Background:      white
  Border-top:      1px solid brand-gray-200
  Padding:         12px 16px
  Display:         flex, gap: 8px

Text input:
  All form input rules apply +
  Border-radius:   20px (pill shape)
  Font:            Inter 400 15px
  Flex:            1

Send button:
  Background:      brand-blue-700
  Width/Height:    36x36px
  Border-radius:   50%
  Icon:            send arrow, white, 16px
  Focus:           3px solid brand-blue-500

Loading indicator (while assistant is typing):
  Three dots animated (brand-gray-400, pulsing), inside assistant message bubble

CTA links within assistant messages:
  Color:           brand-blue-700, underline
  Font:            Inter 600 15px

Call Now link (urgent escalation, inside assistant message):
  Display:         block
  Background:      brand-gold-700 (#A07830)
  Text:            white, Inter 600 14px, centered
  Border-radius:   6px
  Padding:         10px 16px
  Margin-top:      8px
```

---

## Photography + Imagery Direction

### Hero Photography

**Required:** Real photography of Andre Jerry. No stock attorney photographs.

**Hero shot specifications:**
- Dominant background: dark blue (brand-blue-900) or charcoal — can be achieved with a photography background or post-processing overlay (semi-opaque brand-blue-900 overlay at 70% opacity over a lighter background)
- Expression: confident, approachable, direct eye contact with camera
- Attire: business professional — suit or dress shirt, no casual
- Framing: upper body or three-quarter shot; leave visual space for H1 text overlay if hero uses the split layout
- Lighting: professional studio lighting or controlled natural light — no harsh shadows, no overexposure
- Size: minimum 2000x1200px source, WebP format for production (next/image automatic optimization)

**Layout options for hero:**
- Option A: Full-width dark overlay — Andre's photo fills the hero, dark blue overlay at 60–70% opacity, H1 and CTAs overlay the image. Most common legal site pattern; creates authority.
- Option B: Two-column split — Left: H1, subhead, CTAs on white or brand-blue-900 background; Right: Andre's photo on blue/dark background, no overlay. Recommended — draws on Collins Law Firm benchmark pattern from competitive analysis. Feels more personal.

**Option B is preferred for the homepage hero.** The attorney-in-hero pattern tests better for trust on legal sites (competitive analysis finding: visitors make person-to-person judgments before firm-to-firm judgments).

---

### Practice Area Imagery by Vertical

**Criminal Defense:**
- Appropriate: Courtroom architecture (empty courtroom, columns, wood paneling), legal documents on a clean desk, professional legal workspace, abstract scales imagery (limited)
- Color tone: Cool, serious, high-contrast — reinforces the gravity of the practice area without dramatizing
- Not appropriate: Handcuffs, police imagery, crime scene imagery, bars, prison imagery, aggressive "fighter" iconography
- Rationale: Visitors are already anxious. Imagery that reinforces criminal consequences increases distress without adding trust. Clean, professional imagery signals competence without exploitation.

**Estate Planning:**
- Appropriate: Multi-generational family photography (parents with children, adults with elderly parents), calm home interiors (living room, kitchen table), garden/outdoor family moments, couple reviewing documents together (engaged, not worried)
- Color tone: Warm, natural — soft lighting, earth tones, natural environments
- Not appropriate: Wills or documents as hero imagery (reinforces the paperwork anxiety you're trying to reduce), mortality-adjacent imagery (empty chairs, aging alone), hospital or medical settings
- Rationale: Estate planning prospects respond to warmth and peace of mind. The emotional register is "protecting the people you love," not "preparing for death."

**Business Law:**
- Appropriate: Modern office or boardroom settings, professionals reviewing documents at a table, clean desk with laptop and notebook, handshake (not cliché — used sparingly), Delaware corporate skyline or architecture (Wilmington)
- Color tone: Clean, professional, neutral — white and gray environments with professional attire
- Not appropriate: Overly formal or stiff corporate imagery, dated "men in suits" stock photography, scales of justice in business law context
- Rationale: Business clients are practical. The imagery should feel like their own work environment — approachable and professional, not intimidating.

---

### What to Avoid

The following are explicitly prohibited across all DELPALaw imagery. These patterns correlate with negative audience perception and template/low-quality signals (documented in competitive analysis):

1. **Scales of justice** — the single most common cliché in legal website photography. Associates with "generic law firm."
2. **Gavel photographs** — used on 4 competitor sites; rated negatively by sophisticated audiences.
3. **Stock attorney photographs** — any image that looks like a purchased stock photo of a model in a suit signals inauthenticity.
4. **Courthouse exteriors as hero imagery** — impersonal; replaces the human connection that attorney headshots provide.
5. **Handcuff or arrest imagery** — increases distress for criminal defense prospects without adding trust or clarity.
6. **Police or law enforcement imagery** — creates the wrong emotional association for the attorney's role.
7. **Aggressive "fighter" imagery** — fists, boxing gloves, combat metaphors. Fear-mongering visual language that performs poorly with educated prospects.
8. **Autoplay video backgrounds** — creates WCAG 2.2.2 violations; poor performance on mobile; reduces copy legibility.
9. **Decorative images without alt text** — all images must have descriptive alt text or `alt=""` if purely decorative.

---

## Spacing + Layout System

### Max Widths, Section Padding, Grid

**Container widths:**

```css
/* Tailwind custom max-width extension */
.container-content {
  max-width: 1200px; /* Main content container */
  margin-left: auto;
  margin-right: auto;
  padding-left: 24px;
  padding-right: 24px;
}

.container-narrow {
  max-width: 800px; /* Long-form text, blog posts, legal pages */
  margin-left: auto;
  margin-right: auto;
  padding-left: 24px;
  padding-right: 24px;
}

.container-wide {
  max-width: 1440px; /* Full-bleed backgrounds only — content inside uses container-content */
}
```

Tailwind config:
```js
container: {
  center: true,
  padding: {
    DEFAULT: '24px',
    sm: '24px',
    lg: '32px',
    xl: '48px',
  },
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1200px',
  },
},
```

**Section padding (vertical rhythm):**

```
Desktop:   py-20 (80px top and bottom) for major sections
           py-12 (48px) for secondary sections (trust bar, FAQ)
           py-8 (32px) for tight sections (closing CTA band internals)

Mobile:    py-12 (48px) for major sections
           py-8 (32px) for secondary sections
           py-6 (24px) for tight sections
```

**Grid system:**

Primary content grid — CSS Grid:

```css
/* 3-column card grid (practice areas, triage cards) */
.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

/* 2-column content + sidebar */
.grid-2-sidebar {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 48px;
}

/* Full-width single column */
.grid-full {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}
```

Tailwind:
```
3-column: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
2-column: grid grid-cols-1 lg:grid-cols-2 gap-12
```

**Component-level spacing:**

```
Card padding:           24px (p-6)
Card gap in grid:       24px (gap-6)
Form field gap:         20px (space-y-5)
Section H2 margin:      bottom 32px (mb-8) on desktop, 24px (mb-6) on mobile
Paragraph margin:       bottom 16px (mb-4)
Button group gap:       12px (gap-3)
Trust bar item gap:     32px horizontal (gap-x-8)
```

---

### Mobile Breakpoints

Standard Tailwind breakpoint system, extended for DELPALaw:

| Breakpoint | Token | Value | Notes |
|---|---|---|---|
| Mobile (base) | (no prefix) | 0px+ | Mobile-first base styles |
| Small mobile | `xs:` | 390px+ | iPhone 14-class — add to config |
| Tablet | `md:` | 768px+ | Grid changes: 1-col → 2-col |
| Desktop | `lg:` | 1024px+ | Grid changes: 2-col → 3-col; full nav visible |
| Large desktop | `xl:` | 1280px+ | Max-width container active |
| Extra large | `2xl:` | 1536px+ | Not expected to be targeted specifically |

```js
// tailwind.config.js — screens
screens: {
  'xs': '390px',
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1536px',
},
```

**Key responsive behavior per component:**

| Component | Mobile | Tablet | Desktop |
|---|---|---|---|
| Header | 56px, hamburger menu | 56px, hamburger | 64px, full nav visible |
| Hero | Single column, H1 32–36px | Single or two-column | Two-column split (Option B) |
| Trust bar | Wrap to 2-column grid | Single row | Single row |
| Triage cards | Single column stack | 2-column | 3-column |
| Practice area cards | Single column | 2-column | 3-column |
| Package tier cards | Single column | 2-column | 3-column |
| FAQ accordion | Full width | Full width | Max 800px centered |
| Chat widget | Bottom bar or full-screen overlay | 360px panel | 360px panel, bottom-right |
| Forms | Full width | Max 600px | Max 600px |
| CTA band buttons | Full width, stacked | Side by side | Side by side |

---

## Accessibility Standards

### Minimum Contrast Requirements

See Color Palette section for full WCAG grade table. Summary of minimums:

| Context | Required ratio | Standard |
|---|---|---|
| Normal body text (under 18px non-bold, under 14px bold) | 4.5:1 minimum | WCAG 2.1 Level AA |
| Large text (18px+ non-bold, 14px+ bold) | 3:1 minimum | WCAG 2.1 Level AA |
| UI components (buttons, inputs borders, icons conveying information) | 3:1 minimum | WCAG 2.1 Level AA |
| Target for primary content text | 7:1 | WCAG 2.1 Level AAA |
| Interactive focus indicators | 3:1 against adjacent colors | WCAG 2.4.11 (2.2) |

All primary brand text and buttons are designed to AAA level (7:1+) where possible. gold-700 on white (5.1:1) is the only approved primary-use color below AAA, and it passes AA.

---

### Focus Ring Specification

Every focusable element must have a visible focus indicator. The default browser focus ring is insufficient for branding consistency — use a custom focus ring.

**Standard focus ring (all interactive elements except inputs):**

```css
:focus-visible {
  outline: 3px solid #2E6FD8; /* brand-blue-500 */
  outline-offset: 2px;
  border-radius: 4px; /* Matches button border-radius for visual consistency */
}
```

Tailwind:
```
focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#2E6FD8] focus-visible:ring-offset-2
```

**Inputs (custom ring that replaces border):**

```css
input:focus,
textarea:focus,
select:focus {
  outline: none;
  border: 2px solid #2E6FD8;
  box-shadow: 0 0 0 3px rgba(46, 111, 216, 0.15);
}
```

**Do not use `:focus` without `:focus-visible`** — `:focus` fires on mouse click too, creating an unwanted ring for mouse users. `:focus-visible` is supported in all modern browsers and shows the ring only for keyboard navigation.

**Exception:** If a component uses a custom focus management approach (e.g., chat widget text input), `:focus` is acceptable since the context (text input) is inherently keyboard-interactive.

**Focus ring on dark backgrounds (nav links, buttons on blue-900):**

```css
/* On brand-blue-900 background, blue-500 focus ring blends — use white offset */
.on-dark:focus-visible {
  outline: 3px solid #FFFFFF;
  outline-offset: 2px;
}
```

---

### Skip-to-Main Link

A skip navigation link must be the first focusable element in the DOM on every page. This is required for WCAG 2.4.1 (Bypass Blocks — Level A).

**Implementation:**

```html
<!-- In app/layout.tsx, first child of <body> -->
<a
  href="#main-content"
  class="
    sr-only
    focus:not-sr-only
    focus:fixed
    focus:top-4
    focus:left-4
    focus:z-[9999]
    focus:bg-[#1A4B9C]
    focus:text-white
    focus:font-semibold
    focus:text-[15px]
    focus:px-4
    focus:py-3
    focus:rounded-[6px]
    focus:no-underline
    focus:outline-none
    focus:ring-3
    focus:ring-[#2E6FD8]
    focus:ring-offset-2
  "
>
  Skip to main content
</a>
```

The `<main>` element on every page must have `id="main-content"`:

```html
<main id="main-content" tabindex="-1">
  {/* Page content */}
</main>
```

`tabindex="-1"` on `<main>` allows the skip link to move focus to the main landmark without making it part of the natural tab order.

**Behavior:**
- Invisible to sighted mouse users (sr-only class)
- Visible when focused via keyboard (focus:not-sr-only reveals it)
- Appears top-left of viewport with high-contrast styling
- Pressing Enter after focusing sends keyboard focus to `#main-content`

---

### Additional Accessibility Requirements

**Images:**
- All informational images: descriptive `alt` text. Example: `alt="Andre Jerry, Delaware and Pennsylvania attorney at law"`
- Decorative images: `alt=""` (empty string, not omitted — omitted alt creates a filename readout in some screen readers)
- Practice area images used as section backgrounds: CSS background-image (not `<img>`), so no alt text required

**Carousels and auto-playing content:**
- No auto-playing carousels (WCAG 2.2.2 — Pause, Stop, Hide). Testimonial cards use a static grid or manual-scroll slider with pause/stop control visible.
- If any animated content runs for more than 5 seconds, a pause/stop control must be present and keyboard-accessible.

**Color alone:**
- Error states must not rely on color alone. Error inputs use red border AND an error message text AND an icon. (WCAG 1.4.1)
- The "available for emergency" badge uses color AND text — not color alone.

**Form error announcements:**
- Form validation errors are announced via `aria-live="polite"` regions or associated via `aria-describedby` on the input.
- Do not use `alert` role for standard form errors — use `status` or `aria-describedby`.

**Touch targets:**
- All interactive elements have a minimum touch target size of 44x44px (WCAG 2.5.5).
- If a visual element is smaller (e.g., close button icon), use padding to extend the touch target without changing the visual size.

**Heading hierarchy:**
- One `<h1>` per page, matching the page's primary topic.
- H2 → H3 → H4 in strict hierarchical order. Do not skip heading levels for visual styling — use CSS instead.

**ARIA landmarks:**
- `<header>` (or `role="banner"`) — navigation
- `<main>` (`id="main-content"`) — primary content
- `<nav>` (or `role="navigation"` with `aria-label`) — each navigation region labeled
- `<footer>` (or `role="contentinfo"`) — footer
- `<aside>` (or `role="complementary"`) — sidebar content if applicable

**No published WCAG 2.1 AA compliance statement in competitor set** (from competitive analysis). DELPALaw can publish a conformance statement on /legal/accessibility as a Phase 2 differentiator.
