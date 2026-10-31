import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Photo from '../components/Photo'
import { Icon } from '../components/Icons'
import { brand } from '../lib/brand'
import {
  formatTierPublicPrice,
  getCarePlans,
  getConsulting,
  getDepositPercent,
  getFlagshipProduct,
  getKitFromPrice,
  getKitToPrice,
  getRecommendedTier,
  getTiers,
  offersCatalog,
} from '../lib/offers'
import { images } from '../lib/images'
import '../components/Photo.css'

export default function Pricing() {
  const tiers = getTiers()
  const recommended = getRecommendedTier()
  const care = getCarePlans()
  const consulting = getConsulting().filter((c) => c.id !== 'audit_discovery')
  const audit = getConsulting().find((c) => c.id === 'audit_discovery')
  const flagship = getFlagshipProduct()
  const deposit = getDepositPercent()
  const provisional = offersCatalog.status === 'PROVISIONAL'

  return (
    <>
      <Seo
        title={`Tarifs | ${brand.name}`}
        description={`${flagship.name}: from €${getKitFromPrice()}–€${getKitToPrice()}. Deposit ${deposit}%. Consulting from €150.`}
      />
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', marginBottom: '2rem' }}>
            <div>
              <p className="label">
                Offers config · {offersCatalog.status}
                {provisional ? ' — final quote after audit' : ''}
              </p>
              <h1 className="display" style={{ fontSize: 'var(--text-3xl)' }}>
                Tarifs
              </h1>
              <p style={{ maxWidth: '48ch', marginTop: '0.75rem' }}>
                {flagship.name} — tiers from <code>config/offers.json</code>. Recommended:{' '}
                <strong>{recommended?.name}</strong>. Deposit <strong>{deposit}%</strong> · remainder
                on go-live. {offersCatalog.tax_note}.
              </p>
            </div>
            <Photo src={images.meeting.src} alt={images.meeting.alt} ratio="4/3" />
          </div>

          <div className="grid-3">
            {tiers.map((tier) => (
              <article
                key={tier.id}
                className="panel"
                style={{
                  padding: '1.5rem',
                  outline: tier.recommended ? '2px solid var(--lp-lime, #c5e063)' : undefined,
                }}
              >
                <span className="lp-icon-badge" aria-hidden>
                  <Icon name="build" size={20} />
                </span>
                <p className="label" style={{ marginTop: '0.75rem' }}>
                  {tier.recommended ? 'Recommended · ' : ''}
                  {tier.name}
                  {tier.status === 'PROVISIONAL' ? ' · provisional' : ''}
                </p>
                <h2 className="display" style={{ fontSize: '2.2rem', marginTop: '0.5rem' }}>
                  {formatTierPublicPrice(tier)}
                </h2>
                <p style={{ color: 'var(--lp-muted)' }}>{tier.positioning_one_liner}</p>
                <p className="mono" style={{ fontSize: '0.75rem' }}>
                  Band €{tier.price_band_min}–€{tier.price_band_max} · {tier.delivery_days_min}–
                  {tier.delivery_days_max} days · {tier.revision_rounds} revision
                  {tier.revision_rounds > 1 ? 's' : ''}
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.1rem', fontSize: '0.9rem' }}>
                  {(tier.includes || []).slice(0, 4).map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="grid-2" style={{ marginTop: '2rem', gap: '1.25rem' }}>
            <article className="panel" style={{ padding: '1.5rem' }}>
              <p className="label">Consulting</p>
              <h2 className="display" style={{ fontSize: '1.5rem' }}>
                Sessions
              </h2>
              <ul style={{ paddingLeft: '1.1rem' }}>
                {audit ? (
                  <li>
                    {audit.name}: {audit.price_eur === 0 ? 'free (qualified ICP)' : `€${audit.price_eur}`}{' '}
                    · {audit.duration_min} min
                  </li>
                ) : null}
                {consulting.map((c) => (
                  <li key={c.id}>
                    {c.name}: €{c.price_eur} · {c.duration_min} min
                    {c.status === 'PROVISIONAL' ? ' (provisional)' : ''}
                  </li>
                ))}
              </ul>
            </article>
            <article className="panel" style={{ padding: '1.5rem' }}>
              <p className="label">Care (retainer)</p>
              <h2 className="display" style={{ fontSize: '1.5rem' }}>
                After launch
              </h2>
              <ul style={{ paddingLeft: '1.1rem' }}>
                {care.map((c) => (
                  <li key={c.id}>
                    {c.name}: €{c.price_eur_month}/mo · {c.edits_per_month} edits
                  </li>
                ))}
              </ul>
              <p style={{ fontSize: '0.85rem', color: 'var(--lp-muted)' }}>
                Care stays at list — don’t discount Care to close a kit.
              </p>
            </article>
          </div>

          <div className="panel-soft" style={{ padding: '1.75rem', marginTop: '2rem' }}>
            <h2 className="display" style={{ fontSize: '1.75rem' }}>Next step</h2>
            <p>
              No hard sell / no cold coupons. Audit recommends Starter vs Pro vs Authority — then
              exact proposal.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
              <Link className="btn btn-lime" to="/audit">
                Audit gratuit 15 min
              </Link>
              <Link className="btn btn-secondary" to="/offre">
                Inclus / hors scope
              </Link>
              <Link className="btn btn-secondary" to={flagship.path || brand.flagshipPath}>
                Voir le kit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
