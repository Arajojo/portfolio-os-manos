import { editors } from '../data/editors'
import { useI18n } from '../i18n/context'
import { cx } from '../lib/cx'
import { PLAYER_COLORS } from '../lib/players'
import { PlayerCard } from './PlayerCard'
import { SectionHeading } from './SectionHeading'

/** Seção "O Design": mesmo card de seleção dos editores, continuando a numeração dos players. */
export function Design() {
  const { t, c } = useI18n()
  const designers = c.designers
  if (designers.length === 0) return null
  const colorOf = (index: number) => designers[index]?.color ?? PLAYER_COLORS[(editors.length + index) % PLAYER_COLORS.length]!

  return (
    <section id="design" aria-labelledby="design-titulo" className="container-page py-20 lg:py-28">
      <SectionHeading
        id="design-titulo"
        index="04"
        label={t.sections.design}
        sprite="sparkle"
        title={c.site.sections.design.title}
        intro={c.site.sections.design.intro}
      />

      <p aria-hidden="true" className="mt-16 text-center font-pixel text-[14px] sm:text-base lg:mt-20" style={{ color: colorOf(0) }}>
        {t.design.tagline}<span className="motion-safe:animate-blink">_</span>
      </p>

      <div className={cx('mt-10 grid gap-8', designers.length === 1 ? 'mx-auto max-w-xl' : 'lg:grid-cols-2 lg:gap-10')}>
        {designers.map((designer, index) => {
          const player = editors.length + index
          return (
            <PlayerCard
              key={designer.id}
              id={`design-${designer.id}`}
              tag={`P${player + 1}`}
              label={designer.role}
              color={colorOf(index)}
              revealDelay={index * 120}
              person={designer}
              handle={designer.handle}
              tagline={designer.tagline}
              bio={designer.bio}
              bioHint="src/data/design.ts"
              tagGroups={[{ term: t.editors.specialties, items: [...(designer.specialties ?? [])] }]}
              primaryLink={designer.profile}
              socials={designer.socials}
            />
          )
        })}
      </div>
    </section>
  )
}
