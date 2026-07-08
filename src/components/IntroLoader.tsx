import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const LETTERS = 'RE:BLIDE'.split('')

export default function IntroLoader({ onDone }: { onDone: () => void }) {
  const overlayRef   = useRef<HTMLDivElement>(null)
  const lineRef      = useRef<HTMLDivElement>(null)
  const letterRefs   = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.body.style.overflow = ''
      onDone()
      return
    }

    const ctx = gsap.context(() => {
      gsap.set(letterRefs.current, { yPercent: 100 })
      gsap.set(lineRef.current,    { scaleX: 0, transformOrigin: 'left center' })

      gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = ''
          onDone()
        },
      })
        .to(letterRefs.current, {
          yPercent: 0,
          duration: 0.6,
          ease:     'power3.out',
          stagger:  0.05,
        })
        .to(lineRef.current, {
          scaleX:   1,
          duration: 0.45,
          ease:     'power2.inOut',
        }, '+=0.4')
        .to(overlayRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease:     'power4.inOut',
        }, '+=0.15')
    }, overlayRef)

    return () => {
      ctx.revert()
      document.body.style.overflow = ''
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
      }}
    >
      <div style={{ transform: 'scaleX(0.82)', transformOrigin: 'center' }}>
        {/* Letter row */}
        <div style={{ display: 'flex' }}>
          {LETTERS.map((letter, i) => (
            <div key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
              <span
                ref={el => { if (el) letterRefs.current[i] = el }}
                style={{
                  display:    'inline-block',
                  fontFamily: "'Anton', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
                  fontSize:   'clamp(60px, 10vw, 160px)',
                  lineHeight: 1,
                  color:      '#ffffff',
                }}
              >
                {letter}
              </span>
            </div>
          ))}
        </div>

        {/* Underline */}
        <div
          ref={lineRef}
          style={{
            height:     '1px',
            background: '#ffffff',
            marginTop:  '14px',
            width:      '100%',
          }}
        />
      </div>
    </div>
  )
}
