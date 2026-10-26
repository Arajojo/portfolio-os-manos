import { useI18n } from '../i18n/context'
import type { Editor, Project } from '../types'
import { PixelSprite } from './art/PixelSprite'
import { PLAYER_COLORS } from '../lib/players'
import { PlayerCard } from './PlayerCard'
import { SectionHeading } from './SectionHeading'

interface EditorsProps {
  projects: Project[]
  onShowWork: (editorId: string) => void
}

export function Editors({ projects, onShowWork }: EditorsProps) {
  const { t, c } = useI18n()
  const list: readonly Editor[] = c.editors

  return (
    <section id="editores" aria-labelledby="editores-titulo" className="container-page py-20 lg:py-28">
      <SectionHeading
        id="editores-titulo"
        index="03"
        label={t.sections.editors}
        sprite="controller"
        title={c.site.sections.editors.title}
        intro={c.site.sections.editors.intro}
      />

      <p aria-hidden="true" className="mt-16 text-center font-pixel text-[14px] text-accent sm:text-base lg:mt-20">
        {t.editors.pick}<span className="motion-safe:animate-blink">_</span>
      </p>

      <div className="mt-10 grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-10">
        {list.map((editor, index) => (
          <PlayerSlot
            key={editor.id}
            editor={editor}
            index={index}
            showVersus={index === 0 && list.length > 1}
            projectCount={projects.filter((project) => project.editorId === editor.id).length}
            onShowWork={onShowWork}
          />
        ))}
      </div>
    </section>
  )
}

interface PlayerSlotProps {
  editor: Editor
  index: number
  showVersus: boolean
  projectCount: number
  onShowWork: (editorId: string) => void
}

function PlayerSlot({ showVersus, ...props }: PlayerSlotProps) {
  return (
    <>
      <EditorCard {...props} />
      {showVersus && <Versus />}
    </>
  )
}

function Versus() {
  return (
    <div aria-hidden="true" className="relative flex items-center justify-center py-2 lg:py-0">
      <PixelSprite name="sparkle" className="bob absolute -left-2 top-0 size-6 lg:-top-10 lg:left-0" />
      <span className="glitch font-wide text-7xl font-black italic leading-none tracking-tighter text-accent lg:text-9xl">VS</span>
      <PixelSprite name="bolt" className="bob absolute -right-2 bottom-0 size-7 [animation-delay:-1s] lg:-bottom-10 lg:right-0" />
    </div>
  )
}

function EditorCard({ editor, index, projectCount, onShowWork }: Omit<PlayerSlotProps, 'showVersus'>) {
  const { t, c } = useI18n()
  const specialties = (editor.specialties ?? []).map((id) => c.serviceName(id)).filter((name): name is string => Boolean(name))
  const editorGames = (editor.games ?? []).map((id) => c.gameName(id)).filter((name): name is string => Boolean(name))

  return (
    <PlayerCard
      id={`editor-${editor.id}`}
      tag={`P${index + 1}`}
      label={t.editors.player(index + 1)}
      color={PLAYER_COLORS[index % PLAYER_COLORS.length]!}
      revealDelay={index * 120}
      person={editor}
      handle={editor.handle}
      tagline={editor.tagline}
      bio={editor.bio}
      bioHint="src/data/editors.ts"
      tagGroups={[
        { term: t.editors.specialties, items: specialties },
        { term: t.editors.games, items: editorGames },
      ]}
      primaryLink={{ label: t.editors.channel, url: editor.channelUrl }}
      socials={editor.socials}
      extraAction={
        projectCount > 0 && (
          <button type="button" onClick={() => onShowWork(editor.id)} className="btn-secondary">
            {t.specialties.see(projectCount)}
          </button>
        )
      }
    />
  )
}
