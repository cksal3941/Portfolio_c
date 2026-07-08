import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

const TITLE_LINES = ['OUR LOOKBOOKS', 'SERVE AS A DIALOGUE']
const EMPHASIS = 'WE PRIORITIZE CLARITY, FUNCTION, AND THE POWER OF THE GRID TO ELEVATE GLOBAL CREATIVE STANDARDS.'
const BODY = [
  'Our lookbooks serve as a dialogue between the garment and the void.',
  'By prioritizing volume over traditional tailoring, each piece becomes a structural study.',
  'We invite you to explore the intersection of form and function through this curated visual sequence.',
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const targets = Array.from(section.querySelectorAll<HTMLElement>('[data-split]'))

    let splits: SplitText[] = []
    let triggers: ScrollTrigger[] = []
    const lineWrappers: HTMLElement[] = []

    const cleanup = () => {
      triggers.forEach(t => t.kill())
      triggers = []

      lineWrappers.forEach(wrap => {
        const parent = wrap.parentElement
        while (wrap.firstChild) parent?.insertBefore(wrap.firstChild, wrap)
        wrap.remove()
      })
      lineWrappers.length = 0

      splits.forEach(s => s.revert())
      splits = []
    }

    const build = () => {
      cleanup()

      targets.forEach(el => {
        const split = new SplitText(el, { type: 'lines' })
        splits.push(split)

        split.lines.forEach(line => {
          const wrap = document.createElement('div')
          wrap.style.cssText = 'overflow:hidden;display:block;'
          line.parentNode!.insertBefore(wrap, line)
          wrap.appendChild(line)
          lineWrappers.push(wrap)
        })

        gsap.set(split.lines, { yPercent: 110 })

        const trig = ScrollTrigger.create({
          trigger: el,
          start: 'top 82%',
          once: true,
          onEnter: () => {
            gsap.to(split.lines, {
              yPercent: 0,
              duration: 0.9,
              ease: 'power3.out',
              stagger: 0.09,
            })
          },
        })
        triggers.push(trig)
      })
    }

    build()

    let debounce: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(debounce)
      debounce = setTimeout(build, 180)
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      clearTimeout(debounce)
      cleanup()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#efefed',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '14vh 8vw',
        borderTop: '1px solid #000',
      }}
    >
      <h2
        data-split
        style={{
          fontFamily: "'Anton', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
          fontSize: 'clamp(48px, 4.75vw, 74px)',
          lineHeight: 1.05,
          letterSpacing: 0,
          textTransform: 'uppercase',
          textAlign: 'center',
          color: '#000',
          margin: '0 0 60px',
          maxWidth: 'none',
        }}
      >
        {TITLE_LINES.map(line => (
          <span key={line} style={{ display: 'block' }}>
            {line}
          </span>
        ))}
      </h2>

      <div style={{ maxWidth: '430px', textAlign: 'center' }}>
        <p
          data-split
          style={{
            fontSize: 'clamp(15px, 1.2vw, 18px)',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            textTransform: 'uppercase',
            lineHeight: 1.35,
            color: '#000',
            margin: '0 0 34px',
          }}
        >
          {EMPHASIS}
        </p>

        <p
          data-split
          style={{
            fontSize: '16px',
            lineHeight: 1.45,
            letterSpacing: '-0.01em',
            color: '#000',
            margin: 0,
          }}
        >
          {BODY.join(' ')}
        </p>
      </div>
    </section>
  )
}
