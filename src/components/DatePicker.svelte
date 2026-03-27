<script>
  let { date, onChange } = $props()
  const displayDate = $derived(date || new Date().toISOString().split('T')[0])
</script>

<div class="flex justify-center mb-4">
  <input
    type="date"
    value={displayDate}
    onchange={(e) => onChange?.(e.target.value)}
    class="border rounded-lg px-3 py-2 text-center"
    aria-label="Select date"
  />
</div>
