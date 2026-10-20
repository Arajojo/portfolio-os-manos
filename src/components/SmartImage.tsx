import { useState, type ReactNode } from 'react'

interface SmartImageProps {
  /** Fontes em ordem de preferência; se uma falhar, tenta a próxima. */
  sources: string[]
  alt: string
  className?: string
  /** Exibido quando nenhuma fonte carrega. */
  fallback: ReactNode
  eager?: boolean
}

export function SmartImage({ sources, alt, className, fallback, eager = false }: SmartImageProps) {
  const key = sources.join('|')
  const [state, setState] = useState({ key, index: 0, loaded: false })
  const current = state.key === key ? state : { key, index: 0, loaded: false }
  const src = sources[current.index]

  if (!src) return <>{fallback}</>

  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'auto'}
      decoding="async"
      className={className}
      data-fade=""
      data-loaded={current.loaded ? '' : undefined}
      onLoad={() => setState({ key, index: current.index, loaded: true })}
      onError={() => setState({ key, index: current.index + 1, loaded: false })}
    />
  )
}
