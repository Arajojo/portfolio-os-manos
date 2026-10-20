import { createContext, useContext } from 'react'
import type { Achievement } from '../data/memes'

export interface AchievementsState {
  /** Conquistas possíveis neste site (ex.: "Cinéfilo" só existe se houver vídeos). */
  list: Achievement[]
  unlocked: ReadonlySet<string>
  unlock: (id: string) => void
}

export const AchievementsContext = createContext<AchievementsState>({
  list: [],
  unlocked: new Set(),
  unlock: () => {},
})

export function useAchievements() {
  return useContext(AchievementsContext)
}
