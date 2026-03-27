import { useState, useEffect } from 'react'
import { DailySummary } from './components/DailySummary'
import { EntryList } from './components/EntryList'
import { FoodEntryForm } from './components/FoodEntryForm'
import { DatePicker } from './components/DatePicker'
import { useEntries } from './hooks/useEntries'
import { getAllCatalogItems } from './utils/foodCatalog'

function todayString() {
  return new Date().toISOString().split('T')[0]
}

export default function App() {
  const [date, setDate] = useState(todayString)
  const { entries, totals, addEntry, deleteEntry, reload } = useEntries(date)
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    reload()
  }, [date, reload])

  useEffect(() => {
    setSuggestions(getAllCatalogItems())
  }, [entries])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-center mb-4">Diet Tracker</h1>
        <DatePicker date={date} onChange={setDate} />
        <DailySummary calories={totals.calories} protein={totals.protein} />
        <FoodEntryForm onAdd={addEntry} suggestions={suggestions} />
        <EntryList entries={entries} onDelete={deleteEntry} />
      </div>
    </div>
  )
}
