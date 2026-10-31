import { useState } from 'react'
import Seo from '../components/Seo'
import { Icon } from '../components/Icons'
import { brand } from '../lib/brand'
import { images } from '../lib/images'
import { DemoTopbar, DemoWantThis } from './DemoShell'
import {
  DemoNav,
  DemoSection,
  DemoGrid,
  DemoPanel,
  DemoTabs,
  DemoSuccess,
  DemoChecklist,
  DemoTable,
  DemoLegalFoot,
} from './DemoKit'
import {
  lawyerMeta,
  lawyerNav,
  lawyerAreas,
  lawyerFees,
  lawyerPortal,
  lawyerFaq,
} from './data/lawyer'
import '../components/Photo.css'

function IntakeForm() {
  const [done, setDone] = useState(false)
  if (done) {
    return (
      <DemoSuccess title="Intake received — conflict check queued" onReset={() => setDone(false)}>
        <p>
          No attorney–client relationship yet. You will receive a portal invite only after clearance
          and engagement letter.
        </p>
      </DemoSuccess>
    )
  }
  return (
    <form
      className="demo-card demo-form"
      onSubmit={(e) => {
        e.preventDefault()
        setDone(true)
      }}
    >
      <p className="label">Secure intake</p>
      <p className="demo-disclaimer">
        Submitting this form does <strong>not</strong> create an attorney–client relationship. Do not
        send highly sensitive facts until engagement is confirmed.
      </p>
      <input required name="name" placeholder="Full name" />
      <input required type="email" name="email" placeholder="Email" />
      <input required name="phone" placeholder="Phone" />
      <select required name="area" defaultValue="">
        <option value="" disabled>
          Practice area
        </option>
        {lawyerAreas.map((a) => (
          <option key={a.name}>{a.name}</option>
        ))}
      </select>
      <textarea required name="summary" rows={4} placeholder="Brief matter summary (high level)" />
      <label className="demo-check">
        <input type="checkbox" required /> I understand the disclaimer and consent to processing under
        the privacy notice (GDPR)
      </label>
      <label className="demo-check">
        <input type="checkbox" name="adverse" /> I confirm I am not aware of an adverse party already
        represented by this cabinet (conflict stub)
      </label>
      <button className="btn" type="submit">
        Submit intake
      </button>
    </form>
  )
}

