import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import gsap from 'gsap'
import { lenis } from '@/lib/lenis'
import { getLinkIcon, getLinkAriaLabel, type Panel } from '@/data/projects'
import type { Lang } from '@/context/LangContext'

type Props = {
  panel: Panel
  onClose: () => void
  lang: Lang
  isMobile: boolean
}

export default function ProjectModal({ panel, onClose, lang, isMobile }: Props) {
  const d = panel.detail!
  const modalRef = useRef<HTMLDivElement>(null)
  const tlRef    = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    lenis?.stop()
    document.body.style.overflow = 'hidden'

    const modalEl = modalRef.current
    const stopProp = (e: Event) => e.stopPropagation()
    modalEl?.addEventListener('wheel',     stopProp, { passive: true })
    modalEl?.addEventListener('touchmove', stopProp, { passive: true })

    const block = (e: Event) => {
      if (modalRef.current?.contains(e.target as Node)) return
      e.preventDefault()
    }
    document.addEventListener('wheel',     block, { passive: false })
    document.addEventListener('touchmove', block, { passive: false })

    tlRef.current = gsap.timeline()
    tlRef.current.fromTo(
      modalRef.current,
      { y: 48, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
    )

    return () => {
      modalEl?.removeEventListener('wheel',     stopProp)
      modalEl?.removeEventListener('touchmove', stopProp)
      document.removeEventListener('wheel',     block)
      document.removeEventListener('touchmove', block)
      document.body.style.overflow = ''
      lenis?.start()
    }
  }, [])

  const handleClose = () => {
    if (tlRef.current) tlRef.current.clear()
    tlRef.current = gsap.timeline({ onComplete: onClose })
    tlRef.current
      .to(modalRef.current, { scale: 0.96, duration: 0.12, ease: 'power2.in' })
      .to(modalRef.current, { y: 80, opacity: 0, duration: 0.3, ease: 'power3.in' }, '<+0.05')
  }

  return (
    <>
      <div className="fixed inset-0 z-[300] bg-black/60" onClick={handleClose} />

      <div
        className="fixed inset-0 z-[310] flex items-center justify-center pointer-events-none"
        style={{ padding: isMobile ? 0 : '16px' }}
      >
        <div
          ref={modalRef}
          className="pointer-events-auto bg-white border border-black flex flex-col w-full"
          style={{
            maxWidth: isMobile ? '100%' : '760px',
            maxHeight: isMobile ? '100%' : '86vh',
            height: isMobile ? '100%' : undefined,
          }}
        >
          {/* ── 고정 헤더 ── */}
          <div
            className="shrink-0 flex items-start justify-between border-b border-black bg-white"
            style={{ padding: isMobile ? '16px 20px 14px' : '32px 40px 20px' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <p style={{ fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', lineHeight: 1.4, color: '#000' }}>
                {d.type}
              </p>
              <p style={{ fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', lineHeight: 1.4, color: '#000' }}>
                {d.period}
              </p>
            </div>
            <button
              type="button"
              aria-label="Close"
              onClick={handleClose}
              className="group shrink-0 flex items-center justify-center border border-black bg-white text-black hover:bg-black hover:text-white transition-colors"
              style={{ width: '36px', height: '36px', marginLeft: '20px' }}
            >
              <X size={16} strokeWidth={1.5} />
            </button>
          </div>

          {/* ── 스크롤 영역 ── */}
          <div className="overflow-y-auto flex-1" style={{ overscrollBehavior: 'contain' }}>

          <div className="border-b border-black" style={{ padding: isMobile ? '16px 20px' : '28px 40px' }}>
            <h3
              className="text-black font-black uppercase"
              style={{ fontSize: 'clamp(28px, 5vw, 44px)', lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: '6px' }}
            >
              {panel.title}
            </h3>
            <p
              className="text-black font-bold"
              style={{ fontSize: 'clamp(13px, 2vw, 16px)', letterSpacing: '-0.01em', marginBottom: '16px' }}
            >
              {panel.meta?.displayTitle.ko}
            </p>
            <p style={{ fontSize: '15px', lineHeight: 1.6, color: '#000', margin: 0 }}>
              {d.subtitle[lang]}
            </p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '18px' }}>
              {d.links.map((link, i) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={getLinkAriaLabel(link.label, lang)}
                  className={`flex flex-col items-center justify-center gap-1 border border-black transition-colors ${i === 0 ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'}`}
                  style={{ width: '64px', height: '64px' }}
                >
                  {getLinkIcon(link.label)}
                  <span style={{ fontSize: '11px', letterSpacing: '0.06em', textTransform: 'uppercase', lineHeight: 1, textAlign: 'center' }}>
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div style={{ padding: isMobile ? '0 20px 24px' : '0 40px 40px', display: 'flex', flexDirection: 'column', gap: isMobile ? '20px' : '28px' }}>
            <div style={{ paddingTop: '28px' }}>
              <p style={{ fontSize: '15px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#000', marginBottom: '12px' }}>
                Tech Stack
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {d.stack.map(s => (
                  <span
                    key={s}
                    style={{ padding: '6px 10px', border: '1px solid #000', fontSize: '12px', lineHeight: 1, color: '#000', background: '#fff' }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p style={{ fontSize: '15px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#000', marginBottom: '10px' }}>
                Role
              </p>
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#000', margin: 0 }}>
                {d.role[lang]}
              </p>
            </div>

            <div>
              <p style={{ fontSize: '15px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#000', marginBottom: '12px' }}>
                Key Features
              </p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '8px' }}>
                {d.tasks[lang].map(t => (
                  <li
                    key={t}
                    style={{ padding: '12px 14px', border: '1px solid #000', fontSize: '14px', lineHeight: 1.5, color: '#000' }}
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ borderTop: '1px solid #000', paddingTop: '28px' }}>
              <p style={{ fontSize: '15px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#000', marginBottom: '10px' }}>
                Learned
              </p>
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#000', margin: 0 }}>
                {d.learned[lang]}
              </p>
            </div>
          </div>
          </div>{/* end 스크롤 영역 */}
        </div>
      </div>
    </>
  )
}
