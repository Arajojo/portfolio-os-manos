import type { Project } from '../types'

/**
 * Vídeos do portfólio de Os Manos.
 *
 * Para adicionar um vídeo, copie o modelo abaixo para dentro da lista `projects`,
 * tire os comentários (//) e preencha:
 *
 *   1. id e slug únicos (letras minúsculas, números e hífens);
 *   2. title e youtubeUrl (watch?v=…, youtu.be/… ou shorts/…);
 *   3. thumbnail: coloque a imagem em public/images/projects/ e informe o caminho
 *      (ou deixe vazio para usar a thumbnail do próprio YouTube);
 *   4. game (IDs em games.ts) e editingStyle (IDs em services.ts);
 *   5. editorId: 'pato' ou 'trollchu';
 *   6. published: true quando o vídeo estiver pronto para aparecer no site.
 *
 * O TypeScript avisa se algum ID de jogo, estilo ou editor não existir.
 *
 * Modelo:
 *
 *   {
 *     id: 'nome-do-video',
 *     slug: 'nome-do-video',
 *     title: 'Título do vídeo',
 *     description: 'O que foi feito na edição (opcional).',
 *     youtubeUrl: 'https://www.youtube.com/watch?v=XXXXXXXXXXX',
 *     thumbnail: 'images/projects/nome-do-video.jpg',
 *     game: 'minecraft',
 *     category: 'Vídeo longo',
 *     editingStyle: 'edicao-dinamica',
 *     editorId: 'pato',
 *     featured: false,
 *     published: true,
 *     aspectRatio: '16:9', // use '9:16' para Shorts
 *     order: 1,
 *   },
 */
export const projects: Project[] = [
    {
    id: 'pato-tiltou-geral',
    slug: 'pato-tiltou-geral',
    title: 'Pato Tiltou GERAL na Sem Class (Ficaram Malucos)',
    description:'Uma edição antiga e simples que gostei bastante na época que eu postei',
    youtubeUrl: 'https://youtu.be/Co_i-RyYyAA?si=UTdWDb--_EuGHJT2',
    thumbnail: '',
    game: 'valorant',
    category: 'Vídeo longo',
    editingStyle: 'gameplay',
    editorId: 'pato',
    published: true,
    aspectRatio: '16:9',
    order: 3,
    },
    {
    id: 'badparenting',
    slug: 'badparenting',
    title: 'o jogo que mostra como é ter "pais" TÓXICOS',
    description:'Outra edição bem antiga mas que ficou com uma atmosfera legal',
    youtubeUrl: 'https://youtu.be/e3er_ZSO3jQ?si=pCHrxl-cTmWZ7p3x',
    thumbnail: '',
    game: 'outros',
    category: 'Vídeo longo',
    editingStyle: 'storytelling',
    editorId: 'pato',
    published: true,
    aspectRatio: '16:9',
    order: 2,
    },
       {
    id: 'quartetofantastico',
    slug: 'quartetofantastico',
    title: 'O MELHOR QUARTETO DO VALORANT | O QUARTETO FANTASTICO',
    description:'Essa é a edição de Valorant mais recente que eu tenho, ficou muito legal',
    youtubeUrl: 'https://www.youtube.com/watch?v=9JrQy7IJyyc',
    thumbnail: '',
    game: 'valorant',
    category: 'Vídeo longo',
    editingStyle: 'gameplay',
    editorId: 'pato',
    published: true,
    aspectRatio: '16:9',
    order: 1,
    },
]
