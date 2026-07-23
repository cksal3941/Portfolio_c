import { AnimatePresence, motion, useMotionValue, useSpring, type Transition, type Variants } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

type CursorProps = {
  children?: ReactNode
  className?: string
  springConfig?: { damping: number; stiffness: number; mass?: number }
  attachToParent?: boolean
  variants?: Variants
  transition?: Transition
  hidden?: boolean
}

export function Cursor({
  children,
  className = '',
  springConfig = { damping: 20, stiffness: 300 },
  attachToParent = false,
  variants,
  transition,
  hidden = false,
}: CursorProps) {
  const anchorRef = useRef<HTMLSpanElement>(null)
  const [visible, setVisible] = useState(!attachToParent)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const parent = anchorRef.current?.parentElement
    if (!parent) return

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    if (attachToParent) {
      const onEnter = () => setVisible(true)
      const onLeave = () => setVisible(false)
      parent.addEventListener('mousemove',  onMove)
      parent.addEventListener('mouseenter', onEnter)
      parent.addEventListener('mouseleave', onLeave)
      return () => {
        parent.removeEventListener('mousemove',  onMove)
        parent.removeEventListener('mouseenter', onEnter)
        parent.removeEventListener('mouseleave', onLeave)
      }
    } else {
      window.addEventListener('mousemove', onMove)
      return () => window.removeEventListener('mousemove', onMove)
    }
  }, [attachToParent, mouseX, mouseY])

  return (
    <>
      <span ref={anchorRef} style={{ display: 'none' }} />
      {createPortal(
        <motion.div
          className={`pointer-events-none fixed left-0 top-0 z-[9999] ${className}`}
          style={{ x: springX, y: springY }}
        >
          <AnimatePresence>
            {visible && !hidden && (
              <motion.div
                variants={variants}
                initial='initial'
                animate='animate'
                exit='exit'
                transition={transition}
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>,
        document.body
      )}
    </>
  )
}
