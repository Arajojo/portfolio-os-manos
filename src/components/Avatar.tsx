import { useState } from 'react'
import { resolveAsset } from '../lib/assets'
import { cx } from '../lib/cx'
import type { Editor } from '../types'

/** Fotos que já falharam nesta sessão, para não piscar ao reabrir modais. */
const failedPhotos = new Set<string>()

interface AvatarProps {
  editor: Pick<Editor, 'photo' | 'displayName'>
  alt: string
  className?: string
  /** Classes do avatar substituto (inicial do nome). */
  monogramClassName?: string
  /** 'none' não exibe nada quando a foto não existe. */
  fallback?: 'monogram' | 'none'
}

export function Avatar({ editor, alt, className, monogramClassName, fallback = 'monogram' }: AvatarProps) {
  const src = resolveAsset(editor.photo)
  const [failed, setFailed] = useState(() => !src || failedPhotos.has(src))

  if (!src || failed) {
    if (fallback === 'none') return null
    return (
      <span
        aria-hidden="true"
        className={cx(
          'inline-flex shrink-0 select-none items-center justify-center bg-surface-2 font-wide font-black uppercase text-accent',
          monogramClassName ?? cx('rounded-full ring-1 ring-line-strong', className),
        )}
      >
        {editor.displayName.charAt(0)}
      </span>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={cx('shrink-0 bg-surface-2 object-cover', className)}
      onError={() => {
        failedPhotos.add(src)
        setFailed(true)
      }}
    />
  )
}
