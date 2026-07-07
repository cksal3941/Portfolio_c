import { X } from 'lucide-react'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const NAV_ITEMS = ['Home', 'Collections', 'About', 'Stokists'] as const

export default function MenuPanel({ isOpen, onClose }: Props) {
  return (
    <>
      {/* backdrop */}
      <div
        className={`fixed inset-0 z-[190] bg-black/25 transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* panel */}
      <div
        className={`fixed right-0 top-0 z-[200] flex h-full w-[min(440px,90vw)] flex-col bg-[#f4f4f2] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* header */}
        <div className="flex items-center justify-between px-8 pb-2 pt-8">
          <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-black/30">
            Navigation
          </span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center text-black transition-opacity duration-150 hover:opacity-50"
          >
            <X size={20} strokeWidth={1.8} />
          </button>
        </div>

        {/* nav items */}
        <nav className="mt-8 flex flex-col gap-3 px-6">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              type="button"
              className="group relative overflow-hidden border border-black/10 px-7 py-9 text-left"
            >
              {/* fill layer */}
              <span
                aria-hidden
                className="absolute inset-0 origin-bottom scale-y-0 bg-black transition-transform duration-[420ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100"
              />
              {/* label */}
              <span className="relative z-10 block font-black uppercase leading-none tracking-tight text-black transition-colors duration-[420ms] group-hover:text-white"
                style={{ fontSize: 'clamp(1.7rem, 3.4vw, 2.3rem)' }}
              >
                {item}
              </span>
            </button>
          ))}
        </nav>

        {/* bottom bar */}
        <div className="mt-auto flex items-end justify-between px-6 pb-10">
          <p
            className="font-black uppercase leading-none tracking-tighter text-black"
            style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.6rem)' }}
          >
            RE:BLIDE
          </p>

          <button
            type="button"
            className="group relative overflow-hidden border border-black/40 px-5 py-[0.65rem]"
          >
            <span
              aria-hidden
              className="absolute inset-0 origin-bottom scale-y-0 bg-black transition-transform duration-[420ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100"
            />
            <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.2em] text-black transition-colors duration-[420ms] group-hover:text-white">
              Inquired ↗
            </span>
          </button>
        </div>
      </div>
    </>
  )
}
