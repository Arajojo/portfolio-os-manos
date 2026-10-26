import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n/context'
import { getAspectRatio, getEditor, getThumbnailSources, isVertical } from '../lib/content'
import { cx } from '../lib/cx'
import { getWatchUrl, parseYouTubeId } from '../lib/youtube'
import type { Project } from '../types'
import { EditorCredit } from './EditorCredit'
import { YouTubePlayer } from './YouTubePlayer'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

/**
 * Detalhes do projeto em um <dialog> nativo: foco preso, Esc fecha e o foco volta ao card de origem.
 * A entrada e a saída são animadas em CSS (.modal, com @starting-style) e a rolagem da página
 * é travada por CSS (html:has(dialog[open])).
 */
export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  // Mantém o último projeto na tela durante a animação de saída.
  const [shown, setShown] = useState(project)
  if (project && project !== shown) setShown(project)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (project && !dialog.open) {
      returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
      dialog.showModal()
    } else if (!project && dialog.open) {
      dialog.close()
    }
  }, [project])

  const handleClose = () => {
    onClose()
    returnFocusRef.current?.focus()
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="projeto-titulo"
      onClose={handleClose}
      onClick={(event) => {
        // Clique no fundo escuro (fora do painel) fecha o modal.
        if (event.target === event.currentTarget) event.currentTarget.close()
      }}
      className="modal m-auto max-h-[calc(100dvh-1rem)] w-[calc(100vw-1rem)] max-w-6xl overflow-y-auto overscroll-contain border border-line-strong bg-surface p-0 text-fg sm:max-h-[calc(100dvh-3rem)] sm:w-[calc(100vw-3rem)]"
    >
      {shown && <ProjectDetails project={shown} active={project !== null} onClose={() => dialogRef.current?.close()} />}
    </dialog>
  )
}

function ProjectDetails({ project: original, active, onClose }: { project: Project; active: boolean; onClose: () => void }) {
  const { t, c } = useI18n()
  // Descrição (e título, se houver tradução) no idioma escolhido
  const project = c.project(original)
  const ratio = getAspectRatio(project)
  const vertical = isVertical(ratio)
  const videoId = parseYouTubeId(project.youtubeUrl)
  const watchUrl = videoId ? getWatchUrl(videoId) : null
  const gameName = c.gameName(project.game)
  const nicheName = c.nicheName(project.niche)
  const meta = [
    [t.modal.niche, nicheName],
    [t.modal.game, gameName],
    [t.modal.category, c.category(project.category)],
    [t.modal.style, c.serviceName(project.editingStyle)],
  ].filter((entry): entry is [string, string] => Boolean(entry[1]))

  return (
    <div>
      <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-surface px-4 py-3 sm:px-6">
        <p className="label-mono truncate text-subtle">
          {t.modal.project}
          {gameName || nicheName ? ` · ${gameName ?? nicheName}` : ''}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="label-mono flex shrink-0 items-center gap-2 border border-line-strong px-3 py-2 text-fg transition-colors hover:border-fg"
        >
          {t.modal.close} <span aria-hidden="true">✕</span>
        </button>
      </div>

      <div className={cx('grid gap-8 p-4 sm:p-6 lg:p-10', vertical && 'md:grid-cols-[minmax(0,22rem)_1fr] md:items-start lg:gap-12')}>
        {/* A key muda ao fechar: o iframe sai na hora e o áudio para mesmo durante a animação de saída */}
        <YouTubePlayer key={`${project.id}-${active}`} videoId={videoId} title={project.title} posterSources={getThumbnailSources(project)} ratio={ratio} />

        <div className={cx('grid gap-8', !vertical && 'lg:grid-cols-12 lg:gap-12')}>
          <div className={cx(!vertical && 'lg:col-span-7')}>
            <h2 id="projeto-titulo" className="font-wide text-3xl font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-balance sm:text-4xl lg:text-5xl">
              {project.title}
            </h2>
            {project.description && <p className="mt-6 max-w-2xl whitespace-pre-line text-lg text-muted text-pretty">{project.description}</p>}
          </div>

          <div className={cx('flex flex-col gap-8', !vertical && 'lg:col-span-5')}>
            {meta.length > 0 && (
              <dl className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
                {meta.map(([term, value]) => (
                  <div key={term} className="bg-surface p-4 sm:last:odd:col-span-2">
                    <dt className="label-mono text-subtle">{term}</dt>
                    <dd className="mt-2 text-fg">{value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {getEditor(project.editorId) && (
              <div className="border-t border-line pt-6">
                <EditorCredit editorId={project.editorId} size="lg" />
              </div>
            )}
            {watchUrl && (
              <a href={watchUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary self-start">
                {t.modal.openYouTube} <span aria-hidden="true">↗</span>
                <span className="sr-only">{t.modal.newTab}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
