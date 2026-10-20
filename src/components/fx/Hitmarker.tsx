import { useEffect } from 'react'

const HITMARKER_SVG =
  '<svg viewBox="0 0 26 26" width="26" height="26"><g stroke="#0a0a0a" stroke-width="4" stroke-linecap="square"><path d="M4 4l5 5M22 4l-5 5M4 22l5-5M22 22l-5-5"/></g><g stroke="#f2f2f2" stroke-width="2" stroke-linecap="square"><path d="M4 4l5 5M22 4l-5 5M4 22l5-5M22 22l-5-5"/></g></svg>'

/** Hitmarker (o "X" dos jogos de tiro) onde o mouse clica. Só com mouse e sem movimento reduzido. */
export function Hitmarker() {
  useEffect(() => {
    const canHover = window.matchMedia('(pointer: fine)').matches
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!canHover || reduceMotion) return

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return
      const marker = document.createElement('div')
      marker.className = 'hitmarker'
      marker.setAttribute('aria-hidden', 'true')
      marker.style.left = `${event.clientX}px`
      marker.style.top = `${event.clientY}px`
      marker.innerHTML = HITMARKER_SVG
      marker.addEventListener('animationend', () => marker.remove())
      document.body.append(marker)
    }

    window.addEventListener('pointerdown', onPointerDown)
    return () => window.removeEventListener('pointerdown', onPointerDown)
  }, [])

  return null
}
