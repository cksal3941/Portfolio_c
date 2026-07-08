import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import item1 from '@/images/item.png'
import item2 from '@/images/item2.png'
import item3 from '@/images/item3.png'
import item4 from '@/images/item4.png'

const ANTON: React.CSSProperties = {
  fontFamily: "'Anton', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
}

/* ── Marquee track content (text + images interleaved) ── */
function MarqueeContent({ outlined = false }: { outlined?: boolean }) {
  const chunks = [
    { type: 'text', value: "LET'S BUILD" },
    { type: 'img',  value: item1 },
    { type: 'text', value: 'TOGETHER' },
    { type: 'img',  value: item2 },
    { type: 'text', value: '—' },
    { type: 'img',  value: item3 },
    { type: 'text', value: 'RE:BLIDE' },
    { type: 'img',  value: item4 },
    { type: 'text', value: '—' },
    { type: 'img',  value: item1 },
  ]

  const imgSize  = outlined ? '48px'  : '80px'
  const imgStyle: React.CSSProperties = {
    width:        imgSize,
    height:       imgSize,
    objectFit:    'cover',
    display:      'inline-block',
    verticalAlign: 'middle',
    flexShrink:   0,
    filter:       outlined ? 'invert(1) grayscale(1) contrast(1.4)' : 'grayscale(1) contrast(1.1)',
    opacity:      outlined ? 0.55 : 0.9,
    borderRadius: '2px',
  }

  const textStyle: React.CSSProperties = {
    ...ANTON,
    fontSize:      outlined ? 'clamp(36px, 5.5vw, 96px)' : 'clamp(80px, 12vw, 200px)',
    lineHeight:    1,
    textTransform: 'uppercase',
    letterSpacing: '-0.02em',
    color:         outlined ? 'transparent' : '#ffffff',
    WebkitTextStroke: outlined ? '1px rgba(255,255,255,0.6)' : undefined,
    whiteSpace:    'nowrap',
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: outlined ? '28px' : '40px', paddingRight: outlined ? '28px' : '40px' }}>
      {chunks.map((c, i) =>
        c.type === 'img'
          ? <img key={i} src={c.value} alt="" style={imgStyle} />
          : <span key={i} style={textStyle}>{c.value}</span>
      )}
    </div>
  )
}

