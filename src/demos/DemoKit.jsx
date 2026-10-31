import { useState } from 'react'

/** Sticky in-demo nav — desktop platform chrome (not mobile tab bar). */
export function DemoNav({ items, title }) {
  return (
    <nav className="demo-nav" aria-label={`${title} sections`}>
      <div className="demo-nav__inner">
        <span className="demo-nav__title mono">{title}</span>
        <div className="demo-nav__links">
          {items.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

export function DemoSection({ id, label, title, lead, children, tone }) {
  return (
    <section id={id} className={`demo-section demo-section--pad${tone ? ` demo-section--${tone}` : ''}`}>
      {label ? <p className="label">{label}</p> : null}
      {title ? (
        <h2 className="display" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.25rem)', margin: '0.25rem 0 0.5rem' }}>
          {title}
        </h2>
      ) : null}
      {lead ? <p className="demo-lead">{lead}</p> : null}
      <div className="demo-section__body">{children}</div>
    </section>
  )
}

export function DemoGrid({ cols = 3, children }) {
  return <div className={`demo-grid demo-grid--${cols}`}>{children}</div>
}

export function DemoPanel({ children, className = '', ...rest }) {
  return (
    <div className={`demo-card ${className}`.trim()} {...rest}>
      {children}
    </div>
  )
}

export function DemoTabs({ tabs, initial = 0 }) {
  const [i, setI] = useState(initial)
  const active = tabs[i]
  return (
    <div className="demo-tabs">
      <div className="demo-tabs__list" role="tablist">
        {tabs.map((t, idx) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={idx === i}
            className={idx === i ? 'is-active' : ''}
            onClick={() => setI(idx)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="demo-tabs__panel" role="tabpanel">
        {active?.content}
      </div>
    </div>
  )
}

export function DemoSuccess({ title, children, onReset }) {
  return (
    <div className="demo-card form-status success">
      <p className="label">Confirmed</p>
      <h3 className="display" style={{ fontSize: '1.35rem', margin: '0.35rem 0' }}>
        {title}
      </h3>
      {children}
      {onReset ? (
        <button type="button" className="btn btn-secondary" style={{ marginTop: '0.75rem' }} onClick={onReset}>
          New request
        </button>
      ) : null}
    </div>
  )
}

export function DemoChecklist({ items }) {
  return (
    <ul className="demo-checklist">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  )
}

export function DemoTable({ columns, rows }) {
  return (
    <div className="demo-table-wrap">
      <table className="demo-table">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={row.id || idx}>
              {columns.map((c) => (
                <td key={c.key}>{row[c.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function DemoLegalFoot({ children }) {
  return (
    <footer id="legal" className="demo-legal">
      {children}
    </footer>
  )
}
