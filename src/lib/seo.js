import { brand, SITE_URL } from './brand'

export function setPageMeta({ title, description, image, url, type = 'website', path }) {
  if (title) document.title = title

  const ensure = (selector, create) => {
    let el = document.querySelector(selector)
    if (!el) {
      el = create()
      document.head.appendChild(el)
    }
    return el
  }

  if (description) {
    const meta = ensure('meta[name="description"]', () => {
      const m = document.createElement('meta')
      m.name = 'description'
      return m
    })
    meta.content = description
  }

  const pathname =
    path ||
    (typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/')
  const pageUrl = url || `${SITE_URL}${pathname.startsWith('/') ? pathname : `/${pathname}`}`
  const ogImage = image
    ? image.startsWith('http')
      ? image
      : `${SITE_URL}${image.startsWith('/') ? image : `/${image}`}`
    : `${SITE_URL}/images/hero-portrait.jpg`

  const pairs = [
    ['property', 'og:title', title],
    ['property', 'og:description', description],
    ['property', 'og:type', type],
    ['property', 'og:url', pageUrl],
    ['property', 'og:image', ogImage],
    ['property', 'og:site_name', brand.name],
    ['property', 'og:locale', 'fr_FR'],
    ['name', 'twitter:card', 'summary_large_image'],
    ['name', 'twitter:title', title],
    ['name', 'twitter:description', description],
    ['name', 'twitter:image', ogImage],
  ]

  for (const [attr, key, value] of pairs) {
    if (!value) continue
    const el = ensure(`meta[${attr}="${key}"]`, () => {
      const m = document.createElement('meta')
      m.setAttribute(attr, key)
      return m
    })
    el.content = value
  }

  const canonical = ensure('link[rel="canonical"]', () => {
    const link = document.createElement('link')
    link.rel = 'canonical'
    return link
  })
  canonical.href = pageUrl

  // Organization JSON-LD (single node, refreshed)
  let ld = document.getElementById('ha-jsonld')
  if (!ld) {
    ld = document.createElement('script')
    ld.type = 'application/ld+json'
    ld.id = 'ha-jsonld'
    document.head.appendChild(ld)
  }
  ld.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: brand.name,
    url: SITE_URL,
    email: brand.email,
    description: brand.mission,
    foundingLocation: {
      '@type': 'Place',
      name: brand.origin,
    },
  })
}
