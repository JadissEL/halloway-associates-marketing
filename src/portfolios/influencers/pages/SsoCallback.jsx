import { AuthenticateWithRedirectCallback } from '@clerk/react'

/** Completes Google / LinkedIn OAuth redirect from Clerk */
export default function InfluencerSsoCallback() {
  return (
    <main className="inf-wrap inf-section">
      <p className="inf-label">Signing you in…</p>
      <AuthenticateWithRedirectCallback
        signInFallbackRedirectUrl="/portfolios/influencers/account"
        signUpFallbackRedirectUrl="/portfolios/influencers/account"
      />
    </main>
  )
}
