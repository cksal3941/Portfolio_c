import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

const TITLE    = 'WHO I AM WHAT I BUILD'
const EMPHASIS = 'I DESIGN INTERACTIONS THAT TURN PORTFOLIOS INTO EXPERIENCES.'
const BODY     = [
  'I started in food research and now work in front-end and digital publishing.',
  'I focus on motion, visual systems, and structured storytelling.',
  'My work connects layout, interaction, and visual direction.',
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

      // remove injected overflow wrappers before reverting
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
        // split into lines based on current viewport width
        const split = new SplitText(el, { type: 'lines' })
        splits.push(split)

        // wrap each line in overflow:hidden so text reveals from below
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

    // re-split on resize so lines match new viewport width
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
        background:    '#efefed',
        minHeight:     '100vh',
        display:       'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding:       '14vh 8vw',
        borderTop:     '1px solid #000',
      }}
    >
      {/* eyebrow */}
      <p
        style={{
          fontSize:      '10px',
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color:         '#000',
          margin:        '0 0 48px',
        }}
      >
        RE:BLIDE — ABOUT
      </p>

      {/* main title — SplitText splits by natural line wraps */}
      <h2
        data-split
        style={{
          fontFamily:    "'Anton', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
          fontSize:      'clamp(56px, 9.5vw, 136px)',
          lineHeight:    0.9,
          letterSpacing: '-0.03em',
          textTransform: 'uppercase',
          color:         '#000',
          margin:        '0 0 52px',
          maxWidth:      '14ch',
        }}
      >
        {TITLE}
      </h2>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '4vw', maxWidth: '860px' }}>
        {/* vertical accent line */}
        <div style={{ width: '1px', background: '#000', alignSelf: 'stretch', flexShrink: 0, marginTop: '4px' }} />

        <div style={{ flex: 1 }}>
          {/* emphasis */}
          <p
            data-split
            style={{
              fontSize:      'clamp(11px, 1.1vw, 14px)',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              lineHeight:    1.85,
              color:         '#000',
              margin:        '0 0 32px',
            }}
          >
            {EMPHASIS}
          </p>

          {/* body */}
          {BODY.map((line, i) => (
            <p
              key={i}
              data-split
              style={{
                fontSize:      '13.5px',
                lineHeight:    1.9,
                letterSpacing: '0.01em',
                color:         '#000',
                margin:        0,
              }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
