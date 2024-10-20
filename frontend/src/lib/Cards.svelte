<script>
  import { writable } from "svelte/store";
  import Card from "./Card.svelte";
  import space from "./space";

  /** @type {number}*/
  export let range;

  /** @type { import('svelte/store').Writable<{ front: string; back: string; box: number }[]>}*/
  export let questions;

  // let filteredQuestions = $questions;
  // $: filteredQuestions = $questions.slice(0, range + 1);

  /**
   * Filters questions
   * @param qns
   * @returns {{ front: string; back: string; box: number }[]}
   */

  // const filteredQuestions = qns =>
  //   qns
  //     .filter(qn =>
  //       range === 1
  //         ? qn.box === 0
  //         : (range % Math.pow(2, qn.box)) + qn.box === 0
  //     )
  //     .slice(0, range + 1);

  const filteredQuestions = qns =>
    qns
      .filter(qn => space[range - 1].boxes.includes(qn.box))
      .slice(0, range + 1);

  let filtered = [];
  $: filtered = filteredQuestions($questions);

  $: console.log(range - 1, filtered);
</script>

<div class="card-container">
  {#if filtered}
    <div
      class="card rounded bg-yellow-200 flex items-center justify-center w-full"
    >
      All done!
    </div>
  {/if}
  {#each filtered as card (card.front)}
    <div class="card w-full">
      <Card
        {card}
        on:userForgot={() => {
          card.box = 0;
          filtered.splice(filtered.indexOf(card), 1);
          $questions[$questions.indexOf(card)].box = 0;
          $questions = $questions;
        }}
        on:userRemembered={() => {
          card.box++;
          $questions[$questions.indexOf(card)].box++;
          filtered.splice(filtered.indexOf(card), 1);
          $questions = $questions;
        }}
      />
    </div>
  {/each}
</div>

<style>
  .card-container {
    display: flex;
    position: relative;
    min-height: max-content;
    height: 15rem;
  }

  .card {
    height: 15rem;
    position: absolute;
  }
</style>
