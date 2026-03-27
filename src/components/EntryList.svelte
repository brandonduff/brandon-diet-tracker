<script>
  let { entries, onDelete } = $props()
</script>

{#if entries.length === 0}
  <p class="text-center text-gray-400 mt-6">No entries yet</p>
{:else}
  <ul class="space-y-2 mt-4">
    {#each entries as entry (entry.id)}
      <li class="bg-white rounded-lg shadow p-3 flex justify-between items-center">
        <div>
          <div class="font-medium">{entry.name}</div>
          <div class="text-sm text-gray-500">
            {entry.amount ? `${entry.amount}g · ` : ''}{entry.calories} cal · {entry.protein}g protein
          </div>
        </div>
        {#if onDelete}
          <button
            onclick={() => onDelete(entry.id)}
            class="text-red-400 hover:text-red-600 text-sm"
            aria-label={`Delete ${entry.name}`}
          >
            ✕
          </button>
        {/if}
      </li>
    {/each}
  </ul>
{/if}
