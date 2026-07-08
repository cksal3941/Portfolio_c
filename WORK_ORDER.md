# 작업지시서 — 인터랙션 디테일 강화 (5단계)

## 대상 프로젝트

RE:BLIDE 포트폴리오. React 19 + TypeScript + Vite, GSAP 3 + ScrollTrigger가 메인 애니메이션 라이브러리. framer-motion은 `src/components/core/cursor.tsx`에서만 사용 중. 경로 별칭 `@` → `src/`.

빌드/검증 명령:

```bash
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드 (작업 후 반드시 통과 확인)
npm run lint     # oxlint
```

## ⚠️ 절대 건드리지 말 것 (공통 제약)

1. **Hero.tsx의 GSAP 타임라인** — 스크롤 스크럽 시퀀스(이미지 확대 → 서클 와이프 → 아카이브 패널 펼침)는 완성된 상태. 수정 금지.
2. **HorizontalSection.tsx의 패널 리빌 애니메이션** — `.p-label`, `.p-title`, `.p-body`, `.p-visual` 타임라인 리빌이 이미 있음. 여기에 스플릿 리빌을 중복 적용하지 말 것.
3. **클래스명 유지** — `.archive-panel`, `.archive-card`, `.next-section-title`, `.horizontal-panel`은 GSAP이 셀렉터로 참조함. 절대 변경 금지.
4. **디자인 토큰 유지** — 배경 `#f5f5f3`, Anton/Archivo 폰트, 기존 색상·간격·타이포 변경 금지.
5. **모든 신규 애니메이션에 `prefers-reduced-motion: reduce` 체크 필수** — 기존 컴포넌트들(IntroLoader, FooterSection)의 패턴을 따를 것.
6. 각 단계 완료 후 `npm run build` 통과 확인. 순서대로 진행하고 한 단계씩 커밋 권장.

---

## 1단계 — Lenis 부드러운 스크롤 (가장 먼저, 필수)

### 설치

```bash
npm install lenis
```

### 1-1. `src/lib/lenis.ts` 신규 생성

Lenis 인스턴스를 모듈 싱글턴으로 만들어 export. 다른 컴포넌트(IntroLoader, ProjectModal, FooterSection)에서 `lenis.stop()` / `lenis.start()` / `lenis.scrollTo()`를 호출할 수 있어야 함.

```ts
import Lenis from 'lenis'

export const lenis = new Lenis({
  duration: 1.1,
  smoothWheel: true,
})
```

### 1-2. `src/App.tsx`에서 GSAP ticker 연동

```tsx
useEffect(() => {
  lenis.on('scroll', ScrollTrigger.update)
  const raf = (time: number) => lenis.raf(time * 1000)
  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0)
  return () => {
    gsap.ticker.remove(raf)
  }
}, [])
```

`prefers-reduced-motion: reduce`이면 Lenis를 시작하지 않고 네이티브 스크롤 유지 (`lenis.destroy()` 또는 인스턴스 생성 자체를 조건부로).

### 1-3. 충돌 제거 (중요)

- **`src/index.css`의 `html { scroll-behavior: smooth }` 삭제** — Lenis와 충돌함.
- **`IntroLoader.tsx`**: 현재 `document.body.style.overflow = 'hidden'`으로 스크롤을 막고 있음. 이 코드는 유지하되, 인트로 시작 시 `lenis.stop()`, 종료(onDone)와 cleanup에서 `lenis.start()` 추가.
- **`BlankNextSection.tsx`의 `ProjectModal`**: 현재 wheel/touchmove `preventDefault`로 배경 스크롤을 막고 있음. 이 핸들러는 유지하고, 모달 mount 시 `lenis.stop()`, unmount 시 `lenis.start()` 추가. (모달 내부 `overflow-y-auto` 스크롤은 네이티브라 영향 없음)
- **`FooterSection.tsx`의 SCROLL TO TOP 버튼**: `window.scrollTo({ top: 0, behavior: 'smooth' })` → `lenis.scrollTo(0)`으로 교체.

### 검증

- Hero 1200vh 스크럽 구간이 부드럽게 동작하는지
- HorizontalSection 핀 고정이 밀리지 않는지 (Lenis + ScrollTrigger pin은 위 ticker 연동이 정확하면 문제 없음)
- 모달 열렸을 때 배경 스크롤이 완전히 잠기는지
- 인트로 로더 중 스크롤 안 되는지

---

## 2단계 — 스크롤 프로그레스 인디케이터

### `src/components/ScrollProgress.tsx` 신규 생성

- 화면 **최상단에 고정된 2px 높이 바**. 배경색 `#000`, `transform: scaleX()` + `transform-origin: left`로 진행률 표시.
- `position: fixed; top: 0; left: 0; right: 0; z-index: 150` (메뉴 패널 z-200보다 아래, 콘텐츠보다 위).
- GSAP `quickTo` 또는 Lenis의 scroll 이벤트에서 `window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)` 계산해 부드럽게 갱신.
- `pointer-events: none`.
- App.tsx에서 `<IntroLoader />` 아래, 메뉴 버튼 위에 렌더.
- reduced-motion이어도 바 자체는 표시 (애니메이션 보간만 즉시 갱신으로).

