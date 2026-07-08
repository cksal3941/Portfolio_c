import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Layout, Layers, Sparkles, Wand2, Globe, Monitor } from 'lucide-react'
import aboutImage from '@/images/IMG_3572.png'
import cursorImg1 from '@/images/item.png'
import cursorImg2 from '@/images/item2.png'
import cursorImg3 from '@/images/item3.png'

gsap.registerPlugin(ScrollTrigger)

/* ── brand SVG logos ──────────────────────────────────────── */
function HTMLIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.533 2.573H15.2l-.396 4.195-3.126.854-3.167-.858-.22-2.487H5.49l.32 4.374L12 19.066l5.034-1.366.623-6.578H9.822l-.105-1.239h7.871z" />
    </svg>
  )
}
function CSSIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.533 2.573H15.2l-.633 6.74-3.124.846-3.167-.858-.22-2.487H5.49l.32 4.374L12 19.066l5.034-1.366.847-9.908H7.785l-.218-2.32h9.764z" />
    </svg>
  )
}
function JSIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden>
      <rect width="24" height="24" fill="currentColor" />
      <text x="12" y="17.5" textAnchor="middle" fill="white" fontSize="10" fontWeight="800" fontFamily="Arial, sans-serif">JS</text>
    </svg>
  )
}
function TSIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden>
      <rect width="24" height="24" fill="currentColor" />
      <text x="12" y="17.5" textAnchor="middle" fill="white" fontSize="10" fontWeight="800" fontFamily="Arial, sans-serif">TS</text>
    </svg>
  )
}
function ReactIcon() {
  return (
    <svg width="26" height="26" viewBox="-1 -1 26 26" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
      <ellipse cx="12" cy="12" rx="11" ry="4" />
      <ellipse cx="12" cy="12" rx="11" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="11" ry="4" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
    </svg>
  )
}
function FigmaIcon() {
  return (
    <svg width="22" height="26" viewBox="0 0 24 36" fill="currentColor" aria-hidden>
      <path d="M6 36c3.31 0 6-2.69 6-6v-6H6c-3.31 0-6 2.69-6 6s2.69 6 6 6z" />
      <path d="M0 18c0-3.31 2.69-6 6-6h6v12H6c-3.31 0-6-2.69-6-6z" />
      <path d="M0 6C0 2.69 2.69 0 6 0h6v12H6C2.69 12 0 9.31 0 6z" />
      <path d="M12 0h6c3.31 0 6 2.69 6 6s-2.69 6-6 6h-6V0z" />
      <path d="M24 18c0 3.31-2.69 6-6 6s-6-2.69-6-6 2.69-6 6-6 6 2.69 6 6z" />
    </svg>
  )
}
function PsIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden>
      <rect width="24" height="24" fill="currentColor" />
      <text x="12" y="17.5" textAnchor="middle" fill="white" fontSize="10" fontWeight="800" fontFamily="Arial, sans-serif">Ps</text>
    </svg>
  )
}
function GitIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.546 10.93L13.067.452a1.55 1.55 0 0 0-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 0 1 2.327 2.341l2.658 2.66a1.838 1.838 0 0 1 1.9 2.977c-.72.72-1.882.72-2.601 0a1.844 1.844 0 0 1-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348a1.84 1.84 0 0 1 0 2.6c-.72.72-1.889.72-2.609 0-.72-.72-.72-1.88 0-2.598a1.83 1.83 0 0 1 .605-.406V8.835a1.834 1.834 0 0 1-.996-2.41L7.636 3.7.45 10.882c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.602.605-1.58 0-2.187" />
    </svg>
  )
}

/* ── types ────────────────────────────────────────────────── */
type SkillIcon  = { icon: React.ReactNode; label: string }
type Principle  = { num: string; key: string; desc: string }
type Entry      = { name: string; sub?: string; period?: string }
type StatBlock  = { number: string; unit: string }

