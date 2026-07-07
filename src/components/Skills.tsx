const SKILLS = ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Vite', 'HTML/CSS', 'Git']

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Skills</h2>
      <div className="flex flex-wrap gap-3">
        {SKILLS.map((s) => (
          <span key={s} className="px-4 py-2 rounded-full border border-[hsl(var(--border))] text-sm">
            {s}
          </span>
        ))}
      </div>
    </section>
  )
}
