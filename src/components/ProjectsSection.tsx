import { useRef, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '@/context/LangContext'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { WORK_PANELS, getLinkIcon, getLinkAriaLabel, type Panel } from '@/data/projects'
import ProjectModal from '@/components/ProjectModal'

gsap.registerPlugin(ScrollTrigger)

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef   = useRef<(HTMLDivElement | null)[]>([])
  const [activePanel, setActivePanel] = useState<Panel | null>(null)
  const { lang } = useLang()
  const { isMobile, isTablet } = useBreakpoint()

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card) => {
        if (!card) return
        gsap.fromTo(
          card,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              once: true,
            },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const cols = isMobile ? 1 : isTablet ? 2 : 3

  return (
    <section
      id="section-projects"
      ref={sectionRef}
      style={{
        background: '#f0f0ee',
        padding: isMobile ? '80px 6vw 100px' : '120px 8vw 140px',
      }}
    >
      {/* ── Header ── */}
      <div style={{ marginBottom: isMobile ? '48px' : '72px' }}>
        <p style={{
          fontFamily: "'Archivo', sans-serif",
          fontSize: '13px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#000',
          margin: '0 0 14px',
        }}>
          {lang === 'ko' ? '선택된 작업물' : 'Selected Work'}
        </p>
        <h2 style={{
          fontFamily: "'Anton', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
          fontSize: 'clamp(48px, 7vw, 96px)',
          lineHeight: 0.92,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          color: '#000',
          margin: '0 0 24px',
          transform: 'scaleX(0.85)',
          transformOrigin: 'left top',
        }}>
          PROJECTS
        </h2>
        <p style={{
          fontFamily: "'Archivo', sans-serif",
          fontSize: isMobile ? '14px' : '16px',
          lineHeight: 1.6,
          color: '#444',
          margin: 0,
          maxWidth: '480px',
        }}>
          {lang === 'ko'
            ? '웹 퍼블리싱과 UI 디자인을 기반으로 기획하고 구현한 프로젝트 모음입니다.'
            : 'Selected works across web publishing, UI design, and front-end development.'}
        </p>
      </div>

      {/* ── Grid ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: isMobile ? '48px' : '40px 32px',
      }}>
        {WORK_PANELS.map((panel, i) => (
          <div
            key={panel.title}
            ref={el => { cardsRef.current[i] = el }}
            onClick={() => panel.detail && setActivePanel(panel)}
            style={{ cursor: panel.detail ? 'pointer' : 'default' }}
            className="group"
          >
            {/* Image */}
            <div style={{
              position: 'relative',
              aspectRatio: '3 / 4',
              overflow: 'hidden',
              background: '#e2e2e0',
              marginBottom: '20px',
            }}>
              {panel.image && (
                <img
                  src={panel.image}
                  alt={panel.title}
                  style={{
                    position: 'absolute',
                    inset: panel.imgClass ? '2%' : '8%',
                    width: panel.imgClass ? '96%' : '84%',
                    height: panel.imgClass ? '96%' : '84%',
                    objectFit: 'contain',
                    transition: 'transform 0.5s ease',
                  }}
                  className="group-hover:scale-105"
                />
              )}
              {/* hover overlay */}
              <div
                className="group-hover:opacity-100"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0,0,0,0.35)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{
                  fontFamily: "'Anton', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
                  fontSize: '14px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#fff',
                  border: '1px solid #fff',
                  padding: '10px 22px',
                }}>
                  {lang === 'ko' ? '자세히 보기' : 'VIEW PROJECT'}
                </span>
              </div>
            </div>

            {/* Meta */}
            {panel.meta && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <span style={{
                    fontFamily: "'Archivo', sans-serif",
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    color: '#000',
                    flexShrink: 0,
                  }}>
                    {panel.meta.num}
                  </span>
                  <div style={{ flex: 1, height: '1px', background: '#000' }} />
                </div>

                <p style={{
                  fontFamily: "'Anton', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
                  fontSize: 'clamp(18px, 2vw, 26px)',
                  lineHeight: 1.1,
                  letterSpacing: '0.01em',
                  textTransform: 'uppercase',
                  color: '#000',
                  margin: '0 0 8px',
                }}>
                  {panel.meta.displayTitle[lang]}
                </p>

                <p style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontSize: '13px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#000',
                  margin: '0 0 4px',
                  lineHeight: 1.4,
                }}>
                  {panel.meta.type[lang]}
                </p>

                <p style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontSize: '12px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#666',
                  margin: '0 0 16px',
                  lineHeight: 1.4,
                }}>
                  {panel.meta.tags[lang]}
                </p>

                {panel.detail && (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {panel.detail.links.map(link => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={getLinkAriaLabel(link.label, lang)}
                        onClick={e => e.stopPropagation()}
                        className="flex items-center justify-center border border-black bg-transparent text-black hover:bg-black hover:text-white transition-colors"
                        style={{ width: '36px', height: '36px' }}
                      >
                        {getLinkIcon(link.label)}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {activePanel && createPortal(
        <ProjectModal
          panel={activePanel}
          onClose={() => setActivePanel(null)}
          lang={lang}
          isMobile={isMobile}
        />,
        document.body
      )}
    </section>
  )
}
