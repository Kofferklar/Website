---
phase: 05-warenkorb-navigation
plan: "02"
subsystem: header-cart-icon
status: awaiting-checkpoint
tags: [header, cart, badge, touch-target, wcag, lucide-react, useRouter]
dependency_graph:
  requires:
    - 05-01 (CartProvider + useCart hook)
  provides: [Header cart icon, cart badge, mobile logo touch-target fix]
  affects:
    - app/(site)/components/Header.tsx (modified)
tech_stack:
  added: []
  patterns:
    - "ShoppingCart lucide-react icon with relative-positioned badge span"
    - "mounted guard on badge: {mounted && totalItems > 0 && <Badge />}"
    - "WCAG 2.5.5 touch target: min-h-[44px] min-w-[44px] -m-2 p-2 on mobile logo Link"
    - "useRouter().push('/checkout') for imperative cart navigation"
key_files:
  created: []
  modified:
    - app/(site)/components/Header.tsx
decisions:
  - "'Jetzt kaufen' Link kept intact — navigates to /produkt (different purpose from cart icon navigating to /checkout)"
  - "Desktop: 'Jetzt kaufen' and cart icon wrapped in flex div to sit side-by-side on right"
  - "Mobile: cart icon + hamburger wrapped in flex items-center gap-1 div"
  - "Badge capped at '9+' for counts above 9"
  - "Negative margin -m-2 with p-2 on mobile logo Link preserves visual layout while expanding touch area"
metrics:
  duration_seconds: 120
  completed_date: "2026-04-20"
  tasks_completed: 1
  tasks_total: 2
  files_changed: 1
---

# Phase 05 Plan 02: Header Cart Icon Summary

## One-liner

ShoppingCart icon with hydration-safe badge added to both desktop and mobile header; mobile logo touch target expanded to WCAG 2.5.5 44px minimum.

## Status

**awaiting-checkpoint** — Task 1 (code changes) complete and committed. Task 2 is a `checkpoint:human-verify` requiring visual browser verification.

## What Was Built

Modified `app/(site)/components/Header.tsx` to integrate the cart icon from CartProvider (Plan 01).

**Desktop header:** The existing "Jetzt kaufen" Link and a new cart icon button are wrapped in a `<div className="flex items-center gap-2">` on the right side of the header. The cart icon button uses `useRouter().push('/checkout')` and shows a red badge (`bg-red-500`) capped at `9+` when `mounted && totalItems > 0`.

**Mobile header:** The mobile logo Link received `className="flex items-center justify-center min-h-[44px] min-w-[44px] -m-2 p-2"` to satisfy WCAG 2.5.5 without changing the visual layout. The right side now wraps the new cart icon button and the existing hamburger button inside `<div className="flex items-center gap-1">`. The hamburger button's internal span structure (animated Menu/X icons) is fully unchanged.

**Badge safety:** Both badge renders are gated on `mounted && totalItems > 0`, satisfying threat T-05-07 (prevents hydration error if server and client renders diverge).

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Add cart icon + badge to Header, fix mobile logo touch target | 4f7dbfe | app/(site)/components/Header.tsx |

## Task Pending Human Verification

| Task | Name | Status |
|------|------|--------|
| 2 | checkpoint:human-verify — visual browser check | pending-human-verification |

### Verification Steps (for human reviewer)

1. Start dev server: `npm run dev` in `/Users/nicopapandrockndrock/wavyy/KofferKlar`
2. Open http://localhost:3000 in a browser
3. **Desktop (1440px viewport):**
   - ShoppingCart icon appears to the right of the "Jetzt kaufen" button in the header
   - Badge is hidden with empty cart (no red dot visible)
   - Click the cart icon — browser navigates to /checkout
4. **Mobile (375px viewport or DevTools responsive mode):**
   - Cart icon appears to the left of the hamburger button, both 44px touch targets
   - Logo is tappable and navigates to /
5. **Badge test:** In browser console: `localStorage.setItem('kofferklar-cart', JSON.stringify([{color:"Aqua Blau",colorLabel:"Aqua Blau",qty:2,price:49.99}]))` then reload — badge should show "2"

## Acceptance Criteria — All Passed

| Check | Result |
|-------|--------|
| `grep ShoppingCart Header.tsx` — 3 matches (import + 2 JSX) | PASS |
| `grep useCart Header.tsx` — 2 matches (import + hook call) | PASS |
| `grep "mounted && totalItems > 0" Header.tsx` — 4 matches (2 aria-labels + 2 badge renders) | PASS |
| `grep "router.push.*checkout" Header.tsx` — 2 matches (desktop + mobile) | PASS |
| `grep "min-h-\[44px\]" Header.tsx` — 1 match (logo link) | PASS |
| `grep "Jetzt kaufen" Header.tsx` — still present | PASS |
| `grep "setDrawerOpen" Header.tsx` — still present | PASS |
| `npx tsc --noEmit` — exit code 0 | PASS |

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — Header is pure navigation UI with no data stubs.

## Threat Flags

None — no new network endpoints or auth paths introduced.

## Self-Check

**Files exist:**
- app/(site)/components/Header.tsx: FOUND (modified)

**Commits exist:**
- 4f7dbfe: feat(05-02): add cart icon + badge to Header, fix mobile logo touch target

**TypeScript:** `npx tsc --noEmit` exits with code 0 (no output).

## Self-Check: PASSED
