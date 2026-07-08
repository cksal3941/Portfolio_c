import Lenis from 'lenis'

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const lenis = prefersReducedMotion
  ? null
  : new Lenis({ duration: 1.1, smoothWheel: true })
