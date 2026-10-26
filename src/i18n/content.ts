import { designers } from '../data/design'
import { editors } from '../data/editors'
import { en } from '../data/en'
import { games } from '../data/games'
import { achievements, darkCaptions, heroStickers, loadingTips, quest, tickerGames, tickerMemes, type Achievement, type Sticker } from '../data/memes'
import { niches } from '../data/niches'
import { projects } from '../data/projects'
import { services } from '../data/services'
import { site } from '../data/site'
import type { Editor, Game, Niche, Project, Service, SiteConfig, TeamMember } from '../types'
import type { Locale } from './types'

/** Conteúdo do site já no idioma escolhido. */
export interface LocalizedContent {
  site: SiteConfig
  niches: Niche[]
  services: Service[]
  games: Game[]
  editors: Editor[]
  designers: TeamMember[]
  heroStickers: Sticker[]
  tickerGames: string[]
  tickerMemes: string[]
  loadingTips: string[]
  darkCaptions: string[]
  achievements: Achievement[]
  quest: { label: string; objectives: string[]; reward: string }
  gameName: (id?: string | null) => string | undefined
  serviceName: (id?: string | null) => string | undefined
  nicheName: (id?: string | null) => string | undefined
  category: (value?: string | null) => string | undefined
  /** Projeto com descrição (e título, se traduzido) no idioma escolhido. */
  project: (project: Project) => Project
}

/** Usa a tradução só quando o texto em português existe; campo vazio continua vazio. */
function text(original: string | undefined, translated: string | undefined): string | undefined {
  if (!original?.trim()) return original
  return translated?.trim() ? translated : original
}

function list<T>(original: readonly T[], translated: readonly T[] | undefined): T[] {
  if (original.length === 0) return []
  return translated && translated.length > 0 ? [...translated] : [...original]
}

