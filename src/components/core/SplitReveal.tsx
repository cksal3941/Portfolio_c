import { useEffect, useRef, type ReactNode, type CSSProperties } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Props = {
  children: ReactNode
  as?: keyof React.JSX.IntrinsicElements
  style?: CSSProperties
  className?: string
}

export default function SplitReveal({ children, as: Tag = 'div', style, className }: Props) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const el = containerRef.current
    if (!el) return

    const wordInners: HTMLElement[] = []

    function wrapWords(node: Node) {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent ?? ''
        if (!text.trim()) return
        const parts = text.split(/(\s+)/)
        const frag = document.createDocumentFragment()
        parts.forEach(part => {
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part))
          } else if (part) {
            const wrapper = document.createElement('span')
            wrapper.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:bottom;'
            const inner = document.createElement('span')
            inner.style.display = 'inline-block'
            inner.textContent = part
            wrapper.appendChild(inner)
            frag.appendChild(wrapper)
            wordInners.push(inner)
          }
        })
        node.parentNode!.replaceChild(frag, node)
      } else if (node.nodeType === Node.ELEMENT_NODE && (node as Element).tagName !== 'BR') {
        Array.from(node.childNodes).forEach(wrapWords)
      }
    }

    Array.from(el.childNodes).forEach(wrapWords)
    gsap.set(wordInners, { yPercent: 110 })

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(wordInners, {
            yPercent: 0,
            duration: 0.7,
            ease: 'power4.out',
            stagger: 0.04,
          })
        },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  const El = Tag as React.ElementType
  return <El ref={containerRef} style={style} className={className}>{children}</El>
}
