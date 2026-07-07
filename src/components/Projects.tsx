const PROJECTS = [
  { title: '프로젝트 1', desc: '설명을 작성하세요.', tech: ['React', 'TypeScript'] },
  { title: '프로젝트 2', desc: '설명을 작성하세요.', tech: ['Vite', 'Tailwind'] },
]

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-12">Projects</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {PROJECTS.map((p) => (
          <div key={p.title} className="border border-[hsl(var(--border))] rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
            <p className="text-[hsl(var(--muted))] text-sm mb-4">{p.desc}</p>
            <div className="flex gap-2 flex-wrap">
              {p.tech.map((t) => (
                <span key={t} className="text-xs px-2 py-1 rounded-full border border-[hsl(var(--border))] text-[hsl(var(--muted))]">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
