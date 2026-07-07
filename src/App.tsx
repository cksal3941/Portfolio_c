import { useState } from 'react'
import Hero from '@/components/Hero'
import About from '@/components/About'
import AboutSection from '@/components/AboutSection'
import HorizontalSection from '@/components/HorizontalSection'
import MenuPanel from '@/components/MenuPanel'
import { Menu } from 'lucide-react'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main>
      <button
        type="button"
        aria-label="Open menu"
        onClick={() => setMenuOpen(true)}
        className="fixed right-0 top-1/2 z-50 flex size-13 -translate-y-1/2 items-center justify-center border border-black/15 bg-[#f3f3f1] text-black"
      >
        <Menu size={28} strokeWidth={2.4} />
      </button>

      <MenuPanel isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <Hero />
      <AboutSection />
      <HorizontalSection />
      <About />
    </main>
  )
}
