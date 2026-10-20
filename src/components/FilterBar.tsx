import type { ReactNode } from 'react'
import { getEditor, getGame, getNiche, getService } from '../lib/content'
import { cx } from '../lib/cx'
import { getAllValues, getFacetOptions, hasActiveFilters, type FilterKey, type Filters } from '../lib/filters'
import type { Project } from '../types'

const GROUPS: { key: FilterKey; label: string; allLabel: string }[] = [
  { key: 'niche', label: 'Nicho', allLabel: 'Todos' },
  { key: 'game', label: 'Jogo', allLabel: 'Todos os jogos' },
  { key: 'category', label: 'Categoria', allLabel: 'Todas' },
  { key: 'editingStyle', label: 'Estilo de edição', allLabel: 'Todos os estilos' },
  { key: 'editorId', label: 'Editor', allLabel: 'Todos os editores' },
]

function getFilterLabel(key: FilterKey, value: string): string {
  if (key === 'niche') return getNiche(value)?.name ?? value
  if (key === 'game') return getGame(value)?.name ?? value
  if (key === 'editingStyle') return getService(value)?.name ?? value
  if (key === 'editorId') return getEditor(value)?.handle ?? value
  return value
}

interface FilterBarProps {
  projects: Project[]
  filters: Filters
  onChange: (filters: Filters) => void
}

export function FilterBar({ projects, filters, onChange }: FilterBarProps) {
  // Só exibe um filtro quando há pelo menos duas opções reais para escolher.
  const groups = GROUPS.filter((group) => getAllValues(projects, group.key).length >= 2)
  if (groups.length === 0) return null

  const select = (key: FilterKey, value?: string) => onChange({ ...filters, [key]: value })

  return (
    <div className="mt-14 border-y border-line">
      <div className="flex min-h-14 items-center justify-between gap-4 py-3">
        <h3 className="label-mono text-subtle">Filtrar projetos</h3>
        {hasActiveFilters(filters) && (
          <button type="button" onClick={() => onChange({})} className="label-mono flex items-center gap-2 py-2 text-fg transition-colors hover:text-accent">
            Limpar filtros <span aria-hidden="true">✕</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] gap-x-8 gap-y-6 pb-6">
        {groups.map((group) => {
          const selected = filters[group.key]
          const options = getFacetOptions(projects, filters, group.key)
            .map((option) => ({ ...option, label: getFilterLabel(group.key, option.value) }))
            .sort((a, b) => a.label.localeCompare(b.label, 'pt-BR'))
          const labelId = `filtro-${group.key}`

          return (
            <div key={group.key} role="group" aria-labelledby={labelId}>
              <p id={labelId} className="label-mono text-subtle">
                {group.label}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Chip pressed={!selected} onClick={() => select(group.key, undefined)}>
                  {group.allLabel}
                </Chip>
                {options.map((option) => (
                  <Chip
                    key={option.value}
                    pressed={selected === option.value}
                    onClick={() => select(group.key, selected === option.value ? undefined : option.value)}
                  >
                    {option.label}
                    <span className="font-mono text-[0.6875rem] opacity-60">{option.count}</span>
                  </Chip>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Chip({ pressed, onClick, children }: { pressed: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cx(
        'inline-flex items-center gap-2 border px-3 py-1.5 text-sm transition-colors',
        pressed ? 'border-fg bg-fg text-ink' : 'border-line-strong text-muted hover:border-fg hover:text-fg',
      )}
    >
      {children}
    </button>
  )
}
