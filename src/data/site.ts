import type { SiteConfig } from '../types.ts'

/**
 * Configuração geral do site de Os Manos.
 *
 * Campos de texto vazios ('') ficam ocultos no site publicado.
 * Durante o desenvolvimento (npm run dev) aparece um aviso "pendente de configuração" no lugar.
 */
export const site: SiteConfig = {
  name: 'Os Manos',
  description:
    'Os Manos é um estúdio independente de edição de vídeos para YouTube Gaming e canais dark, formado pelos editores PatoJoga_ofc e Trollchu.',

  /** Frase curta usada no título da aba, no rodapé e no compartilhamento. */
  tagline: 'Edição de vídeos para YouTube Gaming e canais dark',

  /** Headline do topo da página. Troque à vontade. */
  headline: 'Edição de vídeo para canais de games e canais dark.',
  heroDescription:
    'Somos um estúdio independente formado por dois editores. Editamos gameplays, Shorts e vídeos narrados para canais dark no YouTube.',

  /** Cor de destaque usada em links, foco e detalhes. Qualquer cor CSS válida. */
  accentColor: '#CBEF4A',

  /** Endereço público do site, sem barra no final (ex.: 'https://osmanos.com.br'). Usado nas tags de compartilhamento. */
  url: '',
  /** Imagem de compartilhamento (1200×630) em public/ ou URL absoluta. */
  ogImage: '/og-image.png',

  contact: {
    title: 'Tem um vídeo para editar?',
    text: 'Conte sobre o seu canal, o nicho e o formato do vídeo. A gente responde com uma proposta de edição e orçamento.',
    /**
     * O número NÃO fica aqui para não aparecer no GitHub. Ele vem do arquivo .env.local
     * (que só existe no seu computador), na linha VITE_WHATSAPP=5511912345678
     * Só números, com DDI e DDD. Sem número, o WhatsApp fica oculto.
     */
    whatsapp: import.meta.env?.VITE_WHATSAPP ?? '',
    whatsappMessage: 'Olá, Os Manos! Quero um orçamento de edição para o meu canal.',
    /** Ex.: 'contato@osmanos.com.br'. Vazio = oculto. */
    email: 'osmanoseditores@gmail.com',
    emailSubject: 'Orçamento de edição',
    /** Usuário do Instagram, com ou sem @. Vazio = oculto. */
    instagram: 'osmanoseditores',
    /** Outros canais de contato, ex.: { label: 'Discord', url: 'https://discord.gg/...' } */
    others: [],
    /** Texto exibido quando nenhum contato direto está configurado. */
    fallbackText: 'Enquanto os canais de contato não estão no ar, você encontra a dupla nos canais do YouTube abaixo.',
  },

  /** Redes sociais do estúdio (rodapé). Ex.: { label: 'TikTok', url: 'https://www.tiktok.com/@...' } */
  socials: [{label: 'Instagram', url: 'https://www.instagram.com/osmanoseditores/'}],

  sections: {
    portfolio: {
      title: 'Trabalhos',
      intro: 'Vídeos editados por Os Manos. Clique em um projeto para assistir e ver os detalhes da edição.',
    },
    specialties: {
      title: 'O que editamos',
      intro: 'Os nichos, jogos e estilos de edição com que o estúdio trabalha.',
    },
    editors: {
      title: 'A dupla',
      intro: 'Hora de conhecer Os manos! Veja que seu vídeo estará em boas mãos.',
    },
    design: {
      title: 'O Design',
      intro: 'Quem cuida das thumbnails e da parte visual dos vídeos de Os Manos.',
    },
    about: {
      title: 'Sobre o estúdio',
    },
  },

  /**
   * Textos da seção Sobre. Escrevam com a voz de vocês.
   * Blocos vazios não aparecem no site publicado.
   */
  about: {
    intro:
      'Os manos é um estúdio independente de edição de vídeos e design para YouTube de games e canais dark, mas que não edita e cria somente com ferramentas e técnicas e sim com o coração.',
    /** Como a dupla começou. */
    history: '"Os manos" nasceu de uma amizade construída ainda no ensino médio, unida por paixões em comum como animes, games, edição de vídeo e a criatividade em suas mais diversas formas. Desde aquela época, sempre que tínhamos a chance, transformávamos simples apresentações em vídeos que transmitiam emoção, dedicação e, principalmente, alegria. Foi compartilhando essas experiências, risadas e momentos especiais que descobrimos o quanto criar conteúdos nos fazia felizes. Hoje, decidimos transformar esse sonho em realidade e levar esse mesmo sentimento para cada projeto que realizamos, acreditando que um vídeo tem o poder de conectar pessoas, despertar emoções e tornar a vida um pouco mais leve, com mais sorrisos, boas lembranças e paz no coração.',
    /** O que vocês buscam em cada edição. */
    vision: 'Nossa visão é colorir o mundo com criatividade, transformando histórias, marcas e momentos em conteúdos que fazem as pessoas sentir, sorrir e se conectar. Sonhamos em ser referência não apenas pela qualidade do que criamos, mas pela emoção que deixamos em cada frame, cada design e cada detalhe.',
    /** Etapas do processo de edição, uma por item. Ex.: ['Briefing', 'Decupagem', ...] */
    process: ['Briefing', 'Planejamento criativo', 'Decupagem', 'Edição base', 'Design e motion', 'Tratamento de audio e efeitos sonoros', 'Revisão e risadas', 'Entrega e aprovação'],
    /** Com que tipo de criador vocês querem trabalhar. */
    idealCreator:
      'Acreditamos que um vídeo vai muito além de cortes, efeitos e transições. Cada projeto é uma oportunidade de compartilhar momentos, histórias, risadas e emoções com outras pessoas. Como um estúdio em crescimento, estamos sempre aprendendo, evoluindo e buscando novas formas de entregar o melhor resultado possível, mantendo preços acessíveis e negociações flexíveis para nossos clientes. Mas o que realmente nos diferencia é a forma como enxergamos cada trabalho: não como um simples serviço, mas como uma parceria. Queremos comemorar suas conquistas, ouvir suas ideias e ajudar a transformar seu conteúdo em algo que faça alguém sorrir do outro lado da tela. Afinal, as melhores lembranças costumam vir acompanhadas de boas risadas, e é esse sentimento que colocamos em cada projeto que passa pelas mãos dos Manos.',
    /** Diferenciais do estúdio, um por item. */
    differentials: [
      'Cada trabalho é uma parceria, não um simples serviço',
      'Preços acessíveis e negociações flexíveis',
      'A gente ouve suas ideias e comemora suas conquistas com você',
      'Edição que vai além de cortes e efeitos: momentos, histórias e risadas',
      'Um estúdio em crescimento, sempre aprendendo e evoluindo',
    ],
  },
}
