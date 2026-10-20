import { useRef, type CSSProperties, type PointerEvent } from 'react'
import type { Sticker, StickerColor } from '../../data/memes'
import { cx } from '../../lib/cx'
import { PixelSprite } from './PixelSprite'

const COLORS: Record<StickerColor, string> = {
  accent: 'bg-accent text-ink',
  pink: 'bg-pop-pink text-ink',
  cyan: 'bg-pop-cyan text-ink',
  yellow: 'bg-pop-yellow text-ink',
  white: 'bg-fg text-ink',
  red: 'bg-pop-red text-ink',
  purple: 'bg-pop-purple text-ink',
}

/** Adesivo que dá para arrastar com mouse ou dedo. É um brinquedo decorativo (aria-hidden). */
function DraggableSticker({ sticker, index }: { sticker: Sticker; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const offset = useRef({ x: 0, y: 0 })
  const drag = useRef<{ startX: number; startY: number; x: number; y: number } | null>(null)

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    drag.current = { startX: event.clientX, startY: event.clientY, ...offset.current }
    event.currentTarget.dataset.dragging = ''
  }
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current || !ref.current) return
    offset.current = {
      x: drag.current.x + event.clientX - drag.current.startX,
      y: drag.current.y + event.clientY - drag.current.startY,
    }
    ref.current.style.translate = `${offset.current.x}px ${offset.current.y}px`
  }
  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    drag.current = null
    delete event.currentTarget.dataset.dragging
  }

  // Posição em variáveis CSS: no celular usa mobileX/mobileY quando definidos.
  const style = {
    '--x': `${sticker.x}%`,
    '--y': `${sticker.y}%`,
    '--mobile-x': `${sticker.mobileX ?? sticker.x}%`,
    '--mobile-y': `${sticker.mobileY ?? sticker.y}%`,
    rotate: `${sticker.rotate}deg`,
  } as CSSProperties
  const bob = { '--bob-delay': `${-index * 0.7}s`, '--bob-duration': `${3.4 + (index % 3) * 0.6}s` } as CSSProperties

  return (
    <div
      ref={ref}
      className={cx(
        'sticker pointer-events-auto left-(--mobile-x) top-(--mobile-y) md:left-(--x) md:top-(--y)',
        sticker.desktopOnly && 'hidden md:block',
      )}
      style={style}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div className="sticker-inner" style={bob}>
        {sticker.sprite ? (
          <PixelSprite name={sticker.sprite} className="size-10 sm:size-14 lg:size-16" />
        ) : (
          <span className={cx('block whitespace-nowrap border-2 border-ink px-2.5 py-2 font-pixel text-[13px] sm:text-[15px]', COLORS[sticker.color ?? 'white'])}>
            {sticker.text}
          </span>
        )}
      </div>
    </div>
  )
}

export function Stickers({ items }: { items: Sticker[] }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
      {items.map((sticker, index) => (
        <DraggableSticker key={`${sticker.text ?? sticker.sprite}-${index}`} sticker={sticker} index={index} />
      ))}
    </div>
  )
}
