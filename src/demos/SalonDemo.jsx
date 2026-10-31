import { useMemo, useState } from 'react'
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
  salonMeta,
  salonNav,
  salonServices,
  salonTeam,
  salonSlots,
  salonWaitlist,
  salonDay,
  salonFaq,
} from './data/salon'
import '../components/Photo.css'

function BookFlow() {
  const [step, setStep] = useState(1)
  const [service, setService] = useState('')
  const [staff, setStaff] = useState('')
  const [slot, setSlot] = useState('')
  const [done, setDone] = useState(false)
  const selected = salonServices.find((s) => s.id === service)

  if (done) {
    return (
      <DemoSuccess title="Appointment held" onReset={() => { setDone(false); setStep(1) }}>
        <p>
          {selected?.name} · {staff || 'Any available'} · {slot}. Deposit rule applied where needed.
          Confirmation email + SMS 24h / 2h (demo).
        </p>
      </DemoSuccess>
    )
  }

  return (
    <form
      className="demo-card demo-form"
      onSubmit={(e) => {
        e.preventDefault()
        if (step < 3) setStep(step + 1)
        else setDone(true)
      }}
    >
      <p className="label">Book · step {step}/3</p>
      {step === 1 ? (
        <>
          <label>
            Service
            <select required value={service} onChange={(e) => setService(e.target.value)}>
              <option value="" disabled>
                Choose service
              </option>
              {salonServices.filter((s) => s.duration !== '—').map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} · {s.duration} · {s.price}
                </option>
              ))}
            </select>
          </label>
        </>
      ) : null}
      {step === 2 ? (
        <>
          <label>
            Stylist
            <select required value={staff} onChange={(e) => setStaff(e.target.value)}>
              <option value="" disabled>
                Choose or any available
              </option>
              <option value="Any available">Any available</option>
              {salonTeam.map((t) => (
                <option key={t.name} value={t.name}>
                  {t.name} — {t.role}
                </option>
              ))}
            </select>
          </label>
          <label>
            Slot (live availability demo)
            <select required value={slot} onChange={(e) => setSlot(e.target.value)}>
              <option value="" disabled>
                Pick time
              </option>
              {salonSlots.map((t) => (
                <option key={t} value={t}>
                  Today · {t}
                </option>
              ))}
            </select>
          </label>
        </>
      ) : null}
      {step === 3 ? (
        <>
          <input required name="name" placeholder="Full name" />
          <input required name="phone" placeholder="Mobile (SMS reminders)" />
          <input required type="email" name="email" placeholder="Email" />
          <textarea name="notes" rows={2} placeholder="Notes / allergies (consent stored)" />
          <label className="demo-check">
            <input type="checkbox" required /> I accept the cancellation & deposit policy
          </label>
          <p className="mono" style={{ fontSize: '0.8rem', margin: 0 }}>
            {selected?.deposit && selected.deposit !== '—'
              ? `Card deposit: ${selected.deposit} (SCA / 3-D Secure in production)`
              : 'No deposit for this service'}
          </p>
        </>
      ) : null}
      <button className="btn" type="submit">
        {step < 3 ? 'Continue' : 'Confirm booking'}
      </button>
    </form>
  )
}

