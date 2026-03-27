export function DailySummary({ calories, protein }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <h2 className="text-lg font-semibold mb-2">Today</h2>
      <div className="flex justify-around text-center">
        <div>
          <div className="text-2xl font-bold">{calories}</div>
          <div className="text-sm text-gray-500">calories</div>
        </div>
        <div>
          <div className="text-2xl font-bold">{protein}g</div>
          <div className="text-sm text-gray-500">protein</div>
        </div>
      </div>
    </div>
  )
}
