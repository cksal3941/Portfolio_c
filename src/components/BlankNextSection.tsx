import { useState, useEffect, useRef, type SVGProps } from 'react'
import { createPortal } from 'react-dom'
import { X, ExternalLink, Globe } from 'lucide-react'
import gsap from 'gsap'
import { Cursor } from '@/components/core/cursor'
import { lenis } from '@/lib/lenis'
import afterImg from '@/images/after.9.png'
import hancomImg from '@/images/hancom.png'
import weefImg from '@/images/weef.png'
import { useLang, type Lang } from '@/context/LangContext'

type BlankNextSectionProps = {
  className?: string
  onModalClose?: () => void
}

type BiLang<T> = { ko: T; en: T }

type Panel = {
  title: string
  image?: string
  imgClass?: string
  meta?: {
    num: string
    displayTitle: BiLang<string>
    type: BiLang<string>
    tags: BiLang<string>
  }
  detail?: Detail
}

type Detail = {
  subtitle: BiLang<string>
  type: string
  period: string
  role: BiLang<string>
  stack: string[]
  tasks: BiLang<string[]>
  learned: BiLang<string>
  links: { label: string; url: string }[]
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

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  )
}

function FigmaIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8.5 2A3.5 3.5 0 0 0 5 5.5 3.5 3.5 0 0 0 8.5 9H12V2H8.5Z"/>
      <path d="M12 2h3.5a3.5 3.5 0 0 1 0 7H12V2Z"/>
      <path d="M12 9H8.5A3.5 3.5 0 0 0 5 12.5 3.5 3.5 0 0 0 8.5 16H12V9Z"/>
      <path d="M12 12.5a3.5 3.5 0 0 1 3.5-3.5 3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 12 12.5Z"/>
      <path d="M8.5 16A3.5 3.5 0 0 0 5 19.5 3.5 3.5 0 0 0 8.5 23 3.5 3.5 0 0 0 12 19.5V16H8.5Z"/>
    </svg>
  )
}

function getLinkIcon(label: string) {
  if (label === 'GitHub') return <GitHubIcon />
  if (label === 'Figma') return <FigmaIcon />
  if (label === 'Original') return <Globe size={18} />
  return <ExternalLink size={18} />
}

function getLinkAriaLabel(label: string, lang: Lang) {
  const map: Record<string, BiLang<string>> = {
    'Live Demo': { ko: '라이브 사이트 열기',  en: 'Open live site'      },
    'GitHub':    { ko: 'GitHub 저장소 열기',  en: 'Open GitHub repo'    },
    'Figma':     { ko: 'Figma 디자인 열기',   en: 'Open Figma design'   },
    'Original':  { ko: '원본 사이트 열기',     en: 'Open original site'  },
  }
  return map[label]?.[lang] ?? label
}