export default function FooterSection() {
  const sectionRef    = useRef<HTMLElement>(null)
  const track1aRef    = useRef<HTMLDivElement>(null)
  const track1bRef    = useRef<HTMLDivElement>(null)
  const track2aRef    = useRef<HTMLDivElement>(null)
  const track2bRef    = useRef<HTMLDivElement>(null)
  const marquee1Ref   = useRef<HTMLDivElement>(null)
  const marquee2Ref   = useRef<HTMLDivElement>(null)
  const tl1Ref        = useRef<gsap.core.Tween | null>(null)
  const tl2Ref        = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      /* ── top marquee: left → (wraps seamlessly) ── */
      tl1Ref.current = gsap.to([track1aRef.current, track1bRef.current], {
        xPercent: -100,
        duration:  20,
        ease:      'none',
        repeat:    -1,
        modifiers: {
          xPercent: gsap.utils.wrap(-100, 0),
        },
      })

      /* ── bottom marquee: right → (opposite direction) ── */
      gsap.set([track2aRef.current, track2bRef.current], { xPercent: -100 })

      tl2Ref.current = gsap.to([track2aRef.current, track2bRef.current], {
        xPercent: 0,
        duration:  24,
        ease:      'none',
        repeat:    -1,
        modifiers: {
          xPercent: gsap.utils.wrap(-100, 0),
        },
      })
    }, sectionRef)

    /* hover slow-down */
    const m1 = marquee1Ref.current
    const m2 = marquee2Ref.current
    const slow  = () => { gsap.to(tl1Ref.current, { timeScale: 0.3, duration: 0.5 }) }
    const fast  = () => { gsap.to(tl1Ref.current, { timeScale: 1.0, duration: 0.5 }) }
    const slow2 = () => { gsap.to(tl2Ref.current, { timeScale: 0.3, duration: 0.5 }) }
    const fast2 = () => { gsap.to(tl2Ref.current, { timeScale: 1.0, duration: 0.5 }) }

    m1?.addEventListener('mouseenter', slow)
    m1?.addEventListener('mouseleave', fast)
    m2?.addEventListener('mouseenter', slow2)
    m2?.addEventListener('mouseleave', fast2)

    return () => {
      ctx.revert()
      m1?.removeEventListener('mouseenter', slow)
      m1?.removeEventListener('mouseleave', fast)
      m2?.removeEventListener('mouseenter', slow2)
      m2?.removeEventListener('mouseleave', fast2)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background:     '#000000',
        minHeight:      '100vh',
        display:        'flex',
        flexDirection:  'column',
        justifyContent: 'space-between',
        overflow:       'hidden',
        color:          '#ffffff',
        paddingBottom:  '40px',
      }}
    >
      {/* ── TOP MARQUEE ── */}
      <div
        ref={marquee1Ref}
        style={{ overflow: 'hidden', whiteSpace: 'nowrap', paddingTop: '60px', cursor: 'default' }}
      >
        <div style={{ display: 'flex', width: 'max-content' }}>
          <div ref={track1aRef} style={{ display: 'flex', flexShrink: 0 }}>
            <MarqueeContent />
          </div>
          <div ref={track1bRef} style={{ display: 'flex', flexShrink: 0 }}>
            <MarqueeContent />
          </div>
        </div>
      </div>

      {/* ── MIDDLE: personal statement placeholder ── */}
      <div style={{ padding: '0 8vw', textAlign: 'center', margin: '48px 0' }}>
        {/* TODO: replace with your own copy */}
        <p style={{
          fontFamily:    "'Archivo', sans-serif",
          fontSize:      '16px',
          lineHeight:    1.7,
          color:         'rgba(255,255,255,0.5)',
          maxWidth:      '480px',
          margin:        '0 auto',
          letterSpacing: '0.01em',
        }}>
          From food research to front-end — always rebuilding.
        </p>
      </div>

      {/* ── BOTTOM MARQUEE (reverse, outlined) ── */}
      <div
        ref={marquee2Ref}
        style={{ overflow: 'hidden', whiteSpace: 'nowrap', marginBottom: '48px', cursor: 'default' }}
      >
        <div style={{ display: 'flex', width: 'max-content' }}>
          <div ref={track2aRef} style={{ display: 'flex', flexShrink: 0 }}>
            <MarqueeContent outlined />
          </div>
          <div ref={track2bRef} style={{ display: 'flex', flexShrink: 0 }}>
            <MarqueeContent outlined />
          </div>
        </div>
      </div>

      {/* ── CONTACT ROW ── */}
      <div style={{ padding: '0 8vw' }}>
        <div style={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'center',
          borderTop:      '1px solid rgba(255,255,255,0.2)',
          paddingTop:     '28px',
          paddingBottom:  '20px',
          gap:            '16px',
          flexWrap:       'wrap',
        }}>
          <a
            href="mailto:cksal8449@gmail.com"
            style={{
              ...ANTON,
              fontSize:       '20px',
              textTransform:  'uppercase',
              color:          '#ffffff',
              textDecoration: 'none',
              padding:        '10px 16px',
              border:         '1px solid rgba(255,255,255,0.25)',
              transition:     'background 0.2s, color 0.2s',
              letterSpacing:  '0.02em',
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
            CKSAL8449@GMAIL.COM
          </a>

          <a
            href="https://github.com/cksal3941"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              ...ANTON,
              fontSize:       '20px',
              textTransform:  'uppercase',
              color:          '#ffffff',
              textDecoration: 'none',
              padding:        '10px 16px',
              border:         '1px solid rgba(255,255,255,0.25)',
              transition:     'background 0.2s, color 0.2s',
              letterSpacing:  '0.02em',
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
            GITHUB ↗
          </a>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div style={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'center',
          paddingTop:     '16px',
          borderTop:      '1px solid rgba(255,255,255,0.08)',
        }}>
          <span style={{
            fontFamily:    "'Archivo', sans-serif",
            fontSize:      '13px',
            color:         'rgba(255,255,255,0.35)',
            letterSpacing: '0.08em',
          }}>
            © 2026 RE:BLIDE
          </span>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              ...ANTON,
              fontSize:       '13px',
              textTransform:  'uppercase',
              color:          'rgba(255,255,255,0.4)',
              background:     'none',
              border:         'none',
              cursor:         'pointer',
              letterSpacing:  '0.08em',
              padding:        0,
              transition:     'color 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#ffffff' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.4)' }}
          >
            SCROLL TO TOP ↑
          </button>
        </div>
      </div>
    </section>
  )
}
