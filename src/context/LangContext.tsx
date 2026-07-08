import { createContext, useContext, useState, useCallback, useMemo, startTransition, type ReactNode } from 'react'

export type Lang = 'ko' | 'en'

interface LangContextValue {
  lang: Lang
  toggle: () => void
}

const LangContext = createContext<LangContextValue>({ lang: 'ko', toggle: () => {} })

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ko')
  const toggle = useCallback(() => {
    startTransition(() => setLang(l => (l === 'ko' ? 'en' : 'ko')))
  }, [])
  const value = useMemo(() => ({ lang, toggle }), [lang, toggle])
  return (
    <LangContext.Provider value={value}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
