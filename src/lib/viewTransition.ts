import { flushSync } from 'react-dom'

/**
 * Aplica uma mudança de estado dentro de uma View Transition, quando o navegador suporta
 * e o usuário não pediu movimento reduzido. Caso contrário, aplica direto.
 */
export function withViewTransition(update: () => void) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!('startViewTransition' in document) || reduceMotion) {
    update()
    return
  }
  document.startViewTransition(() => flushSync(update))
}

/** Nome de view-transition seguro (apenas letras, números, - e _). */
export function transitionName(prefix: string, id: string): string {
  return `${prefix}-${id.replace(/[^a-zA-Z0-9_-]/g, '_')}`
}
