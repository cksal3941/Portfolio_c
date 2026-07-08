import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { lenis } from '@/lib/lenis'

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const getProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      return scrollable > 0 ? window.scrollY / scrollable : 0
    }

    if (prefersReducedMotion) {
      const update = () => { bar.style.transform = `scaleX(${getProgress()})` }
      window.addEventListener('scroll', update, { passive: true })
      update()
      return () => window.removeEventListener('scroll', update)
    }

    const setScaleX = gsap.quickTo(bar, 'scaleX', { duration: 0.15, ease: 'none' })
    const update = () => setScaleX(getProgress())

    if (lenis) {
      const l = lenis
      l.on('scroll', update)
      return () => { l.off('scroll', update) }
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div
      ref={barRef}
      style={{
        position:        'fixed',
        top:             0,
        left:            0,
        right:           0,
        height:          '2px',
        background:      '#000',
        transformOrigin: 'left',
        transform:       'scaleX(0)',
        zIndex:          150,
        pointerEvents:   'none',
      }}
    />
  )
}
