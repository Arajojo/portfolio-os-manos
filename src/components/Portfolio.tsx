import { useEffect, useMemo, useState, type Ref } from 'react'
import { loadingTips } from '../data/memes'
import { site } from '../data/site'
import { getAspectRatio } from '../lib/content'
import { plural } from '../lib/cx'
import { applyFilters, type Filters } from '../lib/filters'
import { transitionName } from '../lib/viewTransition'
import type { Project } from '../types'
import { PixelSprite } from './art/PixelSprite'
import { FilterBar } from './FilterBar'
import { PendingNote } from './PendingNote'
import { ProjectCard } from './ProjectCard'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

/** Tamanho de cada projeto no grid editorial (2 colunas no celular, 6 no tablet, 12 no desktop). */
function layoutClass(project: Project): string {
  const ratio = getAspectRatio(project)
  if (ratio === '9:16') return 'col-span-1 sm:col-span-3 lg:col-span-3'
  if (ratio === '4:5' || ratio === '1:1') return 'col-span-1 sm:col-span-3 lg:col-span-4'
  return project.featured ? 'col-span-2 sm:col-span-6 lg:col-span-9' : 'col-span-2 sm:col-span-6 lg:col-span-6'
}

interface PortfolioProps {
  projects: Project[]
  filters: Filters
  onFiltersChange: (filters: Filters) => void
  onOpen: (slug: string) => void
  onIntent?: () => void
  headingRef?: Ref<HTMLHeadingElement>
}

export function Portfolio({ projects, filters, onFiltersChange, onOpen, onIntent, headingRef }: PortfolioProps) {
  const results = useMemo(() => applyFilters(projects, filters), [projects, filters])

  return (
    <section id="portfolio" aria-labelledby="portfolio-titulo" className="container-page py-20 lg:py-32">
      <SectionHeading
        ref={headingRef}
        id="portfolio-titulo"
        index="01"
        label="Portfólio"
        sprite="play"
        title={site.sections.portfolio.title}
        intro={projects.length > 0 ? site.sections.portfolio.intro : undefined}
      />

      {projects.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <FilterBar projects={projects} filters={filters} onChange={onFiltersChange} />

          <p aria-live="polite" className="label-mono mt-6 text-subtle">
            {plural(results.length, 'projeto', 'projetos')}
          </p>

          {results.length === 0 ? (
            <div className="mt-8 border border-line p-8 lg:p-12">
              <p className="text-xl">Nenhum projeto com essa combinação de filtros.</p>
              <button type="button" onClick={() => onFiltersChange({})} className="btn-secondary mt-6">
                Limpar filtros
              </button>
            </div>
          ) : (
            <ul className="mt-8 grid grid-flow-dense grid-cols-2 items-start gap-x-4 gap-y-12 sm:grid-cols-6 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-20">
              {results.map((project, index) => (
                <li key={project.id} className={layoutClass(project)} style={{ viewTransitionName: transitionName('projeto', project.id) }}>
                  <Reveal delay={(index % 3) * 80}>
                    <ProjectCard project={project} index={index} onOpen={onOpen} onIntent={onIntent} />
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  )
}

/** Dica que troca a cada poucos segundos, como nas telas de loading dos jogos. */
function useRotatingTip(tips: string[], interval = 4500) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (tips.length < 2) return
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % tips.length), interval)
    return () => window.clearInterval(timer)
  }, [tips, interval])
  return tips[index]
}

/** Portfólio vazio vira uma tela de loading de videogame (que trava em 99%, claro). */
function EmptyState() {
  const tip = useRotatingTip(loadingTips)

  return (
    <Reveal className="mt-14 grid border-2 border-line-strong bg-surface lg:grid-cols-12">
      <div className="relative flex min-h-[26rem] flex-col items-center justify-center gap-7 overflow-hidden bg-ink px-6 py-12 text-center lg:col-span-7">
        <div aria-hidden="true" className="scanlines absolute inset-0" />
        <div aria-hidden="true" className="crop-marks absolute inset-4 opacity-30" />

        <div aria-hidden="true" className="relative flex items-end gap-5">
          <PixelSprite name="coin" className="bob size-9 [animation-delay:-0.4s]" />
          <PixelSprite name="controller" className="bob size-16" />
          <PixelSprite name="heart" className="bob size-9 [animation-delay:-1.1s]" />
        </div>

        <p className="relative font-pixel text-[15px] text-accent sm:text-lg">Carregando portfólio</p>

        <div aria-hidden="true" className="relative h-7 w-full max-w-md border-2 border-fg p-1">
          <div
            className="loading-fill h-full w-[99%]"
            style={{ background: 'repeating-linear-gradient(90deg, var(--color-accent) 0 14px, transparent 14px 18px)' }}
          />
        </div>
        <p className="relative font-pixel text-[13px] text-subtle sm:text-[14px]">99% · travou igual upload de madrugada</p>

        <p className="relative max-w-sm text-muted text-pretty">
          <span className="font-pixel text-[13px] text-pop-yellow">Dica: </span>
          {tip}
        </p>
      </div>
      <div className="flex flex-col justify-end gap-6 border-t-2 border-line-strong p-6 sm:p-10 lg:col-span-5 lg:border-l-2 lg:border-t-0">
        <p className="label-mono text-accent">Portfólio em montagem</p>
        <h3 className="font-wide text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-balance">
          Os primeiros trabalhos chegam em breve
        </h3>
        <p className="text-muted text-pretty">
          Os vídeos editados por Os Manos vão aparecer aqui. Enquanto isso, conheça os editores ou fale com a dupla.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href="#editores" className="btn-secondary">
            Conhecer os editores
          </a>
          <a href="#contato" className="btn-primary">
            Contato
          </a>
        </div>
        <PendingNote>cadastre vídeos em src/data/projects.ts com published: true</PendingNote>
      </div>
    </Reveal>
  )
}
