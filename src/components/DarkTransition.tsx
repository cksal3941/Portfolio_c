import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ANTON = {
  fontFamily: "'Anton', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
} as const

const ARCHIVO = {
  fontFamily: "'Archivo', sans-serif",
} as const

export default function DarkTransition() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: '+=200%',
          scrub: true,
        },
      })

      // Background darkens continuously — no color stops
      tl.to(sectionRef.current, {
        backgroundColor: '#000000',
        ease: 'none',
        duration: 1,
      }, 0)

      // Text lightens at the same rate so it stays readable throughout
      tl.to(contentRef.current, {
        color: '#ffffff',
        ease: 'none',
        duration: 1,
      }, 0)
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapperRef} style={{ height: '300vh' }}>
      <div
        ref={sectionRef}
        className="sticky top-0 h-screen flex items-center justify-center"
        style={{ backgroundColor: '#f0f0ee' }}
      >
        <div
          ref={contentRef}
          style={{
            width: '100%',
            maxWidth: '580px',
            textAlign: 'center',
            color: '#111111',
            padding: '0 24px',
          }}
        >
          <p style={{
            ...ARCHIVO,
            fontSize: '16px',
            lineHeight: 1.65,
            margin: '0 0 28px',
          }}>
            I moved from laboratory notebooks to browser tabs. The same discipline
            that shaped years of research now drives how I build — structured,
            intentional, and open to what comes next.
          </p>

          <p style={{
            ...ARCHIVO,
            fontSize: '16px',
            lineHeight: 1.65,
            opacity: 0.6,
            margin: '0 0 56px',
          }}>
            Every project in this archive is a record of that shift.
          </p>

          <p style={{
            ...ANTON,
            fontSize: '20px',
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
          }}>
            [ EXPLORE THE ARCHIVE ]
          </p>
        </div>
      </div>
    </div>
  )
}
