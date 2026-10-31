import { useState } from 'react'
import { brand } from '../lib/brand'
import './DemoShell.css'

export function DemoTopbar({ name }) {
  return (
    <div className="demo-topbar">
      <span className="mono">Démo niche · {name}</span>
      <a href={brand.absoluteUrl('/audit')}>Envie du même résultat ? → Audit gratuit</a>
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
      <h3 className="display" style={{ fontSize: '1.5rem' }}>{title}</h3>
      <input required name="name" placeholder="Votre nom" />
      <input required name="phone" placeholder="Téléphone" />
      <select name="service" defaultValue="">
        <option value="" disabled>Service</option>
        <option>Consultation</option>
        <option>Prestation standard</option>
        <option>Autre</option>
      </select>
      <textarea name="msg" rows={3} placeholder="Message (optionnel)" />
      <button className="btn" type="submit">Envoyer</button>
    </form>
  )
}

export function DemoWantThis() {
  return (
    <div className="demo-footer-cta">
      <p className="label" style={{ color: 'var(--lp-lime)' }}>{brand.name}</p>
      <h2 className="display" style={{ fontSize: '1.85rem' }}>
        Envie de ça pour votre commerce ?
      </h2>
      <p>
        Présence digitale + consulting — {brand.promiseDays}. Audit gratuit 15 min.
      </p>
      <a className="btn btn-lime" href={brand.absoluteUrl('/audit')}>
        Réserver un audit
      </a>
      <p className="mono" style={{ marginTop: '0.75rem', fontSize: '0.85rem' }}>
        <a href={brand.siteUrl}>{brand.siteUrl.replace(/^https:\/\//, '')}</a>
      </p>
    </div>
  )
}
