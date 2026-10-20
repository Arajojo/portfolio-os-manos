import { useId } from 'react'
import { getAspectRatio, getGame, getNiche, getService, getThumbnailSources, isVertical } from '../lib/content'
import { cx, pad } from '../lib/cx'
import type { Project } from '../types'
import { EditorCredit } from './EditorCredit'
import { SmartImage } from './SmartImage'

export function ThumbnailFallback({ project }: { project: Project }) {
  const game = getGame(project.game)
  return (
    <div role="img" aria-label="Thumbnail indisponível" className="hatch absolute inset-0 flex flex-col justify-between p-4">
      <span className="label-mono text-subtle">{game?.name ?? getNiche(project.niche)?.name ?? 'Os Manos'}</span>
      <span className="font-wide text-xl font-extrabold uppercase leading-none text-line-strong line-clamp-3 sm:text-2xl">{project.title}</span>
    </div>
  )
}

interface ProjectCardProps {
  project: Project
  index: number
  onOpen: (slug: string) => void
  /** Chamado ao passar o mouse ou focar no card, para pré-carregar o modal. */
  onIntent?: () => void
}

export function ProjectCard({ project, index, onOpen, onIntent }: ProjectCardProps) {
  const metaId = useId()
  const ratio = getAspectRatio(project)
  const meta = [getGame(project.game)?.name ?? getNiche(project.niche)?.name, project.category, getService(project.editingStyle)?.name].filter(Boolean)

  return (
    <article className="group @container flex flex-col">
      <button
        type="button"
        onClick={() => onOpen(project.slug)}
        onPointerEnter={onIntent}
        onFocus={onIntent}
        aria-haspopup="dialog"
        aria-label={`${project.title} — ver detalhes e assistir`}
        aria-describedby={meta.length ? metaId : undefined}
        className="block w-full text-left"
      >
        <div className="relative overflow-hidden bg-surface" style={{ aspectRatio: ratio.replace(':', ' / ') }}>
          <SmartImage
            sources={getThumbnailSources(project)}
            alt=""
            className="absolute inset-0 size-full object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
            fallback={<ThumbnailFallback project={project} />}
          />
          <div className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/25" />
          <div className="crop-marks pointer-events-none absolute inset-2.5 opacity-0 transition-opacity duration-300 group-hover:opacity-70" />
          <span className="label-mono absolute left-3 top-3 bg-ink/75 px-2 py-1 text-fg">
            {pad(index + 1)}
            {isVertical(ratio) && <span className="text-subtle"> · {ratio}</span>}
          </span>
          <span className="label-mono absolute bottom-3 left-3 flex translate-y-1 items-center gap-2 bg-accent px-2.5 py-1.5 text-ink opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-has-[:focus-visible]:translate-y-0 group-has-[:focus-visible]:opacity-100">
            <svg aria-hidden="true" viewBox="0 0 10 12" className="h-2.5 w-2" fill="currentColor">
              <path d="M0 0l10 6-10 6z" />
            </svg>
            Assistir
          </span>
        </div>

        <div className="mt-4">
          {meta.length > 0 && (
            <p id={metaId} className="label-mono text-subtle">
              {meta.join(' · ')}
            </p>
          )}
          <h3
            className={cx(
              'mt-2 font-semibold leading-tight tracking-tight text-balance transition-colors group-hover:text-accent',
              // Container query: o tamanho acompanha a largura do card, não da tela
              project.featured ? 'text-2xl @lg:text-3xl @3xl:text-4xl' : 'text-base @2xs:text-xl @md:text-2xl',
            )}
          >
            {project.title}
          </h3>
        </div>
      </button>

      <div className="mt-3">
        <EditorCredit editorId={project.editorId} />
      </div>
    </article>
  )
}
