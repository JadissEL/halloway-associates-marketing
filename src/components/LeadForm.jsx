import { useState } from 'react'
import { saveLead } from '../lib/leads'
import { brand, niches } from '../lib/brand'

const empty = {
  name: '',
  business: '',
  niche: '',
  city: '',
  website: '',
  email: '',
  phone: '',
  message: '',
}

export default function LeadForm({ type = 'audit', submitLabel = brand.pricing ? 'Réserver mon audit' : 'Réserver mon audit' }) {
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [submittedEmail, setSubmittedEmail] = useState('')
  const [errorDetail, setErrorDetail] = useState('')

  const outboundBase = import.meta.env.VITE_OUTBOUND_API_URL
  const requireOutbound = Boolean(outboundBase)

  function onChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  function validate() {
    const next = {}
    if (!form.name.trim()) next.name = 'Indiquez votre nom'
    if (!form.business.trim()) next.business = 'Nom de l’entreprise requis'
    if (!form.niche) next.niche = 'Choisissez une niche'
    if (!form.city.trim()) next.city = 'Ville requise'
    if (!form.email.trim() && !form.phone.trim()) {
      next.email = 'Email ou téléphone requis'
      next.phone = 'Email ou téléphone requis'
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Email invalide'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function postToOutboundOs(payload) {
    const res = await fetch(`${outboundBase.replace(/\/$/, '')}/api/public/inbound-lead`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      throw new Error(text || `outbound_os_${res.status}`)
    }
    return res.json()
  }

  async function onSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    setErrorDetail('')
    const snapshot = { ...form }
    try {
      saveLead({ ...snapshot, type, source: 'website_form' })

      const endpoint = import.meta.env.VITE_FORMSPREE_ID
      if (endpoint) {
        const res = await fetch(`https://formspree.io/f/${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...snapshot, _subject: `${brand.name} ${type}` }),
        })
        if (!res.ok) throw new Error('formspree_error')
      }

      if (requireOutbound) {
        await postToOutboundOs({
          type,
          name: snapshot.name,
          businessName: snapshot.business,
          niche: snapshot.niche,
          city: snapshot.city,
          website: snapshot.website || null,
          email: snapshot.email || null,
          phone: snapshot.phone || null,
          notes: snapshot.message || null,
        })
      }

      if (!endpoint && !requireOutbound) {
        await new Promise((r) => setTimeout(r, 400))
      }

      setSubmittedEmail(snapshot.email)
      setStatus('success')
      setForm(empty)
    } catch (err) {
      setStatus('error')
      setErrorDetail(
        requireOutbound
          ? 'Le CRM Outbound OS n’a pas reçu la demande. Réessayez ou écrivez-nous directement.'
          : err instanceof Error
            ? err.message
            : 'Échec d’envoi',
      )
    }
  }

  if (status === 'success') {
    return (
      <div className="form-status success panel-soft" role="status">
        <p className="label">Demande reçue</p>
        <h3 className="display" style={{ fontSize: '1.75rem', marginTop: '0.5rem' }}>
          Merci — réponse sous 24 h.
        </h3>
        <p>
          Nous préparons 3 points concrets qui vous coûtent probablement des clients.
          Gardez un œil sur {submittedEmail || 'votre boîte mail'} / WhatsApp.
        </p>
        <button type="button" className="btn btn-secondary" onClick={() => setStatus('idle')}>
          Envoyer une autre demande
        </button>
      </div>
    )
  }

  return (
    <form className="panel" style={{ padding: '1.5rem' }} onSubmit={onSubmit} noValidate>
      {status === 'loading' && (
        <div className="form-status loading" role="status">Envoi en cours…</div>
      )}
      {status === 'error' && (
        <div className="form-status error" role="alert">
          {errorDetail || `Échec d’envoi. Réessayez ou écrivez à ${brand.email}.`}
          <div style={{ marginTop: '0.5rem' }}>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </div>
        </div>
      )}

      <div className="grid-2">
        <div className="field">
          <label htmlFor={`${type}-name`}>Votre nom</label>
          <input id={`${type}-name`} name="name" value={form.name} onChange={onChange} autoComplete="name" />
          {errors.name && <span className="field-error" role="alert">{errors.name}</span>}
        </div>
        <div className="field">
          <label htmlFor={`${type}-business`}>Nom de l’entreprise</label>
          <input id={`${type}-business`} name="business" value={form.business} onChange={onChange} />
          {errors.business && <span className="field-error" role="alert">{errors.business}</span>}
        </div>
      </div>

      <div className="grid-2">
        <div className="field">
          <label htmlFor={`${type}-niche`}>Secteur</label>
          <select id={`${type}-niche`} name="niche" value={form.niche} onChange={onChange}>
            <option value="">Choisir…</option>
            {niches.map((n) => (
              <option key={n.id} value={n.id}>{n.label}</option>
            ))}
          </select>
          {errors.niche && <span className="field-error" role="alert">{errors.niche}</span>}
        </div>
        <div className="field">
          <label htmlFor={`${type}-city`}>Ville</label>
          <input
            id={`${type}-city`}
            name="city"
            value={form.city}
            onChange={onChange}
            placeholder={brand.city || 'Votre ville'}
          />
          {errors.city && <span className="field-error" role="alert">{errors.city}</span>}
        </div>
      </div>

      <div className="field">
        <label htmlFor={`${type}-website`}>Site ou Instagram</label>
        <input
          id={`${type}-website`}
          name="website"
          value={form.website}
          onChange={onChange}
          placeholder="@compte ou URL"
        />
      </div>

      <div className="grid-2">
        <div className="field">
          <label htmlFor={`${type}-email`}>Email</label>
          <input id={`${type}-email`} name="email" type="email" value={form.email} onChange={onChange} autoComplete="email" />
          {errors.email && <span className="field-error" role="alert">{errors.email}</span>}
        </div>
        <div className="field">
          <label htmlFor={`${type}-phone`}>Téléphone / WhatsApp</label>
          <input id={`${type}-phone`} name="phone" value={form.phone} onChange={onChange} autoComplete="tel" />
          {errors.phone && <span className="field-error" role="alert">{errors.phone}</span>}
        </div>
      </div>

      <div className="field">
        <label htmlFor={`${type}-message`}>Contexte (optionnel)</label>
        <textarea id={`${type}-message`} name="message" rows={3} value={form.message} onChange={onChange} />
      </div>

      <button className="btn" type="submit" disabled={status === 'loading'}>
        {submitLabel}
      </button>
    </form>
  )
}