function createContent(english: boolean): LocalizedContent {
  const editorList: readonly Editor[] = editors
  const t = english ? en : undefined

  const localizedSite: SiteConfig = t
    ? {
        ...site,
        description: text(site.description, t.site.description) ?? '',
        tagline: text(site.tagline, t.site.tagline) ?? '',
        headline: text(site.headline, t.site.headline) ?? '',
        heroDescription: text(site.heroDescription, t.site.heroDescription) ?? '',
        contact: {
          ...site.contact,
          title: text(site.contact.title, t.site.contact.title) ?? '',
          text: text(site.contact.text, t.site.contact.text) ?? '',
          whatsappMessage: text(site.contact.whatsappMessage, t.site.contact.whatsappMessage) ?? '',
          emailSubject: text(site.contact.emailSubject, t.site.contact.emailSubject) ?? '',
          fallbackText: text(site.contact.fallbackText, t.site.contact.fallbackText) ?? '',
        },
        sections: {
          portfolio: {
            title: text(site.sections.portfolio.title, t.site.sections.portfolio.title) ?? '',
            intro: text(site.sections.portfolio.intro, t.site.sections.portfolio.intro) ?? '',
          },
          specialties: {
            title: text(site.sections.specialties.title, t.site.sections.specialties.title) ?? '',
            intro: text(site.sections.specialties.intro, t.site.sections.specialties.intro) ?? '',
          },
          editors: {
            title: text(site.sections.editors.title, t.site.sections.editors.title) ?? '',
            intro: text(site.sections.editors.intro, t.site.sections.editors.intro) ?? '',
          },
          design: {
            title: text(site.sections.design.title, t.site.sections.design.title) ?? '',
            intro: text(site.sections.design.intro, t.site.sections.design.intro) ?? '',
          },
          about: { title: text(site.sections.about.title, t.site.sections.about.title) ?? '' },
        },
        about: {
          intro: text(site.about.intro, t.site.about.intro) ?? '',
          history: text(site.about.history, t.site.about.history) ?? '',
          vision: text(site.about.vision, t.site.about.vision) ?? '',
          process: list(site.about.process, t.site.about.process),
          idealCreator: text(site.about.idealCreator, t.site.about.idealCreator) ?? '',
          differentials: list(site.about.differentials, t.site.about.differentials),
        },
      }
    : site

  const localizedNiches: Niche[] = niches.map((niche) => {
    const tr = t?.niches[niche.id]
    return {
      ...niche,
      name: text(niche.name, tr?.name) ?? niche.name,
      description: text(niche.description, tr?.description) ?? niche.description,
      formats: list(niche.formats, tr?.formats),
    }
  })

  const localizedServices: Service[] = services.map((service) => {
    const tr = t?.services[service.id]
    return {
      ...service,
      name: text(service.name, tr?.name) ?? service.name,
      description: text(service.description, tr?.description) ?? service.description,
      meme: text(service.meme, tr?.meme),
    }
  })

  const localizedGames: Game[] = games.map((game) => {
    const tr = t?.games[game.id]
    return { ...game, name: text(game.name, tr?.name) ?? game.name, description: text(undefined, tr?.description) }
  })

  const localizedEditors: Editor[] = editorList.map((editor) => {
    const tr = t?.editors[editor.id as keyof typeof en.editors]
    return { ...editor, tagline: text(editor.tagline, tr?.tagline), bio: text(editor.bio, tr?.bio) }
  })

  const localizedDesigners: TeamMember[] = designers.map((designer) => {
    const tr = t?.designers[designer.id]
    return {
      ...designer,
      role: text(designer.role, tr?.role) ?? designer.role,
      tagline: text(designer.tagline, tr?.tagline),
      bio: text(designer.bio, tr?.bio),
      specialties: list(designer.specialties ?? [], tr?.specialties),
    }
  })

  const nameMap = (items: { id: string; name: string }[]) => {
    const map = new Map(items.map((item) => [item.id, item.name]))
    return (id?: string | null) => (id ? map.get(id) : undefined)
  }

  return {
    site: localizedSite,
    niches: localizedNiches,
    services: localizedServices,
    games: localizedGames,
    editors: localizedEditors,
    designers: localizedDesigners,
    heroStickers: heroStickers.map((sticker) => (sticker.text && t ? { ...sticker, text: t.stickers[sticker.text] ?? sticker.text } : sticker)),
    tickerGames: list(tickerGames, t?.tickerGames),
    tickerMemes: list(tickerMemes, t?.tickerMemes),
    loadingTips: list(loadingTips, t?.loadingTips),
    darkCaptions: list(darkCaptions, t?.darkCaptions),
    achievements: achievements.map((achievement) => {
      const tr = t?.achievements[achievement.id]
      return { ...achievement, title: text(achievement.title, tr?.title) ?? achievement.title, description: text(achievement.description, tr?.description) ?? achievement.description }
    }),
    quest: t ? { ...t.quest, objectives: list(quest.objectives, t.quest.objectives) } : quest,
    gameName: nameMap(localizedGames),
    serviceName: nameMap(localizedServices),
    nicheName: nameMap(localizedNiches),
    category: (value) => (value && t ? (t.categories[value] ?? value) : (value ?? undefined)),
    project: (project) => {
      const tr = t?.projects[project.id]
      if (!tr) return project
      return { ...project, title: text(project.title, tr.title) ?? project.title, description: text(project.description, tr.description) }
    },
  }
}

const portuguese = createContent(false)
const english = createContent(true)

export function getContent(locale: Locale): LocalizedContent {
  return locale === 'en' ? english : portuguese
}

/** Lista o que ainda não tem tradução em src/data/en.ts (aviso em desenvolvimento). */
export function findMissingTranslations(): string[] {
  const missing: string[] = []
  for (const niche of niches) if (!en.niches[niche.id]) missing.push(`nicho "${niche.id}"`)
  for (const service of services) if (!en.services[service.id]) missing.push(`estilo "${service.id}"`)
  for (const game of games) if (!en.games[game.id]) missing.push(`jogo "${game.id}"`)
  for (const achievement of achievements) if (!en.achievements[achievement.id]) missing.push(`conquista "${achievement.id}"`)
  for (const editor of editors as readonly Editor[]) {
    const tr = en.editors[editor.id as keyof typeof en.editors]
    if ((editor.bio?.trim() && !tr?.bio) || (editor.tagline?.trim() && !tr?.tagline)) missing.push(`editor "${editor.id}"`)
  }
  for (const designer of designers) if ((designer.bio?.trim() || designer.tagline?.trim()) && !en.designers[designer.id]) missing.push(`designer "${designer.id}"`)
  for (const project of projects) if (project.published && project.description?.trim() && !en.projects[project.id]?.description) missing.push(`projeto "${project.id}"`)
  for (const project of projects) if (project.category && !(project.category in en.categories)) missing.push(`categoria "${project.category}"`)
  for (const sticker of heroStickers) if (sticker.text && !(sticker.text in en.stickers)) missing.push(`adesivo "${sticker.text}"`)
  return [...new Set(missing)]
}
