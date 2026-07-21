# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start Vite dev server (HMR)
npm run build     # production build → dist/
npm run preview   # serve dist/ locally
npm run lint      # run oxlint
```

No test runner is configured.

## Stack

- **React 19 + TypeScript** (`.tsx`) + **Vite**
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin + `tailwindcss-animate` plugin
- **GSAP 3 + ScrollTrigger + SplitText** — primary animation library
- **Lenis** — smooth scroll; singleton exported from `src/lib/lenis.ts`, integrated with GSAP ticker in `App.tsx`
- **Framer Motion** — used only in `src/components/core/cursor.tsx`; not used elsewhere
- **Lucide React** — icon set; `@lobehub/icons` and `simple-icons` are installed but unused
- **Inter** — loaded via `@fontsource/inter` in `main.tsx`; **Anton** and **Archivo** — loaded via Google Fonts `@import` in `index.css`
- Path alias: `@` → `src/`

## Architecture

Single-page app. No router — all sections stacked vertically.

`src/main.tsx` wraps `<App />` in `<LangProvider>` (from `src/context/LangContext.tsx`). `App.tsx` renders in order:

1. `<IntroLoader onDone={…} />` — rendered conditionally until `introDone` state is true
2. `<ScrollProgress />` — fixed top progress bar (`z: 150`)
3. Fixed right-edge menu button with `useMagnetic` effect (`z-50`) that toggles `<MenuPanel />`
4. `<MenuPanel />` — slide-in right drawer (`z-200`), backdrop (`z-190`)
5. `<Hero />` — scroll-animated hero section
6. `<ProjectsSection />` — **mobile only** (`{isMobile && <ProjectsSection />}`, rendered before `AboutSection`)
7. `<AboutSection />` — SplitText line-reveal section
8. `<HorizontalSection />` — GSAP-pinned horizontal scroll
9. `<DarkTransition />` — scroll-driven light-to-dark color transition with image cursor trail
10. `<FooterSection />` — dual marquee + contact links + scroll-to-top

Section anchor divs (`id="section-about"`, `id="section-work"`, `id="section-contact"`) are placed between sections for `MenuPanel` nav scrolling. `About.tsx` is fully built but currently commented out. `Contact.tsx`, `Projects.tsx`, and `Skills.tsx` are unused scaffold files from the initial Vite template — do not import them.

### Bilingual content (`src/data/content.ts`)

All user-visible text is extracted into a single exported `C` object with `{ ko: string, en: string }` entries. The `LangContext` (`src/context/LangContext.tsx`) provides `lang` (`'ko' | 'en'`) and a `toggle()` function app-wide. Components consume `useLang()` and index into `C` with `lang`. The toggle button lives in `MenuPanel`. **Never hardcode copy directly in components — update `content.ts` instead.**

### Smooth scroll (Lenis)

`src/lib/lenis.ts` exports a Lenis singleton (or `null` if `prefers-reduced-motion`). `App.tsx` wires Lenis into GSAP: `lenis.on('scroll', ScrollTrigger.update)` and `gsap.ticker.add(raf)` with `lagSmoothing(0)`. A `ScrollTrigger.addEventListener('refreshInit', …)` handler calls `lenis.scrollTo(lenis.actualScroll, { immediate: true })` before each refresh to keep virtual scroll and `window.scrollY` in sync.

All `scrollTo` calls go through Lenis with a native fallback:
```ts
lenis ? lenis.scrollTo(el) : el.scrollIntoView({ behavior: 'smooth' })
```

Lenis is paused during `IntroLoader` and resumed on completion.

### IntroLoader

Full-screen dark overlay (`z: 400`) that plays a GSAP sequence on mount: letters of "RE:BUILD" stagger in → progress bar expands → overlay fades out. Sets `body.overflow = 'hidden'` during play. Calls `onDone()` on complete (or immediately if `prefers-reduced-motion`).

### Scroll animation pattern (Hero)

`Hero.tsx` uses a tall wrapper div (`height: 1100vh`) with a `sticky top-0 h-screen` inner container. A single GSAP timeline is scrubbed via `ScrollTrigger` (`scrub: 1.8`, `end: +=1000%`). The GSAP context is scoped to `wrapperRef` and cleaned up with `ctx.revert()` on unmount.

`BlankNextSection` renders inside the circle-clip div and contains the archive panels grid (data sourced from `src/data/projects.tsx`). GSAP selects `.archive-panel` and `.next-section-title` by class name within the wrapper scope — keep those class names stable. `BlankNextSection` also renders a portal-based project detail modal triggered by clicking an archive card.

### AboutSection

Uses GSAP `SplitText` (premium plugin) to split `[data-split]` elements into lines, wraps each in an `overflow:hidden` div, and animates `yPercent: 110 → 0` on `ScrollTrigger` enter (`once: true`, `start: 'top 82%'`). Rebuilds on window resize with 180 ms debounce. Respects `prefers-reduced-motion`.

### HorizontalSection

GSAP-pinned horizontal scroll. `PANELS` defines the content — each panel has a `label`, `title[]`, `lines[]`, and one of: `icons` (icon grid), `principles` (numbered list), `stat + entries` (stat block), or `img`. The timeline alternates hold/slide segments (`holdDuration = 0.8`, `slideDuration = 1.0`) and triggers staggered text reveals per panel on `.p-label`, `.p-title`, `.p-body`, `.p-visual` class selectors. Keep `horizontal-panel` class stable — used by `gsap.utils.toArray`.

### ProjectsSection

`src/components/ProjectsSection.tsx` — responsive project grid rendered for mobile only in `App.tsx`. Accepts `forceCols` and `compact` props; GSAP scroll-reveal is skipped when either prop is set. Clicking a card opens `<ProjectModal>` via React portal. Project data (`WORK_PANELS`) lives in `src/data/projects.tsx` alongside `Panel` / `Detail` types and icon helpers. On desktop, projects are surfaced through the `BlankNextSection` archive panels inside `Hero`.

### DarkTransition

`300vh` tall section with a sticky inner div. GSAP + ScrollTrigger animates background from `#f0f0ee → #000` as the user scrolls. A pool of 7 product images trails the cursor position (gated by a pixel threshold, animated with `gsap.set` + `gsap.to`).

