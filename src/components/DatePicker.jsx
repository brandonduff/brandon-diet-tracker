export function DatePicker({ date, onChange }) {
  const displayDate = date || new Date().toISOString().split('T')[0]

  return (
    <div className="flex justify-center mb-4">
      <input
        type="date"
        value={displayDate}
        onChange={(e) => onChange?.(e.target.value)}
        className="border rounded-lg px-3 py-2 text-center"
        aria-label="Select date"
      />
    </div>
  )
}
