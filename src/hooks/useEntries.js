import { useState, useCallback } from 'react'
import { getEntries, saveEntries } from '../utils/storage'
import { updateCatalog } from '../utils/foodCatalog'

export function useEntries(date) {
  const [entries, setEntries] = useState(() => getEntries(date))

  const reload = useCallback(() => {
    setEntries(getEntries(date))
  }, [date])

  const addEntry = useCallback((entry) => {
    const newEntry = {
      ...entry,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    }
    const updated = [...getEntries(date), newEntry]
    saveEntries(date, updated)
    updateCatalog(newEntry)
    setEntries(updated)
  }, [date])

  const deleteEntry = useCallback((id) => {
    const updated = getEntries(date).filter((e) => e.id !== id)
    saveEntries(date, updated)
    setEntries(updated)
  }, [date])

  const totals = entries.reduce(
    (acc, e) => ({
      calories: acc.calories + e.calories,
      protein: acc.protein + e.protein,
    }),
    { calories: 0, protein: 0 }
  )

  return { entries, totals, addEntry, deleteEntry, reload }
}
