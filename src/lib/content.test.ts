import { describe, expect, it } from 'vitest'
import { editors } from '../data/editors'
import { games } from '../data/games'
import { services } from '../data/services'
import type { Project } from '../types'
import { getAspectRatio, getEditor, getPublishedProjects, getThumbnailSources, validateContent } from './content'
import { applyFilters, getFacetOptions } from './filters'

const sample: Project[] = [
  { id: 'a', slug: 'a', title: 'A', game: 'minecraft', category: 'Vídeo longo', editingStyle: 'humor', editorId: 'pato', published: true, order: 2 },
  { id: 'b', slug: 'b', title: 'B', game: 'minecraft', category: 'Short', editingStyle: 'shorts', editorId: 'trollchu', published: true, order: 1 },
  { id: 'c', slug: 'c', title: 'C', game: 'valorant', category: 'Vídeo longo', editingStyle: 'humor', editorId: 'trollchu', published: true, order: 3 },
  { id: 'd', slug: 'd', title: 'D', game: 'roblox', editorId: 'pato', published: false },
]

describe('editores', () => {
  it('mantém os dados exatos dos integrantes', () => {
    expect(getEditor('pato')).toMatchObject({ handle: '@PatoJoga_ofc', channelUrl: 'https://www.youtube.com/@PatoJoga_ofc' })
    expect(getEditor('trollchu')).toMatchObject({ handle: '@Trollchu', channelUrl: 'https://www.youtube.com/@Trollchu' })
  })

  it('não inventa autoria para IDs ausentes ou inválidos', () => {
    expect(getEditor(undefined)).toBeUndefined()
    expect(getEditor('')).toBeUndefined()
    expect(getEditor('fulano')).toBeUndefined()
  })
})

describe('projetos', () => {
  it('mostra apenas publicados, em ordem', () => {
    expect(getPublishedProjects(sample).map((p) => p.id)).toEqual(['b', 'a', 'c'])
  })

  it('usa 9:16 para Shorts sem aspectRatio', () => {
    expect(getAspectRatio({ id: 's', slug: 's', title: 'S', published: true, youtubeUrl: 'https://youtube.com/shorts/dQw4w9WgXcQ' })).toBe('9:16')
    expect(getAspectRatio({ id: 'h', slug: 'h', title: 'H', published: true })).toBe('16:9')
  })

  it('cai para a thumbnail do YouTube', () => {
    const sources = getThumbnailSources({ id: 't', slug: 't', title: 'T', published: true, thumbnail: 'images/projects/t.jpg', youtubeUrl: 'https://youtu.be/dQw4w9WgXcQ' })
    expect(sources).toEqual(['/images/projects/t.jpg', 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg'])
  })
})

describe('nichos', () => {
  const mixed: Project[] = [
    { id: 'g', slug: 'g', title: 'G', game: 'minecraft', published: true },
    { id: 'd', slug: 'd', title: 'D', niche: 'dark', editingStyle: 'canais-dark', published: true },
    { id: 'x', slug: 'x', title: 'X', published: true },
  ]

  it('projeto com jogo e sem nicho conta como gaming', () => {
    expect(getPublishedProjects(mixed).map((p) => p.niche)).toEqual(['gaming', 'dark', undefined])
  })

  it('filtra canais dark', () => {
    expect(applyFilters(getPublishedProjects(mixed), { niche: 'dark' }).map((p) => p.id)).toEqual(['d'])
  })

  it('valida nicho desconhecido', () => {
    const broken = [{ id: 'n', slug: 'n', title: 'N', published: true, niche: 'culinaria', youtubeUrl: 'https://youtu.be/dQw4w9WgXcQ' }] as unknown as Project[]
    expect(validateContent({ projects: broken, editors, games, services }).join()).toMatch(/nicho desconhecido/)
  })
})

describe('filtros', () => {
  const published = getPublishedProjects(sample)

  it('combina filtros', () => {
    expect(applyFilters(published, { game: 'minecraft' }).map((p) => p.id)).toEqual(['b', 'a'])
    expect(applyFilters(published, { game: 'minecraft', editorId: 'pato' }).map((p) => p.id)).toEqual(['a'])
    expect(applyFilters(published, { editingStyle: 'humor', editorId: 'trollchu' }).map((p) => p.id)).toEqual(['c'])
    expect(applyFilters(published, { game: 'valorant', editorId: 'pato' })).toEqual([])
  })

  it('oferece só opções com resultados', () => {
    const editorsForValorant = getFacetOptions(published, { game: 'valorant' }, 'editorId')
    expect(editorsForValorant).toEqual([{ value: 'trollchu', count: 1 }])
    const gamesForPato = getFacetOptions(published, { editorId: 'pato' }, 'game')
    expect(gamesForPato).toEqual([{ value: 'minecraft', count: 1 }])
    expect(getFacetOptions(published, {}, 'game').map((o) => o.value)).not.toContain('roblox')
  })
})

describe('validateContent', () => {
  it('os arquivos de dados reais estão consistentes', () => {
    expect(validateContent()).toEqual([])
  })

  it('aponta referências quebradas', () => {
    const broken = [
      { id: 'x', slug: 'Slug Ruim', title: 'X', published: true, editorId: 'ninguem', youtubeUrl: 'https://vimeo.com/1' },
      { id: 'x', slug: 'ok', title: 'Y', published: true },
    ] as unknown as Project[]
    const issues = validateContent({ projects: broken, editors, games, services })
    expect(issues.join('\n')).toMatch(/id duplicado/)
    expect(issues.join('\n')).toMatch(/slug inválido/)
    expect(issues.join('\n')).toMatch(/editorId desconhecido/)
    expect(issues.join('\n')).toMatch(/youtubeUrl não reconhecida/)
    expect(issues.join('\n')).toMatch(/sem thumbnail/)
  })
})
