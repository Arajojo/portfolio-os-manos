import { useI18n } from '../i18n/context'
import { getEditor } from '../lib/content'
import { Avatar } from './Avatar'

interface EditorCreditProps {
  editorId?: string
  /** 'sm' na galeria, 'lg' nos detalhes do vídeo. */
  size?: 'sm' | 'lg'
}

/**
 * Assinatura "Editado por @arroba". Os dados vêm sempre de src/data/editors.ts.
 * Sem editor ou com ID inválido, não exibe nada.
 */
export function EditorCredit({ editorId, size = 'sm' }: EditorCreditProps) {
  const { t } = useI18n()
  const editor = getEditor(editorId)
  if (!editor) return null

  const handleLink = (
    <a
      href={editor.channelUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="normal-case tracking-normal text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
    >
      {editor.handle}
      <span className="sr-only">{t.credit.channelNewTab}</span>
    </a>
  )

  if (size === 'sm') {
    return (
      <p className="label-mono flex flex-wrap items-center gap-x-2 gap-y-1 text-subtle">
        <Avatar editor={editor} alt="" fallback="none" className="size-5 rounded-full" />
        <span>{t.credit.editedBy}</span>
        {handleLink}
      </p>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <Avatar
        editor={editor}
        alt={t.credit.photoOf(editor.displayName)}
        className="size-14 rounded-full"
        monogramClassName="size-14 rounded-full text-xl ring-1 ring-line-strong"
      />
      <div className="min-w-0">
        <p className="text-base text-muted">
          {t.credit.editedBy} <span className="font-semibold">{handleLink}</span>
        </p>
        <a
          href={editor.channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="label-mono mt-1 inline-block text-subtle transition-colors hover:text-accent"
        >
          {t.credit.viewProfile} <span className="normal-case">{editor.displayName}</span> ↗<span className="sr-only">{t.credit.newTab}</span>
        </a>
      </div>
    </div>
  )
}
