const IMG = {
  desk:     'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
  notebook: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80',
  lab:      'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
  code:     'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1000&q=80',
  figma:    'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
}

const EXPERIENCE = [
  { company: 'KT&G',                                    role: 'Food & Bio Research',      period: '2024.02 — 2026.02' },
  { company: 'Geumsan Ginseng Institute',               role: 'Food Quality Research',     period: '2022.06 — 2023.01' },
  { company: 'Chungcheongbuk-do Agricultural Services', role: 'Food Development Research', period: '2020.03 — 2021.10' },
  { company: 'MS Food',                                 role: 'Nutrition Management',      period: '2017.09 — 2018.07' },
]

const SKILLS = [
  { cat: 'Front-End',         items: ['HTML', 'CSS', 'JavaScript', 'React'] },
  { cat: 'UI & Publishing',   items: ['Responsive Web', 'CSS Animation', 'Layout Structure', 'Interactive UI'] },
  { cat: 'Design',            items: ['Figma', 'UI Design', 'UX Flow', 'Design System'] },
  { cat: 'AI & Workflow',     items: ['Vibe Coding', 'Prompt Image Gen', 'AI Web Production', 'Design-to-Code'] },
  { cat: 'Backend & Service', items: ['Firebase Auth', 'Firebase DB', 'Board System', 'Cart / Like / Pay'] },
  { cat: 'Documentation',     items: ['GitHub README', 'Project Docs', 'Design Guide'] },
]

const STRENGTH = [
  { title: 'Structure',   body: '흩어진 정보와 아이디어를 하나의 흐름으로 정리합니다. 사용자가 이해할 수 있는 순서와 구조를 먼저 고민합니다.' },
  { title: 'Detail',      body: '이미지 배치, 여백, 움직임, 버튼 위치처럼 사소해 보이는 요소도 사용자 경험에 영향을 준다고 보고 세심하게 다룹니다.' },
  { title: 'Persistence', body: '다시 보고 고치며 완성도를 높이는 방식으로 작업합니다. 전체 구조를 다시 정리하며 결과물로 이어갑니다.' },
  { title: 'Flexibility', body: 'AI 기반 제작 방식과 프론트엔드 개발을 함께 익히며 변화하는 환경에 맞게 필요한 역량을 쌓아가고 있습니다.' },
]

const LABEL_STYLE: React.CSSProperties = {
  fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase', color: '#000',
}

const ANTON: React.CSSProperties = {
  fontFamily: "'Anton', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
}

