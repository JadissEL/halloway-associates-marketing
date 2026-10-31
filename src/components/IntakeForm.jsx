import { useState } from 'react'
import { saveLead } from '../lib/leads'

const empty = {
  business: '',
  contactName: '',
  email: '',
  phone: '',
  niche: '',
  city: '',
  hours: '',
  services: '',
  prices: '',
  colors: '',
  logoUrl: '',
  photos: '',
  bookingPref: 'formulaire',
  notes: '',
}

export default function IntakeForm() {
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})

  function onChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    const next = {}
    if (!form.business.trim()) next.business = 'Requis'
    if (!form.contactName.trim()) next.contactName = 'Requis'
    if (!form.email.trim()) next.email = 'Requis'
    if (!form.services.trim()) next.services = 'Listez au moins vos services principaux'
    setErrors(next)
    if (Object.keys(next).length) return

    setStatus('loading')
    try {
      saveLead({ ...form, type: 'intake', name: form.contactName, status: 'won', source: 'website_form' })
      const outboundBase = import.meta.env.VITE_OUTBOUND_API_URL
      if (outboundBase) {
        const res = await fetch(`${outboundBase.replace(/\/$/, '')}/api/public/inbound-lead`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            type: 'intake',
            name: form.contactName,
            businessName: form.business,
            niche: form.niche || 'service',
            city: form.city || '—',
            website: form.logoUrl || null,
            email: form.email || null,
            phone: form.phone || null,
            notes: [form.services && `Services: ${form.services}`, form.notes].filter(Boolean).join('\n'),
          }),
        })
        if (!res.ok) throw new Error('outbound_os_error')
      } else {
        await new Promise((r) => setTimeout(r, 400))
      }
      setStatus('success')
      setForm(empty)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="form-status success panel-soft">
        <p className="label">Brief reçu</p>
        <h3 className="display" style={{ fontSize: '1.75rem' }}>On construit. Vous validez. On lance.</h3>
        <p>Merci. Nous revenons sous 24–48 h avec le planning de livraison.</p>
        <button type="button" className="btn btn-secondary" onClick={() => setStatus('idle')}>
          Nouveau brief
        </button>
      </div>
    )
  }

  return (
    <form className="panel" style={{ padding: '1.5rem' }} onSubmit={onSubmit}>
      {status === 'loading' && <div className="form-status loading">Enregistrement…</div>}
      {status === 'error' && <div className="form-status error">Erreur — réessayez.</div>}

      <div className="grid-2">
        <div className="field">
          <label htmlFor="business">Entreprise</label>
          <input id="business" name="business" value={form.business} onChange={onChange} />
          {errors.business && <span className="field-error">{errors.business}</span>}
        </div>
        <div className="field">
          <label htmlFor="contactName">Contact</label>
          <input id="contactName" name="contactName" value={form.contactName} onChange={onChange} />
          {errors.contactName && <span className="field-error">{errors.contactName}</span>}
        </div>
      </div>

      <div className="grid-2">
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={form.email} onChange={onChange} />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>
        <div className="field">
          <label htmlFor="phone">Téléphone</label>
          <input id="phone" name="phone" value={form.phone} onChange={onChange} />
        </div>
      </div>

      <div className="grid-2">
        <div className="field">
          <label htmlFor="niche">Secteur</label>
          <input id="niche" name="niche" value={form.niche} onChange={onChange} placeholder="Salon, café…" />
        </div>
        <div className="field">
          <label htmlFor="city">Ville</label>
          <input id="city" name="city" value={form.city} onChange={onChange} />
        </div>
      </div>

      <div className="field">
        <label htmlFor="hours">Horaires</label>
        <input id="hours" name="hours" value={form.hours} onChange={onChange} placeholder="Mar–Sam 9h–19h" />
      </div>

      <div className="field">
        <label htmlFor="services">Services (un par ligne)</label>
        <textarea id="services" name="services" rows={4} value={form.services} onChange={onChange} />
        {errors.services && <span className="field-error">{errors.services}</span>}
      </div>

      <div className="field">
        <label htmlFor="prices">Tarifs (ou « à partir de »)</label>
        <textarea id="prices" name="prices" rows={3} value={form.prices} onChange={onChange} />
      </div>

      <div className="grid-2">
        <div className="field">
          <label htmlFor="colors">Couleurs / ambiance</label>
          <input id="colors" name="colors" value={form.colors} onChange={onChange} placeholder="Crème, noir, bois…" />
        </div>
        <div className="field">
          <label htmlFor="bookingPref">Réservation</label>
          <select id="bookingPref" name="bookingPref" value={form.bookingPref} onChange={onChange}>
            <option value="formulaire">Formulaire de demande</option>
            <option value="calendrier">Créneaux calendrier</option>
            <option value="whatsapp">WhatsApp / appel</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="logoUrl">Lien logo (Drive, Dropbox…)</label>
        <input id="logoUrl" name="logoUrl" value={form.logoUrl} onChange={onChange} />
      </div>

      <div className="field">
        <label htmlFor="photos">Liens photos</label>
        <textarea id="photos" name="photos" rows={2} value={form.photos} onChange={onChange} />
      </div>

      <div className="field">
        <label htmlFor="notes">Notes</label>
        <textarea id="notes" name="notes" rows={3} value={form.notes} onChange={onChange} />
      </div>

      <button className="btn" type="submit" disabled={status === 'loading'}>
        Envoyer mon brief
      </button>
    </form>
  )
}
