import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { lenis } from '@/lib/lenis'
import { useMagnetic } from '@/hooks/useMagnetic'
import { useLang } from '@/context/LangContext'
import { C } from '@/data/content'
import item1 from '@/images/item.png'
import item2 from '@/images/item2.png'
import item3 from '@/images/item3.png'
import item4 from '@/images/item4.png'
import item5 from '@/images/item5.png'
import item6 from '@/images/item6.png'

const ANTON: React.CSSProperties = {
  fontFamily: "'Anton', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
}
const ARCHIVO: React.CSSProperties = {
  fontFamily: "'Archivo', sans-serif",
}

function MarqueeContent() {
  const chunks = [
    { type: 'text', value: 'FROM RESEARCH' },
    { type: 'img',  value: item1 },
    { type: 'text', value: 'TO THE WEB' },
    { type: 'img',  value: item2 },
    { type: 'img',  value: item5 },
    { type: 'img',  value: item3 },
    { type: 'text', value: 'RE:BUILD' },
    { type: 'img',  value: item4 },
    { type: 'img',  value: item6 },
    { type: 'img',  value: item1 },
  ]

  const imgStyle: React.CSSProperties = {
    width: '80px', height: '80px', objectFit: 'cover',
    display: 'inline-block', verticalAlign: 'middle', flexShrink: 0,
    filter: 'grayscale(1) contrast(1.1)',
    opacity: 0.9,
    borderRadius: '2px',
  }
  const textStyle: React.CSSProperties = {
    ...ANTON,
    fontSize: 'clamp(80px, 12vw, 200px)',
    lineHeight: 1, textTransform: 'uppercase', letterSpacing: '-0.02em',
    color: '#ffffff',
    whiteSpace: 'nowrap',
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '40px', paddingRight: '40px' }}>
      {chunks.map((c, i) =>
        c.type === 'img'
          ? <img key={i} src={c.value} alt="" style={imgStyle} />
          : <span key={i} style={textStyle}>{c.value}</span>
      )}
    </div>
  )
}

export default function FooterSection() {
  const sectionRef   = useRef<HTMLElement>(null)
  const emailMagRef  = useMagnetic<HTMLSpanElement>(0.3)
  const githubMagRef = useMagnetic<HTMLSpanElement>(0.3)
  const topMagRef    = useMagnetic<HTMLSpanElement>(0.3)
  const { lang }     = useLang()

  const track1aRef  = useRef<HTMLDivElement>(null)
  const track1bRef  = useRef<HTMLDivElement>(null)
  const marquee1Ref = useRef<HTMLDivElement>(null)
  const tl1Ref      = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      tl1Ref.current = gsap.to([track1aRef.current, track1bRef.current], {
        xPercent: -100, duration: 20, ease: 'none', repeat: -1,
        modifiers: { xPercent: gsap.utils.wrap(-100, 0) },
      })
    }, sectionRef)

    const m1 = marquee1Ref.current
    const slow = () => gsap.to(tl1Ref.current, { timeScale: 0.3, duration: 0.5 })
    const fast = () => gsap.to(tl1Ref.current, { timeScale: 1.0, duration: 0.5 })
    m1?.addEventListener('mouseenter', slow)
    m1?.addEventListener('mouseleave', fast)

    return () => {
      ctx.revert()
      m1?.removeEventListener('mouseenter', slow)
      m1?.removeEventListener('mouseleave', fast)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#000000',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        color: '#ffffff',
      }}
    >
      {/* ── TOP MARQUEE ── */}
      <div
        ref={marquee1Ref}
        style={{ overflow: 'hidden', whiteSpace: 'nowrap', paddingTop: '60px', cursor: 'default' }}
      >
        <div style={{ display: 'flex', width: 'max-content' }}>
          <div ref={track1aRef} style={{ display: 'flex', flexShrink: 0 }}><MarqueeContent /></div>
          <div ref={track1bRef} style={{ display: 'flex', flexShrink: 0 }}><MarqueeContent /></div>
        </div>
      </div>

      {/* ── CENTER: available dot + role + contact buttons ── */}
      <div style={{ padding: '80px 8vw', textAlign: 'center' }}>

        {/* available indicator */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
          <span style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: '#4cff91', display: 'inline-block',
            boxShadow: '0 0 8px #4cff91',
          }} />
          <span style={{ ...ARCHIVO, fontSize: '13px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#ffffff' }}>
            AVAILABLE FOR WORK
          </span>
        </div>

        {/* role */}
        <p style={{
          ...ARCHIVO,
          fontSize: '15px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.5)',
          margin: '0 0 48px',
        }}>
          {C.footer.role[lang]}
        </p>

        {/* contact buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <a
            href="mailto:cksal8449@gmail.com"
            style={{
              ...ANTON,
              fontSize: '18px',
              textTransform: 'uppercase',
              color: '#ffffff',
              textDecoration: 'none',
              padding: '12px 20px',
              border: '1px solid rgba(255,255,255,0.25)',
              transition: 'background 0.2s, color 0.2s',
              letterSpacing: '0.02em',
              display: 'inline-block',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = '#ffffff'
              ;(e.currentTarget as HTMLAnchorElement).style.color = '#000000'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'
              ;(e.currentTarget as HTMLAnchorElement).style.color = '#ffffff'
            }}
          >
            <span ref={emailMagRef} style={{ display: 'block' }}>CKSAL8449@GMAIL.COM</span>
          </a>
          <a
            href="https://github.com/cksal3941"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              ...ANTON,
              fontSize: '18px',
              textTransform: 'uppercase',
              color: '#ffffff',
              textDecoration: 'none',
              padding: '12px 20px',
              border: '1px solid rgba(255,255,255,0.25)',
              transition: 'background 0.2s, color 0.2s',
              letterSpacing: '0.02em',
              display: 'inline-block',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = '#ffffff'
              ;(e.currentTarget as HTMLAnchorElement).style.color = '#000000'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'
              ;(e.currentTarget as HTMLAnchorElement).style.color = '#ffffff'
            }}
          >
            <span ref={githubMagRef} style={{ display: 'block' }}>GITHUB ↗</span>
          </a>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div style={{ padding: '0 8vw 40px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid rgba(255,255,255,0.12)',
          paddingTop: '20px',
        }}>
          <span style={{ ...ARCHIVO, fontSize: '13px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>
            © 2026 RE:BUILD
          </span>
          <button
            type="button"
            onClick={() => lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              ...ANTON,
              fontSize: '13px',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '0.08em',
              padding: 0,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#ffffff' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.4)' }}
          >
            <span ref={topMagRef} style={{ display: 'block' }}>{C.footer.scrollTop[lang]}</span>
          </button>
        </div>
      </div>
    </section>
  )
}
