import type { Game } from '../types'

/**
 * Jogos disponíveis para os projetos e para a seção "O que editamos" (cartuchos).
 *
 * - `color`: cor do cartucho (qualquer cor CSS).
 * - `sprite`: desenho em pixel art (veja os nomes em src/components/art/PixelSprite.tsx).
 * - `image` (opcional): caminho em public/ (ex.: 'images/games/minecraft.jpg') ou URL.
 *   Se preenchido, aparece no lugar do sprite. Use prints dos vídeos de vocês.
 * - `description` (opcional): texto curto.
 * - `showOnSite: false` esconde o jogo da seção.
 *
 * Para criar um jogo novo, adicione um objeto com um `id` único em minúsculas.
 */
export const games = [
  { id: 'minecraft', name: 'Minecraft', color: '#5bd45b', sprite: 'block', showOnSite: true },
  { id: 'roblox', name: 'Roblox', color: '#ff5c5c', sprite: 'blocky', showOnSite: true },
  { id: 'valorant', name: 'Valorant', color: '#ff4d6d', sprite: 'crosshair', showOnSite: true },
  { id: 'fortnite', name: 'Fortnite', color: '#9b6bff', sprite: 'parachute', showOnSite: true },
  { id: 'gta-v', name: 'GTA V', color: '#ff8a3d', sprite: 'car', showOnSite: true },
  { id: 'terror', name: 'Jogos de terror', color: '#b4b4b4', sprite: 'ghost', showOnSite: true },
  { id: 'outros', name: 'Outros jogos', color: '#4fe3ff', sprite: 'controller', showOnSite: true },
] as const satisfies readonly Game[]

export type GameId = (typeof games)[number]['id']
