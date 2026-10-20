import type { Project } from '../types'

export type FilterKey = 'niche' | 'game' | 'category' | 'editingStyle' | 'editorId'
export type Filters = Partial<Record<FilterKey, string>>

export const FILTER_KEYS: readonly FilterKey[] = ['niche', 'game', 'category', 'editingStyle', 'editorId']

export interface FilterOption {
  value: string
  count: number
}

function matches(project: Project, filters: Filters, ignore?: FilterKey): boolean {
  return FILTER_KEYS.every((key) => {
    if (key === ignore) return true
    const selected = filters[key]
    return !selected || project[key] === selected
  })
}

/** Aplica todos os filtros ao mesmo tempo (E lógico entre jogo, categoria, estilo e editor). */
export function applyFilters(projects: readonly Project[], filters: Filters): Project[] {
  return projects.filter((project) => matches(project, filters))
}

/** Valores distintos de um campo nos projetos, independente dos outros filtros. */
export function getAllValues(projects: readonly Project[], key: FilterKey): string[] {
  return [...new Set(projects.map((project) => project[key]).filter((value): value is NonNullable<typeof value> => Boolean(value)))]
}

/**
 * Opções de um filtro considerando os demais filtros ativos,
 * para nunca oferecer uma combinação sem resultados.
 */
export function getFacetOptions(projects: readonly Project[], filters: Filters, key: FilterKey): FilterOption[] {
  const counts = new Map<string, number>()
  for (const project of projects) {
    const value = project[key]
    if (!value || !matches(project, filters, key)) continue
    counts.set(value, (counts.get(value) ?? 0) + 1)
  }
  const selected = filters[key]
  if (selected && !counts.has(selected)) counts.set(selected, 0)
  return [...counts].map(([value, count]) => ({ value, count }))
}

export function hasActiveFilters(filters: Filters): boolean {
  return FILTER_KEYS.some((key) => Boolean(filters[key]))
}
