import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Show,
  SignOutButton,
  UserButton,
  useClerk,
  useSignIn,
  useUser,
} from '@clerk/react'

const CALLBACK = '/portfolios/influencers/sso-callback'
const AFTER = '/portfolios/influencers/account'

/**
 * Gmail + LinkedIn via Clerk OAuth (enable both in Clerk Dashboard → Social connections).
 */
export default function SocialConnect({ nextPath }) {
  const { signIn, fetchStatus } = useSignIn()
  const { isSignedIn } = useUser()
  const clerk = useClerk()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const dest = nextPath?.startsWith('/') ? nextPath : AFTER

  async function startOAuth(strategy) {
    setError('')
    try {
      if (!signIn?.sso) {
        // Fallback: open Clerk sign-in modal
        await clerk.openSignIn({
          forceRedirectUrl: dest,
          signUpForceRedirectUrl: dest,
        })
        return
      }
      await signIn.sso({
        strategy,
        redirectUrl: dest,
        redirectCallbackUrl: `${window.location.origin}${CALLBACK}`,
      })
    } catch (err) {
      const msg =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        err?.message ||
        'Social sign-in failed. Enable Google / LinkedIn in the Clerk Dashboard.'
      setError(msg)
    }
  }

  if (isSignedIn) {
    return (
      <div className="inf-card" style={{ maxWidth: 480 }}>
        <p className="inf-label">Connected with Clerk</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '0.75rem 0' }}>
          <UserButton afterSignOutUrl="/portfolios/influencers/connect" />
          <span>You are signed in — kit session synced.</span>
        </div>
        <div className="inf-actions">
          <button type="button" className="inf-btn inf-btn--lime" onClick={() => navigate(dest)}>
            Continue to dashboard
          </button>
          <SignOutButton>
            <button type="button" className="inf-btn inf-btn--ghost">
              Sign out
            </button>
          </SignOutButton>
        </div>
      </div>
    )
  }

  return (
    <div className="inf-card" style={{ maxWidth: 480 }}>
      <p className="inf-label">Social connect</p>
      <h2 className="display" style={{ fontSize: '1.35rem', margin: '0.25rem 0 0.75rem' }}>
        Continue with Gmail or LinkedIn
      </h2>
      <p style={{ color: 'var(--inf-muted)', fontSize: '0.95rem' }}>
        Powered by Clerk. Enable <strong>Google</strong> and <strong>LinkedIn</strong> under Clerk
        Dashboard → User &amp; authentication → Social connections.
      </p>
      {error ? (
        <p className="inf-banner" style={{ background: 'rgba(232,90,140,0.2)' }}>
          {error}
        </p>
      ) : null}
      <div className="inf-actions" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
        <button
          type="button"
          className="inf-btn"
          disabled={fetchStatus === 'fetching'}
          onClick={() => startOAuth('oauth_google')}
        >
          Continue with Google (Gmail)
        </button>
        <button
          type="button"
          className="inf-btn inf-btn--ghost"
          disabled={fetchStatus === 'fetching'}
          onClick={() => startOAuth('oauth_linkedin')}
        >
          Continue with LinkedIn
        </button>
        <button
          type="button"
          className="inf-btn inf-btn--ghost"
          onClick={() =>
            clerk.openSignIn({
              forceRedirectUrl: dest,
              signUpForceRedirectUrl: dest,
            })
          }
        >
          Other Clerk options (email, etc.)
        </button>
      </div>
      <Show when="signed-out">
        <p style={{ fontSize: '0.8rem', color: 'var(--inf-muted)', marginTop: '1rem' }}>
          New here? Sign-up uses the same Google / LinkedIn buttons when social is enabled.
        </p>
      </Show>
      <p style={{ fontSize: '0.85rem', marginTop: '0.75rem' }}>
        <Link to="/portfolios/influencers">← Back to site</Link>
      </p>
    </div>
  )
}
