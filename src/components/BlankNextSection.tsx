import { useState, type CSSProperties } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { createPortal } from 'react-dom'
import { useLang } from '@/context/LangContext'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { WORK_PANELS, type Panel } from '@/data/projects'
import ProjectModal from '@/components/ProjectModal'

type BlankNextSectionProps = {
  className?: string
  onModalClose?: () => void
  isSpread?: boolean
}

const ANTON: CSSProperties   = { fontFamily: "'Anton', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif" }
const ARCHIVO: CSSProperties = { fontFamily: "'Archivo', sans-serif" }


export default function BlankNextSection({ className = '', onModalClose, isSpread = false }: BlankNextSectionProps) {
  const [activePanel, setActivePanel] = useState<Panel | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const { lang } = useLang()
  const { isMobile, isTablet } = useBreakpoint()

  const handleClose = () => {
    setActivePanel(null)
    onModalClose?.()
  }

  return (
    <section
      aria-label="Next section"
      className={`relative h-screen overflow-hidden bg-[#f3f3f1] ${className}`}
      style={{ borderBottom: 'none', boxShadow: 'none', ...(isMobile && { background: '#f0f0ee' }) }}
    >
<div className="next-section-title absolute left-[8.5vw] top-[14vh]" style={{ display: isMobile ? 'none' : undefined }}>
        <h2 className="font-black uppercase leading-none text-black" style={{ margin: 0, fontSize: 'clamp(28px, 3vw, 48px)' }}>
          PROJECTS
        </h2>
        <p style={{
          fontFamily: "'Archivo', sans-serif",
          fontSize: 'clamp(16px, 1.3vw, 20px)',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: '#000',
          margin: '10px 0 0',
          lineHeight: 1.4,
          maxWidth: '560px',
          fontWeight: 500,
        }}>
          {lang === 'ko'
            ? <>웹 퍼블리싱과 UI 디자인을 기반으로<br />기획하고 구현한 프로젝트 모음입니다.</>
            : <>SELECTED WORKS ACROSS WEB PUBLISHING,<br />UI DESIGN, AND INTERACTION</>
          }
        </p>
      </div>

      <div
        className="archive-panels absolute inset-0"
        style={{ perspective: '2400px', perspectiveOrigin: '50% 55%', display: isMobile ? 'none' : undefined }}
      >
        {/* card-stage: 카드가 움직일 수 있는 유일한 영역 — safe-left / safe-right 안쪽 */}
        <div
          className="card-stage absolute inset-y-0"
          style={{
            left:  'clamp(100px, 14vw, 280px)',
            right: 'clamp(100px, 14vw, 280px)',
          }}
        >
        {WORK_PANELS.map((panel, i) => (
          <div
            key={panel.title}
            className="archive-panel group absolute left-0 top-1/2 w-[clamp(140px,17vw,280px)] hover:z-[100]"
            onClick={() => panel.detail && setActivePanel(panel)}
            style={{ cursor: panel.detail ? 'pointer' : 'default' }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* inner wrapper — slides right on hover, text moves with it */}
            <div style={{
              position: 'relative',
              transform: hoveredIndex === i ? `translateX(${isTablet ? 80 : 150}px)` : 'translateX(0px)',
              transition: 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}>

            {/* project info — left of card, revealed as card slides right */}
            {panel.meta && (
              <div style={{
                position: 'absolute',
                left: 'calc(100% + 20px)',
                top: '50%',
                transform: 'translateY(-50%)',
                textAlign: 'left',
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
                opacity: hoveredIndex === i ? 1 : 0,
                transition: 'opacity 0.3s ease',
                padding: '14px 18px',
                borderRadius: '6px',
                background: '#000',
                border: '1px solid rgba(255,255,255,0.15)',
              }}>
                <p style={{ ...ANTON, fontSize: 'clamp(36px, 4vw, 60px)', color: '#fff', letterSpacing: '0.05em', lineHeight: 1, margin: '0 0 10px' }}>
                  {panel.meta.num}
                </p>
                <p style={{ ...ARCHIVO, fontSize: '20px', color: '#fff', lineHeight: 1.2, margin: '0 0 6px', fontWeight: 600, letterSpacing: '0.03em' }}>
                  {panel.meta.displayTitle[lang]}
                </p>
                <p style={{ ...ARCHIVO, fontSize: '14px', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.05em', textTransform: 'uppercase', margin: '0 0 12px' }}>
                  {panel.meta.type[lang]}
                </p>
                {panel.detail && (
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      background: '#fff',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <ArrowUpRight size={14} color="#000" strokeWidth={2} />
                    </div>
                  </div>
                )}
              </div>
            )}

            <div
              className="archive-card relative transition duration-200 ease-out group-hover:-translate-y-1"
              style={{
                aspectRatio: '3 / 3.7',
                background: 'rgba(248,247,245,0.75)',
                borderTop:    isSpread ? '3px solid #000' : '1px solid rgba(148,143,138,0.9)',
                borderRight:  isSpread ? '3px solid #000' : '1px solid rgba(148,143,138,0.9)',
                borderBottom: '1px solid rgba(148,143,138,0.9)',
                borderLeft:   '1px solid rgba(148,143,138,0.9)',
                transition: 'border 0.3s ease',
              }}
            >
              {panel.image && (
                <img
                  src={panel.image}
                  alt={panel.title}
                  className={`transition-transform duration-500 ease-out ${panel.imgClass ?? 'absolute inset-0 w-full h-full object-contain group-hover:scale-105'}`}
                />
              )}
            </div>

            </div>{/* end inner wrapper */}
          </div>
        ))}
        </div>{/* end card-stage */}
      </div>

      {activePanel && createPortal(
        <ProjectModal panel={activePanel} onClose={handleClose} lang={lang} isMobile={isMobile} />,
        document.body
      )}
    </section>
  )
}
