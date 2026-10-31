import { creator } from '../data'

const USER_KEY = 'halloway_inf_user_v1'
const CREATOR_KEY = 'halloway_inf_creator_v1'
const USERS_DIR_KEY = 'halloway_inf_users_dir_v1'

/** Demo creator unlock — replace with real auth in production */
export const CREATOR_DEMO_PIN = 'nova-demo'

export function getUserSession() {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function getCreatorSession() {
  try {
    const raw = localStorage.getItem(CREATOR_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function listDirectoryUsers() {
  try {
    const raw = localStorage.getItem(USERS_DIR_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function upsertDirectory(user) {
  const dir = listDirectoryUsers().filter((u) => u.email !== user.email)
  dir.unshift({
    email: user.email,
    name: user.name,
    role: user.role || 'fan',
    lastSeen: new Date().toISOString(),
  })
  localStorage.setItem(USERS_DIR_KEY, JSON.stringify(dir.slice(0, 200)))
}

/**
 * Connect with email — required before any contact / booking.
 */
export function connectUser({ name, email, role = 'fan' }) {
  const clean = String(email || '')
    .trim()
    .toLowerCase()
  if (!clean || !clean.includes('@')) throw new Error('Valid email required')
  const session = {
    name: String(name || '').trim() || clean.split('@')[0],
    email: clean,
    role,
    connectedAt: new Date().toISOString(),
  }
  localStorage.setItem(USER_KEY, JSON.stringify(session))
  upsertDirectory(session)
  return session
}

export function disconnectUser() {
  localStorage.removeItem(USER_KEY)
}

export function connectCreator({ email, pin }) {
  const clean = String(email || '')
    .trim()
    .toLowerCase()
  const creatorEmail = String(creator.email || '')
    .trim()
    .toLowerCase()
  const pinOk = String(pin || '') === CREATOR_DEMO_PIN
  const emailOk = clean && (clean === creatorEmail || clean.endsWith('@novavale.example'))
  if (!pinOk && !emailOk) {
    throw new Error('Creator login failed — use creator email + PIN from kit README')
  }
  const session = {
    email: clean || creatorEmail,
    name: creator.name,
    role: 'creator',
    connectedAt: new Date().toISOString(),
  }
  localStorage.setItem(CREATOR_KEY, JSON.stringify(session))
  return session
}

export function disconnectCreator() {
  localStorage.removeItem(CREATOR_KEY)
}

export function useSessionTick() {
  /* force re-render helper via storage events — pages call get* directly + useState */
}
