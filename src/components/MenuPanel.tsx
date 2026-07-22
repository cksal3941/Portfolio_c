import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { lenis } from '@/lib/lenis'
import { useLang } from '@/context/LangContext'
import { C } from '@/data/content'

type Props = {
  isOpen: boolean
  onClose: () => void
}

function scrollTo(target: string) {
  if (target === 'home') {
    lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  if (target === 'projects') {
    const el = document.getElementById('section-projects')
    if (!el) return
    lenis ? lenis.scrollTo(el) : el.scrollIntoView({ behavior: 'smooth' })
    return
  }
  const el = document.getElementById(`section-${target}`)
  if (!el) return
  lenis ? lenis.scrollTo(el) : el.scrollIntoView({ behavior: 'smooth' })
}

export default function MenuPanel({ isOpen, onClose }: Props) {
  const { lang, toggle } = useLang()
  const [toast, setToast]           = useState(false)
  // pendingLang: 클릭 즉시 버튼에 반영, 전역 lang이 따라오면 null로 리셋
  const [pendingLang, setPendingLang] = useState<'ko' | 'en' | null>(null)
  const displayLang = pendingLang ?? lang

  useEffect(() => { setPendingLang(null) }, [lang])

  const handleNav = (target: string) => {
    onClose()
    requestAnimationFrame(() => scrollTo(target))
  }

  const handleToggle = () => {
    setPendingLang(lang === 'ko' ? 'en' : 'ko')
    toggle()
  }

  const handleEmail = () => {
    navigator.clipboard.writeText('cksal8449@gmail.com').catch(() => {})
    window.open('mailto:cksal8449@gmail.com', '_self')
    setToast(true)
    setTimeout(() => setToast(false), 2500)
  }

  return (
    <>
      {/* email copied toast */}
      <div
        style={{
          position:   'fixed',
          bottom:     '40px',
          left:       '50%',
          transform:  `translateX(-50%) translateY(${toast ? '0px' : '12px'})`,
          opacity:    toast ? 1 : 0,
          transition: 'opacity 0.25s, transform 0.25s',
          background: '#000',
          color:      '#fff',
          padding:    '10px 22px',
          fontSize:   '13px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontFamily: "'Archivo', sans-serif",
          zIndex:     500,
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        {lang === 'ko' ? '이메일 복사됨' : 'Email copied'} · cksal8449@gmail.com
      </div>

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
        {/* close button */}
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

        {/* nav items */}
        <nav className="absolute left-5 right-5 top-5 flex flex-col gap-3">
          {C.menu.items.map(({ label, target }) => (
            <button
              key={target}
              type="button"
              onClick={() => handleNav(target)}
              className="group relative flex h-20 items-center overflow-hidden rounded-[3px] border border-black/10 bg-[#efefed] pr-4 text-left"
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-bottom scale-y-0 bg-black transition-transform duration-[420ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100"
              />
              <span aria-hidden className="relative z-10 block w-[17px] shrink-0" />
              <span className="relative z-10 block text-[23px] font-black leading-none text-black transition-colors duration-[420ms] group-hover:text-white">
                {label.en}
              </span>
            </button>
          ))}
        </nav>

        {/* bottom bar */}
        <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-[10px]">
          <div className="flex items-center justify-between">
            <p
              className="ml-1 font-black uppercase leading-[0.8] tracking-[-0.04em] text-black"
              style={{ fontSize: 'clamp(16px, 6.5vw, 36px)' }}
            >
              RE:BUILD
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleToggle}
                aria-label="Toggle language"
                className="flex size-12 items-center justify-center border border-black/20 text-[13px] font-semibold text-black transition-colors duration-150 hover:bg-black hover:text-white"
              >
                {displayLang === 'ko' ? 'EN' : 'KO'}
              </button>

              <button
                type="button"
                onClick={() => window.open('https://github.com/cksal3941', '_blank', 'noopener,noreferrer')}
                aria-label="GitHub"
                className="flex size-12 items-center justify-center border border-black/20 text-[13px] font-semibold text-black transition-colors duration-150 hover:bg-black hover:text-white"
              >
                gh
              </button>

              <button
                type="button"
                onClick={handleEmail}
                aria-label="Email"
                className="flex size-12 items-center justify-center border border-black/20 text-[13px] font-semibold text-black transition-colors duration-150 hover:bg-black hover:text-white"
              >
                @
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
