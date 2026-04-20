---
phase: 05-warenkorb-navigation
plan: "04"
subsystem: checkout-cart-refactor
tags: [react-context, cart, checkout-wizard, useCart, typescript]
dependency_graph:
  requires:
    - 05-01 (CartProvider, useCart, CartItem)
  provides:
    - CheckoutWizard with CartStep reading from useCart()
    - checkout/page.tsx without searchParams
  affects:
    - app/(site)/checkout/components/CheckoutWizard.tsx
    - app/(site)/checkout/page.tsx
tech_stack:
  added: []
  patterns:
    - "useCart() called at both CartStep level (items/updateQty/removeItem) and CheckoutWizard level (totalPrice snapshot)"
    - "confirmedTotal snapshot: totalPrice captured at PaymentStep onNext to prevent stale closure in DemoStep"
    - "Per-item cart rows: items.map with key=item.color, qty cap Math.min(10)/Math.max(1)"
key_files:
  created: []
  modified:
    - app/(site)/checkout/components/CheckoutWizard.tsx
    - app/(site)/checkout/page.tsx
decisions:
  - "CartItem type import skipped — TypeScript infers item type from CartItem[] via useCart(); no unused import"
  - "Two useCart() calls in same component tree (CartStep + CheckoutWizard outer) — intentional, React Context reads are cheap"
  - "Hydration flicker on empty-cart guard is out of scope — Plan 01 design decision (mounted flag not used to gate empty state here)"
metrics:
  duration_seconds: 420
  completed_date: "2026-04-20"
  tasks_completed: 2
  tasks_total: 2
  files_changed: 2
---

# Phase 05 Plan 04: CheckoutWizard CartStep Refactor Summary

## One-liner

CartStep rewritten to read all cart state from useCart() with per-item rows, qty caps, empty-cart guard, and DemoStep total snapshotted at PaymentStep submission — checkout/page.tsx reduced to a single-prop server component.

## What Was Built

**Task 1 — CheckoutWizard.tsx rewrite:**

Rewrote `CartStep` from a 6-prop function (productName, productPrice, qty, setQty, onNext, selectedColor) to a 1-prop function (onNext only). CartStep now reads all state from `useCart()`:
- `items` — renders one card per CartItem with color label, qty controls, and remove button
- `updateQty(color, qty)` — called with `Math.min(10, item.qty + 1)` (cap) and `Math.max(1, item.qty - 1)` (floor)
- `removeItem(color)` — "× Entfernen" button per item row
- `totalPrice` — drives Zwischensumme and shipping threshold (`totalPrice >= 49`)

Empty cart guard added at top of CartStep: renders "Dein Warenkorb ist leer." with a ChevronLeft link to `/produkt` when `items.length === 0`.

Summary section (Zwischensumme / Versand with Truck icon / free-shipping hint / Gesamt) fully preserved from original.

`CheckoutWizard` outer component:
- Props reduced from `{ productName, productPrice, selectedColor? }` to `{ productName: string }` only
- `const [qty, setQty] = useState(1)` removed
- `const shipping = productPrice * qty >= 49 ? 0 : 3.95` and `const total = productPrice * qty + shipping` removed from outer scope
- `const { totalPrice } = useCart()` added at outer level for snapshot
- `const [confirmedTotal, setConfirmedTotal] = useState(0)` added
- PaymentStep `onNext` now snapshots: `const shipping = totalPrice >= 49 ? 0 : 3.95; setConfirmedTotal(totalPrice + shipping); setStep('demo')`
- DemoStep receives `total={confirmedTotal}` (was `total={total}` from stale outer closure)

**Task 2 — checkout/page.tsx simplification:**

Removed `searchParams: Promise<{ color?: string }>` parameter and `Promise.all` call. Page now simply `await getProduct()` and passes only `productName` to CheckoutWizard. Metadata (title, description, robots) preserved exactly.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Rewrite CartStep and simplify CheckoutWizard props | 823fdb4 | app/(site)/checkout/components/CheckoutWizard.tsx |
| 2 | Simplify checkout/page.tsx — remove searchParams | a511dae | app/(site)/checkout/page.tsx |

## Key Implementation Details

**Threat T-05-11 (qty tampering):** `Math.min(10, item.qty + 1)` caps increment; `Math.max(1, item.qty - 1)` prevents going below 1. CartProvider's `updateQty` also rejects `qty < 1` as a secondary guard.

**Threat T-05-12 (stale closure DemoStep total):** `confirmedTotal` state captured fresh from `totalPrice` at the moment `PaymentStep.onNext` fires — not from any outer-scope `total` variable computed at render time.

**Threat T-05-13 (colorLabel injection):** `item.colorLabel` rendered as JSX text content inside `<p>` — no `dangerouslySetInnerHTML`. Sourced from Sanity enum via CartProvider.

**Threat T-05-14 (empty cart DoS):** `if (items.length === 0)` guard at top of CartStep returns a safe empty-state UI before any cart rendering runs.

## Deviations from Plan

**1. [Rule 2 - Minor omission] CartItem type import not added**
- **Found during:** Task 1 implementation
- **Issue:** Plan specified importing `CartItem` type for `items.map((item: CartItem) => ...)` but the type is fully inferred from `CartItem[]` returned by `useCart()`. Adding the import unused would cause a TypeScript warning.
- **Fix:** Skipped unused type import. Type inference provides identical safety.
- **Confirmed by:** Advisor recommendation before implementation.

## Known Stubs

None — CartStep renders real cart data from useCart(). No placeholder values.

## Threat Flags

None — no new network endpoints, auth paths, or trust boundaries introduced. All changes are within the existing checkout client component boundary.

## Self-Check

**Files exist:**
- app/(site)/checkout/components/CheckoutWizard.tsx: FOUND
- app/(site)/checkout/page.tsx: FOUND

**Commits exist:**
- 823fdb4: FOUND (feat(05-04): rewrite CartStep to useCart(), simplify CheckoutWizard props)
- a511dae: FOUND (feat(05-04): simplify checkout/page.tsx — remove searchParams, pass only productName)

**Verification checks:**
- `npx tsc --noEmit`: EXIT CODE 0
- `grep -n "useCart"` in CheckoutWizard.tsx: 3 matches (import + CartStep call + outer component call)
- `grep -n "productPrice"` in checkout/ directory: 0 matches
- `grep -n "selectedColor"` in checkout/ directory: 0 matches
- `grep -n "searchParams"` in checkout/ directory: 0 matches
- `grep -n "function CartStep"`: signature `{ onNext }: { onNext: () => void }` confirmed
- `grep -n "totalPrice >= 49"`: 2 matches (CartStep + PaymentStep onNext snapshot)
- `grep -n "Math.min(10, item.qty + 1)"`: 1 match
- `grep -n "removeItem"`: 2 matches (destructure + onClick handler)
- `grep -n "confirmedTotal"`: 3 matches (state declaration + setConfirmedTotal call + DemoStep prop)
- `grep -n "items.length === 0"`: 1 match (empty cart guard)

## Self-Check: PASSED
