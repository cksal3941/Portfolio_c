import { useEffect, useRef } from 'react'
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
    const vh = window.innerHeight

    const ctx = gsap.context(() => {
      const archivePanels = gsap.utils.toArray<HTMLElement>('.archive-panel')

      gsap.set(overlayRef.current,         { opacity: 0 })
      gsap.set(centerTextRef.current,      { opacity: 0, y: vh })
      gsap.set(descCol1Ref.current,        { opacity: 0, y: vh })
      gsap.set(descCol2Ref.current,        { opacity: 0, y: vh })
      gsap.set(collectionLabelRef.current, { opacity: 0, y: vh })
      gsap.set(collectionTextRef.current,  { opacity: 0, y: vh })
      // Start the circle as a zero-radius clip from the bottom center.
      // Element is 300×300 px, centered horizontally, with bottom:-150px so
      gsap.set(circleRef.current, {
        clipPath: 'circle(0vmax at 50% 118%)',
      })
      gsap.set('.next-section-title', { opacity: 0, y: 14 })
      gsap.set('.archive-panels', { opacity: 1 })
      gsap.set(archivePanels, {
        x: (index) => index * 7,
        y: (index) => index * -4,
        scale: (index) => 1 - index * 0.008,
        opacity: 1,
        zIndex: (index) => 80 - index,
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: '+=1000%',
          scrub: 1.8,
        },
      })

      // ── Phase 1 — supporting text fades out ────────────────────────────
      tl.to(supportingRef.current, {
        opacity: 0, y: -10, duration: 0.15, ease: 'none',
      })

      // ── Phase 2 — image scales + rotates to full-bleed ─────────────────
      tl.to(imageRef.current, {
        scale: 5, rotation: 22, duration: 0.4, ease: 'none',
      }, '>')

      // ── Phase 3 — overlay + typography white ───────────────────────────
      tl.to(overlayRef.current, {
        opacity: 0.55, duration: 0.45, ease: 'none',
      }, '>')
      tl.to([titleLeftRef.current, titleRightRef.current], {
        color: '#ffffff', duration: 0.45, ease: 'none',
      }, '<')

      // ── Phase 4 — center text + secondary description rise into view ────
      tl.to(centerTextRef.current, {
        opacity: 1, y: 0, duration: 0.3, ease: 'none',
      }, '>+0.04')
      tl.to(descCol1Ref.current, {
        opacity: 1, y: 0, duration: 0.3, ease: 'none',
      }, '<+0.06')
      tl.to(descCol2Ref.current, {
        opacity: 1, y: 0, duration: 0.3, ease: 'none',
      }, '<+0.04')

      // ── Phase 5 — COLLECTION content rises into view ───────────────────
      tl.to(collectionLabelRef.current, {
        opacity: 1, y: 0, duration: 0.3, ease: 'none',
      }, '>+0.12')
      tl.to(collectionTextRef.current, {
        opacity: 1, y: 0, duration: 0.3, ease: 'none',
      }, '<+0.05')

      // ── Phase 6 — all text exits upward ────────────────────────────────
      tl.to(
        [
          centerTextRef.current,
          descCol1Ref.current,
          descCol2Ref.current,
          collectionLabelRef.current,
          collectionTextRef.current,
        ],
        { opacity: 0, y: -200, duration: 0.35, ease: 'none' },
        '>+0.12',
      )

      // ── Phase 7 — circle appears at bottom center ─────────────────────
      // All phases: center stays at 50% 100% (bottom-center), only radius grows.
      // vmax = max(vw, vh), so units stay consistent for GSAP interpolation.
      tl.to(circleRef.current, {
        clipPath: 'circle(44vmax at 50% 118%)',
        duration: 0.32,
        ease: 'none',
      }, '<+0.18')

      tl.to(circleRef.current, {
        clipPath: 'circle(150vmax at 50% 118%)',
        duration: 0.38,
        ease: 'none',
      })

      tl.to('.next-section-title', {
        opacity: 1,
        y: 0,
        duration: 0.22,
        ease: 'none',
      })

      tl.to(archivePanels, {
        x: (index) => `${index * 10 - 38}vw`,
        y: (index) => `${8 - index * 5}vh`,
        scale: (index) => 1 - index * 0.035,
        zIndex: (index) => 80 - index,
        duration: 0.85,
        ease: 'none',
        stagger: 0.015,
      }, '>+0.12')

      // ── Phase 8 — circle grows ──────────────────────────────────────────

      // ── Phase 9 — circle covers full viewport ──────────────────────────
      // 150vmax always exceeds the bottom-center → farthest-corner distance.

    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  return (
    /* 800vh wrapper — 100vh visible + 700vh of pinned scroll travel */
    <div ref={wrapperRef} style={{ height: '1100vh' }}>

      <div className="sticky top-0 h-screen overflow-hidden bg-[#f5f5f3]">

        {/* ── z-10 — Background image ── */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div ref={imageRef} className="origin-center" style={{ width: '28vw' }}>
            <div className="w-full aspect-[3/4] bg-[#b8b8b2] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/30" />
            </div>
          </div>
        </div>

        {/* ── z-15 — Dark overlay ── */}
        <div
          ref={overlayRef}
          className="absolute inset-0 z-[15] bg-black pointer-events-none"
        />

        {/* ── z-20 — Split typography, fixed at top ── */}
        <div className="absolute inset-0 z-20 pointer-events-none px-10 pt-10 flex justify-between items-start">
          <span
            ref={titleLeftRef}
            className="font-black leading-none tracking-tighter"
            style={{ fontSize: 'clamp(3.5rem, 13vw, 14rem)', color: '#000000' }}
          >
            RE:
          </span>
          <span
            ref={titleRightRef}
            className="font-black leading-none tracking-tighter"
            style={{ fontSize: 'clamp(3.5rem, 13vw, 14rem)', color: '#000000' }}
          >
            BLIDE
          </span>
        </div>

        {/* ── z-20 — Supporting text ── */}
        <div ref={supportingRef} className="absolute bottom-12 left-10 z-20 space-y-2">
          <p className="text-[11px] tracking-[0.22em] text-black/40 uppercase">
            Creative Portfolio — 2025
          </p>
          <p className="text-sm text-black/55 leading-relaxed">
            Design and development,<br />built with intention.
          </p>
        </div>

        {/* ── z-20 — Center text (Phase 4) ── */}
        <div
          ref={centerTextRef}
          className="absolute left-0 right-0 z-20 flex flex-col items-center text-center pointer-events-none"
          style={{ top: '40%' }}
        >
          <p className="text-[9px] tracking-[0.28em] text-white/35 uppercase mb-3">
            Statement
          </p>
          <p className="text-[11px] tracking-[0.14em] text-white/70 uppercase leading-[2.2] max-w-sm">
            A body of work shaped by process,<br />
            material, and the space between<br />
            intention and form.
          </p>
        </div>

        {/* ── z-20 — Secondary description, two columns (Phase 4) ── */}
        <div
          className="absolute left-0 right-0 z-20 flex justify-center gap-14 px-[12vw]"
          style={{ top: '56%' }}
        >
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
        <div
          ref={collectionLabelRef}
          className="absolute left-10 z-20"
          style={{ top: '70%' }}
        >
          <p className="text-[9px] tracking-[0.28em] text-white/40 uppercase mb-1">
            Chapter
          </p>
          <p className="text-[13px] tracking-[0.2em] text-white/90 uppercase font-medium">
            Collection
          </p>
        </div>

        {/* ── z-20 — COLLECTION right-side text block (Phase 5) ── */}
        <div
          ref={collectionTextRef}
          className="absolute right-10 z-20 text-right"
          style={{ top: '70%' }}
        >
          <p className="text-[9px] tracking-[0.22em] text-white/40 uppercase leading-[2.2]">
            Vol. 01 — Archives<br />
            2024 — Ongoing<br />
            Selected Works
          </p>
        </div>

        {/* ── z-30 — Circle wipe (clip-path reveal) ── */}
        {/* The light background is clipped to a growing circle.
            Starts as zero-radius point below viewport, expands to cover everything.
            The old dark scene is visible outside the circle until fully covered. */}
        <div
          ref={circleRef}
          className="absolute inset-0 z-30 overflow-hidden"
        >
          <BlankNextSection />
        </div>

      </div>
    </div>
  )
}
