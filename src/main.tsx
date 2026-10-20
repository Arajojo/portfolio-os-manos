import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { site } from './data/site'
import { validateContent } from './lib/content'
import './index.css'

document.documentElement.style.setProperty('--accent', site.accentColor)

if (import.meta.env.DEV) {
  for (const issue of validateContent()) console.warn(`[Os Manos] ${issue}`)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
