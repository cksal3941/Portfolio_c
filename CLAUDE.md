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
- **framer-motion** — used only in `src/components/core/cursor.tsx`; mounted via `BlankNextSection`, not directly in `App`
- **Lucide React** — icon set; `@lobehub/icons` (dep) and `simple-icons` (devDep) are installed but unused
- **Inter** — loaded via `@fontsource/inter` package in `main.tsx`; **Anton** and **Archivo** — loaded via Google Fonts `@import` at the top of `index.css`
- Path alias: `@` → `src/`

## Architecture

Single-page app. No router — all sections stacked vertically.

`src/main.tsx` wraps `<App />` in `<LangProvider>` (from `src/context/LangContext.tsx`). `App.tsx` renders in order:

1. `<IntroLoader onDone={…} />` — rendered conditionally until `introDone` state is true
2. `<ScrollProgress />` — fixed top progress bar (`z: 150`)
3. Fixed right-edge menu button with `useMagnetic` effect (`z-50`) that toggles `<MenuPanel />`
4. `<MenuPanel />` — slide-in right drawer (`z-200`), backdrop (`z-190`)
5. `<Hero />` — scroll-animated hero section
6. `<AboutSection />` — SplitText line-reveal section
7. `<HorizontalSection />` — GSAP-pinned horizontal scroll
8. `<DarkTransition />` — scroll-driven light-to-dark color transition
9. `<FooterSection />` — dual marquee + contact + Seoul time

Section anchor divs (`id="section-about"`, `id="section-work"`, `id="section-contact"`) are placed between sections for nav scrolling. `About` is commented out in App.tsx.

### Smooth scroll (Lenis)

`src/lib/lenis.ts` exports a Lenis singleton (or `null` if `prefers-reduced-motion`). App wires Lenis into GSAP: `lenis.on('scroll', ScrollTrigger.update)` and `gsap.ticker.add(raf)` with `lagSmoothing(0)`. A `ScrollTrigger.addEventListener('refreshInit', …)` handler calls `lenis.scrollTo(lenis.actualScroll, { immediate: true })` before each refresh to keep virtual scroll and `window.scrollY` in sync. All `ScrollTrigger` instances benefit automatically.

### Bilingual content (`src/data/content.ts`)

All user-visible text is extracted into a single `C` object with `{ ko: string, en: string }` entries. The `LangContext` (`src/context/LangContext.tsx`) provides `lang` (`'ko' | 'en'`) and a `toggle()` function app-wide. Components consume `useLang()` and index into `C` with `lang`.

### IntroLoader

Full-screen dark overlay (`z: 400`) that plays a GSAP sequence on mount: letters of "RE:BLIDE" fly up → underline expands → overlay slides off screen. Sets `body.overflow = 'hidden'` during play. Calls `onDone()` on complete (or immediately if `prefers-reduced-motion`).

### Scroll animation pattern (Hero)

`Hero.tsx` uses a tall wrapper div (`height: 1100vh`) with a `sticky top-0 h-screen` inner container. A single GSAP timeline is scrubbed via `ScrollTrigger` (`scrub: 1.8`, `end: +=1000%`). All animated elements are positioned absolutely inside the sticky container. The GSAP context is scoped to `wrapperRef` and cleaned up with `ctx.revert()` on unmount.

`BlankNextSection` is rendered inside the circle-clip div and contains the archive panels grid (`WORK_PANELS`). GSAP selects `.archive-panel` and `.next-section-title` by class name within the wrapper scope — keep those class names stable. `BlankNextSection` also renders a portal-based project detail modal (full-screen overlay) triggered by clicking an archive card.

### AboutSection

Uses GSAP `SplitText` (premium plugin) to split `[data-split]` elements into lines, wraps each in an `overflow:hidden` div, and animates `yPercent: 110 → 0` on `ScrollTrigger` enter (`once: true`, `start: 'top 82%'`). Rebuilds on window resize with 180 ms debounce. Cleans up by reverting splits and killing triggers.

### HorizontalSection

GSAP-pinned horizontal scroll. `PANELS` defines the content — each panel has a `label`, `title[]`, `lines[]`, and one of: `icons` (icon grid), `principles` (numbered list), `stat + entries` (stat block), or `img`. The timeline alternates hold/slide segments (`holdDuration = 0.8`, `slideDuration = 1.0`) and triggers staggered text reveals per panel on `.p-label`, `.p-title`, `.p-body`, `.p-visual` class selectors. Keep `horizontal-panel` class stable — used by `gsap.utils.toArray`.

Movement uses `x` in `vw` units (not `xPercent`) so translation is always exactly one viewport wide, independent of the track's total width. Custom image cursor cycles through `src/images/item.png` – `item6.png` (6 images); hidden on touch devices. Mouse movement drives a 3D tilt via `rotateX`/`rotateY` on an intermediate `tiltRef` div.

### DarkTransition

Wrapper height `300vh`, sticky inner section. Scroll-scrubbed timeline animates `backgroundColor` from `#f0f0ee` to `#000000` and `color` from `#111111` to `#ffffff` simultaneously.

### FooterSection

Two infinite marquees (top: left-moving, bottom: right-moving outlined) using two DOM clones each (`xPercent` with `gsap.utils.wrap`). Hover slows marquee to 0.3× speed. Shows live Seoul time via `setInterval`. Contact links (`mailto:` and GitHub) with inline hover handlers.

### MenuPanel

CSS-transition-only slide-in drawer (no GSAP). `NAV_ITEMS` are currently non-functional `<button>` elements. The fill-layer hover effect uses `scale-y-0 → scale-y-100` on an absolute `<span>` inside each button.

### Utilities

- `src/hooks/useMagnetic.ts` — GSAP `quickTo` magnetic pull effect; returns a ref; no-ops on touch/reduced-motion
- `src/components/ScrollProgress.tsx` — fixed 2px top bar driven by Lenis or native scroll
- `src/components/core/SplitReveal.tsx` — reusable SplitText reveal component
- `src/components/core/cursor.tsx` — Framer Motion spring-tracked cursor via portal; not mounted in App

## Styling

**`src/index.css`** is the sole stylesheet:
- `@import url(…)` for Anton + Archivo from Google Fonts, then `@import "tailwindcss"` + `@plugin "tailwindcss-animate"`
- Defines HSL custom properties on `:root` mapped via `@theme inline` to Tailwind color utilities (`background`, `foreground`, `accent`, `muted`, `border`)
- Body font is Archivo; page background is `#f5f5f3`; section backgrounds use `#efefed`
- Inline `style={{}}` props are acceptable for values Tailwind cannot express: `clamp()`, `vw`/`vh` units, and GSAP-managed properties

## Project data

Static arrays defined inline in each component. Key locations:
- `WORK_PANELS` — `BlankNextSection.tsx` (archive card grid in Hero)
- `PANELS` — `HorizontalSection.tsx` (horizontal scroll panel content)
- `NAV_ITEMS` — `MenuPanel.tsx`
- Bilingual text — `src/data/content.ts` (`C` object, keyed by section and `lang`)

No external data fetching or state management library.

### Unused scaffold components

`src/components/Projects.tsx`, `Skills.tsx`, and `Contact.tsx` are placeholder components from initial scaffolding — not imported or mounted anywhere. Do not use them; the live sections are `BlankNextSection` (work grid), `HorizontalSection` (skills), and `FooterSection` (contact).
