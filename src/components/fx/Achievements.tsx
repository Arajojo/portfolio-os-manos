import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { achievements, type Achievement } from '../../data/memes'
import { AchievementsContext, useAchievements } from '../../hooks/useAchievements'
import { useI18n } from '../../i18n/context'
import { cx } from '../../lib/cx'
import type { SpriteName } from '../../lib/sprites'
import { PixelSprite } from '../art/PixelSprite'

const STORAGE_KEY = 'os-manos:conquistas'
const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
const SECTION_ACHIEVEMENTS = ['portfolio', 'especialidades', 'editores', 'contato']
const PLATINUM: Achievement = { id: 'platina', title: 'Platinou!', description: '100% das conquistas do site', sprite: 'trophy' }
const CONFETTI_SPRITES: SpriteName[] = ['coin', 'heart', 'star', 'controller', 'ghost', 'sparkle', 'skull', 'trophy']

function readStored(): Set<string> {
  try {
    return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as string[])
  } catch {
    return new Set()
  }
}

function store(ids: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]))
  } catch {
    // Sem armazenamento (aba anônima etc.): as conquistas valem só nesta visita.
  }
}

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

interface ProviderProps {
  children: ReactNode
  /** false remove a conquista "Cinéfilo" enquanto não há vídeos publicados. */
  hasProjects: boolean
}

/**
 * Sistema de conquistas: desbloqueia ao explorar as seções, abrir um vídeo,
 * chegar ao rodapé ou digitar o código secreto. Fica salvo no navegador de quem visita.
 */
export function AchievementsProvider({ children, hasProjects }: ProviderProps) {
  const list = useMemo(() => achievements.filter((item) => hasProjects || item.id !== 'video'), [hasProjects])
  const [unlocked, setUnlocked] = useState<Set<string>>(readStored)
  const [queue, setQueue] = useState<Achievement[]>([])
  const [confetti, setConfetti] = useState(0)
  const unlockedRef = useRef(unlocked)

  const celebrate = useCallback(() => {
    if (reduceMotion()) return
    setConfetti((value) => value + 1)
    document.body.classList.remove('shake')
    void document.body.offsetWidth
    document.body.classList.add('shake')
  }, [])

  const unlock = useCallback(
    (id: string) => {
      const achievement = list.find((item) => item.id === id)
      if (!achievement || unlockedRef.current.has(id)) return
      const next = new Set(unlockedRef.current).add(id)
      unlockedRef.current = next
      setUnlocked(next)
      store(next)
      const completed = list.every((item) => next.has(item.id))
      setQueue((current) => [...current, achievement, ...(completed ? [PLATINUM] : [])])
      if (id === 'konami' || completed) celebrate()
    },
    [list, celebrate],
  )

  // Seções vistas
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          unlock(entry.target.tagName === 'FOOTER' ? 'fim' : entry.target.id)
        }
      },
      { rootMargin: '-40% 0px -40% 0px' },
    )
    for (const id of SECTION_ACHIEVEMENTS) {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    }
    const footer = document.querySelector('footer')
    if (footer) observer.observe(footer)
    return () => observer.disconnect()
  }, [unlock])

  // Código secreto ↑↑↓↓←→←→BA
  useEffect(() => {
    let position = 0
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key
      position = key === KONAMI[position] ? position + 1 : key === KONAMI[0] ? 1 : 0
      if (position === KONAMI.length) {
        position = 0
        if (unlockedRef.current.has('konami')) celebrate()
        else unlock('konami')
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [unlock, celebrate])

  const value = useMemo(() => ({ list, unlocked, unlock }), [list, unlocked, unlock])

  return (
    <AchievementsContext.Provider value={value}>
      {children}
      <AchievementToast queue={queue} onDone={() => setQueue((current) => current.slice(1))} />
      {confetti > 0 && <Confetti key={confetti} />}
    </AchievementsContext.Provider>
  )
}

/** Título e descrição da conquista no idioma escolhido. */
function useAchievementText() {
  const { t, c } = useI18n()
  return (achievement: Achievement) =>
    achievement.id === PLATINUM.id
      ? { title: t.achievements.platinumTitle, description: t.achievements.platinumDescription }
      : (c.achievements.find((item) => item.id === achievement.id) ?? achievement)
}

function AchievementToast({ queue, onDone }: { queue: Achievement[]; onDone: () => void }) {
  const { t } = useI18n()
  const textOf = useAchievementText()
  const current = queue[0]
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (!current) return
    const leave = window.setTimeout(() => setLeaving(true), 2600)
    const done = window.setTimeout(() => {
      setLeaving(false)
      onDone()
    }, 2900)
    return () => {
      window.clearTimeout(leave)
      window.clearTimeout(done)
    }
  }, [current, onDone])

  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed bottom-4 left-4 z-[60] max-w-[calc(100vw-2rem)] sm:bottom-6 sm:left-6">
      {current && (
        <div
          key={current.id}
          data-leaving={leaving ? '' : undefined}
          className="toast flex items-center gap-4 border-2 border-accent bg-ink p-3 pr-5 shadow-[6px_6px_0_rgb(0_0_0/0.6)]"
        >
          <div className="grid size-12 shrink-0 place-items-center bg-surface-2">
            <PixelSprite name={current.sprite} className="size-8" />
          </div>
          <div className="min-w-0">
            <p className="font-pixel text-[12px] text-accent">{t.achievements.unlocked}</p>
            <p className="mt-1 font-pixel text-[15px] text-fg">{textOf(current).title}</p>
            <p className="mt-1 text-sm text-muted">{textOf(current).description}</p>
          </div>
        </div>
      )}
    </div>
  )
}

