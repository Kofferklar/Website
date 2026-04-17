---
phase: 02-produktseite
plan: "04"
subsystem: ui
tags: [react, next.js, tailwind, lucide-react, sanity, server-components, client-components, accordion, aria, reviews]

# Dependency graph
requires:
  - phase: 01-foundation-cms
    provides: Review and FaqItem interfaces in lib/sanity/types.ts, Tailwind design tokens (accent, muted, foreground, border, primary)
  - phase: 02-produktseite
    plan: 02-01
    provides: ProductGallery and ProductVideo — same component directory, style consistency

provides:
  - ProductReviews Server Component with average rating, star icons, review cards, and verified badge
  - ProductFaq Client Component with ARIA-compliant accordion and max-height CSS transition

affects:
  - 02-05-PLAN (page.tsx assembly — imports ProductReviews and ProductFaq)
  - Any plan composing the full Produktseite layout

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Server Component for read-only review display (no interactivity, no 'use client')
    - Client Component with useState for accordion open/close state
    - Lucide Star icon with fill-accent/fill-muted for filled/empty star rendering
    - max-height CSS transition for accordion animation (no Framer Motion needed)
    - ARIA accordion pattern: aria-expanded on button, aria-controls + role=region on answer panel

key-files:
  created:
    - app/(site)/produkt/components/ProductReviews.tsx
    - app/(site)/produkt/components/ProductFaq.tsx
  modified: []

key-decisions:
  - "ProductReviews as Server Component — no interactivity required; keeps component tree server-side"
  - "max-height CSS transition instead of Framer Motion — simpler, no additional dependency, performant for simple accordion"
  - "Single-open accordion pattern (openId: string|null) — standard UX for FAQ; multiple-open would require scanning entire list"
  - "First FAQ item opened by default — reduces zero-interaction bounce by surfacing content immediately"
  - "Star fill uses Tailwind fill-accent/fill-muted utility classes — consistent with project design tokens"

patterns-established:
  - "Review average: reduce + divide + Math.round to one decimal — reusable pattern for rating displays"
  - "German date format: toLocaleDateString('de-DE', { month: 'long', year: 'numeric' }) — consistent locale formatting"
  - "Accordion ARIA pattern: id-based button→panel linkage via aria-controls/aria-labelledby"

requirements-completed:
  - PROD-10
  - PROD-11

# Metrics
duration: ~2min
completed: "2026-04-17"
---

# Phase 02 Plan 04: ProductReviews + ProductFaq Summary

**ProductReviews Server Component (average star rating, verified badge, 3-column review cards) and ProductFaq Client Component (ARIA-compliant accordion with CSS max-height transition, first item open by default)**

## Performance

- **Duration:** ~2 min
- **Started:** 2026-04-17T06:07:01Z
- **Completed:** 2026-04-17T06:08:42Z
- **Tasks:** 2 / 2
- **Files modified:** 2 created

## Accomplishments

- ProductReviews: Server Component rendering average rating (one decimal), large star summary block, responsive 3-column review card grid, CheckCircle2 verified badge, German date formatting, and ARIA labels on all star ratings and section landmark
- ProductFaq: Client Component with single-open accordion using useState, ChevronDown rotating 180 degrees on open, max-height 0px/500px CSS transition for smooth animation, full ARIA accessibility (aria-expanded, aria-controls, role=region, aria-labelledby), first item open by default

## Task Commits

1. **Task 1: ProductReviews Server Component** — `a56da26` (feat)
2. **Task 2: ProductFaq Client Component** — `ebab76a` (feat)

## Files Created/Modified

- `app/(site)/produkt/components/ProductReviews.tsx` — Review section: average + stars + 3-column cards with verified badge and formatted date
- `app/(site)/produkt/components/ProductFaq.tsx` — Accordion FAQ with ARIA attributes, max-height transition, single-open pattern

## Decisions Made

- ProductReviews has no `'use client'` — review display is purely read-only; keeping it a Server Component reduces JS bundle
- CSS `max-height` transition instead of Framer Motion — the plan explicitly notes "CSS-Transition statt Framer Motion — einfacher und performanter"; no additional dependency needed
- Single-open accordion: `openId: string | null` — standard FAQ UX, clicking open item closes it (toggle), only one answer visible at a time
- First item opened by default (`useState(items[0]?._id ?? null)`) — surfaces FAQ content immediately, reduces zero-interaction bounce
- Star rendering uses Lucide `Star` with Tailwind `fill-accent text-accent` / `fill-muted text-muted` utility classes — matches project design tokens

## Deviations from Plan

None — plan executed exactly as written. Both components match specified structure, ARIA requirements, and TypeScript types. `npm run build` exits 0.

## Issues Encountered

None.

## Threat Surface Scan

No new network endpoints, auth paths, file access patterns, or schema changes introduced. Both components render data passed as props. Review.body and FaqItem.answer are rendered via JSX (React auto-escapes) — no dangerouslySetInnerHTML. Threat register items T-02-08 and T-02-09 accepted as planned.

## Known Stubs

None — both components render real data from props. No hardcoded placeholders or empty arrays.

## User Setup Required

None — components accept typed props; data is fetched by parent page.tsx from Sanity queries defined in lib/sanity/queries.ts.

## Next Phase Readiness

- ProductReviews accepts `reviews: Review[]` — ready for import in page.tsx
- ProductFaq accepts `items: FaqItem[]` and optional `title?: string` — ready for import in page.tsx
- Both components have graceful null-returns for empty data (no layout breaks)
- No blockers

## Self-Check: PASSED

- FOUND: app/(site)/produkt/components/ProductReviews.tsx
- FOUND: app/(site)/produkt/components/ProductFaq.tsx
- FOUND: .planning/phases/02-produktseite/02-04-SUMMARY.md
- FOUND commit: a56da26 (feat(02-04): ProductReviews Server Component)
- FOUND commit: ebab76a (feat(02-04): ProductFaq Client Component with accordion)

---
*Phase: 02-produktseite*
*Completed: 2026-04-17*
