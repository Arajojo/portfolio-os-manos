import { createContext, useContext } from 'react'
import { getContent, type LocalizedContent } from './content'
import type { Locale } from './types'
import { ui, type UiStrings } from './ui'

export const STORAGE_KEY = 'os-manos:idioma'

export interface I18n {
  locale: Locale
  setLocale: (locale: Locale) => void
  /** Textos fixos da interface. */
  t: UiStrings
  /** Conteúdo do site (dados) no idioma escolhido. */
  c: LocalizedContent
}

export const I18nContext = createContext<I18n>({ locale: 'pt', setLocale: () => {}, t: ui.pt, c: getContent('pt') })

export function useI18n(): I18n {
  return useContext(I18nContext)
}

/** Idioma inicial: ?lang= na URL > escolha salva > idioma do navegador (português → PT, outros → EN). */
export function detectLocale(): Locale {
  const fromUrl = new URLSearchParams(window.location.search).get('lang')
  if (fromUrl === 'pt' || fromUrl === 'en') return fromUrl
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'pt' || saved === 'en') return saved
  } catch {
    // Sem armazenamento: segue para o idioma do navegador.
  }
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language]
  return languages.some((language) => language?.toLowerCase().startsWith('pt')) ? 'pt' : 'en'
}
