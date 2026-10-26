import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n/context'
import { cx } from '../lib/cx'
import { AchievementsHud } from './fx/Achievements'
import { LanguageSwitch } from './LanguageSwitch'
import { MobileMenu } from './MobileMenu'

const SECTION_IDS = ['inicio', 'portfolio', 'especialidades', 'editores', 'sobre', 'contato'] as const

/** Seção visível no centro da tela, para destacar o link correspondente. */
function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const id of ids) {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    }
    return () => observer.disconnect()
  }, [ids])

  return active
}


export function Header() {
  const { t, locale } = useI18n()
  const active = useActiveSection(SECTION_IDS)
  const navItems = SECTION_IDS.map((id) => ({ id, label: t.nav[id] }))
  const links = navItems.filter((item) => item.id !== 'contato')
  const listRef = useRef<HTMLUListElement>(null)
  const indicatorRef = useRef<HTMLSpanElement>(null)

  // Indicador único que desliza até o link da seção ativa.
  useLayoutEffect(() => {
    const place = () => {
      const list = listRef.current
      const indicator = indicatorRef.current
      if (!list || !indicator) return
      const link = list.querySelector<HTMLElement>('a[aria-current]')
      if (!link) {
        indicator.style.opacity = '0'
        return
      }
      const offset = link.getBoundingClientRect().left - list.getBoundingClientRect().left
      indicator.style.opacity = '1'
      indicator.style.width = `${link.offsetWidth}px`
      indicator.style.translate = `${offset}px 0`
    }
    place()
    document.fonts.ready.then(place)
    window.addEventListener('resize', place)
    return () => window.removeEventListener('resize', place)
  }, [active, locale])

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/95">
      <span aria-hidden="true" className="scroll-progress absolute inset-x-0 -bottom-px h-px bg-accent/70" />
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <a href="#inicio" className="group flex items-center gap-2.5" aria-label={t.header.homeAria}>
          <span aria-hidden="true" className="size-2.5 bg-accent transition-transform group-hover:rotate-45" />
          <span className="font-wide text-base font-extrabold uppercase tracking-tight">Os Manos</span>
        </a>

        <nav aria-label={t.header.mainNav} className="hidden md:block">
          <ul ref={listRef} className="relative flex items-center gap-6 lg:gap-8">
            {links.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? 'location' : undefined}
                  className={cx(
                    'label-mono relative py-2 transition-colors hover:text-fg',
                    active === item.id ? 'text-fg' : 'text-subtle',
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <span
              ref={indicatorRef}
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-2.5 left-0 h-px w-0 bg-accent opacity-0 transition-[translate,width,opacity] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)]"
            />
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitch className="hidden md:flex" />
          <AchievementsHud />
        <a
          href="#contato"
          aria-current={active === 'contato' ? 'location' : undefined}
          className="label-mono hidden items-center gap-2 border border-line-strong px-3 py-2 text-fg transition-colors hover:border-accent hover:text-accent md:inline-flex"
        >
          {t.nav.contato} <span aria-hidden="true">→</span>
        </a>

        <MobileMenu items={navItems} active={active} />
        </div>
      </div>
    </header>
  )
}