export default function About() {
  return (
    <div style={{ background: '#efefed', color: '#000', overflow: 'hidden' }}>

      {/* ── 01. Opening ─────────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative', minHeight: '100vh',
          padding: '18vh 8vw 22vh', borderTop: '1px solid #000',
        }}
      >
        <p style={{ ...LABEL_STYLE, marginBottom: '56px' }}>Ch.01 — RE:BUILD</p>

        <h2
          style={{
            ...ANTON,
            fontSize: 'clamp(48px, 8.5vw, 120px)',
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            maxWidth: '70vw',
            margin: 0,
          }}
        >
          웹을 배우며,<br />
          다시 나의<br />
          일을 설계하고<br />
          있습니다.
        </h2>

        <div
          style={{
            position: 'absolute', bottom: 0, right: 0,
            width: 'clamp(240px, 34vw, 500px)',
            transform: 'translateY(18%)',
          }}
        >
          <img src={IMG.desk} alt="workspace" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block', border: '1px solid #000' }} />
          <p style={{ ...LABEL_STYLE, marginTop: '10px', paddingLeft: '2px', color: '#000', opacity: 0.35 }}>
            Front-end / React / Figma
          </p>
        </div>
      </section>

      {/* ── 02. Pull quote ──────────────────────────────────────────── */}
      <section style={{ padding: '14vh 8vw', borderTop: '1px solid #000' }}>
        <h2
          style={{
            ...ANTON,
            fontSize: 'clamp(32px, 5.5vw, 80px)',
            lineHeight: 0.95,
            letterSpacing: '-0.025em',
            textTransform: 'uppercase',
            maxWidth: '760px',
            margin: 0,
          }}
        >
          "정보를 정리하고,<br />
          필요한 흐름을 만들고,<br />
          보기 쉬운 형태로<br />
          전달하는 일."
        </h2>
      </section>

      {/* ── 03. Story columns ───────────────────────────────────────── */}
      <section
        style={{
          padding: '10vh 8vw',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '6vw',
          borderTop: '1px solid #000',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '8px' }}>
          <p style={{ fontSize: '13.5px', lineHeight: 1.95, margin: 0 }}>
            연구와 품질 업무에서는 정해진 절차를 이해하고 반복되는 업무를
            정확하게 수행하는 태도를 익혔습니다. 식품개발과 연구 환경에서는
            자료를 기록하고 정리하며, 작은 과정들이 모여 하나의 결과로
            이어지는 방식을 가까이에서 경험했습니다.
          </p>
          <p style={{ fontSize: '13.5px', lineHeight: 1.95, margin: 0 }}>
            현재는 그 경험을 웹 작업으로 확장하고 있습니다. AI 기반 바이브
            코딩과 프론트엔드 개발을 배우며, 사용자가 정보를 이해하고 행동할
            수 있는 흐름을 만드는 데 관심이 있습니다.
          </p>
        </div>

        <div>
          <img
            src={IMG.code} alt="code"
            style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block', border: '1px solid #000' }}
          />
          <p style={{ ...LABEL_STYLE, marginTop: '10px', opacity: 0.35 }}>React / GSAP / TypeScript</p>
        </div>
      </section>

      {/* ── 04. Full-bleed image ────────────────────────────────────── */}
      <div style={{ width: '100%', height: '55vh', overflow: 'hidden' }}>
        <img src={IMG.figma} alt="design process" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
      </div>

      {/* ── 05. Work Style ──────────────────────────────────────────── */}
      <section style={{ padding: '14vh 8vw', borderTop: '1px solid #000' }}>
        <p style={{ ...LABEL_STYLE, marginBottom: '56px' }}>Work Style</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', border: '1px solid #000' }}>
          {[
            { label: '01', head: '먼저 오래 봅니다',    body: '문제를 바로 해결하려고 하기보다, 왜 이 화면이 필요한지, 어떤 흐름으로 사용자가 정보를 이해해야 하는지를 충분히 고민합니다.' },
            { label: '02', head: '흐름의 정확성',        body: '빠른 속도보다 흐름의 정확성과 결과물의 설득력을 중요하게 생각합니다. 방향이 잡히면 필요한 요소를 하나씩 정리하고 끝까지 다듬습니다.' },
            { label: '03', head: '연결된 작업',           body: '기획, 디자인, 구현, 문서화가 따로 떨어지지 않고 하나의 흐름으로 연결되는 작업을 지향합니다.' },
            { label: '04', head: '조용하지만 꾸준하게', body: '느려 보여도 결국 다시 정리하고 완성해가는 방식으로 성장합니다. 부족한 부분을 직접 만들고 확인하면서 고쳐갑니다.' },
          ].map(({ label, head, body }) => (
            <div key={label} style={{ padding: '40px', borderRight: '1px solid #000', borderBottom: '1px solid #000' }}>
              <p style={{ ...LABEL_STYLE, marginBottom: '16px', opacity: 0.4 }}>{label}</p>
              <p style={{ ...ANTON, fontSize: 'clamp(18px, 2vw, 26px)', textTransform: 'uppercase', margin: '0 0 16px' }}>{head}</p>
              <p style={{ fontSize: '13px', lineHeight: 1.95, margin: 0, opacity: 0.7 }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 06. Strength — black bg ─────────────────────────────────── */}
      <section style={{ background: '#000', color: '#fff', padding: '14vh 8vw' }}>
        <p style={{ ...LABEL_STYLE, color: '#fff', opacity: 0.35, marginBottom: '56px' }}>Strength</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', border: '1px solid rgba(255,255,255,0.12)' }}>
          {STRENGTH.map(({ title, body }) => (
            <div key={title} style={{ padding: '40px', borderRight: '1px solid rgba(255,255,255,0.12)', borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
              <p style={{ ...ANTON, fontSize: 'clamp(22px, 2.5vw, 36px)', textTransform: 'uppercase', letterSpacing: '-0.02em', margin: '0 0 20px', color: '#fff' }}>
                {title}
              </p>
              <p style={{ fontSize: '13px', lineHeight: 1.95, margin: 0, color: 'rgba(255,255,255,0.5)' }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 07. Skills ──────────────────────────────────────────────── */}
      <section style={{ padding: '14vh 8vw', borderTop: '1px solid #000' }}>
        <p style={{ ...LABEL_STYLE, marginBottom: '56px' }}>Skills</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0', border: '1px solid #000' }}>
          {SKILLS.map(({ cat, items }, i) => (
            <div
              key={cat}
              style={{
                padding: '32px',
                borderRight: (i + 1) % 3 !== 0 ? '1px solid #000' : 'none',
                borderBottom: i < SKILLS.length - 3 ? '1px solid #000' : 'none',
              }}
            >
              <p style={{ ...LABEL_STYLE, marginBottom: '20px', opacity: 0.4 }}>{cat}</p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {items.map(item => (
                  <li key={item} style={{ fontSize: '13px', lineHeight: 1.5 }}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── 08. Experience ──────────────────────────────────────────── */}
      <section style={{ padding: '14vh 8vw', borderTop: '1px solid #000' }}>
        <p style={{ ...LABEL_STYLE, marginBottom: '56px' }}>Experience</p>
        <div>
          {EXPERIENCE.map(({ company, role, period }) => (
            <div
              key={company}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
                borderTop: '1px solid #000', padding: '28px 0',
              }}
            >
              <div>
                <p style={{ ...ANTON, fontSize: 'clamp(16px, 1.8vw, 24px)', textTransform: 'uppercase', letterSpacing: '-0.01em', margin: '0 0 8px' }}>
                  {company}
                </p>
                <p style={{ ...LABEL_STYLE, opacity: 0.45 }}>{role}</p>
              </div>
              <p style={{ ...LABEL_STYLE, opacity: 0.4 }}>{period}</p>
            </div>
          ))}
          <div style={{ borderTop: '1px solid #000' }} />
        </div>
      </section>

      {/* ── 09. Epilogue ────────────────────────────────────────────── */}
      <section
        style={{
          minHeight: '75vh', padding: '18vh 8vw',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          borderTop: '1px solid #000',
        }}
      >
        <p style={LABEL_STYLE}>Epilogue</p>
        <div style={{ maxWidth: '700px' }}>
          <h2
            style={{
              ...ANTON,
              fontSize: 'clamp(32px, 5vw, 72px)',
              lineHeight: 0.92,
              letterSpacing: '-0.025em',
              textTransform: 'uppercase',
              margin: '0 0 40px',
            }}
          >
            이 포트폴리오는<br />
            완벽한 이력서가 아니라,<br />
            다시 만들고 있는<br />
            사람의 기록입니다.
          </h2>
          <p style={{ fontSize: '13.5px', lineHeight: 2, maxWidth: '440px', margin: 0 }}>
            저는 지금도 배우는 중이고, 앞으로도 기획과 디자인, 구현을
            연결하는 작업자로 성장하고자 합니다.
          </p>
        </div>
        <p style={{ ...LABEL_STYLE, opacity: 0.25 }}>RE:BLIDE — 2025</p>
      </section>

    </div>
  )
}