function Confetti() {
  const [pieces] = useState(() =>
    Array.from({ length: 36 }, (_, index) => ({
      sprite: CONFETTI_SPRITES[index % CONFETTI_SPRITES.length]!,
      left: Math.random() * 100,
      delay: Math.random() * 0.6,
      fall: 1.8 + Math.random() * 1.4,
      drift: (Math.random() - 0.5) * 240,
      spin: (Math.random() - 0.5) * 1080,
      size: 20 + Math.random() * 22,
    })),
  )
  return (
    <div aria-hidden="true">
      {pieces.map((piece, index) => (
        <div
          key={index}
          className="confetti"
          style={
            {
              left: `${piece.left}vw`,
              animationDelay: `${piece.delay}s`,
              '--fall': `${piece.fall}s`,
              '--drift': `${piece.drift}px`,
              '--spin': `${piece.spin}deg`,
              width: piece.size,
              height: piece.size,
            } as CSSProperties
          }
        >
          <PixelSprite name={piece.sprite} className="block size-full" />
        </div>
      ))}
    </div>
  )
}

/** Contador de troféus no header, com a lista em um popover nativo (Popover API). */
export function AchievementsHud({ className }: { className?: string }) {
  const { list, unlocked } = useAchievements()
  const { t } = useI18n()
  const textOf = useAchievementText()
  const count = list.filter((item) => unlocked.has(item.id)).length

  return (
    <>
      <button
        type="button"
        popoverTarget="conquistas"
        className={cx('flex h-10 items-center gap-2 border border-line-strong px-2.5 transition-colors hover:border-accent', className)}
        aria-label={t.achievements.aria(count, list.length)}
      >
        <PixelSprite name="trophy" className="size-4" />
        <span className="font-pixel text-[13px] text-fg">
          {count}/{list.length}
        </span>
      </button>
      <div
        id="conquistas"
        popover="auto"
        className="achievements-popover w-[min(22rem,calc(100vw-2rem))] border-2 border-line-strong bg-surface p-4 text-fg shadow-[8px_8px_0_rgb(0_0_0/0.6)]"
      >
        <p className="font-pixel text-[14px] text-accent">
          {t.achievements.title} {count}/{list.length}
        </p>
        <ul className="mt-4 space-y-3">
          {list.map((item) => {
            const done = unlocked.has(item.id)
            const hidden = item.secret && !done
            return (
              <li key={item.id} className="flex items-center gap-3">
                <div className={cx('grid size-10 shrink-0 place-items-center bg-surface-2', !done && 'opacity-40 grayscale')}>
                  <PixelSprite name={hidden ? 'skull' : item.sprite} className="size-6" />
                </div>
                <div className="min-w-0">
                  <p className={cx('font-pixel text-[13px]', done ? 'text-fg' : 'text-subtle')}>{hidden ? '???' : textOf(item).title}</p>
                  <p className="mt-1 text-xs text-subtle">{hidden ? t.achievements.secret : textOf(item).description}</p>
                </div>
                {done && <span className="ml-auto font-pixel text-[13px] text-accent">✓</span>}
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
