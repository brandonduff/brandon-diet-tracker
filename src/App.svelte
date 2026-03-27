<script>
  import DailySummary from './components/DailySummary.svelte'
  import EntryList from './components/EntryList.svelte'
  import FoodEntryForm from './components/FoodEntryForm.svelte'
  import DatePicker from './components/DatePicker.svelte'
  import { getEntries, saveEntries } from './utils/storage'
  import { updateCatalog, getAllCatalogItems } from './utils/foodCatalog'

  function todayString() {
    return new Date().toISOString().split('T')[0]
  }

  let date = $state(todayString())
  let entries = $state(getEntries(todayString()))
  let suggestions = $state(getAllCatalogItems())

  const totals = $derived(
    entries.reduce(
      (acc, e) => ({
        calories: acc.calories + e.calories,
        protein: acc.protein + e.protein,
      }),
      { calories: 0, protein: 0 }
    )
  )

  function handleDateChange(newDate) {
    date = newDate
    entries = getEntries(newDate)
  }

  function addEntry(entry) {
    const newEntry = {
      ...entry,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    }
    const updated = [...entries, newEntry]
    saveEntries(date, updated)
    updateCatalog(newEntry)
    entries = updated
    suggestions = getAllCatalogItems()
  }

  function deleteEntry(id) {
    const updated = entries.filter((e) => e.id !== id)
    saveEntries(date, updated)
    entries = updated
  }
</script>

<div class="min-h-screen bg-gray-50">
  <div class="max-w-md mx-auto px-4 py-6">
    <h1 class="text-2xl font-bold text-center mb-4">Diet Tracker</h1>
    <DatePicker {date} onChange={handleDateChange} />
    <DailySummary calories={totals.calories} protein={totals.protein} />
    <FoodEntryForm onAdd={addEntry} {suggestions} />
    <EntryList {entries} onDelete={deleteEntry} />
  </div>
</div>
