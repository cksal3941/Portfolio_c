import { Globe, ExternalLink } from 'lucide-react'
import afterImg from '@/images/after.9.webp'
import hancomImg from '@/images/hancom.webp'
import weefImg from '@/images/weef.webp'
import lumaImg from '@/images/luma.png'
import gumiseaImg from '@/images/goldfish.png'
import gyeongjuImg from '@/images/첨성대 임시 이미지.png'
import chorogiImg from '@/images/chorogi.png'
import type { Lang } from '@/context/LangContext'

export type BiLang<T> = { ko: T; en: T }

export type Detail = {
  subtitle: BiLang<string>
  type: string
  period: string
  role: BiLang<string>
  stack: string[]
  tasks: BiLang<string[]>
  learned: BiLang<string>
  links: { label: string; url: string }[]
}

export type Panel = {
  title: string
  image?: string
  imgClass?: string
  cardBg?: string
  meta?: {
    num: string
    displayTitle: BiLang<string>
    type: BiLang<string>
    tags: BiLang<string>
  }
  detail?: Detail
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function FigmaIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8.5 2A3.5 3.5 0 0 0 5 5.5 3.5 3.5 0 0 0 8.5 9H12V2H8.5Z" />
      <path d="M12 2h3.5a3.5 3.5 0 0 1 0 7H12V2Z" />
      <path d="M12 9H8.5A3.5 3.5 0 0 0 5 12.5 3.5 3.5 0 0 0 8.5 16H12V9Z" />
      <path d="M12 12.5a3.5 3.5 0 0 1 3.5-3.5 3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 12 12.5Z" />
      <path d="M8.5 16A3.5 3.5 0 0 0 5 19.5 3.5 3.5 0 0 0 8.5 23 3.5 3.5 0 0 0 12 19.5V16H8.5Z" />
    </svg>
  )
}

export function getLinkIcon(label: string) {
  if (label === 'GitHub') return <GitHubIcon />
  if (label === 'Figma') return <FigmaIcon />
  if (label === 'Original') return <Globe size={18} />
  return <ExternalLink size={18} />
}

export function getLinkAriaLabel(label: string, lang: Lang): string {
  const map: Record<string, BiLang<string>> = {
    'Live Demo': { ko: '라이브 사이트 열기', en: 'Open live site'    },
    'GitHub':    { ko: 'GitHub 저장소 열기', en: 'Open GitHub repo'  },
    'Figma':     { ko: 'Figma 디자인 열기',  en: 'Open Figma design' },
    'Original':  { ko: '원본 사이트 열기',    en: 'Open original site'},
  }
  return map[label]?.[lang] ?? label
}

