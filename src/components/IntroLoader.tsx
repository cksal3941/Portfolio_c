import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { lenis } from '@/lib/lenis'

const LETTERS = 'RE:BUILD'.split('')

export default function IntroLoader({ onDone }: { onDone: () => void }) {
  const overlayRef   = useRef<HTMLDivElement>(null)
  const progressRef  = useRef<HTMLDivElement>(null)
  const letterRefs   = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    lenis?.stop()

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.body.style.overflow = ''
      lenis?.start()
      onDone()
      return
    }

    const ctx = gsap.context(() => {
      gsap.set(letterRefs.current, { opacity: 0 })
      gsap.set(progressRef.current, { scaleX: 0, transformOrigin: 'left center' })

      gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = ''
          lenis?.start()
          onDone()
        },
      })
        .to(letterRefs.current, {
          opacity:  1,
          duration: 0.3,
          ease:     'none',
          stagger:  0.07,
        })
        .to(progressRef.current, {
          scaleX:   1,
          duration: 0.6,
          ease:     'power2.inOut',
        }, '+=0.2')
        .to(overlayRef.current, {
          opacity:  0,
          duration: 0.5,
          ease:     'power2.inOut',
        }, '+=0.3')
    }, overlayRef)

    return () => {
      ctx.revert()
      document.body.style.overflow = ''
      lenis?.start()
    }
  }, [onDone])

  return (
    <div
      ref={overlayRef}
      style={{
        position:       'fixed',
        inset:          0,
        background:     '#111111',
        zIndex:         400,
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        gap:            '16px',
      }}
    >
      <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '16px' }}>
        {/* letters */}
        <div style={{ display: 'flex', gap: '0.18em' }}>
          {LETTERS.map((letter, i) => (
            <span
              key={i}
              ref={el => { if (el) letterRefs.current[i] = el }}
              style={{
                fontFamily:    "'Anton', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
                fontSize:      'clamp(32px, 5vw, 64px)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color:         '#ffffff',
                opacity:       0,
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* progress bar — same width as letters */}
        <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.15)' }}>
          <div
            ref={progressRef}
            style={{ width: '100%', height: '100%', background: '#ffffff' }}
          />
        </div>
      </div>
    </div>
  )
}
