import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BlankNextSection from '@/components/BlankNextSection'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const wrapperRef         = useRef<HTMLDivElement>(null)
  const supportingRef      = useRef<HTMLDivElement>(null)
  const imageRef           = useRef<HTMLDivElement>(null)
  const overlayRef         = useRef<HTMLDivElement>(null)
  const titleLeftRef       = useRef<HTMLSpanElement>(null)
  const titleRightRef      = useRef<HTMLSpanElement>(null)
  const centerTextRef      = useRef<HTMLDivElement>(null)
  const descCol1Ref        = useRef<HTMLDivElement>(null)
  const descCol2Ref        = useRef<HTMLDivElement>(null)
  const collectionLabelRef = useRef<HTMLDivElement>(null)
  const collectionTextRef  = useRef<HTMLDivElement>(null)
  const circleRef          = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const vh = window.innerHeight
      const archivePanels = gsap.utils.toArray<HTMLElement>('.archive-panel')

      gsap.set(overlayRef.current,         { opacity: 0 })
      gsap.set(centerTextRef.current,      { opacity: 0, y: vh })
      gsap.set(descCol1Ref.current,        { opacity: 0, y: vh })
      gsap.set(descCol2Ref.current,        { opacity: 0, y: vh })
      gsap.set(collectionLabelRef.current, { opacity: 0, y: vh })
      gsap.set(collectionTextRef.current,  { opacity: 0, y: vh })
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

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: '+=1000%',
          scrub: 1.8,
        },
      })

      tl.to(supportingRef.current, { opacity: 0, y: -10, duration: 0.15, ease: 'none' })
      tl.to(imageRef.current,      { scale: 5, rotation: 22, duration: 0.4, ease: 'none' }, '>')
      tl.to(overlayRef.current,    { opacity: 0.55, duration: 0.45, ease: 'none' }, '>')
      tl.to([titleLeftRef.current, titleRightRef.current], { color: '#ffffff', duration: 0.45, ease: 'none' }, '<')
      tl.to(centerTextRef.current, { opacity: 1, y: 0, duration: 0.3, ease: 'none' }, '>+0.04')
      tl.to(descCol1Ref.current,   { opacity: 1, y: 0, duration: 0.3, ease: 'none' }, '<+0.06')
      tl.to(descCol2Ref.current,   { opacity: 1, y: 0, duration: 0.3, ease: 'none' }, '<+0.04')
      tl.to(collectionLabelRef.current, { opacity: 1, y: 0, duration: 0.3, ease: 'none' }, '>+0.12')
      tl.to(collectionTextRef.current,  { opacity: 1, y: 0, duration: 0.3, ease: 'none' }, '<+0.05')
      tl.to(
        [centerTextRef.current, descCol1Ref.current, descCol2Ref.current, collectionLabelRef.current, collectionTextRef.current],
        { opacity: 0, y: -200, duration: 0.35, ease: 'none' },
        '>+0.12',
      )
      tl.to(circleRef.current,    { clipPath: 'circle(44vmax at 50% 118%)', duration: 0.32, ease: 'none' }, '<+0.18')
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
        zIndex: (i) => i === 1 ? 82 : 79 - Math.abs(i - 1),
        rotateY: 0, duration: 0.3, ease: 'none', stagger: 0,
      }, '>+0.05')
    }, wrapperRef)
    return () => ctx.revert()
  }, [])

  const onModalClose = useCallback(() => {}, [])

  return (
    <div ref={wrapperRef} style={{ height: '1400vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-[#f5f5f3]">

        {/* ── z-10 — Background image ── */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute inset-x-0 top-[280px] flex justify-center">
            <div ref={imageRef} className="origin-center" style={{ width: '430px' }}>
              <div className="w-full relative overflow-hidden" style={{ height: '500px' }}>
                <img
                  src="/haus-portrait.png"
                  alt="fashion editorial"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/20" />
              </div>
            </div>
          </div>
        </div>

        {/* ── z-15 — Dark overlay ── */}
        <div ref={overlayRef} className="absolute inset-0 z-[15] bg-black pointer-events-none" />

        {/* ── z-20 — Split typography ── */}
        <div className="absolute inset-x-0 z-20 pointer-events-none px-2 flex justify-between items-start" style={{ top: '23px' }}>
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
            RE:
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
            BLIDE
          </span>
        </div>

        {/* ── z-20 — Supporting text ── */}
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

        {/* ── z-20 — Center text (Phase 4) ── */}
        <div
          ref={centerTextRef}
          className="absolute left-0 right-0 z-20 flex flex-col items-center text-center pointer-events-none"
          style={{ top: '40%' }}
        >
          <p className="text-[9px] tracking-[0.28em] text-white/35 uppercase mb-3">Statement</p>
          <p className="text-[11px] tracking-[0.14em] text-white/70 uppercase leading-[2.2] max-w-sm">
            A body of work shaped by process,<br />
            material, and the space between<br />
            intention and form.
          </p>
        </div>

        {/* ── z-20 — Secondary description (Phase 4) ── */}
        <div className="absolute left-0 right-0 z-20 flex justify-center gap-14 px-[12vw]" style={{ top: '56%' }}>
          <div ref={descCol1Ref}>
            <p className="text-[9px] tracking-[0.18em] text-white/65 uppercase leading-[2]">
              EACH PIECE IS PRESENTED AS FORM, MATERIAL,<br />
              AND MOVEMENT IN DIALOGUE WITH THE BODY.
            </p>
          </div>
          <div ref={descCol2Ref}>
            <p className="text-[9px] tracking-[0.18em] text-white/65 uppercase leading-[2]">
              EACH COLLECTION EXPLORES SILHOUETTE,<br />
              TEXTURE, AND THE RELATIONSHIP<br />
              BETWEEN BODY AND SPACE.
            </p>
          </div>
        </div>

        {/* ── z-20 — COLLECTION label (Phase 5) ── */}
        <div ref={collectionLabelRef} className="absolute left-10 z-20" style={{ top: '70%' }}>
          <p className="text-[9px] tracking-[0.28em] text-white/40 uppercase mb-1">Chapter</p>
          <p className="text-[13px] tracking-[0.2em] text-white/90 uppercase font-medium">Collection</p>
        </div>

        {/* ── z-20 — COLLECTION right text (Phase 5) ── */}
        <div ref={collectionTextRef} className="absolute right-10 z-20 text-right" style={{ top: '70%' }}>
          <p className="text-[9px] tracking-[0.22em] text-white/40 uppercase leading-[2.2]">
            Vol. 01 — Archives<br />
            2024 — Ongoing<br />
            Selected Works
          </p>
        </div>

        {/* ── z-30 — Circle wipe ── */}
        <div ref={circleRef} className="absolute inset-0 z-30 overflow-hidden">
          <BlankNextSection onModalClose={onModalClose} />
        </div>

      </div>
    </div>
  )
}
