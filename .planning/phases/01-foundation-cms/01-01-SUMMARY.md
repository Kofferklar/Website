---
phase: 01-foundation-cms
plan: "01"
subsystem: foundation
tags: [nextjs, tailwind, scaffold, configuration, fonts, design-tokens]
dependency_graph:
  requires: []
  provides:
    - Next.js 15 project scaffold with all packages installed
    - Tailwind 3.4 design token system (primary, accent, background, foreground, muted, border)
    - Inter + Playfair Display font setup via next/font/google
    - .env.example documentation for all 5 required env vars
    - vercel.json preview noindex header
    - README.md German-language setup guide
  affects:
    - All subsequent plans that add components and pages
    - Sanity CMS plan (requires env vars and package setup from this plan)
tech_stack:
  added:
    - next@15.5.15
    - react@19.1.0 / react-dom@19.1.0
    - typescript@5.x
    - tailwindcss@3.4.19
    - "@tailwindcss/typography@0.5.19"
    - sanity@3.99.0
    - next-sanity@9.12.3
    - "@sanity/client@6.29.1"
    - "@sanity/image-url@1.2.0"
    - "@portabletext/react@3.2.4"
    - framer-motion@11.18.2
    - react-hook-form@7.72.1
    - zod@3.25.76
    - lucide-react@1.8.0
    - sharp@0.33.5
    - autoprefixer@10.5.0
  patterns:
    - next/font/google CSS variable approach for self-hosted fonts
    - Tailwind v3 config with tailwind.config.ts and postcss.config.mjs using tailwindcss plugin
    - Semantic design tokens in tailwind theme.extend.colors
key_files:
  created:
    - package.json
    - package-lock.json
    - tsconfig.json
    - next.config.ts
    - next-env.d.ts
    - eslint.config.mjs
    - postcss.config.mjs
    - tailwind.config.ts
    - app/globals.css
    - app/layout.tsx
    - app/page.tsx
    - .env.example
    - vercel.json
    - README.md
  modified:
    - .gitignore (added node_modules, .next/, .env*.local, .sanity/, coverage/, .DS_Store, *.tsbuildinfo)
decisions:
  - "Tailwind v3.4 installed explicitly over scaffold default (v4) — create-next-app@15 uses v4 by default; downgraded per CLAUDE.md constraint"
  - "postcss.config.mjs uses tailwindcss:{} plugin (v3 format), not @tailwindcss/postcss (v4 package)"
  - "Scaffold performed via temp directory then merge due to existing CLAUDE.md in project root"
  - "Inter weights 400+600+700 loaded; Playfair Display weight 700 only — no weight 500 to avoid silent fallback"
metrics:
  duration: "~15 minutes"
  completed_date: "2026-04-16"
  tasks_completed: 2
  tasks_total: 2
  files_created: 14
  files_modified: 1
---

# Phase 01 Plan 01: Next.js Scaffold, Tailwind Design Tokens, Config Files Summary

