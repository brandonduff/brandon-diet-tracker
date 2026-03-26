import { useState } from 'react'
import { Autocomplete } from './Autocomplete'

export function FoodEntryForm({ onAdd, suggestions = [] }) {
  const [name, setName] = useState('')
  const [calories, setCalories] = useState('')
  const [protein, setProtein] = useState('')

  const handleSelect = (item) => {
    setName(item.name)
    setCalories(String(item.calories))
    setProtein(String(item.protein))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !calories) return
    onAdd?.({
      name: name.trim(),
      calories: Number(calories),
      protein: Number(protein) || 0,
    })
    setName('')
    setCalories('')
    setProtein('')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4 mb-4 space-y-3">
      <Autocomplete
        value={name}
        onChange={setName}
        suggestions={suggestions}
        onSelect={handleSelect}
        placeholder="Food name"
      />
      <div className="flex gap-3">
        <input
          type="number"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          placeholder="Calories"
          className="w-1/2 border rounded-lg px-3 py-2"
          aria-label="Calories"
        />
        <input
          type="number"
          value={protein}
          onChange={(e) => setProtein(e.target.value)}
          placeholder="Protein (g)"
          className="w-1/2 border rounded-lg px-3 py-2"
          aria-label="Protein (g)"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white rounded-lg py-2 font-medium hover:bg-blue-600 active:bg-blue-700"
      >
        Add
      </button>
    </form>
  )
}
