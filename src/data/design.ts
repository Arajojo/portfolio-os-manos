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
    tagline: '',
    bio: '',
    specialties: ['Design', 'Thumbmaker'],
    socials: [],
  },
]
