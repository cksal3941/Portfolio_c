import { X } from 'lucide-react'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const NAV_ITEMS = ['Home', 'Collections', 'About', 'Stokists'] as const

export default function MenuPanel({ isOpen, onClose }: Props) {
  return (
    <>
      <div
        className={`fixed inset-0 z-[190] bg-transparent transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed right-0 top-0 z-[200] h-screen w-[min(440px,90vw)] border-l border-black/15 bg-[#f4f4f2] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className={`absolute left-0 top-1/2 flex size-13 -translate-x-full -translate-y-1/2 items-center justify-center border border-black/15 bg-[#f4f4f2] text-black transition-[background-color,opacity] duration-150 hover:bg-white ${
            isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <X size={25} strokeWidth={2} />
        </button>

        <nav className="absolute left-5 right-5 top-5 flex flex-col gap-3">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              type="button"
              className="group relative flex h-20 items-center overflow-hidden rounded-[3px] border border-black/10 bg-[#efefed] pr-4 text-left"
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-bottom scale-y-0 bg-black transition-transform duration-[420ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100"
              />
              <span aria-hidden className="relative z-10 block w-[17px] shrink-0" />
              <span className="relative z-10 block text-[23px] font-black leading-none text-black transition-colors duration-[420ms] group-hover:text-white">
                {item}
              </span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-[10px]">
          <div className="flex items-end justify-between">
            <p className="text-[42px] font-black uppercase leading-[0.8] tracking-[-0.04em] text-black">
              RE:BLIDE
            </p>

            <div className="flex items-center gap-2">
              <a
                href="https://www.linkedin.com"
                aria-label="LinkedIn"
                className="flex size-6 items-center justify-center border border-black/10 text-[10px] font-semibold text-black transition-colors duration-150 hover:bg-white"
              >
                in
              </a>
              <a
                href="https://x.com"
                aria-label="X"
                className="flex size-6 items-center justify-center border border-black/10 text-[10px] font-semibold text-black transition-colors duration-150 hover:bg-white"
              >
                X
              </a>
              <a
                href="https://www.instagram.com"
                aria-label="Instagram"
                className="flex size-6 items-center justify-center border border-black/10 text-[10px] font-semibold text-black transition-colors duration-150 hover:bg-white"
              >
                ig
              </a>
            </div>
          </div>

          <button
            type="button"
            className="group relative flex h-20 w-full items-center overflow-hidden rounded-[3px] border border-black/10 bg-[#efefed] pr-4 text-left"
          >
            <span
              aria-hidden
              className="absolute inset-0 origin-bottom scale-y-0 bg-black transition-transform duration-[420ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100"
            />
            <span aria-hidden className="relative z-10 block w-[17px] shrink-0" />
            <span className="relative z-10 text-[23px] font-black leading-none text-black transition-colors duration-[420ms] group-hover:text-white">
              Inquired {'\u2197'}
            </span>
          </button>
        </div>
      </div>
    </>
  )
}
