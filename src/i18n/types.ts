import type { EditorId } from '../data/editors'
import type { GameId } from '../data/games'
import type { NicheId } from '../data/niches'
import type { ServiceId } from '../data/services'
import type { SiteConfig } from '../types'

export type Locale = 'pt' | 'en'

/**
 * Formato do arquivo de traduções em inglês (src/data/en.ts).
 * Tudo é opcional por item: o que não tiver tradução aparece em português.
 */
export interface EnglishContent {
  site: {
    description: string
    tagline: string
    headline: string
    heroDescription: string
    contact: { title: string; text: string; whatsappMessage: string; emailSubject: string; fallbackText: string }
    sections: SiteConfig['sections']
    about: SiteConfig['about']
  }
  niches: Partial<Record<NicheId, { name: string; description: string; formats: string[] }>>
  services: Partial<Record<ServiceId, { name: string; description: string; meme?: string }>>
  games: Partial<Record<GameId, { name: string; description?: string }>>
  /** Tradução das categorias livres dos projetos (ex.: 'Vídeo longo' → 'Long-form video'). */
  categories: Record<string, string>
  editors: Partial<Record<EditorId, { tagline?: string; bio?: string }>>
  /** Por `id` do designer em src/data/design.ts. */
  designers: Record<string, { role?: string; tagline?: string; bio?: string; specialties?: string[] }>
  /** Por `id` do projeto em src/data/projects.ts. Títulos ficam como no YouTube se não forem traduzidos. */
  projects: Record<string, { title?: string; description?: string }>
  /** Texto do adesivo em português → texto em inglês. */
  stickers: Record<string, string>
  tickerGames: string[]
  tickerMemes: string[]
  loadingTips: string[]
  darkCaptions: string[]
  /** Por `id` da conquista em src/data/memes.ts. */
  achievements: Record<string, { title: string; description: string }>
  quest: { label: string; objectives: string[]; reward: string }
}
