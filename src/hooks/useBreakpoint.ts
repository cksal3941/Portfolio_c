import { useState, useEffect } from 'react'

export function useBreakpoint() {
  const [width, setWidth] = useState(() => typeof window !== 'undefined' ? window.innerWidth : 1440)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    const update = () => {
      clearTimeout(timer)
      timer = setTimeout(() => setWidth(window.innerWidth), 150)
    }
    setWidth(window.innerWidth)
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('resize', update)
      clearTimeout(timer)
    }
  }, [])
  return {
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isMobileOrTablet: width < 1024,
  }
}
