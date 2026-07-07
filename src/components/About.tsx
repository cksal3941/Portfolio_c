const IMG = {
  desk:      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
  notebook:  'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80',
  lab:       'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
  code:      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1000&q=80',
  collab:    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
  figma:     'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
}

const EXPERIENCE = [
  { company: 'KT&G',                                        role: 'Food & Bio Research',      period: '2024.02 — 2026.02' },
  { company: 'Geumsan Ginseng Institute',                   role: 'Food Quality Research',     period: '2022.06 — 2023.01' },
  { company: 'Chungcheongbuk-do Agricultural Services',     role: 'Food Development Research', period: '2020.03 — 2021.10' },
  { company: 'MS Food',                                     role: 'Nutrition Management',      period: '2017.09 — 2018.07' },
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
  { title: 'Structure',    body: '흩어진 정보와 아이디어를 하나의 흐름으로 정리하는 데 관심이 있습니다. 사용자가 이해할 수 있는 순서와 구조를 먼저 고민합니다.' },
  { title: 'Detail',       body: '이미지 배치, 여백, 움직임, 버튼의 위치처럼 사소해 보이는 요소도 사용자의 경험에 영향을 준다고 보고 세심하게 다룹니다.' },
  { title: 'Persistence',  body: '다시 보고 고치며 완성도를 높이는 방식으로 작업합니다. 방향이 흔들릴 때도 전체 구조를 다시 정리하며 결과물로 이어갑니다.' },
  { title: 'Flexibility',  body: 'AI 기반 제작 방식과 프론트엔드 개발을 함께 익히며 변화하는 환경에 맞춰 필요한 역량을 쌓아가고 있습니다.' },
]

