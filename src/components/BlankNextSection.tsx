type BlankNextSectionProps = {
  className?: string
}

const WORK_PANELS = [
  {
    title: 'BLUE SHELL COAT',
    artwork: 'bg-[#1d315d]',
    accent: 'bg-[#94c7a2]',
  },
  {
    title: 'LIME FIELD JACKET',
    artwork: 'bg-[#55b720]',
    accent: 'bg-[#d7efc9]',
  },
  {
    title: 'AQUA WRAP PIECE',
    artwork: 'bg-[#3a8fa0]',
    accent: 'bg-[#d4c0a0]',
  },
  {
    title: 'SOFT KNIT ARCHIVE',
    artwork: 'bg-[#d5c9b6]',
    accent: 'bg-[#f4eee3]',
  },
  {
    title: 'BURGUNDY COAT STUDY',
    artwork: 'bg-[#6e1f29]',
    accent: 'bg-[#a25460]',
  },
  {
    title: 'GOLDEN LOAF PUFFER',
    artwork: 'bg-[#e7c78a]',
    accent: 'bg-[#fff0c7]',
  },
  {
    title: 'PINK VOLUME COAT',
    artwork: 'bg-[#ed9cbd]',
    accent: 'bg-[#ffd9e8]',
  },
  {
    title: 'SAND TAILORED SET',
    artwork: 'bg-[#c49245]',
    accent: 'bg-[#f0dfbd]',
  },
]

function WorkArtwork({
  artwork = 'bg-[#1d315d]',
  accent = 'bg-[#94c7a2]',
}: {
  artwork?: string
  accent?: string
}) {
  return (
    <div className="absolute inset-[12%] flex items-center justify-center">
      <div className={`absolute right-[8%] top-[24%] h-[48%] w-[34%] rotate-[-12deg] rounded-[48%] opacity-35 blur-[1px] ${accent}`} />
      <div className={`relative h-[72%] w-[54%] rounded-t-[45%] rounded-b-[18%] opacity-90 shadow-sm ${artwork}`}>
        <div className="absolute left-[11%] top-[18%] h-[58%] w-[18%] -rotate-[12deg] rounded-full bg-black/10" />
        <div className="absolute right-[11%] top-[18%] h-[58%] w-[18%] rotate-[12deg] rounded-full bg-black/10" />
        <div className="absolute left-1/2 top-[8%] h-[30%] w-[16%] -translate-x-1/2 rounded-b-full bg-white/25" />
        <div className="absolute left-1/2 top-[22%] h-[62%] w-px -translate-x-1/2 bg-white/25" />
      </div>
    </div>
  )
}

export default function BlankNextSection({ className = '' }: BlankNextSectionProps) {
  return (
    <section
      aria-label="Next section"
      className={`relative h-screen overflow-hidden bg-[#f3f3f1] ${className}`}
    >
      <h2 className="next-section-title absolute left-[8.5vw] top-[21vh] text-[clamp(1rem,1.45vw,1.75rem)] font-black uppercase leading-none text-black">
        RE:BLIDE OFF [ GRID ]
      </h2>

      <div className="archive-panels absolute inset-0">
        {WORK_PANELS.map((panel) => (
          <div
            key={panel.title}
            className="archive-panel group absolute left-[55vw] top-[57vh] w-[clamp(170px,13vw,250px)] -translate-x-1/2 -translate-y-1/2 hover:z-[100]"
          >
            <div className="relative aspect-[3/4] border border-black/50 bg-white/20 transition duration-200 ease-out group-hover:-translate-y-1 group-hover:border-black/80 group-hover:bg-white/35">
              <div className="opacity-80 transition duration-200 ease-out group-hover:opacity-100">
                <WorkArtwork artwork={panel.artwork} accent={panel.accent} />
              </div>

              <span className="pointer-events-none absolute left-[58%] top-[58%] z-30 whitespace-nowrap bg-black/65 px-2 py-1 text-[clamp(0.55rem,0.7vw,0.8rem)] font-black uppercase leading-none text-white opacity-0 transition duration-150 ease-out group-hover:opacity-100">
                {panel.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