### Reusable primitives

- **`src/components/core/SplitReveal.tsx`** — polymorphic component (`as` prop) that word-wraps children in `overflow:hidden` spans and animates them up from `yPercent: 110` on scroll entry. Simpler than GSAP `SplitText`; no resize handling.
- **`src/components/core/cursor.tsx`** — `<Cursor>` — portal-based cursor follower (framer-motion springs). Supports `attachToParent` mode and arbitrary children/variants.
- **`src/hooks/useMagnetic.ts`** — attaches GSAP `quickTo` magnetic attraction to a ref'd element. Disabled on `pointer: coarse` and `prefers-reduced-motion`. Used on the menu button, footer links, and scroll-to-top button.
- **`src/hooks/useBreakpoint.ts`** — `{ isMobile, isTablet, isMobileOrTablet }` based on `window.innerWidth` with resize listener (breakpoints: 768 / 1024).

### MenuPanel

CSS-transition-only slide-in drawer. Nav items scroll to section anchors via Lenis. Bottom bar has language toggle, GitHub link, and email button (copies to clipboard and opens `mailto:`). The fill-layer hover effect uses `scale-y-0 → scale-y-100` on an absolute `<span>`.

## Styling

**`src/index.css`** is the sole stylesheet:
- `@import url(...)` for Anton and Archivo from Google Fonts, then `@import "tailwindcss"` + `@plugin "tailwindcss-animate"`
- Defines HSL custom properties on `:root` mapped via `@theme inline` to Tailwind color utilities (`background`, `foreground`, `accent`, `muted`, `border`)
- The actual page background is `#f5f5f3` (set on `body`); section backgrounds use `#efefed`
- Inline `style={{}}` props are used for values Tailwind cannot express: `clamp()`, `vw`/`vh` units, and GSAP-managed properties
- Two font style constants are defined locally in each component that needs them:
  ```ts
  const ANTON:   CSSProperties = { fontFamily: "'Anton', Impact, ..." }
  const ARCHIVO: CSSProperties = { fontFamily: "'Archivo', sans-serif" }
  ```

## Project data

Key locations:

- `C` (all bilingual copy) — `src/data/content.ts`
- `WORK_PANELS`, `Panel`, `Detail` types, icon helpers — `src/data/projects.tsx`
- `PANELS` (horizontal carousel) — `HorizontalSection.tsx`
- Project card images — `src/images/` (imported directly as modules)

No external data fetching or state management library.
