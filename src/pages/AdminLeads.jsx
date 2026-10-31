import { useMemo, useState } from 'react'
import Seo from '../components/Seo'
import { brand } from '../lib/brand'
import { exportLeadsCsv, loadLeads, updateLead } from '../lib/leads'

const STATUSES = ['new', 'contacted', 'replied', 'audit booked', 'won', 'lost']

export default function AdminLeads() {
  const [pin, setPin] = useState('')
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('lp_admin') === '1')
  const [tick, setTick] = useState(0)
  const leads = useMemo(() => loadLeads(), [tick])

  function unlock(e) {
    e.preventDefault()
    const expected = import.meta.env.VITE_ADMIN_PIN || 'halloway'
    if (pin === expected) {
      sessionStorage.setItem('lp_admin', '1')
      setAuthed(true)
    } else {
      alert('PIN incorrect (défaut: halloway — changez VITE_ADMIN_PIN)')
    }
  }

  if (!authed) {
    return (
      <section className="section">
        <div className="container" style={{ maxWidth: 420 }}>
          <h1 className="display">CRM-lite</h1>
          <form className="panel" style={{ padding: '1.25rem', marginTop: '1rem' }} onSubmit={unlock}>
            <div className="field">
              <label htmlFor="pin">PIN admin</label>
              <input id="pin" type="password" value={pin} onChange={(e) => setPin(e.target.value)} />
            </div>
            <button className="btn" type="submit">Entrer</button>
          </form>
        </div>
      </section>
    )
  }

  return (
    <>
      <Seo title={`CRM-lite | ${brand.name}`} description="Leads locaux — stockage navigateur." />
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
            <h1 className="display" style={{ fontSize: 'var(--text-2xl)' }}>Leads</h1>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                const csv = exportLeadsCsv()
                const blob = new Blob([csv], { type: 'text/csv' })
                const a = document.createElement('a')
                a.href = URL.createObjectURL(blob)
                a.download = 'halloway-associates-leads.csv'
                a.click()
              }}
            >
              Export CSV
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => setTick((t) => t + 1)}>
              Rafraîchir
            </button>
          </div>

          {leads.length === 0 ? (
            <div className="form-status loading panel-soft" style={{ marginTop: '1.5rem' }}>
              Aucun lead pour l’instant. Les formulaires audit / contact / intake alimentent cette table (localStorage).
            </div>
          ) : (
            <div style={{ overflowX: 'auto', marginTop: '1.5rem' }}>
              <table className="panel" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ background: 'var(--lp-cream-dark)', textAlign: 'left' }}>
                    {['Date', 'Type', 'Nom', 'Entreprise', 'Niche', 'Ville', 'Contact', 'Statut', 'Notes'].map((h) => (
                      <th key={h} style={{ padding: '0.65rem', borderBottom: 'var(--lp-border-thin)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {leads.map((l) => (
                    <tr key={l.id}>
                      <td style={{ padding: '0.55rem', borderBottom: '1px solid #ddd' }} className="mono">
                        {new Date(l.createdAt).toLocaleString('fr-FR')}
                      </td>
                      <td style={{ padding: '0.55rem', borderBottom: '1px solid #ddd' }}>{l.type}</td>
                      <td style={{ padding: '0.55rem', borderBottom: '1px solid #ddd' }}>{l.name || l.contactName}</td>
                      <td style={{ padding: '0.55rem', borderBottom: '1px solid #ddd' }}>{l.business}</td>
                      <td style={{ padding: '0.55rem', borderBottom: '1px solid #ddd' }}>{l.niche}</td>
                      <td style={{ padding: '0.55rem', borderBottom: '1px solid #ddd' }}>{l.city}</td>
                      <td style={{ padding: '0.55rem', borderBottom: '1px solid #ddd' }} className="mono">
                        {l.email}<br />{l.phone}
                      </td>
                      <td style={{ padding: '0.55rem', borderBottom: '1px solid #ddd' }}>
                        <select
                          value={l.status || 'new'}
                          onChange={(e) => {
                            updateLead(l.id, { status: e.target.value })
                            setTick((t) => t + 1)
                          }}
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                      <td style={{ padding: '0.55rem', borderBottom: '1px solid #ddd' }}>
                        <input
                          defaultValue={l.notes || ''}
                          onBlur={(e) => {
                            updateLead(l.id, { notes: e.target.value })
                            setTick((t) => t + 1)
                          }}
                          style={{ width: '140px' }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
