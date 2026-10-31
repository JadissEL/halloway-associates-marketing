const STORAGE_KEY = 'lp_leads_v1'

export function loadLeads() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

export function saveLead(lead) {
  const list = loadLeads()
  const entry = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: 'new',
    notes: '',
    ...lead,
  }
  list.unshift(entry)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  return entry
}

export function updateLead(id, patch) {
  const list = loadLeads().map((l) => (l.id === id ? { ...l, ...patch } : l))
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  return list
}

export function exportLeadsCsv() {
  const rows = loadLeads()
  const header = ['id', 'createdAt', 'type', 'status', 'name', 'business', 'niche', 'city', 'email', 'phone', 'notes']
  const lines = [header.join(',')]
  for (const r of rows) {
    lines.push(
      header
        .map((k) => `"${String(r[k] ?? '').replaceAll('"', '""')}"`)
        .join(','),
    )
  }
  return lines.join('\n')
}
