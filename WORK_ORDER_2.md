# 작업지시서 2 — 콘텐츠 정합성 · 네비게이션 · 최적화

## 대상 프로젝트

RE:BLIDE 포트폴리오. WORK_ORDER.md(1~5단계: Lenis, 프로그레스 바, SplitReveal, 마그네틱, 이미지 호버)는 완료된 상태.
이 지시서는 그 이후 발견된 미완 항목과 개선점을 다룬다.

빌드/검증 명령:

```bash
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드 (각 단계 후 반드시 통과 확인)
npm run lint     # oxlint
```

## ⚠️ 절대 건드리지 말 것 (공통 제약)

1. **Hero.tsx의 GSAP 타임라인** — 수정 금지.
2. **HorizontalSection.tsx의 패널 리빌** — 수정 금지.
3. **클래스명 유지** — `.archive-panel`, `.archive-card`, `.next-section-title`, `.horizontal-panel`, `.about-img-wrap`은 GSAP 셀렉터. 변경 금지.
4. **디자인 토큰 유지** — 배경 `#f5f5f3`/`#efefed`, Anton/Archivo 폰트, 기존 색상·간격 변경 금지.
5. **완료된 인터랙션 유지** — Lenis 싱글턴(`src/lib/lenis.ts`), ScrollProgress, SplitReveal, useMagnetic 패턴을 재사용하고 중복 구현하지 말 것.
6. 모든 신규 애니메이션에 `prefers-reduced-motion: reduce` 체크 필수.
7. 각 단계 완료 후 `npm run build` 통과 확인. 한 단계씩 커밋 권장.

---

## 1단계 — MenuPanel 정비 (최우선)

현재 `MenuPanel.tsx`는 패션 브랜드 템플릿 흔적이 그대로 남아 있고 버튼이 전부 기능 없음.

### 1-1. 카피 교체

| 현재 | 교체 | 비고 |
|---|---|---|
| `Home` | `Home` | 유지 |
| `Collections` | `Work` | 포트폴리오와 무관한 항목 |
| `About` | `About` | 유지 |
| `Stokists` | `Contact` | Stockists 오타 + 무관한 항목 |
| `Inquired ↗` | `Contact ↗` 또는 `Email ↗` | 문법 오류 |

### 1-2. 스크롤 네비게이션 연결

- `App.tsx`의 각 섹션에 앵커 역할을 부여 (예: 섹션 래퍼에 `id` 추가 또는 ref 전달).
- 클릭 시 `lenis.scrollTo(target)` 사용, `lenis`가 `null`이면(모션 감소 환경) `window.scrollTo` 폴백.
- 타깃 매핑:
  - **Home** → `0` (최상단)
  - **Work** → Hero 스크럽 후반부의 아카이브 패널 구간. Hero wrapper는 1100vh 스크럽이므로 `wrapper.offsetTop + wrapper.offsetHeight * 0.85` 근처로 이동 (실제 값은 dev 서버에서 눈으로 보정할 것)
  - **About** → `AboutSection` 시작점
  - **Contact** → `FooterSection` 시작점
- 네비게이션 클릭 시 `onClose()`를 호출해 패널을 닫고 이동. 패널 slide-out(500ms)과 스크롤이 겹쳐도 무방.
- `Inquired ↗` 버튼 → `mailto:cksal8449@gmail.com` 링크 또는 Footer로 스크롤 중 택일.

### 유지할 것

- fill-layer 호버 효과 (`scale-y-0 → scale-y-100`)
- z-index 체계 (패널 200 / 백드롭 190)
- CSS 트랜지션 방식 (GSAP 불필요)

---

## 2단계 — About 갤러리 재배치 + 자기소개 (보류 해제)

`About.tsx`는 완성돼 있으나 `App.tsx`에서 주석 처리로 보류 중
(`// import About ...`, `{/* <About /> */}`).

### 방향 (확정된 논의 내용)

- 위치를 **HorizontalSection 뒤가 아니라 위로** 이동: `Hero → AboutSection → [About 갤러리+소개] → HorizontalSection → ...`
- 갤러리만 있는 현재 구성에 **자기소개 텍스트 블록** 추가 (좌측 텍스트 + 우측 갤러리 또는 상단 텍스트 + 하단 그리드).

