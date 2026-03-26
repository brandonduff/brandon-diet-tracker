const ENTRY_PREFIX = 'entries:'

export function getEntries(date) {
  const key = `${ENTRY_PREFIX}${date}`
  const raw = localStorage.getItem(key)
  return raw ? JSON.parse(raw) : []
}

export function saveEntries(date, entries) {
  const key = `${ENTRY_PREFIX}${date}`
  localStorage.setItem(key, JSON.stringify(entries))
}
