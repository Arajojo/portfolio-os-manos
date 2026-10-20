import { editors } from '../data/editors'
import { games } from '../data/games'
import { niches } from '../data/niches'
import { projects } from '../data/projects'
import { services } from '../data/services'
import type { AspectRatio, Editor, Game, Niche, Project, Service } from '../types'
import { resolveAsset } from './assets'
import { isShortsUrl, parseYouTubeId, getYouTubeThumbnail } from './youtube'

const editorsById = new Map<string, Editor>(editors.map((editor) => [editor.id, editor]))
const gamesById = new Map<string, Game>(games.map((game) => [game.id, game]))
const servicesById = new Map<string, Service>(services.map((service) => [service.id, service]))
const nichesById = new Map<string, Niche>(niches.map((niche) => [niche.id, niche]))

/** Fonte única dos dados de um editor. Retorna undefined para IDs ausentes ou inválidos. */
export function getEditor(id?: string | null): Editor | undefined {
  return id ? editorsById.get(id) : undefined
}

export function getGame(id?: string | null): Game | undefined {
  return id ? gamesById.get(id) : undefined
}

export function getNiche(id?: string | null): Niche | undefined {
  return id ? nichesById.get(id) : undefined
}

export function getService(id?: string | null): Service | undefined {
  return id ? servicesById.get(id) : undefined
}

export function sortProjects(list: readonly Project[]): Project[] {
  return [...list].sort((a, b) => {
    const order = (a.order ?? Number.POSITIVE_INFINITY) - (b.order ?? Number.POSITIVE_INFINITY)
    if (order !== 0 && !Number.isNaN(order)) return order
    return Number(Boolean(b.featured)) - Number(Boolean(a.featured))
  })
}

export function getPublishedProjects(list: readonly Project[] = projects): Project[] {
  return sortProjects(
    list
      .filter((project) => project.published === true)
      // Projeto com jogo e sem nicho conta como YouTube Gaming.
      .map((project) => (project.niche || !project.game ? project : { ...project, niche: 'gaming' as const })),
  )
}

export function getAspectRatio(project: Project): AspectRatio {
  if (project.aspectRatio) return project.aspectRatio
  return isShortsUrl(project.youtubeUrl) ? '9:16' : '16:9'
}

export function isVertical(ratio: AspectRatio): boolean {
  return ratio === '9:16' || ratio === '4:5'
}

/** Thumbnails candidatas, em ordem: a imagem informada e, em seguida, a do YouTube. */
export function getThumbnailSources(project: Project): string[] {
  const sources: string[] = []
  const custom = resolveAsset(project.thumbnail)
  if (custom) sources.push(custom)
  const videoId = parseYouTubeId(project.youtubeUrl)
  const fromYouTube = videoId ? getYouTubeThumbnail(videoId) : null
  if (fromYouTube) sources.push(fromYouTube)
  return sources
}

interface ContentData {
  projects: readonly Project[]
  editors: readonly Editor[]
  games: readonly Game[]
  services: readonly Service[]
  niches?: readonly Niche[]
}

/**
 * Confere as referências entre os arquivos de dados.
 * Em desenvolvimento os problemas aparecem no console; os testes falham se houver algum.
 */
export function validateContent(data: ContentData = { projects, editors, games, services, niches }): string[] {
  const issues: string[] = []
  const editorIds = new Set(data.editors.map((editor) => editor.id))
  const gameIds = new Set(data.games.map((game) => game.id))
  const serviceIds = new Set(data.services.map((service) => service.id))
  const nicheIds = new Set((data.niches ?? niches).map((niche) => niche.id))

  const findDuplicates = (values: string[]) => values.filter((value, index) => values.indexOf(value) !== index)

  for (const id of findDuplicates(data.projects.map((project) => project.id))) issues.push(`Projeto com id duplicado: "${id}"`)
  for (const slug of findDuplicates(data.projects.map((project) => project.slug))) issues.push(`Projeto com slug duplicado: "${slug}"`)
  for (const id of findDuplicates(data.editors.map((editor) => editor.id))) issues.push(`Editor com id duplicado: "${id}"`)

  for (const editor of data.editors) {
    if (!editor.handle.startsWith('@')) issues.push(`Editor "${editor.id}": o arroba deve começar com "@"`)
    if (!/^https:\/\//.test(editor.channelUrl)) issues.push(`Editor "${editor.id}": channelUrl deve começar com https://`)
  }

  for (const project of data.projects) {
    const label = `Projeto "${project.id}"`
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug)) issues.push(`${label}: slug inválido "${project.slug}"`)
    if (project.editorId && !editorIds.has(project.editorId)) issues.push(`${label}: editorId desconhecido "${project.editorId}"`)
    if (project.niche && !nicheIds.has(project.niche)) issues.push(`${label}: nicho desconhecido "${project.niche}"`)
    if (project.game && !gameIds.has(project.game)) issues.push(`${label}: jogo desconhecido "${project.game}"`)
    if (project.editingStyle && !serviceIds.has(project.editingStyle))
      issues.push(`${label}: estilo de edição desconhecido "${project.editingStyle}"`)
    if (project.youtubeUrl && !parseYouTubeId(project.youtubeUrl))
      issues.push(`${label}: youtubeUrl não reconhecida "${project.youtubeUrl}"`)
    if (project.published && !project.thumbnail && !parseYouTubeId(project.youtubeUrl))
      issues.push(`${label}: publicado sem thumbnail e sem vídeo do YouTube válido`)
  }

  return issues
}
