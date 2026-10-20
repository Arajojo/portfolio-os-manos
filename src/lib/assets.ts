/**
 * Resolve caminhos de imagens dos arquivos de dados.
 * Aceita URLs absolutas ou caminhos dentro de public/ (com ou sem "/" no início).
 */
export function resolveAsset(path?: string | null): string | undefined {
  const value = path?.trim()
  if (!value) return undefined
  if (/^(https?:)?\/\//i.test(value) || /^(data|blob):/i.test(value)) return value
  return import.meta.env.BASE_URL + value.replace(/^\/+/, '')
}
