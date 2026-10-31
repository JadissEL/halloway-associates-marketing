const KEY = 'halloway_inf_requests_v1'

export function loadRequests() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveRequest(entry) {
  const list = loadRequests()
  const next = [{ ...entry, id: `local_${Date.now()}`, createdAt: new Date().toISOString() }, ...list]
  localStorage.setItem(KEY, JSON.stringify(next.slice(0, 40)))
  return next[0]
}

export function updateRequestStatus(id, status) {
  const list = loadRequests().map((r) => (r.id === id ? { ...r, status } : r))
  localStorage.setItem(KEY, JSON.stringify(list))
  return list
}
