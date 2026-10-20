import { useEffect, useRef, useState } from 'react'
import { site } from '../data/site'
import { cx, pad } from '../lib/cx'

interface MobileMenuProps {
  items: readonly { id: string; label: string }[]
  active: string | null
}

export function MobileMenu({ items, active }: MobileMenuProps) {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const outside = [document.getElementById('conteudo'), document.querySelector('footer')]
    for (const element of outside) element?.setAttribute('inert', '')
    panelRef.current?.querySelector('a')?.focus()

    const close = (returnFocus: boolean) => {
      setOpen(false)
      if (returnFocus) buttonRef.current?.focus()
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close(true)
    }
    const desktop = window.matchMedia('(min-width: 48rem)')
    const onResize = () => desktop.matches && close(false)

    document.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onResize)
    return () => {
      for (const element of outside) element?.removeAttribute('inert')
      document.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onResize)
    }
  }, [open])

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="menu-mobile"
        onClick={() => setOpen((value) => !value)}
        className="label-mono flex h-10 items-center gap-3 border border-line-strong px-3 text-fg"
      >
        {open ? 'Fechar' : 'Menu'}
        <span aria-hidden="true" className="relative block h-2.5 w-4">
          <span className={cx('absolute left-0 h-px w-4 bg-current transition-transform', open ? 'top-1/2 rotate-45' : 'top-0')} />
          <span className={cx('absolute left-0 h-px w-4 bg-current transition-transform', open ? 'top-1/2 -rotate-45' : 'bottom-0')} />
        </span>
      </button>

      <div
        ref={panelRef}
        id="menu-mobile"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto border-t border-line bg-bg"
      >
        <nav aria-label="Menu" className="container-page flex min-h-full flex-col justify-between py-8">
          <ul>
            {items.map((item, index) => (
              <li key={item.id} className="border-b border-line">
                <a
                  href={`#${item.id}`}
                  onClick={(event) => {
                    // Fecha o menu (liberando a rolagem) antes de rolar até a seção.
                    event.preventDefault()
                    setOpen(false)
                    requestAnimationFrame(() => {
                      document.getElementById(item.id)?.scrollIntoView()
                      history.pushState(null, '', `#${item.id}`)
                    })
                  }}
                  aria-current={active === item.id ? 'location' : undefined}
                  className="flex items-baseline gap-4 py-4"
                >
                  <span className="label-mono text-subtle">{pad(index)}</span>
                  <span className={cx('font-wide text-3xl font-extrabold uppercase tracking-tight', active === item.id && 'text-accent')}>
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="label-mono mt-10 text-subtle">{site.name} — {site.tagline}</p>
        </nav>
      </div>
    </div>
  )
}
