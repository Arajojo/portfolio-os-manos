import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { About } from './components/About'
import { TapeDivider } from './components/art/Tape'
import { Contact } from './components/Contact'
import { Design } from './components/Design'
import { Editors } from './components/Editors'
import { Footer } from './components/Footer'
import { AchievementsProvider } from './components/fx/Achievements'
import { Hitmarker } from './components/fx/Hitmarker'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Portfolio } from './components/Portfolio'
import { Specialties } from './components/Specialties'
import { useAchievements } from './hooks/useAchievements'
import { useI18n } from './i18n/context'
import { getPublishedProjects } from './lib/content'
import type { Filters } from './lib/filters'
import type { Project } from './types'
import { withViewTransition } from './lib/viewTransition'

const PROJECT_PARAM = 'projeto'

// O modal fica em um arquivo separado (code splitting): só é baixado quando alguém
// passa o mouse, foca ou abre um projeto.
const loadProjectModal = () => import('./components/ProjectModal')
const ProjectModal = lazy(() => loadProjectModal().then((module) => ({ default: module.ProjectModal })))
const preloadProjectModal = () => void loadProjectModal()

function readProjectParam(): string | null {
  return new URLSearchParams(window.location.search).get(PROJECT_PARAM)
}

function writeProjectParam(slug: string | null) {
  const url = new URL(window.location.href)
  if (slug) url.searchParams.set(PROJECT_PARAM, slug)
  else url.searchParams.delete(PROJECT_PARAM)
  window.history.replaceState(null, '', url)
}

export default function App() {
  const projects = useMemo(() => getPublishedProjects(), [])
  return (
    <AchievementsProvider hasProjects={projects.length > 0}>
      <Site projects={projects} />
      <Hitmarker />
    </AchievementsProvider>
  )
}

function Site({ projects }: { projects: Project[] }) {
  const { unlock } = useAchievements()
  const { t } = useI18n()
  const [filters, setFilters] = useState<Filters>({})
  const [openSlug, setOpenSlug] = useState<string | null>(readProjectParam)
  const [modalRequested, setModalRequested] = useState(openSlug !== null)
  const portfolioHeadingRef = useRef<HTMLHeadingElement>(null)

  // As seções são renderizadas pelo React depois do carregamento, então o navegador
  // não consegue pular sozinho para um link direto como /#editores.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return
    // Espera as fontes para que a altura das seções acima já seja a final.
    document.fonts.ready.then(() => document.getElementById(id)?.scrollIntoView({ behavior: 'instant' }))
  }, [])

  const openProject = projects.find((project) => project.slug === openSlug) ?? null
  const featured = projects.filter((project) => project.featured)

  const open = useCallback((slug: string) => {
    unlock('video')
    setModalRequested(true)
    setOpenSlug(slug)
    writeProjectParam(slug)
  }, [unlock])

  const close = useCallback(() => {
    setOpenSlug(null)
    writeProjectParam(null)
  }, [])

  /** Filtros da galeria: com View Transitions, os cards deslizam para as novas posições. */
  const changeFilters = useCallback((next: Filters) => withViewTransition(() => setFilters(next)), [])

  /** Aplica um filtro vindo de outra seção e leva o usuário até a galeria. */
  const showInPortfolio = useCallback((next: Filters) => {
    setFilters(next)
    const heading = portfolioHeadingRef.current
    document.getElementById('portfolio')?.scrollIntoView()
    heading?.focus({ preventScroll: true })
  }, [])

  return (
    <>
      <a
        href="#conteudo"
        className="label-mono fixed left-4 top-4 z-50 -translate-y-24 bg-accent px-4 py-3 text-ink transition-transform focus:translate-y-0"
      >
        {t.skipToContent}
      </a>
      <Header />
      <main id="conteudo">
        <Hero featured={featured.length > 0 ? featured : projects} />
        <TapeDivider />
        <Portfolio
          projects={projects}
          filters={filters}
          onFiltersChange={changeFilters}
          onOpen={open}
          onIntent={preloadProjectModal}
          headingRef={portfolioHeadingRef}
        />
        <Specialties
          projects={projects}
          onFilterGame={(game) => showInPortfolio({ game })}
          onFilterNiche={(niche) => showInPortfolio({ niche })}
        />
        <TapeDivider variant="alt" />
        <Editors projects={projects} onShowWork={(editorId) => showInPortfolio({ editorId })} />
        <Design />
        <About />
        <TapeDivider />
        <Contact />
      </main>
      <Footer />
      {modalRequested && (
        <Suspense fallback={null}>
          <ProjectModal project={openProject} onClose={close} />
        </Suspense>
      )}
    </>
  )
}
