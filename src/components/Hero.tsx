import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BlankNextSection from '@/components/BlankNextSection'
import bgImage from '@/images/background2.png'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
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
      tl.to(overlayRef.current,    { opacity: 0.55, duration: 0.45, ease: 'none' }, '>')
      tl.to([titleLeftRef.current, titleRightRef.current], { color: '#ffffff', duration: 0.45, ease: 'none' }, '<')
      // ── Phase 4: TG2 enters ──
      tl.to(textGroup2Ref.current, { opacity: 1, y: 0, duration: 0.38, ease: 'none' }, '>+0.06')
      // ── Phase 5: TG2 exits fully off the top — circle only after TG2 clears viewport ──
      tl.to(textGroup2Ref.current, { opacity: 0, y: '-=320', duration: 0.28, ease: 'none' }, '>+0.12')
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
        <div className="absolute inset-x-0 z-20 pointer-events-none px-2 flex justify-between items-start" style={{ top: '3px' }}>
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
            <span ref={parallaxRightRef} style={{ display: 'inline-block' }}>BLIDE</span>
          </span>
        </div>


        {/* ── z-20 — Supporting text (visible on load, fades on first scroll) ── */}
        <div ref={supportingRef} className="absolute inset-0 z-20 pointer-events-none text-black">
          <p
            className="absolute left-[9.3vw] top-[294px] max-w-[170px] text-[20px] leading-[1.08] uppercase"
            style={{ fontFamily: "'Anton', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif" }}
          >
            THIS IS A SPACE FOR DISCOVERY
          </p>
          <div className="absolute left-[9.3vw] top-[498px] w-[532px] max-w-[38vw]">
            <div
              className="mb-5 flex items-start justify-between text-[22px] leading-none uppercase"
              style={{ fontFamily: "'Anton', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif" }}
            >
              <span>INDEX</span>
              <span>1/2</span>
            </div>
            <p className="text-[17px] leading-[1.32]">
              Our collections are studies in structure and contrast. We work with architectural lines, raw
              materials, and controlled volumes. Designed with intent, but open to personal interpretation. No
              seasonal rules. Just form, material, and presence.
            </p>
          </div>
          <div
            className="absolute left-[9.3vw] top-[760px] text-[20px] leading-none uppercase"
            style={{ fontFamily: "'Anton', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif" }}
          >
            [ EXPLORE PAGE ]
          </div>
          <div className="absolute left-[66.6vw] top-[673px] w-[285px] max-w-[20vw]">
            <h2
              className="mb-5 text-[20px] leading-none uppercase"
              style={{ fontFamily: "'Anton', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif" }}
            >
              ABOUT RE:BLIDE
            </h2>
            <p className="text-[17px] leading-[1.32]">
              Re:blide presents fashion as a curated digital archive. This is a space for discovery, reference,
              and visual direction.
            </p>
          </div>
        </div>

        {/* ── z-20 — Text Group 2: centered statement + label + body ── */}
        <div
          ref={textGroup2Ref}
          className="absolute z-20 pointer-events-none"
          style={{ top: '22%', left: 0, right: 0, display: 'flex', justifyContent: 'center', padding: '0 24px' }}
        >
          <div style={{ maxWidth: '520px', textAlign: 'center', color: '#ffffff' }}>
            <p style={{
              fontFamily: "'Anton', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
              fontSize: '20px',
              lineHeight: 1.3,
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              margin: '0 0 36px',
            }}>
              EACH PIECE IS PRESENTED AS FORM, MATERIAL,<br />
              AND MOVEMENT IN DIALOGUE WITH THE BODY.<br />
              EACH COLLECTION EXPLORES SILHOUETTE,<br />
              TEXTURE, AND THE RELATIONSHIP BETWEEN<br />
              BODY AND SPACE.
            </p>

            <p style={{
              fontFamily: "'Anton', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
              fontSize: '20px',
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              margin: '0 0 20px',
            }}>
              COLLECTION
            </p>

            <p style={{
              fontFamily: "'Archivo', sans-serif",
              fontSize: '16px',
              lineHeight: 1.6,
              margin: 0,
            }}>
              Collection is presented as a curated archive of garments exploring
              silhouette, material, and movement. Each piece is documented as a
              visual study, capturing the relationship between structure, body,
              and contemporary expression.
            </p>
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
