import { useState, useRef } from 'react'

export function Autocomplete({ value, onChange, suggestions, onSelect, placeholder }) {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef(null)

  const filtered = suggestions.filter((s) =>
    s.name.toLowerCase().includes(value.toLowerCase())
  )

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
      {showSuggestions && value && filtered.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border rounded-lg mt-1 shadow-lg max-h-48 overflow-y-auto">
          {filtered.map((s) => (
            <li
              key={s.name}
              onMouseDown={() => {
                onSelect(s)
                setShowSuggestions(false)
              }}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <span className="font-medium">{s.name}</span>
              <span className="text-sm text-gray-500 ml-2">
                {s.calories} cal · {s.protein}g
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
