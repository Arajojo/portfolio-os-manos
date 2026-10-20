import { useEffect, useState } from 'react'
import { getEmbedUrl } from '../lib/youtube'
import type { AspectRatio } from '../types'
import { SmartImage } from './SmartImage'

let connectionsWarmed = false

/** Abre as conexões com o YouTube antes do clique, para o vídeo começar mais rápido (sem baixar o player). */
function warmYouTubeConnections() {
  if (connectionsWarmed) return
  connectionsWarmed = true
  for (const href of ['https://www.youtube-nocookie.com', 'https://www.youtube.com', 'https://i.ytimg.com']) {
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = href
    document.head.append(link)
  }
}

interface YouTubePlayerProps {
  /** ID já validado por parseYouTubeId, ou null. */
  videoId: string | null
  title: string
  posterSources: string[]
  ratio: AspectRatio
}

/**
 * Mostra a thumbnail com um botão "Reproduzir". O iframe do YouTube só é criado
 * depois do clique, então nada carrega ou toca sem uma ação do usuário.
 */
export function YouTubePlayer({ videoId, title, posterSources, ratio }: YouTubePlayerProps) {
  const [playing, setPlaying] = useState(false)
  const embedUrl = videoId ? getEmbedUrl(videoId) : null
  const [w, h] = ratio.split(':').map(Number)

  useEffect(() => {
    if (embedUrl) warmYouTubeConnections()
  }, [embedUrl])

  return (
    <div
      className="relative mx-auto w-full overflow-hidden border border-line bg-ink"
      style={{ aspectRatio: `${w} / ${h}`, maxWidth: `calc(72dvh * ${w} / ${h})` }}
    >
      {playing && embedUrl ? (
        <iframe
          src={embedUrl}
          title={`Vídeo do YouTube: ${title}`}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 size-full"
        />
      ) : (
        <>
          <SmartImage
            sources={posterSources}
            alt={`Thumbnail do vídeo ${title}`}
            eager
            className="absolute inset-0 size-full object-cover"
            fallback={<div className="hatch absolute inset-0" />}
          />
          {embedUrl ? (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="group absolute inset-0 flex items-center justify-center bg-ink/35 transition-colors hover:bg-ink/15"
            >
              <span className="flex items-center gap-3 bg-accent px-5 py-3 font-semibold text-ink transition-transform group-hover:scale-105">
                <svg aria-hidden="true" viewBox="0 0 10 12" className="h-3.5 w-3" fill="currentColor">
                  <path d="M0 0l10 6-10 6z" />
                </svg>
                Reproduzir
                <span className="sr-only"> o vídeo {title}</span>
              </span>
            </button>
          ) : (
            <p className="label-mono absolute bottom-3 left-3 bg-ink/85 px-2 py-1 text-muted">Vídeo indisponível para reprodução</p>
          )}
        </>
      )}
    </div>
  )
}
