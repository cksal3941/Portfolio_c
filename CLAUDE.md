# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start Vite dev server (HMR)
npm run build     # production build → dist/
npm run preview   # serve dist/ locally
npm run lint      # run oxlint
```

No test runner is configured. Run `npm run build` after every change to catch TypeScript errors early.

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
6. `{isMobile && <ProjectsSection />}` — mobile only, rendered before `AboutSection`
7. `<div id="section-about" />` then `<AboutSection />`
8. `<div id="section-work" />` then `<HorizontalSection />`
9. `<DarkTransition />` — scroll-driven light-to-dark color transition with image cursor trail
10. `<div id="section-contact" />` then `<FooterSection />`

`About.tsx` is fully implemented but commented out in `App.tsx`. `Contact.tsx`, `Projects.tsx`, and `Skills.tsx` are unused scaffold files — do not import them.

**Pending (see `WORK_ORDER_2.md`):** `About.tsx` is planned to be uncommented and inserted between `AboutSection` and `HorizontalSection`. The `#section-projects` anchor targeted by the "Projects" menu item does not yet exist in `App.tsx`.

### Stable class names (GSAP selectors — never rename)

`.archive-panel`, `.archive-card`, `.next-section-title`, `.horizontal-panel`, `.about-img-wrap`

### Bilingual content (`src/data/content.ts`)

All user-visible text lives in a single exported `C` object with `{ ko: string, en: string }` entries. `LangContext` provides `lang` and `toggle()` app-wide. Never hardcode copy directly in components — update `content.ts` instead.

### Smooth scroll (Lenis)

`src/lib/lenis.ts` exports a Lenis singleton (or `null` if `prefers-reduced-motion`). `App.tsx` wires Lenis into GSAP: `lenis.on('scroll', ScrollTrigger.update)` and `gsap.ticker.add(raf)` with `lagSmoothing(0)`. A `refreshInit` listener calls `lenis.scrollTo(lenis.actualScroll, { immediate: true, force: true })` before each ScrollTrigger refresh to keep virtual scroll and `window.scrollY` in sync. A `refresh` listener calls `lenis.resize()` after pin spacers update.

All `scrollTo` calls follow this pattern:
```ts
lenis ? lenis.scrollTo(el) : el.scrollIntoView({ behavior: 'smooth' })
```

Lenis is stopped during `IntroLoader` and resumed (`lenis.start()`) in `onDone`.

`App.tsx` also resets scroll position to 0 and calls `ScrollTrigger.refresh()` whenever `isMobile` breakpoint flips, to avoid blank-screen on orientation change.

### IntroLoader

Full-screen dark overlay (`z: 400`). On mount: calls `lenis.stop()` and sets `body.overflow = 'hidden'`. Plays a GSAP sequence: letters of `"RE:BUILD"` stagger up from `opacity: 0` → a progress bar expands → overlay fades. Calls `onDone()` on complete (or immediately if `prefers-reduced-motion`).

### Hero

`Hero.tsx` uses a tall wrapper div (`height: 1100vh`) with a `sticky top-0 h-screen` inner container. A single GSAP timeline is scrubbed via `ScrollTrigger` (`scrub: 1.8`, `end: +=1000%`). The GSAP context is scoped to `wrapperRef` and cleaned up with `ctx.revert()` on unmount.

`BlankNextSection` renders inside the circle-clip div — contains the archive panels grid (data from `src/data/projects.tsx`) and a portal-based project detail modal.

### AboutSection

GSAP `SplitText` splits `[data-split]` elements into lines, wraps each in `overflow:hidden`, and animates `yPercent: 110 → 0` on scroll entry (`once: true`, `start: 'top 82%'`). Rebuilds on window resize (180 ms debounce). Respects `prefers-reduced-motion`.

### HorizontalSection

GSAP-pinned horizontal scroll. `PANELS` (defined inline) drives content — each panel has `label`, `title[]`, `lines[]`, and one of: `icons`, `principles`, `stat + entries`, or `img`. The timeline alternates hold/slide segments and triggers staggered text reveals on `.p-label`, `.p-title`, `.p-body`, `.p-visual`.

Movement uses `x` in `vw` units so each slide is exactly one viewport wide. A custom image cursor cycles through `src/images/item.png`–`item6.png` (6 images); hidden on touch devices. Mouse movement drives a 3D tilt via `rotateX`/`rotateY` on a `tiltRef` div.

### ProjectsSection

`src/components/ProjectsSection.tsx` — vertical project grid. Accepts `forceCols` and `compact` props; GSAP scroll-reveal is skipped when either is set. Clicking a card opens `<ProjectModal>` via React portal. Project data (`WORK_PANELS`) lives in `src/data/projects.tsx`. On desktop, projects are surfaced through `BlankNextSection` archive panels inside Hero.

