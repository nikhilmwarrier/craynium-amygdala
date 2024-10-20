<script>
  import { createEventDispatcher } from "svelte";

  /** @type {{ front: string; back: string; box: number }}*/
  export let card;

  let flipped = false;

  const dispatch = createEventDispatcher();
</script>

<div class="rounded bg-yellow-200 text-center h-full w-full">
  <div class="p-4 bg-yellow-300">
    {card.front}
  </div>
  <button
    on:click={() => (flipped = !flipped)}
    class="font-sans m-auto block pt-2 pb-3 w-full rounded"
  >
    {#if !flipped}
      Show
    {:else}
      {card.back}
    {/if}
  </button>
  {#if flipped}
    <div class="flex justify-center w-full gap-4">
      <button
        on:click={() => dispatch("userForgot")}
        class="bg-red-400 px-3 py-1 rounded">Didn't Remember</button
      >
      <button
        on:click={() => dispatch("userRemembered")}
        class="bg-green-400 px-3 py-1 rounded">Remembered</button
      >
    </div>
  {/if}
</div>
