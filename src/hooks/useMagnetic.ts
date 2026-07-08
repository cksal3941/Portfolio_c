import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function useMagnetic<T extends HTMLElement = HTMLElement>(strength = 0.3) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const isTouch = window.matchMedia('(pointer: coarse)').matches
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isTouch || isReducedMotion) return

    const quickX = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' })
    const quickY = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' })

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      quickX((e.clientX - cx) * strength)
      quickY((e.clientY - cy) * strength)
    }

    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' })
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)

    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      gsap.killTweensOf(el)
    }
  }, [strength])

  return ref
}
