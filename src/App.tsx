import { useState, useEffect } from 'react'
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

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [introDone, setIntroDone] = useState(false)
  const menuMagRef = useMagnetic<HTMLSpanElement>(0.25)
  const { isMobile } = useBreakpoint()

  useEffect(() => {
    if (!lenis) return
    const l = lenis
    l.on('scroll', ScrollTrigger.update)

    // refresh 직전 Lenis 위치를 고정해 가상 스크롤과 window.scrollY 불일치 방지
    const onRefreshInit = () => l.scrollTo(l.actualScroll, { immediate: true })
    ScrollTrigger.addEventListener('refreshInit', onRefreshInit)

    const raf = (time: number) => l.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      ScrollTrigger.removeEventListener('refreshInit', onRefreshInit)
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

      <Hero />
      {isMobile && <ProjectsSection />}
      <div id="section-about" />
      <AboutSection />
      {/* <About /> */}
      <div id="section-work" />
      <HorizontalSection />
      {!isMobile && <ProjectsSection />}
      <DarkTransition />
      <div id="section-contact" />
      <FooterSection />
    </main>
  )
}
