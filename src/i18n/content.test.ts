import { describe, expect, it } from 'vitest'
import { editors } from '../data/editors'
import { site } from '../data/site'
import { findMissingTranslations, getContent } from './content'
import { ui } from './ui'

describe('tradução', () => {
  it('todo o conteúdo tem versão em inglês em src/data/en.ts', () => {
    expect(findMissingTranslations()).toEqual([])
  })

  it('português continua igual aos arquivos de dados', () => {
    const pt = getContent('pt')
    expect(pt.site).toBe(site)
    expect(pt.gameName('terror')).toBe('Jogos de terror')
  })

  it('inglês traduz textos, nomes e categorias', () => {
    const en = getContent('en')
    expect(en.site.sections.about.title).toBe('About the studio')
    expect(en.gameName('terror')).toBe('Horror games')
    expect(en.nicheName('dark')).toBe('Faceless channels')
    expect(en.category('Vídeo longo')).toBe('Long-form video')
    expect(en.category('Categoria nova')).toBe('Categoria nova')
  })

  it('arrobas e links dos editores não mudam', () => {
    const en = getContent('en')
    expect(en.editors.map((editor) => editor.handle)).toEqual(editors.map((editor) => editor.handle))
    expect(en.editors.map((editor) => editor.channelUrl)).toEqual(editors.map((editor) => editor.channelUrl))
  })

  it('textos da interface existem nas duas línguas', () => {
    expect(Object.keys(ui.en)).toEqual(Object.keys(ui.pt))
    expect(ui.en.portfolio.count(1)).toBe('1 project')
    expect(ui.pt.specialties.see(3)).toBe('Ver 3 trabalhos')
  })
})
