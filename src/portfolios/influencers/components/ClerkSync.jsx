import { useEffect } from 'react'
import { useAuth, useUser } from '@clerk/react'
import { connectUser } from '../lib/session'

/**
 * When a fan/brand signs in with Clerk (Gmail / LinkedIn / email),
 * mirror identity into the kit session used by booking + dashboards.
 */
export default function ClerkSync() {
  const { isSignedIn } = useAuth()
  const { user, isLoaded } = useUser()

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return
    const email =
      user.primaryEmailAddress?.emailAddress ||
      user.emailAddresses?.[0]?.emailAddress
    if (!email) return
    try {
      connectUser({
        name: user.fullName || user.firstName || email.split('@')[0],
        email,
        role: 'fan',
      })
    } catch {
      /* ignore */
    }
  }, [isLoaded, isSignedIn, user])

  return null
}
