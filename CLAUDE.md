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

`src/main.tsx` mounts `<App />`. Currently `App.tsx` only renders `<Hero />`. The other section components (`About`, `Projects`, `Skills`, `Contact`) exist as scaffolds and are not yet wired in.

### Scroll animation pattern (Hero)

`Hero.tsx` uses a tall wrapper div (`height: 1100vh`) with a `sticky top-0 h-screen` inner container. A single GSAP timeline is scrubbed via `ScrollTrigger` (`scrub: 1.8`, `end: +=1000%`). All animated elements are positioned absolutely inside the sticky container. The GSAP context is cleaned up with `ctx.revert()` on unmount.

`BlankNextSection` is rendered inside the circle-clip div and contains the archive panels grid (`WORK_PANELS`). GSAP selects `.archive-panel` and `.next-section-title` by class name across the DOM — keep those class names stable.

## Styling

**`src/index.css`** is the sole stylesheet:
- `@import "tailwindcss"` + `@plugin "tailwindcss-animate"`
- Defines HSL custom properties on `:root` mapped via `@theme inline` to Tailwind color utilities (`background`, `foreground`, `accent`, `muted`, `border`)
- Components use Tailwind utilities for layout and spacing
- Inline `style={{}}` props are acceptable for values Tailwind cannot express: `clamp()`, `vw`/`vh` units, and GSAP-managed properties

## Project data

Static arrays defined inline in each component (`WORK_PANELS` in `BlankNextSection`, `PROJECTS` in `Projects`, `SKILLS` in `Skills`). No external data fetching or state management library.
