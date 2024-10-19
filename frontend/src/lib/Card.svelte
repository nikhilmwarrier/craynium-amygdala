<script>
  /** @type {{ front: string; back: string }}*/
  export let card;
  let flipped = false;
</script>

<div class="m-3 rounded bg-yellow-200 text-center">
  <div class="p-4 bg-yellow-300">
    {card.front}
  </div>
  <button
    on:click={() => (flipped = !flipped)}
    class="font-sans my-2 mx-auto block pt-2 pb-3 w-full rounded"
  >
    {#if !flipped}
      Show
    {:else}
      {card.back}
    {/if}
  </button>
</div>
{#if flipped}
  <div class="flex justify-center w-full gap-4">
    <button class="bg-red-400 px-3 py-1 rounded">I forgor 💀</button>
    <button class="bg-green-400 px-3 py-1 rounded">I rember</button>
  </div>
{/if}