export default function About() {
  return (
    <div className="bg-[#f5f5f3] text-black overflow-hidden">

      {/* ── 01. Opening ───────────────────────────────────────────── */}
      <section className="relative min-h-screen px-[8vw] pt-[18vh] pb-[22vh]">
        <p className="text-[10px] tracking-[0.3em] uppercase text-black/35 mb-14">
          Ch.01 — RE:BUILD
        </p>
        <h2
          className="font-black uppercase leading-[0.9] tracking-tighter max-w-[70vw]"
          style={{ fontSize: 'clamp(3rem, 8.5vw, 7.5rem)' }}
        >
          웹을 배우며,<br />
          다시 나의<br />
          일을 설계하고<br />
          있습니다.
        </h2>

        {/* floating image — bottom right */}
        <div className="absolute bottom-0 right-0 w-[clamp(240px,34vw,500px)] translate-y-[18%]">
          <img src={IMG.desk} alt="workspace" className="w-full aspect-[4/3] object-cover" />
          <p className="mt-2 px-1 text-[9px] tracking-[0.2em] uppercase text-black/25">
            Front-end / React / Figma
          </p>
        </div>
      </section>

      {/* ── 02. Scattered collage ─────────────────────────────────── */}
      <section className="relative" style={{ minHeight: '90vh' }}>
        {/* left — tall portrait image, bleeds to edge */}
        <div className="absolute left-0 top-0 w-[36vw]" style={{ height: '62vh' }}>
          <img src={IMG.lab} alt="lab research" className="w-full h-full object-cover" />
        </div>

        {/* right — rotated landscape */}
        <div
          className="absolute right-[6vw]"
          style={{ top: '12vh', width: '33vw', transform: 'rotate(-1.8deg)' }}
        >
          <img src={IMG.notebook} alt="notebook" className="w-full aspect-[4/3] object-cover" />
        </div>

        {/* text block — center, overlaps both images */}
        <div
          className="absolute z-10 bg-[#f5f5f3]/85 backdrop-blur-[2px] p-8 max-w-[340px]"
          style={{ left: '33vw', top: '28vh' }}
        >
          <p className="text-[clamp(0.82rem,1vw,1rem)] leading-[1.95] text-black/65">
            처음부터 웹 개발이나 디자인을 목표로 시작한
            것은 아니었지만, 여러 현장을 지나오며 제가
            반복해서 관심을 두는 일이 무엇인지 알게
            되었습니다.
          </p>
        </div>

        {/* bottom small image — right side, rotated */}
        <div
          className="absolute"
          style={{ bottom: '0vh', left: '40vw', width: '26vw', transform: 'rotate(1.2deg)' }}
        >
          <img src={IMG.collab} alt="collaboration" className="w-full aspect-[3/2] object-cover" />
        </div>
      </section>

      {/* ── 03. Pull quote ───────────────────────────────────────── */}
      <section className="px-[8vw] py-[14vh] border-t border-black/10 mt-[8vh]">
        <p
          className="font-black uppercase leading-[0.95] tracking-tighter text-black"
          style={{ fontSize: 'clamp(2rem, 5.5vw, 5rem)' }}
        >
          "정보를 정리하고,<br />
          필요한 흐름을 만들고,<br />
          보기 쉬운 형태로<br />
          전달하는 일."
        </p>
      </section>

      {/* ── 04. Story columns ────────────────────────────────────── */}
      <section className="px-[8vw] py-[10vh] grid gap-[6vw]" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className="space-y-6 pt-2">
          <p className="text-[clamp(0.82rem,1vw,1rem)] leading-[2] text-black/65">
            연구와 품질 업무에서는 정해진 절차를 이해하고
            반복되는 업무를 정확하게 수행하는 태도를
            익혔습니다. 식품개발과 연구 환경에서는 자료를
            기록하고 정리하며, 작은 과정들이 모여 하나의
            결과로 이어지는 방식을 가까이에서 경험했습니다.
          </p>
          <p className="text-[clamp(0.82rem,1vw,1rem)] leading-[2] text-black/65">
            현재는 그 경험을 웹 작업으로 확장하고 있습니다.
            AI 기반 바이브 코딩과 프론트엔드 개발을 배우며,
            단순히 화면을 만드는 것을 넘어, 사용자가 정보를
            이해하고 행동할 수 있는 흐름을 만드는 데
            관심이 있습니다.
          </p>
        </div>

        <div>
          <img src={IMG.code} alt="code" className="w-full aspect-[4/3] object-cover" />
          <p className="mt-3 text-[9px] tracking-[0.22em] uppercase text-black/25">
            React / GSAP / TypeScript
          </p>
        </div>
      </section>

      {/* ── 05. Full-bleed image break ──────────────────────────── */}
      <div className="w-full overflow-hidden" style={{ height: '55vh' }}>
        <img src={IMG.figma} alt="design process" className="w-full h-full object-cover object-top" />
      </div>

      {/* ── 06. Work Style ───────────────────────────────────────── */}
      <section className="px-[8vw] py-[14vh]">
        <p className="text-[10px] tracking-[0.3em] uppercase text-black/30 mb-16">
          Work Style
        </p>
        <div className="grid gap-x-[8vw] gap-y-12" style={{ gridTemplateColumns: '1fr 1fr' }}>
          {[
            { label: '01 — 먼저 오래 봅니다',   body: '문제를 바로 해결하려고 하기보다, 왜 이 화면이 필요한지, 어떤 흐름으로 사용자가 정보를 이해해야 하는지를 충분히 고민합니다.' },
            { label: '02 — 흐름의 정확성',       body: '빠른 속도보다 흐름의 정확성과 결과물의 설득력을 중요하게 생각합니다. 방향이 잡히면 필요한 요소를 하나씩 정리하고 끝까지 다듬습니다.' },
            { label: '03 — 연결된 작업',          body: '기획, 디자인, 구현, 문서화가 따로 떨어지지 않고 하나의 흐름으로 연결되는 작업을 지향합니다.' },
            { label: '04 — 조용하지만 꾸준하게', body: '느려 보여도 결국 다시 정리하고 완성해가는 방식으로 성장합니다. 부족한 부분을 직접 만들고 확인하면서 고쳐갑니다.' },
          ].map(({ label, body }) => (
            <div key={label} className="border-t border-black/12 pt-6">
              <p className="text-[10px] tracking-[0.2em] uppercase text-black/40 mb-4">{label}</p>
              <p className="text-[clamp(0.8rem,0.95vw,0.98rem)] leading-[1.95] text-black/60">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 07. Strength — black bg ─────────────────────────────── */}
      <section className="bg-black text-white px-[8vw] py-[14vh]">
        <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-16">
          Strength
        </p>
        <div className="grid grid-cols-2 gap-[1px]">
          {STRENGTH.map(({ title, body }) => (
            <div key={title} className="border border-white/8 p-10">
              <p
                className="font-black uppercase tracking-tight leading-none mb-5 text-white"
                style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}
              >
                {title}
              </p>
              <p className="text-[clamp(0.78rem,0.9vw,0.94rem)] leading-[1.95] text-white/45">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 08. Skills ──────────────────────────────────────────── */}
      <section className="px-[8vw] py-[14vh]">
        <p className="text-[10px] tracking-[0.3em] uppercase text-black/30 mb-16">
          Skills
        </p>
        <div className="grid gap-x-[4vw] gap-y-10" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {SKILLS.map(({ cat, items }) => (
            <div key={cat} className="border-t border-black/12 pt-5">
              <p className="text-[9px] tracking-[0.22em] uppercase text-black/35 mb-4">{cat}</p>
              <ul className="space-y-[6px]">
                {items.map(i => (
                  <li key={i} className="text-[clamp(0.78rem,0.9vw,0.93rem)] text-black/65 leading-none">{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── 09. Experience ──────────────────────────────────────── */}
      <section className="px-[8vw] py-[14vh] border-t border-black/10">
        <p className="text-[10px] tracking-[0.3em] uppercase text-black/30 mb-16">
          Experience
        </p>
        <div>
          {EXPERIENCE.map(({ company, role, period }) => (
            <div
              key={company}
              className="flex items-end justify-between border-t border-black/10 py-8"
            >
              <div>
                <p
                  className="font-black uppercase tracking-tight leading-none"
                  style={{ fontSize: 'clamp(1rem, 1.8vw, 1.4rem)' }}
                >
                  {company}
                </p>
                <p className="text-[10px] tracking-[0.16em] uppercase text-black/35 mt-2">{role}</p>
              </div>
              <p className="text-[10px] tracking-[0.16em] uppercase text-black/30">{period}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 10. Epilogue ────────────────────────────────────────── */}
      <section className="min-h-[75vh] px-[8vw] py-[18vh] flex flex-col justify-between border-t border-black/10">
        <p className="text-[10px] tracking-[0.3em] uppercase text-black/30">Epilogue</p>
        <div className="max-w-[700px]">
          <p
            className="font-black uppercase leading-[0.92] tracking-tighter"
            style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}
          >
            이 포트폴리오는<br />
            완벽한 이력서가 아니라,<br />
            다시 만들고 있는<br />
            사람의 기록입니다.
          </p>
          <p className="mt-10 text-[clamp(0.82rem,1vw,1rem)] leading-[2] text-black/55 max-w-[440px]">
            저는 지금도 배우는 중이고, 앞으로도 기획과
            디자인, 구현을 연결하는 작업자로 성장하고자
            합니다.
          </p>
        </div>
        <p className="text-[9px] tracking-[0.24em] uppercase text-black/20">RE:BLIDE — 2025</p>
      </section>

    </div>
  )
}
