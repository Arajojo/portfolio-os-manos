import { useEffect, useState, type CSSProperties } from 'react'
import { games } from '../data/games'
import { darkCaptions } from '../data/memes'
import { niches } from '../data/niches'
import { services } from '../data/services'
import { site } from '../data/site'
import { useTilt } from '../hooks/useTilt'
import { resolveAsset } from '../lib/assets'
import { cx, pad, plural } from '../lib/cx'
import type { SpriteName } from '../lib/sprites'
import type { Game, Niche, Project, Service } from '../types'
import { PixelSprite } from './art/PixelSprite'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { SmartImage } from './SmartImage'

interface SpecialtiesProps {
  projects: Project[]
  onFilterGame: (gameId: string) => void
  onFilterNiche: (nicheId: string) => void
}

export function Specialties({ projects, onFilterGame, onFilterNiche }: SpecialtiesProps) {
  const visibleNiches: Niche[] = niches.filter((niche) => niche.showOnSite)
  const visibleGames: Game[] = games.filter((game) => game.showOnSite)
  const visibleServices: Service[] = services.filter((service) => service.showOnSite).sort((a, b) => a.order - b.order)
  const countBy = (key: 'game' | 'niche', id: string) => projects.filter((project) => project[key] === id).length

  return (
    <section id="especialidades" aria-labelledby="especialidades-titulo" className="container-page py-20 lg:py-28">
      <SectionHeading
        id="especialidades-titulo"
        index="02"
        label="Especialidades"
        sprite="star"
        title={site.sections.specialties.title}
        intro={site.sections.specialties.intro}
      />

      {visibleNiches.length > 0 && (
        <div className="mt-16 grid gap-6 lg:mt-24 lg:grid-cols-12">
          <h3 className="label-mono text-subtle lg:col-span-3">Nichos</h3>
          <ul className="grid gap-4 md:grid-cols-2 lg:col-span-9">
            {visibleNiches.map((niche, index) => (
              <NichePanel
                key={niche.id}
                niche={niche}
                index={index}
                count={countBy('niche', niche.id)}
                onFilter={() => onFilterNiche(niche.id)}
              />
            ))}
          </ul>
        </div>
      )}

      {visibleGames.length > 0 && (
        <div className="mt-16 grid gap-6 lg:mt-24 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <h3 className="label-mono text-subtle">Jogos</h3>
            <p className="mt-3 hidden font-pixel text-[13px] text-subtle lg:block">Escolha seu cartucho</p>
          </div>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:col-span-9 xl:grid-cols-4">
            {visibleGames.map((game, index) => (
              <GameCartridge
                key={game.id}
                game={game}
                index={index}
                count={countBy('game', game.id)}
                onFilter={() => onFilterGame(game.id)}
              />
            ))}
          </ul>
        </div>
      )}

      {visibleServices.length > 0 && (
        <div className="mt-16 grid gap-6 lg:mt-24 lg:grid-cols-12">
          <h3 className="label-mono text-subtle lg:col-span-3">Estilos de edição</h3>
          <ol className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:col-span-9">
            {visibleServices.map((service, index) => (
              <li key={service.id} className="group relative flex min-h-60 flex-col justify-between gap-10 overflow-hidden bg-bg p-6 transition-colors hover:bg-surface lg:p-8 sm:last:odd:col-span-2">
                <div className="flex items-start justify-between gap-4">
                  <span className="label-mono text-accent">{pad(index + 1)}</span>
                  {service.sprite && (
                    <PixelSprite name={service.sprite} className="size-9 transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-6 lg:size-11" />
                  )}
                </div>
                <div>
                  {service.meme && (
                    <p
                      aria-hidden="true"
                      className="mb-4 text-xl font-black uppercase leading-none tracking-tight text-fg [font-stretch:62%] [text-shadow:2px_2px_0_#000,-1px_-1px_0_#000] transition duration-300 sm:text-2xl [@media(hover:hover)]:translate-y-2 [@media(hover:hover)]:opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                    >
                      “{service.meme}”
                    </p>
                  )}
                  <h4 className="text-xl font-semibold tracking-tight lg:text-2xl">{service.name}</h4>
                  <p className="mt-3 text-muted text-pretty">{service.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  )
}

interface NichePanelProps {
  niche: Niche
  index: number
  count: number
  onFilter: () => void
}

function NichePanel({ niche, index, count, onFilter }: NichePanelProps) {
  const dark = niche.id === 'dark'
  // Vlogs e outros nichos: visual de vídeo de criador (visor de câmera, reações e player)
  const creators = niche.id === 'criadores'

  return (
    <li
      className={cx(
        '@container relative flex min-h-[27rem] flex-col justify-between gap-10 overflow-hidden border-2 p-6 sm:p-8 lg:p-10 md:last:odd:col-span-2',
        dark ? 'border-pop-red/50 bg-ink' : creators ? 'border-pop-pink/50 bg-bg' : 'border-accent/50 bg-bg',
      )}
    >
      {dark ? <DarkBackdrop /> : creators ? <CreatorBackdrop /> : <GamingBackdrop />}

      <div className="relative flex items-start justify-between gap-4">
        <span className={cx('label-mono', dark ? 'text-pop-red' : creators ? 'text-pop-pink' : 'text-accent')}>Nicho {pad(index + 1)}</span>
        {dark ? (
          <span className="font-pixel text-[12px] text-pop-red">● Rec</span>
        ) : creators ? (
          <span aria-hidden="true" className="bg-pop-pink px-3 py-1.5 font-pixel text-[12px] text-ink">
            Inscrever-se
          </span>
        ) : (
          <GamingHud />
        )}
      </div>

      <Reveal className="relative">
        <h4
          className={cx(
            'font-wide text-4xl font-extrabold uppercase leading-[0.9] tracking-[-0.03em] text-balance @sm:text-5xl @lg:text-6xl',
            dark && 'flicker',
          )}
        >
          {niche.name}
        </h4>
        <p className="mt-5 max-w-md text-muted text-pretty">{niche.description}</p>
        {niche.formats.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-2" aria-label={`Formatos de ${niche.name}`}>
            {niche.formats.map((format) => (
              <li
                key={format}
                className={cx('border px-2.5 py-1 text-sm', dark ? 'border-pop-red/40 text-muted' : creators ? 'border-pop-pink/40 text-muted' : 'border-line-strong text-muted')}
              >
                {format}
              </li>
            ))}
          </ul>
        )}
        {dark && <DarkCaption />}
        {creators && <CreatorPlayerBar />}
        {count > 0 && (
          <button type="button" onClick={onFilter} className="label-mono mt-8 whitespace-nowrap text-fg transition-colors hover:text-accent">
            Ver {plural(count, 'trabalho', 'trabalhos')} <span aria-hidden="true">→</span>
          </button>
        )}
      </Reveal>
    </li>
  )
}

/** Visor de câmera com grade de terços, cantos de enquadramento e reações subindo como numa live. */
function CreatorBackdrop() {
  const reactions: { sprite: SpriteName; left: string; delay: string; drift: string }[] = [
    { sprite: 'heart', left: '84%', delay: '0s', drift: '-14px' },
    { sprite: 'star', left: '90%', delay: '-1.1s', drift: '12px' },
    { sprite: 'heart', left: '78%', delay: '-2.2s', drift: '18px' },
    { sprite: 'sparkle', left: '88%', delay: '-3s', drift: '-10px' },
    { sprite: 'heart', left: '93%', delay: '-3.7s', drift: '-6px' },
  ]

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,var(--color-fg)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-fg)_1px,transparent_1px)] [background-size:33.333%_33.333%]" />
      {['left-4 top-4 border-l-2 border-t-2', 'right-4 top-4 border-r-2 border-t-2', 'bottom-4 left-4 border-b-2 border-l-2', 'bottom-4 right-4 border-b-2 border-r-2'].map((corner) => (
        <span key={corner} className={cx('absolute size-7 border-pop-pink/70', corner)} />
      ))}
      {reactions.map((reaction, index) => (
        <span key={index} className="reaction" style={{ left: reaction.left, animationDelay: reaction.delay, '--drift': reaction.drift } as CSSProperties}>
          <PixelSprite name={reaction.sprite} className="size-6" />
        </span>
      ))}
    </div>
  )
}

/** Barra de player de vídeo (decorativa). */
function CreatorPlayerBar() {
  return (
    <div aria-hidden="true" className="mt-6 max-w-md">
      <div className="relative h-1.5 bg-line-strong">
        <div className="absolute inset-y-0 left-0 w-[64%] bg-fg/20" />
        <div className="creator-progress absolute inset-y-0 left-0 bg-pop-pink" />
      </div>
      <div className="mt-2 flex items-center justify-between font-mono text-xs text-subtle">
        <span>▶ 04:20 / 11:08</span>
        <span>CC · HD</span>
      </div>
    </div>
  )
}

function GamingBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="dot-grid absolute inset-0 opacity-70" />
      <PixelSprite name="coin" className="bob absolute right-[12%] top-[38%] size-8 opacity-90" />
      <PixelSprite name="star" className="bob absolute right-[28%] top-[24%] size-6 opacity-70 [animation-delay:-1.2s]" />
      <PixelSprite name="heart" className="bob absolute right-[6%] top-[22%] size-7 opacity-80 [animation-delay:-2s]" />
    </div>
  )
}

