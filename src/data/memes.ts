import type { SpriteName } from '../lib/sprites'

/**
 * Textos divertidos do site: adesivos, faixas, dicas da tela de loading,
 * legendas do canal dark, conquistas e a missão de contato.
 * Troquem à vontade, é só texto.
 *
 * Cores disponíveis para adesivos: 'accent' | 'pink' | 'cyan' | 'yellow' | 'white' | 'red' | 'purple'
 */
export type StickerColor = 'accent' | 'pink' | 'cyan' | 'yellow' | 'white' | 'red' | 'purple'

export interface Sticker {
  text?: string
  sprite?: SpriteName
  color?: StickerColor
  /** Posição em % dentro do topo da página e rotação em graus. */
  x: number
  y: number
  rotate: number
  /** Posição alternativa no celular (opcional). */
  mobileX?: number
  mobileY?: number
  /** Esconde no celular para não poluir. */
  desktopOnly?: boolean
}

/** Adesivos arrastáveis no topo da página. */
export const heroStickers: Sticker[] = [
  { text: 'GG EZ', color: 'accent', x: 58, y: 4, rotate: 7 },
  { text: '+1000 de aura', color: 'pink', x: 80, y: 40, rotate: -8, mobileX: 50, mobileY: 34 },
  { text: 'F no chat', color: 'white', x: 2, y: 64, rotate: -6, desktopOnly: true },
  { text: 'skill issue', color: 'cyan', x: 44, y: 70, rotate: 4, desktopOnly: true },
  { text: 'POV: seu vídeo depois da edição', color: 'yellow', x: 66, y: 86, rotate: -3, desktopOnly: true },
  { sprite: 'heart', x: 38, y: 2, rotate: -8 },
  { sprite: 'controller', x: 88, y: 6, rotate: 10, desktopOnly: true },
  { sprite: 'ghost', x: 26, y: 52, rotate: 6 },
  { sprite: 'coin', x: 74, y: 62, rotate: 0, desktopOnly: true },
]

/** Frases das faixas que correm entre as seções. */
export const tickerGames = ['Minecraft', 'Roblox', 'Valorant', 'Fortnite', 'GTA V', 'Terror', 'Canais dark', 'Shorts']
export const tickerMemes = ['GG', 'clipa isso', 'F no chat', 'vine boom', 'respawn', 'é o brabo', 'modo turbo', 'sem lag', 'edita que viraliza']

/** Dicas que alternam na tela de "loading" do portfólio vazio. */
export const loadingTips = [
  'Os 3 primeiros segundos decidem se a pessoa fica no vídeo.',
  'Legenda grande salva quem assiste sem som.',
  'Todo meme precisa de timing. Todo.',
  'Canal dark bom é narração + imagem certa no segundo certo.',
  'Ctrl+S antes de tudo. Confia.',
  'Vine boom não é tempero, é ingrediente.',
]

/** Legendas digitadas no painel de canais dark. */
export const darkCaptions = [
  '[narrador] Ninguém voltou daquela casa...',
  '[porta rangendo]',
  '[música tensa aumenta]',
  'E foi aí que tudo mudou.',
]

export interface Achievement {
  id: string
  title: string
  description: string
  sprite: SpriteName
  /** Conquistas secretas aparecem como "???" até serem desbloqueadas. */
  secret?: boolean
}

/** Conquistas desbloqueadas ao explorar o site. */
export const achievements: Achievement[] = [
  { id: 'portfolio', title: 'Curioso', description: 'Chegou no portfólio', sprite: 'coin' },
  { id: 'especialidades', title: 'Sabe a lore', description: 'Descobriu o que a dupla edita', sprite: 'star' },
  { id: 'editores', title: 'Player select', description: 'Conheceu os editores', sprite: 'controller' },
  { id: 'video', title: 'Cinéfilo', description: 'Abriu um vídeo do portfólio', sprite: 'play' },
  { id: 'contato', title: 'Missão aceita?', description: 'Chegou na missão de contato', sprite: 'sword' },
  { id: 'fim', title: 'GG', description: 'Zerou o site', sprite: 'trophy' },
  { id: 'konami', title: 'Old school', description: 'Usou o código secreto ↑↑↓↓←→←→BA', sprite: 'sparkle', secret: true },
]

/** Missão de contato. */
export const quest = {
  label: 'Missão principal',
  objectives: ['Mandar o link do seu canal', 'Contar o nicho e o formato do vídeo', 'Receber a proposta de edição'],
  reward: 'Recompensa: vídeo editado e +1000 de aura',
}
