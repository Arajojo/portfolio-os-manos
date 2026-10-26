import type { CSSProperties } from 'react'
import { useI18n } from '../i18n/context'
import type { UiStrings } from '../i18n/ui'
import { getThumbnailSources } from '../lib/content'
import { cx } from '../lib/cx'
import type { SpriteName } from '../lib/sprites'
import type { Project } from '../types'
import { PixelSprite } from './art/PixelSprite'
import { Stickers } from './art/Stickers'
import { SmartImage } from './SmartImage'

const CLIPS: { key: keyof UiStrings['hero']['clips']; width: number; color: string; sprite: SpriteName }[] = [
  { key: 'intro', width: 14, color: 'var(--color-accent)', sprite: 'play' },
  { key: 'gameplay', width: 30, color: 'var(--color-pop-cyan)', sprite: 'controller' },
  { key: 'meme', width: 10, color: 'var(--color-pop-pink)', sprite: 'skull' },
  { key: 'narration', width: 24, color: 'var(--color-pop-purple)', sprite: 'mic' },
  { key: 'outro', width: 16, color: 'var(--color-pop-yellow)', sprite: 'trophy' },
]

/** Efeitos sonoros na trilha A2 (posição e largura em %). */
const SFX: { key: keyof UiStrings['hero']['sfx']; left: number; width: number }[] = [
  { key: 'boom', left: 21, width: 7 },
  { key: 'bruh', left: 46, width: 5 },
  { key: 'laugh', left: 61, width: 8 },
  { key: 'whoosh', left: 79, width: 7 },
]

const MARKERS = [
  { left: 12, color: 'var(--color-pop-pink)' },
  { left: 44, color: 'var(--color-pop-cyan)' },
  { left: 71, color: 'var(--color-pop-yellow)' },
]

const RULER = ['00:00', '00:15', '00:30', '00:45', '01:00', '01:15']

/** Forma de onda determinística para a trilha de áudio decorativa. */
const WAVE = Array.from({ length: 160 }, (_, i) => {
  const value = Math.abs(Math.sin(i * 0.37) * 0.6 + Math.sin(i * 0.11) * 0.3 + Math.sin(i * 1.7) * 0.25)
  return Math.max(0.08, Math.min(1, value))
})