/** HUD de videogame: vida, XP e combo. Decorativo. */
function GamingHud() {
  return (
    <div aria-hidden="true" className="w-32 space-y-1.5 font-pixel text-[11px] text-subtle sm:w-40">
      {[
        { label: 'HP', width: '86%', color: 'var(--color-pop-red)' },
        { label: 'XP', width: '62%', color: 'var(--color-accent)' },
      ].map((bar) => (
        <div key={bar.label} className="flex items-center gap-2">
          <span className="w-4">{bar.label}</span>
          <div className="h-2 flex-1 border border-line-strong p-px">
            <div className="hud-fill h-full" style={{ width: bar.width, background: bar.color }} />
          </div>
        </div>
      ))}
      <p className="text-right text-pop-yellow">Combo x3</p>
    </div>
  )
}

function DarkBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="tv-noise absolute inset-0 opacity-[0.07] mix-blend-screen" />
      <div className="scanlines absolute inset-0 opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgb(255_77_77/0.12),transparent_60%)]" />
      <PixelSprite name="ghost" className="bob absolute right-[10%] top-[22%] size-12 opacity-25" />
      <PixelSprite name="skull" className="bob absolute right-[30%] top-[40%] size-6 opacity-15 [animation-delay:-1.6s]" />
    </div>
  )
}

