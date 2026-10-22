import type { Niche } from '../types'

/**
 * Nichos de canal que o estúdio atende. Aparecem em destaque na seção
 * "O que editamos" e viram um filtro da galeria quando houver projetos dos dois.
 *
 * - `formats`: exemplos de formatos do nicho (texto livre, um por item).
 * - `showOnSite: false` esconde o nicho da seção.
 *
 * Nos projetos, use `niche: 'gaming'`, `niche: 'dark'` ou `niche: 'criadores'` (vlogs, podcasts e outros).
 * Projetos com `game` preenchido e sem `niche` contam como 'gaming'.
 */
export const niches = [
  {
    id: 'gaming',
    name: 'YouTube Gaming',
    description: 'Gameplays, Shorts e séries para canais de jogos, com ritmo, humor e os melhores momentos em evidência.',
    formats: ['Gameplay comentada', 'Shorts', 'Highlights e montagens', 'Séries e desafios'],
    showOnSite: true,
  },
  {
    id: 'dark',
    name: 'Canais dark',
    description:
      'Edição para canais sem rosto: narração, banco de imagens, legendas, trilha e sound design para prender quem assiste do começo ao fim.',
    formats: ['Narração e storytelling', 'Curiosidades e listas', 'Terror e mistério', 'True crime', 'Documentários curtos'],
    showOnSite: true,
  },
  {
    id: 'criadores',
    name: 'Vlogs e outros nichos',
    description:
      'Não é só game: editamos para todo tipo de YouTuber. Vlogs, podcasts, reacts, tutoriais e reviews com o mesmo cuidado, ritmo e personalidade.',
    formats: ['Vlogs e lifestyle', 'Podcasts e cortes', 'Reacts e comentários', 'Tutoriais e educativos', 'Reviews e unboxings'],
    showOnSite: true,
  },
] as const satisfies readonly Niche[]

export type NicheId = (typeof niches)[number]['id']
