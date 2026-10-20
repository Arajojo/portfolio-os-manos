import type { ReactNode } from 'react'
import { cx } from '../lib/cx'

/** Aviso de conteúdo não configurado. Aparece só em desenvolvimento (npm run dev), nunca no site publicado. */
export function PendingNote({ children, className }: { children: ReactNode; className?: string }) {
  if (!import.meta.env.DEV) return null
  return (
    <p className={cx('label-mono border border-dashed border-line-strong px-3 py-2 normal-case tracking-normal text-subtle', className)}>
      <span className="text-accent">Pendente de configuração</span> — {children}
    </p>
  )
}
