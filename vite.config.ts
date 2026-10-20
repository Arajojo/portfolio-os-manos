import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { site } from './src/data/site.ts'

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Gera título, descrição e tags Open Graph/Twitter a partir de src/data/site.ts. */
function siteMeta(): Plugin {
  return {
    name: 'os-manos-site-meta',
    transformIndexHtml(html) {
      const baseUrl = site.url.replace(/\/+$/, '')
      const isAbsolute = (path: string) => /^https?:\/\//i.test(path)
      const toAbsolute = (path: string) => (isAbsolute(path) || !baseUrl ? path : `${baseUrl}/${path.replace(/^\/+/, '')}`)

      const ogImage = site.ogImage.trim()
      const ogImageExists = ogImage && (isAbsolute(ogImage) || existsSync(resolve(process.cwd(), 'public', ogImage.replace(/^\/+/, ''))))
      const title = `${site.name} — ${site.tagline}`

      const tags: string[] = [
        `<title>${escapeHtml(title)}</title>`,
        `<meta name="description" content="${escapeHtml(site.description)}" />`,
        `<meta property="og:type" content="website" />`,
        `<meta property="og:locale" content="pt_BR" />`,
        `<meta property="og:site_name" content="${escapeHtml(site.name)}" />`,
        `<meta property="og:title" content="${escapeHtml(title)}" />`,
        `<meta property="og:description" content="${escapeHtml(site.description)}" />`,
        `<meta name="twitter:card" content="${ogImageExists ? 'summary_large_image' : 'summary'}" />`,
        `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
        `<meta name="twitter:description" content="${escapeHtml(site.description)}" />`,
      ]
      if (baseUrl) {
        tags.push(`<link rel="canonical" href="${escapeHtml(baseUrl)}/" />`, `<meta property="og:url" content="${escapeHtml(baseUrl)}/" />`)
      }
      if (ogImageExists) {
        const image = escapeHtml(toAbsolute(ogImage))
        tags.push(
          `<meta property="og:image" content="${image}" />`,
          `<meta property="og:image:width" content="1200" />`,
          `<meta property="og:image:height" content="630" />`,
          `<meta property="og:image:alt" content="${escapeHtml(site.name)}" />`,
          `<meta name="twitter:image" content="${image}" />`,
        )
      }

      return html.replace('<!-- site-meta -->', tags.join('\n    '))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), siteMeta()],
})