const WORK_PANELS: Panel[] = [
  {
    title: 'AFTER.9 COMMERCE SPA',
    image: afterImg,
    meta: {
      num: '01',
      displayTitle: { ko: 'after.9 일체형페이지', en: "A'FTER.9" },
      type: { ko: '브랜드 UI 콘셉트', en: 'BRAND UI CONCEPT' },
      tags: { ko: 'UI 디자인 / 비주얼 디렉션', en: 'UI DESIGN / VISUAL DIRECTION' },
    },
    detail: {
      subtitle: {
        ko: '브랜드 기획부터 쇼핑몰 구현까지 혼자 진행한 가상 바디 케어 브랜드 프로젝트입니다.',
        en: 'A solo project building a virtual body care brand — from brand planning to full e-commerce implementation.',
      },
      type: 'PERSONAL PROJECT',
      period: '2026.06.30 – 2026.07.03',
      role: {
        ko: '기획 · 브랜드 디자인 · AI 이미지 제작 · 웹사이트 구현',
        en: 'Planning · Brand Design · AI Image Production · Website Implementation',
      },
      stack: ['React', 'Vite', 'CSS', 'Swiper', 'Firebase', 'Firestore', 'Polar', 'Kakao Address API', 'Vercel'],
      tasks: {
        ko: ['가상 바디 케어 브랜드 기획 및 AI 이미지 제작', '상품 검색, 필터, 좋아요, 장바구니 기능 구현', '회원가입, 로그인, Google 로그인 구현', '쿠폰 적용 및 테스트 결제 화면 구현', '주문 내역, 마이페이지 구성'],
        en: ['Virtual body care brand planning and AI image production', 'Product search, filter, favourites, and cart features', 'Sign-up, login, and Google OAuth', 'Coupon application and test payment flow', 'Order history and My Page'],
      },
      learned: {
        ko: '브랜드 구축과 전체 구매 흐름 설계를 혼자 경험하며, 서비스 하나를 완성하는 데 필요한 관점을 얻었습니다.',
        en: 'Building a brand and designing the full purchase flow solo gave me the perspective needed to see a service through to completion.',
      },
      links: [
        { label: 'Live Demo', url: 'https://after-9-chi.vercel.app/' },
        { label: 'GitHub', url: 'https://github.com/cksal3941/after.9' },
        { label: 'Figma', url: 'https://www.figma.com/design/kIRjQuOWe0hhET7jbq8U9J' },
      ],
    },
  },
  {
    title: 'HANCOM ACADEMY RENEWAL',
    image: hancomImg,
    imgClass: 'absolute inset-0 w-full h-full object-contain scale-[2.6] translate-y-[2%] group-hover:scale-[2.8]',
    meta: {
      num: '02',
      displayTitle: { ko: '한글과컴퓨터학원 반응형 웹 리뉴얼', en: 'HANCOM ACADEMY RENEWAL' },
      type: { ko: '웹 리뉴얼 / 퍼블리싱', en: 'WEB RENEWAL / PUBLISHING' },
      tags: { ko: 'REACT / CSS / 인터랙션', en: 'REACT / CSS / INTERACTION' },
    },
    detail: {
      subtitle: {
        ko: '오래된 교육기관 웹사이트를 반응형 구조와 현대적인 UI 흐름으로 리뉴얼한 프로젝트입니다.',
        en: 'Renewed an outdated educational institution website with a responsive layout and modern UI flow.',
      },
      type: 'PERSONAL PROJECT',
      period: '2026.06.08 – 2026.07.02',
      role: {
        ko: 'UI 구성 · 반응형 웹 구현 · 로그인/게시판 기능 구현',
        en: 'UI Layout · Responsive Web · Login / Board Feature Implementation',
      },
      stack: ['React', 'Vite', 'JavaScript', 'React Router', 'Swiper', 'AOS', 'Firebase', 'Firestore', 'Cloudinary', 'Leaflet', 'Vercel'],
      tasks: {
        ko: ['PC / 태블릿 / 모바일 반응형 레이아웃 구현', '메인 이미지 슬라이드 및 상단/모바일 메뉴 구현', '회원가입, 로그인, Google 로그인 구현', '공지사항 및 뉴스 게시판 CRUD 구현', '이미지 업로드, 확대 보기, 지도/길찾기 기능 연결'],
        en: ['PC / tablet / mobile responsive layout', 'Main image slider and top/mobile navigation', 'Sign-up, login, and Google OAuth', 'Announcements and news board CRUD', 'Image upload, zoom view, and map/directions integration'],
      },
      learned: {
        ko: '사용자가 원하는 정보를 더 쉽게 찾을 수 있도록 정보 흐름과 화면 구조를 다시 설계하는 경험을 했습니다.',
        en: 'Redesigning information flow and screen structure to help users find what they need more easily.',
      },
      links: [
        { label: 'Live Demo', url: 'https://hancom-academy.vercel.app/' },
        { label: 'GitHub', url: 'https://github.com/cksal3941/hancom-academy' },
        { label: 'Figma', url: 'https://www.figma.com/design/5G0rH9PZy5opNOfxU1aW8k' },
      ],
    },
  },
  {
    title: 'WEEF CLONE CODING',
    image: weefImg,
    imgClass: 'absolute inset-0 w-full h-full object-contain scale-[1.2] group-hover:scale-[1.35]',
    meta: {
      num: '03',
      displayTitle: { ko: 'WEEF 클론 코딩', en: 'WIFF PRODUCT PAGE' },
      type: { ko: '커머스 UI / 프로덕트 인터랙션', en: 'COMMERCE UI / PRODUCT INTERACTION' },
      tags: { ko: 'UI 디자인 / 프론트엔드', en: 'UI DESIGN / FRONT-END' },
    },
    detail: {
      subtitle: {
        ko: '식물 유래 주방 세정 브랜드 웹사이트의 구조와 애니메이션을 분석하며 구현한 클론 코딩 프로젝트입니다.',
        en: 'Clone-coded a plant-based kitchen cleaner brand website, analysing its structure and scroll animations.',
      },
      type: 'PERSONAL PROJECT · CLONE CODING',
      period: '2025 / 3 DAYS',
      role: {
        ko: '화면 구현 · 반응형 웹 · 스크롤 애니메이션 구현',
        en: 'Screen Implementation · Responsive Web · Scroll Animation',
      },
      stack: ['HTML', 'CSS', 'JavaScript', 'Swiper', 'AOS'],
      tasks: {
        ko: ['원본 웹사이트 화면 구조 및 섹션 분석', '스크롤 시 나타나는 애니메이션(AOS) 적용', '이미지 슬라이드(Swiper) 구현', 'PC / 태블릿 / 모바일 반응형 구성', '모바일 메뉴 및 하단 고정 버튼 구현'],
        en: ['Analysed screen structure and sections of the original site', 'Scroll-triggered animations using AOS', 'Image slider using Swiper', 'PC / tablet / mobile responsive layout', 'Mobile menu and fixed bottom button'],
      },
      learned: {
        ko: '완성도 있는 브랜드 웹페이지는 이미지 비율, 여백, 애니메이션 속도가 함께 맞아야 한다는 것을 배웠습니다.',
        en: 'Learned that a polished brand webpage requires image ratios, spacing, and animation timing to all work in harmony.',
      },
      links: [
        { label: 'Live Demo', url: 'https://cksal3941.github.io/weef/' },
        { label: 'GitHub', url: 'https://github.com/cksal3941/weef' },
        { label: 'Figma', url: 'https://www.figma.com/design/GwXbAanUF8LgzVlXMEJ4gW/weef' },
        { label: 'Original', url: 'https://weef.co.kr/' },
      ],
    },
  },
]