### ⚠️ 사용자 결정 필요 (작업 전 반드시 확인)

1. 자기소개 문구 — 이름/한 줄 소개/전환 스토리 요약 등 내용 확정
2. 캡션 `Brand visuals from the After.9 project` 유지 여부
3. 이미지 7장 구성·순서 조정 여부

### 유지할 것

- `.about-img-wrap` clipPath 와이프 리빌 (GSAP, `once: true`)
- `hover:scale-[1.04]` + `overflow:hidden` 이미지 호버
- 헤딩 SplitReveal
- 완료 후 `App.tsx` 주석 해제

---

## 3단계 — 이미지 최적화 (권장, 효과 큼)

새 갤러리 이미지 추가로 대형 PNG가 크게 늘어남. 현재 상위 용량:

| 파일 | 용량 |
|---|---|
| model-shot7.png | 3.1 MB |
| lotionmodel.png | 3.0 MB |
| leftbg.png | 2.4 MB |
| oilhand.png | 2.3 MB |
| Routine Lineup.png | 2.3 MB |
| item.png | 2.2 MB |
| shampoohand.png | 2.2 MB |
| model-shot3.png | 2.1 MB |
| background2.png | 1.8 MB |
| hancom.png | 1.7 MB |
| IMG_3572.png | 1.0 MB |

### 작업

```bash
npx sharp-cli --input "src/images/model-shot7.png" --output "src/images/model-shot7.webp" --format webp --quality 82
# (위 표의 파일 전부 반복)
```

- `Routine Lineup.png`는 공백 포함 → 변환 시 `routine-lineup.webp`로 리네임.
- 변환 후 각 컴포넌트의 import 경로를 `.webp`로 교체하고 원본 PNG 삭제.
- 시각적 열화가 보이면 quality 90으로 재변환.
- **favicon.png (462 KB)**: WebP 변환 대상이 아니라 **리사이즈 대상**. 64×64 PNG로 축소 후 `index.html`의 링크 확인.

### 검증

- 갤러리·마퀴·아카이브 패널·모달의 모든 이미지가 정상 표시
- `npm run build` 후 dist 이미지 합계가 기존 대비 대폭 감소했는지 확인

---

## 4단계 (선택) — 부수 정리

우선순위 낮음. 여유 있을 때만.

1. **`package.json` name 오타**: `fortfolio-c` → `portfolio-c`.
2. **meta 태그**: `index.html`에 `<title>`, `description`, OG 태그(og:title, og:image 등)가 포트폴리오에 맞게 들어있는지 확인, 없으면 추가.
3. **JS 청크 530 kB 경고**: `vite.config`의 `manualChunks`로 gsap/react 벤더 분리 검토. 실사용 성능 문제가 없으면 보류 가능.
4. **framer-motion 의존성**: `src/components/core/cursor.tsx`에서만 사용 중. GSAP으로 대체하면 의존성 하나 제거 가능 — 커서 동작이 동일하게 재현될 때만 진행.

---

## 최종 검증 체크리스트

- [ ] `npm run build` 에러 없음
- [ ] `npm run lint` 통과
- [ ] 메뉴: Home/Work/About/Contact 클릭 시 각 섹션으로 Lenis 스무스 이동 + 패널 자동 닫힘
- [ ] 메뉴에 템플릿 잔재 카피(Collections, Stokists, Inquired) 없음
- [ ] About 갤러리: AboutSection과 HorizontalSection 사이에 렌더, 소개 텍스트 포함
- [ ] 갤러리 clipPath 리빌·호버 정상 동작
- [ ] 모든 이미지 WebP 교체 후 화질·표시 정상
- [ ] OS 모션 감소 설정 시: 메뉴 이동은 즉시 점프(window.scrollTo), 콘텐츠 전부 정상 표시
- [ ] 기존 완료 기능 회귀 없음: Hero 스크럽, HorizontalSection 핀, 모달 스크롤 잠금, 프로그레스 바, 마그네틱, Footer 마퀴
