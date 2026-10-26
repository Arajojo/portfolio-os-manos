import type { CSSProperties } from 'react'
import { useI18n } from '../../i18n/context'
import { cx } from '../../lib/cx'
import type { SpriteName } from '../../lib/sprites'
import { PixelSprite } from './PixelSprite'

const SPRITE_CYCLE: SpriteName[] = ['star', 'coin', 'heart', 'controller', 'ghost', 'sparkle']

interface MarqueeProps {
  items: string[]
  tone: 'accent' | 'ink' | 'pink'
  reverse?: boolean
  rotate?: number
  duration?: number
  className?: string
}

const TONES = {
  accent: 'bg-accent text-ink border-ink',
  ink: 'bg-ink text-fg border-line-strong',
  pink: 'bg-pop-pink text-ink border-ink',
}

/** Faixa que corre na horizontal. Puramente decorativa (aria-hidden). */
export function Marquee({ items, tone, reverse, rotate = 0, duration = 40, className }: MarqueeProps) {
  // Repete os itens para a faixa nunca ficar com buraco em telas largas.
  const row = [...items, ...items]
  const style = { rotate: `${rotate}deg`, '--marquee-duration': `${duration}s` } as CSSProperties

  return (
    <div aria-hidden="true" className={cx('marquee overflow-hidden border-y-2 py-2.5', TONES[tone], className)} data-reverse={reverse ? '' : undefined} style={style}>
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {row.map((item, index) => (
              <span key={`${copy}-${index}`} className="flex items-center gap-5 px-5 font-wide text-xl font-black uppercase tracking-tight sm:text-2xl">
                {item}
                <PixelSprite name={SPRITE_CYCLE[index % SPRITE_CYCLE.length]!} className="size-5 sm:size-6" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/** Duas faixas cruzadas entre seções, como fita adesiva colada na página. */
export function TapeDivider({ variant = 'default' }: { variant?: 'default' | 'alt' }) {
  const { c } = useI18n()
  const { tickerGames, tickerMemes } = c
  return (
    <div className="relative overflow-hidden py-10 sm:py-14">
      <Marquee items={variant === 'alt' ? tickerMemes : tickerGames} tone="accent" rotate={-2.5} duration={45} className="relative z-10 -mx-8" />
      <Marquee
        items={variant === 'alt' ? tickerGames : tickerMemes}
        tone={variant === 'alt' ? 'pink' : 'ink'}
        rotate={2}
        duration={55}
        reverse
        className="-mx-8 -mt-6 sm:-mt-8"
      />
    </div>
  )
}