const FRONTEND_ICONS: SkillIcon[] = [
  { icon: <HTMLIcon />,                                label: 'HTML5' },
  { icon: <CSSIcon />,                                 label: 'CSS3' },
  { icon: <JSIcon />,                                  label: 'JavaScript' },
  { icon: <TSIcon />,                                  label: 'TypeScript' },
  { icon: <ReactIcon />,                               label: 'React' },
  { icon: <GitIcon />,                                 label: 'Git' },
  { icon: <Monitor size={26} strokeWidth={1.3} />,     label: 'Responsive' },
  { icon: <Globe   size={26} strokeWidth={1.3} />,     label: 'Publishing' },
]
const DESIGN_ICONS: SkillIcon[] = [
  { icon: <FigmaIcon />,                               label: 'Figma' },
  { icon: <PsIcon />,                                  label: 'Photoshop' },
  { icon: <Layout   size={26} strokeWidth={1.3} />,    label: 'Wireframe' },
  { icon: <Layers   size={26} strokeWidth={1.3} />,    label: 'UX Flow' },
  { icon: <Layout   size={26} strokeWidth={1.3} />,    label: 'Design System' },
  { icon: <Sparkles size={26} strokeWidth={1.3} />,    label: 'AI Image' },
  { icon: <Wand2    size={26} strokeWidth={1.3} />,    label: 'AI Production' },
]

/* ── panel data ───────────────────────────────────────────── */
const PANELS: {
  label: string
  title: string[]
  lines: string[]
  img: string | null
  imgAlt: string
  icons: SkillIcon[] | null
  principles: Principle[] | null
  stat: StatBlock | null
  entries: Entry[] | null
}[] = [
  {
    label: 'ABOUT', title: ['FROM FOOD RESEARCH', 'TO WEB EXPERIENCE'],
    lines: [
      'I started in food, nutrition, and research-based work.',
      'Now I am translating that experience into web publishing,',
      'front-end development, and digital interface design.',
    ],
    img: aboutImage,
    imgAlt: 'minimal workspace',
    icons: null, principles: null, stat: null, entries: null,
  },
  {
    label: 'WORK STYLE', title: ['I BUILD AFTER', 'UNDERSTANDING STRUCTURE'],
    lines: [], img: null, imgAlt: '', icons: null, stat: null, entries: null,
    principles: [
      { num: '01', key: 'STRUCTURE',   desc: 'Information order and user flow before any screen' },
      { num: '02', key: 'CONNECTION',  desc: 'Every element linked and purposeful in the whole' },
      { num: '03', key: 'DETAIL',      desc: 'Refine until the result speaks for itself' },
    ],
  },
  {
    label: 'FRONT-END', title: ['FRONT-END', 'AND PUBLISHING'],
    lines: [], img: null, imgAlt: '', principles: null, stat: null, entries: null,
    icons: FRONTEND_ICONS,
  },
  {
    label: 'DESIGN & AI', title: ['DESIGN TO CODE', 'WITH AI'],
    lines: [], img: null, imgAlt: '', principles: null, stat: null, entries: null,
    icons: DESIGN_ICONS,
  },
  {
    label: 'EXPERIENCE', title: ['RESEARCH-BASED', 'EXPERIENCE'],
    lines: [], img: null, imgAlt: '', icons: null, principles: null,
    stat: { number: '4', unit: 'ROLES' },
    entries: [
      { name: 'KT&G',                              sub: 'Food & Bio Research',      period: '2024 — 2026' },
      { name: 'Geumsan Ginseng Institute',          sub: 'Food Quality Research',    period: '2022 — 2023' },
      { name: 'Chungcheongbuk-do Agri. Services',  sub: 'Food Development Research', period: '2020 — 2021' },
      { name: 'MS Food',                            sub: 'Nutrition Management',      period: '2017 — 2018' },
    ],
  },
  {
    label: 'EDUCATION', title: ['EDUCATION', 'AND CERTIFICATES'],
    lines: [], img: null, imgAlt: '', icons: null, principles: null,
    stat: { number: '6', unit: 'CREDENTIALS' },
    entries: [
      { name: 'Food Science & Biotechnology',  sub: 'B.S. Degree' },
      { name: 'Food and Nutrition',            sub: 'B.S. Degree' },
      { name: 'Nutritionist',                  sub: 'National License' },
      { name: 'GTQ',                           sub: 'Certificate' },
      { name: 'GTQid',                         sub: 'Certificate' },
      { name: 'ITQ',                           sub: 'Certificate' },
    ],
  },
]

const CURSOR_IMAGES = [cursorImg1, cursorImg2, cursorImg3]

/* ── sub-components ───────────────────────────────────────── */
const ANTON: React.CSSProperties = {
  fontFamily: "'Anton', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
}

