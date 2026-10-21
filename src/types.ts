import type { SpriteName } from './lib/sprites'
import type { EditorId } from './data/editors'
import type { GameId } from './data/games'
import type { NicheId } from './data/niches'
import type { ServiceId } from './data/services'

export type { EditorId, GameId, NicheId, ServiceId }

/** Proporção do vídeo. Horizontal (16:9) é o padrão; Shorts usam 9:16. */
export type AspectRatio = '16:9' | '9:16' | '4:5' | '1:1'

export interface Project {
  /** Identificador único (não aparece no site). */
  id: string
  title: string
  /** Usado no link direto do projeto (?projeto=slug). Apenas letras minúsculas, números e hífens. */
  slug: string
  description?: string
  /** Link do YouTube: youtube.com/watch?v=…, youtu.be/… ou youtube.com/shorts/… */
  youtubeUrl?: string
  /** Caminho em public/ (ex.: "images/projects/meu-video.jpg") ou URL. Se vazio, usa a thumbnail do YouTube. */
  thumbnail?: string
  /** 'gaming' ou 'dark' (src/data/niches.ts). Se vazio e houver jogo, conta como 'gaming'. */
  niche?: NicheId
  /** ID de um jogo de src/data/games.ts */
  game?: GameId
  /** Texto livre, ex.: "Vídeo longo", "Short", "Série", "Highlights". */
  category?: string
  /** ID de uma especialidade de src/data/services.ts */
  editingStyle?: ServiceId
  /** "pato" ou "trollchu" (src/data/editors.ts) */
  editorId?: EditorId
  /** Projetos em destaque ocupam mais espaço na galeria. */
  featured?: boolean
  /** Só projetos com published: true aparecem no site. */
  published: boolean
  aspectRatio?: AspectRatio
  /** Ordem de exibição (menor primeiro). */
  order?: number
}

export interface LinkItem {
  label: string
  url: string
}

export interface Editor {
  id: string
  displayName: string
  /** Arroba exatamente como no YouTube, com "@". */
  handle: string
  /** Caminho em public/ (ex.: "images/editors/pato.jpg") ou URL. */
  photo?: string
  channelUrl: string
  /** Frase curta opcional exibida acima da bio. */
  tagline?: string
  bio?: string
  specialties?: readonly ServiceId[]
  games?: readonly GameId[]
  socials?: readonly LinkItem[]
}

/** Integrante da equipe que não é editor (ex.: designer). */
export interface TeamMember {
  id: string
  displayName: string
  /** Arroba exatamente como no perfil, com "@". */
  handle: string
  /** Caminho em public/ (ex.: "images/team/leo.jpg") ou URL. */
  photo?: string
  /** Texto à direita no topo do card (ex.: "Designer"). */
  role: string
  /** Cor do card (qualquer cor CSS). Sem ela, segue a cor do próximo player. */
  color?: string
  /** Botão principal do card (ex.: Instagram). */
  profile: LinkItem
  tagline?: string
  bio?: string
  /** Especialidades em texto livre. */
  specialties?: readonly string[]
  socials?: readonly LinkItem[]
}

export interface Game {
  id: string
  name: string
  /** Cor do cartucho na seção "O que editamos". */
  color?: string
  /** Pixel art do cartucho. */
  sprite?: SpriteName
  image?: string
  description?: string
  /** false esconde o jogo da seção Especialidades (ele continua disponível para projetos). */
  showOnSite: boolean
}

export interface Niche {
  id: string
  name: string
  description: string
  formats: readonly string[]
  showOnSite: boolean
}

export interface Service {
  id: string
  name: string
  description: string
  /** Pixel art do card. */
  sprite?: SpriteName
  /** Legenda de meme que aparece ao passar o mouse. */
  meme?: string
  order: number
  showOnSite: boolean
}

export interface SiteConfig {
  name: string
  description: string
  tagline: string
  headline: string
  heroDescription: string
  accentColor: string
  url: string
  ogImage: string
  contact: {
    title: string
    text: string
    whatsapp: string
    whatsappMessage: string
    email: string
    emailSubject: string
    instagram: string
    others: LinkItem[]
    fallbackText: string
  }
  socials: LinkItem[]
  sections: {
    portfolio: { title: string; intro: string }
    specialties: { title: string; intro: string }
    editors: { title: string; intro: string }
    design: { title: string; intro: string }
    about: { title: string }
  }
  about: {
    intro: string
    history: string
    vision: string
    process: string[]
    idealCreator: string
    differentials: string[]
  }
}