export default function SalonDemo() {
  const hero = images.niches.salon
  const meta = useMemo(
    () => ({
      ...salonMeta,
      city: brand.city,
      phone: brand.phone,
    }),
    [],
  )

  return (
    <div className="demo-root" style={{ ['--demo-bg']: '#c9b8c4' }}>
      <Seo
        title={`${meta.name} — salon platform demo | ${brand.name}`}
        description="Full salon/barber platform demo: booking, deposits, waitlist, client & staff portals."
      />
      <DemoTopbar name="Salon / barbier" shareSlug="salons" />
      <header className="demo-hero-photo">
        <img src={hero.src} alt={hero.alt} />
        <div className="demo-hero-photo__veil" />
        <div className="demo-hero-photo__content">
          <div className="demo-hero-photo__inner">
            <div>
              <span className="sticker sticker-pink">Platform demo · salon</span>
              <h1 className="display" style={{ marginTop: '1rem' }}>
                {meta.name}
              </h1>
              <p style={{ fontSize: '1.15rem', maxWidth: '38ch' }}>{meta.tagline}</p>
              <p className="mono">
                {meta.address} · {meta.city} · {meta.phone}
              </p>
              <p className="mono" style={{ opacity: 0.85 }}>
                {meta.hours}
              </p>
              <DemoChecklist
                items={[
                  'Online booking + stylist calendars',
                  'Deposits & no-show rules',
                  'Waitlist / walk-in queue',
                  'Client portal + staff day view',
                ]}
              />
            </div>
            <a className="btn btn-lime" href="#book">
              Book a stylist
            </a>
          </div>
        </div>
      </header>

      <DemoNav title={meta.name} items={salonNav} />

      <DemoSection
        id="services"
        label="Catalog"
        title="Services"
        lead="Duration, price, and deposit — the same fields Fresha/Booksy-class systems expose to clients."
      >
        <DemoGrid cols={4}>
          {salonServices.map((s) => (
            <DemoPanel key={s.id}>
              <span className="lp-icon-badge" aria-hidden>
                <Icon name={s.icon} size={18} />
              </span>
              <h3 className="display" style={{ fontSize: '1.25rem', marginTop: '0.65rem' }}>
                {s.name}
              </h3>
              <p className="mono" style={{ margin: '0.25rem 0' }}>
                {s.duration} · {s.price}
              </p>
              <p style={{ fontSize: '0.85rem', margin: 0 }}>Deposit: {s.deposit}</p>
            </DemoPanel>
          ))}
        </DemoGrid>
      </DemoSection>

      <DemoSection id="team" label="People" title="Team & chairs" lead="Book a person or the next open chair.">
        <DemoGrid cols={3}>
          {salonTeam.map((t) => (
            <DemoPanel key={t.name}>
              <h3 className="display" style={{ fontSize: '1.35rem', margin: 0 }}>
                {t.name}
              </h3>
              <p className="mono">{t.role}</p>
              <p>{t.bio}</p>
              <p className="mono" style={{ fontSize: '0.8rem' }}>
                {t.slots}
              </p>
            </DemoPanel>
          ))}
        </DemoGrid>
      </DemoSection>

      <DemoSection id="book" label="Booking" title="Online booking flow" lead={meta.depositNote}>
        <div className="demo-split">
          <BookFlow />
          <DemoPanel>
            <p className="label">Reminder cadence</p>
            <DemoChecklist
              items={[
                'Instant confirmation email',
                'SMS −24h with Confirm / STOP',
                'SMS −2h day-of nudge',
                'Aftercare / rebook prompt (optional)',
              ]}
            />
            <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
              Marketing SMS only with separate opt-in (GDPR). Transactional booking messages use the
              contact you provide for the appointment.
            </p>
          </DemoPanel>
        </div>
      </DemoSection>

      <DemoSection
        id="waitlist"
        label="Floor"
        title="Waitlist & walk-ins"
        lead="Keep chairs turning when someone cancels or walks in."
      >
        <DemoTable
          columns={[
            { key: 'name', label: 'Queue' },
            { key: 'wait', label: 'ETA / trigger' },
            { key: 'chair', label: 'Chair' },
          ]}
          rows={salonWaitlist}
        />
      </DemoSection>

      <DemoSection id="portal" label="Client" title="Client portal" lead="Upcoming visits, history, packages.">
        <DemoTabs
          tabs={[
            {
              id: 'up',
              label: 'Upcoming',
              content: (
                <DemoPanel>
                  <p>
                    <strong>Thu 15:30</strong> — Coupe + barbe · Marco
                  </p>
                  <p className="mono">Reschedule · Cancel (≥24h)</p>
                </DemoPanel>
              ),
            },
            {
              id: 'hist',
              label: 'History',
              content: (
                <DemoPanel>
                  <p>12 visits · last formula notes on file (private).</p>
                  <p className="mono">Photo consent: private only</p>
                </DemoPanel>
              ),
            },
            {
              id: 'gift',
              label: 'Gift / package',
              content: (
                <DemoPanel>
                  <p>
                    Package — 5 coupes: <strong>3 left</strong>
                  </p>
                  <p>Gift card balance: 40 €</p>
                </DemoPanel>
              ),
            },
          ]}
        />
      </DemoSection>

      <DemoSection id="staff" label="Ops" title="Staff day view" lead="One calendar per chair — deposits visible.">
        <DemoTable
          columns={[
            { key: 'time', label: 'Time' },
            { key: 'client', label: 'Client' },
            { key: 'service', label: 'Service' },
            { key: 'status', label: 'Status' },
          ]}
          rows={salonDay}
        />
      </DemoSection>

      <DemoSection id="gallery" label="Proof" title="Gallery" lead="Portfolio for colour & cuts — Instagram-ready.">
        <div className="demo-gallery">
          <img src={hero.src} alt="" />
          <img src={hero.portrait} alt="" />
          <img src={hero.src} alt="" style={{ objectPosition: '30% 40%' }} />
        </div>
      </DemoSection>

      <DemoSection id="policies" label="Rules" title="Policies" tone="muted">
        <DemoGrid cols={2}>
          <DemoPanel>
            <h3 className="display" style={{ fontSize: '1.2rem' }}>
              Cancellation
            </h3>
            <p>Free ≥24h. Late cancel / no-show may keep deposit on colour services.</p>
          </DemoPanel>
          <DemoPanel>
            <h3 className="display" style={{ fontSize: '1.2rem' }}>
              Local presence
            </h3>
            <p>
              Google Business booking link · NAP consistency · review ask after visit (demo CTA).
            </p>
          </DemoPanel>
        </DemoGrid>
      </DemoSection>

      <DemoSection id="faq" label="FAQ" title="Common questions">
        <DemoGrid cols={1}>
          {salonFaq.map((f) => (
            <DemoPanel key={f.q}>
              <h3 className="display" style={{ fontSize: '1.15rem', margin: 0 }}>
                {f.q}
              </h3>
              <p>{f.a}</p>
            </DemoPanel>
          ))}
        </DemoGrid>
      </DemoSection>

      <DemoLegalFoot>
        <p className="mono">
          Privacy · Terms · {brand.name} niche kit demo — not a live booking backend.
        </p>
        <p style={{ fontSize: '0.85rem' }}>
          Research basis: salon SaaS feature sets (booking, deposits, waitlist, portals, reminders)
          + EU GDPR/PSD2 notes. See docs/DEMO_NICHE_RESEARCH.md.
        </p>
      </DemoLegalFoot>

      <DemoWantThis shareSlug="salons" />
    </div>
  )
}