/** Composição de linha do tempo de edição. Puramente visual (aria-hidden). */
function HeroTimeline({ projects }: { projects: Project[] }) {
  const { t } = useI18n()
  const thumbnails = projects.map(getThumbnailSources).filter((sources) => sources.length > 0)

  return (
    <div aria-hidden="true" className="pointer-events-none relative mt-10 select-none border-y border-line bg-bg/60 lg:mt-14">
      <div
        className="label-mono relative flex justify-between border-b border-line py-2 text-subtle"
        style={{
          backgroundImage: 'repeating-linear-gradient(90deg, var(--color-line-strong) 0 1px, transparent 1px 2.5%)',
          backgroundSize: '100% 6px',
          backgroundPosition: 'bottom',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {RULER.map((time, index) => (
          <span key={time} className={index > 3 ? 'hidden sm:inline' : undefined}>
            {time}
          </span>
        ))}
        {MARKERS.map((marker) => (
          <span key={marker.left} className="absolute -bottom-px size-2.5 [clip-path:polygon(0_0,100%_0,50%_100%)]" style={{ left: `${marker.left}%`, background: marker.color }} />
        ))}
      </div>

      <div className="flex items-stretch gap-3 py-2">
        <span className="label-mono w-6 shrink-0 self-center text-subtle">V1</span>
        <div className="flex h-16 flex-1 gap-1 sm:h-24 lg:h-28">
          {CLIPS.map((clip, index) => {
            const sources = thumbnails[index % Math.max(thumbnails.length, 1)] ?? []
            return (
              <div key={clip.key} className="relative overflow-hidden border border-line-strong bg-surface" style={{ width: `${clip.width}%` }}>
                <SmartImage
                  sources={sources}
                  alt=""
                  eager
                  className="absolute inset-0 size-full object-cover opacity-70"
                  fallback={
                    <div className="hatch absolute inset-0 grid place-items-center">
                      <PixelSprite name={clip.sprite} className="size-6 opacity-80 sm:size-9" />
                    </div>
                  }
                />
                <span className="absolute inset-x-0 top-0 h-[3px]" style={{ background: clip.color }} />
                <span className="label-mono absolute left-1.5 top-1.5 truncate text-[10px] text-fg">{t.hero.clips[clip.key]}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-line py-2">
        <span className="label-mono w-6 shrink-0 text-subtle">A1</span>
        <svg viewBox={`0 0 ${WAVE.length} 20`} preserveAspectRatio="none" className="h-8 flex-1 text-line-strong sm:h-10">
          {WAVE.map((value, i) => (
            <rect key={i} x={i + 0.2} width={0.6} y={10 - value * 9} height={value * 18} fill="currentColor" />
          ))}
        </svg>
      </div>

      <div className="flex items-center gap-3 border-t border-line py-2">
        <span className="label-mono w-6 shrink-0 text-subtle">A2</span>
        <div className="relative h-6 flex-1">
          {SFX.map((sfx) => (
            <span
              key={sfx.key}
              className="label-mono absolute inset-y-0 flex items-center truncate border border-pop-pink/60 bg-pop-pink/15 px-1.5 text-[9px] normal-case text-pop-pink"
              style={{ left: `${sfx.left}%`, width: `${sfx.width}%` }}
            >
              {t.hero.sfx[sfx.key]}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute inset-y-0 left-9 right-0">
        <div className="absolute inset-y-0 left-[38%] w-px bg-accent motion-safe:animate-playhead">
          <span className="absolute -left-[5px] -top-px size-[11px] bg-accent [clip-path:polygon(0_0,100%_0,50%_100%)]" />
        </div>
      </div>
    </div>
  )
}

/** Uma linha do wordmark com letras individuais (que entram em sequência e reagem ao mouse). */
function WordLine({ text, start, className }: { text: string; start: number; className?: string }) {
  return (
    <span aria-hidden="true" className={cx('glitch block', className)}>
      {[...text].map((letter, index) => (
        <span key={index} className="wm-letter" style={{ '--i': start + index } as CSSProperties}>
          {letter}
        </span>
      ))}
    </span>
  )
}

export function Hero({ featured }: { featured: Project[] }) {
  const { t, c } = useI18n()
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-0" />

      <div className="container-page relative pb-10 pt-10 lg:pb-14 lg:pt-14">
        <div className="label-mono flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-subtle">
          <span>{t.hero.studio}</span>
          <span className="flex items-center gap-2">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent motion-safe:animate-blink" />
            {t.hero.niches}
          </span>
        </div>

        <div className="relative mt-8">
          <h1
            id="hero-title"
            aria-label={c.site.name}
            className="hero-parallax font-wide text-[clamp(3.5rem,18vw,16rem)] font-black uppercase leading-[0.8] tracking-[-0.045em] sm:text-[clamp(3.5rem,15.5vw,16rem)]"
          >
            <WordLine text="Os" start={0} />
            <WordLine text="Manos" start={2} className="sm:pl-[14%]" />
          </h1>
          <Stickers items={c.heroStickers} />
        </div>

        <HeroTimeline projects={featured} />

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:items-end">
          <p className="text-[clamp(1.75rem,3.8vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-balance lg:col-span-7">
            {c.site.headline}
          </p>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-lg text-muted text-pretty">{c.site.heroDescription}</p>
            <p aria-hidden="true" className="mt-8 font-pixel text-[14px] text-accent">
              <span className="motion-safe:animate-blink">▶</span> {t.hero.pressStart}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href="#portfolio" className="btn-primary">
                {t.hero.seeWork} <span aria-hidden="true">↓</span>
              </a>
              <a href="#contato" className="btn-secondary">
                {t.hero.contact}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