function ConsultForm() {
  const [done, setDone] = useState(false)
  if (done) {
    return (
      <DemoSuccess title="Consultation requested" onReset={() => setDone(false)}>
        <p>Calendar hold pending conflict check · invoice for first consult may follow.</p>
      </DemoSuccess>
    )
  }
  return (
    <form
      className="demo-card demo-form"
      onSubmit={(e) => {
        e.preventDefault()
        setDone(true)
      }}
    >
      <p className="label">Book consultation · 45 min</p>
      <input required name="name" placeholder="Name" />
      <input required type="email" name="email" placeholder="Email" />
      <select required name="slot" defaultValue="">
        <option value="" disabled>
          Preferred slot
        </option>
        {['Tue 10:00', 'Tue 16:30', 'Wed 11:00', 'Fri 09:30'].map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
      <select name="mode" defaultValue="cabinet">
        <option value="cabinet">In cabinet</option>
        <option value="video">Video</option>
        <option value="phone">Phone</option>
      </select>
      <button className="btn" type="submit">
        Request slot
      </button>
    </form>
  )
}

export default function LawyerDemo() {
  const hero = images.niches.avocat

  return (
    <div className="demo-root" style={{ ['--demo-bg']: '#aeb6c9' }}>
      <Seo
        title={`${lawyerMeta.name} — law platform demo | ${brand.name}`}
        description="Cabinet demo: practice areas, secure intake, consultation, client portal, fees, confidentiality."
      />
      <DemoTopbar name="Cabinet d’avocat" shareSlug="avocats" />
      <header className="demo-hero-photo">
        <img src={hero.src} alt={hero.alt} />
        <div className="demo-hero-photo__veil" />
        <div className="demo-hero-photo__content">
          <div className="demo-hero-photo__inner">
            <div>
              <span className="sticker sticker-violet">Platform demo · law</span>
              <h1 className="display" style={{ marginTop: '1rem' }}>
                {lawyerMeta.name}
              </h1>
              <p style={{ fontSize: '1.15rem', maxWidth: '40ch' }}>{lawyerMeta.tagline}</p>
              <p className="mono">
                {lawyerMeta.attorney} · {brand.city} · {brand.email}
              </p>
              <DemoChecklist
                items={[
                  'Practice areas + credentials',
                  'Disclaimer-safe intake',
                  'Consult booking',
                  'Client portal · docs · billing',
                ]}
              />
            </div>
            <a className="btn btn-lime" href="#intake">
              Start intake
            </a>
          </div>
        </div>
      </header>

      <DemoNav title={lawyerMeta.name} items={lawyerNav} />

      <DemoSection id="domains" label="Expertise" title="Practice areas">
        <DemoGrid cols={2}>
          {lawyerAreas.map((a) => (
            <DemoPanel key={a.name}>
              <span className="lp-icon-badge" aria-hidden>
                <Icon name="scale" size={18} />
              </span>
              <h3 className="display" style={{ fontSize: '1.3rem', marginTop: '0.65rem' }}>
                {a.name}
              </h3>
              <p>{a.blurb}</p>
            </DemoPanel>
          ))}
        </DemoGrid>
      </DemoSection>

      <DemoSection id="team" label="Counsel" title="Attorney">
        <div className="demo-split">
          <img
            src={hero.portrait}
            alt={lawyerMeta.attorney}
            style={{ width: '100%', maxWidth: 280, aspectRatio: '1', objectFit: 'cover', border: '2px solid var(--lp-ink)' }}
          />
          <DemoPanel>
            <h3 className="display" style={{ fontSize: '1.5rem', margin: 0 }}>
              {lawyerMeta.attorney}
            </h3>
            <p className="mono">{lawyerMeta.bar}</p>
            <p>
              Business, family, and real-estate matters for independents and SMEs. Engaging content
              over CV dumps — credentials available on request.
            </p>
            <DemoChecklist
              items={['Languages: FR · EN · EL', 'Retainer & fixed-fee options', 'Secure portal messaging']}
            />
          </DemoPanel>
        </div>
      </DemoSection>

      <DemoSection
        id="intake"
        label="Onboarding"
        title="Client intake"
        lead="Practice-area fields, conflict stub, explicit GDPR consent — no privilege until engagement."
      >
        <div className="demo-split">
          <IntakeForm />
          <DemoPanel>
            <p className="label">After submit</p>
            <DemoChecklist
              items={[
                'Conflict check (demo stub)',
                'Engagement letter / e-sign retainer',
                'Portal account provisioning',
                'First consult calendar invite',
              ]}
            />
          </DemoPanel>
        </div>
      </DemoSection>

      <DemoSection id="book" label="Calendar" title="Consultation">
        <div className="demo-split">
          <ConsultForm />
          <DemoPanel>
            <p>
              Modes: cabinet, video, phone. Payment of first consult can run SCA before the meeting
              when required by firm policy.
            </p>
          </DemoPanel>
        </div>
      </DemoSection>

      <DemoSection id="portal" label="Clients" title="Client portal" lead="Matters, messages, documents, invoices.">
        <DemoTabs
          tabs={[
            {
              id: 'matters',
              label: 'Matters',
              content: (
                <DemoTable
                  columns={[
                    { key: 'id', label: 'Ref' },
                    { key: 'title', label: 'Matter' },
                    { key: 'status', label: 'Status' },
                  ]}
                  rows={lawyerPortal.matters}
                />
              ),
            },
            {
              id: 'msg',
              label: 'Messages',
              content: (
                <div className="demo-msg-list">
                  {lawyerPortal.messages.map((m, i) => (
                    <DemoPanel key={i}>
                      <p className="mono">
                        {m.from} · {m.when}
                      </p>
                      <p style={{ margin: 0 }}>{m.text}</p>
                    </DemoPanel>
                  ))}
                </div>
              ),
            },
            {
              id: 'docs',
              label: 'Documents',
              content: (
                <DemoPanel>
                  <p>Upload slot · encrypted at rest (demo)</p>
                  <ul>
                    <li>NDA-v2.pdf</li>
                    <li>Lease-draft.docx — shared by cabinet</li>
                  </ul>
                  <p className="mono">e-Sign retainer: pending QES-compatible stub</p>
                </DemoPanel>
              ),
            },
            {
              id: 'bill',
              label: 'Billing',
              content: (
                <DemoTable
                  columns={[
                    { key: 'id', label: 'Invoice' },
                    { key: 'label', label: 'Label' },
                    { key: 'amount', label: 'Amount' },
                    { key: 'status', label: 'Status' },
                  ]}
                  rows={lawyerPortal.invoices}
                />
              ),
            },
          ]}
        />
      </DemoSection>

      <DemoSection id="fees" label="Transparency" title="Fees">
        <DemoTable
          columns={[
            { key: 'item', label: 'Item' },
            { key: 'price', label: 'Indicative' },
          ]}
          rows={lawyerFees.map((f, i) => ({ id: i, ...f }))}
        />
      </DemoSection>

      <DemoSection id="confidentiality" label="Trust" title="Confidentiality & GDPR" tone="muted">
        <DemoGrid cols={2}>
          <DemoPanel>
            <h3 className="display" style={{ fontSize: '1.2rem' }}>
              Professional secrecy
            </h3>
            <p>
              Communications after engagement are handled under professional confidentiality rules.
              Form submissions are screened, not privileged by default.
            </p>
          </DemoPanel>
          <DemoPanel>
            <h3 className="display" style={{ fontSize: '1.2rem' }}>
              Data protection
            </h3>
            <p>
              Minimize special-category data until needed · access logs · EU hosting preference ·
              DSR within one month (process demo).
            </p>
          </DemoPanel>
        </DemoGrid>
      </DemoSection>

      <DemoSection id="faq" label="FAQ" title="Common questions">
        {lawyerFaq.map((f) => (
          <DemoPanel key={f.q} style={{ marginBottom: '0.75rem' }}>
            <h3 className="display" style={{ fontSize: '1.15rem', margin: 0 }}>
              {f.q}
            </h3>
            <p>{f.a}</p>
          </DemoPanel>
        ))}
      </DemoSection>

      <DemoLegalFoot>
        <p className="mono">
          Legal notice · Privacy · {brand.name} law niche demo — illustrative only.
        </p>
        <p style={{ fontSize: '0.85rem' }}>
          Research: law firm site + intake + portal patterns (LawPay / ABA-aligned). See
          docs/DEMO_NICHE_RESEARCH.md.
        </p>
      </DemoLegalFoot>

      <DemoWantThis shareSlug="avocats" />
    </div>
  )
}
