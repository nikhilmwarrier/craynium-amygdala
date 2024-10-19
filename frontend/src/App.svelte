<script>
  import Card from "./lib/Card.svelte";

  const dataPromise = fetch("http://localhost:3000");
</script>

<main class="mx-auto my-5 max-w-screen-sm w-9/12">
  <h1 class="text-3xl font-bold text-center">Hello world!</h1>
  {#await dataPromise}
    <h2>Loading...</h2>
  {:then data}
    {#await data.json() then items}
      {#each items as item, i}
        {#if i % 2 === 0}
          <p class="py-2">{@html item}</p>
          <br />
        {:else}
          {#each item as card}
            <Card {card} />
          {/each}
        {/if}
      {/each}
    {/await}
  {/await}
</main>
