import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { getContent } from './content'
import { detectLocale, I18nContext, STORAGE_KEY } from './context'
import type { Locale } from './types'
import { ui } from './ui'

/** Guarda o idioma escolhido e entrega textos e conteúdo traduzidos para o site. */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectLocale)

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Sem armazenamento: o idioma vale só nesta visita.
    }
  }, [])

  const value = useMemo(() => ({ locale, setLocale, t: ui[locale], c: getContent(locale) }), [locale, setLocale])

  useEffect(() => {
    document.documentElement.lang = locale === 'pt' ? 'pt-BR' : 'en'
    document.title = `${value.c.site.name} — ${value.c.site.tagline}`
  }, [locale, value])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
