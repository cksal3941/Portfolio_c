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
- **GSAP 3 + ScrollTrigger** — primary animation library; `framer-motion` is installed but not yet used
- **Lucide React** — icon set
- **@fontsource/inter** — Inter font loaded as a package dependency
- Path alias: `@` → `src/`

## Architecture

Single-page app. No router — all sections stacked vertically.

`src/main.tsx` mounts `<App />`. `App.tsx` renders:
- A fixed right-edge menu button (`z-50`, centered vertically) that toggles `<MenuPanel />`
- `<MenuPanel />` — slide-in right drawer (`z-200`), backdrop (`z-190`)
- `<Hero />` — the scroll-animated section
- `<About />` — fully built, directly below Hero

`Projects`, `Skills`, and `Contact` components exist as scaffolds in `src/components/` but are not yet wired into `App.tsx`.

### Scroll animation pattern (Hero)

`Hero.tsx` uses a tall wrapper div (`height: 1100vh`) with a `sticky top-0 h-screen` inner container. A single GSAP timeline is scrubbed via `ScrollTrigger` (`scrub: 1.8`, `end: +=1000%`). All animated elements are positioned absolutely inside the sticky container. The GSAP context is scoped to `wrapperRef` and cleaned up with `ctx.revert()` on unmount.

`BlankNextSection` is rendered inside the circle-clip div and contains the archive panels grid (`WORK_PANELS`). GSAP selects `.archive-panel` and `.next-section-title` by class name within the wrapper scope — keep those class names stable.

### MenuPanel

`MenuPanel.tsx` is a CSS-transition-only slide-in drawer (no GSAP). `NAV_ITEMS` are currently non-functional `<button>` elements. The fill-layer hover effect uses `scale-y-0 → scale-y-100` on an absolute `<span>` inside each button.

### About

`About.tsx` is a fully built, static section with 10 sub-sections (Opening, collage, pull quote, story columns, full-bleed image, Work Style, Strength, Skills, Experience, Epilogue). It defines its own local `SKILLS`, `EXPERIENCE`, and `STRENGTH` arrays — these are distinct from the `SKILLS` array in the scaffold `Skills.tsx` component.

## Styling

**`src/index.css`** is the sole stylesheet:
- `@import "tailwindcss"` + `@plugin "tailwindcss-animate"`
- Defines HSL custom properties on `:root` mapped via `@theme inline` to Tailwind color utilities (`background`, `foreground`, `accent`, `muted`, `border`)
- The actual page background is `#f5f5f3` (set on `body`) — the CSS custom property `--background` is dark and not currently used for the main layout
- Components use Tailwind utilities for layout and spacing
- Inline `style={{}}` props are acceptable for values Tailwind cannot express: `clamp()`, `vw`/`vh` units, and GSAP-managed properties

## Project data

Static arrays defined inline in each component. Key locations:
- `WORK_PANELS` — `BlankNextSection.tsx` (archive card grid)
- `SKILLS`, `EXPERIENCE`, `STRENGTH` — `About.tsx` (About section data)
- `PROJECTS` — `Projects.tsx` scaffold
- `NAV_ITEMS` — `MenuPanel.tsx`

No external data fetching or state management library.
