import type { TeamMember } from '../types'

/**
 * Equipe de design de Os Manos (seção "O Design", abaixo da dupla de editores).
 *
 * Foto: coloque o arquivo em public/images/team/ com o nome de `photo`
 * (ou troque por uma URL). Sem foto, o card mostra a inicial do nome.
 */
export const designers: TeamMember[] = [
  {
    id: 'leo',
    displayName: 'tx_leo_tx',
    handle: '@tx_leo_tx',
    photo: 'images/team/leo.jpg',
    role: 'Designer',
    color: '#ffb224',
    profile: { label: 'Instagram', url: 'https://www.instagram.com/tx_leo_tx/' },
    tagline: 'Meu nome é Leonardo tenho 22 anos',
    bio: 'Formado no técnico de Design Gráfico, desenvolvi paixão e aptidão pela área, antes mesmo de me ingressar ao curso, onde eu abria o Photoshop e com alguns tutoriais recortava algumas coisas e removia fundos para fazer diversos shitposts e memes do RPG que eu fazia com meus amigos, tal dote foi se aflorando ao decorrer do curso onde eu aprendi vetorizar imagens, e diagramar páginas, dentre outras tais como melhorar o tratamento de imagens e as montagens das mesmas, meu objetivo na área é se aprimorar ainda mais, utilizando blender para criar thumbnails em 3D, motion-animations, e principalmente animar rigs de personagens.\nDe toda forma, busco criatividade em minhas composições, buscando inspirações de diversas plataformas, e principalmente de conhecimentos adquiridos por minha pessoa.',
    specialties: ['Design', 'Thumbmaker'],
    socials: [],
  },
]