function ProjectModal({ panel, onClose, lang }: { panel: Panel; onClose: () => void; lang: Lang }) {
  const d = panel.detail!
  const modalRef = useRef<HTMLDivElement>(null)
  const tlRef    = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    lenis?.stop()

    // 모달 안의 wheel/touch 이벤트가 Lenis(document/window 레벨)까지
    // 버블링되지 않도록 막아 native overflow-y-auto 스크롤을 살린다.
    const modalEl = modalRef.current
    const stopProp = (e: Event) => e.stopPropagation()
    modalEl?.addEventListener('wheel',     stopProp, { passive: true })
    modalEl?.addEventListener('touchmove', stopProp, { passive: true })

    // 모달 바깥 스크롤은 여전히 차단
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

      <div className="fixed inset-0 z-[310] flex items-center justify-center p-4 pointer-events-none">
        <div
          ref={modalRef}
          className="pointer-events-auto overflow-y-auto bg-white border border-black flex flex-col w-full"
          style={{ maxWidth: '760px', maxHeight: '86vh' }}
        >
          <div
            className="flex items-start justify-between border-b border-black"
            style={{ padding: '32px 40px 20px' }}
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

          <div className="border-b border-black" style={{ padding: '28px 40px' }}>
            <h3
              className="text-black font-black uppercase"
              style={{ fontSize: 'clamp(28px, 5vw, 44px)', lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: '16px' }}
            >
              {panel.title}
            </h3>
            <p style={{ fontSize: '15px', lineHeight: 1.6, color: '#000', margin: 0 }}>
              {d.subtitle[lang]}
            </p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '18px' }}>
              {d.links.map(link => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={getLinkAriaLabel(link.label, lang)}
                  className="flex items-center justify-center border border-black bg-white text-black hover:bg-black hover:text-white transition-colors"
                  style={{ width: '44px', height: '44px' }}
                >
                  {getLinkIcon(link.label)}
                </a>
              ))}
            </div>
          </div>

          <div style={{ padding: '0 40px 40px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div style={{ paddingTop: '28px' }}>
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

            <div>
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

            <div style={{ borderTop: '1px solid #000', paddingTop: '28px' }}>
              <p style={{ fontSize: '15px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#000', marginBottom: '10px' }}>
                Learned
              </p>
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#000', margin: 0 }}>
                {d.learned[lang]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default function BlankNextSection({ className = '', onModalClose }: BlankNextSectionProps) {
  const [activePanel, setActivePanel] = useState<Panel | null>(null)
  const { lang } = useLang()

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
      <div className="next-section-title absolute left-[8.5vw] top-[14vh]">
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
        style={{ perspective: '900px', perspectiveOrigin: '50% 50%' }}
      >
        {WORK_PANELS.map((panel) => (
          <div
            key={panel.title}
            className="archive-panel group absolute left-1/2 top-[50vh] w-[clamp(240px,20vw,360px)] hover:z-[100]"
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
                  className={`transition-transform duration-500 ease-out ${panel.imgClass ?? 'absolute inset-[8%] w-[84%] h-[84%] object-contain group-hover:scale-110'}`}
                />
              )}
            </div>

            {panel.meta && (
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
        <ProjectModal panel={activePanel} onClose={handleClose} lang={lang} />,
        document.body
      )}
    </section>
  )
}
