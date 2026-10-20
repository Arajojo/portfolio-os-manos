import { memo } from 'react'
import { PALETTE, SPRITES, type SpriteName } from '../../lib/sprites'

export type { SpriteName }

interface PixelSpriteProps {
  name: SpriteName
  className?: string
  /** Texto alternativo; sem ele o sprite é decorativo. */
  title?: string
}

/** Junta pixels vizinhos da mesma cor em um único retângulo (menos elementos no SVG). */
function toRects(rows: string[]) {
  const rects: { x: number; y: number; w: number; fill: string }[] = []
  rows.forEach((row, y) => {
    let x = 0
    while (x < row.length) {
      const char = row[x]!
      if (char === '.' || !PALETTE[char]) {
        x++
        continue
      }
      let w = 1
      while (row[x + w] === char) w++
      rects.push({ x, y, w, fill: PALETTE[char]! })
      x += w
    }
  })
  return rects
}

export const PixelSprite = memo(function PixelSprite({ name, className, title }: PixelSpriteProps) {
  const rows = SPRITES[name]
  const width = Math.max(...rows.map((row) => row.length))
  return (
    <svg
      viewBox={`0 0 ${width} ${rows.length}`}
      shapeRendering="crispEdges"
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {toRects(rows).map((rect) => (
        <rect key={`${rect.x}-${rect.y}`} x={rect.x} y={rect.y} width={rect.w} height={1} fill={rect.fill} />
      ))}
    </svg>
  )
})
