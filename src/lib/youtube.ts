const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/
const YOUTUBE_HOSTS = new Set(['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtube-nocookie.com', 'www.youtube-nocookie.com'])
const PATH_FORMATS = new Set(['shorts', 'embed', 'live'])

/**
 * Extrai o ID de um link do YouTube. Retorna null para qualquer URL que não seja
 * um link reconhecido do YouTube com um ID válido de 11 caracteres.
 */
export function parseYouTubeId(input?: string | null): string | null {
  if (!input) return null
  let url: URL
  try {
    url = new URL(input.trim())
  } catch {
    return null
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return null

  const host = url.hostname.toLowerCase()
  const [, first = '', second = ''] = url.pathname.split('/')
  let candidate: string | null = null

  if (host === 'youtu.be' || host === 'www.youtu.be') {
    candidate = first
  } else if (YOUTUBE_HOSTS.has(host)) {
    if (first === 'watch') candidate = url.searchParams.get('v')
    else if (PATH_FORMATS.has(first)) candidate = second
  }

  return candidate && VIDEO_ID.test(candidate) ? candidate : null
}

export function isShortsUrl(input?: string | null): boolean {
  if (!parseYouTubeId(input)) return false
  return new URL(input!.trim()).pathname.startsWith('/shorts/')
}

/** URL de incorporação construída apenas a partir de um ID validado. Só é usada após o clique em "Reproduzir". */
export function getEmbedUrl(videoId: string): string | null {
  if (!VIDEO_ID.test(videoId)) return null
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`
}

export function getWatchUrl(videoId: string): string | null {
  if (!VIDEO_ID.test(videoId)) return null
  return `https://www.youtube.com/watch?v=${videoId}`
}

export function getYouTubeThumbnail(videoId: string): string | null {
  if (!VIDEO_ID.test(videoId)) return null
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
}
