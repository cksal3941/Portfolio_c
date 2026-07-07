# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

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
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin
- **Framer Motion** — primary animation library (scroll-driven reveals, hover effects)
- **Lucide React** — icon set
- Path alias: `@` → `src/`

## Architecture

Single-page app. No router — all sections stacked vertically.

`src/main.tsx` mounts `<App />`, which assembles section components in order.

## Styling

**`src/index.css`** is the sole stylesheet:
- `@import "tailwindcss"`
- Defines HSL custom properties on `:root` mapped via `@theme inline` to Tailwind utilities
- Components use Tailwind utilities exclusively — avoid inline `style={{}}` props

## Project data

Static arrays defined inline in each component. No external data fetching or state management library.
