const LINKS = [
  { label: 'GitHub', href: 'https://github.com/' },
  { label: 'Email', href: 'mailto:cksal8449@gmail.com' },
]

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Contact</h2>
      <div className="flex gap-6">
        {LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[hsl(var(--accent))] hover:underline"
          >
            {l.label}
          </a>
        ))}
      </div>
    </section>
  )
}
