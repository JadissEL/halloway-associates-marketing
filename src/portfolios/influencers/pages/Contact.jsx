import { useState } from 'react'
import { Link } from 'react-router-dom'
import RequireUser from '../components/RequireUser'
import { getUserSession } from '../lib/session'
import { sendMessage } from '../lib/messageStore'
import { creator } from '../data'

function ContactForm() {
  const user = getUserSession()
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [sent, setSent] = useState(null)

  function onSubmit(e) {
    e.preventDefault()
    const msg = sendMessage({
      fromEmail: user.email,
      fromName: user.name,
      toRole: 'creator',
      subject,
      body,
    })
    setSent(msg)
    setSubject('')
    setBody('')
  }

  if (sent) {
    return (
      <div className="inf-banner inf-banner--ok" style={{ maxWidth: 520 }}>
        <p className="inf-label">Sent</p>
        <p>
          Message from <strong>{user.email}</strong> reached {creator.name}&apos;s inbox (kit demo
          storage). Ref: <code>{sent.id}</code>
        </p>
        <Link className="inf-btn" to="/portfolios/influencers/account">
          Open my dashboard
        </Link>
      </div>
    )
  }

  return (
    <form className="inf-form" onSubmit={onSubmit}>
      <p className="inf-banner">
        Connected as <strong>{user.name}</strong> · {user.email}{' '}
        <Link to="/portfolios/influencers/connect">change</Link>
      </p>
      <label>
        Subject
        <input required value={subject} onChange={(e) => setSubject(e.target.value)} />
      </label>
      <label>
        Message
        <textarea required rows={5} value={body} onChange={(e) => setBody(e.target.value)} />
      </label>
      <button className="inf-btn" type="submit">
        Send to {creator.name}
      </button>
    </form>
  )
}

export default function InfluencerContact() {
  return (
    <main className="inf-wrap inf-section">
      <p className="inf-label">Contact</p>
      <h1 className="display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', margin: 0 }}>
        Message {creator.name}
      </h1>
      <p style={{ maxWidth: '48ch', color: 'var(--inf-muted)' }}>
        Email connection required — no anonymous contact. Prefer a paid offer?{' '}
        <Link to="/portfolios/influencers/offers">Browse offers</Link>.
      </p>
      <div style={{ marginTop: '1.5rem' }}>
        <RequireUser intent="send a message">
          <ContactForm />
        </RequireUser>
      </div>
    </main>
  )
}
