import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { brand } from '../lib/brand'
import { images } from '../lib/images'
import { getNicheById } from '../lib/niches'
import { listPortfolioKits, portfolioShareUrl } from '../lib/portfolios'

const IMAGE_BY_SLUG = {
  influencers: images.niches.createur,
  salons: images.niches.salon,
  cafes: images.niches.cafe,
  avocats: images.niches.avocat,
  livreurs: images.niches.livreur,
}

function ShareCopy({ slug }) {
  const [copied, setCopied] = useState(false)
  const url = useMemo(() => {
    if (typeof window !== 'undefined') {
      return portfolioShareUrl(slug, window.location.origin)
    }
    return portfolioShareUrl(slug)
  }, [slug])

  async function copy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div style={{ display: 'grid', gap: '0.5rem', marginTop: '0.85rem' }}>
      <p className="mono" style={{ fontSize: '0.78rem', margin: 0, wordBreak: 'break-all' }}>
        Share: {url}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        <button type="button" className="btn btn-secondary" onClick={copy}>
          {copied ? 'Copied' : 'Copy share link'}
        </button>
        <a className="btn" href={url}>
          Open isolated demo
        </a>
      </div>
    </div>
  )
}

export default function Kits() {
  const kits = listPortfolioKits()

  return (
    <>
      <Seo
        title={`Digital Portfolios / Kits | ${brand.name}`}
        description="Productized digital kits per niche — share one métier with a prospect, not the full catalog."
      />
      <section className="section">
        <div className="container">
          <p className="label">Product line</p>
          <h1 className="display" style={{ fontSize: 'var(--text-3xl)', maxWidth: '18ch' }}>
            Niche Digital Portfolios
          </h1>
          <p style={{ maxWidth: '56ch', marginTop: '0.75rem' }}>
            This studio page is for <strong>you and your commercials</strong> — the gallery of kits.
            When you pitch a prospect, send the <strong>share link</strong> for their métier only.
            They will not see the other niches or the ICP list.
          </p>
          <p style={{ marginTop: '0.75rem', maxWidth: '56ch', color: 'var(--lp-muted)' }}>
            Pattern: studio gallery here · isolated demo at <code>/p/&lt;niche&gt;</code> · full kits
            grow under <code>/portfolios/&lt;niche&gt;</code>.
          </p>

          <div className="grid-2" style={{ marginTop: '2.5rem', gap: '1.5rem' }}>
            {kits.map((k) => {
              const niche = getNicheById(k.nicheId)
              const aiN = niche?.ai_services?.length || 0
              const tpN = niche?.third_party_connections?.length || 0
              const image = IMAGE_BY_SLUG[k.slug] || images.niches.createur
              const statusLabel =
                k.status === 'live' ? 'Live kit' : k.status === 'demo' ? 'Demo shareable' : 'Queued'
              return (
                <article key={k.slug} className="panel" style={{ padding: 0, overflow: 'hidden' }}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }}
                  />
                  <div style={{ padding: '1.25rem' }}>
                    <p className="label">{statusLabel}</p>
                    <h2 className="display" style={{ fontSize: '1.5rem', margin: '0.25rem 0' }}>
                      {k.title}
                    </h2>
                    <p style={{ color: 'var(--lp-muted)' }}>{k.blurb}</p>
                    <p style={{ fontSize: '0.85rem', margin: '0.35rem 0 0' }}>
                      For: {k.audience}
                    </p>
                    {niche ? (
                      <p className="mono" style={{ fontSize: '0.8rem', margin: '0.5rem 0 0' }}>
                        Scoped catalog: {aiN} AI · {tpN} third-party
                      </p>
                    ) : null}
                    <ShareCopy slug={k.slug} />
                    {k.kind === 'full_kit' ? (
                      <p style={{ marginTop: '0.75rem' }}>
                        <Link to={k.studioPath}>Open in studio path →</Link>
                      </p>
                    ) : null}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
