<script lang="ts">
  import {createEventDispatcher} from "svelte";
  import * as env from "../env";
  import * as MovieApi from "../api/MovieApi";
  import type {Movie} from "../domain/MovieDomain";

  const dispatch = createEventDispatcher();

  let key = "";
  let suggestions = [] as Movie[];

  async function keyUp(ev) {
    key = ev.target.value;

    const result = await MovieApi.search(key);
    suggestions = await result.json();
  }

  function onSuggestionClick(movie) {
    dispatch("select", {movie});
    key = "";
    suggestions = [];
  }

</script>

<div class="search">
  <input type="text" on:keyup={keyUp} />
  
  {#if suggestions.length > 0}
  <ul>
      {#each suggestions as suggestion, idx (suggestion.id) }
        <li
          class:odd={idx % 2 === 1}
          on:click={() => onSuggestionClick(suggestion)}>

          <img src={env.imageBasePath + suggestion.poster} alt="" />
          <div class="data">
            <h6>{suggestion.title}</h6>
            <p>{suggestion.overview}</p>
          </div>

        </li>
      {/each}
  </ul>
  {/if}
</div>

<style>
  .search {
    width: 100%;
    position: relative;
  }
  input {
    border: 3px solid #DDD;
    border-radius: 8px;
    outline: 0 !important;
    width: 100%;
    min-width: 360px;
    font-family: "Montserrat";
    font-weight: 600;
    font-size: 30px;
    padding: 12px 20px;
    margin: 0;
  }
  ul {
    position: absolute;
    z-index: 1;
    margin: 0;
    padding: 0;
    list-style-type: none;
    background: #FFF;
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(0, 0, 0, .2);
    max-height: 420px;
    overflow: auto;
  }
  li {
    display: flex;
    cursor: pointer;
    height: 140px;
  }
  
  li.odd {
    background: #FAFAFA;
  }
  li:hover {
    background: #e3f6ff;
  }
  li:hover img {
    opacity: 1;
  }
  img {
    height: 100%;
    opacity: .9;
  }
  .data {
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  h6 {
    margin: 0;
    font-family: "Montserrat";
    font-size: 18px;
    font-weight: 600;
  }
  p {
    font-family: "Montserrat";
    font-size: 13px;
    font-weight: 400;
    color: #AAA;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 5px 0 0;
    max-height: 65px;
  }
</style>