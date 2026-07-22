import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { lenis } from '@/lib/lenis'
import { useMagnetic } from '@/hooks/useMagnetic'
import IntroLoader from '@/components/IntroLoader'
import Hero from '@/components/Hero'
import AboutSection from '@/components/AboutSection'
import HorizontalSection from '@/components/HorizontalSection'
// import About from '@/components/About'
import ProjectsSection from '@/components/ProjectsSection'
import DarkTransition from '@/components/DarkTransition'
import FooterSection from '@/components/FooterSection'
import ScrollProgress from '@/components/ScrollProgress'
import MenuPanel from '@/components/MenuPanel'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { Menu } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [introDone, setIntroDone] = useState(false)
  const [sectionKey, setSectionKey] = useState<'mobile' | 'desktop'>(() =>
    window.innerWidth < 768 ? 'mobile' : 'desktop'
  )
  const menuMagRef = useMagnetic<HTMLSpanElement>(0.25)
  const { isMobile } = useBreakpoint()
  const prevIsMobile = useRef(isMobile)
  // stable wrapper — never remounts, so the ref is always valid
  const fadeRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (prevIsMobile.current === isMobile) return
    prevIsMobile.current = isMobile

    // Hide before the browser paints the half-rebuilt layout
    if (fadeRef.current) {
      fadeRef.current.style.transition = 'none'
      fadeRef.current.style.opacity = '0'
    }
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true })
      lenis.stop()
    }
    window.scrollTo(0, 0)

    let timer: ReturnType<typeof setTimeout>
    let raf2 = 0
    // rAF 1: fires after opacity=0 is painted → trigger remount
    const rafId = requestAnimationFrame(() => {
      setSectionKey(isMobile ? 'mobile' : 'desktop')
      // rAF 2: fires after React commits the new keyed tree and paints it
      // GSAP useEffects run synchronously right after this paint (~5–10ms)
      raf2 = requestAnimationFrame(() => {
        timer = setTimeout(() => {
          try {
            window.scrollTo(0, 0)
            if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
            ScrollTrigger.refresh()
            if (lenis) {
              lenis.scrollTo(0, { immediate: true, force: true })
              lenis.start()
            }
          } catch (_) {
            if (lenis) try { lenis.start() } catch (_2) { /* ignore */ }
          } finally {
            if (fadeRef.current) {
              fadeRef.current.style.transition = 'opacity 0.25s ease'
              fadeRef.current.style.opacity = '1'
            }
          }
        }, 80)
      })
    })

    return () => {
      cancelAnimationFrame(rafId)
      cancelAnimationFrame(raf2)
      clearTimeout(timer)
    }
  }, [isMobile])

  useEffect(() => {
    window.scrollTo(0, 0)
    lenis?.scrollTo(0, { immediate: true, force: true })
  }, [])

  useEffect(() => {
    if (!lenis) return
    const l = lenis
    l.on('scroll', ScrollTrigger.update)

    const onRefreshInit = () => l.scrollTo(l.actualScroll, { immediate: true, force: true })
    ScrollTrigger.addEventListener('refreshInit', onRefreshInit)

    const onRefresh = () => l.resize()
    ScrollTrigger.addEventListener('refresh', onRefresh)

    const raf = (time: number) => l.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      ScrollTrigger.removeEventListener('refreshInit', onRefreshInit)
      ScrollTrigger.removeEventListener('refresh', onRefresh)
    }
  }, [])

  return (
    <main>
      {!introDone && <IntroLoader onDone={() => setIntroDone(true)} />}
      <ScrollProgress />

      <button
        type="button"
        aria-label="Open menu"
        onClick={() => setMenuOpen(true)}
        className="fixed right-0 top-1/2 z-50 flex size-13 -translate-y-1/2 items-center justify-center border border-black/15 bg-[#f3f3f1] text-black"
      >
        <span ref={menuMagRef} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Menu size={28} strokeWidth={2.4} />
        </span>
      </button>

      <MenuPanel isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* fadeRef wraps the keyed section but does not itself remount,
          so opacity can be set synchronously without a render cycle */}
      <div ref={fadeRef}>
        <div key={sectionKey}>
          <Hero />
          {sectionKey !== 'mobile' && <div id="section-projects" />}
          {sectionKey === 'mobile' && <ProjectsSection />}
          <div id="section-about" />
          <AboutSection />
          {/* <About /> */}
          <div id="section-work" />
          <HorizontalSection />
          <DarkTransition />
          <div id="section-contact" />
          <FooterSection />
        </div>
      </div>
    </main>
  )
}
