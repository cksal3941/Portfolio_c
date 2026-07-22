import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BlankNextSection from '@/components/BlankNextSection'
import bgImage from '@/images/background2.webp'
import { useLang } from '@/context/LangContext'
import { C } from '@/data/content'
import { useBreakpoint } from '@/hooks/useBreakpoint'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const { lang }           = useLang()
  const { isMobile }       = useBreakpoint()
  const wrapperRef         = useRef<HTMLDivElement>(null)
  const supportingRef      = useRef<HTMLDivElement>(null)
  const imageRef           = useRef<HTMLDivElement>(null)
  const overlayRef         = useRef<HTMLDivElement>(null)
  const titleLeftRef       = useRef<HTMLSpanElement>(null)
  const titleRightRef      = useRef<HTMLSpanElement>(null)
  const textGroup2Ref      = useRef<HTMLDivElement>(null)
  const circleRef          = useRef<HTMLDivElement>(null)
  // parallax-only refs (inner wrappers — scroll timeline never touches these)
  const parallaxImgRef     = useRef<HTMLDivElement>(null)
  const parallaxLeftRef    = useRef<HTMLSpanElement>(null)
  const parallaxRightRef   = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768
    let scrollProgress = 0
    let removeMouseMove: (() => void) | undefined

    const ctx = gsap.context(() => {
      const vh = window.innerHeight
      const archivePanels = gsap.utils.toArray<HTMLElement>('.archive-panel')
      const n = archivePanels.length
      const center = (n - 1) / 2

      // stage 측정 — safe-left 비대칭이 있으므로 화면 중앙을 stage 좌표로 변환
      const stageEl0   = document.querySelector<HTMLElement>('.card-stage')
      const stageLeft0 = stageEl0?.getBoundingClientRect().left ?? 0
      const screenCenterInStage0 = window.innerWidth / 2 - stageLeft0

      gsap.set(overlayRef.current,         { opacity: 0 })
      gsap.set(textGroup2Ref.current, { opacity: 0, y: vh * 1.1 })
      gsap.set(circleRef.current,          { clipPath: 'circle(0vmax at 50% 118%)' })
      gsap.set('.next-section-title',      { opacity: 0, y: 14 })
      gsap.set('.archive-panels',          { opacity: 1 })
      gsap.set(archivePanels, {
        xPercent: -50,
        yPercent: -50,
        x: screenCenterInStage0,  // 화면 중앙에 쌓인 상태로 시작
        y: (i) => (i === 0 ? vh * 0.4 : 0),
        scale: (i) => (i === 0 ? 0.4 : 1),
        opacity: (i) => (i === 0 ? 1 : 0),
        zIndex: (i) => 80 - i,
        rotateY: 0,
      })

      let circlePlayed = false

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: isTouchDevice ? '+=500%' : '+=1020%',
          scrub: isTouchDevice ? 0.5 : 1.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            scrollProgress = self.progress
            if (isTouchDevice && !circlePlayed && self.progress >= 0.70) {
              circlePlayed = true
              const el = circleRef.current
              if (el) {
                el.style.transition = 'clip-path 0.6s ease-in-out, -webkit-clip-path 0.6s ease-in-out'
                requestAnimationFrame(() => {
                  ;(el.style as any).webkitClipPath = 'circle(150vmax at 50% 118%)'
                  el.style.clipPath = 'circle(150vmax at 50% 118%)'
                })
              }
            } else if (isTouchDevice && circlePlayed && self.progress < 0.78) {
              circlePlayed = false
              const el = circleRef.current
              if (el) {
                el.style.transition = 'clip-path 0.6s ease-in-out, -webkit-clip-path 0.6s ease-in-out'
                requestAnimationFrame(() => {
                  ;(el.style as any).webkitClipPath = 'circle(0vmax at 50% 118%)'
                  el.style.clipPath = 'circle(0vmax at 50% 118%)'
                })
              }
            }
          },
        },
      })

      tl.to(supportingRef.current, { opacity: 0, y: -10, duration: 0.15, ease: 'none' })
      tl.to(imageRef.current,      { scale: 5, rotation: 22, duration: 0.4, ease: 'none' }, '>')
      tl.to(overlayRef.current,    { opacity: 0.75, duration: 0.45, ease: 'none' }, '>')
      tl.to([titleLeftRef.current, titleRightRef.current], { color: '#ffffff', duration: 0.45, ease: 'none' }, '<')
      // ── Phase 4: TG2 enters ──
      tl.to(textGroup2Ref.current, { opacity: 1, y: 0, duration: 0.38, ease: 'none' }, '>+0.06')
      // ── Phase 5: TG2 continuously scrolls up so long text is readable, then fades ──
      tl.to(textGroup2Ref.current, { y: '-=1100', duration: 1.2, ease: 'none' }, '>')
      tl.to(textGroup2Ref.current, { opacity: 0, duration: 0.25, ease: 'none' }, isTouchDevice ? '<+0.80' : '<+0.85')

      if (!isTouchDevice) {
        tl.to(circleRef.current,    { clipPath: 'circle(44vmax at 50% 118%)', duration: 0.32, ease: 'none' }, '<+0.17')
        tl.to(archivePanels[0], { scale: 1, y: 0, duration: 0.65, ease: 'none' }, '<')
        tl.to(circleRef.current,    { clipPath: 'circle(150vmax at 50% 118%)', duration: 0.38, ease: 'none' }, '<+0.32')
        tl.to('.next-section-title', { opacity: 1, y: 0, duration: 0.22, ease: 'none' })

        // 스태킹 단계: 모든 카드를 화면 중앙에 겹쳐 쌓음
        tl.to(archivePanels, {
          x: (i) => {
            const st = document.querySelector<HTMLElement>('.card-stage')
            const stLeft = st?.getBoundingClientRect().left ?? 0
            return window.innerWidth / 2 - stLeft + i * 2
          },
          y: (i) => i * -1,
          scale: (i) => 1 - i * 0.004,
          opacity: 1, duration: 0.1, ease: 'none', stagger: 0,
        }, '>+0.08')

        // 펼침 단계: stage 실제 너비를 측정해 좌우 경계를 보장
        tl.to(archivePanels, {
          x: (i) => {
            const st = document.querySelector<HTMLElement>('.card-stage')
            const c0 = archivePanels[0]
            if (!st || !c0) return 0
            const stW = st.getBoundingClientRect().width
            const cW  = c0.getBoundingClientRect().width
            const stepX = (stW - cW) / Math.max(n - 1, 1)
            const x = cW / 2 + i * stepX

            // 검수: 마지막 카드 계산 시점에 한 번만, rAF 후 실제 위치로 확인
            if (i === n - 1) {
              const stRect = st.getBoundingClientRect()
              requestAnimationFrame(() => {
                const f = archivePanels[0].getBoundingClientRect()
                const l = archivePanels[n - 1].getBoundingClientRect()
                console.assert(f.left  >= stRect.left  - 1, '첫 번째 카드가 왼쪽 안전 영역을 벗어났습니다.')
                console.assert(l.right <= stRect.right + 1, '마지막 카드가 오른쪽 안전 영역을 벗어났습니다.')
              })
            }
            return x
          },
          y: (i) => (center - i) * window.innerHeight * 0.04,
          scale: (i) => 1 - i * 0.02,
          rotateY: 12,
          zIndex: (i) => 80 - i,
          duration: 0.42, ease: 'none', stagger: 0,
        }, '>+0.05')
      }
    }, wrapperRef)

    // ── Parallax mousemove ──
    if (!isTouchDevice) {
      const pImg = parallaxImgRef.current
      const pL   = parallaxLeftRef.current
      const pR   = parallaxRightRef.current

      if (pImg && pL && pR) {
        const qImgX = gsap.quickTo(pImg, 'x', { duration: 0.8, ease: 'power3.out' })
        const qImgY = gsap.quickTo(pImg, 'y', { duration: 0.8, ease: 'power3.out' })
        const qLX   = gsap.quickTo(pL,   'x', { duration: 0.6, ease: 'power3.out' })
        const qLY   = gsap.quickTo(pL,   'y', { duration: 0.6, ease: 'power3.out' })
        const qRX   = gsap.quickTo(pR,   'x', { duration: 0.6, ease: 'power3.out' })
        const qRY   = gsap.quickTo(pR,   'y', { duration: 0.6, ease: 'power3.out' })

        const onMouseMove = (e: MouseEvent) => {
          const fade = 1 - scrollProgress
          const nx = (e.clientX / window.innerWidth  - 0.5) * 2
          const ny = (e.clientY / window.innerHeight - 0.5) * 2
          qImgX( nx * 18 * fade);  qImgY( ny * 18 * fade)
          qLX(   nx * 10 * fade);  qLY(   ny * 10 * fade)
          qRX(  -nx * 10 * fade);  qRY(  -ny * 10 * fade)
        }

        const wrapper = wrapperRef.current
        wrapper?.addEventListener('mousemove', onMouseMove)
        removeMouseMove = () => wrapper?.removeEventListener('mousemove', onMouseMove)
      }
    }

    // resize 시 ScrollTrigger.refresh() → invalidateOnRefresh 가 함수값 재계산
    let resizeTimer: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 200)
    }
    window.addEventListener('resize', onResize)

    return () => {
      ctx.revert()
      removeMouseMove?.()
      window.removeEventListener('resize', onResize)
      clearTimeout(resizeTimer)
    }
  }, [isMobile])

  const onModalClose = useCallback(() => {}, [])

  return (
    <div ref={wrapperRef} style={{ height: isMobile ? '460vh' : '1250vh', background: isMobile ? '#f0f0ee' : undefined }}>
      <div className="sticky top-0 h-screen overflow-hidden" style={{ background: isMobile ? '#f0f0ee' : '#f5f5f3' }}>

        {/* ── z-10 — Background image ── */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          <div className="absolute inset-x-0 flex justify-center" style={{ top: isMobile ? '130px' : '280px' }}>
            <div ref={imageRef} className="origin-center" style={{ width: isMobile ? 'min(300px, 78vw)' : '430px' }}>
              <div ref={parallaxImgRef}>
              <div className="w-full relative overflow-hidden" style={{ height: isMobile ? '360px' : '500px' }}>
                <img
                  src={bgImage}
                  alt="fashion editorial"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/20" />
              </div>
              </div>{/* end parallaxImgRef */}
            </div>
          </div>
        </div>

        {/* ── z-15 — Dark overlay ── */}
        <div ref={overlayRef} className="absolute inset-0 z-[15] bg-black pointer-events-none" />

        {/* ── z-20 — Split typography ── */}
        <div className="absolute inset-x-0 z-20 pointer-events-none px-[18px] flex justify-between items-start" style={{ top: '3px' }}>
          <span
            ref={titleLeftRef}
            className="leading-none"
            style={{
              fontSize: 'clamp(74px, 15vw, 305px)',
              fontFamily: "'Anton', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
              transform: 'scaleX(0.82)',
              transformOrigin: 'left top',
              color: '#000000',
            }}
          >
            <span ref={parallaxLeftRef} style={{ display: 'inline-block' }}>RE:</span>
          </span>
          <span
            ref={titleRightRef}
            className="leading-none"
            style={{
              fontSize: 'clamp(74px, 15vw, 305px)',
              fontFamily: "'Anton', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
              transform: 'scaleX(0.82)',
              transformOrigin: 'right top',
              color: '#000000',
            }}
          >
            <span ref={parallaxRightRef} style={{ display: 'inline-block' }}>BUILD</span>
          </span>
        </div>


        {/* ── z-20 — Supporting text (visible on load, fades on first scroll) ── */}
        <div ref={supportingRef} className="absolute inset-0 z-20 pointer-events-none text-black">
          <p
            className="absolute left-[9.3vw] leading-[1.08] uppercase"
            style={{
              fontFamily: "'Anton', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
              top: isMobile ? '170px' : '294px',
              fontSize: isMobile ? 'clamp(14px, 5.5vw, 24px)' : '20px',
              maxWidth: isMobile ? '82vw' : undefined,
            }}
          >
            {C.hero.tagline.en}
          </p>
          <div
            className="absolute left-[9.3vw]"
            style={{
              top: isMobile ? 'min(560px, 82vh)' : '498px',
              width: '532px',
              maxWidth: isMobile ? '80vw' : '38vw',
            }}
          >
            <div
              className="flex items-start justify-between leading-none uppercase"
              style={{
                fontFamily: "'Anton', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
                fontSize: isMobile ? 'clamp(12px, 4vw, 16px)' : '22px',
                marginBottom: '10px',
              }}
            >
              <span>{C.hero.indexLabel.en}</span>
              <span>{C.hero.indexNum}</span>
            </div>
            <p
              className="leading-[1.32]"
              style={{ whiteSpace: 'pre-line', fontSize: isMobile ? 'clamp(11px, 3.5vw, 14px)' : '17px' }}
            >
              {isMobile && lang === 'ko'
                ? C.hero.body.ko.replace('고민하는 주니어', '고민하는\n주니어')
                : C.hero.body[lang]}
            </p>
          </div>
          <div
            className="absolute left-[9.3vw] leading-none uppercase"
            style={{
              fontFamily: "'Anton', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
              top: isMobile ? 'min(510px, 75vh)' : '760px',
              fontSize: isMobile ? 'clamp(11px, 3.5vw, 14px)' : '20px',
            }}
          >
            {C.hero.exploreBtn.en}
          </div>
          {!isMobile && (
          <div className="absolute left-[66.6vw] top-[673px] w-[360px] max-w-[27vw]">
            <h2
              className="text-[20px] leading-none uppercase"
              style={{ fontFamily: "'Anton', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif", marginBottom: '10px' }}
            >
              {C.hero.aboutHeader.en}
            </h2>
            <p
              className="text-[17px] leading-[1.32]"
              style={{
                whiteSpace: 'pre-line',
                wordBreak: lang === 'ko' ? 'keep-all' : 'normal',
                overflowWrap: 'break-word',
              }}
            >
              {C.hero.aboutBody[lang]}
            </p>
          </div>
          )}
        </div>

        {/* ── z-20 — Text Group 2: centered statement + label + body ── */}
        <div
          ref={textGroup2Ref}
          className="absolute z-20 pointer-events-none"
          style={{ top: '6%', left: 0, right: 0, display: 'flex', justifyContent: 'center', padding: '0 24px' }}
        >
          <div style={{ width: isMobile ? 'min(760px, 90vw)' : 'min(760px, 56vw)', color: '#ffffff', transform: isMobile ? 'none' : 'translateX(calc(5vw - 15px))' }}>
            <p style={{
              fontFamily: "'Anton', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
              fontSize: isMobile ? '14px' : '20px',
              lineHeight: 1.18,
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              margin: isMobile ? '0 0 60px' : '0 0 160px',
            }}>
              {['I LOOK AT THE FLOW BEFORE BUILDING THE SCREEN.', 'I ORGANIZE INFORMATION, SHAPE THE STRUCTURE,', 'AND TURN IT INTO A USABLE INTERFACE.'].map((line, i) => (
                <span key={i} style={{ display: 'block' }}>{line}</span>
              ))}
            </p>

            <div>
              <p style={{
                fontFamily: "'Anton', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
                fontSize: '20px',
                lineHeight: 1,
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                margin: '0 0 36px',
              }}>WORK FLOW</p>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{
                  width: 'min(420px, 100%)',
                  fontFamily: "'Archivo', sans-serif",
                  fontSize: '16px',
                  lineHeight: 1.35,
                  letterSpacing: '-0.02em',
                }}>
                  {C.hero.tg2Paragraphs[lang].map((paragraph, i) => (
                    <p key={i} style={{ margin: i === 0 ? 0 : '28px 0 0' }}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── z-30 — Circle wipe ── */}
        <div ref={circleRef} className="absolute inset-0 z-30 overflow-hidden">
          <BlankNextSection onModalClose={onModalClose} />
        </div>

      </div>
    </div>
  )
}
