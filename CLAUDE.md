<!-- GSD:project-start source:PROJECT.md -->
## Project

**KofferKlar**

KofferKlar ist eine produktionsreife, desktop-first E-Commerce-Website für kofferklar.de, die ein 8-teiliges Kompressions-Packwürfel-Set an reiseaffine junge Erwachsene in Deutschland verkauft. Die Website führt Besucher vom Erstkontakt bis zur Kaufentscheidung — schnell, vertrauenswürdig und conversion-orientiert. Inhalte werden zentral über Sanity.io gepflegt; technische Basis ist Next.js 15, TypeScript, Tailwind CSS und Vercel.

**Core Value:** Ein Besucher, der die Produktseite aufruft, versteht sofort den Nutzen, vertraut dem Anbieter und kann in wenigen Klicks kaufen — ohne Ablenkung, ohne Zweifel.

### Constraints

- **Tech Stack**: Next.js 15, TypeScript, Tailwind CSS, Sanity.io, Vercel — festgelegt, kein Abweichen
- **Layout-Strategie**: Desktop-first CSS, aber vollständig responsive; Mobile-User kommen häufig über Social/Ads
- **Navigation**: Maximal 2 Ebenen, flach — kein Mega-Menü, kein komplexes Routing
- **Sprache**: Einfach, klar, ohne Fachjargon — deutsche Inhalte
- **Bilder**: Alle mit Placeholder — austauschbar ohne Code-Änderungen
- **Externe Services**: Nur Sanity (CMS + Formulare) und Vercel (Hosting) — minimale Drittanbieter-Abhängigkeiten
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

## Core Packages (with versions)
| Package | Version | Role |
|---------|---------|------|
| `next` | 15.x (latest) | Framework |
| `react` / `react-dom` | 19.x | UI runtime |
| `typescript` | 5.x | Type safety |
| `tailwindcss` | 3.4.x | Styling |
| `@tailwindcss/typography` | 0.5.x | Prose/blog styles |
| `sanity` | 3.x (latest) | CMS Studio |
| `next-sanity` | 9.x | Next.js ↔ Sanity integration (GROQ, live preview) |
| `@sanity/image-url` | 1.x | Image URL builder |
| `@sanity/client` | 6.x | Sanity API client |
| `@portabletext/react` | 3.x | Blog body renderer |
| `framer-motion` | 11.x | Animations (product page, transitions) |
| `react-hook-form` | 7.x | Form state + validation |
| `zod` | 3.x | Schema validation for form + env vars |
| `lucide-react` | 0.4x | Icons |
| `sharp` | 0.33.x | Image processing (required by next/image on Vercel) |
## Sanity Integration Pattern
- `/` (Startseite): `revalidate: 3600` (ISR, hourly) — content changes infrequently
- `/produkt`: `revalidate: 3600` (ISR) — product data, not real-time
- `/ratgeber/[slug]`: `generateStaticParams` + `revalidate: 86400` (SSG + daily revalidation)
- `/ratgeber`: `revalidate: 3600` (ISR)
- Static legal pages: `export const dynamic = 'force-static'` (pure SSG, never changes)
- Contact form submission: Server Action (no caching)
## Image Strategy
## Font Pairing Recommendation
- Inter: UI, body text, navigation, prices — clean, highly legible
- Playfair Display: Headlines, hero text — adds premium/editorial feel
- If simplicity is preferred — one font, variable weight, modern and clean
## Animation Strategy
- Hero entrance animations
- Before/after slider
- Product image gallery transitions
- Scroll-triggered section reveals
## SEO Architecture
- Static routes hardcoded
- Dynamic blog slugs fetched from Sanity
- Exclude `drafts.**` documents
- Allow all for production
- Disallow /studio (Sanity studio route)
## Form → Sanity Pattern
## What NOT to Use
| Skip | Reason |
|------|--------|
| Formspark / Formspree | Unnecessary external service — Sanity handles it |
| Redux / Zustand | No shared global state needed for a single-product site |
| CSS Modules | Tailwind covers all styling needs |
| `getServerSideProps` | Legacy Pages Router API — we use App Router |
| `axios` | `fetch` with Next.js extensions is sufficient |
| Prisma / DB | No database — Sanity is the only data source |
| `react-query` | Not needed with Server Components + ISR |
| Multiple icon libraries | `lucide-react` only |
| `styled-components` | Conflicts with Tailwind approach |
| CookieBot/paid cookie tool | A simple consent banner component is sufficient for v1 |
## Confidence Levels
| Area | Confidence | Note |
|------|-----------|------|
| Next.js 15 App Router | High | Stable, well-documented |
| next-sanity 9.x | High | Official integration, actively maintained |
| Tailwind 3.4 | High | v4 in beta — stick with v3 for stability |
| Framer Motion 11 | High | Mature, good React 19 support |
| Font pairing | Medium | Subjective — final call after seeing logo |
| Sanity write token pattern | High | Standard server-action approach |
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

| Skill | Description | Path |
|-------|-------------|------|
| design-taste-frontend | Senior UI/UX Engineer. Architect digital interfaces overriding default LLM biases. Enforces metric-based rules, strict component architecture, CSS hardware acceleration, and balanced design engineering. | `.agents/skills/design-taste-frontend/SKILL.md` |
| full-output-enforcement | Overrides default LLM truncation behavior. Enforces complete code generation, bans placeholder patterns, and handles token-limit splits cleanly. Apply to any task requiring exhaustive, unabridged output. | `.agents/skills/full-output-enforcement/SKILL.md` |
| high-end-visual-design | Teaches the AI to design like a high-end agency. Defines the exact fonts, spacing, shadows, card structures, and animations that make a website feel expensive. Blocks all the common defaults that make AI designs look cheap or generic. | `.agents/skills/high-end-visual-design/SKILL.md` |
| industrial-brutalist-ui | Raw mechanical interfaces fusing Swiss typographic print with military terminal aesthetics. Rigid grids, extreme type scale contrast, utilitarian color, analog degradation effects. For data-heavy dashboards, portfolios, or editorial sites that need to feel like declassified blueprints. | `.agents/skills/industrial-brutalist-ui/SKILL.md` |
| minimalist-ui | Clean editorial-style interfaces. Warm monochrome palette, typographic contrast, flat bento grids, muted pastels. No gradients, no heavy shadows. | `.agents/skills/minimalist-ui/SKILL.md` |
| redesign-existing-projects | Upgrades existing websites and apps to premium quality. Audits current design, identifies generic AI patterns, and applies high-end design standards without breaking functionality. Works with any CSS framework or vanilla CSS. | `.agents/skills/redesign-existing-projects/SKILL.md` |
| stitch-design-taste | Semantic Design System Skill for Google Stitch. Generates agent-friendly DESIGN.md files that enforce premium, anti-generic UI standards — strict typography, calibrated color, asymmetric layouts, perpetual micro-motion, and hardware-accelerated performance. | `.agents/skills/stitch-design-taste/SKILL.md` |
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
