import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useLang } from '@/context/LangContext'
import { C } from '@/data/content'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { lang }   = useLang()

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // <h2>는 항상 영문 고정 → lang 변경과 무관하게 SplitText 한 번만 실행
    const splitTargets = Array.from(section.querySelectorAll<HTMLElement>('[data-split]'))
    // <p> 태그는 lang에 따라 텍스트가 바뀌므로 SplitText 없이 단순 fade 처리
    const fadeTargets = Array.from(section.querySelectorAll<HTMLElement>('[data-fade]'))

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

      // SplitText 라인 reveal — h2 전용 (lang-independent)
      splitTargets.forEach(el => {
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
        triggers.push(ScrollTrigger.create({
          trigger: el,
          start: 'top 82%',
          once: true,
          onEnter: () => {
            gsap.to(split.lines, { yPercent: 0, duration: 0.9, ease: 'power3.out', stagger: 0.09 })
          },
        }))
      })

      // 단순 y+opacity reveal — p 태그 전용 (lang 바뀌어도 재실행 불필요)
      fadeTargets.forEach(el => {
        gsap.set(el, { y: 28, opacity: 0 })
        triggers.push(ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(el, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })
          },
        }))
      })
    }

    const buildTimer = setTimeout(build, 0)

    let debounce: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(debounce)
      debounce = setTimeout(build, 180)
    }
    window.addEventListener('resize', onResize)

    return () => {
      clearTimeout(buildTimer)
      window.removeEventListener('resize', onResize)
      clearTimeout(debounce)
      cleanup()
    }
  }, []) // lang 의존성 완전 제거 — h2는 항상 영문, p는 SplitText 미사용

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
        {C.aboutSection.titleLines.en.map(line => (
          <span key={line} style={{ display: 'block' }}>
            {line}
          </span>
        ))}
      </h2>

      <div style={{ maxWidth: '560px', textAlign: 'center' }}>
        <p
          data-fade
          style={{
            fontFamily: "'Archivo', sans-serif",
            fontSize: 'clamp(15px, 1.2vw, 18px)',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            lineHeight: 1.45,
            color: '#000',
            margin: '0 0 34px',
          }}
        >
          {C.aboutSection.emphasis[lang]}
        </p>

        <p
          data-fade
          style={{
            fontFamily: "'Archivo', sans-serif",
            fontSize: '16px',
            lineHeight: 1.65,
            letterSpacing: '-0.01em',
            color: '#000',
            margin: 0,
          }}
        >
          {C.aboutSection.body[lang].join(' ')}
        </p>
      </div>
    </section>
  )
}
