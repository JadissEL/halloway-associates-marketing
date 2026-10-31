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
  DemoSuccess,
  DemoChecklist,
  DemoTable,
  DemoLegalFoot,
} from './DemoKit'
import {
  courierMeta,
  courierNav,
  courierRates,
  courierJobs,
  courierPod,
  courierFaq,
} from './data/courier'
import '../components/Photo.css'

function QuoteForm() {
  const [done, setDone] = useState(false)
  if (done) {
    return (
      <DemoSuccess title="Quote FC-Q-221" onReset={() => setDone(false)}>
        <p>
          Indicative 16 € · window today 16:00–17:30. Accept to create job & tracking link (demo).
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
      <p className="label">Instant quote</p>
      <input required name="pickup" placeholder="Pickup address" />
      <input required name="dropoff" placeholder="Delivery address" />
      <select required name="size" defaultValue="">
        <option value="" disabled>
          Parcel size
        </option>
        <option>Envelope / small</option>
        <option>Box &lt; 10 kg</option>
        <option>Bulky / van</option>
      </select>
      <input name="value" placeholder="Declared value (€)" />
      <input required name="phone" placeholder="Contact phone" />
      <input required type="email" name="email" placeholder="Email for tracking" />
      <label className="demo-check">
        <input type="checkbox" required /> I agree to terms & privacy (recipient data minimized)
      </label>
      <button className="btn" type="submit">
        Get quote
      </button>
    </form>
  )
}

function TrackPanel() {
  const [code, setCode] = useState('FC-1042')
  const [show, setShow] = useState(true)
  return (
    <div className="demo-split">
      <form
        className="demo-card demo-form"
        onSubmit={(e) => {
          e.preventDefault()
          setShow(true)
        }}
      >
        <p className="label">Track shipment</p>
        <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Job ID" />
        <button className="btn" type="submit">
          Track
        </button>
      </form>
      {show ? (
        <DemoPanel>
          <p className="mono">{code}</p>
          <h3 className="display" style={{ fontSize: '1.35rem', margin: '0.25rem 0' }}>
            En route · ETA 14 min
          </h3>
          <div className="demo-track-steps">
            <span className="is-done">Booked</span>
            <span className="is-done">Picked up</span>
            <span className="is-active">En route</span>
            <span>Delivered + POD</span>
          </div>
          <p style={{ marginTop: '0.75rem' }}>Driver Amina · live map stub · SMS on each hop.</p>
        </DemoPanel>
      ) : null}
    </div>
  )
}

export default function CourierDemo() {
  const hero = images.niches.livreur

  return (
    <div className="demo-root" style={{ ['--demo-bg']: '#b8c0c9' }}>
      <Seo
        title={`${courierMeta.name} — courier platform demo | ${brand.name}`}
        description="Courier platform: zones, quote, live tracking, POD, dispatch, driver app, B2B."
      />
      <DemoTopbar name="Livreur / coursier" shareSlug="livreurs" />
      <header className="demo-hero-photo">
        <img src={hero.src} alt={hero.alt} />
        <div className="demo-hero-photo__veil" />
        <div className="demo-hero-photo__content">
          <div className="demo-hero-photo__inner">
            <div>
              <span className="sticker sticker-pink">Platform demo · courier</span>
              <h1 className="display" style={{ marginTop: '1rem' }}>
                {courierMeta.name}
              </h1>
              <p style={{ fontSize: '1.15rem', maxWidth: '38ch' }}>{courierMeta.tagline}</p>
              <p className="mono">
                {brand.city} · {brand.phone} · {courierMeta.sla}
              </p>
              <DemoChecklist
                items={[
                  'Zones & rate card',
                  'Quote → job → track link',
                  'ePOD (photo + signature)',
                  'Dispatch board + driver view',
                ]}
              />
            </div>
            <a className="btn btn-lime" href="#quote">
              Get a quote
            </a>
          </div>
        </div>
      </header>

      <DemoNav title={courierMeta.name} items={courierNav} />

      <DemoSection id="zones" label="Coverage" title="Zones & rates">
        <DemoTable
          columns={[
            { key: 'zone', label: 'Zone' },
            { key: 'window', label: 'Window' },
            { key: 'price', label: 'From' },
            { key: 'note', label: 'Notes' },
          ]}
          rows={courierRates.map((r, i) => ({ id: i, ...r }))}
        />
      </DemoSection>

      <DemoSection id="quote" label="Capture" title="Quote & book" lead="Addresses, size, declared value → price → job.">
        <div className="demo-split">
          <QuoteForm />
          <DemoPanel>
            <p className="label">Notifications</p>
            <DemoChecklist
              items={[
                'Email/SMS quote confirmation',
                'Pickup started',
                'En route + live link',
                'Delivered + POD thumbnail',
              ]}
            />
          </DemoPanel>
        </div>
      </DemoSection>

      <DemoSection id="track" label="Visibility" title="Live tracking">
        <TrackPanel />
      </DemoSection>

      <DemoSection id="pod" label="Proof" title="Proof of delivery" lead="Signature, photo, geotag, timestamp — chargeback shield.">
        <DemoGrid cols={2}>
          <DemoPanel>
            <p className="mono">Job {courierPod.job}</p>
            <p>
              Recipient: <strong>{courierPod.recipient}</strong>
            </p>
            <DemoChecklist items={[courierPod.signed, courierPod.photo, courierPod.geo, courierPod.time]} />
          </DemoPanel>
          <DemoPanel>
            <span className="lp-icon-badge" aria-hidden>
              <Icon name="camera" size={18} />
            </span>
            <p style={{ marginTop: '0.75rem' }}>
              Failed attempt? Exception codes (absent / refused / wrong address) with photo, then
              reschedule or return-to-depot.
            </p>
          </DemoPanel>
        </DemoGrid>
      </DemoSection>

      <DemoSection id="dispatch" label="Ops" title="Dispatch board" lead="Assign, ETA, exceptions — Onfleet-class visibility.">
        <DemoTable
          columns={[
            { key: 'id', label: 'Job' },
            { key: 'stop', label: 'Stop' },
            { key: 'driver', label: 'Driver' },
            { key: 'status', label: 'Status' },
            { key: 'eta', label: 'ETA' },
          ]}
          rows={courierJobs}
        />
      </DemoSection>

      <DemoSection id="driver" label="Field" title="Driver app preview">
        <DemoPanel>
          <div className="demo-driver-phone">
            <p className="label">Next stop</p>
            <h3 className="display" style={{ fontSize: '1.4rem', margin: '0.25rem 0' }}>
              Clinic reception
            </h3>
            <p className="mono">Navigate · Call recipient · Capture POD</p>
            <DemoChecklist
              items={['Offline-tolerant POD capture', 'Barcode scan (optional)', 'Break / end shift']}
            />
          </div>
        </DemoPanel>
      </DemoSection>

      <DemoSection id="b2b" label="Partners" title="B2B portal">
        <DemoGrid cols={3}>
          <DemoPanel>
            <h3 className="display" style={{ fontSize: '1.2rem' }}>
              Rate cards
            </h3>
            <p>Per-client pricing sets — not one public tariff.</p>
          </DemoPanel>
          <DemoPanel>
            <h3 className="display" style={{ fontSize: '1.2rem' }}>
              Invoicing
            </h3>
            <p>Weekly CSV / accounting export stub (Xero/QB-class later).</p>
          </DemoPanel>
          <DemoPanel>
            <h3 className="display" style={{ fontSize: '1.2rem' }}>
              API
            </h3>
            <p>Order webhook in · status + POD out (full kit).</p>
          </DemoPanel>
        </DemoGrid>
      </DemoSection>

      <DemoSection id="faq" label="FAQ" title="Common questions">
        {courierFaq.map((f) => (
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
          Terms · Privacy · Insurance summary · {brand.name} courier demo.
        </p>
        <p style={{ fontSize: '0.85rem' }}>
          Research: courier dispatch / ePOD platforms (Onfleet, Track-POD, Shipday patterns). See
          docs/DEMO_NICHE_RESEARCH.md.
        </p>
      </DemoLegalFoot>

      <DemoWantThis shareSlug="livreurs" />
    </div>
  )
}