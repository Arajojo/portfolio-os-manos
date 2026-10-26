import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { site } from './data/site'
import { findMissingTranslations } from './i18n/content'
import { LocaleProvider } from './i18n/LocaleProvider'
import { validateContent } from './lib/content'
import './index.css'

document.documentElement.style.setProperty('--accent', site.accentColor)

if (import.meta.env.DEV) {
  for (const issue of validateContent()) console.warn(`[Os Manos] ${issue}`)
  for (const item of findMissingTranslations()) console.warn(`[Os Manos] Falta tradução em src/data/en.ts: ${item}`)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </StrictMode>,
)