function Line({ children, style, className }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) {
  return (
    <div
      className={className}
      style={{ display: 'block', width: '100%', wordBreak: 'break-word', overflowWrap: 'break-word', ...style }}
    >
      {children}
    </div>
  )
}

function IconGrid({ items }: { items: SkillIcon[] }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      {items.map(({ icon, label }) => (
        <div key={label} style={{
          width: '90px', height: '90px', border: '1px solid #000',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', gap: '10px', boxSizing: 'border-box',
        }}>
          {icon}
          <span style={{ fontSize: '9px', letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'center', lineHeight: 1.2 }}>
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}

/* D — numbered principles */
function PrinciplesGrid({ items }: { items: Principle[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {items.map(({ num, key, desc }, i) => (
        <div key={num} style={{
          padding: '22px 0',
          borderTop: '1px solid #000',
          borderBottom: i === items.length - 1 ? '1px solid #000' : 'none',
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '10px' }}>
            <span style={{ fontSize: '14px', letterSpacing: '0.16em', color: '#000' }}>{num}</span>
            <span style={{ ...ANTON, fontSize: 'clamp(22px, 2.4vw, 36px)', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
              {key}
            </span>
          </div>
          <p style={{ fontSize: '15px', lineHeight: 1.75, margin: 0, paddingLeft: '34px', color: '#000' }}>
            {desc}
          </p>
        </div>
      ))}
    </div>
  )
}

/* B — large stat number + entry list */
function StatList({ stat, entries }: { stat: StatBlock; entries: Entry[] }) {
  return (
    <div style={{ display: 'flex', gap: '5vw', alignItems: 'flex-start', width: '100%' }}>
      {/* big number */}
      <div style={{ flexShrink: 0 }}>
        <p style={{ ...ANTON, fontSize: 'clamp(72px, 7vw, 110px)', lineHeight: 1, letterSpacing: '-0.04em', margin: '0 0 4px' }}>
          {stat.number}
        </p>
        <p style={{ fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0, color: '#000' }}>
          {stat.unit}
        </p>
      </div>

      {/* entry list */}
      <div style={{ flex: 1, borderTop: '1px solid #000' }}>
        {entries.map(({ name, sub, period }) => (
          <div key={name} style={{
            borderBottom: '1px solid #000',
            padding: '14px 0',
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px',
          }}>
            <div>
              <p style={{ ...ANTON, fontSize: 'clamp(14px, 1.5vw, 20px)', textTransform: 'uppercase', letterSpacing: '-0.01em', margin: '0 0 4px' }}>
                {name}
              </p>
              {sub && <p style={{ fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0, color: '#000' }}>{sub}</p>}
            </div>
            {period && <p style={{ fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0, color: '#000', flexShrink: 0 }}>{period}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── main component ───────────────────────────────────────── */
export default function HorizontalSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const tiltRef      = useRef<HTMLDivElement>(null)
  const trackRef     = useRef<HTMLDivElement>(null)
  const cursorRef    = useRef<HTMLDivElement>(null)
  const cursorImgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768
    const activeIdx = { current: -1 }

    const ctx = gsap.context(() => {
      const panelCount    = PANELS.length
      // Each panel gets a "hold" segment where scrolling does not move the track,
      // giving the user time to read. Then a "slide" segment transitions to the next.
      const holdDuration  = 0.8   // timeline units (= proportion of total scroll)
      const slideDuration = 1.0
      const totalDuration = panelCount * holdDuration + (panelCount - 1) * slideDuration

      const panels = gsap.utils.toArray<HTMLElement>('.horizontal-panel')

      // Clear any stale GSAP transform from previous renders / HMR
      gsap.set(trackRef.current, { clearProps: 'transform' })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger:             containerRef.current,
          start:               'top top',
          end:                 () => `+=${totalDuration * window.innerHeight}`,
          pin:                 true,
          scrub:               1.2,
          anticipatePin:       1,
          invalidateOnRefresh: true,
          onUpdate: isTouchDevice ? undefined : (self) => {
            const idx = Math.round(self.progress * (panelCount - 1))
            if (idx === activeIdx.current) return
            activeIdx.current = idx
            const img = cursorImgRef.current
            if (!img) return
            gsap.to(img, {
              opacity: 0, scale: 0.85, duration: 0.12, ease: 'power2.in',
              onComplete: () => {
                img.src = CURSOR_IMAGES[idx % CURSOR_IMAGES.length]
                gsap.to(img, { opacity: 1, scale: 1, duration: 0.18, ease: 'power2.out' })
              },
            })
          },
        },
      })

      // Helper — track position for panel i in vw-string form.
      // x uses vw so GSAP translates by exactly one viewport per step,
      // independent of the track's own total width (which would break xPercent).
      const panelX = (i: number) => (i === 0 ? '0vw' : `-${i * 100}vw`)

      // ── hold panel 0 ────────────────────────────────────────
      tl.to(trackRef.current, { x: panelX(0), duration: holdDuration, ease: 'none' })

      // ── for each remaining panel: slide in → hold ───────────
      for (let i = 0; i < panelCount - 1; i++) {
        tl.to(trackRef.current, {
          x:        panelX(i + 1),
          duration: slideDuration,
          ease:     'power2.inOut',
        })
        tl.to(trackRef.current, {
          x:        panelX(i + 1),
          duration: holdDuration,
          ease:     'none',
        })
      }

      // ── text reveals: staggered y+opacity when each panel's hold begins ──
      // t0 = the timeline position where panel i becomes the active panel.
      // Labels → titles → body arrive in quick succession; visual block
      // fades in alongside titles for an editorial, layered feel.
      panels.forEach((panelEl, i) => {
        const t0 = i * (holdDuration + slideDuration)

        const label  = panelEl.querySelector<HTMLElement>('.p-label')
        const titles = panelEl.querySelectorAll<HTMLElement>('.p-title')
        const bodies = panelEl.querySelectorAll<HTMLElement>('.p-body')
        const visual = panelEl.querySelector<HTMLElement>('.p-visual')

        if (label)
          tl.from(label,  { y: 20, opacity: 0, duration: 0.28, ease: 'power2.out' }, t0)
        if (titles.length)
          tl.from(titles, { y: 40, opacity: 0, duration: 0.32, ease: 'power2.out', stagger: 0.05 }, t0 + 0.04)
        if (bodies.length)
          tl.from(bodies, { y: 25, opacity: 0, duration: 0.28, ease: 'power2.out', stagger: 0.04 }, t0 + 0.10)
        if (visual)
          tl.from(visual, { y: 20, opacity: 0, duration: 0.36, ease: 'power2.out' }, t0 + 0.06)
      })
    }, containerRef)

    if (isTouchDevice || !cursorRef.current) return () => ctx.revert()

    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0.85 })
    const xTo   = gsap.quickTo(cursorRef.current, 'x',       { duration: 0.12, ease: 'power2.out' })
    const yTo   = gsap.quickTo(cursorRef.current, 'y',       { duration: 0.12, ease: 'power2.out' })
    const tiltX = gsap.quickTo(tiltRef.current,   'rotateX', { duration: 0.7,  ease: 'power3.out' })
    const tiltY = gsap.quickTo(tiltRef.current,   'rotateY', { duration: 0.7,  ease: 'power3.out' })

    const el = containerRef.current!
    const onMouseMove  = (e: MouseEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
      const cx = window.innerWidth  / 2
      const cy = window.innerHeight / 2
      tiltY( (e.clientX - cx) / cx * 6)
      tiltX(-(e.clientY - cy) / cy * 4)
    }
    const onMouseEnter = () => {
      el.style.cursor = 'none'
      gsap.to(cursorRef.current, { opacity: 1, scale: 1, duration: 0.2, ease: 'power2.out' })
    }
    const onMouseLeave = () => {
      el.style.cursor = ''
      gsap.to(cursorRef.current, { opacity: 0, scale: 0.85, duration: 0.2, ease: 'power2.in' })
      gsap.to(tiltRef.current,   { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'power3.out' })
    }

    el.addEventListener('mousemove', onMouseMove)
    el.addEventListener('mouseenter', onMouseEnter)
    el.addEventListener('mouseleave', onMouseLeave)

    return () => {
      ctx.revert()
      el.style.cursor = ''
      el.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('mouseenter', onMouseEnter)
      el.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <>
    <div
      ref={cursorRef}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '160px', height: '160px',
        pointerEvents: 'none', zIndex: 9999,
      }}
    >
      <img
        ref={cursorImgRef}
        src={cursorImg1}
        alt=""
        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
      />
    </div>

    {/*
     * Container: width/height match the viewport exactly.
     * overflow:hidden clips any part of the track that is outside panel 0.
     * max-width:100% prevents horizontal body overflow (scrollbar pages).
     */}
    <div ref={containerRef} style={{
      width: '100vw', maxWidth: '100%', height: '100vh',
      overflow: 'hidden', position: 'relative',
      perspective: '1200px',
    }}>
      {/* tiltRef: receives rotateX/Y from mouse — sits between container and track */}
      <div ref={tiltRef} style={{ width: '100%', height: '100%' }}>
      {/*
       * Track: a flat flex row of panels, no gap, no margin, anchored at left:0.
       * GSAP only modifies `x` (translate), never layout properties.
       */}
      <div
        ref={trackRef}
        className="horizontal-track"
        style={{
          display:    'flex',
          flexWrap:   'nowrap',
          width:      `${PANELS.length * 100}vw`,
          height:     '100%',
          willChange: 'transform',
          /* no position/left override — GSAP transform handles movement */
        }}
      >
        {PANELS.map((panel, i) => {
          const isWide = !!(panel.icons || panel.stat)

          return (
            <div
              key={panel.label}
              className="horizontal-panel"
              style={{
                /* each panel is exactly one viewport wide */
                flex:          '0 0 100vw',
                width:         '100vw',
                height:        '100vh',
                background:    '#efefed',
                boxShadow:     i < PANELS.length - 1 ? 'inset -1px 0 0 0 #000' : 'none',
                display:       'flex',
                flexDirection: 'column',
                boxSizing:     'border-box',
                overflow:      'hidden',
                /* NO padding here — applied per-row so borders run edge-to-edge */
              }}
            >
              {/* header — border runs full panel width; text inset by 8vw */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '3.2vh 8vw', borderBottom: '1px solid #000',
                flexShrink: 0,
              }}>
                <span style={{ fontSize: '16px', letterSpacing: '0.18em', textTransform: 'uppercase' }}>RE:BLIDE — ABOUT</span>
                <span style={{ fontSize: '16px', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                  {String(i + 1).padStart(2, '0')} / {String(PANELS.length).padStart(2, '0')}
                </span>
              </div>

              {/* body — 8vw safe area on both sides; content cannot reach edges */}
              <div style={{ display: 'flex', flex: 1, gap: '5vw', alignItems: 'center', padding: '5vh 8vw', minHeight: 0 }}>

                {/* left — always: label + title */}
                <div style={{ flex: isWide ? '0 0 34%' : '0 0 50%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Line className="p-label" style={{ fontSize: '18px', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '24px' }}>
                    {panel.label}
                  </Line>
                  {panel.title.map((t, j) => (
                    <Line key={j} className="p-title" style={{
                      ...ANTON,
                      fontSize: 'clamp(36px, 4.2vw, 72px)',
                      lineHeight: 1.08, letterSpacing: '-0.025em', textTransform: 'uppercase',
                      marginBottom: j < panel.title.length - 1 ? '4px' : '26px',
                    }}>{t}</Line>
                  ))}

                  {/* text-only panels: body lines in left col */}
                  {panel.lines.map((line, j) => (
                    <Line key={j} className="p-body" style={{ fontSize: '20px', lineHeight: 1.8, letterSpacing: '0.01em' }}>{line}</Line>
                  ))}
                </div>

                {/* right — varies by panel type; entire block fades in together */}
                <div className="p-visual" style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                  {panel.icons && <IconGrid items={panel.icons} />}

                  {panel.principles && <PrinciplesGrid items={panel.principles} />}

                  {panel.stat && panel.entries && (
                    <StatList stat={panel.stat} entries={panel.entries} />
                  )}

                  {!panel.icons && !panel.principles && !panel.stat && panel.img && (
                    <img src={panel.img} alt={panel.imgAlt}
                      style={{ width: '55%', height: '58vh', objectFit: 'cover', objectPosition: 'top', display: 'block', marginLeft: 'auto' }}
                    />
                  )}
                </div>

              </div>

              {/* footer — border runs full panel width; text inset by 8vw */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '3vh 8vw', borderTop: '1px solid #000',
                flexShrink: 0,
              }}>
                <span style={{ fontSize: '16px', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                  {i < PANELS.length - 1 ? 'Continue →' : 'End'}
                </span>
                <div style={{ width: '6px', height: '6px', background: '#000' }} />
              </div>
            </div>
          )
        })}
      </div>
      </div>{/* end tiltRef */}
    </div>
    </>
  )
}
