---
phase: 01-foundation-cms
plan: "02"
subsystem: cms-schema
tags:
  - sanity
  - schema
  - typescript
  - studio
  - middleware
dependency_graph:
  requires:
    - "01-01: Next.js project scaffold (package.json, next-sanity, @sanity/client installed)"
  provides:
    - "sanity/schemaTypes/index.ts: schemaTypes array for use in sanity.config.ts"
    - "sanity/structure.ts: StructureResolver with singleton configuration and Posteingang"
    - "sanity.config.ts: Sanity Studio configuration with plugins and singleton guard"
    - "middleware.ts: Basic Auth protection for /studio route"
    - "app/(studio)/studio/[[...index]]/: Studio embedded at isolated route group"
  affects:
    - "Phase 2: All GROQ queries depend on schema field names defined here"
    - "Phase 3: contactSubmission Server Action writes to schema defined here"
tech_stack:
  added:
    - "sanity defineType/defineField/defineArrayMember pattern"
    - "sanity/structure StructureResolver pattern"
    - "next-sanity/studio NextStudio component"
    - "Next.js middleware Basic Auth pattern"
  patterns:
    - "Singleton enforcement via newDocumentOptions + actions filter in sanity.config.ts"
    - "Posteingang as documentList (not document) for contactSubmission"
    - "blockContentType as reusable array type for postType and pageType"
    - "readOnly: true on contactSubmission fields (except read) — write-only via Server Action"
key_files:
  created:
    - sanity/schemaTypes/blockContentType.ts
    - sanity/schemaTypes/siteSettingsType.ts
    - sanity/schemaTypes/productType.ts
    - sanity/schemaTypes/reviewType.ts
    - sanity/schemaTypes/faqItemType.ts
    - sanity/schemaTypes/postType.ts
    - sanity/schemaTypes/bannerType.ts
    - sanity/schemaTypes/contactSubmissionType.ts
    - sanity/schemaTypes/pageType.ts
    - sanity/schemaTypes/index.ts
    - sanity/structure.ts
    - sanity.config.ts
    - app/(studio)/studio/[[...index]]/page.tsx
    - app/(studio)/studio/[[...index]]/layout.tsx
    - middleware.ts
  modified: []
decisions:
  - "blockContentType used as reusable array type reference in postType and pageType body fields"
  - "contactSubmission fields set readOnly:true in Studio — data written only via Plan 03 Server Action"
  - "Studio placed in app/(studio)/ route group to isolate from site Header/Footer"
  - "STUDIO_PASSWORD passthrough when env var undefined — development convenience without breaking prod security"
metrics:
  duration_minutes: 2
  completed_date: "2026-04-16"
  tasks_completed: 2
  tasks_total: 2
  files_created: 15
  files_modified: 0
---

# Phase 1 Plan 02: Sanity Schema Types + Studio Configuration Summary

**One-liner:** 9 Sanity schema types as TypeScript (CMS-01–CMS-08) with singleton guard, Structure Builder Posteingang, NextStudio route in isolated group, and Basic Auth middleware protecting /studio.

## What Was Built

### Task 1: All 9 Sanity Schema Types

Defined all content schemas as versioned TypeScript code in `sanity/schemaTypes/`:

| Schema | Type | Key Fields |
|--------|------|-----------|
| `blockContentType` | array (reusable) | block, image, h2/h3/quote styles, strong/em marks, URL annotations |
| `siteSettingsType` | document (singleton) | siteName, logo, seo (object), socialLinks, phone, email |
| `productType` | document (singleton) | name, slug, images[], videoUrl, price, buyLink, shortDescription, description (blockContent), setParts[], material, seo |
| `reviewType` | document | reviewerName, rating (min 1–max 5), body, publishedAt, verified |
| `faqItemType` | document | question, answer, category (with ordering) |
| `postType` | document | title, slug (source: title), coverImage, author, body (blockContent), publishedAt, seo |
| `bannerType` | document (singleton) | text, discountCode, isActive, validFrom, validUntil |
| `contactSubmissionType` | document | name/email/subject/message/submittedAt (all readOnly), read |
| `pageType` | document | title, slug, body (blockContent), seo |

Index file exports `schemaTypes` array with all 9 types in canonical order.

### Task 2: Studio Infrastructure

- **`sanity/structure.ts`**: StructureResolver with siteSettings/product/banner as singletons, Posteingang as contactSubmission documentList (title: "Eingegangene Nachrichten"), remaining types auto-listed and filtered
- **`sanity.config.ts`**: defineConfig with structureTool + visionTool plugins, `newDocumentOptions` filter prevents new singleton instances, `actions` filter removes duplicate/delete from singletons
- **`app/(studio)/studio/[[...index]]/page.tsx`**: NextStudio render — in `(studio)` route group, no Header/Footer wrapping
- **`app/(studio)/studio/[[...index]]/layout.tsx`**: studioMetadata + studioViewport from next-sanity/studio, title overridden to "KofferKlar Studio"
- **`middleware.ts`**: Basic Auth at project root — 401 + WWW-Authenticate header when no/invalid credentials, passthrough when STUDIO_PASSWORD unset (development), matcher: `/studio/:path*`

## Verification Results

| Check | Result |
|-------|--------|
| `sanity/schemaTypes/` file count | 10 (9 schemas + index) |
| `middleware.ts` at project root | PASS |
| `middleware.ts` NOT in `app/` | PASS |
| `NEXT_PUBLIC_SANITY_WRITE` references | 0 (security: PASS) |
| `newDocumentOptions` in sanity.config.ts | PASS |
| `Posteingang` in sanity/structure.ts | PASS |
| Studio in `app/(studio)/` route group | PASS |
| Studio NOT in `app/(site)/` | PASS |

## Deviations from Plan

None — plan executed exactly as written. All patterns copied verbatim from PATTERNS.md.

## Known Stubs

None — this plan produces schema type definitions and infrastructure files only. No UI rendering, no data fetching. All defined fields map to CMS requirements CMS-01 through CMS-10.

## Threat Flags

No new threat surface beyond what is defined in the plan's threat model. All T-02-01 through T-02-04 mitigations implemented:

- T-02-01: middleware.ts returns 401 with WWW-Authenticate header — MITIGATED
- T-02-02: No NEXT_PUBLIC_SANITY_WRITE references; contactSubmission fields marked readOnly — MITIGATED
- T-02-03: newDocumentOptions + actions filter in sanity.config.ts — MITIGATED
- T-02-04: Studio in app/(studio)/ route group — MITIGATED

## Self-Check: PASSED

Files exist:
- sanity/schemaTypes/blockContentType.ts: FOUND
- sanity/schemaTypes/siteSettingsType.ts: FOUND
- sanity/schemaTypes/productType.ts: FOUND
- sanity/schemaTypes/reviewType.ts: FOUND
- sanity/schemaTypes/faqItemType.ts: FOUND
- sanity/schemaTypes/postType.ts: FOUND
- sanity/schemaTypes/bannerType.ts: FOUND
- sanity/schemaTypes/contactSubmissionType.ts: FOUND
- sanity/schemaTypes/pageType.ts: FOUND
- sanity/schemaTypes/index.ts: FOUND
- sanity/structure.ts: FOUND
- sanity.config.ts: FOUND
- app/(studio)/studio/[[...index]]/page.tsx: FOUND
- app/(studio)/studio/[[...index]]/layout.tsx: FOUND
- middleware.ts: FOUND

Commits exist:
- 367b092: feat(01-02): define all 9 Sanity schema types + index
- f48490f: feat(01-02): structure builder, sanity.config, studio route, middleware
