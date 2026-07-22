# RE:BUILD — Portfolio

> 기획과 디자인, 구현 사이의 흐름을 고민하는 주니어 프론트엔드 개발자의 포트폴리오입니다.

**[https://portfolio-c-lime.vercel.app/](https://portfolio-c-lime.vercel.app/)**

![React](https://img.shields.io/badge/React_19-61DAFB?style=flat&logo=react&logoColor=000)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=fff)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=fff)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat&logo=tailwindcss&logoColor=fff)
![GSAP](https://img.shields.io/badge/GSAP_3-88CE02?style=flat&logo=greensock&logoColor=000)

---

## 소개

**RE:BUILD**는 과거의 경험을 지우지 않고, 지금의 방향에 맞게 다시 구성하는 과정을 담은 포트폴리오입니다.

식품 개발·품질 분석 연구 현장에서 시작해 웹 퍼블리싱과 프론트엔드 개발로 전환 중인 작업 아카이브입니다. 빠르게 만들기보다 구조를 먼저 이해하고, 사용자가 읽기 쉬운 화면으로 정리하는 작업 방식을 지향합니다.

---

## 주요 기능

- **IntroLoader** — GSAP 시퀀스 기반 인트로 오버레이 (`RE:BUILD` 텍스트 스태거 + 프로그레스 바)
- **Hero** — `1100vh` 스크롤 드리븐 타임라인, 원형 클립 전환
- **ProjectsSection** — WORK 아카이브 패널 + 풀스크린 프로젝트 모달
- **HorizontalSection** — GSAP 핀 가로 스크롤 (기술 스택 / 작업 방식 / 경력 등 6개 패널), 커스텀 이미지 커서 + 3D 틸트
- **AboutSection** — SplitText 스크롤 리빌 텍스트 애니메이션
- **DarkTransition** — 스크롤 기반 라이트 → 다크 컬러 전환 + 마우스 이미지 트레일
- **FooterSection** — 무한 마퀴 + 서울 라이브 타임 + 자기소개
- **MenuPanel** — 우측 슬라이드 드로어, 섹션 앵커 이동
- **한/영 전환** — `LangContext` 로 앱 전체 이중 언어 지원

---

## 수록 프로젝트

| # | 프로젝트 | 유형 | 스택 | 링크 |
|---|---------|------|------|------|
| 01 | after.9 | 가상 바디 케어 브랜드 SPA | React · Firebase · Firestore · Polar · Vercel | [Live](https://after-9-chi.vercel.app/) · [GitHub](https://github.com/cksal3941/after.9) · [Figma](https://www.figma.com/design/kIRjQuOWe0hhET7jbq8U9J) |
| 02 | 한글과컴퓨터학원 리뉴얼 | 반응형 교육기관 웹사이트 리뉴얼 | React · Firebase · Cloudinary · Leaflet · Vercel | [Live](https://hancom-academy.vercel.app/) · [GitHub](https://github.com/cksal3941/hancom-academy) · [Figma](https://www.figma.com/design/5G0rH9PZy5opNOfxU1aW8k) |
| 03 | WEEF 클론 코딩 | 브랜드 커머스 UI 클론 | HTML · CSS · JS · Swiper · AOS | [Live](https://cksal3941.github.io/weef/) · [GitHub](https://github.com/cksal3941/weef) · [Figma](https://www.figma.com/design/GwXbAanUF8LgzVlXMEJ4gW/weef) · [Original](https://weef.co.kr/) |

---

## 기술 스택

| 영역 | 사용 기술 |
|------|----------|
| UI 프레임워크 | React 19 + TypeScript |
| 빌드 | Vite 8 |
| 스타일 | Tailwind CSS v4 (`@tailwindcss/vite`) |
| 애니메이션 | GSAP 3 (ScrollTrigger · SplitText) · Framer Motion |
| 스무스 스크롤 | Lenis |
| 아이콘 | Lucide React |
| 폰트 | Inter (fontsource) · Anton · Archivo (Google Fonts) |
| Lint | oxlint |

---

## 로컬 실행

```bash
# 의존성 설치
npm install

# 개발 서버 (HMR)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview

# 린트
npm run lint
```

> Node.js 18 이상 권장. 빌드 후 TypeScript 오류가 없는지 확인하세요.

---

## 프로젝트 구조

```
src/
├── components/
│   ├── core/          # SplitReveal, cursor (재사용 프리미티브)
│   ├── Hero.tsx
│   ├── AboutSection.tsx
│   ├── HorizontalSection.tsx
│   ├── ProjectsSection.tsx
│   ├── ProjectModal.tsx
│   ├── BlankNextSection.tsx
│   ├── DarkTransition.tsx
│   ├── FooterSection.tsx
│   ├── IntroLoader.tsx
│   ├── MenuPanel.tsx
│   └── ScrollProgress.tsx
├── context/
│   └── LangContext.tsx  # 한/영 전환
├── data/
│   ├── content.ts       # 모든 UI 텍스트 (BiLang 구조)
│   └── projects.tsx     # WORK_PANELS 프로젝트 데이터
├── hooks/
│   ├── useMagnetic.ts   # GSAP 마그네틱 효과
│   └── useBreakpoint.ts # 반응형 브레이크포인트
├── lib/
│   └── lenis.ts         # Lenis 싱글톤
├── images/
├── index.css            # 디자인 토큰 + Tailwind
└── App.tsx
```

---

## 연락

- **Email** — cksal8449@gmail.com
- **GitHub** — [github.com/cksal3941](https://github.com/cksal3941)
- **이 저장소** — [github.com/cksal3941/Portfolio_c](https://github.com/cksal3941/Portfolio_c)
