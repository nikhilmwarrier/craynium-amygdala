<script>
  import { writable } from "svelte/store";
  import Cards from "./lib/Cards.svelte";

  const textPromise = fetch("http://localhost:3000/text");
  const questionsPromise = fetch("http://localhost:3000/questions");

  let questions = writable([]);

  const loadQuestions = async () => {
    const questionsResponse = await questionsPromise;
    $questions = await questionsResponse.json();
    $questions = $questions.flatMap((el, i) =>
      el.map(qn => ({ front: qn.front, back: qn.back, box: 1 }))
    );
  };
  loadQuestions();

  $: console.log($questions);
</script>

<main class="mx-auto my-5 max-w-screen-sm w-9/12">
  <h1 class="text-3xl font-bold text-center">Hello world!</h1>
  {#await textPromise}
    <h2>Loading...</h2>
  {:then data}
    {#await data.json() then items}
      {#each items as item, i (i)}
        <p class="py-2">{@html item}</p>
        {#if $questions.length > 0}
          <Cards range={i + 1} {questions} />
        {/if}
      {/each}
    {/await}
  {/await}
</main>
