import type { ReactNode, Ref } from 'react'
import type { SpriteName } from '../lib/sprites'
import { PixelSprite } from './art/PixelSprite'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  id: string
  index: string
  label: string
  title: ReactNode
  intro?: string
  /** Pixel art ao lado do rótulo da seção. */
  sprite?: SpriteName
  ref?: Ref<HTMLHeadingElement>
}

/** Cabeçalho de seção com numeração estilo timecode. O título recebe foco quando um filtro leva até a seção. */
export function SectionHeading({ id, index, label, title, intro, sprite, ref }: SectionHeadingProps) {
  return (
    <Reveal className="grid gap-6 border-t border-line pt-5 lg:grid-cols-12">
      <div className="label-mono flex justify-between gap-4 text-subtle lg:col-span-3 lg:flex-col lg:justify-start">
        <span className="flex items-center gap-2">
          {sprite && <PixelSprite name={sprite} className="bob size-4" />}
          <span className="text-accent">{index}</span> / {label}
        </span>
        <span aria-hidden="true">TC 00:{index}:00:00</span>
      </div>
      <div className="lg:col-span-9">
        <h2
          id={id}
          ref={ref}
          tabIndex={-1}
          className="font-wide text-[clamp(2.5rem,7.5vw,7rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.03em] text-balance focus:outline-none"
        >
          {title}
        </h2>
        {intro && <p className="mt-6 max-w-xl text-lg text-muted text-pretty">{intro}</p>}
      </div>
    </Reveal>
  )
}
