import { describe, expect, it } from 'vitest'
import { getEmailLink, getInstagramDmLink, getInstagramLink, getOtherLinks, getWhatsAppLink } from './contact'

describe('contatos', () => {
  it('ignora campos vazios ou inválidos', () => {
    expect(getWhatsAppLink('')).toBeNull()
    expect(getWhatsAppLink('123')).toBeNull()
    expect(getEmailLink('')).toBeNull()
    expect(getEmailLink('sem-arroba')).toBeNull()
    expect(getInstagramLink('')).toBeNull()
    expect(getInstagramLink('nome com espaço')).toBeNull()
    expect(getOtherLinks([{ label: 'X', url: 'javascript:alert(1)' }, { label: '', url: 'https://a.com' }])).toEqual([])
  })

  it('gera links válidos', () => {
    expect(getWhatsAppLink('+55 (11) 91234-5678', 'Oi')).toMatchObject({ href: 'https://wa.me/5511912345678?text=Oi', value: '+55 11 91234-5678' })
    expect(getEmailLink('a@b.com', 'Orçamento')?.href).toBe('mailto:a@b.com?subject=Or%C3%A7amento')
    expect(getInstagramLink('@os.manos')?.href).toBe('https://www.instagram.com/os.manos/')
    expect(getInstagramLink('https://instagram.com/os.manos?igsh=1')?.value).toBe('@os.manos')
    expect(getInstagramDmLink('@os.manos')?.href).toBe('https://ig.me/m/os.manos')
  })
})
