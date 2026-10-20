import { useEffect, useRef } from 'react'

/**
 * Inclinação 3D que acompanha o mouse (use junto com a classe .tilt).
 * Desligada em telas de toque e para quem prefere movimento reduzido.
 */
export function useTilt<T extends HTMLElement>(maxDegrees = 8) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!canHover || reduceMotion) return

    const onMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect()
      const px = (event.clientX - rect.left) / rect.width
      const py = (event.clientY - rect.top) / rect.height
      element.style.setProperty('--ry', `${(px - 0.5) * 2 * maxDegrees}deg`)
      element.style.setProperty('--rx', `${-(py - 0.5) * 2 * maxDegrees}deg`)
      element.style.setProperty('--mx', `${px * 100}%`)
      element.style.setProperty('--my', `${py * 100}%`)
    }
    const onLeave = () => {
      element.style.setProperty('--rx', '0deg')
      element.style.setProperty('--ry', '0deg')
    }

    element.addEventListener('pointermove', onMove)
    element.addEventListener('pointerleave', onLeave)
    return () => {
      element.removeEventListener('pointermove', onMove)
      element.removeEventListener('pointerleave', onLeave)
    }
  }, [maxDegrees])

  return ref
}
