<script>
  const MAX_SUGGESTIONS = 8

  let { value, onChange, suggestions, onSelect, placeholder } = $props()
  let showSuggestions = $state(false)

  const ranked = $derived.by(() => {
    if (!suggestions) return []
    const lower = (value || '').toLowerCase()
    const filtered = lower
      ? suggestions.filter((s) => s.name.toLowerCase().includes(lower))
      : suggestions
    const sorted = [...filtered].sort((a, b) => {
      if (!lower) return a.name.localeCompare(b.name)
      const aPrefix = a.name.toLowerCase().startsWith(lower)
      const bPrefix = b.name.toLowerCase().startsWith(lower)
      if (aPrefix && !bPrefix) return -1
      if (!aPrefix && bPrefix) return 1
      return a.name.localeCompare(b.name)
    })
    return sorted.slice(0, MAX_SUGGESTIONS)
  })

  const shouldShow = $derived(showSuggestions && ranked.length > 0)
</script>

<div class="relative">
  <input
    type="text"
    {value}
    oninput={(e) => {
      onChange(e.target.value)
      showSuggestions = true
    }}
    onfocus={() => (showSuggestions = true)}
    onblur={() => setTimeout(() => (showSuggestions = false), 150)}
    {placeholder}
    class="w-full border rounded-lg px-3 py-2"
    aria-label={placeholder}
  />
  {#if shouldShow}
    <ul
      role="listbox"
      class="absolute z-10 w-full bg-white border rounded-lg mt-1 shadow-lg max-h-48 overflow-y-auto"
    >
      {#each ranked as s (s.name)}
        <li
          role="option"
          aria-selected="false"
          onmousedown={() => {
            onSelect(s)
            showSuggestions = false
          }}
          class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
        >
          <span class="font-medium">{s.name}</span>
          <span class="text-sm text-gray-500 ml-2">
            {s.amount ? `${s.amount}g · ` : ''}{s.calories} cal · {s.protein}g
          </span>
        </li>
      {/each}
    </ul>
  {/if}
</div>
