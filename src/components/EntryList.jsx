export function EntryList({ entries, onDelete }) {
  if (entries.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-6">No entries yet</p>
    )
  }

  return (
    <ul className="space-y-2 mt-4">
      {entries.map((entry) => (
        <li key={entry.id} className="bg-white rounded-lg shadow p-3 flex justify-between items-center">
          <div>
            <div className="font-medium">{entry.name}</div>
            <div className="text-sm text-gray-500">
              {entry.calories} cal · {entry.protein}g protein
            </div>
          </div>
          {onDelete && (
            <button
              onClick={() => onDelete(entry.id)}
              className="text-red-400 hover:text-red-600 text-sm"
              aria-label={`Delete ${entry.name}`}
            >
              ✕
            </button>
          )}
        </li>
      ))}
    </ul>
  )
}