---

## 3단계 — 텍스트 스플릿 리빌

### `src/components/core/SplitReveal.tsx` 신규 생성 (재사용 컴포넌트)

- children 텍스트를 **단어 단위**로 쪼개 각 단어를 `overflow: hidden` 래퍼 안의 `inline-block` span으로 감싼다.
- ScrollTrigger로 뷰포트 진입 시 1회 재생: `start: 'top 85%'`, `once: true`.
- 애니메이션: `yPercent: 110 → 0`, `duration: 0.7`, `ease: 'power4.out'`, `stagger: 0.04`.
- GSAP context를 컴포넌트 ref에 스코프하고 unmount 시 `ctx.revert()`.
- reduced-motion이면 스플릿 없이 children 그대로 렌더.

### 적용 대상 (이것만, 다른 곳 적용 금지)

1. **`About.tsx`** — 각 서브섹션의 대형 헤딩(Anton 폰트 대문자 타이틀들). 본문 문단에는 적용하지 말 것.
2. **`FooterSection.tsx`** — 중앙 CTA "LET'S BUILD SOMETHING" (`<br />`로 두 줄이므로 줄 단위 분리 유지에 주의).
3. **`DarkTransition.tsx`** — 하단 `[ EXPLORE THE ARCHIVE ]` 한 줄.

### 적용 금지 대상

- Hero.tsx 전체 (RE:/BLIDE 타이틀 포함 — GSAP 컬러 트윈과 패럴렉스가 걸려 있음)
- HorizontalSection.tsx (자체 리빌 있음)
- MenuPanel.tsx, ProjectModal

---

## 4단계 — 마그네틱 버튼

### `src/hooks/useMagnetic.ts` 신규 생성

- 인자: `strength` (기본 0.3 정도), 반환: ref.
- 요소 bounding box 기준 마우스 상대 위치 × strength 만큼 `gsap.quickTo`로 x/y 이동, `mouseleave` 시 `elastic.out(1, 0.4)` 이징으로 0 복귀.
- 터치 디바이스(`pointer: coarse`)와 reduced-motion에서는 아무것도 하지 않음.

### ⚠️ 핵심 주의사항

**App.tsx 메뉴 버튼은 Tailwind `-translate-y-1/2`로 위치를 잡고 있음.** GSAP이 버튼에 직접 transform을 쓰면 이 translate가 날아가 버튼 위치가 틀어진다. **반드시 버튼 내부에 래퍼 span을 두고 그 래퍼에만 마그네틱 transform을 적용**할 것. FooterSection 링크들도 동일 패턴 권장.

### 적용 대상

1. App.tsx 우측 고정 메뉴 버튼 (strength 약하게: 0.25)
2. FooterSection 하단 이메일 / GITHUB 링크 2개 (0.3)
3. FooterSection SCROLL TO TOP 버튼 (0.3)

---

## 5단계 — About 이미지 호버 통일

`About.tsx`의 이미지들(프로필, 콜라주, 풀블리드)에 아카이브 패널과 동일한 호버 무드 적용:

- 각 이미지를 `overflow: hidden` 컨테이너로 감싸고 (이미 감싸져 있으면 그대로 사용)
- 이미지에 `transition-transform duration-500 ease-out hover:scale-[1.04]` 적용
- CSS만 사용. GSAP 불필요. 레이아웃(크기·비율·위치)은 절대 변하면 안 됨 — overflow hidden 래퍼가 기존 크기를 그대로 유지해야 함.

---

## (선택) 6단계 — 이미지 용량 최적화

`src/images/`의 대형 PNG들(item.png 2.2MB, background2.png 1.8MB, hancom.png 1.6MB, IMG_3572.png 0.9MB)을 WebP로 변환:

```bash
npx sharp-cli --input "src/images/item.png" --output "src/images/item.webp" --format webp --quality 82
```

변환 후 각 컴포넌트의 import 경로를 `.webp`로 교체하고 원본 PNG 삭제. 시각적 열화가 보이면 quality 90으로 재변환. favicon.png은 제외.

---

## 최종 검증 체크리스트

- [ ] `npm run build` 에러 없음
- [ ] `npm run lint` 통과
- [ ] 인트로 로더 재생 중 스크롤 잠김 → 종료 후 부드러운 스크롤 시작
- [ ] Hero 스크럽 시퀀스 전 구간 정상 (이미지 확대 → 서클 와이프 → 패널 펼침)
- [ ] 아카이브 패널 클릭 → 모달 열림 → 배경 스크롤 잠김 → 닫으면 복구
- [ ] HorizontalSection 핀 고정 및 가로 이동 정상
- [ ] 프로그레스 바가 전체 페이지 기준으로 정확히 차오름
- [ ] About 헤딩들이 스크롤 진입 시 한 번만 리빌
- [ ] 메뉴 버튼 위치 안 틀어지고 마그네틱 동작
- [ ] SCROLL TO TOP이 Lenis로 부드럽게 최상단 이동
- [ ] OS 모션 감소 설정 시: Lenis 미적용, 스플릿/마그네틱 비활성, 콘텐츠는 전부 정상 표시
