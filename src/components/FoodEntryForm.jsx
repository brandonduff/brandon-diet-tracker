import { useState, useRef } from 'react'
import { Autocomplete } from './Autocomplete'

export function FoodEntryForm({ onAdd, suggestions = [] }) {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [calories, setCalories] = useState('')
  const [protein, setProtein] = useState('')
  const catalogRef = useRef(null)

  const handleSelect = (item) => {
    setName(item.name)
    setCalories(String(item.calories))
    setProtein(String(item.protein))
    setAmount(item.amount ? String(item.amount) : '')
    catalogRef.current = item
  }

  const handleAmountChange = (newAmount) => {
    setAmount(newAmount)
    const item = catalogRef.current
    if (!item || !item.caloriesPerGram || !newAmount) {
      // No per-gram rates or empty amount — don't scale
      if (!newAmount && item) {
        // Cleared amount — revert to catalog raw values
        setCalories(String(item.calories))
        setProtein(String(item.protein))
      }
      return
    }
    const grams = Number(newAmount)
    if (grams > 0) {
      setCalories(String(Math.round(item.caloriesPerGram * grams)))
      setProtein(String(Math.round(item.proteinPerGram * grams)))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !calories) return
    onAdd?.({
      name: name.trim(),
      calories: Number(calories),
      protein: Number(protein) || 0,
      ...(amount ? { amount: Number(amount) } : {}),
    })
    setName('')
    setAmount('')
    setCalories('')
    setProtein('')
    catalogRef.current = null
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4 mb-4 space-y-3">
      <Autocomplete
        value={name}
        onChange={(v) => {
          setName(v)
          catalogRef.current = null
        }}
        suggestions={suggestions}
        onSelect={handleSelect}
        placeholder="Food name"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => handleAmountChange(e.target.value)}
        placeholder="Amount (g) — optional"
        className="w-full border rounded-lg px-3 py-2"
        aria-label="Amount (g)"
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