/** Legenda estilo YouTube sendo digitada, com frases de canal dark. */
function DarkCaption() {
  const [reduceMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [line, setLine] = useState(0)
  const [chars, setChars] = useState(0)
  const text = darkCaptions[line % darkCaptions.length] ?? ''

  useEffect(() => {
    if (darkCaptions.length === 0) return
    const typing = !reduceMotion && chars < text.length
    const timer = window.setTimeout(
      () => {
        if (reduceMotion) {
          setLine((value) => value + 1)
        } else if (typing) {
          setChars((value) => value + 1)
        } else {
          setChars(0)
          setLine((value) => value + 1)
        }
      },
      reduceMotion ? 3200 : typing ? 45 : 1800,
    )
    return () => window.clearTimeout(timer)
  }, [chars, text, reduceMotion])

  if (!text) return null

  return (
    <p aria-hidden="true" className="mt-6 inline-block bg-black/85 px-3 py-1.5 font-mono text-sm text-fg">
      <span className="caret">{reduceMotion ? text : text.slice(0, chars)}</span>
    </p>
  )
}

interface GameCartridgeProps {
  game: Game
  index: number
  count: number
  onFilter: () => void
}

/** Cartucho de videogame com a cor e o sprite do jogo. Inclina em 3D com o mouse. */
function GameCartridge({ game, index, count, onFilter }: GameCartridgeProps) {
  const tiltRef = useTilt<HTMLDivElement>(12)
  const image = resolveAsset(game.image)
  const color = game.color ?? 'var(--color-accent)'

  return (
    <li className="flex flex-col">
      <div ref={tiltRef} className="tilt group relative">
        <div
          className="relative overflow-hidden border-2 border-ink pb-3 shadow-[6px_6px_0_rgb(0_0_0/0.55)] [clip-path:polygon(0_0,100%_0,100%_93%,93%_100%,7%_100%,0_93%)]"
          style={{ background: color }}
        >
          <div aria-hidden="true" className="h-4 bg-[repeating-linear-gradient(90deg,rgb(0_0_0/0.25)_0_3px,transparent_3px_9px)]" />
          <div className="relative mx-3 mt-2 grid aspect-[4/3] place-items-center overflow-hidden border-2 border-ink bg-ink">
            <div aria-hidden="true" className="absolute inset-0 opacity-30" style={{ background: `radial-gradient(circle at 50% 60%, ${color}, transparent 70%)` }} />
            {image ? (
              <SmartImage sources={[image]} alt={game.name} className="absolute inset-0 size-full object-cover" fallback={null} />
            ) : (
              game.sprite && (
                <PixelSprite
                  name={game.sprite}
                  className="relative size-14 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110 sm:size-16"
                />
              )
            )}
            <div aria-hidden="true" className="scanlines absolute inset-0 opacity-50" />
            <span aria-hidden="true" className="absolute left-1.5 top-1.5 font-pixel text-[11px] text-fg/70">
              #{pad(index + 1)}
            </span>
          </div>
          <p className="mx-3 mt-3 font-wide text-base font-black uppercase leading-none tracking-tight text-ink sm:text-lg">{game.name}</p>
        </div>
        <div aria-hidden="true" className="tilt-shine absolute inset-0" />
      </div>
      {count > 0 && (
        <button type="button" onClick={onFilter} className="label-mono mt-3 self-start text-subtle transition-colors hover:text-accent">
          Ver {plural(count, 'trabalho', 'trabalhos')} <span aria-hidden="true">→</span>
        </button>
      )}
    </li>
  )
}
