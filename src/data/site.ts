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
      'Os Manos é um estúdio independente de edição de vídeos para YouTube Gaming e canais dark, formado por dois editores: PatoJoga_ofc e Trollchu.',
    /** Como a dupla começou. */
    history: '',
    /** O que vocês buscam em cada edição. */
    vision: '',
    /** Etapas do processo de edição, uma por item. Ex.: ['Briefing', 'Decupagem', ...] */
    process: [],
    /** Com que tipo de criador vocês querem trabalhar. */
    idealCreator: '',
    /** Diferenciais do estúdio, um por item. */
    differentials: [],
  },
}
