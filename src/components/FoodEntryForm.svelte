<script>
  import Autocomplete from './Autocomplete.svelte'

  let { onAdd, suggestions = [] } = $props()
  let name = $state('')
  let amount = $state('')
  let calories = $state('')
  let protein = $state('')
  let catalogItem = $state(null)
  let lastAmount = $state('')

  function handleSelect(item) {
    name = item.name
    calories = String(item.calories)
    protein = String(item.protein)
    amount = item.amount ? String(item.amount) : ''
    lastAmount = amount
    catalogItem = item
  }

  function handleAmountInput() {
    if (!catalogItem || !catalogItem.caloriesPerGram) return
    if (!amount && catalogItem) {
      // Cleared — revert to catalog raw values
      calories = String(catalogItem.calories)
      protein = String(catalogItem.protein)
      return
    }
    const grams = Number(amount)
    if (grams > 0) {
      calories = String(Math.round(catalogItem.caloriesPerGram * grams))
      protein = String(Math.round(catalogItem.proteinPerGram * grams))
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !calories) return
    onAdd?.({
      name: name.trim(),
      calories: Number(calories),
      protein: Number(protein) || 0,
      ...(amount ? { amount: Number(amount) } : {}),
    })
    name = ''
    amount = ''
    calories = ''
    protein = ''
    catalogItem = null
  }
</script>

<form onsubmit={handleSubmit} class="bg-white rounded-lg shadow p-4 mb-4 space-y-3">
  <Autocomplete
    value={name}
    onChange={(v) => { name = v; catalogItem = null }}
    {suggestions}
    onSelect={handleSelect}
    placeholder="Food name"
  />
  <input
    type="number"
    bind:value={amount}
    oninput={handleAmountInput}
    placeholder="Amount (g) — optional"
    class="w-full border rounded-lg px-3 py-2"
    aria-label="Amount (g)"
  />
  <div class="flex gap-3">
    <input
      type="number"
      bind:value={calories}
      placeholder="Calories"
      class="w-1/2 border rounded-lg px-3 py-2"
      aria-label="Calories"
    />
    <input
      type="number"
      bind:value={protein}
      placeholder="Protein (g)"
      class="w-1/2 border rounded-lg px-3 py-2"
      aria-label="Protein (g)"
    />
  </div>
  <button
    type="submit"
    class="w-full bg-blue-500 text-white rounded-lg py-2 font-medium hover:bg-blue-600 active:bg-blue-700"
  >
    Add
  </button>
</form>
