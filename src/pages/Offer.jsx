import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Photo from '../components/Photo'
import { brand } from '../lib/brand'
import {
  formatTierPublicPrice,
  getDepositPercent,
  getFlagshipProduct,
  getRecommendedTier,
  getTiers,
  offersCatalog,
} from '../lib/offers'
import { images } from '../lib/images'
import '../components/Photo.css'

export default function Offer() {
  const flagship = getFlagshipProduct()
  const tiers = getTiers()
  const recommended = getRecommendedTier()
  const deposit = getDepositPercent()
  const included = flagship.baseline_includes || brand.kitScope?.included || []
  const excluded = flagship.baseline_excludes || brand.kitScope?.not_included || []

  return (
    <>
      <Seo
        title={`${flagship.name} | ${brand.name}`}
        description={`${flagship.promise} Tiers from config/offers.json. Deposit ${deposit}%.`}
      />
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '2rem' }}>
            <div>
              <p className="label">
                Productized offer · {offersCatalog.status}
              </p>
              <h1 className="display" style={{ fontSize: 'var(--text-3xl)', marginTop: '0.5rem' }}>
                {flagship.name}
              </h1>
              <p style={{ maxWidth: '52ch', marginTop: '1rem' }}>{flagship.promise}</p>
              <p className="mono" style={{ fontSize: '0.8rem', marginTop: '0.75rem' }}>
                Recommended: {recommended?.name} ({formatTierPublicPrice(recommended)}) · deposit{' '}
                {deposit}% · no cold coupons
              </p>
            </div>
            <Photo src={images.phone.src} alt={images.phone.alt} ratio="4/3" />
          </div>

          <div className="grid-3" style={{ marginTop: '2rem' }}>
            {tiers.map((t) => (
              <article key={t.id} className="panel" style={{ padding: '1.25rem' }}>
                <span className={`sticker ${t.recommended ? 'sticker-lime' : 'sticker-violet'}`}>
                  {t.recommended ? 'Recommended' : t.name}
                </span>
                <h2 className="display" style={{ fontSize: '1.35rem', marginTop: '0.75rem' }}>
                  {t.name} · {formatTierPublicPrice(t)}
                </h2>
                <p style={{ color: 'var(--lp-muted)', margin: 0 }}>{t.positioning_one_liner}</p>
              </article>
            ))}
          </div>

          <div className="grid-2" style={{ marginTop: '2.5rem' }}>
            <article className="panel" style={{ padding: '1.5rem' }}>
              <span className="sticker sticker-lime">Inclus (baseline)</span>
              <h2 className="display" style={{ fontSize: '1.75rem', marginTop: '1rem' }}>
                Ce que vous obtenez
              </h2>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.1rem' }}>
                {included.map((item) => (
                  <li key={item} style={{ marginBottom: '0.45rem' }}>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
            <article className="panel-soft" style={{ padding: '1.5rem' }}>
              <span className="sticker sticker-pink">Hors scope</span>
              <h2 className="display" style={{ fontSize: '1.75rem', marginTop: '1rem' }}>
                Non inclus
              </h2>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.1rem' }}>
                {excluded.map((item) => (
                  <li key={item} style={{ marginBottom: '0.45rem' }}>
                    {item}
                  </li>
                ))}
              </ul>
              <Link className="btn" to="/tarifs" style={{ marginTop: '1.25rem' }}>
                Voir les tarifs / tiers
              </Link>
            </article>
          </div>

          <p style={{ marginTop: '1.5rem' }}>
            <Link to={flagship.path || brand.flagshipPath}>Ouvrir la démo kit →</Link>
            {' · '}
            <Link to="/audit">Audit 15 min</Link>
          </p>
        </div>
      </section>
    </>
  )
}
