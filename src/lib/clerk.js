/** Clerk is optional until VITE_CLERK_PUBLISHABLE_KEY is set */
export function getClerkPublishableKey() {
  const key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
  return typeof key === 'string' && key.startsWith('pk_') ? key.trim() : ''
}

export function isClerkEnabled() {
  return Boolean(getClerkPublishableKey())
}
