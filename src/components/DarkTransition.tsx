import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitReveal from '@/components/core/SplitReveal'
import { useLang } from '@/context/LangContext'
import { C } from '@/data/content'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import trail1 from '@/images/leftbg.webp'
import trail2 from '@/images/lotionmodel.webp'
import trail3 from '@/images/model-shot3.webp'
import trail4 from '@/images/model-shot7.webp'
import trail5 from '@/images/oilhand.webp'
import trail6 from '@/images/routine-lineup.webp'
import trail7 from '@/images/shampoohand.webp'

gsap.registerPlugin(ScrollTrigger)

const ANTON = {
  fontFamily: "'Anton', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
} as const

const ARCHIVO = {
  fontFamily: "'Archivo', sans-serif",
} as const

const TRAIL_SRCS = [trail1, trail2, trail3, trail4, trail5, trail6, trail7]
const POOL = TRAIL_SRCS.length

export default function DarkTransition() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const { lang }     = useLang()
  const { isMobile } = useBreakpoint()

  const trailRefs = useRef<(HTMLDivElement | null)[]>([])
  const trailIdx  = useRef(0)
  const lastPos   = useRef({ x: -999, y: -999 })

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
      tl.to(sectionRef.current, { backgroundColor: '#000000', ease: 'none', duration: 1 }, 0)
      tl.to(contentRef.current, { color: '#ffffff', ease: 'none', duration: 1 }, 0)
    }, wrapperRef)

    // cursor trail
    const section = sectionRef.current
    const THRESHOLD = 160
    const IMG_W = 160
    const IMG_H = 210

    const onMouseMove = (e: MouseEvent) => {
      const rect = section!.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const dx = x - lastPos.current.x
      const dy = y - lastPos.current.y
      if (Math.sqrt(dx * dx + dy * dy) < THRESHOLD) return

      lastPos.current = { x, y }

      const el = trailRefs.current[trailIdx.current % POOL]
      trailIdx.current++
      if (!el) return

      const rotation = (Math.random() - 0.5) * 18

      gsap.killTweensOf(el)
      gsap.set(el, {
        x: x - IMG_W / 2,
        y: y - IMG_H / 2,
        opacity: 1,
        scale: 1,
        rotation,
        zIndex: 10 + (trailIdx.current % 20),
      })
      gsap.to(el, {
        y: y - IMG_H / 2 - 100,
        opacity: 0,
        scale: 0.82,
        duration: 1.6,
        ease: 'power2.out',
      })
    }

    section?.addEventListener('mousemove', onMouseMove)

    return () => {
      ctx.revert()
      section?.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <div ref={wrapperRef} style={{ height: '300vh' }}>
      <div
        ref={sectionRef}
        className="sticky top-0 h-screen flex items-center justify-center"
        style={{ backgroundColor: '#f0f0ee', overflow: 'hidden', position: 'sticky' }}
      >
        {/* cursor trail pool */}
        {TRAIL_SRCS.map((src, i) => (
          <div
            key={i}
            ref={el => { trailRefs.current[i] = el }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '160px',
              height: '210px',
              pointerEvents: 'none',
              opacity: 0,
              willChange: 'transform, opacity',
            }}
          >
            <img
              src={src}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        ))}

        {/* content */}
        <div
          ref={contentRef}
          style={{
            position: 'relative',
            zIndex: 20,
            width: '100%',
            maxWidth: '580px',
            textAlign: 'center',
            color: '#111111',
            padding: '0 24px',
          }}
        >
          <p style={{ ...ARCHIVO, fontSize: 'clamp(13px, 3.5vw, 16px)', lineHeight: 1.65, margin: '0 0 28px', whiteSpace: 'pre-line' }}>
            {isMobile && lang === 'ko'
              ? <>{'실험실 노트에 기록하고 관찰하던 방식은\n이제 화면을 구성하고 기능을 구현하는 작업으로'}<br />{'이어지고 있습니다.'}</>
              : C.darkTransition.p1[lang]
            }
          </p>

          <p style={{ ...ARCHIVO, fontSize: 'clamp(13px, 3.5vw, 16px)', lineHeight: 1.65, margin: '0 0 56px' }}>
            {C.darkTransition.p2[lang]}
          </p>

          <SplitReveal as="p" style={{
            ...ANTON,
            fontSize: 'clamp(15px, 4.5vw, 20px)',
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
          }}>
            {C.darkTransition.cta.en}
          </SplitReveal>
        </div>
      </div>
    </div>
  )
}