### ProjectModal

Full-screen portal overlay (`z: 300/310`). On mount: calls `lenis.stop()` and blocks scroll. Entrance animation: `y: 48, opacity: 0 → 0, 1`. Close triggers exit animation before `onClose`. On unmount: calls `lenis.start()`.

### DarkTransition

`300vh` tall wrapper, sticky inner section. GSAP + ScrollTrigger animates `backgroundColor: #f0f0ee → #000` and `color: #111 → #fff` simultaneously (`scrub: true`, `end: +=200%`).

Cursor trail: a pool of 7 product images (`leftbg.png`, `lotionmodel.png`, `model-shot3.png`, `model-shot7.png`, `oilhand.png`, `Routine Lineup.png`, `shampoohand.png`). Each image is 160×210 px and only triggers when mouse moves ≥160 px from last position. GSAP animates the image: `opacity: 1 → 0`, `y: -100 px`, `scale: 0.82` over 1.6 s. These trail images are distinct from the HorizontalSection cursor images (item.png series).

### FooterSection

Two infinite marquees using two DOM clones each (`xPercent` with `gsap.utils.wrap`). Hover slows marquee to 0.3× speed. Shows live Seoul time via `setInterval`. Contact links with `useMagnetic`. A scroll-to-top button (`lenis.scrollTo(0)`) with magnetic pull.

### MenuPanel

CSS-transition-only slide-in drawer. Nav items come from `C.menu.items` (5 items: Home, Projects, Work, About, Contact). `handleNav(target)` calls `onClose()` then scrolls on the next animation frame. Scroll targets: `'home'` → `0`, `'projects'` → `#section-projects` (pending), `'about'` → `#section-about`, `'work'` → `#section-work`, `'contact'` → `#section-contact`. Bottom bar: language toggle (with `pendingLang` optimistic state), GitHub link, email button (copies address to clipboard and opens `mailto:`, shows a toast).

### Reusable primitives

- **`src/components/core/SplitReveal.tsx`** — polymorphic `as` prop, word-wraps children in `overflow:hidden` spans, animates `yPercent: 110 → 0` on scroll entry.
- **`src/components/core/cursor.tsx`** — portal-based cursor follower (Framer Motion springs). Supports `attachToParent` mode and custom variants. Not mounted in `App` by default.
- **`src/hooks/useMagnetic.ts`** — GSAP `quickTo` magnetic pull on a ref'd element. Disabled on `pointer: coarse` and `prefers-reduced-motion`.
- **`src/hooks/useBreakpoint.ts`** — `{ isMobile, isTablet, isMobileOrTablet }` based on `window.innerWidth` with resize listener. Breakpoints: 768 / 1024 px.

## Styling

**`src/index.css`** is the sole stylesheet. Defines HSL custom properties on `:root` mapped via `@theme inline` to Tailwind color utilities. Page background is `#f5f5f3`; section backgrounds use `#efefed`. Inline `style={{}}` props are used for values Tailwind cannot express: `clamp()`, `vw`/`vh` units, and GSAP-managed properties.

Each component that needs Anton or Archivo defines two local constants:
```ts
const ANTON:   CSSProperties = { fontFamily: "'Anton', Impact, ..." }
const ARCHIVO: CSSProperties = { fontFamily: "'Archivo', sans-serif" }
```

## Project data

- `WORK_PANELS` — `src/data/projects.tsx` (shared by `BlankNextSection` and `ProjectsSection`)
- `BiLang<T>`, `Panel`, `Detail` types + `getLinkIcon`, `getLinkAriaLabel` helpers — `src/data/projects.tsx`
- `PANELS` — `HorizontalSection.tsx` (horizontal scroll panel content, defined inline)
- Bilingual text — `src/data/content.ts` (`C` object, all copy including `C.menu.items`)

## Constraints

1. **Hero.tsx GSAP timeline** — do not modify.
2. **HorizontalSection.tsx panel rebuild** — do not modify.
3. **Stable class names** — `.archive-panel`, `.archive-card`, `.next-section-title`, `.horizontal-panel`, `.about-img-wrap` are GSAP selectors; renaming breaks animations.
4. **Design tokens** — background `#f5f5f3`/`#efefed`, Anton/Archivo fonts, existing colors and spacing must not change.
5. **Completed interactions** — reuse the Lenis singleton, ScrollProgress, SplitReveal, and useMagnetic; do not duplicate them.
6. All new animations must check `prefers-reduced-motion: reduce`.
