import type { CSSProperties } from 'react'
import { editors } from '../data/editors'
import { site } from '../data/site'
import { useTilt } from '../hooks/useTilt'
import { isSafeUrl } from '../lib/contact'
import { getGame, getService } from '../lib/content'
import { cx, plural } from '../lib/cx'
import type { Editor, Project } from '../types'
import { PixelSprite } from './art/PixelSprite'
import { Avatar } from './Avatar'
import { PendingNote } from './PendingNote'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

/** Cor de cada player na tela de seleção. */
const PLAYER_COLORS = ['var(--color-accent)', 'var(--color-pop-pink)', 'var(--color-pop-cyan)', 'var(--color-pop-yellow)']

interface EditorsProps {
  projects: Project[]
  onShowWork: (editorId: string) => void
}

export function Editors({ projects, onShowWork }: EditorsProps) {
  const list: readonly Editor[] = editors

  return (
    <section id="editores" aria-labelledby="editores-titulo" className="container-page py-20 lg:py-28">
      <SectionHeading
        id="editores-titulo"
        index="03"
        label="Editores"
        sprite="controller"
        title={site.sections.editors.title}
        intro={site.sections.editors.intro}
      />

      <p aria-hidden="true" className="mt-16 text-center font-pixel text-[14px] text-accent sm:text-base lg:mt-20">
        Escolha seu editor<span className="motion-safe:animate-blink">_</span>
      </p>

      <div className="mt-10 grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-10">
        {list.map((editor, index) => (
          <PlayerSlot
            key={editor.id}
            editor={editor}
            index={index}
            showVersus={index === 0 && list.length > 1}
            projectCount={projects.filter((project) => project.editorId === editor.id).length}
            onShowWork={onShowWork}
          />
        ))}
      </div>
    </section>
  )
}

interface PlayerSlotProps {
  editor: Editor
  index: number
  showVersus: boolean
  projectCount: number
  onShowWork: (editorId: string) => void
}

function PlayerSlot({ showVersus, ...props }: PlayerSlotProps) {
  return (
    <>
      <PlayerCard {...props} />
      {showVersus && <Versus />}
    </>
  )
}

function Versus() {
  return (
    <div aria-hidden="true" className="relative flex items-center justify-center py-2 lg:py-0">
      <PixelSprite name="sparkle" className="bob absolute -left-2 top-0 size-6 lg:-top-10 lg:left-0" />
      <span className="glitch font-wide text-7xl font-black italic leading-none tracking-tighter text-accent lg:text-9xl">VS</span>
      <PixelSprite name="bolt" className="bob absolute -right-2 bottom-0 size-7 [animation-delay:-1s] lg:-bottom-10 lg:right-0" />
    </div>
  )
}

function PlayerCard({ editor, index, projectCount, onShowWork }: Omit<PlayerSlotProps, 'showVersus'>) {
  const tiltRef = useTilt<HTMLElement>(5)
  const color = PLAYER_COLORS[index % PLAYER_COLORS.length]!
  const titleId = `editor-${editor.id}`
  const specialties = (editor.specialties ?? []).map((id) => getService(id)?.name).filter((name): name is string => Boolean(name))
  const editorGames = (editor.games ?? []).map((id) => getGame(id)?.name).filter((name): name is string => Boolean(name))
  const socials = (editor.socials ?? []).filter((social) => social.label && isSafeUrl(social.url))

  return (
    <Reveal delay={index * 120}>
      <article
        ref={tiltRef}
        aria-labelledby={titleId}
        style={{ '--player': color } as CSSProperties}
        className="tilt group relative border-2 border-line-strong bg-surface p-3 shadow-[8px_8px_0_rgb(0_0_0/0.5)] transition-colors hover:border-[var(--player)] focus-within:border-[var(--player)]"
      >
        <div className="flex items-center justify-between px-1 font-pixel text-[13px]">
          <span style={{ color }}>P{index + 1}</span>
          <span className="text-subtle">Player {index + 1}</span>
        </div>

        <div className="relative mt-3 aspect-[4/5] overflow-hidden bg-ink lg:aspect-square">
          <Avatar
            editor={editor}
            alt={`Foto de perfil de ${editor.displayName}`}
            className="absolute inset-0 size-full transition-transform duration-500 group-hover:scale-105"
            monogramClassName="hatch absolute inset-0 text-[clamp(8rem,28vw,16rem)] leading-none text-[color:var(--player)]! opacity-60"
          />
          <div aria-hidden="true" className="scanlines absolute inset-0 opacity-40" />
          {/* Cantos de seleção estilo jogo de luta */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
            {['left-0 top-0 border-l-4 border-t-4', 'right-0 top-0 border-r-4 border-t-4', 'bottom-0 left-0 border-b-4 border-l-4', 'bottom-0 right-0 border-b-4 border-r-4'].map((corner) => (
              <span key={corner} className={cx('absolute size-6', corner)} style={{ borderColor: color }} />
            ))}
          </div>
          <span
            aria-hidden="true"
            className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 font-pixel text-[13px] text-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
            style={{ background: color }}
          >
            Selecionado!
          </span>
        </div>

        <div className="px-2 pb-2 pt-5">
          <p className="font-mono text-sm" style={{ color }}>
            {editor.handle}
          </p>
          <h3 id={titleId} className="mt-2 text-[clamp(2rem,4.5vw,3.75rem)] font-black leading-[0.95] tracking-[-0.04em] [overflow-wrap:anywhere]">
            {editor.displayName}
          </h3>
          {editor.tagline && <p className="mt-4 text-lg font-medium text-balance">{editor.tagline}</p>}
          {editor.bio ? (
            <p className="mt-4 whitespace-pre-line text-muted text-pretty">{editor.bio}</p>
          ) : (
            <PendingNote className="mt-4">biografia em src/data/editors.ts</PendingNote>
          )}

          {(specialties.length > 0 || editorGames.length > 0) && (
            <dl className="mt-6 grid gap-5 sm:grid-cols-2">
              {specialties.length > 0 && <TagList term="Especialidades" items={specialties} />}
              {editorGames.length > 0 && <TagList term="Jogos" items={editorGames} />}
            </dl>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-line pt-5">
            <a
              href={editor.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3.5 font-semibold text-ink transition-[filter] hover:brightness-110"
              style={{ background: color }}
            >
              Canal no YouTube <span aria-hidden="true">↗</span>
              <span className="sr-only"> de {editor.handle} (nova aba)</span>
            </a>
            {projectCount > 0 && (
              <button type="button" onClick={() => onShowWork(editor.id)} className="btn-secondary">
                Ver {plural(projectCount, 'trabalho', 'trabalhos')}
              </button>
            )}
            {socials.map((social) => (
              <a
                key={social.url}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="label-mono px-2 py-3 text-subtle transition-colors hover:text-fg"
              >
                {social.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
      </article>
    </Reveal>
  )
}

function TagList({ term, items }: { term: string; items: string[] }) {
  return (
    <div>
      <dt className="label-mono text-subtle">{term}</dt>
      <dd className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="border border-line-strong px-2.5 py-1 text-sm text-muted">
            {item}
          </span>
        ))}
      </dd>
    </div>
  )
}