export const WORK_PANELS: Panel[] = [
  {
    title: 'AFTER.9 COMMERCE SPA',
    image: afterImg,
    imgClass: 'absolute inset-0 w-full h-full object-contain scale-[0.88] group-hover:scale-[0.93]',
    meta: {
      num: '01',
      displayTitle: { ko: 'after.9 일체형페이지', en: "AFTER.9" },
      type: { ko: '브랜드 UI 콘셉트', en: 'BRAND UI CONCEPT' },
      tags: { ko: 'UI 디자인 / 반응형 / 비주얼 디렉션', en: 'UI DESIGN / RESPONSIVE / VISUAL DIRECTION' },
    },
    detail: {
      subtitle: {
        ko: '브랜드 기획부터 웹사이트 구현까지 진행한 가상의 바디 케어 브랜드 프로젝트입니다.',
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
        { label: 'GitHub',    url: 'https://github.com/cksal3941/after.9' },
        { label: 'Figma',     url: 'https://www.figma.com/design/kIRjQuOWe0hhET7jbq8U9J' },
      ],
    },
  },
  {
    title: 'HANCOM ACADEMY RENEWAL',
    image: hancomImg,
    imgClass: 'absolute inset-0 w-full h-full object-contain scale-[1.05] group-hover:scale-[1.1]',
    meta: {
      num: '02',
      displayTitle: { ko: '한글과컴퓨터학원 반응형 웹 리뉴얼', en: 'HANCOM ACADEMY RENEWAL' },
      type: { ko: '웹 리뉴얼 / 퍼블리싱', en: 'WEB RENEWAL / PUBLISHING' },
      tags: { ko: 'REACT / CSS / 반응형 / 인터랙션', en: 'REACT / CSS / RESPONSIVE / INTERACTION' },
    },
    detail: {
      subtitle: {
        ko: '교육기관 웹사이트를 반응형 구조와 현대적인 UI 흐름으로 리뉴얼한 프로젝트입니다.',
        en: 'Renewed an educational institution website with a responsive layout and modern UI flow.',
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
        { label: 'GitHub',    url: 'https://github.com/cksal3941/hancom-academy' },
        { label: 'Figma',     url: 'https://www.figma.com/design/5G0rH9PZy5opNOfxU1aW8k' },
      ],
    },
  },
  {
    title: 'WEEF CLONE CODING',
    image: weefImg,
    imgClass: 'absolute inset-0 w-full h-full object-contain scale-[0.88] group-hover:scale-[0.93]',
    meta: {
      num: '03',
      displayTitle: { ko: 'WEEF 클론 코딩', en: 'WEEF PRODUCT PAGE' },
      type: { ko: '커머스 UI / 프로덕트 인터랙션', en: 'COMMERCE UI / PRODUCT INTERACTION' },
      tags: { ko: 'UI 디자인 / 반응형 / 프론트엔드', en: 'UI DESIGN / RESPONSIVE / FRONT-END' },
    },
    detail: {
      subtitle: {
        ko: '주방 세정 브랜드 웹사이트의 구조와 애니메이션을 분석하며 구현한 클론 코딩 프로젝트입니다.',
        en: 'Clone-coded a kitchen cleaner brand website, analysing its structure and scroll animations.',
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
        { label: 'GitHub',    url: 'https://github.com/cksal3941/weef' },
        { label: 'Figma',     url: 'https://www.figma.com/design/GwXbAanUF8LgzVlXMEJ4gW/weef' },
        { label: 'Original',  url: 'https://weef.co.kr/' },
      ],
    },
  },
  {
    title: 'LUMA ONE LANDING PAGE',
    image: lumaImg,
    imgClass: 'absolute inset-0 w-full h-full object-contain scale-[0.88] group-hover:scale-[0.93]',
    meta: {
      num: '04',
      displayTitle: { ko: 'LUMA ONE 랜딩페이지', en: 'LUMA ONE LANDING PAGE' },
      type: { ko: '브랜드 UI 콘셉트', en: 'BRAND UI CONCEPT' },
      tags: { ko: 'UI 디자인 / 비주얼 디렉션', en: 'UI DESIGN / VISUAL DIRECTION' },
    },
    detail: {
      subtitle: {
        ko: '가상의 미래형 전기차 브랜드 LUMA의 첫 번째 모델 ONE — 기획부터 AI 이미지·영상 제작, 역동적인 랜딩페이지 구현까지 진행한 개인 프로젝트입니다.',
        en: 'A solo project for LUMA ONE, the debut model of a fictional futuristic EV brand — from planning and AI image generation to video production and a dynamic landing page.',
      },
      type: 'PERSONAL PROJECT',
      period: '2026',
      role: {
        ko: '기획 · 브랜드 디자인 · AI 이미지/영상 제작 · 웹사이트 구현',
        en: 'Planning · Brand Design · AI Image & Video Production · Website Implementation',
      },
      stack: ['React', 'Vite', 'CSS', 'GSAP', 'AI Image Generation', 'Google Flow'],
      tasks: {
        ko: [
          '가상 미래형 전기차 브랜드 LUMA 기획 및 AI 이미지 제작',
          'Google Flow를 활용한 브랜드 영상 제작',
          '스크롤 기반 역동적인 랜딩페이지 구현',
          '브랜드 아이덴티티에 맞는 인터랙션 및 애니메이션 설계',
        ],
        en: [
          'Brand planning and AI image production for fictional EV brand LUMA',
          'Brand video production using Google Flow',
          'Scroll-driven dynamic landing page implementation',
          'Interaction and animation design aligned with brand identity',
        ],
      },
      learned: {
        ko: 'AI 이미지와 영상을 활용해 브랜드 세계관을 구축하고, 이를 웹 인터랙션으로 연결하는 전체 흐름을 경험했습니다.',
        en: 'Experienced the full flow of building a brand universe with AI-generated visuals and translating it into web interactions.',
      },
      links: [
        { label: 'Live Demo', url: 'https://luma-one-three.vercel.app/' },
        { label: 'GitHub',    url: 'https://github.com/cksal3941/LUMA-One' },
      ],
    },
  },
  {
    title: 'GUMISEA LANDING PAGE',
    image: gumiseaImg,
    imgClass: 'absolute inset-0 w-full h-full object-contain scale-[0.88] group-hover:scale-[0.93]',
    meta: {
      num: '05',
      displayTitle: { ko: 'GUMISEA 랜딩페이지', en: 'GUMISEA LANDING PAGE' },
      type: { ko: '인터랙티브 랜딩페이지', en: 'INTERACTIVE LANDING PAGE' },
      tags: { ko: 'UI 디자인 / 반응형 / 인터랙션', en: 'UI DESIGN / RESPONSIVE / INTERACTION' },
    },
    detail: {
      subtitle: {
        ko: '인터랙션을 통해 역동적이고 컬러풀한 경험을 제공하는 가상 브랜드 랜딩페이지입니다. 기획부터 AI 이미지 제작까지 직접 진행했습니다.',
        en: 'A vibrant, colourful landing page for a fictional brand built around dynamic interactions — from planning to AI image production, all solo.',
      },
      type: 'PERSONAL PROJECT',
      period: '2026',
      role: {
        ko: '기획 · AI 이미지 제작 · 인터랙션 구현',
        en: 'Planning · AI Image Production · Interaction Implementation',
      },
      stack: ['HTML', 'CSS', 'JavaScript', 'AI Image Generation'],
      tasks: {
        ko: [
          '가상 브랜드 GUMISEA 기획 및 콘셉트 설계',
          'AI 이미지를 활용한 비주얼 에셋 제작',
          '스크롤 및 마우스 인터랙션 기반 역동적인 화면 구현',
          '컬러풀하고 생동감 있는 UI 디자인 및 애니메이션 적용',
        ],
        en: [
          'Brand planning and concept design for fictional brand GUMISEA',
          'Visual asset production using AI image generation',
          'Dynamic scroll and mouse interaction implementation',
          'Colourful, vibrant UI design and animation',
        ],
      },
      learned: {
        ko: '색감과 인터랙션이 브랜드의 에너지를 어떻게 전달하는지, 그 관계를 직접 설계하며 배웠습니다.',
        en: 'Learned first-hand how colour and interaction convey a brand\'s energy by designing that relationship from scratch.',
      },
      links: [],
    },
  },
  {
    title: '클래스 브릿지',
    meta: {
      num: '06',
      displayTitle: { ko: '클래스 브릿지', en: 'CLASS BRIDGE' },
      type: { ko: '모바일 앱 / 성적 관리', en: 'MOBILE APP / GRADE MANAGEMENT' },
      tags: { ko: '개발 중', en: 'IN DEVELOPMENT' },
    },
    detail: {
      subtitle: {
        ko: '학원·학부모·학생을 하나로 이어주는 성적 관리 모바일 어플리케이션입니다. 현재 개발 진행 중입니다.',
        en: 'A mobile app connecting academies, parents, and students for integrated grade management. Currently in development.',
      },
      type: 'PERSONAL PROJECT',
      period: '2026 — 진행 중',
      role: {
        ko: '기획 · UI/UX 디자인 · 앱 개발',
        en: 'Planning · UI/UX Design · App Development',
      },
      stack: [],
      tasks: {
        ko: [
          '학원·학부모·학생 3자 연동 구조 기획',
          '성적 입력 및 조회 기능 설계',
          '알림 및 커뮤니케이션 기능 구현 예정',
        ],
        en: [
          'Three-way connection structure planning for academies, parents, and students',
          'Grade input and retrieval feature design',
          'Notification and communication features planned',
        ],
      },
      learned: {
        ko: '',
        en: '',
      },
      links: [],
    },
  },
  {
    title: 'GYEONGJU CULTURAL TOURISM RENEWAL',
    image: gyeongjuImg,
    imgClass: 'absolute inset-0 w-full h-full object-contain scale-[0.72] group-hover:scale-[0.77]',
    meta: {
      num: '07',
      displayTitle: { ko: '경주 문화관광 웹 리뉴얼', en: 'GYEONGJU TOURISM RENEWAL' },
      type: { ko: '팀 프로젝트 / 웹 리뉴얼', en: 'TEAM PROJECT / WEB RENEWAL' },
      tags: { ko: '팀 프로젝트 / 웹 퍼블리싱 / Node.js', en: 'TEAM PROJECT / WEB PUBLISHING / NODE.JS' },
    },
    detail: {
      subtitle: {
        ko: '경주시 공식 문화관광 웹사이트를 참고해 3인이 약 1주일간 리뉴얼한 팀 프로젝트입니다. AI 없이 하드코딩으로 완성한 뒤, MongoDB를 Firebase로 전환하고 Vercel에 재배포했습니다.',
        en: 'A team-of-three renewal of the official Gyeongju cultural tourism website, hand-coded in roughly one week without AI assistance, then migrated from MongoDB to Firebase and redeployed on Vercel.',
      },
      type: 'TEAM PROJECT (3인)',
      period: '2023.08 / 1 WEEK',
      role: {
        ko: '기획 · Figma 디자인 · 구현 · 배포 (팀 전원 참여)',
        en: 'Planning · Figma Design · Implementation · Deployment (all members)',
      },
      stack: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Slick Carousel', 'Node.js', 'Express', 'EJS', 'Firebase Authentication', 'Cloud Firestore', 'OpenWeatherMap API', '에어코리아 미세먼지 API', 'Kakao Maps API', 'Daum Postcode API', 'Vercel'],
      tasks: {
        ko: [
          'Slick Carousel을 이용한 메인 이미지 자동 슬라이드 구현',
          'OpenWeatherMap API로 실시간 날씨·기온 표시',
          '에어코리아 미세먼지 API — 서버 프록시로 CORS·HTTPS 문제 우회',
          'Firebase Auth 기반 이메일 및 Google 소셜 로그인',
          'Cloud Firestore에 회원 이름·전화번호·주소 저장',
          'Daum Postcode API 연동 우편번호 검색',
          'jQuery hover 기반 드롭다운 메가 메뉴',
          '기획·Figma 디자인·구현·Vercel 배포 전 과정 3인 협업',
        ],
        en: [
          'Auto-sliding main banner using Slick Carousel',
          'Real-time weather and temperature display via OpenWeatherMap API',
          'Air-quality data (에어코리아) fetched server-side to bypass CORS/HTTPS restrictions',
          'Email and Google social login via Firebase Authentication',
          'User profile storage (name, phone, address) in Cloud Firestore',
          'Address lookup integrated with Daum Postcode API',
          'jQuery hover-driven dropdown mega menu',
          'All phases — planning, Figma design, coding, Vercel deployment — handled collaboratively by three members',
        ],
      },
      learned: {
        ko: 'MongoDB에서 Firebase로 직접 전환하며 인증·DB 구조를 재설계한 경험과, 서버 프록시로 외부 API의 CORS·HTTPS 문제를 해결하는 방법을 배웠습니다.',
        en: 'Migrating from MongoDB to Firebase taught me how to redesign auth and DB structure; routing external API calls through a server proxy showed me how to resolve CORS and HTTPS issues in practice.',
      },
      links: [
        { label: 'Live Demo', url: 'https://gyeongju-culture-tourism.vercel.app' },
        { label: 'GitHub',    url: 'https://github.com/cksal3941/gumisea' },
        { label: 'Figma',     url: 'https://www.figma.com/design/DW38ahEwGXSbL6Eon1r5QX/%ED%8C%80%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B2%BD%EC%A3%BC%EB%AC%B8%ED%99%94%EA%B4%80%EA%B4%91_%EB%A6%AC%EB%94%94%EC%9E%90%EC%9D%B8-?node-id=0-1&t=bijc6pzY6omsiAY4-0' },
      ],
    },
  },
  {
    title: '관악구 초록이',
    image: chorogiImg,
    imgClass: 'absolute inset-0 w-full h-full object-contain scale-[0.88] group-hover:scale-[0.93]',
    meta: {
      num: '08',
      displayTitle: { ko: '관악구 초록이', en: 'GWANAK CHOROKI' },
      type: { ko: '팀 프로젝트 / 모바일 웹', en: 'TEAM PROJECT / MOBILE WEB' },
      tags: { ko: '팀 프로젝트 / 지도 서비스', en: 'TEAM PROJECT / MAP SERVICE' },
    },
    detail: {
      subtitle: {
        ko: '버리기 애매한 형광등, 의류, 폐건전지 등을 근처 어디에 버릴 수 있는지 지도로 알려주는 서비스입니다. 길에서 마주치는 초록색 새싹 캐릭터 초록이와 함께, 분리배출을 조금 더 쉽고 친숙하게 만들고 싶어서 만들었습니다.',
        en: 'A map-based service showing where to dispose of hard-to-sort items — fluorescent bulbs, clothing, dead batteries — near you. Built alongside Choroki, a green sprout character, to make waste sorting a little easier and more approachable.',
      },
      type: 'TEAM PROJECT (3인)',
      period: '2023.08 / 1 WEEK',
      role: {
        ko: '기획 · 디자인 · 개발 전 과정 (3인 공동)',
        en: 'Planning · Design · Development (all phases, 3 members)',
      },
      stack: ['React 18', 'Create React App', 'react-router-dom', 'react-kakao-maps-sdk', 'react-slick', '@iconify/react', 'react-device-detect', '카카오맵 API', '공공데이터포털', 'Nomad Sculpt', 'Vercel'],
      tasks: {
        ko: [
          '서울시·관악구 공공데이터의 수거함 주소를 카카오맵 좌표로 변환해 데이터 구성',
          '카카오맵 API로 의류·폐건전지·형광등·네프론·기부처 위치를 지도에 표시',
          '카테고리별 위치 안내 화면 및 분리배출 상세 안내 페이지 구현',
          '3D 모델링 앱 Nomad Sculpt로 직접 제작한 캐릭터 초록이를 서비스 전반에 적용',
          '기획·디자인·개발·배포 전 과정 3인 공동 진행',
        ],
        en: [
          'Converted public waste collection address data (Seoul / Gwanak-gu) to Kakao Maps coordinates',
          'Displayed clothing, battery, fluorescent bulb, Nephron, and donation drop-off points on Kakao Maps',
          'Built per-category map screens and disposal detail/guide pages',
          'Sculpted and textured the 3D character Choroki in Nomad Sculpt on iPad; integrated across loading screens and headers',
          'Full project cycle — planning, design, development, and deployment — handled jointly by all three members',
        ],
      },
      learned: {
        ko: '공공 데이터를 좌표로 변환해 지도 위에 직접 시각화하는 과정을 경험하고, 3D 캐릭터를 직접 제작해 서비스 아이덴티티를 만드는 것이 사용자 경험에 어떤 차이를 주는지 체감했습니다.',
        en: 'Learned to convert public address data into map coordinates for direct visualisation, and saw first-hand how a hand-crafted 3D character shapes service identity and user experience.',
      },
      links: [
        { label: 'Live Demo', url: 'https://chorogi.vercel.app' },
        { label: 'GitHub',    url: 'https://github.com/cksal3941/gwanakgu-chorogi' },
        { label: 'Figma',     url: 'https://www.figma.com/design/0XHDPuvAA3hM3KVDByNpBJ/%EA%B4%80%EC%95%85%EA%B5%AC-%EC%B4%88%EB%A1%9D%EC%9D%B4-%EC%93%B0%EB%A0%88%EA%B8%B0-%EC%88%98%EA%B1%B0%ED%95%A8-%EC%9C%84%EC%B9%98-%EC%95%8C%EB%A6%BC-%EC%84%9C%EB%B9%84%EC%8A%A4-?node-id=0-1&t=ewxhHmZU3oQksNq2-1' },
      ],
    },
  },
]
