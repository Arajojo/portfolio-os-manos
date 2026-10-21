import type { CSSProperties, ReactNode } from 'react'
import { useTilt } from '../hooks/useTilt'
import { isSafeUrl } from '../lib/contact'
import { cx } from '../lib/cx'
import type { Editor, LinkItem } from '../types'
import { Avatar } from './Avatar'
import { PendingNote } from './PendingNote'
import { Reveal } from './Reveal'

export interface PlayerCardProps {
  id: string
  /** Etiqueta curta no topo (ex.: "P1"). */
  tag: string
  /** Texto à direita no topo (ex.: "Player 1", "Designer"). */
  label: string
  color: string
  revealDelay?: number
  person: Pick<Editor, 'photo' | 'displayName'>
  handle: string
  tagline?: string
  bio?: string
  /** Onde preencher a bio (aviso só em desenvolvimento). */
  bioHint: string
  tagGroups: { term: string; items: string[] }[]
  /** Botão principal colorido (canal, Instagram...). */
  primaryLink: { label: string; url: string }
  socials?: readonly LinkItem[]
  /** Ação extra ao lado do botão principal (ex.: "Ver trabalhos"). */
  extraAction?: ReactNode
}

/** Card de seleção de personagem, usado pelos editores e pelo designer. */
export function PlayerCard({
  id,
  tag,
  label,
  color,
  revealDelay = 0,
  person,
  handle,
  tagline,
  bio,
  bioHint,
  tagGroups,
  primaryLink,
  socials = [],
  extraAction,
}: PlayerCardProps) {
  const tiltRef = useTilt<HTMLElement>(5)
  const titleId = `player-${id}`
  const groups = tagGroups.filter((group) => group.items.length > 0)
  const links = socials.filter((social) => social.label && isSafeUrl(social.url))

  return (
    <Reveal delay={revealDelay}>
      <article
        ref={tiltRef}
        aria-labelledby={titleId}
        style={{ '--player': color } as CSSProperties}
        className="tilt group relative border-2 border-line-strong bg-surface p-3 shadow-[8px_8px_0_rgb(0_0_0/0.5)] transition-colors hover:border-[var(--player)] focus-within:border-[var(--player)]"
      >
        <div className="flex items-center justify-between px-1 font-pixel text-[13px]">
          <span style={{ color }}>{tag}</span>
          <span className="text-subtle">{label}</span>
        </div>

        <div className="relative mt-3 aspect-[4/5] overflow-hidden bg-ink lg:aspect-square">
          <Avatar
            editor={person}
            alt={`Foto de perfil de ${person.displayName}`}
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
            {handle}
          </p>
          <h3 id={titleId} className="mt-2 text-[clamp(2rem,4.5vw,3.75rem)] font-black leading-[0.95] tracking-[-0.04em] [overflow-wrap:anywhere]">
            {person.displayName}
          </h3>
          {tagline && <p className="mt-4 text-lg font-medium text-balance">{tagline}</p>}
          {bio ? (
            <p className="mt-4 whitespace-pre-line text-muted text-pretty">{bio}</p>
          ) : (
            <PendingNote className="mt-4">biografia em {bioHint}</PendingNote>
          )}

          {groups.length > 0 && (
            <dl className="mt-6 grid gap-5 sm:grid-cols-2">
              {groups.map((group) => (
                <TagList key={group.term} term={group.term} items={group.items} />
              ))}
            </dl>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-line pt-5">
            <a
              href={primaryLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3.5 font-semibold text-ink transition-[filter] hover:brightness-110"
              style={{ background: color }}
            >
              {primaryLink.label} <span aria-hidden="true">↗</span>
              <span className="sr-only"> de {handle} (nova aba)</span>
            </a>
            {extraAction}
            {links.map((social) => (
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
