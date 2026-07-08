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
- **GSAP 3 + ScrollTrigger + SplitText** — primary animation library; `framer-motion` is installed but not used
- **Lucide React** — icon set
- **Inter** — loaded via `@fontsource/inter` package; **Anton** — loaded via Google Fonts in `index.css`
- Path alias: `@` → `src/`

## Architecture

Single-page app. No router — all sections stacked vertically.

`src/main.tsx` mounts `<App />`. `App.tsx` renders (in order):
1. Fixed right-edge menu button (`z-50`) that toggles `<MenuPanel />`
2. `<MenuPanel />` — slide-in right drawer (`z-200`), backdrop (`z-190`)
3. `<Hero />` — tall scroll-scrubbed section
4. `<AboutSection />` — scroll-triggered SplitText reveal section
5. `<HorizontalSection />` — pinned horizontal scroll through 6 panels
6. `<About />` — static long-form about section

`Projects`, `Skills`, and `Contact` components exist as scaffolds in `src/components/` but are not wired into `App.tsx`.

### Scroll animation pattern (Hero)

`Hero.tsx` uses a tall wrapper div (`height: 1100vh`) with a `sticky top-0 h-screen` inner container. A single GSAP timeline is scrubbed via `ScrollTrigger` (`scrub: 1.8`, `end: +=1000%`). All animated elements are positioned absolutely inside the sticky container. The GSAP context is scoped to `wrapperRef` and cleaned up with `ctx.revert()` on unmount.

`BlankNextSection` is rendered inside the circle-clip div and contains the archive panels grid (`WORK_PANELS`). GSAP selects `.archive-panel` and `.next-section-title` by class name within the wrapper scope — keep those class names stable.

`BlankNextSection` also renders a portal-based project detail modal (full-screen overlay), triggered by clicking an archive card. Project images are imported as PNGs from `src/images/`.

### AboutSection

`AboutSection.tsx` uses GSAP `SplitText` to split `[data-split]` elements into lines and reveals them with a `yPercent` animation on scroll entry (`ScrollTrigger`, `once: true`, `start: 'top 82%'`). Respects `prefers-reduced-motion`. Re-splits on window resize (180 ms debounce). Does not use the Hero scrub pattern — each trigger fires independently.

### HorizontalSection

`HorizontalSection.tsx` is a pinned horizontal carousel of 6 `PANELS`. GSAP pins the container, then a timeline alternates between **hold** segments (panel stays visible) and **slide** segments (track translates by `100vw`). Movement uses `x` in `vw` units (not `xPercent`) so translation is always exactly one viewport. Each panel reveals `.p-label`, `.p-title`, `.p-body`, `.p-visual` elements with staggered `y + opacity` animations at the start of its hold segment. Keep those class names stable.

Panel layout: header bar → flex body (left: label + title; right: varies by panel type) → footer bar. The right column renders `<IconGrid>`, `<PrinciplesGrid>`, `<StatList>`, or an `<img>` depending on which `PANELS` fields are non-null.

### MenuPanel

`MenuPanel.tsx` is a CSS-transition-only slide-in drawer (no GSAP). `NAV_ITEMS` are currently non-functional `<button>` elements. The fill-layer hover effect uses `scale-y-0 → scale-y-100` on an absolute `<span>` inside each button.

### About

`About.tsx` is a fully built, static section with 10 sub-sections (Opening, collage, pull quote, story columns, full-bleed image, Work Style, Strength, Skills, Experience, Epilogue). It defines its own local `SKILLS`, `EXPERIENCE`, and `STRENGTH` arrays — these are distinct from the `SKILLS` array in the scaffold `Skills.tsx` component.

## Styling

**`src/index.css`** is the sole stylesheet:
- `@import url(...)` for Anton from Google Fonts, then `@import "tailwindcss"` + `@plugin "tailwindcss-animate"`
- Defines HSL custom properties on `:root` mapped via `@theme inline` to Tailwind color utilities (`background`, `foreground`, `accent`, `muted`, `border`)
- The actual page background is `#f5f5f3` (set on `body`); section backgrounds use `#efefed` — the CSS custom property `--background` is dark and not used for main layout
- Components use Tailwind utilities for layout and spacing
- Inline `style={{}}` props are acceptable for values Tailwind cannot express: `clamp()`, `vw`/`vh` units, and GSAP-managed properties
- Anton is applied via inline `fontFamily` style constant (`ANTON`) defined locally in each component that needs it

## Project data

Static arrays defined inline in each component. Key locations:
- `WORK_PANELS` — `BlankNextSection.tsx` (archive card grid + modal detail data)
- `PANELS` — `HorizontalSection.tsx` (6-panel horizontal carousel)
- `SKILLS`, `EXPERIENCE`, `STRENGTH` — `About.tsx` (About section data)
- `PROJECTS` — `Projects.tsx` scaffold
- `NAV_ITEMS` — `MenuPanel.tsx`

Project card images live in `src/images/` and are imported directly as modules.

No external data fetching or state management library.
