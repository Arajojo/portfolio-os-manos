import type { Service } from '../types'

/**
 * Especialidades / estilos de edição.
 *
 * Também são as opções do campo `editingStyle` dos projetos.
 * - `order`: ordem de exibição (menor primeiro).
 * - `showOnSite: false` esconde da seção Especialidades.
 */
export const services = [
  {
    id: 'gameplay',
    sprite: 'controller',
    meme: 'clutch no último segundo',
    name: 'Gameplay e entretenimento',
    description: 'Montagem de gameplays com ritmo, cortes de tempo morto e foco nos momentos que prendem a atenção.',
    order: 1,
    showOnSite: true,
  },
  {
    id: 'edicao-dinamica',
    sprite: 'bolt',
    meme: 'zoom no momento exato',
    name: 'Edição dinâmica para YouTube',
    description: 'Cortes rápidos, zooms, textos e efeitos pensados para manter o público assistindo vídeos longos.',
    order: 2,
    showOnSite: true,
  },
  {
    id: 'canais-dark',
    sprite: 'mic',
    meme: '[voz grave] tudo começou...',
    name: 'Edição para canais dark',
    description: 'Narração sincronizada com banco de imagens, legendas, trilha e efeitos para vídeos sem rosto.',
    order: 3,
    showOnSite: true,
  },
  {
    id: 'humor',
    sprite: 'skull',
    meme: '*vine boom*',
    name: 'Humor e memes',
    description: 'Memes, efeitos sonoros e timing cômico para valorizar as reações do criador.',
    order: 4,
    showOnSite: true,
  },
  {
    id: 'highlights',
    sprite: 'star',
    meme: 'clipa isso!',
    name: 'Highlights e montagens',
    description: 'Seleção das melhores jogadas e momentos de lives ou partidas em compilações e montagens.',
    order: 5,
    showOnSite: true,
  },
  {
    id: 'storytelling',
    sprite: 'sword',
    meme: 'a jornada do herói',
    name: 'Storytelling',
    description: 'Estrutura narrativa com começo, meio e fim para séries, desafios e vídeos de história.',
    order: 6,
    showOnSite: true,
  },
  {
    id: 'shorts',
    sprite: 'phone',
    meme: '9:16 no talo',
    name: 'Shorts e vídeos verticais',
    description: 'Cortes em 9:16 para YouTube Shorts, Reels e TikTok, com legendas e enquadramento vertical.',
    order: 7,
    showOnSite: true,
  },
  {
    id: 'sound-design',
    sprite: 'note',
    meme: 'BOOM. bruh.',
    name: 'Sound design',
    description: 'Trilha, efeitos sonoros e mixagem para equilibrar voz, jogo e música.',
    order: 8,
    showOnSite: true,
  },
  {
    id: 'motion-graphics',
    sprite: 'sparkle',
    meme: 'texto que dança',
    name: 'Motion graphics',
    description: 'Títulos animados, transições e elementos gráficos alinhados à identidade do canal.',
    order: 9,
    showOnSite: true,
  },
] as const satisfies readonly Service[]

export type ServiceId = (typeof services)[number]['id']
