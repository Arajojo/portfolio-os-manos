import { useI18n } from '../i18n/context'
import type { Locale } from '../i18n/types'
import { cx } from '../lib/cx'

const LOCALES: Locale[] = ['pt', 'en']

/** Seletor de idioma PT | EN, no mesmo estilo dos botões do header. */
export function LanguageSwitch({ className }: { className?: string }) {
  const { locale, setLocale, t } = useI18n()

  return (
    <div role="group" aria-label={t.language.label} className={cx('h-10 border border-line-strong', className)}>
      {LOCALES.map((code) => (
        <button
          key={code}
          type="button"
          lang={code === 'pt' ? 'pt-BR' : 'en'}
          aria-pressed={locale === code}
          aria-label={t.language[code]}
          onClick={() => setLocale(code)}
          className={cx('label-mono px-2.5 transition-colors', locale === code ? 'bg-fg text-ink' : 'text-subtle hover:text-fg')}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
