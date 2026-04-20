---
phase: 05-warenkorb-navigation
plan: "03"
subsystem: cart-wiring
tags: [cart, buyblock, product-hero, addtocart, feedback-state, mobile-cta]
dependency_graph:
  requires:
    - 05-01 (CartProvider, useCart, addToCart)
  provides:
    - BuyBlock addToCart button with 2s feedback
    - ProductHero mobile CTA addToCart button
  affects:
    - app/(site)/produkt/components/BuyBlock.tsx
    - app/(site)/produkt/components/ProductHero.tsx
tech_stack:
  added: []
  patterns:
    - "useEffect cleanup timer pattern: setTimeout in effect, clearTimeout in cleanup — prevents memory leak on unmount"
    - "Optimistic feedback state: setAdded(true) immediately on click, auto-revert after 2s"
    - "addToCart color variant resolution: colorVariants[selectedColorIndex ?? 0]?.colorName ?? 'Standard'"
key_files:
  created: []
  modified:
    - app/(site)/produkt/components/BuyBlock.tsx
    - app/(site)/produkt/components/ProductHero.tsx
decisions:
  - "Removed Link import from ProductHero entirely — mobile CTA was its only usage"
  - "Removed Link import from BuyBlock entirely — CTA Link was its only usage"
  - "BuyBlock multi-section guard structure preserved exactly — no top-level early return added (MEMORY.md lesson)"
  - "Shared feedback pattern: same useState/useEffect/clearTimeout structure in both components independently (simpler than a shared hook for v1)"
metrics:
  duration_seconds: 180
  completed_date: "2026-04-20"
  tasks_completed: 2
  tasks_total: 2
  files_changed: 2
---

# Phase 05 Plan 03: BuyBlock + ProductHero Cart Wiring Summary

## One-liner

Replaced /checkout link CTAs in BuyBlock and ProductHero with addToCart buttons that show 'Hinzugefügt ✓' for 2 seconds then revert, wiring both components to CartProvider via useCart.

## What Was Built

Modified `app/(site)/produkt/components/BuyBlock.tsx`:
- Added `useCart` import and `useState`/`useEffect` imports
- Added `handleAddToCart`: reads `colorVariants[selectedColorIndex ?? 0]?.colorName`, calls `addToCart({ color, colorLabel, price })`
- Added `added` state with `useEffect` cleanup timer (2s revert, `clearTimeout` on unmount)
- Replaced `<Link href="/checkout">Jetzt kaufen</Link>` with `<button onClick={handleAddToCart}>` showing `{added ? 'Hinzugefügt ✓' : 'In den Warenkorb'}`
- Removed `Link` import (no longer used); multi-section guard structure preserved exactly

Modified `app/(site)/produkt/components/ProductHero.tsx`:
- Added `useCart` import; added `useEffect` to existing `useState` import
- Added `handleMobileAddToCart`: reads `product.colorVariants[selectedColorIndex]`, calls `addToCart`
- Same feedback state pattern (independent `added` state + `useEffect` cleanup timer)
- Replaced mobile `<Link href="/checkout">Jetzt kaufen</Link>` with `<button onClick={handleMobileAddToCart}>` with `shrink-0` class preserved
- Removed `Link` import (no longer used)

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | BuyBlock addToCart button + 2s feedback | ecd0dfc | app/(site)/produkt/components/BuyBlock.tsx |
| 2 | ProductHero mobile CTA addToCart button | 7f4d059 | app/(site)/produkt/components/ProductHero.tsx |

## Key Implementation Details

**Feedback Timer Pattern**

Both components use the same pattern independently:
```typescript
const [added, setAdded] = useState(false)
useEffect(() => {
  if (!added) return
  const id = setTimeout(() => setAdded(false), 2000)
  return () => clearTimeout(id)
}, [added])
```
The `return () => clearTimeout(id)` cleanup prevents a memory leak / stale state update if the user navigates away before the 2-second timer fires.

**Color Variant Resolution**

BuyBlock: `colorVariants?.[selectedColorIndex ?? 0]?.colorName ?? 'Standard'`
ProductHero: `product.colorVariants?.[selectedColorIndex]?.colorName ?? 'Standard'`

The `?? 'Standard'` fallback ensures `addToCart` always receives a non-empty string, even when Sanity has no color variants configured.

**MEMORY.md Compliance**

BuyBlock preserved its existing multi-section guard structure (`{shortDescription && ...}`, `{colorVariants && colorVariants.length > 0 && ...}`, `{material && ...}`). No top-level early return was added. The `handleAddToCart` function guards internally via optional chaining.

**Security (T-05-09)**

`colorLabel` originates from Sanity server-fetched `colorVariants` enum (not user input). It is passed to `addToCart` and will be rendered as React text content in CartStep — no `dangerouslySetInnerHTML` risk.

## Deviations from Plan

None — plan executed exactly as written. The `Link` import removal from both files was anticipated by the plan ("Remove the Link import ONLY if it is no longer used elsewhere").

## Known Stubs

None — both components are fully wired to CartProvider. The `addToCart` call populates real cart state that persists to localStorage.

## Threat Flags

None — no new network endpoints or auth paths introduced. Changes are entirely browser-local client state updates.

## Self-Check

**Files exist:**
- app/(site)/produkt/components/BuyBlock.tsx: FOUND
- app/(site)/produkt/components/ProductHero.tsx: FOUND

**Commits exist:**
- ecd0dfc: feat(05-03): replace BuyBlock CTA with addToCart button + 2s feedback
- 7f4d059: feat(05-03): replace ProductHero mobile CTA with addToCart button

**Verification checks:**
- TypeScript `npx tsc --noEmit`: EXIT CODE 0
- `grep -rn "checkout.*color" app/(site)/produkt/` (worktree): ZERO MATCHES
- `grep -n "handleAddToCart" BuyBlock.tsx`: 2 matches (definition + onClick)
- `grep -n "clearTimeout" BuyBlock.tsx`: 1 match (cleanup)
- `grep -n "handleMobileAddToCart" ProductHero.tsx`: 2 matches (definition + onClick)
- `grep -n "Hinzugefügt" BuyBlock.tsx`: 1 match
- `grep -n "Hinzugefügt" ProductHero.tsx`: 1 match
- No top-level early return in BuyBlock: CONFIRMED

## Self-Check: PASSED
