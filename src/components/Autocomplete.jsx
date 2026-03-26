import { useState, useRef } from 'react'

const MAX_SUGGESTIONS = 8

function rankSuggestions(suggestions, query) {
  if (!query) return suggestions.slice(0, MAX_SUGGESTIONS)
  const lower = query.toLowerCase()
  const filtered = suggestions.filter((s) =>
    s.name.toLowerCase().includes(lower)
  )
  // Prefix matches first, then substring matches
  filtered.sort((a, b) => {
    const aPrefix = a.name.toLowerCase().startsWith(lower)
    const bPrefix = b.name.toLowerCase().startsWith(lower)
    if (aPrefix && !bPrefix) return -1
    if (!aPrefix && bPrefix) return 1
    return a.name.localeCompare(b.name)
  })
  return filtered.slice(0, MAX_SUGGESTIONS)
}

export function Autocomplete({ value, onChange, suggestions, onSelect, placeholder }) {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef(null)

  const ranked = rankSuggestions(suggestions, value)
  const shouldShow = showSuggestions && ranked.length > 0

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
          setShowSuggestions(true)
        }}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
        placeholder={placeholder}
        className="w-full border rounded-lg px-3 py-2"
        aria-label={placeholder}
      />
      {shouldShow && (
        <ul
          role="listbox"
          className="absolute z-10 w-full bg-white border rounded-lg mt-1 shadow-lg max-h-48 overflow-y-auto"
        >
          {ranked.map((s) => (
            <li
              key={s.name}
              role="option"
              onMouseDown={() => {
                onSelect(s)
                setShowSuggestions(false)
              }}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <span className="font-medium">{s.name}</span>
              <span className="text-sm text-gray-500 ml-2">
                {s.amount ? `${s.amount}g · ` : ''}{s.calories} cal · {s.protein}g
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
