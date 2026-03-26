const CATALOG_KEY = 'foodCatalog'

export function getCatalog() {
  const raw = localStorage.getItem(CATALOG_KEY)
  return raw ? JSON.parse(raw) : {}
}

export function updateCatalog(entry) {
  const catalog = getCatalog()
  catalog[entry.name.toLowerCase()] = {
    name: entry.name,
    calories: entry.calories,
    protein: entry.protein,
  }
  localStorage.setItem(CATALOG_KEY, JSON.stringify(catalog))
}

export function getAllCatalogItems() {
  return Object.values(getCatalog())
}

export function searchCatalog(query) {
  if (!query) return []
  const catalog = getCatalog()
  const lower = query.toLowerCase()
  return Object.values(catalog).filter((item) =>
    item.name.toLowerCase().includes(lower)
  )
}
