import { useState, useEffect, useRef } from 'react'
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
  const prevIsMobile = useRef(isMobile)

  // 브레이크포인트 전환 시 빈 화면 방지
  // Lenis 중단 → 네이티브 스크롤 0 → DOM/GSAP 정착 후 ScrollTrigger 재계산 → Lenis 재개
  useEffect(() => {
    if (prevIsMobile.current === isMobile) return
    prevIsMobile.current = isMobile

    if (lenis) lenis.stop()
    window.scrollTo(0, 0)

    const timer = setTimeout(() => {
      if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
      ScrollTrigger.refresh()
      if (lenis) {
        lenis.scrollTo(0, { immediate: true, force: true })
        lenis.start()
      }
    }, 120)
    return () => clearTimeout(timer)
  }, [isMobile])

  useEffect(() => {
    if (!lenis) return
    const l = lenis
    l.on('scroll', ScrollTrigger.update)

    // refresh 직전 Lenis 위치를 고정해 가상 스크롤과 window.scrollY 불일치 방지
    // force: true — lenis.stop() 상태에서도 scrollTo가 동작하도록
    const onRefreshInit = () => l.scrollTo(l.actualScroll, { immediate: true, force: true })
    ScrollTrigger.addEventListener('refreshInit', onRefreshInit)

    // GSAP이 pin spacer를 업데이트한 뒤 Lenis의 maxScroll을 재계산
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

      <Hero />
      {isMobile && <ProjectsSection />}
      <div id="section-about" />
      <AboutSection />
      {/* <About /> */}
      <div id="section-work" />
      <HorizontalSection />
      <DarkTransition />
      <div id="section-contact" />
      <FooterSection />
    </main>
  )
}
