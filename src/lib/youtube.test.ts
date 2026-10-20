import { describe, expect, it } from 'vitest'
import { getEmbedUrl, getWatchUrl, isShortsUrl, parseYouTubeId } from './youtube'

const ID = 'dQw4w9WgXcQ'

describe('parseYouTubeId', () => {
  it.each([
    `https://www.youtube.com/watch?v=${ID}`,
    `https://youtube.com/watch?v=${ID}&t=42s&list=PL123`,
    `https://m.youtube.com/watch?feature=share&v=${ID}`,
    `http://www.youtube.com/watch?v=${ID}`,
    `https://youtu.be/${ID}`,
    `https://youtu.be/${ID}?si=abc123&t=10`,
    `https://www.youtube.com/shorts/${ID}`,
    `https://youtube.com/shorts/${ID}?feature=share`,
    `https://www.youtube.com/embed/${ID}`,
    `https://www.youtube.com/live/${ID}`,
    `  https://youtu.be/${ID}  `,
  ])('reconhece %s', (url) => {
    expect(parseYouTubeId(url)).toBe(ID)
  })

  it.each([
    undefined,
    '',
    'não é uma url',
    `javascript:alert('${ID}')`,
    `https://youtube.com.evil.com/watch?v=${ID}`,
    `https://evil.com/watch?v=${ID}`,
    `https://evil.com/youtu.be/${ID}`,
    `https://www.youtube.com/watch?v=curto`,
    `https://www.youtube.com/watch?v=${ID}"><script>`,
    `https://www.youtube.com/@PatoJoga_ofc`,
    `https://www.youtube.com/playlist?list=${ID}`,
    `ftp://youtu.be/${ID}`,
  ])('rejeita %s', (url) => {
    expect(parseYouTubeId(url)).toBeNull()
  })
})

describe('urls geradas', () => {
  it('gera embed apenas para IDs válidos', () => {
    expect(getEmbedUrl(ID)).toBe(`https://www.youtube-nocookie.com/embed/${ID}?autoplay=1&rel=0&playsinline=1`)
    expect(getEmbedUrl('../../evil')).toBeNull()
    expect(getWatchUrl(ID)).toBe(`https://www.youtube.com/watch?v=${ID}`)
  })

  it('detecta Shorts', () => {
    expect(isShortsUrl(`https://www.youtube.com/shorts/${ID}`)).toBe(true)
    expect(isShortsUrl(`https://youtu.be/${ID}`)).toBe(false)
    expect(isShortsUrl('https://evil.com/shorts/x')).toBe(false)
  })
})
