import Hero from '@/components/Hero'
import { Menu } from 'lucide-react'

export default function App() {
  return (
    <main>
      <button
        type="button"
        aria-label="Open menu"
        className="fixed right-0 top-1/2 z-50 flex size-13 -translate-y-1/2 items-center justify-center border border-black/15 bg-[#f3f3f1] text-black"
      >
        <Menu size={28} strokeWidth={2.4} />
      </button>

      <Hero />
    </main>
  )
}
