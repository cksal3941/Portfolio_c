import { useState, type SVGProps } from 'react'
import { createPortal } from 'react-dom'
import { Cursor } from '@/components/core/cursor'
import { useLang } from '@/context/LangContext'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { WORK_PANELS, type Panel } from '@/data/projects'
import ProjectModal from '@/components/ProjectModal'

type BlankNextSectionProps = {
  className?: string
  onModalClose?: () => void
}

function MouseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={20} height={24} fill='none' {...props}>
      <path
        fill='#000'
        fillRule='evenodd'
        stroke='#fff'
        strokeLinecap='square'
        strokeWidth={1.5}
        d='M16.994 11.096 1.962 2.265l3.42 17.776 3.579-7.694z'
        clipRule='evenodd'
      />
    </svg>
  )
}

export default function BlankNextSection({ className = '', onModalClose }: BlankNextSectionProps) {
  const [activePanel, setActivePanel] = useState<Panel | null>(null)
  const { lang } = useLang()
  const { isMobile } = useBreakpoint()

  const handleClose = () => {
    setActivePanel(null)
    onModalClose?.()
  }

  return (
    <section
      aria-label="Next section"
      className={`relative h-screen overflow-hidden bg-[#f3f3f1] ${className}`}
      style={{ borderBottom: 'none', boxShadow: 'none' }}
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
        style={{ perspective: '900px', perspectiveOrigin: '50% 50%', display: isMobile ? 'none' : undefined }}
      >
        {WORK_PANELS.map((panel) => (
          <div
            key={panel.title}
            className="archive-panel group absolute left-1/2 top-[50vh] w-[clamp(80px,20vw,360px)] hover:z-[100]"
            onClick={() => panel.detail && setActivePanel(panel)}
            style={{ cursor: panel.detail ? 'none' : 'default' }}
          >
            {panel.detail && (
              <Cursor
                attachToParent
                variants={{
                  initial:  { scale: 0.3, opacity: 0 },
                  animate:  { scale: 1,   opacity: 1 },
                  exit:     { scale: 0.3, opacity: 0 },
                }}
                transition={{ ease: 'easeInOut', duration: 0.15 }}
                springConfig={{ damping: 25, stiffness: 350 }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                  <MouseIcon />
                  <div style={{
                    background:    '#000',
                    color:         '#fff',
                    padding:       '7px 18px',
                    borderRadius:  '4px',
                    fontFamily:    "'Archivo', sans-serif",
                    fontSize:      '16px',
                    fontWeight:    600,
                    letterSpacing: '0.06em',
                    whiteSpace:    'nowrap',
                  }}>
                    VIEW PROJECT
                  </div>
                </div>
              </Cursor>
            )}

            <div className="archive-card relative aspect-[3/4] bg-white/20 transition duration-200 ease-out group-hover:-translate-y-1">
              {panel.image && (
                <img
                  src={panel.image}
                  alt={panel.title}
                  className={`transition-transform duration-500 ease-out ${panel.imgClass ?? 'absolute inset-0 w-full h-full object-cover group-hover:scale-105'}`}
                />
              )}
            </div>

            {panel.meta && !isMobile && (
              <div
                className="archive-panel-meta absolute left-0 right-0 pointer-events-none"
                style={{ top: '100%', paddingTop: '12px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <span style={{
                    fontFamily: "'Archivo', sans-serif",
                    fontSize: '16px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#000',
                    flexShrink: 0,
                  }}>{panel.meta.num}</span>
                  <div style={{ flex: 1, height: '1px', background: '#000' }} />
                </div>
                <p style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontSize: 'clamp(16px, 1.4vw, 22px)',
                  fontWeight: 800,
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  color: '#000',
                  margin: '0 0 8px',
                  lineHeight: 1.15,
                }}>{panel.meta.displayTitle[lang]}</p>
                <p style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontSize: '16px',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  color: '#000',
                  margin: '0 0 5px',
                  lineHeight: 1.4,
                }}>{panel.meta.type[lang]}</p>
                <p style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontSize: '16px',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: '#000',
                  margin: 0,
                  lineHeight: 1.4,
                }}>{panel.meta.tags[lang]}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {activePanel && createPortal(
        <ProjectModal panel={activePanel} onClose={handleClose} lang={lang} isMobile={isMobile} />,
        document.body
      )}
    </section>
  )
}
