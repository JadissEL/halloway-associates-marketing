import { ClerkProvider } from '@clerk/react'
import { getClerkPublishableKey, isClerkEnabled } from '../lib/clerk'
import ClerkSync from '../portfolios/influencers/components/ClerkSync'

export default function ClerkRoot({ children }) {
  if (!isClerkEnabled()) {
    return children
  }

  return (
    <ClerkProvider
      publishableKey={getClerkPublishableKey()}
      afterSignOutUrl="/portfolios/influencers/connect"
      signInFallbackRedirectUrl="/portfolios/influencers/account"
      signUpFallbackRedirectUrl="/portfolios/influencers/account"
    >
      <ClerkSync />
      {children}
    </ClerkProvider>
  )
}
