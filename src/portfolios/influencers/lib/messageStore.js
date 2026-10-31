const KEY = 'halloway_inf_messages_v1'

export function loadMessages() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function sendMessage({ fromEmail, fromName, toRole, subject, body }) {
  const list = loadMessages()
  const msg = {
    id: `msg_${Date.now()}`,
    fromEmail,
    fromName,
    toRole: toRole || 'creator',
    subject: subject || 'Contact',
    body,
    status: 'unread',
    createdAt: new Date().toISOString(),
  }
  localStorage.setItem(KEY, JSON.stringify([msg, ...list].slice(0, 100)))
  return msg
}

export function markMessage(id, status) {
  const list = loadMessages().map((m) => (m.id === id ? { ...m, status } : m))
  localStorage.setItem(KEY, JSON.stringify(list))
  return list
}

export function messagesForUser(email) {
  const e = String(email || '').toLowerCase()
  return loadMessages().filter((m) => m.fromEmail === e || m.toEmail === e)
}
