import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { brand } from '../lib/brand'
import { activateKitShare, isKitShareActive } from '../lib/kitShare'
import './DemoShell.css'

function useDemoShare(slug) {
  const location = useLocation()
  const [shareMode, setShareMode] = useState(() => isKitShareActive(slug))

  useEffect(() => {
    const q = new URLSearchParams(location.search)
    if (q.get('share') === '1' || q.get('share') === 'true') {
      if (slug) activateKitShare(slug)
    }
    setShareMode(isKitShareActive(slug) || q.get('share') === '1')
  }, [location.search, slug])

  return shareMode
}

export function DemoTopbar({ name, shareSlug }) {
  const shareMode = useDemoShare(shareSlug)
  return (
    <div className="demo-topbar">
      <span className="mono">
        {shareMode ? `Portfolio démo · ${name}` : `Démo niche · ${name}`}
      </span>
      {shareMode ? (
        <Link to="/built-by">Fait par {brand.name}</Link>
      ) : (
        <a href={brand.absoluteUrl('/audit')}>Envie du même résultat ? → Audit gratuit</a>
      )}
    </div>
  )
}

export function DemoBooking({ title = 'Demande de rendez-vous' }) {
  const [ok, setOk] = useState(false)
  if (ok) {
    return (
      <div className="demo-card form-status success">
        <p className="label">Confirmé</p>
        <p>Merci — nous vous rappelons rapidement (démo).</p>
      </div>
    )
  }
  return (
    <form
      className="demo-card demo-form"
      onSubmit={(e) => {
        e.preventDefault()
        setOk(true)
      }}
    >
      <h3 className="display" style={{ fontSize: '1.5rem' }}>
        {title}
      </h3>
      <input required name="name" placeholder="Votre nom" />
      <input required name="phone" placeholder="Téléphone" />
      <select name="service" defaultValue="">
        <option value="" disabled>
          Service
        </option>
        <option>Consultation</option>
        <option>Prestation standard</option>
        <option>Autre</option>
      </select>
      <textarea name="msg" rows={3} placeholder="Message (optionnel)" />
      <button className="btn" type="submit">
        Envoyer
      </button>
    </form>
  )
}

export function DemoWantThis({ shareSlug }) {
  const shareMode = useDemoShare(shareSlug)
  return (
    <div className="demo-footer-cta">
      <p className="label" style={{ color: 'var(--lp-lime)' }}>
        {brand.name}
      </p>
      <h2 className="display" style={{ fontSize: '1.85rem' }}>
        Envie de ça pour votre commerce ?
      </h2>
      <p>
        {shareMode
          ? 'Ceci est la démo de votre métier uniquement. Parlez-en à votre contact Halloway.'
          : `Présence digitale + consulting — ${brand.promiseDays}. Audit gratuit 15 min.`}
      </p>
      {shareMode ? (
        <a className="btn btn-lime" href={`mailto:${brand.contactEmail}`}>
          Écrire à {brand.contactEmail}
        </a>
      ) : (
        <a className="btn btn-lime" href={brand.absoluteUrl('/audit')}>
          Réserver un audit
        </a>
      )}
      {!shareMode ? (
        <p className="mono" style={{ marginTop: '0.75rem', fontSize: '0.85rem' }}>
          <a href={brand.siteUrl}>{brand.siteUrl.replace(/^https:\/\//, '')}</a>
        </p>
      ) : (
        <p className="mono" style={{ marginTop: '0.75rem', fontSize: '0.85rem' }}>
          <Link to="/built-by">Qui a construit cette démo ?</Link>
        </p>
      )}
    </div>
  )
}
