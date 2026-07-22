import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitReveal from '@/components/core/SplitReveal'
import { useLang } from '@/context/LangContext'
import { C } from '@/data/content'
import img1 from '@/images/lotionmodel.webp'
import img2 from '@/images/model-shot7.webp'
import img3 from '@/images/model-shot3.webp'
import img4 from '@/images/routine-lineup.webp'
import img5 from '@/images/oilhand.webp'
import img6 from '@/images/shampoohand.webp'

gsap.registerPlugin(ScrollTrigger)

const ANTON: React.CSSProperties = {
  fontFamily: "'Anton', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
}

// gallery: two columns inside the right panel
const LEFT_GALLERY = [
  { src: img1, h: '46vh' },
  { src: img3, h: '32vh' },
  { src: img5, h: '30vh' },
]
const RIGHT_GALLERY = [
  { src: img2, h: '38vh' },
  { src: img4, h: '36vh' },
  { src: img6, h: '34vh' },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const { lang }   = useLang()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.about-img-wrap').forEach((el, i) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.0,
            ease: 'power3.inOut',
            delay: (i % 2) * 0.1,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{ background: '#efefed', color: '#000', overflow: 'hidden', borderTop: '1px solid #000' }}
    >
      {/* ── header bar ── */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '3.2vh 8vw', borderBottom: '1px solid #000',
      }}>
        <span style={{ fontSize: '16px', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
          RE:BUILD — ABOUT
        </span>
        <span style={{ fontSize: '16px', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
          CHANMI LEE
        </span>
      </div>

      {/* ── body: left intro / right gallery ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '38fr 62fr',
        gap: '5vw',
        padding: '8vh 8vw',
        alignItems: 'start',
      }}>

        {/* ── left: intro text ── */}
        <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '6px' }}>
          {/* eyebrow */}
          <p style={{
            fontFamily: "'Archivo', sans-serif",
            fontSize: '16px', letterSpacing: '0.16em',
            textTransform: 'uppercase', color: '#000',
            marginBottom: '24px',
          }}>
            {C.about.eyebrow[lang]}
          </p>

          {/* name */}
          <SplitReveal key={lang} as="h2" style={{
            ...ANTON,
            fontSize: 'clamp(42px, 5.5vw, 88px)',
            lineHeight: 0.88,
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            marginBottom: '28px',
            color: '#000',
          }}>
            CHANMI<br />LEE
          </SplitReveal>

          {/* divider */}
          <div style={{ width: '32px', height: '1px', background: '#000', marginBottom: '28px' }} />

          {/* one-liner */}
          <p style={{
            fontFamily: "'Archivo', sans-serif",
            fontSize: '18px',
            lineHeight: 1.6,
            letterSpacing: '0.01em',
            fontWeight: 600,
            color: '#000',
            marginBottom: '24px',
          }}>
            {C.about.oneliner[lang]}
          </p>

          {/* body */}
          {C.about.body[lang].map((line, i) => (
            <p key={i} style={{
              fontFamily: "'Archivo', sans-serif",
              fontSize: '16px',
              lineHeight: 1.85,
              letterSpacing: '0.01em',
              color: '#000',
              marginBottom: i < C.about.body[lang].length - 1 ? '16px' : 0,
            }}>
              {line}
            </p>
          ))}
        </div>

        {/* ── right: image gallery ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', alignItems: 'start' }}>

          {/* left gallery column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {LEFT_GALLERY.map(({ src, h }) => (
              <div key={src} className="about-img-wrap" style={{ overflow: 'hidden', height: h }}>
                <img
                  src={src} alt=""
                  className="transition-transform duration-500 ease-out hover:scale-[1.04]"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            ))}
          </div>

          {/* right gallery column — offset for rhythm */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '32px' }}>
            {RIGHT_GALLERY.map(({ src, h }) => (
              <div key={src} className="about-img-wrap" style={{ overflow: 'hidden', height: h }}>
                <img
                  src={src} alt=""
                  className="transition-transform duration-500 ease-out hover:scale-[1.04]"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── caption ── */}
      <p style={{
        fontFamily: "'Archivo', sans-serif",
        fontSize: '14px', letterSpacing: '0.12em',
        textTransform: 'uppercase', color: '#000',
        padding: '0 8vw 6vh',
      }}>
        {C.about.caption[lang]}
      </p>
    </section>
  )
}
