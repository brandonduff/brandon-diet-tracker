const CATALOG_KEY = 'foodCatalog'

export function getCatalog() {
  const raw = localStorage.getItem(CATALOG_KEY)
  return raw ? JSON.parse(raw) : {}
}

export function updateCatalog(entry) {
  const catalog = getCatalog()
  const item = {
    name: entry.name,
    calories: entry.calories,
    protein: entry.protein,
    amount: entry.amount || null,
    caloriesPerGram: null,
    proteinPerGram: null,
  }
  if (entry.amount && entry.amount > 0) {
    item.caloriesPerGram = entry.calories / entry.amount
    item.proteinPerGram = entry.protein / entry.amount
  }
  catalog[entry.name.toLowerCase()] = item
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
