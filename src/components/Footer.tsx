import { useEffect, useState } from 'react'
import { editors } from '../data/editors'
import { site } from '../data/site'
import { isSafeUrl } from '../lib/contact'
import { PixelSprite } from './art/PixelSprite'

const YEAR = new Date().getFullYear()

/** "CONTINUE? 9… 8… 7…" dos fliperamas. O link leva de volta ao topo. */
function ContinueCountdown() {
  const [seconds, setSeconds] = useState(9)

  useEffect(() => {
    const timer = window.setInterval(() => setSeconds((value) => (value === 0 ? 9 : value - 1)), 1000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <a href="#inicio" className="group inline-flex items-center gap-4">
      <span className="font-pixel text-base text-fg sm:text-lg">Continue?</span>
      <span aria-hidden="true" className="w-8 font-pixel text-3xl tabular-nums text-accent sm:text-4xl">
        {seconds}
      </span>
      <span className="label-mono text-subtle transition-colors group-hover:text-accent">
        Voltar ao topo <span aria-hidden="true">↑</span>
      </span>
    </a>
  )
}

export function Footer() {
  const socials = site.socials.filter((social) => social.label && isSafeUrl(social.url))
  const external = [...editors.map((editor) => ({ label: editor.handle, url: editor.channelUrl })), ...socials]

  return (
    <footer className="overflow-hidden border-t border-line">
      <div className="container-page pb-10 pt-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <ContinueCountdown />
          <p aria-hidden="true" className="flex items-center gap-3 font-pixel text-[13px] text-subtle">
            <PixelSprite name="trophy" className="bob size-5" />
            Obrigado por jogar
          </p>
        </div>

        {/* Wordmark vazado: cada letra acende ao passar o mouse */}
        <p
          aria-hidden="true"
          className="mt-12 select-none whitespace-nowrap font-wide text-[clamp(2.75rem,11.5vw,12rem)] font-black uppercase leading-[0.8] tracking-[-0.045em] text-line-strong"
        >
          {[...'Os Manos'].map((letter, index) => (
            <span key={index} className="wm-letter text-outline">
              {letter === ' ' ? ' ' : letter}
            </span>
          ))}
        </p>

        <div className="label-mono mt-10 flex flex-col gap-6 text-subtle md:flex-row md:items-end md:justify-between">
          <p>
            © {YEAR} {site.name} — {site.tagline}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {external.map((link) => (
              <li key={link.url}>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="normal-case tracking-normal transition-colors hover:text-accent">
                  {link.label} <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
