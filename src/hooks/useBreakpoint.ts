import { useState, useEffect } from 'react'

export function useBreakpoint() {
  const [width, setWidth] = useState(() => typeof window !== 'undefined' ? window.innerWidth : 1440)
  useEffect(() => {
    const update = () => setWidth(window.innerWidth)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return {
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isMobileOrTablet: width < 1024,
  }
}
