<script>
  let { calories, protein } = $props()
</script>

<div class="bg-white rounded-lg shadow p-4 mb-4">
  <h2 class="text-lg font-semibold mb-2">Today</h2>
  <div class="flex justify-around text-center">
    <div>
      <div class="text-2xl font-bold">{calories}</div>
      <div class="text-sm text-gray-500">calories</div>
    </div>
    <div>
      <div class="text-2xl font-bold">{protein}g</div>
      <div class="text-sm text-gray-500">protein</div>
    </div>
  </div>
</div>
