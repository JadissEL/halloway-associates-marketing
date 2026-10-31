import { useEffect, useState } from 'react'
import { NavLink, Outlet, Link } from 'react-router-dom'
import Seo from '../../components/Seo'
import { useShareMode } from '../../components/ShareModeGuard'
import { creator, kitMeta } from './data'
import { getCreatorSession, getUserSession } from './lib/session'
import './kit.css'

const nav = [
  { to: '/portfolios/influencers', end: true, label: 'Home' },
  { to: '/portfolios/influencers/about', label: 'About' },
  { to: '/portfolios/influencers/offers', label: 'Offers' },
  { to: '/portfolios/influencers/media-kit', label: 'Media kit' },
  { to: '/portfolios/influencers/contact', label: 'Contact' },
  { to: '/portfolios/influencers/faq', label: 'FAQ' },
  { to: '/portfolios/influencers/links', label: 'Links' },
]

function NavItems({ user, creatorSession, onNavigate }) {
  return (
    <>
      {nav.map((item) => (
        <NavLink key={item.to} to={item.to} end={item.end} onClick={onNavigate}>
          {item.label}
        </NavLink>
      ))}
      {user ? (
        <NavLink to="/portfolios/influencers/account" onClick={onNavigate}>
          My dashboard
        </NavLink>
      ) : (
        <NavLink to="/portfolios/influencers/connect" onClick={onNavigate}>
          Connect
        </NavLink>
      )}
      {creatorSession ? (
        <NavLink to="/portfolios/influencers/creator" onClick={onNavigate}>
          Creator
        </NavLink>
      ) : (
        <NavLink to="/portfolios/influencers/creator/login" onClick={onNavigate}>
          Creator login
        </NavLink>
      )}
    </>
  )
}

export default function InfluencerLayout() {
  const { shareMode } = useShareMode('influencers')
  const [user, setUser] = useState(null)
  const [creatorSession, setCreatorSession] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const sync = () => {
      setUser(getUserSession())
      setCreatorSession(getCreatorSession())
    }
    sync()
    window.addEventListener('storage', sync)
    const id = setInterval(sync, 800)
    return () => {
      window.removeEventListener('storage', sync)
      clearInterval(id)
    }
  }, [])

  const closeMenu = () => setMenuOpen(false)
  const studioTo = shareMode ? '/built-by' : '/'
  const studioHref = shareMode ? undefined : kitMeta.studioUrl

  return (
    <div className={`inf-root${shareMode ? ' inf-root--share' : ''}`}>
      <Seo
        title={`${creator.name} (${creator.handle}) — collabs, calls & lessons`}
        description={creator.bio}
      />
      {shareMode ? (
        <p className="inf-share-ribbon" role="status">
          Niche demo · Influencers — shared for your review
        </p>
      ) : null}
      <header className="inf-top">
        <Link to="/portfolios/influencers" className="inf-top__brand" onClick={closeMenu}>
          <img src={creator.portrait} alt="" />
          <div>
            <strong>{creator.name}</strong>
            <div className="inf-label" style={{ margin: 0 }}>
              {creator.handle}
            </div>
          </div>
        </Link>
        <nav className="inf-top__nav" aria-label="Creator portfolio">
          <NavItems user={user} creatorSession={creatorSession} />
        </nav>
        <div className="inf-top__end">
          <Link className="inf-top__studio" to={studioTo} onClick={closeMenu}>
            {shareMode ? 'Built by Halloway' : kitMeta.studio}
          </Link>
          <button
            type="button"
            className="inf-top__burger"
            aria-expanded={menuOpen}
            aria-controls="inf-mobile-nav"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
      {menuOpen ? (
        <nav id="inf-mobile-nav" className="inf-top__mobile" aria-label="Creator portfolio mobile">
          <NavItems user={user} creatorSession={creatorSession} onNavigate={closeMenu} />
        </nav>
      ) : null}
      <Outlet />
      <footer className="inf-wrap inf-footer">
        <div>
          <strong>{creator.name}</strong>
          <span className="inf-footer__muted">
            {' '}
            · site by{' '}
            {shareMode ? (
              <Link to="/built-by">{kitMeta.studio}</Link>
            ) : (
              <a href={studioHref}>{kitMeta.studio}</a>
            )}
          </span>
        </div>
        <div>
          <Link to="/portfolios/influencers/legal">Terms</Link>
          {' · '}
          <Link to="/portfolios/influencers/card">Card</Link>
          {' · '}
          <Link to="/portfolios/influencers/faq">FAQ</Link>
          {' · '}
          <Link to="/portfolios/influencers/connect">Say hi</Link>
        </div>
      </footer>
    </div>
  )
}
