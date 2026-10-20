import type { Editor } from '../types'

/**
 * Integrantes de Os Manos.
 *
 * Tudo o que o site mostra sobre um editor (nome, arroba, foto e link) vem daqui.
 * Os projetos só guardam o `editorId` ('pato' ou 'trollchu'); alterar algo aqui
 * atualiza automaticamente a galeria, os detalhes dos vídeos, os filtros e os perfis.
 *
 * Fotos: coloque os arquivos em public/images/editors/ com os nomes abaixo
 * (ou troque `photo` por uma URL). Sem foto, o site mostra um avatar com a inicial.
 *
 * `specialties` usa IDs de src/data/services.ts e `games` usa IDs de src/data/games.ts.
 */
export const editors = [
  {
    id: 'pato',
    displayName: 'PatoJoga_ofc',
    handle: '@PatoJoga_ofc',
    photo: 'images/editors/pato.jpg',
    channelUrl: 'https://www.youtube.com/@PatoJoga_ofc',
    tagline: 'Meu maior objetivo é conseguir tirar risadas das pessoas e fazer o dia delas pelo menos um pouco melhor. Quero que meus videos deixem o peso da vida mais leve.',
    bio: 'Oi! Eu sou o Matheus, a pessoa por trás do Pato Joga!\n\nDesde pequeno, sonho em ser Influencer. Cresci assistindo aos Youtubers de Minecraft(Tazercraft, Rezende, batista,etc...) que marcaram minha infância, me proporcionaram inúmeras risadas e criaram lembranças que guardo até hoje com muito carinho. Foram eles que me inspiraram a seguir esse caminho e a acreditar que um dia eu também poderia fazer a diferença na vida de alguém. Hoje, quero transformar esse sonho em realidade, compartilhando minha paixão, espalhando felicidade e criando vídeos que, quem sabe, um dia também se tornem parte especial da infância e das memórias de alguém.',
    specialties: ['gameplay', 'edicao-dinamica', 'canais-dark','humor', 'highlights', 'storytelling', 'shorts', 'sound-design'],
    games: ['minecraft', 'roblox', 'valorant', 'fortnite', 'terror', 'outros'],
    socials: [{label: 'Instagram', url:'https://www.instagram.com/patojoga_ofc'}, {label: 'Tiktok', url: 'https://www.tiktok.com/@patojoga_ofc'}],
  },
  {
    id: 'trollchu',
    displayName: 'Trollchu',
    handle: '@Trollchu',
    photo: 'images/editors/trollchu.jpg',
    channelUrl: 'https://www.youtube.com/@Trollchu',
    tagline: '',
    bio: '',
    specialties: [],
    games: [],
    socials: [],
  },
] as const satisfies readonly Editor[]

export type EditorId = (typeof editors)[number]['id']
