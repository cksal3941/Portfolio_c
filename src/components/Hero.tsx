import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BlankNextSection from '@/components/BlankNextSection'
import bgImage from '@/images/background2.png'
import { useLang } from '@/context/LangContext'
import { C } from '@/data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const { lang }           = useLang()
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

      gsap.set(overlayRef.current,         { opacity: 0 })
      gsap.set(textGroup2Ref.current, { opacity: 0, y: vh * 0.85 })
      gsap.set(circleRef.current,          { clipPath: 'circle(0vmax at 50% 118%)' })
      gsap.set('.next-section-title',      { opacity: 0, y: 14 })
      gsap.set('.archive-panels',          { opacity: 1 })
      gsap.set(archivePanels, {
        xPercent: -50,
        yPercent: -50,
        x: 0,
        y: (i) => (i === 0 ? vh * 0.4 : 0),
        scale: (i) => (i === 0 ? 0.4 : 1),
        opacity: (i) => (i === 0 ? 1 : 0),
        zIndex: (i) => 80 - i,
        rotateY: 0,
      })
      gsap.set('.archive-card', { backgroundColor: 'rgba(255,255,255,0.2)' })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: '+=1000%',
          scrub: 1.8,
          onUpdate: (self) => { scrollProgress = self.progress },
        },
      })

      tl.to(supportingRef.current, { opacity: 0, y: -10, duration: 0.15, ease: 'none' })
      tl.to(imageRef.current,      { scale: 5, rotation: 22, duration: 0.4, ease: 'none' }, '>')
      tl.to(overlayRef.current,    { opacity: 0.75, duration: 0.45, ease: 'none' }, '>')
      tl.to([titleLeftRef.current, titleRightRef.current], { color: '#ffffff', duration: 0.45, ease: 'none' }, '<')
      // ── Phase 4: TG2 enters ──
      tl.to(textGroup2Ref.current, { opacity: 1, y: 0, duration: 0.38, ease: 'none' }, '>+0.06')
      // ── Phase 5: TG2 continuously scrolls up so long text is readable, then fades ──
      tl.to(textGroup2Ref.current, { y: '-=480', duration: 0.65, ease: 'none' }, '>')
      tl.to(textGroup2Ref.current, { opacity: 0, duration: 0.25, ease: 'none' }, '<+0.65')
      tl.to(circleRef.current,    { clipPath: 'circle(44vmax at 50% 118%)', duration: 0.32, ease: 'none' }, '<+0.17')
      tl.to(archivePanels[0],     { scale: 1, y: 0, duration: 0.65, ease: 'none' }, '<')
      tl.to(circleRef.current,    { clipPath: 'circle(150vmax at 50% 118%)', duration: 0.38, ease: 'none' }, '<+0.32')
      tl.to('.next-section-title', { opacity: 1, y: 0, duration: 0.22, ease: 'none' })
      tl.to(archivePanels, {
        x: (i) => i * 2, y: (i) => i * -1, scale: (i) => 1 - i * 0.004,
        opacity: 1, duration: 0.1, ease: 'none', stagger: 0,
      }, '>+0.08')
      tl.to(archivePanels, { rotateY: -40, duration: 0.12, ease: 'none', stagger: 0 }, '>')
      tl.to(archivePanels, {
        x: (i) => `${(i - 1) * 25}vw`,
        y: (i) => `${(i - 1) * -3}vh`,
        scale: (i) => 1 - Math.abs(i - 1) * 0.03,
        zIndex: (i) => 80 - i,
        rotateY: 0, duration: 0.3, ease: 'none', stagger: 0,
      }, '>+0.05')
      tl.to('.archive-card', { backgroundColor: 'rgba(255,255,255,0)', duration: 0.2, ease: 'none' }, '<+0.1')
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

    return () => {
      ctx.revert()
      removeMouseMove?.()
    }
  }, [])

  const onModalClose = useCallback(() => {}, [])

  return (
    <div ref={wrapperRef} style={{ height: '1200vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-[#f5f5f3]">

        {/* ── z-10 — Background image ── */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute inset-x-0 top-[280px] flex justify-center">
            <div ref={imageRef} className="origin-center" style={{ width: '430px' }}>
              <div ref={parallaxImgRef}>
              <div className="w-full relative overflow-hidden" style={{ height: '500px' }}>
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
              fontSize: 'clamp(145px, 15vw, 305px)',
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
              fontSize: 'clamp(145px, 15vw, 305px)',
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
            className="absolute left-[9.3vw] top-[294px] whitespace-nowrap text-[20px] leading-[1.08] uppercase"
            style={{ fontFamily: "'Anton', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif" }}
          >
            {C.hero.tagline.en}
          </p>
          <div className="absolute left-[9.3vw] top-[498px] w-[532px] max-w-[38vw]">
            <div
              className="flex items-start justify-between text-[22px] leading-none uppercase"
              style={{ fontFamily: "'Anton', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif", marginBottom: '10px' }}
            >
              <span>{C.hero.indexLabel.en}</span>
              <span>{C.hero.indexNum}</span>
            </div>
            <p className="text-[17px] leading-[1.32]" style={{ whiteSpace: 'pre-line' }}>
              {C.hero.body[lang]}
            </p>
          </div>
          <div
            className="absolute left-[9.3vw] top-[760px] text-[20px] leading-none uppercase"
            style={{ fontFamily: "'Anton', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif" }}
          >
            {C.hero.exploreBtn.en}
          </div>
          <div className="absolute left-[66.6vw] top-[673px] w-[285px] max-w-[20vw]">
            <h2
              className="text-[20px] leading-none uppercase"
              style={{ fontFamily: "'Anton', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif", marginBottom: '10px' }}
            >
              {C.hero.aboutHeader.en}
            </h2>
            <p className="text-[17px] leading-[1.32]" style={{ whiteSpace: 'pre-line' }}>
              {C.hero.aboutBody[lang]}
            </p>
          </div>
        </div>

        {/* ── z-20 — Text Group 2: centered statement + label + body ── */}
        <div
          ref={textGroup2Ref}
          className="absolute z-20 pointer-events-none"
          style={{ top: '22%', left: 0, right: 0, display: 'flex', justifyContent: 'center', padding: '0 24px' }}
        >
          <div style={{ width: 'min(760px, 56vw)', color: '#ffffff', transform: 'translateX(calc(5vw - 15px))' }}>
            <p style={{
              fontFamily: "'Anton', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
              fontSize: '20px',
              lineHeight: 1.18,
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              margin: '0 0 160px',
            }}>
              {['I LOOK AT THE FLOW BEFORE BUILDING THE SCREEN.', 'I ORGANIZE INFORMATION, SHAPE THE STRUCTURE,', 'AND TURN IT INTO A USABLE INTERFACE.'].map((line, i) => (
                <span key={i} style={{ display: 'block' }}>{line}</span>
              ))}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '150px minmax(0, 285px)', columnGap: '52px', justifyContent: 'end' }}>
              <p style={{
                fontFamily: "'Anton', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
                fontSize: '20px',
                lineHeight: 1,
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                margin: 0,
              }}>WORK FLOW</p>

              <div style={{ fontFamily: "'Archivo', sans-serif",
                fontSize: '16px',
                lineHeight: 1.35,
                letterSpacing: '-0.02em',
              }}>
                {[
                  'RE:BUILD는 저에게 단순히 “다시 시작한다”는 뜻이 아닙니다. 지나온 시간을 지우는 것이 아니라, 그 안에서 남길 수 있는 것들을 다시 보고 지금의 방향에 맞게 구성하는 과정에 가깝습니다.', '저는 한 가지 길을 곧게 이어온 사람은 아닙니다. 여러 환경을 지나왔고, 지금은 웹 퍼블리싱과 프론트엔드 개발을 배우고 있습니다. 겉으로 보면 다른 방향처럼 보일 수 있지만, 저는 그 과정 안에서 정보를 정리하고, 필요한 흐름을 파악하고, 이해하기 쉬운 형태로 만드는 일에 계속 관심을 두었습니다.',
                  '저에게 RE:는 다시 보는 일입니다. 지나온 경험을 단절로만 두지 않고, 지금의 기준에서 다시 살펴보는 과정입니다. 무엇을 남기고, 무엇을 덜어내고, 어떤 방식으로 이어갈 수 있을지 정리하는 시간이기도 합니다.', '그리고 BUILD는 그 정리한 생각을 실제 결과물로 만드는 일입니다. 저는 아이디어를 화면으로 옮기고, 사용자가 이해할 수 있는 구조로 배치하며, 필요한 기능을 연결해 직접 구현하는 과정을 배우고 있습니다.',
                  '저는 빠르게 완성하는 사람이라기보다, 먼저 오래 보고 구조를 잡는 편입니다. 여러 번 확인하고 다시 정리하면서 결과물로 만들어가는 방식이 저에게는 더 자연스럽습니다.', 'AI 도구도 이 흐름 안에서 사용하고 있습니다. 저는 AI를 결과를 대신 만드는 수단이 아니라, 아이디어와 구현 사이의 간격을 줄이는 보조 도구로 활용합니다. 최종 화면과 기능은 직접 확인하고 수정하며 제 작업 방식에 맞게 다듬고 있습니다.',
                  '이 포트폴리오는 그 RE:BUILD 과정에서 만든 작업들을 담은 기록입니다.',
                ].map((paragraph, i) => (
                  <p key={i} style={{ margin: i === 0 ? 0 : '28px 0 0' }}>
                    {paragraph}
                  </p>
                ))}
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
