import type { CSSProperties, ReactNode } from 'react'
import { site } from '../data/site'
import { cx, pad } from '../lib/cx'
import type { SpriteName } from '../lib/sprites'
import { PixelSprite } from './art/PixelSprite'
import { PendingNote } from './PendingNote'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

const POWER_UP_SPRITES: SpriteName[] = ['heart', 'coin', 'star', 'sparkle', 'bolt', 'trophy']
const POWER_UP_COLORS = ['var(--color-pop-red)', 'var(--color-pop-yellow)', 'var(--color-accent)', 'var(--color-pop-pink)', 'var(--color-pop-cyan)', 'var(--color-pop-orange)']

/** Batimento do monitor cardíaco: linha reta com picos, repetida. */
const ECG_PATH =
  'M0 40 H70 L80 40 L88 30 L96 40 H112 L120 6 L130 74 L140 26 L148 40 H230 L240 40 L248 30 L256 40 H272 L280 6 L290 74 L300 26 L308 40 H390 L400 40 L408 30 L416 40 H432 L440 6 L450 74 L460 26 L468 40 H600'

export function About() {
  const { about } = site
  const process = about.process.filter((step) => step.trim())
  const differentials = about.differentials.filter((item) => item.trim())

  const blocks: { title: string; label: string; sprite: SpriteName; field: string; content: ReactNode }[] = [
    {
      title: 'A história',
      label: 'Capítulo 01',
      sprite: 'controller',
      field: 'about.history',
      content: about.history.trim() && <History text={about.history} />,
    },
    {
      title: 'Visão criativa',
      label: 'Objetivo final',
      sprite: 'star',
      field: 'about.vision',
      content: about.vision.trim() && <Vision text={about.vision} />,
    },
    {
      title: 'Processo',
      label: `Mapa · ${process.length} fases`,
      sprite: 'play',
      field: 'about.process',
      content: process.length > 0 && <ProcessMap steps={process} />,
    },
    {
      title: 'Com quem queremos trabalhar',
      label: 'Diálogo',
      sprite: 'sword',
      field: 'about.idealCreator',
      content: about.idealCreator.trim() && <DialogBox text={about.idealCreator} />,
    },
    {
      title: 'Diferenciais',
      label: 'Power-ups',
      sprite: 'bolt',
      field: 'about.differentials',
      content: differentials.length > 0 && <PowerUps items={differentials} />,
    },
  ]

  return (
    <section id="sobre" aria-labelledby="sobre-titulo" className="relative overflow-hidden py-20 lg:py-32">
      <div className="container-page relative">
        <SectionHeading id="sobre-titulo" index="05" label="Sobre" sprite="heart" title={site.sections.about.title} />

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:items-center lg:gap-6">
          <Reveal className="lg:col-span-6 lg:col-start-4">
            <p className="text-[clamp(1.6rem,3.2vw,3rem)] font-medium leading-[1.15] tracking-[-0.02em] text-balance">
              <WithHeart text={about.intro} />
            </p>
          </Reveal>
          <Reveal className="lg:col-span-3" delay={150}>
            <HeartMonitor />
          </Reveal>
        </div>

        <div className="mt-16 lg:mt-24">
          {blocks.map((block) =>
            block.content ? (
              <Reveal key={block.title} className="grid gap-5 border-t border-line py-10 lg:grid-cols-12 lg:gap-6 lg:py-14">
                <div className="lg:col-span-3 lg:col-start-1">
                  <p className="flex items-center gap-2 font-pixel text-[12px] text-accent">
                    <PixelSprite name={block.sprite} className="size-4" />
                    {block.label}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight lg:text-3xl">{block.title}</h3>
                </div>
                <div className="lg:col-span-8 lg:col-start-4">{block.content}</div>
              </Reveal>
            ) : (
              <PendingNote key={block.title} className="mt-3 lg:ml-[25%]">
                “{block.title}” em src/data/site.ts ({block.field})
              </PendingNote>
            ),
          )}
        </div>
      </div>
    </section>
  )
}

/** Destaca a palavra "coração" do texto com um coração em pixel batendo. */
function WithHeart({ text }: { text: string }) {
  return (
    <>
      {text.split(/(coração)/i).map((part, index) =>
        /^coração$/i.test(part) ? (
          <span key={index} className="whitespace-nowrap text-pop-red underline decoration-pop-red/50 decoration-wavy decoration-2 underline-offset-[0.18em]">
            {part}
            <PixelSprite name="heart" className="heartbeat ml-[0.18em] inline-block size-[0.75em] align-[-0.05em]" />
          </span>
        ) : (
          part
        ),
      )}
    </>
  )
}

/** Card de "status" com monitor cardíaco e barra de vida em corações. Decorativo. */
function HeartMonitor() {
  return (
    <div aria-hidden="true" className="relative overflow-hidden border-2 border-pop-red/60 bg-ink p-5 shadow-[8px_8px_0_rgb(0_0_0/0.55)]">
      <div className="scanlines absolute inset-0 opacity-50" />
      <div className="relative flex items-center justify-between font-pixel text-[12px]">
        <span className="text-subtle">Status</span>
        <span className="text-pop-red">
          <span className="motion-safe:animate-blink">●</span> Ao vivo
        </span>
      </div>

      <div className="relative mt-5 grid place-items-center">
        <div className="absolute size-28 rounded-full bg-pop-red/20 blur-2xl" />
        <PixelSprite name="heart" className="heartbeat relative size-24 drop-shadow-[0_0_14px_rgb(255_77_77/0.55)]" />
      </div>

      <svg viewBox="0 0 600 80" preserveAspectRatio="none" className="relative mt-5 h-12 w-full">
        <path d={ECG_PATH} fill="none" stroke="rgb(255 77 77 / 0.18)" strokeWidth="3" vectorEffect="non-scaling-stroke" />
        <path d={ECG_PATH} pathLength={1200} fill="none" stroke="var(--color-pop-red)" strokeWidth="3" strokeLinejoin="round" vectorEffect="non-scaling-stroke" className="ecg-line" />
      </svg>

      <div className="relative mt-5 flex items-center justify-between gap-3">
        <span className="font-pixel text-[11px] text-subtle">HP</span>
        <div className="flex gap-1.5">
          {Array.from({ length: 5 }, (_, index) => (
            <PixelSprite key={index} name="heart" className="size-5" />
          ))}
        </div>
      </div>
      <p className="relative mt-4 text-center font-pixel text-[13px] text-fg">Feito com coração</p>
    </div>
  )
}