**One-liner:** Next.js 15 scaffold with Tailwind 3.4 design token system (Navy #1E3A5F primary, Gold #C9A84C accent, full 50-900 scales), Inter + Playfair Display via next/font CSS variables, and complete project infrastructure files.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Scaffold + Install + Tailwind Theme + Root Layout | `98159a2` | package.json, tailwind.config.ts, postcss.config.mjs, app/globals.css, app/layout.tsx, tsconfig.json, next.config.ts |
| 2 | Config Files — .env.example, .gitignore, vercel.json, README.md | `1822430` | .env.example, vercel.json, README.md (.gitignore updated in Task 1 commit) |

## Verification Results

All success criteria met:

- `npm run build` exits 0 — zero TypeScript errors, 2 static pages generated
- tailwindcss version: 3.4.19 (confirmed via `node -e "require('tailwindcss/package.json').version"`)
- `package.json`: next@15.5.15, sanity@^3.99.0, framer-motion@^11.18.2, zod@^3.25.76
- `tailwind.config.ts`: full primary scale (50-900, DEFAULT=#1E3A5F), full accent scale (50-900, DEFAULT=#C9A84C), semantic tokens, font variables
- `app/layout.tsx`: lang="de", Inter + Playfair Display via next/font/google with CSS variable approach
- `.env.example`: 5 env vars, SANITY_WRITE_TOKEN and STUDIO_PASSWORD without NEXT_PUBLIC_ prefix, no real values
- `.gitignore`: excludes .env*.local, .next/, .sanity/
- `vercel.json`: X-Robots-Tag noindex for *.vercel.app preview deployments (valid JSON confirmed)
- `README.md`: German-language setup guide with npm run dev, .env.local setup, Sanity token generation

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] create-next-app scaffolds Tailwind v4 by default**
- **Found during:** Task 1
- **Issue:** `create-next-app@15` installs tailwindcss@4 and `@tailwindcss/postcss` (v4 CSS-only approach). CLAUDE.md explicitly requires tailwindcss@3.4.x. The v4 config uses `@import "tailwindcss"` in CSS and has no `tailwind.config.ts`.
- **Fix:** Ran `npm install tailwindcss@3 autoprefixer`, removed `@tailwindcss/postcss`, replaced `postcss.config.mjs` with v3 format (`tailwindcss: {}` plugin), replaced `app/globals.css` with `@tailwind` directives, created `tailwind.config.ts` with full design token set.
- **Files modified:** tailwind.config.ts (new), postcss.config.mjs, app/globals.css
- **Commit:** 98159a2

**2. [Rule 3 - Blocking] Scaffold directory conflict — existing CLAUDE.md blocked create-next-app**
- **Found during:** Task 1
- **Issue:** `create-next-app` refused to scaffold into the worktree directory because `CLAUDE.md`, `.claude/`, and `.planning/` already existed.
- **Fix:** Scaffolded to `/tmp/kofferklar-scaffold2`, then copied scaffold files to worktree, then ran `npm install` clean to avoid broken symlinks from cp of node_modules.
- **Files modified:** All scaffold files (package.json, app/, public/, etc.)
- **Commit:** 98159a2

**3. [Rule 2 - Missing Critical] .gitignore must exist before Task 1 commit**
- **Found during:** Task 1 commit prep
- **Issue:** Task 2 owns `.gitignore` but committing Task 1 files without proper exclusions would have staged node_modules (20k+ files) and .next/ into git.
- **Fix:** Wrote `.gitignore` with all required exclusions (node_modules, .next/, .env*.local, .sanity/, coverage/, .DS_Store, *.tsbuildinfo) as part of Task 1 staging to prevent accidental inclusion of generated files.
- **Files modified:** .gitignore
- **Commit:** 98159a2 (included in Task 1 commit rather than Task 2)

## Threat Surface Scan

No new threat surface beyond what is documented in the plan's threat model:
- T-01-01 mitigated: `.gitignore` excludes `.env*.local`
- T-01-02 mitigated: `.env.example` confirms SANITY_WRITE_TOKEN and STUDIO_PASSWORD have no NEXT_PUBLIC_ prefix
- T-01-03 mitigated: `vercel.json` adds X-Robots-Tag noindex to preview deployments

## Known Stubs

None — this plan is infrastructure-only (no UI components, no data rendering). The scaffolded `app/page.tsx` is the default Next.js starter page stub which will be replaced in a later plan.

## Self-Check: PASSED

Files verified:
- package.json: FOUND
- tailwind.config.ts: FOUND
- postcss.config.mjs: FOUND
- app/globals.css: FOUND
- app/layout.tsx: FOUND
- .env.example: FOUND
- vercel.json: FOUND
- README.md: FOUND
- .gitignore: FOUND (with required entries)

Commits verified:
- 98159a2 (Task 1): FOUND
- 1822430 (Task 2): FOUND
