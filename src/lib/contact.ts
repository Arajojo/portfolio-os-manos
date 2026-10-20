import type { LinkItem } from '../types'

export interface ContactLink {
  id: string
  label: string
  value: string
  href: string
  external: boolean
}

export function isSafeUrl(url?: string | null): boolean {
  if (!url) return false
  try {
    const { protocol } = new URL(url)
    return protocol === 'https:' || protocol === 'http:' || protocol === 'mailto:'
  } catch {
    return false
  }
}

export function getWhatsAppLink(phone: string, message = ''): ContactLink | null {
  const digits = phone.replace(/\D/g, '')
  if (!/^\d{10,15}$/.test(digits)) return null
  const text = message ? `?text=${encodeURIComponent(message)}` : ''
  return { id: 'whatsapp', label: 'WhatsApp', value: formatPhone(digits), href: `https://wa.me/${digits}${text}`, external: true }
}

function formatPhone(digits: string): string {
  const br = /^55(\d{2})(\d{4,5})(\d{4})$/.exec(digits)
  return br ? `+55 ${br[1]} ${br[2]}-${br[3]}` : `+${digits}`
}

export function getEmailLink(email: string, subject = ''): ContactLink | null {
  const value = email.trim()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return null
  const query = subject ? `?subject=${encodeURIComponent(subject)}` : ''
  return { id: 'email', label: 'E-mail', value, href: `mailto:${value}${query}`, external: false }
}

export function getInstagramLink(input: string): ContactLink | null {
  const value = input.trim()
  if (!value) return null
  const fromUrl = /^https?:\/\/(?:www\.)?instagram\.com\/([^/?#]+)/i.exec(value)
  const user = (fromUrl ? fromUrl[1] : value).replace(/^@/, '')
  if (!/^[A-Za-z0-9._]{1,30}$/.test(user)) return null
  return { id: 'instagram', label: 'Instagram', value: `@${user}`, href: `https://www.instagram.com/${user}/`, external: true }
}

export function getOtherLinks(items: readonly LinkItem[]): ContactLink[] {
  return items
    .filter((item) => item.label.trim() && isSafeUrl(item.url))
    .map((item, index) => ({
      id: `other-${index}`,
      label: item.label,
      value: item.url.replace(/^(https?:\/\/|mailto:)(www\.)?/, '').replace(/\/$/, ''),
      href: item.url,
      external: !item.url.startsWith('mailto:'),
    }))
}