function History({ text }: { text: string }) {
  return (
    <div className="relative border-l-2 border-accent/60 pl-6 sm:pl-8">
      <p className="max-w-3xl whitespace-pre-line text-lg leading-relaxed text-muted text-pretty first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-wide first-letter:text-6xl first-letter:font-black first-letter:leading-[0.8] first-letter:text-accent">
        <WithHeart text={text} />
      </p>
      <div aria-hidden="true" className="mt-6 flex items-center gap-3 opacity-80">
        <PixelSprite name="controller" className="bob size-7" />
        <PixelSprite name="star" className="bob size-5 [animation-delay:-0.8s]" />
        <PixelSprite name="sparkle" className="bob size-5 [animation-delay:-1.6s]" />
        <span className="font-pixel text-[11px] text-subtle">Animes / games / edição / amizade</span>
      </div>
    </div>
  )
}

function Vision({ text }: { text: string }) {
  return (
    <figure className="pt-8">
      <span aria-hidden="true" className="block h-12 select-none font-wide text-[7rem] font-black leading-[0.85] text-pop-pink/40">
        “
      </span>
      <blockquote className="mt-4 max-w-3xl text-[clamp(1.35rem,2.4vw,2rem)] font-medium leading-snug tracking-[-0.01em] text-fg text-balance">
        <WithHeart text={text} />
      </blockquote>
    </figure>
  )
}

/** Processo como um mapa de fases de videogame. */
function ProcessMap({ steps }: { steps: string[] }) {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {steps.map((step, index) => {
        const last = index === steps.length - 1
        const progress = Math.round(((index + 1) / steps.length) * 100)
        return (
          <li
            key={step}
            className={cx(
              'group relative flex min-h-40 flex-col justify-between gap-6 border-2 bg-surface p-4 transition-transform duration-300 hover:-translate-y-1',
              last ? 'border-accent' : 'border-line-strong hover:border-fg',
            )}
          >
            <div className="flex items-center justify-between">
              <span className={cx('font-pixel text-[12px]', last ? 'text-accent' : 'text-subtle')}>{last ? 'Fase final' : `Fase ${pad(index + 1)}`}</span>
              {last ? <PixelSprite name="trophy" className="bob size-6" /> : <PixelSprite name="play" className="size-3 opacity-50 transition-opacity group-hover:opacity-100" />}
            </div>
            <p className="text-lg font-semibold leading-tight text-balance">{step}</p>
            <div aria-hidden="true" className="h-2 border border-line-strong p-px">
              <div className="h-full" style={{ width: `${progress}%`, background: last ? 'var(--color-accent)' : 'var(--color-pop-cyan)' }} />
            </div>
          </li>
        )
      })}
    </ol>
  )
}

/** Caixa de diálogo de RPG com o texto de vocês. */
function DialogBox({ text }: { text: string }) {
  return (
    <div className="relative mt-4 border-4 border-fg bg-ink p-6 pt-8 shadow-[10px_10px_0_rgb(0_0_0/0.6)] sm:p-8 sm:pt-10">
      <span className="absolute -top-4 left-5 flex items-center gap-2 border-2 border-ink bg-accent px-3 py-1.5 font-pixel text-[13px] text-ink">
        <PixelSprite name="heart" className="size-4" />
        Os Manos
      </span>
      <p className="max-w-3xl whitespace-pre-line text-lg leading-relaxed text-fg/90 text-pretty">
        <WithHeart text={text} />
      </p>
      <span aria-hidden="true" className="absolute bottom-3 right-4 font-pixel text-[13px] text-accent motion-safe:animate-blink">
        ▼
      </span>
    </div>
  )
}

/** Diferenciais como power-ups coletáveis. */
function PowerUps({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((item, index) => {
        const color = POWER_UP_COLORS[index % POWER_UP_COLORS.length]!
        return (
          <li
            key={item}
            className="group flex items-start gap-4 border-2 border-line-strong bg-surface p-5 transition-[border-color,translate] duration-300 hover:-translate-y-1 hover:border-[var(--power)] sm:last:odd:col-span-2"
            style={{ '--power': color } as CSSProperties}
          >
            <div className="grid size-12 shrink-0 place-items-center border-2 border-ink bg-ink" style={{ boxShadow: `inset 0 0 0 2px ${color}` }}>
              <PixelSprite name={POWER_UP_SPRITES[index % POWER_UP_SPRITES.length]!} className="size-7 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" />
            </div>
            <div>
              <p className="font-pixel text-[11px]" style={{ color }}>
                Power-up {pad(index + 1)}
              </p>
              <p className="mt-1.5 text-lg font-medium leading-snug text-fg text-pretty">{item}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
