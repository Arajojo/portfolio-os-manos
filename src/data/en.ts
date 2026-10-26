import type { EnglishContent } from '../i18n/types'

/**
 * Versão em inglês do conteúdo do site (aparece quando o visitante escolhe EN).
 *
 * Os textos em português continuam nos arquivos de sempre (site.ts, projects.ts...).
 * Aqui fica só a tradução. Se algo não estiver traduzido aqui, o site mostra o português.
 *
 * Ao adicionar um vídeo, nicho, estilo ou jogo novo, acrescente a tradução na parte
 * correspondente abaixo usando o mesmo `id`. Em `npm run dev` aparece um aviso no
 * console do navegador quando falta alguma tradução.
 */
export const en: EnglishContent = {
  site: {
    description:
      'Os Manos is an independent video editing studio for YouTube Gaming and faceless channels, made up of editors PatoJoga_ofc and Trollchu.',
    tagline: 'Video editing for YouTube Gaming and faceless channels',
    headline: 'Video editing for gaming and faceless YouTube channels.',
    heroDescription:
      'We are an independent studio made up of two editors. We edit gameplays, Shorts and narrated videos for faceless YouTube channels.',
    contact: {
      title: 'Got a video to edit?',
      text: "Tell us about your channel, your niche and the video format. We'll get back to you with an editing proposal and a quote.",
      whatsappMessage: "Hi, Os Manos! I'd like a quote for editing my channel.",
      emailSubject: 'Editing quote',
      fallbackText: "Our contact channels aren't live yet, but you can find the duo on the YouTube channels below.",
    },
    sections: {
      portfolio: {
        title: 'Work',
        intro: 'Videos edited by Os Manos. Click a project to watch it and see the editing details.',
      },
      specialties: {
        title: 'What we edit',
        intro: 'The niches, games and editing styles the studio works with.',
      },
      editors: {
        title: 'The duo',
        intro: 'Time to meet Os Manos! Your video will be in good hands.',
      },
      design: {
        title: 'The Design',
        intro: 'The person behind the thumbnails and the visual side of Os Manos videos.',
      },
      about: {
        title: 'About the studio',
      },
    },
    about: {
      intro:
        "Os Manos is an independent video editing and design studio for gaming and faceless YouTube channels, one that doesn't edit and create with tools and techniques alone, but with heart.",
      history:
        '"Os Manos" was born from a friendship built back in high school, united by shared passions like anime, games, video editing and creativity in all its forms. Back then, whenever we had the chance, we turned simple school presentations into videos full of emotion, dedication and, above all, joy. It was by sharing those experiences, laughs and special moments that we discovered how happy creating content made us. Today, we decided to turn that dream into reality and bring that same feeling to every project we take on, believing that a video has the power to connect people, spark emotions and make life a little lighter, with more smiles, good memories and peace at heart.',
      vision:
        'Our vision is to color the world with creativity, turning stories, brands and moments into content that makes people feel, smile and connect. We dream of being a reference not only for the quality of what we create, but for the emotion we leave in every frame, every design and every detail.',
      process: [
        'Briefing',
        'Creative planning',
        'Footage logging',
        'Rough cut',
        'Design and motion',
        'Audio treatment and sound effects',
        'Review and laughs',
        'Delivery and approval',
      ],
      idealCreator:
        'We believe a video goes far beyond cuts, effects and transitions. Every project is a chance to share moments, stories, laughs and emotions with other people. As a growing studio, we are always learning, evolving and looking for new ways to deliver the best possible result, while keeping prices affordable and negotiations flexible for our clients. But what truly sets us apart is how we see each job: not as a simple service, but as a partnership. We want to celebrate your achievements, hear your ideas and help turn your content into something that makes someone smile on the other side of the screen. After all, the best memories usually come with good laughs, and that is the feeling we put into every project that passes through the hands of Os Manos.',
      differentials: [
        'Every job is a partnership, not just a service',
        'Affordable prices and flexible negotiations',
        'We listen to your ideas and celebrate your wins with you',
        'Editing that goes beyond cuts and effects: moments, stories and laughs',
        'A growing studio, always learning and evolving',
      ],
    },
  },

  niches: {
    gaming: {
      name: 'YouTube Gaming',
      description: 'Gameplays, Shorts and series for gaming channels, with pacing, humor and the best moments front and center.',
      formats: ['Commentary gameplay', 'Shorts', 'Highlights and montages', 'Series and challenges'],
    },
    dark: {
      name: 'Faceless channels',
      description:
        'Editing for faceless channels: narration, stock footage, captions, music and sound design that keep viewers hooked from start to finish.',
      formats: ['Narration and storytelling', 'Facts and top lists', 'Horror and mystery', 'True crime', 'Short documentaries'],
    },
    criadores: {
      name: 'Vlogs and other niches',
      description:
        "It's not just gaming: we edit for every kind of YouTuber. Vlogs, podcasts, reacts, tutorials and reviews with the same care, pacing and personality.",
      formats: ['Vlogs and lifestyle', 'Podcasts and clips', 'Reacts and commentary', 'Tutorials and educational', 'Reviews and unboxings'],
    },
  },

  services: {
    gameplay: {
      name: 'Gameplay and entertainment',
      description: 'Gameplay edits with great pacing, dead time cut out and focus on the moments that grab attention.',
      meme: 'clutch in the last second',
    },
    'edicao-dinamica': {
      name: 'Dynamic YouTube editing',
      description: 'Fast cuts, zooms, text and effects designed to keep people watching long-form videos.',
      meme: 'zoom at the exact moment',
    },
    'canais-dark': {
      name: 'Faceless channel editing',
      description: 'Narration synced with stock footage, captions, music and effects for faceless videos.',
      meme: '[deep voice] it all began...',
    },
    humor: {
      name: 'Humor and memes',
      description: "Memes, sound effects and comedic timing that make the creator's reactions shine.",
      meme: '*vine boom*',
    },
    highlights: {
      name: 'Highlights and montages',
      description: 'The best plays and moments from streams or matches turned into compilations and montages.',
      meme: 'clip that!',
    },
    storytelling: {
      name: 'Storytelling',
      description: 'Narrative structure with a beginning, middle and end for series, challenges and story videos.',
      meme: "the hero's journey",
    },
    shorts: {
      name: 'Shorts and vertical videos',
      description: '9:16 cuts for YouTube Shorts, Reels and TikTok, with captions and vertical framing.',
      meme: '9:16 all the way',
    },
    'sound-design': {
      name: 'Sound design',
      description: 'Music, sound effects and mixing to balance voice, game and soundtrack.',
      meme: 'BOOM. bruh.',
    },
    'motion-graphics': {
      name: 'Motion graphics',
      description: "Animated titles, transitions and graphic elements that match the channel's identity.",
      meme: 'text that dances',
    },
    vlogs: {
      name: 'Vlogs and lifestyle',
      description: 'Routines, trips and behind the scenes with light cuts, music and color that make everyday life a joy to watch.',
      meme: 'good morning, fam!',
    },
    podcasts: {
      name: 'Podcasts and clips',
      description: 'Full episodes edited, plus the best moments turned into captioned clips for social media.',
      meme: 'clip that part!',
    },
    reacts: {
      name: 'Reacts and commentary',
      description: 'Reaction videos with the original content front and center, zooms on reactions and conversational pacing.',
      meme: '*pauses the video*',
    },
    tutoriais: {
      name: 'Tutorials and educational',
      description: 'Clear explanations with on-screen text, visual highlights and cuts that keep the lesson focused.',
      meme: 'easy now',
    },
    reviews: {
      name: 'Reviews and unboxings',
      description: 'The product in the spotlight, close-up details and a pace that guides viewers to the verdict.',
      meme: 'worth it?',
    },
  },

  games: {
    minecraft: { name: 'Minecraft' },
    roblox: { name: 'Roblox' },
    valorant: { name: 'Valorant' },
    fortnite: { name: 'Fortnite' },
    'gta-v': { name: 'GTA V' },
    terror: { name: 'Horror games' },
    outros: { name: 'Other games' },
  },

  categories: {
    'Vídeo longo': 'Long-form video',
    'Vídeo curto': 'Short video',
    Short: 'Short',
    Série: 'Series',
    Highlights: 'Highlights',
  },

  editors: {
    pato: {
      tagline:
        'My biggest goal is to make people laugh and make their day at least a little better. I want my videos to make the weight of life feel lighter.',
      bio: "Hi! I'm Matheus, the person behind Pato Joga!\n\nEver since I was a kid, I've dreamed of being an influencer. I grew up watching Minecraft YouTubers (Tazercraft, Rezende, Batista, etc.) who shaped my childhood, gave me countless laughs and created memories I still cherish today. They inspired me to follow this path and to believe that one day I could also make a difference in someone's life. Today, I want to turn that dream into reality, sharing my passion, spreading happiness and creating videos that, who knows, might one day become a special part of someone's childhood and memories.",
    },
    trollchu: {
      tagline: 'My goal is to combine creativity, technique and dedication to bring my ideas to life, with lots of humor, lightness and fun.',
      bio: "Hi, I'm Trollchu\n\nMy passion for editing started very early, when I was around 9 years old. Since then, I've closely followed the world of YouTube and content creators, especially the gaming YouTubers of the mid-2010s, a time that sparked even more of my interest and admiration for this world. Today, with years of experience and a lot of learning along the way, I want to turn this passion into something bigger: helping other creators bring their ideas to life, telling stories and producing content that truly connects with the people who watch them.",
    },
  },

  designers: {
    leo: {
      role: 'Designer',
      tagline: "My name is Leonardo, I'm 22 years old",
      bio: "I graduated from a technical course in Graphic Design, and I developed a passion and a knack for the field even before enrolling: I'd open Photoshop and, with a few tutorials, cut things out and remove backgrounds to make all kinds of shitposts and memes for the RPG I played with my friends. That talent kept growing throughout the course, where I learned to vectorize images and lay out pages, among other things, like improving image treatment and compositing. My goal in the field is to keep improving, using Blender to create 3D thumbnails and motion animations and, above all, to animate character rigs.\nEither way, I look for creativity in my compositions, drawing inspiration from many platforms and, above all, from the knowledge I've gained along the way.",
      specialties: ['Design', 'Thumbmaker'],
    },
  },

  projects: {
    comoimitarpato: { description: 'An old, simple edit that I really liked back when I posted it' },
    badparenting: { description: 'Another pretty old edit, but it ended up with a cool atmosphere' },
    quartetofantastico: { description: 'This is my most recent Valorant edit, it turned out really cool' },
    robloxDoors: { description: 'A simple, funny Roblox edit' },
  },

  stickers: {
    'GG EZ': 'GG EZ',
    '+1000 de aura': '+1000 aura',
    'F no chat': 'F in the chat',
    'skill issue': 'skill issue',
    'POV: seu vídeo depois da edição': 'POV: your video after the edit',
  },
  tickerGames: ['Minecraft', 'Roblox', 'Valorant', 'Fortnite', 'GTA V', 'Horror', 'Faceless channels', 'Shorts'],
  tickerMemes: ['GG', 'clip it', 'F in the chat', 'vine boom', 'respawn', 'absolute legend', 'turbo mode', 'zero lag', 'edit it, go viral'],
  loadingTips: [
    'The first 3 seconds decide whether someone keeps watching.',
    'Big captions save viewers watching without sound.',
    'Every meme needs timing. Every single one.',
    'A good faceless channel is narration + the right image at the right second.',
    'Ctrl+S before anything else. Trust me.',
    "Vine boom isn't a seasoning, it's an ingredient.",
  ],
  darkCaptions: ['[narrator] No one ever came back from that house...', '[door creaking]', '[tense music rises]', "And that's when everything changed."],
  achievements: {
    portfolio: { title: 'Curious', description: 'Reached the portfolio' },
    especialidades: { title: 'Knows the lore', description: 'Found out what the duo edits' },
    editores: { title: 'Player select', description: 'Met the editors' },
    video: { title: 'Movie buff', description: 'Opened a portfolio video' },
    contato: { title: 'Quest accepted?', description: 'Reached the contact quest' },
    fim: { title: 'GG', description: 'Beat the website' },
    konami: { title: 'Old school', description: 'Used the secret code ↑↑↓↓←→←→BA' },
  },
  quest: {
    label: 'Main quest',
    objectives: ['Send us your channel link', 'Tell us the niche and the video format', 'Get your editing proposal'],
    reward: 'Reward: an edited video and +1000 aura',
  },
}
